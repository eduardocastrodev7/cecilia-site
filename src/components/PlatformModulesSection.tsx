"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import { PRODUCTS, type ProductSlug } from "@/lib/products";
import { cn } from "@/lib/utils";

const PATTERNS: Record<ProductSlug, string> = {
  commerce:
    "linear-gradient(180deg,rgba(255,255,255,0.05),transparent 60%), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
  core:
    "linear-gradient(180deg,rgba(255,255,255,0.05),transparent 60%), linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",
  pay:
    "linear-gradient(180deg,rgba(255,255,255,0.05),transparent 60%), linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  vision:
    "linear-gradient(180deg,rgba(255,255,255,0.05),transparent 60%), linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
};

const PATTERN_SIZES: Record<ProductSlug, string> = {
  commerce: "120px 120px",
  core: "88px 88px",
  pay: "96px 96px",
  vision: "84px 84px",
};

export default function PlatformModulesSection({ id = "modulos" }: { id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id={id} className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0,0%,100%,0.03),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Módulos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Um ecossistema que organiza
            <br />
            <span className="text-muted-foreground">a operação de ponta a ponta.</span>
          </h2>
          <p className="text-base text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Cada produto resolve um ponto crítico da operação. Juntos, eles formam uma plataforma para escalar com regras, rastreio e previsibilidade.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {PRODUCTS.map((p, idx) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <SpotlightCard
                className={cn(
                  "rounded-2xl border-gradient bg-card overflow-hidden",
                  "p-7 md:p-9"
                )}
                size={920}
                intensity={0.12}
              >
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: PATTERNS[p.slug as ProductSlug], backgroundSize: PATTERN_SIZES[p.slug as ProductSlug] }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl border border-border/60 bg-background/35 flex items-center justify-center">
                          <p.icon className="w-5 h-5 text-foreground/80" />
                        </div>
                        <div>
                          <div className="font-display text-2xl font-bold leading-tight">
                            {p.name}
                          </div>
                          <div className="text-base text-muted-foreground mt-1 leading-relaxed">
                            {p.tagline}
                          </div>
                        </div>
                      </div>

                      <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${p.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                      >
                        Ver detalhes
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-7 grid sm:grid-cols-2 gap-3">
                    {(p.outcomes ?? []).slice(0, 3).map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-border/60 bg-background/35 px-4 py-3 text-base text-foreground/80"
                      >
                        {x}
                      </div>
                    ))}
                    {(p.solves ?? []).slice(0, 1).map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-border/60 bg-card/35 px-4 py-3 text-base text-foreground/75"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
