import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactSettings from "@/models/Settings";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    let settings = await ContactSettings.findOne();

    if (!settings) {
      // Create default settings if none exist
      settings = await ContactSettings.create({
        phone: "+234 800 000 0000",
        whatsapp: "+234 800 000 0000",
        email: "mcanekitistateado@gmail.com",
        location:
          "MCAN Ekiti secretariat, Ansarudeen Mosque, Atikanakan, Ado ekiti, Ekiti",
        mapsUrl: "https://maps.google.com",
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    await connectDB();

    const settings = await ContactSettings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
