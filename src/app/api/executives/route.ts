import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ExecutiveModel from "@/models/Executive";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const filter = year ? { year } : {};
  const executives = await ExecutiveModel.find(filter).sort({ order: 1 });

  // Also return distinct years list
  const years = await ExecutiveModel.distinct("year");
  years.sort((a, b) => (b as string).localeCompare(a as string));

  return NextResponse.json({ success: true, data: executives, years });
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const title = formData.get("title") as string;
  const year = formData.get("year") as string;
  const order = Number(formData.get("order") ?? 0);
  const imageFile = formData.get("photo") as File | null;

  if (!name || !position || !title || !year) {
    return NextResponse.json({ error: "name, position, title, year required" }, { status: 400 });
  }

  let profilePic: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    profilePic = await uploadImage(buffer, "mcan-ekiti/executives");
  }

  const exec = await ExecutiveModel.create({ name, position, title, year, order, profilePic });
  return NextResponse.json({ success: true, data: exec }, { status: 201 });
}
