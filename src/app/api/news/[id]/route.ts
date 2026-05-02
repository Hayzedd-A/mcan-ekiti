import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NewsModel from "@/models/News";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  // Support both _id and slug lookup
  const news =
    (await NewsModel.findById(params.id).catch(() => null)) ??
    (await NewsModel.findOne({ slug: params.id }));
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: news });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const update: Record<string, unknown> = {};

  for (const key of ["title", "shortDescription", "story", "category"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }

  let news = await NewsModel.findById(params.id);
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    if (news.image) {
      await deleteImage(news.image);
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    update.image = await uploadImage(buffer, "mcan-ekiti/news");
  }

  news = await NewsModel.findByIdAndUpdate(params.id, update, { new: true });
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: news });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const news = await NewsModel.findById(params.id);
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (news.image) {
    await deleteImage(news.image);
  }
  await NewsModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
