import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/config";
import User from "@/models/User";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { firstName, lastName, mobileNumber, email, password } =
      await req.json();

    if (!firstName || !lastName || !mobileNumber || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 400 }
        );
      }
      if (existingUser.mobileNumber === mobileNumber) {
        return NextResponse.json(
          { message: "Mobile number already in use" },
          { status: 400 }
        );
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      password: hashedPassword,
      role: "customer",
    });

    await newUser.save();

    const token = generateToken({
      _id: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: "Registration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
