"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

import { PRODUCTS } from "@/lib/products";

type ProductsSectionProps = { heading: React.ReactNode };

const ProductsSection = ({ heading }: ProductsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="produtos" className="py-32 md:py-40 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {heading}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border-gradient bg-card overflow-hidden transition-all duration-500"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover glow */}
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="p-8 md:p-10 relative z-10 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-xl border border-border/60 bg-background/40 flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-foreground/80" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold leading-tight">
                  {product.name}
                </h3>
                <p className="mt-2 text-base font-medium text-primary">
                  {product.tagline}
                </p>

                <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-7 flex items-center justify-center">
                  <Link
                    href={`/${product.slug}`}
                    className="text-base font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group/btn"
                  >
                    Ver detalhes
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductsSection;
