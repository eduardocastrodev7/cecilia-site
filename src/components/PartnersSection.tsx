"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

const ITEMS = [
  {
    title: "White Label",
    description:
      "A gente entra como o braço de engenharia por trás da sua entrega, sem competir com sua marca.",
  },
  {
    title: "Proteção Técnica",
    description:
      "Arquitetura, validações e operação rastreável para reduzir risco e evitar retrabalho no pós lançamento.",
  },
  {
    title: "Foco no Design",
    description:
      "Sua agência foca em identidade, UX e comunicação. A gente garante infraestrutura e integrações, com fluxo claro de operação.",
  },
];

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="parceiros" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Para parceiros
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            O braço de engenharia
            <br />
            <span className="text-muted-foreground">da sua agência criativa.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Você vende visão e design. A Cecília sustenta a operação com estrutura.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border-gradient bg-card p-8 md:p-10"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full border border-border/60 bg-background/40 flex items-center justify-center">
                  <Check className="w-4 h-4 text-foreground/80" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{it.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{it.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex items-center justify-center"
        >
          <Link
            href="https://wa.me/5516991054211"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
          >
            Seja um Parceiro
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
