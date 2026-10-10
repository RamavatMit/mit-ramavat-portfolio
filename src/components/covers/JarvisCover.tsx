"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePageVisible } from "@/components/book/context";

const STATES = [
  { label: "Listening", color: "#2d4f86", line: "“Hey Jarvis, open Chrome and play lofi on YouTube”" },
  { label: "Thinking", color: "#7a5ab5", line: "plan → chrome_agent.open(youtube) → search(“lofi”)" },
  { label: "Working", color: "#c18a2e", line: "Chrome agent · step 3 · clicked Search" },
  { label: "Speaking", color: "#4f8a5b", line: "“Playing lofi hip hop radio on YouTube.”" },
];

/** Illustrated stand-in for the Jarvis HUD: a state orb, a voice waveform and the agent log. */
export default function JarvisCover() {
  const reduce = useReducedMotion();
  const visible = usePageVisible();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => setI((v) => (v + 1) % STATES.length), 2600);
    return () => clearInterval(id);
  }, [reduce, visible]);

  const s = STATES[i];
  const live = visible && !reduce;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f4efe4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(255_255_255/0.9),transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(31 28 23 / 0.12) 1px, transparent 1.4px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((r) => (
          <motion.span
            key={r}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{ borderColor: s.color, width: `${36 + r * 18}cqw`, height: `${36 + r * 18}cqw`, x: "-50%", y: "-50%" }}
            animate={live ? { scale: [1, 1.07, 1], opacity: [0.35 - r * 0.1, 0.08, 0.35 - r * 0.1] } : { opacity: 0.2 }}
            transition={{ duration: 2.4, repeat: live ? Infinity : 0, delay: r * 0.3, ease: "easeInOut" }}
          />
        ))}
        <motion.div
          className="relative h-[24cqw] w-[24cqw] rounded-full"
          animate={{
            background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${s.color}cc 42%, ${s.color} 80%)`,
            boxShadow: `0 1.5cqw 6cqw -1cqw ${s.color}88`,
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="absolute inset-x-0 top-[66%] flex h-[8cqw] items-center justify-center gap-[0.6cqw]">
        {Array.from({ length: 40 }).map((_, b) => (
          <motion.span
            key={b}
            className="w-[0.6cqw] rounded-full"
            style={{ backgroundColor: s.color, opacity: 0.6 }}
            animate={live ? { height: ["0.8cqw", `${1.2 + ((b * 37) % 28) / 4}cqw`, "0.8cqw"] } : { height: "1cqw" }}
            transition={{ duration: 0.9 + (b % 5) * 0.12, repeat: live ? Infinity : 0, ease: "easeInOut", delay: b * 0.02 }}
          />
        ))}
      </div>

      <div className="absolute inset-x-[5%] bottom-[5%] rounded-[1.6cqw] border border-[rgb(31_28_23/0.1)] bg-white/75 px-[3cqw] py-[2.2cqw] font-mono text-[1.9cqw] backdrop-blur-sm">
        <div className="mb-[1cqw] flex items-center gap-[1.4cqw] uppercase tracking-[0.14em]">
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full" style={{ backgroundColor: s.color }} />
          <span style={{ color: s.color }}>{s.label}</span>
          <span className="ml-auto text-[#9b9384]">jarvis · hud</span>
        </div>
        <motion.p key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="truncate text-[#4a453c]">
          {s.line}
        </motion.p>
      </div>
    </div>
  );
}
