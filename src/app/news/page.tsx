import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "MCAN Ekiti Hosts Annual Ramadan Program",
    excerpt: "The Muslim Corpers' Association of Nigeria, Ekiti State Chapter, successfully hosted its annual Ramadan program with over 200 attendees.",
    date: "Feb 10, 2025",
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80",
    category: "Events",
  },
  {
    id: 2,
    title: "New Lodge Facility Commissioned in Ado-Ekiti",
    excerpt: "MCAN Ekiti commissioned a new lodge facility to provide affordable accommodation for Muslim corps members.",
    date: "Feb 5, 2025",
    image: "https://images.unsplash.com/photo-1585115818026-4de6c8c1ee8b?w=600&q=80",
    category: "Projects",
  },
  {
    id: 3,
    title: "Dawah Outreach Reaches 500 Beneficiaries",
    excerpt: "The recent dawah outreach program reached over 500 beneficiaries across various communities in Ekiti State.",
    date: "Jan 28, 2025",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80",
    category: "Dawah",
  },
  {
    id: 4,
    title: "2025/26 Executives Inaugurated",
    excerpt: "The new set of MCAN Ekiti State executives were officially inaugurated at the state secretariat.",
    date: "Jan 15, 2025",
    image: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=600&q=80",
    category: "Organization",
  },
  {
    id: 5,
    title: "MCAN Bus Project Progresses",
    excerpt: "The ongoing MCAN Ekiti Bus project is making significant progress, with the bus now ready for commissioning.",
    date: "Jan 10, 2025",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80",
    category: "Projects",
  },
  {
    id: 6,
    title: "Islamic Knowledge Seminar Holds Successfully",
    excerpt: "A one-day seminar on Islamic knowledge and character building was successfully held for corps members.",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1600091638931-8b9e8e6cd82f?w=600&q=80",
    category: "Education",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            News
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Latest updates from MCAN Ekiti State Chapter
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-[#1B6B3A] text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{item.date}</p>
                <h3
                  className="font-bold text-gray-900 text-sm mb-2 leading-snug"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.excerpt}</p>
                <Link
                  href="#"
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
      </div>
    </div>
  );
}
