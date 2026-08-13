import Hero from "@/sections/hero";
import About from "@/sections/about";
import CircularSkills from "@/components/CircularSkills";
import ProjectCoverflow from "@/components/ProjectCoverflow";
import Contact from "@/sections/contact";
import Footer from "@/components/layout/footer";
import Dock from "@/components/layout/Dock";
import ThemeToggle from "@/components/ThemeToggle";
import Timeline from "@/sections/timeline";
import Experience from "@/sections/experience";
import GlobalBackground from "@/components/GlobalBackground";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      <GlobalBackground />

      {/* Background Glow */}

      <div
        className="
        absolute
        top-0
        left-0
        w-[500px]
        h-[500px]
        bg-yellow-500/10
        blur-[150px]
        rounded-full
        pointer-events-none
        "
      />

      <div
        className="
        absolute
        top-[40%]
        right-0
        w-[400px]
        h-[400px]
        bg-yellow-500/10
        blur-[140px]
        rounded-full
        pointer-events-none
        "
      />

      <div
        className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        w-[600px]
        h-[300px]
        bg-yellow-500/5
        blur-[160px]
        rounded-full
        pointer-events-none
        "
      />

      {/* Content */}

      <div className="relative z-10">

        <ThemeToggle />
        <Hero />
        <About />
        <Timeline />
        <Experience/>
        <CircularSkills />
        <ProjectCoverflow />
        <Contact />
        <Footer />
        <Dock />

      </div>

    </main>
  );
}