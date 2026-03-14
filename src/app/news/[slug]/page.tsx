import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INews } from "@/models/News";

async function getNewsItem(slug: string): Promise<INews | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5321"}/api/news/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80";

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = await getNewsItem(params.slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-[#1B6B3A] text-sm font-medium mb-6 hover:gap-2 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to News
        </Link>

        <span className="bg-[#1B6B3A] text-white text-xs px-3 py-1 rounded-full font-medium">
          {item.category}
        </span>

        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
          {item.title}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {item.image && (
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <Image src={item.image || FALLBACK_IMG} alt={item.title} fill className="object-cover" />
          </div>
        )}

        <div
          className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#1B6B3A]"
          dangerouslySetInnerHTML={{ __html: item.story }}
        />
      </div>
    </div>
  );
}
