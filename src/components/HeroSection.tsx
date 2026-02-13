"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import HeroFlowAnimation from "@/components/HeroFlowAnimation";

type HeroSectionProps = {
  headline: React.ReactNode;
  subtitle: React.ReactNode;
  actions: React.ReactNode;
};

const HeroSection = ({ headline, subtitle, actions }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0,0%,100%,0.04),transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(0,0%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,50%) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Minimal light sweep behind the headline (no circles) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_55%)] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.045)_50%,transparent_100%)] opacity-30" />
      </div>

      {/* Abstract flow animation (no diagram) */}
      <div className="pointer-events-none absolute inset-0">
        <HeroFlowAnimation />
      </div>

      {/* Removed circular orbs to keep the hero minimal */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          >
          {headline}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          {subtitle}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {actions}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
