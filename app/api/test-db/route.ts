import { NextResponse } from "next/server";
import { connectDB } from "@/database/config";

export async function GET() {
  await connectDB();
  return NextResponse.json({ message: "Hello from MongoDB API!" });
}
