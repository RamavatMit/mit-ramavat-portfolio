"use client";

import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import { scrollToTarget } from "@/components/motion/SmoothScroll";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x pt-16">
        <div className="grid gap-10 label-mono text-muted sm:grid-cols-4">
          <div className="space-y-2">
            <p className="text-dim">Navigate</p>
            {["work", "about", "experience", "stack", "contact"].map((id) => (
              <Link key={id} href={`/#${id}`} className="block capitalize transition-colors hover:text-ink">
                {id}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-dim">Social</p>
            {profile.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-ink">
                {s.label} ↗
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-ink">
              Resume ↗
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-dim">Local time</p>
            <LiveClock className="block text-ink/80" />
            <p>{profile.location}</p>
          </div>
          <div className="space-y-2 sm:text-right">
            <p className="text-dim">Top</p>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="label-mono transition-colors hover:text-ink"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      <div className="container-x mt-16 select-none" aria-hidden>
        <p className="text-outline whitespace-nowrap text-center text-[clamp(3rem,14.2vw,17rem)] font-semibold uppercase leading-[0.75] tracking-[-0.06em] [-webkit-text-stroke-color:rgb(31_28_23/0.18)]">
          Mit Ramavat
        </p>
      </div>

      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 label-mono text-dim sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Designed & engineered by Mit — Next.js · Canvas</p>
      </div>
    </footer>
  );
}
