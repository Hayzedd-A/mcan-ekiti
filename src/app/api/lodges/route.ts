import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LodgeModel from "@/models/Lodge";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const lodges = await LodgeModel.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: lodges });
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = (formData.get("status") as string) || "Available";
  const location = formData.get("location") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !description || !location) {
    return NextResponse.json({ error: "title, description, location required" }, { status: 400 });
  }

  let image: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    image = await uploadImage(buffer, "mcan-ekiti/lodges");
  }

  const lodge = await LodgeModel.create({ title, description, status, location, image });
  return NextResponse.json({ success: true, data: lodge }, { status: 201 });
}
