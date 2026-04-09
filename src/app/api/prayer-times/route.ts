import { PRAYER_LAT, PRAYER_LNG, PRAYER_METHOD } from "@/config/constants";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400; // cache for 24 hours

export async function GET(_req: NextRequest) {
  try {
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getFullYear()}`;

    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${PRAYER_LAT}&longitude=${PRAYER_LNG}&method=${PRAYER_METHOD}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) throw new Error("Aladhan API error");

    const data = await res.json();
    const timings = data.data.timings;

    const prayers = [
      { name: "Fajr", time: timings.Fajr },
      { name: "Sunrise", time: timings.Sunrise },
      { name: "Dhur", time: timings.Dhuhr },
      { name: "Asr", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha'a", time: timings.Isha },
    ];

    return NextResponse.json({ success: true, date: dateStr, prayers });
  } catch (err) {
    console.error("Prayer times error:", err);
    return NextResponse.json(
      { error: "Failed to fetch prayer times" },
      { status: 500 },
    );
  }
}
