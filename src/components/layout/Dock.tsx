"use client";

import { Home, User, Clock, Code, Briefcase, Mail } from "lucide-react";

export default function Dock() {
  const navItems = [
    { href: "#hero", icon: Home, label: "Home" },
    { href: "#about", icon: User, label: "About" },
    { href: "#timeline", icon: Clock, label: "Timeline" },
    { href: "#skills", icon: Code, label: "Skills" },
    { href: "#projects", icon: Briefcase, label: "Projects" },
    { href: "#contact", icon: Mail, label: "Contact" },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-16px)]">
      <nav
        aria-label="Bottom Navigation Dock"
        className="
        flex
        items-center
        gap-1.5
        sm:gap-5
        px-3
        sm:px-5
        py-2
        sm:py-3
        rounded-full
        bg-black/80
        backdrop-blur-2xl
        border
        border-yellow-500/30
        shadow-[0_0_30px_rgba(234,179,8,0.15)]
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="
                group
                relative
                p-2
                sm:p-2.5
                rounded-full
                text-zinc-400
                hover:text-yellow-400
                hover:bg-yellow-500/10
                transition-all
                duration-300
                hover:scale-110
                active:scale-95
              "
            >
              <Icon size={20} />
              <span
                className="
                absolute
                -top-9
                left-1/2
                -translate-x-1/2
                px-2.5
                py-1
                rounded-md
                bg-zinc-900
                border
                border-zinc-700
                text-yellow-400
                text-[11px]
                font-medium
                opacity-0
                group-hover:opacity-100
                pointer-events-none
                transition-opacity
                duration-200
                whitespace-nowrap
                shadow-lg
                "
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}