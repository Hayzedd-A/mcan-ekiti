import Link from "next/link";
import { FolderOpen, Calendar, Users, Building2, Newspaper, ImageIcon, UserCheck, Heart } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5321";

async function getStat(endpoint: string): Promise<number> {
  try {
    const res = await fetch(`${BASE}/api/${endpoint}`, { cache: "no-store" });
    if (!res.ok) return 0;
    const data = await res.json();
    return (data.data as unknown[])?.length ?? 0;
  } catch {
    return 0;
  }
}

export default async function AdminDashboard() {
  const [projects, events, executives, lodges, news, gallery, members] = await Promise.all([
    getStat("projects"),
    getStat("events"),
    getStat("executives"),
    getStat("lodges"),
    getStat("news"),
    getStat("gallery"),
    getStat("members"),
  ]);

  const stats = [
    { label: "Projects", value: projects, icon: FolderOpen, href: "/admin/projects", color: "bg-green-50 text-[#1B6B3A]" },
    { label: "Events", value: events, icon: Calendar, href: "/admin/events", color: "bg-blue-50 text-blue-600" },
    { label: "Executives", value: executives, icon: Users, href: "/admin/executives", color: "bg-purple-50 text-purple-600" },
    { label: "Lodges", value: lodges, icon: Building2, href: "/admin/lodges", color: "bg-amber-50 text-amber-600" },
    { label: "News Articles", value: news, icon: Newspaper, href: "/admin/news", color: "bg-rose-50 text-rose-600" },
    { label: "Gallery Images", value: gallery, icon: ImageIcon, href: "/admin/gallery", color: "bg-indigo-50 text-indigo-600" },
    { label: "Members", value: members, icon: UserCheck, href: "/admin/members", color: "bg-teal-50 text-teal-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your MCAN Ekiti website content</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>
              {value}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-[#1B6B3A] transition-colors">{label}</p>
          </Link>
        ))}
        <Link
          href="/admin/donation-account"
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow group"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-red-50 text-red-500">
            <Heart size={20} />
          </div>
          <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Outfit, sans-serif" }}>Donation</p>
          <p className="text-xs text-gray-500 mt-0.5 group-hover:text-[#1B6B3A] transition-colors">Account Details</p>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Project", href: "/admin/projects" },
            { label: "Add Event", href: "/admin/events" },
            { label: "Add Executive", href: "/admin/executives" },
            { label: "Add News", href: "/admin/news" },
            { label: "Upload Gallery", href: "/admin/gallery" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="border border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f5ee] transition-colors"
            >
              + {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
