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

    console.log("Execution request received:");
    console.log({
      language,
      problemId,
      code,
    });

    return Response.json({
      success: true,
      status: "completed",
      message: "Execution service received your code.",
      result: {
        passed: 0,
        total: 0,
        verdict: "EXECUTION_PENDING",
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Invalid request",
      },
      {
        status: 500,
      }
    );
  }
}