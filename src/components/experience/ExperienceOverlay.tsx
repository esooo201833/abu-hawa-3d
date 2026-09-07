"use client";

import { motion } from "framer-motion";

type ExperienceOverlayProps = {
  progress: number;
};

export function ExperienceOverlay({
  progress,
}: ExperienceOverlayProps) {
  const introOpacity = Math.max(0, 1 - progress * 8);

  const machineOpacity =
    progress < 0.12
      ? 0
      : progress < 0.32
        ? Math.min(1, (progress - 0.12) / 0.08)
        : Math.max(0, 1 - (progress - 0.32) / 0.08);

  const specsOpacity =
    progress < 0.29
      ? 0
      : progress < 0.43
        ? Math.min(1, (progress - 0.29) / 0.06)
        : Math.max(0, 1 - (progress - 0.43) / 0.06);

  const adventureOpacity =
    progress < 0.48
      ? 0
      : progress < 0.63
        ? Math.min(1, (progress - 0.48) / 0.07)
        : Math.max(0, 1 - (progress - 0.63) / 0.07);

  const showroomOpacity =
    progress < 0.7
      ? 0
      : Math.min(1, (progress - 0.7) / 0.12);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 h-screen overflow-hidden">
      {/* Progress */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        <div className="h-32 w-px bg-white/10">
          <motion.div
            className="w-full origin-top bg-white"
            style={{
              height: `${progress * 100}%`,
            }}
          />
        </div>

        <span className="text-[9px] tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">
          SCROLL
        </span>
      </div>

      {/* Intro */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: introOpacity }}
      >
        <div className="text-center">
          <div className="mb-5 text-[10px] uppercase tracking-[0.55em] text-white/40">
            ABU HAWA MOTORS
          </div>

          <h1 className="text-[clamp(4rem,12vw,11rem)] font-black leading-[0.8] tracking-[-0.08em]">
            RIDE
          </h1>

          <div className="mt-7 text-[10px] uppercase tracking-[0.45em] text-white/45">
            Scroll to enter the machine
          </div>
        </div>
      </motion.div>

      {/* Chapter 01 */}
      <motion.div
        className="absolute left-[7vw] top-1/2 max-w-md -translate-y-1/2"
        style={{ opacity: machineOpacity }}
      >
        <div className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/35">
          01 / THE MACHINE
        </div>

        <h2 className="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.07em]">
          CBR
          <br />
          650R
        </h2>

        <p className="mt-7 max-w-xs text-sm leading-7 text-white/45">
          Pure road performance. A machine designed around balance,
          precision and the feeling of acceleration.
        </p>
      </motion.div>

      {/* Chapter 02 */}
      <motion.div
        className="absolute right-[7vw] top-1/2 max-w-sm -translate-y-1/2 text-right"
        style={{ opacity: specsOpacity }}
      >
        <div className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/35">
          02 / ENGINEERED
        </div>

        <div className="text-[clamp(3rem,6vw,6rem)] font-black leading-none tracking-[-0.06em]">
          94
          <span className="text-2xl tracking-normal text-white/40">
            HP
          </span>
        </div>

        <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-white/35">
          649cc inline four
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-5 text-left">
          <div>
            <div className="text-lg font-semibold">649cc</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/35">
              Engine
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold">4 CYL</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/35">
              Layout
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chapter 03 */}
      <motion.div
        className="absolute left-[7vw] top-1/2 max-w-md -translate-y-1/2"
        style={{ opacity: adventureOpacity }}
      >
        <div className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/35">
          03 / THE ADVENTURE
        </div>

        <h2 className="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.07em]">
          AFRICA
          <br />
          TWIN
        </h2>

        <p className="mt-7 max-w-xs text-sm leading-7 text-white/45">
          Built to leave the road behind. Long-distance capability
          meets uncompromising adventure.
        </p>

        <div className="mt-8 flex gap-8">
          <div>
            <div className="text-xl font-semibold">1084</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/35">
              CC
            </div>
          </div>

          <div>
            <div className="text-xl font-semibold">102</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/35">
              HP
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chapter 04 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: showroomOpacity }}
      >
        <div className="text-center">
          <div className="mb-5 text-[10px] uppercase tracking-[0.5em] text-white/35">
            04 / THE SHOWROOM
          </div>

          <h2 className="text-[clamp(3rem,9vw,9rem)] font-black leading-[0.78] tracking-[-0.08em]">
            ABU
            <br />
            HAWA
          </h2>

          <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-white/45">
            Two machines. One destination.
            <br />
            Welcome to the collection.
          </p>

          <button className="pointer-events-auto mt-9 rounded-full border border-white/20 bg-white px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-black transition-transform duration-300 hover:scale-105">
            Explore Showroom
          </button>
        </div>
      </motion.div>
    </div>
  );
}