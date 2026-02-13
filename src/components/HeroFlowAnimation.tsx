"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, { useEffect, useMemo } from "react";

type Beam = {
  d: string;
  strokeWidth: number;
  baseOpacity: number;
  beamOpacity: number;
  segment: number;
  gap: number;
  duration: number;
  delay: number;
  direction: 1 | -1;
};

/**
 * Fundo animado do Hero (estilo startup tech):
 * - Linhas suaves com brilhos que percorrem o caminho.
 * - Um "scan" sutil que atravessa a tela.
 * - Interação com o mouse: parallax leve + um realce suave ao redor do cursor.
 * - Mantém o tema preto e branco.
 */
export default function HeroFlowAnimation() {
  const reduceMotion = useReducedMotion();

  const beams = useMemo<Beam[]>(
    () => [
      {
        d: "M -220 210 C 220 60, 520 380, 960 220 S 1480 40, 1860 240",
        strokeWidth: 2.25,
        baseOpacity: 0.10,
        beamOpacity: 0.30,
        segment: 240,
        gap: 2600,
        duration: 18,
        delay: 0.0,
        direction: -1,
      },
      {
        d: "M -240 330 C 240 520, 540 140, 1000 340 S 1500 520, 1860 360",
        strokeWidth: 1.95,
        baseOpacity: 0.09,
        beamOpacity: 0.28,
        segment: 220,
        gap: 2400,
        duration: 22,
        delay: 0.65,
        direction: 1,
      },
      {
        d: "M -260 470 C 220 370, 520 700, 980 500 S 1520 340, 1860 560",
        strokeWidth: 1.75,
        baseOpacity: 0.085,
        beamOpacity: 0.26,
        segment: 200,
        gap: 2350,
        duration: 24,
        delay: 1.1,
        direction: -1,
      },
      {
        d: "M -260 620 C 260 520, 540 820, 1020 640 S 1540 520, 1860 720",
        strokeWidth: 1.55,
        baseOpacity: 0.08,
        beamOpacity: 0.24,
        segment: 190,
        gap: 2200,
        duration: 26,
        delay: 0.35,
        direction: 1,
      },
      {
        d: "M -240 150 C 220 10, 560 240, 980 120 S 1520 10, 1860 170",
        strokeWidth: 1.45,
        baseOpacity: 0.07,
        beamOpacity: 0.20,
        segment: 180,
        gap: 2550,
        duration: 28,
        delay: 1.5,
        direction: 1,
      },
    ],
    []
  );

  // Mouse parallax (bem leve)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.8 });
  const y = useSpring(my, { stiffness: 70, damping: 22, mass: 0.8 });

  // Cursor highlight (máscara dentro do SVG)
  const cursorX = useMotionValue(800);
  const cursorY = useMotionValue(320);
  const cxs = useSpring(cursorX, { stiffness: 90, damping: 24, mass: 0.7 });
  const cys = useSpring(cursorY, { stiffness: 90, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      // normaliza para -1..1 e aplica amplitude pequena
      const nx = (e.clientX / w - 0.5) * 2;
      const ny = (e.clientY / h - 0.5) * 2;
      mx.set(nx * 18);
      my.set(ny * 12);

      // converte cursor para coordenadas do viewBox (1600x900)
      cursorX.set((e.clientX / w) * 1600);
      cursorY.set((e.clientY / h) * 900);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, cursorX, cursorY, reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="beamFade"
            x1="0"
            y1="0"
            x2="1600"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.22" stopColor="white" stopOpacity="0.88" />
            <stop offset="0.78" stopColor="white" stopOpacity="0.88" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.45" stopColor="white" stopOpacity="0.12" />
            <stop offset="0.55" stopColor="white" stopOpacity="0.12" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="beamBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.0" />
          </filter>

          <filter id="maskBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="26" />
          </filter>

          <radialGradient id="softGlow" cx="50%" cy="18%" r="80%">
            <stop offset="0" stopColor="white" stopOpacity="0.09" />
            <stop offset="0.55" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="cursorMask">
            <rect x="0" y="0" width="1600" height="900" fill="black" />
            {!reduceMotion ? (
              <motion.circle
                cx={cxs}
                cy={cys}
                r="170"
                fill="white"
                filter="url(#maskBlur)"
                opacity="0.9"
              />
            ) : (
              <circle cx="800" cy="320" r="160" fill="white" opacity="0.6" />
            )}
          </mask>
        </defs>

        {/* base glow */}
        <rect x="0" y="0" width="1600" height="900" fill="url(#softGlow)" />

        {/* scan sutil */}
        {!reduceMotion ? (
          <motion.rect
            x={-520}
            y={0}
            width={520}
            height={900}
            fill="url(#scan)"
            opacity={0.45}
            animate={{ x: [-520, 1600 + 520] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        ) : null}

        <motion.g style={reduceMotion ? undefined : { translateX: x, translateY: y }}>
          {/* faint guide curves */}
          {beams.map((b, i) => (
            <path
              key={`base-${i}`}
              d={b.d}
              stroke="white"
              strokeOpacity={b.baseOpacity}
              strokeWidth={b.strokeWidth}
              fill="none"
            />
          ))}

          {/* moving highlights */}
          {!reduceMotion &&
            beams.map((b, i) => {
              const period = b.segment + b.gap;
              return (
                <motion.path
                  key={`beam-${i}`}
                  d={b.d}
                  stroke="url(#beamFade)"
                  strokeOpacity={b.beamOpacity}
                  strokeWidth={b.strokeWidth}
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#beamBlur)"
                  strokeDasharray={`${b.segment} ${b.gap}`}
                  animate={{
                    strokeDashoffset:
                      b.direction === 1 ? [0, -period] : [0, period],
                  }}
                  transition={{
                    duration: b.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: b.delay,
                  }}
                />
              );
            })}

          {/* realce perto do cursor (sem elementos "redondos" aparentes) */}
          <g mask="url(#cursorMask)">
            {beams.map((b, i) => (
              <path
                key={`cursor-${i}`}
                d={b.d}
                stroke="white"
                strokeOpacity={0.22}
                strokeWidth={b.strokeWidth + 0.2}
                fill="none"
              />
            ))}
          </g>
        </motion.g>
      </svg>

      {/* vinheta leve para o texto sempre ganhar */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.82)_80%)]" />
    </div>
  );
}
