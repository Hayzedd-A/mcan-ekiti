import Image from "next/image";
import { IGallery } from "@/models/Gallery";

async function getGallery(): Promise<IGallery[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5321"}/api/gallery`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            Gallery
          </h1>
          <p className="text-gray-500 text-sm mt-1">Moments from our activities and programs</p>
        </div>

        {images.length === 0 ? (
          <p className="text-gray-400 text-sm">No gallery images yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img._id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={img.image}
                  alt={img.caption ?? "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                  {img.caption && (
                    <p className="text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
