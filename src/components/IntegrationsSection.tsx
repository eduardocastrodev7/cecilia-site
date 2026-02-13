"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  CreditCard,
  Database,
  Headphones,
  Layers,
  Sheet,
  Sparkles,
} from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import { cn } from "@/lib/utils";

type Integration = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
};

const INTEGRATIONS: Integration[] = [
  {
    id: "shopify",
    title: "Shopify",
    description: "Loja, checkout, pedidos e eventos.",
    icon: Layers,
    tags: ["Pedido", "Cliente", "Eventos"],
  },
  {
    id: "erp",
    title: "ERP",
    description: "Faturamento, estoque e status operacional.",
    icon: Building2,
    tags: ["Estoque", "NF", "Status"],
  },
  {
    id: "asaas",
    title: "Asaas",
    description: "Split e repasse automático por CNPJ.",
    icon: CreditCard,
    tags: ["Split", "Repasse", "Conciliação"],
  },
  {
    id: "atendimento",
    title: "Atendimento",
    description: "Ocorrências, SLA e histórico de contato.",
    icon: Headphones,
    tags: ["Ocorrência", "SLA", "Contexto"],
  },
  {
    id: "planilhas",
    title: "Planilhas",
    description: "Bases auxiliares e ajustes com rastreio.",
    icon: Sheet,
    tags: ["Base", "Ajustes", "Governança"],
  },
  {
    id: "dados",
    title: "Outros sistemas",
    description: "APIs, plataformas e fontes internas.",
    icon: Database,
    tags: ["API", "Webhooks", "Sync"],
  },
];

export default function IntegrationsSection({
  id = "integracoes",
  heading,
  compact = false,
}: {
  id?: string;
  heading?: React.ReactNode;
  compact?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState(INTEGRATIONS[0].id);

  const active = useMemo(
    () => INTEGRATIONS.find((i) => i.id === activeId) ?? INTEGRATIONS[0],
    [activeId]
  );

  return (
    <section id={id} className={cn(compact ? "py-12" : "py-24 md:py-32", "relative")} ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0,0%,100%,0.03),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={cn("text-center", compact ? "mb-10" : "mb-14")}
        >
          {heading ?? (
            <>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                Integrações
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                A Cecília conecta sistemas
                <br />
                <span className="text-muted-foreground">em um fluxo único.</span>
              </h2>
              <p className="text-base text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
                Shopify, ERP, financeiro, atendimento e fontes internas. O diagnóstico define o que entra primeiro e como a operação mantém rastreio.
              </p>
            </>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-[360px,1fr] gap-6 lg:gap-8 items-start">
          <div className="space-y-2">
            {INTEGRATIONS.map((it, idx) => {
              const selected = it.id === activeId;
              return (
                <motion.button
                  key={it.id}
                  type="button"
                  onClick={() => setActiveId(it.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className={cn(
                    "w-full text-left rounded-2xl border-gradient bg-card px-5 py-4 transition-colors",
                    selected ? "bg-secondary" : "hover:bg-secondary/60"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 w-9 h-9 rounded-xl border border-border/60 bg-background/35 flex items-center justify-center">
                      <it.icon className="w-5 h-5 text-foreground/80" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-base font-semibold text-foreground leading-tight">
                        {it.title}
                      </div>
                      <div className="mt-1 text-base text-muted-foreground leading-relaxed">
                        {it.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <SpotlightCard className="rounded-2xl border-gradient bg-card p-6 md:p-8" size={820} intensity={0.10}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl border border-border/60 bg-background/40 flex items-center justify-center">
                <active.icon className="w-5 h-5 text-foreground/80" />
              </div>
              <div>
                <div className="font-display text-xl font-bold leading-tight">
                  {active.title}
                </div>
                <div className="text-base text-muted-foreground mt-1 leading-relaxed">
                  {active.description}
                </div>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {active.tags.map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-border/60 bg-background/35 px-4 py-3 text-base font-semibold text-foreground/80 text-center"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border/60 bg-background/30 p-5">
              <div className="flex items-center gap-2 text-base font-semibold text-foreground/80">
                <Sparkles className="w-4 h-4" />
                O que a Cecília garante
              </div>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                {[
                  "Rastreio por evento e status",
                  "Regras explícitas e auditáveis",
                  "Confirmação de destino e retorno",
                  "Uma visão única para o time",
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-base text-foreground/80"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              As integrações variam por operação. O diagnóstico define prioridades, eventos críticos e o caminho mais seguro para ativação.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
