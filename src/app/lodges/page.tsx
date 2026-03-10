import Image from "next/image";
import Link from "next/link";

const lodges = [
  {
    id: 1,
    name: "MCAN Ekiti Main Lodge",
    location: "Ado-Ekiti, Ekiti State",
    description: "The primary lodge facility for Muslim corps members, offering affordable and comfortable accommodation in a serene Islamic environment.",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80",
    available: true,
  },
  {
    id: 2,
    name: "NYSC Camp Lodge",
    location: "NYSC Orientation Camp, Ilef/Emure",
    description: "In-camp accommodation facility for corps members during the three-week orientation program.",
    image: "https://images.unsplash.com/photo-1600091638931-8b9e8e6cd82f?w=600&q=80",
    available: true,
  },
  {
    id: 3,
    name: "Community Lodge",
    location: "Ikere-Ekiti, Ekiti State",
    description: "A lodge facility serving Muslim corps members deployed in Ikere and surrounding areas.",
    image: "https://images.unsplash.com/photo-1585115818026-4de6c8c1ee8b?w=600&q=80",
    available: false,
  },
];

export default function LodgesPage() {
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
            Safe and comfortable accommodation for Muslim corps members across Ekiti State
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lodges.map((lodge) => (
            <div
              key={lodge.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image src={lodge.image} alt={lodge.name} fill className="object-cover" />
                <span
                  className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${
                    lodge.available
                      ? "bg-[#1B6B3A] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {lodge.available ? "Available" : "Under Construction"}
                </span>
              </div>
              <div className="p-5">
                <h3
                  className="font-bold text-gray-900 text-sm mb-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {lodge.name}
                </h3>
                <p className="text-xs text-[#1B6B3A] font-medium mb-2">{lodge.location}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {lodge.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors"
                >
                  Enquire Now
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
