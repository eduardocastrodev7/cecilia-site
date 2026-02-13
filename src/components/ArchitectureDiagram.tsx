import React from "react";

type Props = {
  className?: string;
};

/**
 * Diagrama simples (monocromático).
 * Obs: atualmente não é usado no Hero (optamos por animação abstrata),
 * mas deixamos aqui caso você queira reaproveitar em algum lugar do site.
 */
export default function ArchitectureDiagram({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arch-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.22" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="arch-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* connections */}
      <path
        d="M210 250H420M520 250H680M520 250V150H680M520 250V350H680"
        stroke="url(#arch-line)"
        strokeWidth="2"
      />
      <path
        d="M780 150H980M780 250H980M780 350H980"
        stroke="url(#arch-line)"
        strokeWidth="2"
      />

      {/* nodes */}
      <g opacity="0.9">
        <Node x={80} y={210} w={160} h={80} title="Shopify" subtitle="eventos" />
        <Node x={420} y={210} w={160} h={80} title="Orquestrador" subtitle="Cecília Core" />

        <Node x={680} y={110} w={160} h={80} title="Pagamentos" subtitle="Cecília Pay" />
        <Node x={680} y={210} w={160} h={80} title="ERP" subtitle="sincronização" />
        <Node x={680} y={310} w={160} h={80} title="Operação" subtitle="Cecília Vision" />

        <Node x={980} y={110} w={160} h={80} title="Repasse" subtitle="status" />
        <Node x={980} y={210} w={160} h={80} title="Expedição" subtitle="operações" />
        <Node x={980} y={310} w={160} h={80} title="Visão" subtitle="indicadores" />
      </g>

      {/* subtle glow dots */}
      <g filter="url(#arch-soft)" opacity="0.35">
        <circle cx="240" cy="250" r="3" fill="white" />
        <circle cx="420" cy="250" r="3" fill="white" />
        <circle cx="600" cy="250" r="3" fill="white" />
        <circle cx="680" cy="150" r="3" fill="white" />
        <circle cx="680" cy="350" r="3" fill="white" />
      </g>
    </svg>
  );
}

function Node({
  x,
  y,
  w,
  h,
  title,
  subtitle,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        stroke="white"
        strokeOpacity={0.18}
        fill="white"
        fillOpacity={0.02}
      />
      <text
        x={x + 18}
        y={y + 34}
        fill="white"
        fillOpacity={0.72}
        fontSize={16}
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        fontWeight={600}
      >
        {title}
      </text>
      <text
        x={x + 18}
        y={y + 58}
        fill="white"
        fillOpacity={0.42}
        fontSize={12}
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
      >
        {subtitle}
      </text>
    </g>
  );
}
