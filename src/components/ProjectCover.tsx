import Image from "next/image";
import JarvisCover from "@/components/covers/JarvisCover";
import TradingCover from "@/components/covers/TradingCover";
import type { Project } from "@/data/projects";

export default function ProjectCover({
  project,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className="@container absolute inset-0">
      {project.cover === "jarvis" ? (
        <JarvisCover />
      ) : project.cover === "trading" ? (
        <TradingCover />
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover object-top ${className}`}
        />
      )}
    </div>
  );
}
