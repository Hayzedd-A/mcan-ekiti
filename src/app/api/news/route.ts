import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NewsModel from "@/models/News";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const filter = category ? { category } : {};
  const news = await NewsModel.find(filter).sort({ createdAt: -1 }).select("-story");
  return NextResponse.json({ success: true, data: news });
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const story = formData.get("story") as string;
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !shortDescription || !story || !category) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  // Generate unique slug
  let slug = slugify(title);
  const existing = await NewsModel.findOne({ slug });
  if (existing) slug = `${slug}-${Date.now()}`;

  let image: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    image = await uploadImage(buffer, "mcan-ekiti/news");
  }

  const news = await NewsModel.create({ title, shortDescription, story, category, image, slug });
  return NextResponse.json({ success: true, data: news }, { status: 201 });
}
