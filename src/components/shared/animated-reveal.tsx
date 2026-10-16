"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  y = 24,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={cn(className)}
      initial={{ opacity: 0, y: Math.min(y, 16) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px", amount: 0.05 }}
      transition={{
        duration: 0.45,
        delay: Math.min(delay, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
