import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LodgeModel from "@/models/Lodge";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const update: Record<string, unknown> = {};

  for (const key of ["title", "description", "status", "location"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }

  const imageFile = formData.get("image") as File | null;
  let lodge = await LodgeModel.findById(params.id);
  if (!lodge) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (imageFile && imageFile.size > 0) {
    if (lodge.image) {
      await deleteImage(lodge.image);
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    update.image = await uploadImage(buffer, "mcan-ekiti/lodges");
  }

  lodge = await LodgeModel.findByIdAndUpdate(params.id, update, { new: true });
  if (!lodge) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: lodge });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const lodge = await LodgeModel.findById(params.id);
  if (!lodge) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (lodge.image) {
    await deleteImage(lodge.image);
  }
  await LodgeModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
