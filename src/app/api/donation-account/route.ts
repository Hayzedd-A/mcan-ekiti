import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DonationAccountModel from "@/models/DonationAccount";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  await connectDB();
  // Use findOne — single record
  const account = await DonationAccountModel.findOne();
  return NextResponse.json({ success: true, data: account });
}

export async function PUT(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { bankName, accountName, accountNumber } = await req.json();

  if (!bankName || !accountName || !accountNumber) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const account = await DonationAccountModel.findOneAndUpdate(
    {},
    { bankName, accountName, accountNumber },
    { upsert: true, returnDocument: "after" },
  );

  return NextResponse.json({ success: true, data: account });
}
