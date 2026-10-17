import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import { runCpp, runPython } from "../../../execution/runner";
import { evaluateTestCases } from "../../../execution/testRunner";
import problems from "../../data/problems";

export async function POST(request) {
  try {
    const body = await request.json();

    const { code, language, problemId, isSubmit, customInput } = body;

    if (!code || !language || !problemId) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

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

    const problem = problems.find(
      (item) => item.id === Number(problemId)
    );

    if (!problem) {
      return Response.json(
        {
          success: false,
          error: "Problem not found.",
        },
        {
          status: 404,
        }
      );
    }

    const runnerFn = language === "python" ? runPython : runCpp;

    // Handle Custom Input run directly without comparing testcase assertions
    if (typeof customInput === "string") {
      const customResult = await runnerFn(code, customInput);

      return Response.json({
        success: true,
        problemId,
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
        error: "No test cases available.",
      });
    }

    const evaluation = await evaluateTestCases(
      testCases,
      async (testCase) => {
        return await runnerFn(
          code,
          testCase.input
        );
      }
    );

    let savedToCloud = false;

    // If it's a formal submission, persist to database if authenticated
    if (isSubmit) {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          if (decoded?.userId) {
            await connectDB();

            await Submission.create({
              userId: decoded.userId,
              problemId: Number(problemId),
              language,
              code,
              verdict: evaluation.verdict,
              passed: evaluation.passed,
              total: evaluation.total,
              runtimeMs: evaluation.runtimeMs || 0,
            });

            if (evaluation.verdict === "ACCEPTED") {
              await User.findByIdAndUpdate(decoded.userId, {
                $addToSet: { solvedProblems: Number(problemId) },
              });
            }

            savedToCloud = true;
          }
        }
      } catch (dbErr) {
        console.error("Submission cloud save warning:", dbErr.message);
      }
    }

    return Response.json({
      success: true,
      problemId,
      language,
      result: evaluation,
      savedToCloud,
    });
  } catch (error) {
    console.error(
      "Execution API error:",
      error
    );

    return Response.json(
      {
        success: false,
        error: "Execution server error.",
      },
      {
        status: 500,
      }
    );
  }
}