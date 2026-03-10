import Image from "next/image";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80", alt: "MCAN Mosque" },
  { id: 2, src: "https://images.unsplash.com/photo-1585115818026-4de6c8c1ee8b?w=600&q=80", alt: "Lodge Construction" },
  { id: 3, src: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=600&q=80", alt: "Mosque Dome" },
  { id: 4, src: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80", alt: "MCAN Event" },
  { id: 5, src: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80", alt: "MCAN Bus" },
  { id: 6, src: "https://images.unsplash.com/photo-1600091638931-8b9e8e6cd82f?w=600&q=80", alt: "Building" },
  { id: 7, src: "https://images.unsplash.com/photo-1566647387313-9fda80664848?w=600&q=80", alt: "Mosque" },
  { id: 8, src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80", alt: "Community" },
  { id: 9, src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80", alt: "Event" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Gallery
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Moments from our activities and programs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
