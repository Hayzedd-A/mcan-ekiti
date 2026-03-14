import Link from "next/link";
import Image from "next/image";
import DonationCTA from "@/components/sections/DonationCTA";
import { IProject } from "@/models/Project";

async function getProjects(): Promise<IProject[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5321"}/api/projects`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

const STATUS_COLORS: Record<string, string> = {
  Ongoing: "bg-[#1B6B3A] text-white",
  Completed: "bg-blue-600 text-white",
  Paused: "bg-amber-500 text-white",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
          Our Projects
        </h1>
        <p className="text-gray-500 text-sm mb-2">
          We are seeking your donations to complete our ongoing projects and maintain the completed ones.
        </p>
        <p className="text-[#1B6B3A] text-sm font-medium mb-8">
          For enquiries call: 0800 000 0000 / 479
        </p>

        {projects.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative h-44 w-full">
                  <Image
                    src={project.image || FALLBACK_IMG}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[project.status] ?? "bg-gray-200 text-gray-700"}`}>
                    {project.status}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {project.title}
                  </h3>
                  {project.location && (
                    <p className="text-xs text-[#1B6B3A] font-medium mb-1">{project.location}</p>
                  )}
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{project.description}</p>
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 border border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors"
                  >
                    Donate Now
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DonationCTA />
    </div>
  );
}
