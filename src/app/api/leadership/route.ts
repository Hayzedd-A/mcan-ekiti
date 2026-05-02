import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LeadershipModel from "@/models/Leadership";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const leadership = await LeadershipModel.find({}).sort({ order: 1 });
  return NextResponse.json({ success: true, data: leadership });
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const title = formData.get("title") as string;
  const order = Number(formData.get("order") ?? 0);
  const imageFile = formData.get("image") as File | null;

  if (!name || !position) {
    return NextResponse.json(
      { error: "name and position required" },
      { status: 400 },
    );
  }

  let image: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    image = await uploadImage(buffer, "mcan-ekiti/leadership");
  }

  const leader = await LeadershipModel.create({
    name,
    position,
    title,
    order,
    image,
  });
  return NextResponse.json({ success: true, data: leader }, { status: 201 });
}
