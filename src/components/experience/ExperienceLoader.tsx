"use client";

import { useProgress } from "@react-three/drei";

export function ExperienceLoader() {
  const { active, progress, item } = useProgress();

  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-[#050505]">
      <div className="w-[min(420px,80vw)]">
        <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/40">
          <span>ABU HAWA</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-all duration-200"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-5 text-center text-[10px] uppercase tracking-[0.3em] text-white/45">
          {item ? "Loading machine..." : "Initializing world..."}
        </div>
      </div>
    </div>
  );
}