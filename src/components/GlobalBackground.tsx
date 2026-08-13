"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const mouseGlow = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(234, 179, 8, 0.05), transparent 75%)`
  );

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    const checkMotion = () => {
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkMotion();

    window.addEventListener("resize", checkMobile);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && !motionQuery.matches) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Deterministic seed for background floating particles to prevent hydration issues
  const particles = [
    { top: "10%", left: "15%", size: 2, duration: 16, delay: 0 },
    { top: "22%", left: "78%", size: 2.5, duration: 20, delay: 2 },
    { top: "35%", left: "25%", size: 2, duration: 18, delay: 4 },
    { top: "48%", left: "82%", size: 3, duration: 22, delay: 1 },
    { top: "62%", left: "12%", size: 2.5, duration: 17, delay: 3 },
    { top: "74%", left: "68%", size: 2, duration: 19, delay: 5 },
    { top: "85%", left: "35%", size: 3, duration: 21, delay: 2 },
    { top: "93%", left: "85%", size: 2, duration: 15, delay: 4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Technical Subtle Grid Pattern */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-50 dark:opacity-35"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      {/* 2. Subtle Gold Ambient Glow Orbs */}
      <div className="absolute top-[8%] left-[-80px] w-[500px] h-[500px] bg-yellow-500/[0.04] dark:bg-yellow-500/[0.05] rounded-full blur-[140px]" />
      <div className="absolute top-[45%] right-[-100px] w-[450px] h-[450px] bg-amber-500/[0.03] dark:bg-amber-500/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-[8%] left-[25%] w-[600px] h-[350px] bg-yellow-400/[0.03] dark:bg-yellow-400/[0.03] rounded-full blur-[160px]" />

      {/* 3. Mouse-Following Radial Gold Glow (Desktop Only, smooth spring) */}
      {mounted && !isMobile && !reducedMotion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ background: mouseGlow }}
        />
      )}

      {/* 4. Subtle Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, idx) => (
            <div
              key={idx}
              className={`absolute rounded-full bg-yellow-400/35 dark:bg-yellow-400/40 shadow-[0_0_6px_rgba(234,179,8,0.4)] ${
                reducedMotion ? "" : "animate-particle"
              }`}
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
