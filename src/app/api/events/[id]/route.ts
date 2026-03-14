import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import EventModel from "@/models/Event";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const event = await EventModel.findById(params.id);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: event });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();
  const update: Record<string, unknown> = {};

  for (const key of ["date", "title", "description", "status", "location", "occurrence"]) {
    const val = formData.get(key);
    if (val !== null) update[key] = val;
  }
  const cost = formData.get("cost");
  if (cost !== null) update.cost = Number(cost);

  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    update.imageBanner = await uploadImage(buffer, "mcan-ekiti/events");
  }

  const event = await EventModel.findByIdAndUpdate(params.id, update, { new: true });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: event });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await EventModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
