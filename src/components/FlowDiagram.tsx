import React from "react";
import type { ProductFlowNode } from "@/lib/products";

type Props = {
  nodes: ProductFlowNode[];
  className?: string;
  /**
   * Quando true, reduz levemente os paddings/tamanhos.
   * Útil para colocar dentro de cards menores.
   */
  compact?: boolean;
};

/**
 * Diagrama de fluxo "estilo draw.io" (só que monocromático e leve).
 * - Horizontal no desktop
 * - Vertical no mobile
 */
export default function FlowDiagram({ nodes, className, compact }: Props) {
  const boxPadding = compact ? "p-3" : "p-4";
  const labelClass = compact ? "text-[10px]" : "text-[11px]";
  const titleClass = compact ? "text-sm" : "text-sm";

  // Tailwind não consegue gerar `grid-cols-${n}` dinamicamente sem safelist;
  // então usamos `md:flex` para manter responsivo sem depender de grid dinâmica.
  return (
    <div className={className}>
      {/* Mobile: vertical */}
      <div className="md:hidden space-y-3">
        {nodes.map((n, i) => (
          <div key={`${n.label}-${i}`} className="relative">
            <div className={`rounded-xl border border-border/60 bg-background/30 ${boxPadding}`}>
              <div className="flex items-center justify-between">
                <span className={`${labelClass} font-semibold tracking-wide text-muted-foreground`}>Etapa {String(i + 1).padStart(2, "0")}</span>
                <span className={`${labelClass} text-foreground/60`}>→</span>
              </div>
              <div className={`${titleClass} font-semibold mt-2`}>{n.label}</div>
              {n.hint ? <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{n.hint}</div> : null}
            </div>

            {i < nodes.length - 1 ? (
              <div className="absolute left-1/2 -bottom-4 -translate-x-1/2">
                <ArrowDown />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-stretch gap-3">
        {nodes.map((n, i) => (
          <div key={`${n.label}-${i}`} className="relative flex-1">
            <div className={`h-full rounded-xl border border-border/60 bg-background/30 ${boxPadding}`}>
              <div className="flex items-center justify-between">
                <span className={`${labelClass} font-semibold tracking-wide text-muted-foreground`}>Etapa {String(i + 1).padStart(2, "0")}</span>
                <span className={`${labelClass} text-foreground/60`}>→</span>
              </div>
              <div className={`${titleClass} font-semibold mt-2`}>{n.label}</div>
              {n.hint ? <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{n.hint}</div> : null}
            </div>

            {i < nodes.length - 1 ? (
              <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                <ArrowRight />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
      <path d="M1 6H19" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 2L24 6L18 10" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="12" height="26" viewBox="0 0 12 26" fill="none" aria-hidden="true">
      <path d="M6 1V19" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 18L6 24L10 18" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
