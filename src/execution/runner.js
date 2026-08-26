import { execFile } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";
import crypto from "crypto";

export async function runCpp(code, input = "") {
  const id = crypto.randomUUID();

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `dsa-${id}-`)
  );

  const sourcePath = path.join(tempDir, "main.cpp");

  try {
    await fs.writeFile(sourcePath, code, "utf8");

    const dockerArgs = [
      "run",
      "--rm",

      "--network",
      "none",

      "--memory",
      "256m",

      "--cpus",
      "1",

      "--pids-limit",
      "64",

      "-v",
      `${tempDir}:/workspace`,

      "gcc:latest",

      "bash",
      "-c",

      "g++ /workspace/main.cpp -o /workspace/main && /workspace/main",
    ];

    const result = await new Promise((resolve) => {
      const child = execFile(
        "docker",
        dockerArgs,
        {
          timeout: 10000,
          maxBuffer: 1024 * 1024,
        },
        (error, stdout, stderr) => {
          resolve({
            error,
            stdout,
            stderr,
          });
        }
      );

      child.stdin.write(input);
      child.stdin.end();
    });

    if (result.error) {
      if (result.error.killed) {
        return {
          success: false,
          verdict: "TIME_LIMIT_EXCEEDED",
          output: result.stdout,
          error:
            "Program exceeded the execution time limit.",
        };
      }

      return {
        success: false,
        verdict: "COMPILATION_ERROR",
        output: result.stdout,
        error:
          result.stderr || result.error.message,
      };
    }

    return {
      success: true,
      verdict: "EXECUTED",
      output: result.stdout,
      error: result.stderr,
    };
  } finally {
    await fs.rm(tempDir, {
      recursive: true,
      force: true,
    });
  }
}