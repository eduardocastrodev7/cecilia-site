import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import DifferentialsSection from "@/components/DifferentialsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProblemsSection from "@/components/ProblemsSection";
import ProcessSection from "@/components/ProcessSection";
import ProductsSection from "@/components/ProductsSection";
import PartnersSection from "@/components/PartnersSection";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cecília Digital | Infraestrutura para E-commerce",
  description:
    "Infraestrutura e operação para e-commerce Shopify. Multi CNPJ, divisão de pagamentos e visão do fluxo. Escale sem quebrar.",
  authors: [{ name: "Cecília Digital" }],
  openGraph: {
    title: "Cecília Digital | Infraestrutura para E-commerce",
    description:
    "Infraestrutura e operação para e-commerce Shopify. Multi CNPJ, divisão de pagamentos e visão do fluxo. Escale sem quebrar.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection
        headline={
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            Seu e-commerce
            <br />
            <span className="text-gradient">precisa de estrutura</span>
            <br />
            não de remendos.
          </h1>
        }
        subtitle={
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Criamos, migramos e estruturamos lojas Shopify com a infraestrutura
            que elas precisam para escalar sem quebrar. Multi-CNPJ. Split de
            pagamentos. Dados centralizados.
          </p>
        }
        actions={
          <>
            <Link
              href="/#contato"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
            >
              Agendar uma conversa
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#produtos"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Conhecer os produtos
            </Link>
          </>
        }
      />
      <AboutSection
        heading={
          <>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Quem somos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 md:mb-8">
              Não somos agência.
              <br />
              <span className="text-muted-foreground">Somos engenharia.</span>
            </h2>
          </>
        }
      />
      <ProblemsSection
        heading={
          <>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              O problema
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Seu e-commerce não precisa
              <br />
              <span className="text-muted-foreground">de mais ferramentas.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Precisa de estrutura. A maioria das operações complexas sofre com
              os mesmos problemas:
            </p>
          </>
        }
      />
      <ProductsSection
        heading={
          <>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Produtos
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Infraestrutura completa
              <br />
              <span className="text-muted-foreground">
                para operações complexas.
              </span>
            </h2>
          </>
        }
      />

      <DifferentialsSection
        heading={
          <>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Diferenciais
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Por que a Cecília
              <span className="text-gradient">.</span>
            </h2>
          </>
        }
      />
      <ProcessSection
        heading={
          <>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Processo
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Como funciona um projeto
              <br />
              <span className="text-muted-foreground">com a Cecília.</span>
            </h2>
          </>
        }
      />

      <PartnersSection />
      <CTASection
        heading={
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Pronto para escalar
            <br />
            <span className="text-gradient">sem quebrar?</span>
          </h2>
        }
      />
      <Footer />
    </main>
  );
}
