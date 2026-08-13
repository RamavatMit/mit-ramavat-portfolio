"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { projects } from "@/data/projects";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function ProjectCoverflow() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="projects"
      className="relative py-28 md:py-36 bg-zinc-950/90 border-y border-zinc-900/80 overflow-hidden"
    >
      {/* Subtle Gold Radial Glow Background */}
      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
        from-yellow-500/10
        via-transparent
        to-transparent
        pointer-events-none
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <p className="uppercase tracking-[0.35em] text-yellow-500 text-xs sm:text-sm font-semibold">
              SELECTED WORK
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mt-3 tracking-tight">
              Projects That Define My Work
            </h2>

            <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
              A collection of AI, Machine Learning, Full Stack and engineering
              projects built with a focus on real-world problems, clean architecture
              and modern experiences.
            </p>
          </div>
        </Reveal>

        {/* Project Carousel */}
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={false}
            modules={[EffectCoverflow]}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 220,
              modifier: 2,
              scale: 0.9,
              slideShadows: false,
            }}
            className="w-full !py-6"
          >
            {projects.map((project) => (
              <SwiperSlide
                key={project.slug}
                className="!w-[270px] sm:!w-[340px] md:!w-[380px] !h-[430px] sm:!h-[490px] transition-all duration-300"
              >
                {({ isActive }) => (
                  <Link href={`/projects/${project.slug}`}>
                    <div
                      className={`
                        group
                        relative
                        w-full
                        h-full
                        overflow-hidden
                        rounded-[28px]
                        cursor-pointer
                        bg-zinc-900/90
                        border
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "border-yellow-500/70 shadow-[0_0_40px_rgba(234,179,8,0.28)] scale-[1.02]"
                            : "border-zinc-800/80 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.18)]"
                        }
                      `}
                    >
                      {/* Active Top Gold Highlight Line */}
                      {isActive && (
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent z-20" />
                      )}

                      {/* Project Image */}
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 290px, 380px"
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-108
                        "
                      />

                      {/* Dark Gradient Overlay */}
                      <div
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-zinc-950
                        via-zinc-950/70
                        to-black/30
                        "
                      />

                      {/* Category Badge Top Left */}
                      {project.category && (
                        <div className="absolute top-5 left-5 z-10">
                          <span
                            className="
                            px-3.5
                            py-1.5
                            rounded-full
                            bg-black/70
                            backdrop-blur-md
                            border
                            border-yellow-500/40
                            text-yellow-400
                            text-xs
                            font-medium
                            tracking-wide
                            shadow-[0_0_15px_rgba(234,179,8,0.15)]
                            "
                          >
                            {project.category}
                          </span>
                        </div>
                      )}

                      {/* External Link Icon Top Right */}
                      <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                        <div className="w-9 h-9 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                          <ExternalLink size={16} />
                        </div>
                      </div>

                      {/* Content Card Details Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors duration-300">
                          {project.title}
                        </h3>

                        <p className="text-zinc-300 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech stack badges */}
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3.5">
                            {project.tech.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-700/60 text-[11px] text-zinc-300 font-medium"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-700/60 text-[11px] text-yellow-400/90 font-medium">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Hover Reveal View Project Indicator */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400 mt-4 group-hover:text-yellow-300 transition-colors">
                          <span>View Project</span>
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-10 md:mt-14 relative z-10">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous Project"
              className="
                group
                w-14
                h-14
                sm:w-16
                sm:h-16
                rounded-full
                border
                border-yellow-500/30
                bg-zinc-950/80
                backdrop-blur-xl
                flex
                items-center
                justify-center
                shadow-[0_0_20px_rgba(234,179,8,0.15)]
                transition-all
                duration-300
                hover:scale-110
                hover:border-yellow-500
                hover:bg-yellow-500/10
                hover:shadow-[0_0_35px_rgba(234,179,8,0.35)]
                active:scale-95
              "
            >
              <ChevronLeft
                className="
                  text-yellow-400
                  transition-transform
                  duration-300
                  group-hover:-translate-x-0.5
                "
                size={26}
              />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next Project"
              className="
                group
                w-14
                h-14
                sm:w-16
                sm:h-16
                rounded-full
                border
                border-yellow-500/30
                bg-zinc-950/80
                backdrop-blur-xl
                flex
                items-center
                justify-center
                shadow-[0_0_20px_rgba(234,179,8,0.15)]
                transition-all
                duration-300
                hover:scale-110
                hover:border-yellow-500
                hover:bg-yellow-500/10
                hover:shadow-[0_0_35px_rgba(234,179,8,0.35)]
                active:scale-95
              "
            >
              <ChevronRight
                className="
                  text-yellow-400
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
                size={26}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}