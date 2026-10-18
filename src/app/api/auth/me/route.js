import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET() {
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

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (jwtErr) {
    // Clear expired or invalid cookie
    cookieStore.delete("token");

    const isExpired = jwtErr.name === "TokenExpiredError";
    return Response.json(
      {
        success: false,
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
        message: "Malformed authentication session.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await connectDB();
  } catch (dbErr) {
    console.error("Database connection failure during auth check:", dbErr.message);
    return Response.json(
      {
        success: false,
        message: "Database service temporarily unavailable.",
      },
      {
        status: 503,
      }
    );
  }

  try {
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      cookieStore.delete("token");
      return Response.json(
        {
          success: false,
          message: "User account no longer exists.",
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
    console.error("Auth me error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to authenticate session.",
      },
      {
        status: 500,
      }
    );
  }
}