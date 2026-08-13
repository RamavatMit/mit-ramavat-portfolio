"use client";

import { useState, useEffect } from "react";
import { experience } from "@/data/experience";
import Reveal from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReduced = mounted ? Boolean(shouldReduceMotion) : false;

  return (
    <Reveal>
      <section
        id="experience"
        className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-yellow-500 text-xs sm:text-sm font-semibold text-center md:text-left">
            EXPERIENCE
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mt-2 tracking-tight text-center md:text-left">
            Professional Experience
          </h2>

          <div className="mt-12 md:mt-16 space-y-8">
            {experience.map((item, index) => (
              <motion.div
                key={item.company}
                initial={!mounted || isReduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="
                group
                p-6
                sm:p-8
                rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-yellow-500/60
                hover:-translate-y-1
                hover:shadow-[0_8px_35px_rgba(234,179,8,0.15)]
                transition-all
                duration-300
                ease-out
                "
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase size={20} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors duration-300">
                        {item.role}
                      </h3>
                    </div>

                    <p className="text-yellow-400 font-semibold text-base mt-2">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 border border-zinc-700/50">
                      <Calendar size={14} className="text-yellow-400" />
                      {item.duration}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 border border-zinc-700/50">
                      <MapPin size={14} className="text-yellow-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t border-zinc-800/60">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
                      px-3.5
                      py-1.5
                      rounded-full
                      bg-zinc-800/80
                      border
                      border-zinc-700/60
                      text-zinc-300
                      text-xs
                      font-medium
                      group-hover:border-yellow-500/30
                      transition-colors
                      duration-300
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}