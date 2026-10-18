import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { signupLimiter, getClientIp } from "../../../../lib/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = signupLimiter.check(ip);

    if (!rateCheck.allowed) {
      return Response.json(
        {
          success: false,
          message: `Too many registration attempts. Please try again in ${rateCheck.resetInSeconds} seconds.`,
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

    const { name, email, password } = body || {};

    // Validate name
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 50) {
      return Response.json(
        {
          success: false,
          message: "Name must be between 2 and 50 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate email
    if (
      typeof email !== "string" ||
      email.length > 255 ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return Response.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate password
    if (typeof password !== "string" || password.length < 6 || password.length > 128) {
      return Response.json(
        {
          success: false,
          message: "Password must be between 6 and 128 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();

    try {
      await connectDB();
    } catch (dbErr) {
      console.error("Database connection failure during signup:", dbErr.message);
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

    const existingUser = await User.findOne({
      email: sanitizedEmail,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        message: "Account created successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred during signup.",
      },
      {
        status: 500,
      }
    );
  }
}