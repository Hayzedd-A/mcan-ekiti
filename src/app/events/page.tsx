import Image from "next/image";
import { IEvent } from "@/models/Event";

async function getEvents(): Promise<IEvent[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5321"}/api/events`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

const STATUS_COLORS: Record<string, string> = {
  Upcoming: "bg-[#1B6B3A] text-white",
  Ongoing: "bg-blue-600 text-white",
  Completed: "bg-gray-400 text-white",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80";

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = events.filter((e) => e.status === "Upcoming").slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1B6B3A]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Events
          </h1>
          <p className="text-gray-500 text-sm mt-1">Stay abreast of our upcoming events and programs.</p>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No events available yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event List */}
            <div className="lg:col-span-2 space-y-3">
              {events.map((event) => {
                const d = new Date(event.date);
                const day = d.getDate().toString().padStart(2, "0");
                const month = d.toLocaleString("en-US", { month: "short" });
                const dayOfWeek = d.toLocaleString("en-US", { weekday: "long" });
                return (
                  <div
                    key={event._id}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-[#1B6B3A]/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-16">
                      <div className="text-xs font-medium text-gray-800">{month} {day}</div>
                      <div className="text-xs text-gray-400">{dayOfWeek}</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800">{event.title}</div>
                      <div className="text-xs text-gray-400">{event.location}</div>
                    </div>
                    <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[event.status] ?? "bg-gray-200 text-gray-700"}`}>
                      {event.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Upcoming Events sidebar */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Outfit, sans-serif" }}>
                Upcoming Events
              </h3>
              {upcoming.length === 0 ? (
                <p className="text-xs text-gray-400">No upcoming events.</p>
              ) : (
                upcoming.map((event) => (
                  <div key={event._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                    <div className="relative h-44">
                      <Image
                        src={event.imageBanner || FALLBACK_IMG}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                      {event.cost ? (
                        <p className="text-xs text-[#1B6B3A] font-semibold mt-1">₦{event.cost.toLocaleString()}</p>
                      ) : (
                        <p className="text-xs text-[#1B6B3A] font-semibold mt-1">Free</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
