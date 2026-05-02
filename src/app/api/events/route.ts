import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import EventModel from "@/models/Event";
import { uploadImage } from "@/lib/cloudinary";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  await connectDB();
  try {
    let events = await EventModel.find().sort({ date: 1 });
    events = events.sort((a, b) => (b.status === "Ongoing" ? 1 : -1));
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const formData = await req.formData();

  const date = formData.get("date") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = (formData.get("status") as string) || "Upcoming";
  const location = formData.get("location") as string;
  const cost = Number(formData.get("cost") ?? 0);
  const occurrence = (formData.get("occurrence") as string) || "One-time";
  const imageFile = formData.get("image") as File | null;

  if (!date || !title || !description || !location) {
    return NextResponse.json(
      { error: "date, title, description, location required" },
      { status: 400 },
    );
  }

  let imageBanner: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageBanner = await uploadImage(buffer, "mcan-ekiti/events");
  }

  const event = await EventModel.create({
    date,
    title,
    description,
    status,
    location,
    imageBanner,
    cost,
    occurrence,
  });
  return NextResponse.json({ success: true, data: event }, { status: 201 });
}
