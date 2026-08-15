"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section
      id="hero"
      className="
      relative
      min-h-screen
      flex
      items-center
      px-4
      sm:px-6
      py-24
      md:py-32
      overflow-hidden
      "
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-500/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              AI Engineer • Full Stack Developer
            </div>

            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-100 leading-[1.08]">
              Mit{" "}
              <span className="block text-yellow-400 mt-1">
                Ramavat
              </span>
            </h1>

            <div className="mt-6 min-h-[44px]">
              <TypeAnimation
                sequence={[
                  "AI Engineer",
                  2000,
                  "Machine Learning Engineer",
                  2000,
                  "Full Stack Developer",
                  2000,
                  "FastAPI Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-semibold
                text-yellow-500
                "
              />
            </div>

            <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              Building intelligent AI systems, machine learning solutions and
              premium digital experiences using modern technologies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
              <a
                href="#projects"
                className="
                px-7
                py-3.5
                rounded-2xl
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-semibold
                text-sm
                sm:text-base
                transition-all
                duration-300
                shadow-[0_0_30px_rgba(234,179,8,0.3)]
                hover:scale-105
                "
              >
                View Projects
              </a>

              <a
                href="/resume/Mit-Ramavat-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                px-7
                py-3.5
                rounded-2xl
                border
                border-zinc-700
                hover:border-yellow-500
                bg-zinc-900/60
                text-zinc-200
                hover:text-yellow-400
                font-semibold
                text-sm
                sm:text-base
                transition-all
                duration-300
                hover:scale-105
                "
              >
                Resume
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-10 mt-12 pt-10 border-t border-zinc-800/80 max-w-md">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  10+
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                  Projects
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  AI
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                  Focused
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  Full Stack
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                  Developer
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PROFILE COMPOSITION */}
          <div className="lg:col-span-5 flex justify-center items-center relative my-4 lg:my-0">
            {/* Ambient Golden Radial Glow Behind Portrait */}
            <div className="absolute w-[320px] sm:w-[440px] lg:w-[500px] h-[320px] sm:h-[440px] lg:h-[500px] rounded-full bg-yellow-500/15 blur-[130px] pointer-events-none animate-pulse" />

            {/* Subtle Circular / Elliptical Golden Aura Ring */}
            <div className="absolute w-[270px] sm:w-[380px] lg:w-[440px] h-[270px] sm:h-[380px] lg:h-[440px] rounded-full border border-yellow-500/20 bg-yellow-500/[0.03] blur-sm opacity-60 pointer-events-none" />

            {/* Main Floating Portrait Wrapper */}
            <div className="float-animation relative w-[290px] sm:w-[400px] lg:w-[480px] h-[360px] sm:h-[500px] lg:h-[580px] flex justify-center items-center">
              <Image
                src="/hero_img.png"
                alt="Mit Ramavat"
                fill
                priority
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 400px, 480px"
                className="
                  object-contain
                  drop-shadow-[0_15px_45px_rgba(234,179,8,0.22)]
                  transition-transform
                  duration-700
                  hover:scale-[1.02]
                "
              />

              {/* Floating AI Engineer Pill Badge */}
              <div
                className="
                absolute
                top-4
                right-0
                sm:top-8
                sm:right-2
                px-4
                py-2
                rounded-full
                bg-zinc-950/85
                backdrop-blur-xl
                border
                border-yellow-500/40
                text-xs
                sm:text-sm
                font-medium
                text-yellow-400
                shadow-[0_0_25px_rgba(234,179,8,0.2)]
                flex
                items-center
                gap-2
                z-20
                "
              >
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                AI Engineer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}