"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IExecutive } from "@/models/Executive";

interface ExecutivesData {
  data: IExecutive[];
  years: string[];
}

export default function ExecutivesPage() {
  const [execs, setExecs] = useState<IExecutive[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [activeYear, setActiveYear] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/executives")
      .then((r) => r.json())
      .then((data: ExecutivesData) => {
        setYears(data.years ?? []);
        if (data.years?.length > 0) {
          setActiveYear(data.years[0]);
          setExecs(data.data.filter((e) => e.year === data.years[0]));
        } else {
          setExecs(data.data ?? []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleYearChange = async (year: string) => {
    setActiveYear(year);
    setLoading(true);
    try {
      const res = await fetch(`/api/executives?year=${encodeURIComponent(year)}`);
      const data = await res.json();
      setExecs(data.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Year Switcher */}
        {years.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeYear === year
                    ? "bg-[#1B6B3A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#e8f5ee] hover:text-[#1B6B3A]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{activeYear}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>
          {activeYear} MCAN Ekiti State Executives
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-square bg-gray-200 rounded-xl mb-3" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-1" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : execs.length === 0 ? (
          <p className="text-gray-400 text-sm">No executives found for this year.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {execs.map((exec) => (
              <div key={exec._id} className="text-center">
                <div className="w-full aspect-square bg-gray-100 rounded-xl mb-3 border-2 border-gray-100 overflow-hidden relative">
                  {exec.profilePic ? (
                    <Image src={exec.profilePic} alt={exec.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{exec.name}, {exec.title}</p>
                <p className="text-xs font-semibold text-gray-700">{exec.position}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
