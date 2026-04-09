import Image from "next/image";
import Link from "next/link";
import { ILodge } from "@/models/Lodge";
import { NEXT_PUBLIC_BASE_URL } from "@/config/constants";

async function getLodges(): Promise<ILodge[]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/lodges`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

const STATUS_STYLES: Record<string, string> = {
  Available: "bg-[#1B6B3A] text-white",
  "Under Construction": "bg-amber-500 text-white",
  Full: "bg-red-500 text-white",
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80";

export default async function LodgesPage() {
  const lodges = await getLodges();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Lodges
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Safe and comfortable accommodation for Muslim corps members across
            Ekiti State
          </p>
        </div>

        {lodges.length === 0 ? (
          <p className="text-gray-400 text-sm">No lodges listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lodges.map((lodge) => (
              <div
                key={lodge._id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={lodge.image || FALLBACK_IMG}
                    alt={lodge.title}
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[lodge.status] ?? "bg-gray-200 text-gray-600"}`}
                  >
                    {lodge.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-gray-900 text-sm mb-1"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {lodge.title}
                  </h3>
                  <p className="text-xs text-[#1B6B3A] font-medium mb-2">
                    {lodge.location}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {lodge.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors"
                  >
                    Enquire Now
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
