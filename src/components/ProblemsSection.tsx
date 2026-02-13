"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { AlertTriangle, Unplug, BarChart3, Building2 } from "lucide-react";

const problems = [
  {
    icon: Building2,
    tag: "Operação",
    title: "Multi-CNPJ sem controle",
    description: "Operação com múltiplos CNPJs usando planilhas e processos manuais que geram erros fiscais e operacionais.",
  },
  {
    icon: Unplug,
    tag: "Integrações",
    title: "Integrações frágeis",
    description: "ERP, gateway e Shopify desconectados. Pedidos perdidos, estoque desatualizado e retrabalho constante.",
  },
  {
    icon: AlertTriangle,
    tag: "Financeiro",
    title: "Split inexistente",
    description: "Pagamentos que não são divididos corretamente entre CNPJs, gerando conciliação manual e risco fiscal.",
  },
  {
    icon: BarChart3,
    tag: "Dados",
    title: "Dados espalhados",
    description: "Informações em 10 ferramentas diferentes. Sem visão unificada para tomar decisões com confiança.",
  },
];

type ProblemsSectionProps = { heading: React.ReactNode };

const ProblemsSection = ({ heading }: ProblemsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,0%,100%,0.02),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {heading}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -3 }}
              className="group relative rounded-2xl border-gradient bg-card p-8 md:p-10 transition-all duration-500"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center"
                  >
                    <problem.icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  <span className="inline-flex items-center rounded-full border border-border/60 bg-background/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground">
                    {problem.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
