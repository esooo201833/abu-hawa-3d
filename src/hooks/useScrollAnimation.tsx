"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return {
    containerRef,
    scrollY,
    scrollYProgress,
  };
}

export function ScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollYProgress } = useScrollAnimation();

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <motion.section
      ref={useRef(null)}
      style={{ opacity, scale, y, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}