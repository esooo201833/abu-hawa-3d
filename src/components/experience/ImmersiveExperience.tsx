"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { ImmersiveWorld } from "./three/ImmersiveWorld";
import { ExperienceOverlay } from "./ExperienceOverlay";
import { ExperienceLoader } from "./ExperienceLoader";

export function ImmersiveExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[520vh]"
      aria-label="Abu Hawa immersive motorcycle experience"
    >
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <Canvas
          camera={{
            position: [0, 2.2, 11],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.25]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <color attach="background" args={["#050505"]} />

          <Suspense fallback={null}>
            <ImmersiveWorld progress={progress} />
          </Suspense>
        </Canvas>
      </div>

      <ExperienceLoader />

      <ExperienceOverlay progress={progress} />
    </section>
  );
}