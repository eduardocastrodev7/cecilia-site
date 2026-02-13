"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entendemos a operação, os pontos de dor e os objetivos. Mapeamos ERP, meios de pagamento, regras fiscais e o fluxo do pedido.",
  },
  {
    number: "02",
    title: "Arquitetura",
    description: "Desenhamos a infraestrutura ideal: integrações, divisão por CNPJ, roteamento de estoque e estados do pedido.",
  },
  {
    number: "03",
    title: "Implementação",
    description: "Implementamos na Shopify com os produtos Cecília. Setup completo, testes e validação operacional.",
  },
  {
    number: "04",
    title: "Operação",
    description: "Acompanhamos o lançamento, monitoramos os fluxos e evoluímos a infraestrutura conforme a operação escala.",
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex items-start gap-8 md:gap-16 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Number dot */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-[0_0_20px_4px_hsl(var(--primary)/0.3)]" />
      </motion.div>

      {/* Content */}
      <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group"
        >
          <span className="font-display text-6xl md:text-8xl font-bold text-secondary/80 group-hover:text-primary/20 transition-colors duration-500">
            {step.number}
          </span>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-display text-2xl md:text-3xl font-bold mt-2 mb-3"
          >
            {step.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-muted-foreground leading-relaxed max-w-md inline-block"
          >
            {step.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

type ProcessSectionProps = { heading: React.ReactNode };

const ProcessSection = ({ heading }: ProcessSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section id="processo" className="py-32 md:py-40 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {heading}
        </motion.div>

        <div className="relative">
          {/* Scroll-driven vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/30 md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/20"
            />
          </div>

          <div className="space-y-20 md:space-y-32">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
