"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { usePageVisible } from "@/components/book/context";

// Deterministic pseudo-random walk so server and client render identical candles.
function series(n: number, seed = 7) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const out: { o: number; c: number; h: number; l: number }[] = [];
  let price = 50;
  for (let i = 0; i < n; i++) {
    const o = price;
    const c = o + (rnd() - 0.46) * 6;
    const h = Math.max(o, c) + rnd() * 3;
    const l = Math.min(o, c) - rnd() * 3;
    out.push({ o, c, h, l });
    price = c;
  }
  return out;
}

const UP = "#2d4f86";
const DOWN = "#c4452c";

/** Hand-drawn style candlestick chart with an equity curve, standing in for the trading dashboard. */
export default function TradingCover() {
  const visible = usePageVisible();
  const reduce = useReducedMotion();
  const candles = useMemo(() => series(38), []);
  const draw = visible || !!reduce;

  const W = 600;
  const H = 300;
  const min = Math.min(...candles.map((c) => c.l));
  const max = Math.max(...candles.map((c) => c.h));
  const y = (v: number) => 24 + (1 - (v - min) / (max - min)) * (H - 70);
  const cw = W / candles.length;
  const equity = candles.map((c, i) => `${i === 0 ? "M" : "L"}${i * cw + cw / 2},${y(c.c) - 6}`).join(" ");
  const signals = [8, 16, 24, 32];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f4efe4]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(31 28 23 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(31 28 23 / 0.07) 1px, transparent 1px)",
          backgroundSize: "8% 10%",
        }}
      />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-x-[3%] top-[16%] h-[58%] w-[94%]">
        <defs>
          <linearGradient id="eq-light" x1="0" x2="1">
            <stop offset="0%" stopColor="#c4452c" />
            <stop offset="100%" stopColor="#c18a2e" />
          </linearGradient>
        </defs>
        {candles.map((c, i) => {
          const up = c.c >= c.o;
          const col = up ? UP : DOWN;
          return (
            <motion.g
              key={i}
              initial={reduce ? false : { opacity: 0, scaleY: 0 }}
              animate={draw ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.45, delay: draw ? 0.25 + i * 0.022 : 0, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${i * cw + cw / 2}px ${y((c.o + c.c) / 2)}px` }}
            >
              <line x1={i * cw + cw / 2} x2={i * cw + cw / 2} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeOpacity={0.55} strokeWidth={1} />
              <rect
                x={i * cw + cw * 0.22}
                width={cw * 0.56}
                y={y(Math.max(c.o, c.c))}
                height={Math.max(1.5, Math.abs(y(c.o) - y(c.c)))}
                fill={up ? "transparent" : col}
                stroke={col}
                strokeWidth={1}
                fillOpacity={0.85}
              />
            </motion.g>
          );
        })}
        <motion.path
          d={equity}
          fill="none"
          stroke="url(#eq-light)"
          strokeWidth={2.2}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={draw ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: draw ? 2 : 0, delay: draw ? 0.8 : 0, ease: [0.65, 0, 0.35, 1] }}
          vectorEffect="non-scaling-stroke"
        />
        {signals.map((s, k) => (
          <motion.circle
            key={s}
            cx={s * cw + cw / 2}
            cy={y(candles[s].l) + 12}
            r={4}
            fill="#c4452c"
            initial={reduce ? false : { scale: 0 }}
            animate={draw ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: draw ? 1.4 + k * 0.2 : 0, type: "spring", stiffness: 300 }}
          />
        ))}
      </svg>

      <div className="absolute left-[4%] top-[4.5%] flex gap-[1.5cqw] font-mono text-[1.8cqw] uppercase tracking-[0.12em]">
        <span className="rounded-full border border-[rgb(31_28_23/0.15)] bg-white/70 px-[2cqw] py-[0.7cqw] text-[#4a453c]">BTC/USDT · 1h</span>
        <span className="rounded-full border border-[rgb(196_69_44/0.3)] bg-white/70 px-[2cqw] py-[0.7cqw] text-[#c4452c]">ml_signal p≥0.80</span>
      </div>

      <div className="absolute inset-x-[4%] bottom-[5%] grid grid-cols-3 gap-[1.5cqw] font-mono">
        {[
          ["Val. win rate", "74.6%"],
          ["Holdout PF", "1.92"],
          ["Max DD", "1.6%"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[1.4cqw] border border-[rgb(31_28_23/0.1)] bg-white/75 px-[2cqw] py-[1.6cqw]">
            <p className="text-[1.6cqw] uppercase tracking-[0.12em] text-[#9b9384]">{k}</p>
            <p className="mt-[0.5cqw] text-[3cqw] text-[#1f1c17]">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
