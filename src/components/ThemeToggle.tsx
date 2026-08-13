"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDark(false);
    } else {
      const isDark = document.documentElement.classList.contains("dark");
      setDark(isDark);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="
        fixed
        top-6
        right-6
        z-50
        w-12
        h-12
        rounded-full
        border
        border-yellow-600
        backdrop-blur-xl
        flex
        items-center
        justify-center
        hover:scale-110
        focus:outline-none
        focus:ring-2
        focus:ring-yellow-500
        transition-all
        duration-300
      "
    >
      {dark ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}