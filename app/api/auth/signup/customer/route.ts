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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
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
      { message: "Registration successful", token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
