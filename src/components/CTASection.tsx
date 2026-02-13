"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

type CTASectionProps = { heading: React.ReactNode };

const CTASection = ({ heading }: CTASectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="py-32 md:py-40 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(0,0%,100%,0.04),transparent_60%)]" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {heading}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12">
            Vamos conversar sobre a sua operação. Sem pitch genérico, queremos entender seu cenário e mostrar como a Cecília pode resolver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://wa.me/5516991054211"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </Link>
            <Link
              href="mailto:mkt@cecilia.digital"
              className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <Mail className="w-5 h-5" />
              Enviar e-mail
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
