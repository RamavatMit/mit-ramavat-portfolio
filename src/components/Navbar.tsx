"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled && !open && "bg-paper/70 backdrop-blur-xl border-b border-line"
        )}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="container-x flex h-16 items-center justify-between sm:h-20">
          <Link href="/" className="group flex items-center gap-3" aria-label="Mit Ramavat — home">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono text-[11px]">
              MR
              <span className="absolute inset-0 rounded-full bg-iridescent opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-50" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative flex items-center gap-1.5 overflow-hidden px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                      {l.label}
                    </span>
                    <span className="absolute inset-0 block translate-y-full text-ink transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                      {l.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo",
                  open ? "rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo",
                  open ? "-rotate-45" : "translate-y-[3px]"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-4 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 text-5xl font-medium tracking-tighter"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex items-end justify-between border-t border-line pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="space-y-1 label-mono text-muted">
                {profile.socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="block hover:text-ink">
                    {s.label} ↗
                  </a>
                ))}
              </div>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="label-mono text-ink">
                Resume ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
