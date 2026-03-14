import Image from "next/image";
import Link from "next/link";
import { INews } from "@/models/News";

async function getNews(): Promise<INews[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5321"}/api/news`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80";

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            News
          </h1>
          <p className="text-gray-500 text-sm mt-1">Latest updates from MCAN Ekiti State Chapter</p>
        </div>

        {newsItems.length === 0 ? (
          <p className="text-gray-400 text-sm">No news articles yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article key={item._id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image src={item.image || FALLBACK_IMG} alt={item.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-[#1B6B3A] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.shortDescription}</p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1 text-[#1B6B3A] text-xs font-semibold mt-3 hover:gap-2 transition-all"
                  >
                    Read more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
