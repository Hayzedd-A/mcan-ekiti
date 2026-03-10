import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import DonationCTA from "@/components/sections/DonationCTA";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  // Show 9 projects (3 rows of 3)
  const allProjects = [...projects, ...projects.slice(0, 3)];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Our Projects
        </h1>
        <p className="text-gray-500 text-sm mb-2">
          We are seeking your donations to complete our ongoing projects and maintain the
          completed ones.
        </p>
        <p className="text-[#1B6B3A] text-sm font-medium mb-8">
          For enquiries call: 0800 000 0000 / 479
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, idx) => (
            <ProjectCard key={`${project.id}-${idx}`} project={project} />
          ))}
        </div>
      </div>

      <DonationCTA />
    </div>
  );
}
