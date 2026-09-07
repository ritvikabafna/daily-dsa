import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        message: "User created successfully.",
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
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}