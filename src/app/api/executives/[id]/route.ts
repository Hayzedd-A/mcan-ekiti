import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ExecutiveModel from "@/models/Executive";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

interface Params { params: { id: string } }

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const update: Record<string, unknown> = {};

  for (const key of ["name", "position", "title", "year"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }
  const order = formData.get("order");
  if (order !== null) update.order = Number(order);

  const imageFile = formData.get("photo") as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    update.profilePic = await uploadImage(buffer, "mcan-ekiti/executives");
  }

  const exec = await ExecutiveModel.findByIdAndUpdate(params.id, update, { new: true });
  if (!exec) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: exec });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await ExecutiveModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
