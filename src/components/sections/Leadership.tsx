"use client";

import Image from "next/image";
import { ILeadership } from "@/models/Leadership";
import { NEXT_PUBLIC_BASE_URL } from "@/config/constants";
import { useEffect, useState } from "react";

export default function Leadership() {
  const [leadership, setLeadership] = useState<ILeadership[]>([]);

  async function getLeadership(): Promise<ILeadership[]> {
    console.log("getting leadership");
    try {
      const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/leadership`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data.data ?? [];
    } catch (error) {
      console.error("Error fetching leadership:", error);
      return [];
    }
  }

  useEffect(() => {
    getLeadership().then((data) => {
      setLeadership(data);
    });
  }, []);

  return (
    <section
      id="patrons"
      className="scroll-mt-24 pt-12 border-t border-gray-100"
    >
      <div className="text-center mb-12">
        <p className="text-green-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">
          Our Guiding Light
        </p>
        <h2
          className="text-3xl font-bold text-gray-900 font-display"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          MCAN Ekiti State Leadership
        </h2>
        <div className="w-20 h-1 bg-[#1B6B3A] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {leadership.length > 0 ? (
          leadership.map((leader) => (
            <div key={leader._id} className="group">
              <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 border border-gray-100 bg-gray-50">
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 grayscale group-hover:grayscale-0 transition-all">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-300"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                <p className="text-base font-bold text-gray-900 group-hover:text-[#1B6B3A] transition-colors duration-300">
                  {leader.name}
                </p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                  {leader.position}
                </p>
                {leader.title && (
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mt-1">
                    {leader.title}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">
              Our leadership profiles will be updated soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
