import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "@/components/Reveal";

import type { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const project = projects.find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase()
  );

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mit-ramavat.vercel.app";

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Mit Ramavat`,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      siteName: "Mit Ramavat Portfolio",
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Mit Ramavat`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const currentIndex = projects.findIndex(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase()
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 overflow-x-hidden">
      <div className="max-w-5xl lg:max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Back to Projects Button */}
        <div>
          <Link
            href="/#projects"
            className="
              inline-flex
              items-center
              gap-2.5
              px-4
              py-2
              sm:px-5
              sm:py-2.5
              rounded-full
              bg-zinc-900/60
              backdrop-blur-md
              border
              border-zinc-800/80
              hover:border-amber-500/50
              text-zinc-400
              hover:text-amber-400
              hover:bg-zinc-900/90
              text-xs
              sm:text-sm
              font-medium
              transition-all
              duration-300
              shadow-sm
              group
            "
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>
        </div>

        {/* HERO BANNER */}
        <Reveal>
          <div
            className="
              relative
              w-full
              min-h-[280px]
              sm:min-h-[460px]
              h-[45vh]
              sm:h-[55vh]
              md:h-[65vh]
              max-h-[650px]
              rounded-3xl
              sm:rounded-[36px]
              overflow-hidden
              border
              border-zinc-800/80
              hover:border-amber-500/30
              transition-colors
              duration-500
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              group
            "
          >
            {/* Background Image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
            />

            {/* Dark Gradient Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-zinc-950
                via-zinc-950/65
                to-black/30
                pointer-events-none
              "
            />

            {/* Subtle Gold Ambient Glow */}
            <div
              className="
                absolute
                -bottom-24
                left-1/2
                -translate-x-1/2
                w-[500px]
                h-[250px]
                sm:w-[650px]
                sm:h-[300px]
                rounded-full
                bg-amber-500/10
                blur-[130px]
                pointer-events-none
              "
            />

            {/* Banner Content */}
            <div
              className="
                absolute
                bottom-6
                left-6
                right-6
                sm:bottom-10
                sm:left-10
                sm:right-10
                md:bottom-12
                md:left-12
                md:right-12
                z-10
              "
            >
              {project.category && (
                <span className="inline-block uppercase tracking-[0.25em] text-amber-400 text-[11px] sm:text-xs font-semibold mb-3 px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 shadow-md">
                  {project.category}
                </span>
              )}

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight leading-[1.1] mt-1 drop-shadow-sm break-words">
                {project.title}
              </h1>

              <p
                className="
                  max-w-3xl
                  mt-3
                  sm:mt-4
                  text-zinc-300
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-relaxed
                  line-clamp-3
                  sm:line-clamp-none
                  font-normal
                  drop-shadow
                "
              >
                {project.description}
              </p>
            </div>
          </div>
        </Reveal>

        {/* PROJECT STATS GRID */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* Duration Card */}
            <div className="relative overflow-hidden p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300 before:absolute before:top-0 before:left-4 before:right-4 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-amber-500/40 before:to-transparent">
              <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-wider">Duration</p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold mt-1.5 text-zinc-200 break-words">
                {project.duration || "N/A"}
              </h3>
            </div>

            {/* Role Card */}
            <div className="relative overflow-hidden p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300 before:absolute before:top-0 before:left-4 before:right-4 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-amber-500/40 before:to-transparent">
              <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-wider">Role</p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold mt-1.5 text-zinc-200 break-words">
                {project.role || "Developer"}
              </h3>
            </div>

            {/* Category Card */}
            <div className="relative overflow-hidden p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300 before:absolute before:top-0 before:left-4 before:right-4 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-amber-500/40 before:to-transparent">
              <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-wider">Category</p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold mt-1.5 text-zinc-200 break-words">
                {project.category || "Engineering"}
              </h3>
            </div>

            {/* Status Card */}
            <div className="relative overflow-hidden p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300 before:absolute before:top-0 before:left-4 before:right-4 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-amber-500/40 before:to-transparent">
              <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-wider">Status</p>
              <h3 className="text-sm sm:text-base md:text-lg font-bold mt-1.5 text-amber-400 flex items-center gap-2 break-words">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
                </span>
                {project.status || "Completed"}
              </h3>
            </div>
          </div>
        </Reveal>

        {/* OVERVIEW SECTION */}
        <Reveal>
          <div className="border-t border-zinc-900/80 pt-10 sm:pt-14">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Project Overview
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 mt-1 mb-6 tracking-tight">
              Detailed Breakdown
            </h3>

            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-900/30 border border-zinc-800/70 backdrop-blur-sm shadow-inner">
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed sm:leading-8 font-normal break-words">
                {project.longDescription}
              </p>
            </div>
          </div>
        </Reveal>

        {/* TECH STACK SECTION */}
        <Reveal>
          <div className="border-t border-zinc-900/80 pt-10 sm:pt-14">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Technologies & Tools
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1 mb-6 tracking-tight">
              Built With Modern Tech
            </h3>

            <div className="flex flex-wrap gap-2.5 sm:gap-3.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-4
                    py-2.5
                    sm:px-5
                    sm:py-3
                    rounded-xl
                    sm:rounded-2xl
                    bg-zinc-900/80
                    border
                    border-zinc-800
                    hover:border-amber-500/40
                    hover:text-amber-300
                    hover:bg-zinc-900
                    hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)]
                    text-zinc-300
                    text-xs
                    sm:text-sm
                    font-medium
                    transition-all
                    duration-300
                    flex
                    items-center
                    gap-2
                    group/tech
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 group-hover/tech:bg-amber-400 transition-colors" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* KEY FEATURES SECTION */}
        {project.features && project.features.length > 0 && (
          <Reveal>
            <div className="border-t border-zinc-900/80 pt-10 sm:pt-14">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                Capabilities
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1 mb-8 tracking-tight">
                Key Features & Functionality
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="
                      p-5
                      sm:p-6
                      rounded-2xl
                      sm:rounded-3xl
                      border
                      border-zinc-800/80
                      bg-zinc-900/40
                      backdrop-blur-md
                      hover:border-amber-500/40
                      hover:bg-zinc-900/70
                      hover:-translate-y-1
                      transition-all
                      duration-300
                      flex
                      items-start
                      gap-4
                      shadow-sm
                      group/feature
                    "
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover/feature:border-amber-500/40 group-hover/feature:bg-amber-500/20 transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-zinc-200 text-sm sm:text-base leading-relaxed font-medium break-words mt-1">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* CHALLENGES & LEARNINGS SECTION */}
        {(project.challenge || project.learning) && (
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 border-t border-zinc-900/80 pt-10 sm:pt-14">
              {project.challenge && (
                <div
                  className="
                    p-6
                    sm:p-8
                    rounded-3xl
                    border
                    border-zinc-800/80
                    bg-zinc-900/40
                    backdrop-blur-md
                    hover:border-amber-500/30
                    transition-all
                    duration-300
                    relative
                    overflow-hidden
                  "
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                    Obstacles
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-2 mb-4">
                    Engineering Challenges
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal break-words">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.learning && (
                <div
                  className="
                    p-6
                    sm:p-8
                    rounded-3xl
                    border
                    border-zinc-800/80
                    bg-zinc-900/40
                    backdrop-blur-md
                    hover:border-amber-500/30
                    transition-all
                    duration-300
                    relative
                    overflow-hidden
                  "
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                    Insights
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-2 mb-4">
                    Key Learnings
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal break-words">
                    {project.learning}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* EXTERNAL ACTION BUTTONS */}
        {(project.github || project.demo) && (
          <Reveal>
            <div className="flex flex-wrap gap-4 border-t border-zinc-900/80 pt-10 sm:pt-12">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    px-6
                    py-3.5
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-zinc-700/80
                    hover:border-amber-500/60
                    bg-zinc-900/90
                    hover:bg-zinc-900
                    text-zinc-100
                    hover:text-amber-300
                    font-semibold
                    text-sm
                    transition-all
                    duration-300
                    shadow-md
                    hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  <FaGithub size={18} />
                  View Source Code
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    px-6
                    py-3.5
                    rounded-xl
                    sm:rounded-2xl
                    bg-amber-500
                    hover:bg-amber-400
                    text-zinc-950
                    font-bold
                    text-sm
                    transition-all
                    duration-300
                    shadow-[0_0_20px_rgba(245,158,11,0.25)]
                    hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]
                    hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </Reveal>
        )}

        {/* NEXT / PREVIOUS PROJECT NAVIGATION */}
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-t border-zinc-900/80 pt-10 sm:pt-14">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="
                group
                p-5
                sm:p-6
                rounded-2xl
                sm:rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-amber-500/40
                transition-all
                duration-300
                flex
                items-center
                gap-4
              "
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-amber-400 flex items-center justify-center shrink-0 border border-zinc-700/50 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 transition-all">
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-amber-500/90 uppercase tracking-widest">
                  Previous Project
                </p>
                <h4 className="text-base sm:text-lg font-bold text-zinc-200 group-hover:text-amber-400 transition-colors truncate">
                  {prevProject.title}
                </h4>
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="
                group
                p-5
                sm:p-6
                rounded-2xl
                sm:rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-amber-500/40
                transition-all
                duration-300
                flex
                items-center
                justify-between
                sm:justify-end
                gap-4
                text-right
              "
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-amber-500/90 uppercase tracking-widest">
                  Next Project
                </p>
                <h4 className="text-base sm:text-lg font-bold text-zinc-200 group-hover:text-amber-400 transition-colors truncate">
                  {nextProject.title}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-amber-400 flex items-center justify-center shrink-0 border border-zinc-700/50 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 transition-all">
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}