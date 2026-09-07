"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ShowroomIntro } from "@/components/showroom/ShowroomIntro";
import { ShowroomScene } from "@/components/three/ShowroomScene";

export default function ThreeDShowroomPage() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#d4d5d0]">
      <ShowroomScene entered={entered} />

      <AnimatePresence>
        {!entered && (
          <ShowroomIntro onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {entered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="pointer-events-none absolute left-6 top-6 z-20"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/45">
            Abu Hawa
          </div>

          <div className="mt-1 text-xs text-black/35">
            Interactive Showroom
          </div>
        </motion.div>
      )}
    </main>
  );
}