import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/mongodb";
import Submission from "../../../models/Submission";

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json(
      {
        success: false,
        submissions: [],
        message: "Authentication required to view submissions.",
      },
      {
        status: 401,
      }
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (jwtErr) {
    cookieStore.delete("token");
    const isExpired = jwtErr.name === "TokenExpiredError";
    return Response.json(
      {
        success: false,
        submissions: [],
        message: isExpired
          ? "Session has expired. Please log in again."
          : "Invalid authentication token.",
      },
      {
        status: 401,
      }
    );
  }

  if (!decoded?.userId) {
    cookieStore.delete("token");
    return Response.json(
      {
        success: false,
        submissions: [],
        message: "Invalid session token.",
      },
      {
        status: 401,
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const problemIdParam = searchParams.get("problemId");

  // Validate problemIdParam if supplied
  let problemId = null;
  if (problemIdParam !== null && problemIdParam !== undefined) {
    const parsedId = Number(problemIdParam);
    if (!Number.isInteger(parsedId) || parsedId < 1) {
      return Response.json(
        {
          success: false,
          submissions: [],
          message: "Invalid problem ID provided.",
        },
        {
          status: 400,
        }
      );
    }
    problemId = parsedId;
  }

  try {
    await connectDB();
  } catch (dbErr) {
    console.error("Database connection failure in submissions route:", dbErr.message);
    return Response.json(
      {
        success: false,
        submissions: [],
        error: "Database service temporarily unavailable.",
      },
      {
        status: 503,
      }
    );
  }

  try {
    // Strictly scoped to the authenticated user's verified JWT userId
    const query = { userId: decoded.userId };
    if (problemId !== null) {
      query.problemId = problemId;
    }

    const limitParam = searchParams.get("limit");
    let fetchLimit = 50;
    if (limitParam !== null) {
      const parsed = Number(limitParam);
      if (Number.isInteger(parsed) && parsed > 0 && parsed <= 100) {
        fetchLimit = parsed;
      }
    }

    const submissions = await Submission.find(query)
      .sort({ createdAt: -1 })
      .limit(fetchLimit)
      .select("problemId language verdict passed total createdAt code runtimeMs");

    return Response.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error("Fetch submissions error:", error);

    return Response.json(
      {
        success: false,
        submissions: [],
        error: "Failed to fetch submissions.",
      },
      {
        status: 500,
      }
    );
  }
}
