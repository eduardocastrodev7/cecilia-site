"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const stats = [
  { value: "100+", label: "Projetos entregues" },
  { value: "Multi", label: "CNPJ & Estoque" },
  { value: "Shopify", label: "Plus Partner" },
];

type AboutSectionProps = { heading: React.ReactNode };

const AboutSection = ({ heading }: AboutSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 md:py-40 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {heading}
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A Cecília Digital cria, migra e estrutura lojas em Shopify e Shopify Plus. Somos uma empresa de infraestrutura, engenharia e operação para e-commerce.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Enquanto agências montam vitrines, nós construímos os alicerces. Integramos ERPs, gateways, orquestramos multi-CNPJ, split de pedidos e centralizamos dados para que a operação rode sem atrito, mesmo quando a complexidade aumenta.
            </p>

            {/* Stats - responsive grid */}
            <div className="pt-4 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient block">
                    {stat.value}
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
