import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import MemberModel from "@/models/Member";
import { getAdminFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, email, phone, stateCode, ppa, lga, gender } = body;

    // Validate all fields
    if (!fullName || !email || !phone || !stateCode || !ppa || !lga || !gender) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const member = await MemberModel.create({ fullName, email, phone, stateCode, ppa, lga, gender });
    return NextResponse.json({ success: true, message: "Registration successful", id: member._id }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  await connectDB();

  // Build query
  const query: any = {};
  if (search) {
    const searchRegex = new RegExp(search, "i");
    query.$or = [
      { fullName: searchRegex },
      { email: searchRegex },
      { stateCode: searchRegex },
      { lga: searchRegex },
      { ppa: searchRegex },
    ];
  }

  const [members, total] = await Promise.all([
    MemberModel.find(query)
      .sort({ registeredAt: -1 })
      .skip(skip)
      .limit(limit),
    MemberModel.countDocuments(query)
  ]);

  return NextResponse.json({ 
    success: true, 
    data: members,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
}
