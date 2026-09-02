import { spawn } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";
import crypto from "crypto";

const TIME_LIMIT = 5000;
const OUTPUT_LIMIT = 1024 * 1024;
const MEMORY_LIMIT = "256m";

export async function runCpp(code, input = "") {
  const id = crypto.randomUUID();
  const containerName = `dsa-${id}`;

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `${containerName}-`)
  );

  const sourcePath = path.join(tempDir, "main.cpp");

  try {
    await fs.writeFile(sourcePath, code, "utf8");

    // =========================
    // COMPILE
    // =========================

    const compileArgs = [
      "run",
      "--rm",
      "--network",
      "none",
      "--memory",
MEMORY_LIMIT,
      "--cpus",
      "1",
      "--pids-limit",
      "64",
      "-v",
      `${tempDir}:/workspace`,
      "gcc:latest",
      "g++",
      "/workspace/main.cpp",
      "-o",
      "/workspace/main",
    ];

    const compileResult = await executeDocker(
      compileArgs,
      "",
      TIME_LIMIT
    );

    if (compileResult.timedOut) {
      return {
        success: false,
        verdict: "COMPILATION_ERROR",
        output: "",
        error: "Compilation timed out.",
      };
    }

    if (compileResult.exitCode !== 0) {
      return {
        success: false,
        verdict: "COMPILATION_ERROR",
        output: "",
        error:
          compileResult.stderr ||
          "Compilation failed.",
      };
    }

    // =========================
    // EXECUTE
    // =========================

    const executeArgs = [
  "run",
  "--name",
  containerName,
  "-i",
  "--network",
  "none",
  "--memory",
  MEMORY_LIMIT,
  "--memory-swap",
  MEMORY_LIMIT,
  "--cpus",
  "1",
  "--pids-limit",
  "64",
  "-v",
  `${tempDir}:/workspace`,
  "gcc:latest",
  "/workspace/main",
];
    const executeResult = await executeDocker(
      executeArgs,
      input,
      TIME_LIMIT,
      containerName
    );

    console.log(
      "Execution stdout:",
      executeResult.stdout
    );

    console.log(
      "Execution stderr:",
      executeResult.stderr
    );

    console.log(
      "Execution exit code:",
      executeResult.exitCode
    );

    // =========================
    // OUTPUT LIMIT
    // =========================

    if (executeResult.outputLimitExceeded) {
      return {
        success: false,
        verdict: "OUTPUT_LIMIT_EXCEEDED",
        output: "",
        error: "Program produced too much output.",
      };
    }

    // =========================
    // TIME LIMIT
    // =========================

    if (executeResult.timedOut) {
      return {
        success: false,
        verdict: "TIME_LIMIT_EXCEEDED",
        output: executeResult.stdout,
        error: "Program exceeded the time limit.",
      };
    }

    // =========================
    // RUNTIME ERROR
    // =========================

    // =========================
// MEMORY LIMIT
// =========================

if (executeResult.oomKilled) {
  return {
    success: false,
    verdict: "MEMORY_LIMIT_EXCEEDED",
    output: executeResult.stdout,
    error: "Program exceeded the memory limit.",
  };
}

    if (executeResult.exitCode !== 0) {
      return {
        success: false,
        verdict: "RUNTIME_ERROR",
        output: executeResult.stdout,
        error:
          executeResult.stderr ||
          `Program exited with code ${executeResult.exitCode}.`,
      };
    }

    // =========================
    // SUCCESS
    // =========================

    return {
      success: true,
      verdict: "EXECUTED",
      output: executeResult.stdout,
      error: null,
    };
  } finally {
    await removeContainer(containerName);

    await fs.rm(tempDir, {
      recursive: true,
      force: true,
    });
  }
}

function executeDocker(
  args,
  input,
  timeout,
  containerName = null
) {
  return new Promise((resolve) => {
    const child = spawn("docker", args, {
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let outputLimitExceeded = false;
    let finished = false;

    // =========================
    // STDOUT
    // =========================

    child.stdout.on("data", (data) => {
      if (finished) return;

      stdout += data.toString();

      if (
        Buffer.byteLength(stdout, "utf8") >
        OUTPUT_LIMIT
      ) {
        outputLimitExceeded = true;

        console.log(
          "OUTPUT LIMIT EXCEEDED"
        );

        child.kill();
      }
    });

    // =========================
    // STDERR
    // =========================

    child.stderr.on("data", (data) => {
      if (finished) return;

      stderr += data.toString();

      if (
        Buffer.byteLength(stderr, "utf8") >
        OUTPUT_LIMIT
      ) {
        outputLimitExceeded = true;

        console.log(
          "OUTPUT LIMIT EXCEEDED"
        );

        child.kill();
      }
    });

    // =========================
    // PROCESS ERROR
    // =========================

    child.on("error", (error) => {
      if (finished) return;

      finished = true;

      resolve({
        stdout,
        stderr: error.message,
        exitCode: -1,
        timedOut: false,
        outputLimitExceeded,
      });
    });

    // =========================
    // PROCESS CLOSE
    // =========================

  child.on("close", async (exitCode) => {
  if (finished) return;

  finished = true;

  let oomKilled = false;

  if (containerName) {
    oomKilled = await checkOOMKilled(containerName);
  }

  resolve({
    stdout,
    stderr,
    exitCode,
    timedOut,
    outputLimitExceeded,
    oomKilled,
  });
});

    // =========================
    // SEND INPUT
    // =========================

    if (input) {
      child.stdin.write(input);
    }

    child.stdin.end();

    // =========================
    // TIME LIMIT
    // =========================

    const timer = setTimeout(async () => {
      if (finished) return;

      timedOut = true;

      console.log(
        `TIMEOUT: removing container ${containerName}`
      );

      if (containerName) {
        await removeContainer(
          containerName
        );
      }

      child.kill();
    }, timeout);

    child.on("close", () => {
      clearTimeout(timer);
    });
  });
}

function removeContainer(containerName) {
  return new Promise((resolve) => {
    if (!containerName) {
      resolve();
      return;
    }

    const remove = spawn(
      "docker",
      ["rm", "-f", containerName],
      {
        windowsHide: true,
      }
    );

    remove.on("close", () => {
      resolve();
    });

    remove.on("error", () => {
      resolve();
    });
  });
}
function checkOOMKilled(containerName) {
  return new Promise((resolve) => {
    const inspect = spawn(
      "docker",
      [
        "inspect",
        "--format",
        "{{.State.OOMKilled}}",
        containerName,
      ],
      {
        windowsHide: true,
      }
    );

    let output = "";

    inspect.stdout.on("data", (data) => {
      output += data.toString();
    });

    inspect.on("close", () => {
      resolve(output.trim() === "true");
    });

    inspect.on("error", () => {
      resolve(false);
    });
  });
}