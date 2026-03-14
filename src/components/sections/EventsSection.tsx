"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { IEvent } from "@/models/Event";

interface EventsSectionProps {
  events: IEvent[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  const upcomingEvents = events.filter((event) => event.status === "Upcoming");
  const [slide, setSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(upcomingEvents[slide]);
  const totalSlides = upcomingEvents.length;

  useEffect(() => {
    setCurrentSlide(upcomingEvents[slide]);
  }, [slide]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2
          className="text-3xl font-bold text-[#1B6B3A]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Events
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Stay abreast of our upcoming events and programs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-2">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-[#1B6B3A]/30 transition-colors"
            >
              {/* Date */}
              <div className="flex-shrink-0 w-16">
                <div className="text-xs text-gray-500">
                  {new Date(event.date).toDateString()}
                </div>
                {/* <div className="text-xs text-gray-400">
                  {new Date(event.date).getDay()}
                </div> */}
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-200 flex-shrink-0" />

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  {event.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {event.location}
                </div>
              </div>

              {/* View Details */}
              <button className="flex-shrink-0 border border-[#1B6B3A] text-[#1B6B3A] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors">
                View details
              </button>
            </div>
          ))}
        </div>

        {/* Upcoming Events Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-700">
                Upcoming Events
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSlide(Math.max(0, slide - 1))}
                  className="w-6 h-6 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center hover:bg-[#154a2a] transition-colors"
                >
                  <ChevronLeft size={12} />
                </button>
                <span className="text-xs text-gray-500">
                  {slide + 1}/{totalSlides}
                </span>
                <button
                  onClick={() => setSlide(Math.min(totalSlides - 1, slide + 1))}
                  className="w-6 h-6 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center hover:bg-[#154a2a] transition-colors"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
            {currentSlide && (
              <>
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={currentSlide?.imageBanner || ""}
                    alt="Upcoming Event"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-500">{currentSlide?.title}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
