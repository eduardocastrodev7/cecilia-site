"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const BULLETS = [
  "Monitoramento e alertas (integrações e fluxos críticos)",
  "Rastreabilidade (trilha de auditoria por pedido e evento)",
  "Resiliência (reprocessamento automático e falha controlada)",
  "Implantação segura (critérios de aceite e plano de volta)",
];

export default function EngineeringProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="engenharia" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,0%,100%,0.02),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Prova de engenharia
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Menos incêndio.
            <br />
            <span className="text-muted-foreground">Mais previsibilidade.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            O visual é monocromático. A operação por trás é desenhada para aguentar carga real.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl border-gradient bg-card p-8 md:p-10"
          >
            <h3 className="font-display text-xl font-semibold mb-5">Garantias</h3>
            <ul className="space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="text-muted-foreground leading-relaxed">
                  <span className="text-foreground/70">•</span> {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-2">
              {["Trilha de auditoria", "Reprocessamento", "Alertas", "SLA"].map((t) => (
                <div
                  key={t}
                  className="rounded-lg border border-border/60 bg-background/30 px-3 py-2 text-xs text-muted-foreground"
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="rounded-2xl border-gradient bg-card p-8 md:p-10"
          >
            <h3 className="font-display text-xl font-semibold mb-5">Fluxos em produção</h3>
            <div className="grid grid-cols-2 gap-3">
              <MiniPanel title="Fluxos críticos">
                <StatusRow name="Pedido → ERP" state="ok" />
                <StatusRow name="Cancelamento → ERP" state="ok" />
                <StatusRow name="Expedição → Shopify" state="warn" />
                <StatusRow name="Repasse → Financeiro" state="ok" />
              </MiniPanel>
              <MiniPanel title="Trilha de auditoria">
                <LogRow text="pedido.criado" state="ok" />
                <LogRow text="roteamento.aplicado" state="ok" />
                <LogRow text="erp.sincronizacao.falha" state="err" />
                <LogRow text="reprocessamento.agendado" state="warn" />
              </MiniPanel>
            </div>

            <div className="mt-4 rounded-xl border border-border/60 bg-background/30 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Tempo de resposta (p95)</span>
                <span className="text-xs text-foreground/70">320ms</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                <div className="h-full w-[62%] rounded-full bg-foreground/35" />
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Sem mágica: regras, estados e rastreabilidade. <span className="text-foreground/80">Estrutura, não remendos.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MiniPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
      <div className="text-[11px] font-semibold tracking-wide text-muted-foreground">{title}</div>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

function Dot({ state }: { state: "ok" | "warn" | "err" }) {
  const cls =
    state === "ok" ? "bg-foreground/70" : state === "warn" ? "bg-foreground/40" : "bg-foreground/25";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function StatusRow({ name, state }: { name: string; state: "ok" | "warn" | "err" }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/30 px-2 py-1">
      <span className="text-[11px] text-muted-foreground">{name}</span>
      <Dot state={state} />
    </div>
  );
}

function LogRow({ text, state }: { text: string; state: "ok" | "warn" | "err" }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/30 px-2 py-1">
      <Dot state={state} />
      <span className="text-[11px] text-muted-foreground">{text}</span>
    </div>
  );
}
