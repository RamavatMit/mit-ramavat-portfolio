"use client";

import { useRef, useState, useEffect } from "react";
import { timeline } from "@/data/timeline";
import Reveal from "@/components/Reveal";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Brain,
  Code2,
  Briefcase,
  Rocket,
} from "lucide-react";

const icons = [
  GraduationCap,
  Brain,
  Code2,
  Briefcase,
  Rocket,
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReducedMotion = mounted ? Boolean(shouldReduceMotion) : false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 85%"],
  });

  const mobileLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Reveal>
      <section
        id="timeline"
        ref={containerRef}
        className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative">
          {/* Header */}
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.35em] text-yellow-500 text-xs sm:text-sm font-semibold">
              JOURNEY
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mt-2 tracking-tight">
              My Timeline
            </h2>

            <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Every milestone shaped my path toward becoming an AI Engineer and building
              impactful technology.
            </p>
          </div>

          {/* MOBILE TIMELINE (< md) */}
          <div className="md:hidden mt-16 relative ml-3 sm:ml-4 pl-6 sm:pl-8 border-l-2 border-zinc-800/80 space-y-10">
            {/* Illuminated Gold Progress Line */}
            {mounted ? (
              <motion.div
                className="absolute left-[-1px] top-0 w-[2px] bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.8)]"
                style={{
                  height: isReducedMotion ? "100%" : mobileLineHeight,
                }}
              />
            ) : (
              <div
                className="absolute left-[-1px] top-0 w-[2px] bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.8)]"
                style={{ height: "0%" }}
              />
            )}

            {timeline.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={item.year}
                  initial={
                    !mounted || isReducedMotion
                      ? false
                      : { opacity: 0, y: 25 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.25, once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className="relative group pr-2"
                >
                  {/* Node */}
                  <motion.div
                    initial={
                      !mounted || isReducedMotion
                        ? false
                        : { scale: 0.75, opacity: 0.5 }
                    }
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.5, once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute -left-[31px] sm:-left-[35px] top-0 w-8 h-8 rounded-full bg-zinc-950 border-2 border-yellow-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.7)] transition-all duration-300 z-10"
                  >
                    <Icon size={14} className="text-yellow-400" />
                  </motion.div>

                  {/* Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 hover:border-yellow-500/50 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(234,179,8,0.12)] transition-all duration-300 ease-out">
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold">
                      {item.year}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mt-2.5">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* DESKTOP TIMELINE (>= md) */}
          <div className="hidden md:block relative mt-28 min-h-[1150px]">
            {/* SVG PATHS */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 1200"
              preserveAspectRatio="none"
            >
              {/* Subtle background path */}
              <path
                d="
                M 500 50
                C 250 180, 250 250, 500 350
                C 750 450, 750 550, 500 650
                C 250 760, 250 850, 500 950
                C 750 1050, 750 1120, 500 1180
                "
                fill="none"
                stroke="#27272a"
                strokeWidth="4"
                strokeDasharray="14 10"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Progress illuminated path */}
              {mounted ? (
                <motion.path
                  d="
                  M 500 50
                  C 250 180, 250 250, 500 350
                  C 750 450, 750 550, 500 650
                  C 250 760, 250 850, 500 950
                  C 750 1050, 750 1120, 500 1180
                  "
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    pathLength: isReducedMotion ? 1 : scrollYProgress,
                  }}
                  className="drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]"
                />
              ) : (
                <path
                  d="
                  M 500 50
                  C 250 180, 250 250, 500 350
                  C 750 450, 750 550, 500 650
                  C 250 760, 250 850, 500 950
                  C 750 1050, 750 1120, 500 1180
                  "
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0"
                />
              )}
            </svg>

            {/* Traveler Node */}
            <div
              className="
              road-traveler
              absolute
              w-6
              h-6
              rounded-full
              bg-yellow-400
              "
            />

            {timeline.map((item, index) => {
              const Icon = icons[index % icons.length];

              const positions = [
                { top: "50px", left: "50%", card: "left" },
                { top: "290px", left: "50%", card: "right" },
                { top: "550px", left: "50%", card: "left" },
                { top: "820px", left: "50%", card: "right" },
                { top: "1070px", left: "50%", card: "left" },
              ];

              const pos = positions[index];
              const isLeft = pos.card === "left";

              return (
                <div
                  key={item.year}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: "translateX(-50%)",
                  }}
                >
                  {/* NODE WITH SUBTLE SCALE & GLOW */}
                  <motion.div
                    initial={
                      !mounted || isReducedMotion
                        ? false
                        : { scale: 0.75, opacity: 0.6 }
                    }
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.5, once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                    className="
                    road-node
                    relative
                    z-20
                    w-18
                    h-18
                    rounded-full
                    bg-zinc-950
                    border-4
                    border-yellow-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_25px_rgba(234,179,8,0.4)]
                    hover:scale-110
                    hover:shadow-[0_0_35px_rgba(234,179,8,0.7)]
                    transition-all
                    duration-300
                    cursor-default
                    "
                  >
                    <Icon size={30} className="text-yellow-400" />
                  </motion.div>

                  {/* CARD WITH SCROLL REVEAL & HOVER ENHANCEMENT */}
                  <motion.div
                    initial={
                      !mounted || isReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            x: isLeft ? -40 : 40,
                            y: 15,
                          }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ amount: 0.3, once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`
                    absolute
                    top-1/2
                    -translate-y-1/2
                    w-[320px]
                    lg:w-[350px]
                    p-6
                    rounded-[28px]
                    bg-zinc-900/80
                    backdrop-blur-xl
                    border
                    border-zinc-800
                    hover:border-yellow-500/60
                    hover:-translate-y-[calc(50%+4px)]
                    hover:shadow-[0_8px_35px_rgba(234,179,8,0.18)]
                    transition-all
                    duration-300
                    ease-out
                    ${
                      isLeft
                        ? "-left-[360px] lg:-left-[390px]"
                        : "left-[80px]"
                    }
                    `}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold">
                      {item.year}
                    </span>

                    <h3 className="text-xl font-bold text-zinc-100 mt-3">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}