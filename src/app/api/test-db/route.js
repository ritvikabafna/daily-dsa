import connectDB from "../../../lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      status: "healthy",
      service: "database",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check error:", error.message);

    return Response.json(
      {
        status: "unhealthy",
        service: "database",
        error: "Database service unavailable",
      },
      {
        status: 503,
      }
    );
  }
}