import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/mongodb";
import Submission from "../../../models/Submission";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          submissions: [],
          message: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return Response.json(
        {
          success: false,
          submissions: [],
          message: "Invalid token.",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get("problemId");

    await connectDB();

    const query = { userId: decoded.userId };
    if (problemId) {
      query.problemId = Number(problemId);
    }

    const submissions = await Submission.find(query)
      .sort({ createdAt: -1 })
      .limit(10)
      .select("problemId language verdict passed total createdAt code");

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
