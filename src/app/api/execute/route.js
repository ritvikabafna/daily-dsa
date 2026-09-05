import { runCpp } from "../../../execution/runner";
import { evaluateTestCases } from "../../../execution/testRunner";
import problems from "../../data/problems";

export async function POST(request) {
  try {
    const body = await request.json();

    const { code, language, problemId } = body;

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

    if (language !== "cpp") {
      return Response.json(
        {
          success: false,
          error: "Only C++ is supported right now.",
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
        return await runCpp(
          code,
          testCase.input
        );
      }
    );

    return Response.json({
      success: true,
      problemId,
      language,
      result: evaluation,
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