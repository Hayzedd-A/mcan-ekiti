import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const project = await ProjectModel.findById(params.id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: project });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const update: Record<string, unknown> = {};

  for (const key of ["title", "description", "status", "location", "projectedDate"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }
  for (const key of ["projectedAmount", "amountRaised"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = Number(val);
  }

  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    update.image = await uploadImage(buffer, "mcan-ekiti/projects");
  }

  const project = await ProjectModel.findByIdAndUpdate(params.id, update, { new: true });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: project });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await ProjectModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
