import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    await connectDB();

    const user = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        solvedProblems: user.solvedProblems || [],
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);

    return Response.json(
      {
        success: false,
        message: "Invalid or expired session.",
      },
      {
        status: 401,
      }
    );
  }
}