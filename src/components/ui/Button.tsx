"use client";

import { motion } from "framer-motion";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "relative flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium";
  const transformStyle = { transformStyle: "preserve-3d" as const };

  const variants = {
    primary: "bg-[var(--primary)] text-white shadow-[0_10px_25px_rgba(18,60,58,0.16)]",
    secondary: "bg-white text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.04)]",
    outline: "border border-[var(--border)] bg-white/50 text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.03)] backdrop-blur-sm",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={transformStyle}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-black/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}