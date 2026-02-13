import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PlatformModulesSection from "@/components/PlatformModulesSection";
import ProcessSection from "@/components/ProcessSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Plataforma Cecília | Estrutura para e-commerce",
  description:
    "Um ecossistema para estruturar operações de e-commerce. Construção e migração Shopify, roteamento Multi CNPJ, split financeiro no Asaas e visão única da operação.",
  openGraph: {
    title: "Plataforma Cecília | Estrutura para e-commerce",
    description:
      "Um ecossistema para estruturar operações de e-commerce. Construção e migração Shopify, roteamento Multi CNPJ, split financeiro no Asaas e visão única da operação.",
    type: "website",
  },
};

export default function PlataformaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <HeroSection
        headline={
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            Uma plataforma para
            <br />
            <span className="text-gradient">organizar operações</span>
            <br />
            de e-commerce.
          </h1>
        }
        subtitle={
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Quatro módulos, uma linguagem de operação. Você sai do improviso e entra em um fluxo com regras claras, rastreio e previsibilidade entre Shopify, ERP e financeiro.
          </p>
        }
        actions={
          <>
            <Link
              href="#modulos"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
            >
              Ver os módulos
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="https://wa.me/5516991054211"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Falar com a Cecília
            </Link>
          </>
        }
      />
      <PlatformModulesSection id="modulos" />

      <ProcessSection
        heading={
          <>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Processo
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Como a plataforma entra
              <br />
              <span className="text-muted-foreground">na sua operação.</span>
            </h2>
          </>
        }
      />

      <PartnersSection />

      <CTASection
        heading={
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Quer um mapa claro
            <br />
            <span className="text-gradient">da sua operação</span>
            <br />
            em 15 minutos.
          </h2>
        }
      />

      <Footer />
    </main>
  );
}
