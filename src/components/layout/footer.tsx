import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/80 pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-zinc-100">
              Mit <span className="text-yellow-400">Ramavat</span>
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              AI Engineer • Full Stack Developer
            </p>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <a
              href="https://github.com/RamavatMit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <FaGithub size={16} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/mit-ramavat-937a30339/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <FaLinkedin size={16} />
              LinkedIn
            </a>

            <a
              href="mailto:mitramavat8@gmail.com"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-zinc-500 text-xs sm:text-sm">
            © 2026 Mit Ramavat. All rights reserved.
          </p>

          <p className="text-zinc-500 text-xs sm:text-sm">
            Designed & Built with <span className="text-yellow-400">Next.js</span>, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}