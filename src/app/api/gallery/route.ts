import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GalleryModel from "@/models/Gallery";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const images = await GalleryModel.find().sort({ uploadedAt: -1 });
  return NextResponse.json({ success: true, data: images });
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];
  const captions = formData.getAll("captions") as string[];

  if (!files.length) {
    return NextResponse.json({ error: "At least one image required" }, { status: 400 });
  }

  const results = await Promise.all(
    files.map(async (file, i) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, "mcan-ekiti/gallery");
      return GalleryModel.create({ image: imageUrl, caption: captions[i] ?? "" });
    })
  );

  return NextResponse.json({ success: true, data: results }, { status: 201 });
}
