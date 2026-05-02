import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ExecutiveModel from "@/models/Executive";
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

  for (const key of ["name", "position", "title", "year"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }
  const order = formData.get("order");
  if (order !== null) update.order = Number(order);

  let executive = await ExecutiveModel.findById(params.id);
  if (!executive)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const imageFile = formData.get("photo") as File | null;
  if (imageFile && imageFile.size > 0) {
    if (executive.profilePic) {
      await deleteImage(executive.profilePic);
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    update.profilePic = await uploadImage(buffer, "mcan-ekiti/executives");
  }

  executive = await ExecutiveModel.findByIdAndUpdate(params.id, update, {
    new: true,
  });
  if (!executive)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: executive });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const executive = await ExecutiveModel.findById(params.id);
  if (!executive)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (executive.profilePic) {
    await deleteImage(executive.profilePic);
  }
  await ExecutiveModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
