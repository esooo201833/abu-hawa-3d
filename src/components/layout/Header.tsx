"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-auto"
        >
          <div
            className={`text-[11px] font-semibold uppercase tracking-[0.45em] transition-all duration-500 ${
              scrolled ? "text-white" : "text-white/80"
            }`}
          >
            ABU HAWA
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-5"
        >
          {/* Status */}
          <div className="hidden items-center gap-2 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-white/35">
              EXPERIENCE
            </span>
          </div>

          {/* Menu */}
          <button
            type="button"
            className="pointer-events-auto group flex items-center gap-3"
            aria-label="Open menu"
          >
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/55 transition-colors duration-300 group-hover:text-white">
              MENU
            </span>

            <span className="flex w-6 flex-col gap-1.5">
              <span className="block h-px w-full bg-white/70 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="block h-px w-2/3 bg-white/40 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Cinematic top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-6 h-px origin-left bg-white/[0.06] md:mx-10"
      />
    </header>
  );
}