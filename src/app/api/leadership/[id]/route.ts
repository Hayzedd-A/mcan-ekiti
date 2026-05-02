import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LeadershipModel from "@/models/Leadership";
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

  for (const key of ["name", "position", "title"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }
  const order = formData.get("order");
  if (order !== null) update.order = Number(order);

  const leader = await LeadershipModel.findById(params.id);
  if (!leader)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    if (leader.image) {
      await deleteImage(leader.image);
    }
    update.image = await uploadImage(buffer, "mcan-ekiti/leadership");
  }

  const updatedLeader = await LeadershipModel.findByIdAndUpdate(
    params.id,
    update,
    { new: true },
  );
  return NextResponse.json({ success: true, data: updatedLeader });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const leader = await LeadershipModel.findById(params.id);
  if (!leader)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (leader.image) {
    await deleteImage(leader.image);
  }
  await LeadershipModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
