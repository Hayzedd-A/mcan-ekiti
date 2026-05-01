"use client";

import { IEvent } from "@/models/Event";
import { NEXT_PUBLIC_BASE_URL } from "@/config/constants";
import Events from "@/components/sections/Events";

async function getEvents(): Promise<IEvent[]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/events`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-[#1B6B3A]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Events
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Stay abreast of our upcoming events and programs.
          </p>
        </div>

        <Events events={events} />
      </div>
    </div>
  );
}
