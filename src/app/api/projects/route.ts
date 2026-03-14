import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const projects = await ProjectModel.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectedAmount = Number(formData.get("projectedAmount") ?? 0);
  const amountRaised = Number(formData.get("amountRaised") ?? 0);
  const status = formData.get("status") as string;
  const location = formData.get("location") as string;
  const projectedDate = formData.get("projectedDate") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !description || !location) {
    return NextResponse.json({ error: "title, description, location required" }, { status: 400 });
  }

  let imageUrl: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageUrl = await uploadImage(buffer, "mcan-ekiti/projects");
  }

  const project = await ProjectModel.create({
    title, description, projectedAmount, amountRaised, status: status || "Ongoing",
    location, projectedDate, image: imageUrl,
  });

  return NextResponse.json({ success: true, data: project }, { status: 201 });
}
