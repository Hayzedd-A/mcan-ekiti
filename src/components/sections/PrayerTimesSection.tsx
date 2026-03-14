"use client";
import { MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface PrayerTime {
  name: string;
  time: string;
}

// Prayer icon SVGs
function PrayerIcon({ name }: { name: string }) {
  if (name === "Fajr" || name === "Sunrise") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1B6B3A]">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "Dhur") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1B6B3A]">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "Asr") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1B6B3A]">
        <path d="M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v2M12 20v2M4 4l1.5 1.5M18.5 18.5L20 20M2 12h2M20 12h2M4 20l1.5-1.5M18.5 5.5L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1B6B3A]">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IslamicPattern() {
  return (
    <svg width="180" height="180" viewBox="0 0 200 200" fill="none" className="absolute right-4 top-0 opacity-30">
      <circle cx="100" cy="100" r="90" stroke="#1B6B3A" strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="100" r="70" stroke="#1B6B3A" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="50" stroke="#1B6B3A" strokeWidth="1" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 90 * Math.cos(rad);
        const y1 = 100 + 90 * Math.sin(rad);
        const x2 = 100 - 90 * Math.cos(rad);
        const y2 = 100 - 90 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1B6B3A" strokeWidth="0.5" opacity="0.6" />;
      })}
      <polygon points="100,30 118,85 175,85 129,118 147,173 100,140 53,173 71,118 25,85 82,85" stroke="#1B6B3A" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

export default function PrayerTimesSection({ prayers }: { prayers: PrayerTime[] }) {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const dateString = now.toLocaleDateString("en-NG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDateTime(`${dateString}, ${timeString}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #f8fdf9 0%, #e8f5ee 100%)" }}>
        <IslamicPattern />
        <div className="relative z-10">
          <h3 className="text-[#1B6B3A] font-semibold text-base mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
            Prayer Times
          </h3>
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-6">
            <MapPin size={14} className="text-[#1B6B3A]" />
            <span className="font-medium">Ado-Ekiti</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-6">
            <Clock size={14} className="text-[#1B6B3A]" />
            <span className="font-medium text-xs">{currentDateTime}</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {prayers.map((prayer) => (
              <div key={prayer.name} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <PrayerIcon name={prayer.name} />
                </div>
                <span className="text-xs font-semibold text-gray-700">{prayer.name}</span>
                <span className="text-xs text-gray-500">{prayer.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
