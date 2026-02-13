"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Tamanho do foco (em px). */
  size?: number;
  /** Intensidade do foco (0..1). */
  intensity?: number;
};

/**
 * Card com highlight radial que segue o mouse.
 * Ajuda a dar sensação de "produto" sem poluir o layout.
 */
export default function SpotlightCard({
  children,
  className,
  size = 520,
  intensity = 0.08,
}: SpotlightCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, rgba(255,255,255,${intensity}), transparent 60%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const onMouseLeave = () => {
    if (reduceMotion) return;
    mx.set(-1000);
    my.set(-1000);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative overflow-hidden ${className ?? ""}`}
    >
      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
