"use client";

import { useEffect, useState } from "react";
import { skills, skillCategories, Skill } from "@/data/skills";
import Reveal from "@/components/Reveal";
import { LayoutGrid, Orbit, Sparkles } from "lucide-react";

export default function CircularSkills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "orbit">("grid");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === skills.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const activeSkill = skills[activeIndex];
  const ActiveIcon = activeSkill.icon;

  return (
    <Reveal>
      <section
        id="skills"
        className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden bg-tech-grid"
      >
        {/* Ambient Gold Glow background accents */}
        <div
          className="
          absolute
          top-1/4
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          bg-yellow-500/[0.04]
          blur-[140px]
          rounded-full
          pointer-events-none
          "
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              <Sparkles size={13} className="text-yellow-400" />
              <span>Skills & Expertise</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 tracking-tight">
              Technology Stack
            </h2>

            <p className="text-zinc-400 mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              Architecting intelligent AI systems, scalable backend infrastructure, and high-performance frontend applications.
            </p>

            {/* View Mode Toggle Pill */}
            <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300
                  ${
                    viewMode === "grid"
                      ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }
                `}
              >
                <LayoutGrid size={16} />
                <span>Ecosystem View</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("orbit")}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300
                  ${
                    viewMode === "orbit"
                      ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }
                `}
              >
                <Orbit size={16} />
                <span>Interactive Orbit</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: CATEGORY ECOSYSTEM GRID */}
          {viewMode === "grid" && (
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {skillCategories.map((category) => (
                <div
                  key={category.id}
                  className="
                    p-6 sm:p-7
                    rounded-3xl
                    bg-zinc-950/60
                    backdrop-blur-xl
                    border
                    border-zinc-800/80
                    hover:border-zinc-700/80
                    transition-all
                    duration-300
                    shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                    flex
                    flex-col
                  "
                >
                  {/* Category Header with subtle gold accent indicator */}
                  <div className="flex flex-col mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] inline-block shrink-0" />
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                    {category.description && (
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 ml-5 font-normal">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Technology Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-auto">
                    {category.skills.map((skill: Skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={`${category.id}-${skill.name}`}
                          className="
                            group
                            relative
                            p-4
                            rounded-2xl
                            bg-zinc-900/40
                            hover:bg-zinc-900/90
                            border
                            border-zinc-800/70
                            hover:border-yellow-500/40
                            backdrop-blur-md
                            transition-all
                            duration-300
                            ease-out
                            hover:-translate-y-1
                            hover:shadow-[0_4px_25px_rgba(234,179,8,0.12)]
                            flex
                            items-center
                            gap-3.5
                            cursor-default
                          "
                        >
                          {/* Ambient glow container */}
                          <div
                            className="
                              relative
                              p-2.5
                              rounded-xl
                              bg-zinc-950/80
                              border
                              border-zinc-800/80
                              group-hover:border-yellow-500/30
                              flex
                              items-center
                              justify-center
                              shrink-0
                              transition-all
                              duration-300
                            "
                          >
                            <div
                              className="
                                absolute
                                inset-0
                                rounded-xl
                                blur-md
                                opacity-0
                                group-hover:opacity-30
                                transition-opacity
                                duration-300
                                pointer-events-none
                              "
                              style={{ backgroundColor: skill.color || "#eab308" }}
                            />
                            <Icon
                              size={24}
                              aria-label={skill.name}
                              className="
                                relative
                                z-10
                                transition-transform
                                duration-300
                                ease-out
                                group-hover:scale-110
                                group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]
                              "
                              style={{ color: skill.color }}
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors duration-300 truncate">
                              {skill.name}
                            </h4>
                            <p className="text-xs text-zinc-400/90 group-hover:text-zinc-300 transition-colors duration-300 truncate mt-0.5">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: INTERACTIVE ORBIT VISUALIZER */}
          {viewMode === "orbit" && (
            <div className="relative mt-12 md:mt-20 flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
              {/* Responsive Scaled Wrapper */}
              <div className="scale-[0.55] xs:scale-[0.7] sm:scale-90 md:scale-100 transition-transform duration-500 origin-center flex items-center justify-center relative">
                {/* Outer Rotating Circle */}
                <div
                  className="
                  relative
                  w-[550px]
                  h-[550px]
                  rounded-full
                  border
                  border-zinc-800
                  bg-white/[0.01]
                  backdrop-blur-sm
                  orbit-rotate
                  "
                  style={{
                    animationDuration: "25s",
                  }}
                >
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    const angle = (360 / skills.length) * index;
                    const radius = 240;

                    const x = Number(
                      (radius * Math.cos((angle * Math.PI) / 180)).toFixed(2)
                    );
                    const y = Number(
                      (radius * Math.sin((angle * Math.PI) / 180)).toFixed(2)
                    );

                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={skill.name}
                        className="absolute top-1/2 left-1/2 cursor-pointer"
                        onClick={() => setActiveIndex(index)}
                        style={{
                          transform: `
                          translate(${x}px, ${y}px)
                          translate(-50%, -50%)
                        `,
                        }}
                      >
                        <div
                          className={`
                          w-22
                          h-22
                          rounded-3xl
                          border
                          flex
                          items-center
                          justify-center
                          backdrop-blur-md
                          transition-all
                          duration-500
                          icon-counter-rotate
                          ${
                            isActive
                              ? "scale-125 border-yellow-500 bg-zinc-900 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
                              : "border-zinc-800/80 bg-zinc-900/80 hover:border-yellow-500/40"
                          }
                          `}
                        >
                          <Icon
                            size={38}
                            aria-label={skill.name}
                            style={{
                              color: skill.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CENTER ACTIVE SKILL DISPLAY */}
                <div
                  className="
                  absolute
                  w-[320px]
                  h-[320px]
                  rounded-full
                  bg-zinc-950/90
                  backdrop-blur-2xl
                  border
                  border-zinc-800
                  shadow-[0_0_80px_rgba(0,0,0,0.8)]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  p-6
                  z-20
                  "
                >
                  <div
                    className="absolute inset-0 blur-3xl rounded-full pointer-events-none transition-all duration-500"
                    style={{
                      backgroundColor: activeSkill.color,
                      opacity: 0.18,
                    }}
                  />

                  <ActiveIcon
                    size={80}
                    aria-label={activeSkill.name}
                    className="transition-all duration-500"
                    style={{
                      color: activeSkill.color,
                    }}
                  />

                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-4 z-10">
                    {activeSkill.name}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm mt-2 px-4 z-10 leading-relaxed">
                    {activeSkill.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}