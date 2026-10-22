import { spawn } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";
import crypto from "crypto";

const COMPILE_TIME_LIMIT = 15000; // 15s for compiler container start and compilation
const TIME_LIMIT = 5000; // 5s for user code execution
const OUTPUT_LIMIT = 1024 * 1024; // 1MB max output limit
const MEMORY_LIMIT = "128m";

function isDockerDaemonError(stderr) {
  if (!stderr) return false;
  return (
    stderr.includes("docker daemon is not running") ||
    stderr.includes("error during connect") ||
    stderr.includes("This error may indicate that the docker daemon is not running") ||
    stderr.includes("open //./pipe/docker_engine") ||
    stderr.includes("open //./pipe/dockerDesktopLinuxEngine") ||
    stderr.includes("failed to connect to the docker API") ||
    stderr.includes("Cannot connect to the Docker daemon") ||
    stderr.includes("Is the docker daemon running")
  );
}

let dockerAvailable = null;

async function checkDocker() {
  if (process.env.DISABLE_DOCKER === "true") {
    return false;
  }
  if (dockerAvailable !== null) {
    return dockerAvailable;
  }

  return new Promise((resolve) => {
    const child = spawn("docker", ["info"], {
      windowsHide: true,
      stdio: ["ignore", "ignore", "ignore"],
    });

    const timer = setTimeout(() => {
      try {
        child.kill();
      } catch {}
      dockerAvailable = false;
      resolve(false);
    }, 1500);

    child.on("error", () => {
      clearTimeout(timer);
      dockerAvailable = false;
      resolve(false);
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      dockerAvailable = code === 0;
      resolve(dockerAvailable);
    });
  });
}

export async function runCppDirect(code, input = "") {
  const id = crypto.randomUUID();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `dsa-cpp-${id}-`));
  const sourcePath = path.join(tempDir, "main.cpp");
  const binaryName = process.platform === "win32" ? "main.exe" : "main";
  const binaryPath = path.join(tempDir, binaryName);

  try {
    await fs.writeFile(sourcePath, code, "utf8");

    const compileResult = await executeProcess(
      "g++",
      ["-O2", "-std=c++17", "main.cpp", "-o", binaryName],
      "",
      COMPILE_TIME_LIMIT,
      tempDir
    );

    if (compileResult.exitCode !== 0) {
      return {
        success: false,
        verdict: "COMPILATION_ERROR",
        output: "",
        error: compileResult.error || compileResult.stderr || "Compilation failed.",
      };
    }

    return await executeProcess(binaryPath, [], input, TIME_LIMIT, tempDir);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

export async function runCpp(code, input = "") {
  const hasDocker = await checkDocker();
  if (!hasDocker) {
    return await runCppDirect(code, input);
  }

  const id = crypto.randomUUID();
  const containerName = `dsa-${id}`;

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `${containerName}-`)
  );

  const sourcePath = path.join(tempDir, "main.cpp");

  try {
    await fs.writeFile(sourcePath, code, "utf8");

    // =========================
    // COMPILE (Sandboxed)
    // =========================

    const compileArgs = [
      "run",
      "--rm",
      "--network",
      "none",
      "--memory",
      "256m",
      "--cpus",
      "1",
      "--pids-limit",
      "32",
      "--cap-drop=ALL",
      "--security-opt=no-new-privileges",
      "-v",
      `${tempDir}:/workspace`,
      "gcc:latest",
      "g++",
      "/workspace/main.cpp",
      "-O2",
      "-o",
      "/workspace/main",
    ];

    const compileResult = await executeDocker(
      compileArgs,
      "",
      COMPILE_TIME_LIMIT
    );

    if (compileResult.isDockerMissing || isDockerDaemonError(compileResult.stderr)) {
      dockerAvailable = false;
      return await runCppDirect(code, input);
    }

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
    // EXECUTE (Hardened Sandbox)
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
      "32",
      "--cap-drop=ALL",
      "--security-opt=no-new-privileges",
      "-v",
      `${tempDir}:/workspace:ro`, // Read-only mount to prevent file tampering
      "gcc:latest",
      "/workspace/main",
    ];

    const executeResult = await executeDocker(
      executeArgs,
      input,
      TIME_LIMIT,
      containerName
    );

    if (executeResult.isDockerMissing || isDockerDaemonError(executeResult.stderr)) {
      dockerAvailable = false;
      return await runCppDirect(code, input);
    }

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
      executionTimeMs: executeResult.executionTimeMs,
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

export async function runPythonDirect(code, input = "") {
  const id = crypto.randomUUID();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `dsa-py-${id}-`));
  const sourcePath = path.join(tempDir, "main.py");

  try {
    await fs.writeFile(sourcePath, code, "utf8");

    let pythonCmd = "python3";
    if (process.platform === "win32") {
      pythonCmd = "python";
    }

    let executeResult = await executeProcess(
      pythonCmd,
      ["-B", "main.py"],
      input,
      TIME_LIMIT,
      tempDir
    );

    if (
      !executeResult.success &&
      executeResult.error &&
      executeResult.error.includes("ENOENT")
    ) {
      const fallbackCmd = pythonCmd === "python3" ? "python" : "python3";
      executeResult = await executeProcess(
        fallbackCmd,
        ["-B", "main.py"],
        input,
        TIME_LIMIT,
        tempDir
      );
    }

    return executeResult;
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

export async function runPython(code, input = "") {
  const hasDocker = await checkDocker();
  if (!hasDocker) {
    return await runPythonDirect(code, input);
  }

  const id = crypto.randomUUID();
  const containerName = `dsa-py-${id}`;

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `${containerName}-`)
  );

  const sourcePath = path.join(tempDir, "main.py");

  try {
    await fs.writeFile(sourcePath, code, "utf8");

    // =========================
    // EXECUTE PYTHON (Hardened Sandbox)
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
      "32",
      "--cap-drop=ALL",
      "--security-opt=no-new-privileges",
      "-v",
      `${tempDir}:/workspace:ro`, // Read-only mount to prevent writing to disk
      "gcc:latest",
      "python3",
      "-B", // Don't write .pyc bytecode cache
      "/workspace/main.py",
    ];

    const executeResult = await executeDocker(
      executeArgs,
      input,
      TIME_LIMIT,
      containerName
    );

    if (executeResult.isDockerMissing || isDockerDaemonError(executeResult.stderr)) {
      dockerAvailable = false;
      return await runPythonDirect(code, input);
    }

    if (executeResult.outputLimitExceeded) {
      return {
        success: false,
        verdict: "OUTPUT_LIMIT_EXCEEDED",
        output: "",
        error: "Program produced too much output.",
      };
    }

    if (executeResult.timedOut) {
      return {
        success: false,
        verdict: "TIME_LIMIT_EXCEEDED",
        output: executeResult.stdout,
        error: "Program exceeded the time limit.",
      };
    }

    if (executeResult.oomKilled) {
      return {
        success: false,
        verdict: "MEMORY_LIMIT_EXCEEDED",
        output: executeResult.stdout,
        error: "Program exceeded the memory limit.",
      };
    }

    if (executeResult.exitCode !== 0) {
      const isSyntax =
        executeResult.stderr && executeResult.stderr.includes("SyntaxError");

      return {
        success: false,
        verdict: isSyntax ? "COMPILATION_ERROR" : "RUNTIME_ERROR",
        output: executeResult.stdout,
        error:
          executeResult.stderr ||
          `Program exited with code ${executeResult.exitCode}.`,
      };
    }

    return {
      success: true,
      verdict: "EXECUTED",
      output: executeResult.stdout,
      executionTimeMs: executeResult.executionTimeMs,
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
    const startTime = Date.now();
    let isDockerMissing = false;

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
        child.kill();
      }
    });

    // =========================
    // PROCESS ERROR
    // =========================

    child.on("error", (error) => {
      if (finished) return;

      finished = true;
      const executionTimeMs = Math.max(1, Date.now() - startTime);
      isDockerMissing = error.code === "ENOENT";

      resolve({
        stdout,
        stderr: isDockerMissing
          ? "Docker is not installed or not in PATH."
          : error.message,
        exitCode: -1,
        timedOut: false,
        outputLimitExceeded,
        executionTimeMs,
        isDockerMissing,
      });
    });

    // =========================
    // PROCESS CLOSE
    // =========================

    child.on("close", async (exitCode) => {
      if (finished) return;

      finished = true;
      const executionTimeMs = Math.max(1, Date.now() - startTime);

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
        executionTimeMs,
        isDockerMissing,
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

      if (containerName) {
        await removeContainer(containerName);
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

function executeProcess(cmd, args, input = "", timeout = TIME_LIMIT, cwd = null) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let outputLimitExceeded = false;
    let finished = false;

    const child = spawn(cmd, args, {
      cwd: cwd || undefined,
      windowsHide: true,
    });

    child.stdout.on("data", (data) => {
      if (finished) return;
      stdout += data.toString();
      if (Buffer.byteLength(stdout, "utf8") > OUTPUT_LIMIT) {
        outputLimitExceeded = true;
        child.kill();
      }
    });

    child.stderr.on("data", (data) => {
      if (finished) return;
      stderr += data.toString();
      if (Buffer.byteLength(stderr, "utf8") > OUTPUT_LIMIT) {
        outputLimitExceeded = true;
        child.kill();
      }
    });

    child.on("error", (err) => {
      if (finished) return;
      finished = true;
      resolve({
        success: false,
        verdict: "SANDBOX_ERROR",
        output: stdout,
        error: `${cmd} execution failed: ${err.message}`,
        exitCode: -1,
        executionTimeMs: Math.max(1, Date.now() - startTime),
      });
    });

    child.on("close", (exitCode) => {
      if (finished) return;
      finished = true;
      const executionTimeMs = Math.max(1, Date.now() - startTime);

      if (outputLimitExceeded) {
        resolve({
          success: false,
          verdict: "OUTPUT_LIMIT_EXCEEDED",
          output: "",
          error: "Program produced too much output.",
          exitCode,
          executionTimeMs,
        });
        return;
      }

      if (timedOut) {
        resolve({
          success: false,
          verdict: "TIME_LIMIT_EXCEEDED",
          output: stdout,
          error: "Program exceeded the time limit.",
          exitCode,
          executionTimeMs,
        });
        return;
      }

      if (exitCode !== 0) {
        const isSyntax =
          (stderr && (stderr.includes("SyntaxError") || stderr.includes("error:"))) || false;
        resolve({
          success: false,
          verdict: isSyntax ? "COMPILATION_ERROR" : "RUNTIME_ERROR",
          output: stdout,
          error: stderr || `Process exited with code ${exitCode}.`,
          exitCode,
          executionTimeMs,
        });
        return;
      }

      resolve({
        success: true,
        verdict: "EXECUTED",
        output: stdout,
        error: null,
        exitCode: 0,
        executionTimeMs,
      });
    });

    if (child.stdin) {
      child.stdin.on("error", () => {});
      if (input) {
        child.stdin.write(input);
      }
      child.stdin.end();
    }

    const timer = setTimeout(() => {
      if (finished) return;
      timedOut = true;
      child.kill();
    }, timeout);

    child.on("close", () => clearTimeout(timer));
  });
}

export async function runJavaScript(code, input = "") {
  const id = crypto.randomUUID();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `dsa-js-${id}-`));
  const sourcePath = path.join(tempDir, "solution.js");

  try {
    await fs.writeFile(sourcePath, code, "utf8");
    return await executeProcess("node", [sourcePath], input, TIME_LIMIT, tempDir);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

export async function runJava(code, input = "") {
  const id = crypto.randomUUID();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `dsa-java-${id}-`));
  const sourcePath = path.join(tempDir, "Main.java");

  try {
    await fs.writeFile(sourcePath, code, "utf8");
    const compileResult = await executeProcess("javac", ["Main.java"], "", COMPILE_TIME_LIMIT, tempDir);
    if (compileResult.exitCode !== 0) {
      return {
        success: false,
        verdict: "COMPILATION_ERROR",
        output: "",
        error: compileResult.error || compileResult.stderr || "Java compilation failed.",
      };
    }

    return await executeProcess("java", ["-Xmx128m", "Main"], input, TIME_LIMIT, tempDir);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}