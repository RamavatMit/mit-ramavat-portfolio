"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        <div className="font-bold text-xl text-zinc-100">
          Mit.
        </div>

        <div className="hidden md:flex gap-8">
          <Link href="#about" className="text-zinc-300 hover:text-yellow-400 transition-colors">About</Link>
          <Link href="#skills" className="text-zinc-300 hover:text-yellow-400 transition-colors">Skills</Link>
          <Link href="#projects" className="text-zinc-300 hover:text-yellow-400 transition-colors">Projects</Link>
          <Link href="#contact" className="text-zinc-300 hover:text-yellow-400 transition-colors">Contact</Link>
        </div>

        <button
          type="button"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="p-2 rounded-full text-zinc-300 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )
          ) : (
            <Moon size={20} />
          )}
        </button>

      </nav>
    </header>
  );
}