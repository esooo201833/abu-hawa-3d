"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type LoadingScreenProps = {
  isLoading: boolean;
  progress?: number;
  onComplete?: () => void;
};

export function LoadingScreen({
  isLoading,
  progress = 0,
  onComplete,
}: LoadingScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading && progress >= 100) {
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]"
        >
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="h-16 w-16 rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <motion.p
                className="text-sm font-medium text-[var(--muted)]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading 3D Experience
              </motion.p>

              <div className="flex items-center gap-3">
                <div className="h-1 w-32 overflow-hidden rounded-full bg-[var(--border)]">
                  <motion.div
                    className="h-full bg-[var(--primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-xs text-[var(--muted)]">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <motion.div
              className="absolute -inset-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(circle, rgba(143,175,157,0.2), transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}