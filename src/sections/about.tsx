"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useState } from "react";
import { Bot, Code2, Rocket, MapPin } from "lucide-react";

export default function About() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <Reveal>
      <section
        id="about"
        className="
        relative
        overflow-hidden
        py-24
        md:py-32
        px-4
        sm:px-6
        "
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();

          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
      >
        {/* Interactive Mouse Glow */}
        <div
          className="
          absolute
          pointer-events-none
          w-[350px]
          sm:w-[450px]
          h-[350px]
          sm:h-[450px]
          rounded-full
          blur-[130px]
          bg-yellow-500/10
          transition-all
          duration-100
          "
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-10 md:gap-12 items-center">
            {/* LEFT CONTENT */}
            <div>
              <p className="uppercase tracking-[0.35em] text-yellow-500 text-xs sm:text-sm font-semibold">
                ABOUT ME
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mt-2 tracking-tight">
                Mit Ramavat
              </h2>

              <p className="text-lg sm:text-xl font-medium text-yellow-400 mt-3">
                AI Engineer & Full Stack Developer
              </p>

              <p className="mt-6 text-zinc-300 text-base leading-relaxed">
                BCA graduate currently pursuing hands-on industry experience through
                internships and real-world projects.
              </p>

              <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                I specialize in Artificial Intelligence, Machine Learning, Deep Learning
                and Full Stack Development.
              </p>

              <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                My focus is building intelligent applications, automation systems and
                modern digital products that solve real-world problems while delivering
                exceptional user experiences.
              </p>
            </div>

            {/* CENTER IMAGE */}
            <div className="relative flex justify-center items-center my-8 lg:my-0">
              {/* Radial Ambient Gold Glow */}
              <div
                className="
                absolute
                w-[380px]
                sm:w-[560px]
                lg:w-[620px]
                h-[380px]
                sm:h-[560px]
                lg:h-[620px]
                rounded-full
                bg-yellow-500/20
                blur-[150px]
                animate-pulse
                pointer-events-none
                "
              />

              {/* Subtle Golden Aura Ring */}
              <div
                className="
                absolute
                w-[300px]
                sm:w-[440px]
                lg:w-[500px]
                h-[300px]
                sm:h-[440px]
                lg:h-[500px]
                rounded-full
                border
                border-yellow-500/20
                bg-yellow-500/[0.03]
                blur-sm
                opacity-50
                pointer-events-none
                "
              />

              {/* Photo */}
              <div
                className="
                float-animation
                relative
                w-full
                max-w-[310px]
                sm:max-w-[460px]
                lg:max-w-[540px]
                h-[390px]
                sm:h-[580px]
                lg:h-[680px]
                transition-all
                duration-700
                "
              >
                <Image
                  src="/about_img.png"
                  alt="Mit Ramavat"
                  fill
                  sizes="(max-width: 640px) 310px, (max-width: 1024px) 460px, 540px"
                  className="
                  object-contain
                  drop-shadow-[0_20px_50px_rgba(234,179,8,0.25)]
                  hover:drop-shadow-[0_25px_60px_rgba(234,179,8,0.35)]
                  transition-all
                  duration-700
                  hover:scale-[1.02]
                  "
                />
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="grid gap-4 sm:gap-5">
              <div
                className="
                p-6
                rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-yellow-500/50
                hover:bg-zinc-900/70
                transition-all
                duration-300
                group
                "
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                    <Bot size={22} />
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-100">
                    AI & Machine Learning
                  </h3>
                </div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Machine Learning, Deep Learning, NLP and Intelligent Systems.
                </p>
              </div>

              <div
                className="
                p-6
                rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-yellow-500/50
                hover:bg-zinc-900/70
                transition-all
                duration-300
                group
                "
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                    <Code2 size={22} />
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-100">
                    Full Stack Development
                  </h3>
                </div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  React, Next.js, FastAPI, TypeScript and Modern Web Applications.
                </p>
              </div>

              <div
                className="
                p-6
                rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-yellow-500/50
                hover:bg-zinc-900/70
                transition-all
                duration-300
                group
                "
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                    <Rocket size={22} />
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-100">
                    Real-World Impact
                  </h3>
                </div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  10+ Projects built across AI, Machine Learning and Full Stack.
                </p>
              </div>

              <div
                className="
                p-6
                rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-900/40
                backdrop-blur-md
                hover:border-yellow-500/50
                hover:bg-zinc-900/70
                transition-all
                duration-300
                group
                "
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                    <MapPin size={22} />
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-100">
                    Location
                  </h3>
                </div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}