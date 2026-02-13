"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlarmClock, BadgeCheck, BarChart3, Wallet } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";

const INDICATORS = [
  {
    icon: BadgeCheck,
    title: "Confirmação no ERP",
    description:
      "Você enxerga o que foi enviado, o que foi confirmado e onde o pedido parou. Sem falha silenciosa.",
  },
  {
    icon: AlarmClock,
    title: "Tempo por etapa",
    description:
      "A operação ganha leitura de tempo por evento. Quando o fluxo desacelera, você vê antes do incêndio.",
  },
  {
    icon: Wallet,
    title: "Split e repasse",
    description:
      "Transação, split e repasse com status. O financeiro concilia por período e por CNPJ com rastreio.",
  },
  {
    icon: BarChart3,
    title: "Visão única",
    description:
      "Relatórios e painéis consistentes para operação, atendimento e financeiro. A mesma pergunta gera a mesma resposta.",
  },
];

export default function IndicatorsSection({ id = "indicadores" }: { id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id={id} className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0,0%,100%,0.02),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Indicadores
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            O que a operação passa a
            <br />
            <span className="text-muted-foreground">enxergar com clareza.</span>
          </h2>
          <p className="text-base text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            Não é sobre mais dados. É sobre leitura única, estados claros e rastreio para decidir com confiança.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDICATORS.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <SpotlightCard className="rounded-2xl border-gradient bg-card p-6" size={520} intensity={0.10}>
                <div className="w-10 h-10 rounded-2xl border border-border/60 bg-background/35 flex items-center justify-center">
                  <it.icon className="w-5 h-5 text-foreground/80" />
                </div>
                <div className="mt-5 font-display text-base font-semibold text-foreground">
                  {it.title}
                </div>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  {it.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
