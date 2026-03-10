import { events } from "@/lib/data";
import Image from "next/image";

export default function EventsPage() {
  const upcomingImage =
    "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80";

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event List */}
          <div className="lg:col-span-2 space-y-3">
            {[...events, ...events].map((event, idx) => (
              <div
                key={`${event.id}-${idx}`}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-[#1B6B3A]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-16">
                  <div className="text-xs font-medium text-gray-800">
                    {event.month} {event.day}
                  </div>
                  <div className="text-xs text-gray-400">{event.dayOfWeek}</div>
                </div>
                <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800">{event.title}</div>
                  <div className="text-xs text-gray-400">
                    {event.time}, {event.location}
                  </div>
                </div>
                <button className="flex-shrink-0 border border-[#1B6B3A] text-[#1B6B3A] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors">
                  View details
                </button>
              </div>
            ))}
          </div>

          {/* Upcoming events */}
          <div className="space-y-4">
            <h3
              className="text-sm font-semibold text-gray-700"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Upcoming Events
            </h3>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="relative h-44">
                <Image
                  src={upcomingImage}
                  alt="Upcoming Event"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500">Just the title of the event here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
