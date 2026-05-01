import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/models/Project";
// import type { Project as IProject } from "@/types";

interface ProjectCardProps {
  project: IProject;
  variant?: "grid" | "list";
}

// Placeholder images from Unsplash - mosque/building themed
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80", // mosque
  "https://images.unsplash.com/photo-1585115818026-4de6c8c1ee8b?w=600&q=80", // building construction
  "https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=600&q=80", // mosque dome
  "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80", // green bus
  "https://images.unsplash.com/photo-1600091638931-8b9e8e6cd82f?w=600&q=80", // building
  "https://images.unsplash.com/photo-1566647387313-9fda80664848?w=600&q=80", // mosque 2
];

export default function ProjectCard({
  project,
  variant = "grid",
}: ProjectCardProps) {
  const idx = parseInt(project._id) - 1;
  const imgSrc = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

  if (variant === "list") {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={project.image || imgSrc}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3
            className="font-bold text-gray-900 text-base mb-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-4">
            {project.description}
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 border border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors"
          >
            Donate Now
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
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="relative h-44 w-full rounded-xl overflow-hidden">
        <Image
          src={project.image || imgSrc}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-3 pb-1">
        <h3
          className="font-bold text-gray-900 text-sm mb-1.5"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3">
          {project.description}
        </p>
        <Link
          href="/donate"
          className="inline-flex items-center gap-2 border border-[#1B6B3A] text-[#1B6B3A] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#e8f5ee] transition-colors"
        >
          Donate Now
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
  );
}
