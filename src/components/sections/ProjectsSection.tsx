import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

interface ProjectsSectionProps {
  showAll?: boolean;
}

export default function ProjectsSection({ showAll = false }: ProjectsSectionProps) {
  const displayed = showAll ? projects : projects.slice(0, 6);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-[#1B6B3A]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Our Projects
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          We are seeking your donations to complete our ongoing projects
          <br className="hidden sm:block" />
          and maintain the completed ones
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#1B6B3A] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#154a2a] transition-colors"
          >
            See all Projects
          </Link>
        </div>
      )}
    </section>
  );
}
