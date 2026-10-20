import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import { runCpp, runPython } from "../../../execution/runner";
import { evaluateTestCases } from "../../../execution/testRunner";
import { wrapSolutionWithDriver } from "../../../execution/solutionHarness";
import problems from "../../data/problems";
import { executeLimiter, getClientIp } from "../../../lib/rateLimit";

const MAX_CODE_BYTES = 64 * 1024; // 64 KB limit
const MAX_INPUT_BYTES = 32 * 1024; // 32 KB limit

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = executeLimiter.check(ip);

    if (!rateCheck.allowed) {
      return Response.json(
        {
          success: false,
          error: `Execution rate limit reached. Please wait ${rateCheck.resetInSeconds}s before running code again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.resetInSeconds),
          },
        }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          error: "Invalid JSON request body.",
        },
        {
          status: 400,
        }
      );
    }

    const { code, language, problemId, isSubmit, customInput } = body || {};

    // Validate code
    if (typeof code !== "string" || code.trim().length === 0) {
      return Response.json(
        {
          success: false,
          error: "Code cannot be empty.",
        },
        {
          status: 400,
        }
      );
    }

    if (Buffer.byteLength(code, "utf8") > MAX_CODE_BYTES) {
      return Response.json(
        {
          success: false,
          error: `Code size exceeds maximum limit of 64KB (${Math.round(Buffer.byteLength(code, "utf8") / 1024)}KB).`,
        },
        {
          status: 400,
        }
      );
    }

    // Validate language
    if (language !== "cpp" && language !== "python") {
      return Response.json(
        {
          success: false,
          error: "Unsupported language. Supported: C++ (cpp) and Python 3 (python).",
        },
        {
          status: 400,
        }
      );
    }

    // Validate problemId
    const numericProblemId = Number(problemId);
    if (!Number.isInteger(numericProblemId) || numericProblemId < 1) {
      return Response.json(
        {
          success: false,
          error: "Invalid problem ID provided.",
        },
        {
          status: 400,
        }
      );
    }

    const problem = problems.find((item) => item.id === numericProblemId);
    if (!problem) {
      return Response.json(
        {
          success: false,
          error: `Problem with ID ${numericProblemId} not found.`,
        },
        {
          status: 404,
        }
      );
    }

    // Validate custom input if provided
    if (customInput !== undefined && customInput !== null) {
      if (typeof customInput !== "string") {
        return Response.json(
          {
            success: false,
            error: "Custom input must be a string.",
          },
          {
            status: 400,
          }
        );
      }
      if (Buffer.byteLength(customInput, "utf8") > MAX_INPUT_BYTES) {
        return Response.json(
          {
            success: false,
            error: `Custom input exceeds maximum limit of 32KB.`,
          },
          {
            status: 400,
          }
        );
      }
    }

    const runnerFn = language === "python" ? runPython : runCpp;
    const executionCode = wrapSolutionWithDriver(code, numericProblemId, language);

    // Handle Custom Input run directly without comparing testcase assertions
    if (typeof customInput === "string") {
      const customResult = await runnerFn(executionCode, customInput);

      return Response.json({
        success: customResult.success,
        problemId: numericProblemId,
        language,
        result: {
          isCustom: true,
          verdict: customResult.verdict,
          output: customResult.output,
          error: customResult.error,
          input: customInput,
          runtimeMs: customResult.executionTimeMs || 0,
        },
        savedToCloud: false,
      });
    }

    const testCases = problem.testCases;
    if (!testCases || testCases.length === 0) {
      return Response.json({
        success: false,
        error: "No test cases configured for this problem.",
      });
    }

    const evaluation = await evaluateTestCases(testCases, async (testCase) => {
      return await runnerFn(executionCode, testCase.input);
    });

    let savedToCloud = false;
    let cloudSaveWarning = null;

    // If it's a formal submission, persist to database if authenticated
    if (isSubmit) {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded?.userId) {
              await connectDB();

              await Submission.create({
                userId: decoded.userId,
                problemId: numericProblemId,
                language,
                code,
                verdict: evaluation.verdict,
                passed: evaluation.passed,
                total: evaluation.total,
                runtimeMs: evaluation.runtimeMs || 0,
              });

              if (evaluation.verdict === "ACCEPTED") {
                await User.findByIdAndUpdate(decoded.userId, {
                  $addToSet: { solvedProblems: numericProblemId },
                });
              }

              savedToCloud = true;
            }
          } catch (jwtErr) {
            cloudSaveWarning = "Session expired. Submission saved locally only.";
          }
        }
      } catch (dbErr) {
        console.error("Submission cloud save warning:", dbErr.message);
        cloudSaveWarning = "Database unavailable. Submission saved locally only.";
      }
    }

    return Response.json({
      success: true,
      problemId: numericProblemId,
      language,
      result: evaluation,
      savedToCloud,
      cloudSaveWarning,
    });
  } catch (error) {
    console.error("Execution API error:", error);

    return Response.json(
      {
        success: false,
        error: "Internal execution server error. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}