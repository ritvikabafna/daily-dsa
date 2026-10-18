import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { loginLimiter, getClientIp } from "../../../../lib/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = loginLimiter.check(ip);

    if (!rateCheck.allowed) {
      return Response.json(
        {
          success: false,
          message: `Too many login attempts. Please try again in ${rateCheck.resetInSeconds} seconds.`,
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
          message: "Invalid JSON payload.",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } = body || {};

    if (
      typeof email !== "string" ||
      email.length > 255 ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (typeof password !== "string" || password.length < 1 || password.length > 128) {
      return Response.json(
        {
          success: false,
          message: "Password is required.",
        },
        {
          status: 400,
        }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    try {
      await connectDB();
    } catch (dbErr) {
      console.error("Database connection failure during login:", dbErr.message);
      return Response.json(
        {
          success: false,
          message: "Database service temporarily unavailable. Please try again shortly.",
        },
        {
          status: 503,
        }
      );
    }

    const user = await User.findOne({
      email: sanitizedEmail,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred during login.",
      },
      {
        status: 500,
      }
    );
  }
}
