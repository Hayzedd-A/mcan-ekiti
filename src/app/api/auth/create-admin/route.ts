import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { X_API_KEY } from "@/config/constants";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== X_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 },
      );
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({ email, password: hashedPassword });
    return NextResponse.json(
      { success: true, message: "Admin created", id: admin._id },
      { status: 201 },
    );
  } catch (err) {
    console.error("Create admin error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
