"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { Shield, Cpu, Layers, GitBranch, Zap, Eye } from "lucide-react";

const differentials = [
  {
    icon: Cpu,
    title: "Engenharia, não agência",
    description: "Não entregamos layouts. Entregamos sistemas. Cada projeto é arquitetado para durar.",
  },
  {
    icon: Layers,
    title: "Multi-CNPJ nativo",
    description: "Operações com múltiplos CNPJs, estoques e regras fiscais, tudo dentro da Shopify.",
  },
  {
    icon: GitBranch,
    title: "Integrações robustas",
    description: "ERP, gateway, logística e financeiro conectados com redundância e monitoramento.",
  },
  {
    icon: Shield,
    title: "Compliance fiscal",
    description: "Divisão de pagamentos e repasse por CNPJ com conciliação automática e rastreabilidade.",
  },
  {
    icon: Eye,
    title: "Visibilidade total",
    description: "Visão única do fluxo (pedido, pagamento e ERP) para decidir com clareza, sem achismo.",
  },
  {
    icon: Zap,
    title: "Escala sem quebrar",
    description: "Infraestrutura pensada para crescer. Sem gambiarras, sem limites artificiais.",
  },
];

type DifferentialsSectionProps = { heading: React.ReactNode };

const DifferentialsSection = ({ heading }: DifferentialsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="py-32 md:py-40 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0,0%,100%,0.03),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {heading}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {differentials.map((diff, i) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ backgroundColor: "hsl(0 0% 10%)" }}
              className="bg-card p-8 md:p-10 group transition-colors duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <diff.icon className="w-6 h-6 text-primary mb-6" />
              </motion.div>
              <h3 className="font-display text-lg font-semibold mb-3">{diff.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{diff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
