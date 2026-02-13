"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import ProductFlowDiagram from "@/components/ProductFlowDiagram";
import SpotlightCard from "@/components/SpotlightCard";
import { getProductBySlug, type ProductSlug } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  slug: ProductSlug;
};

type Callout = {
  id: string;
  title: string;
  description: string;
};

type Pillar = {
  title: string;
  description: string;
};

type PageConfig = {
  headline: string;
  subheadline: string;
  proof: string[];
  primaryCtaLabel: string;
  whatsappMessage: string;
  secondaryCtaLabel: string;
  callouts: Callout[];
  whenTitle: string;
  whenSubtitle: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: Pillar[];
  authorityTitle: string;
  authorityLeftTitle: string;
  authorityLeft: string[];
  authorityRightTitle: string;
  authorityRight: string[];
  startTitle: string;
  startSteps: { title: string; description: string }[];
  finalTitle: string;
  finalSubtitle: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export default function ProductPageClient({ slug }: Props) {
  const product = getProductBySlug(slug);
  if (!product) return null;

  const reduceMotion = useReducedMotion();
  const cfg = useMemo(() => getPageConfig(slug), [slug]);
  const callouts = cfg.callouts;
  const [selectedId, setSelectedId] = useState<string | null>(callouts?.[0]?.id ?? null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const activeId = hoverId ?? selectedId;

  const activeCallout = useMemo(() => {
    const key = activeId ?? callouts?.[0]?.id;
    return callouts.find((c) => c.id === key) ?? callouts[0];
  }, [activeId, callouts]);

  const whatsappHref = useMemo(() => {
    const base = "https://wa.me/5516991054211";
    const text = encodeURIComponent(cfg.whatsappMessage);
    return `${base}?text=${text}`;
  }, [cfg.whatsappMessage]);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(0,0%,100%,0.06),transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0,0%,60%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,60%) 1px, transparent 1px)",
              backgroundSize: slug === "pay" ? "88px 88px" : slug === "core" ? "92px 92px" : "96px 96px",
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto px-6 relative z-10 text-center"
        >
          <motion.div variants={sectionVariants} className="flex items-center justify-center mb-10">
            <Link
              href="/#produtos"
              className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para produtos
            </Link>
          </motion.div>

          <motion.div variants={sectionVariants} className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-semibold text-foreground/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/60" />
              {product.name}
            </span>
          </motion.div>

          <motion.h1
            variants={sectionVariants}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight"
          >
            {cfg.headline}
            <span className="text-gradient">.</span>
          </motion.h1>

          <motion.p
            variants={sectionVariants}
            className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {cfg.subheadline}
          </motion.p>

          <motion.div
            variants={sectionVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
            >
              {cfg.primaryCtaLabel}
              <ArrowUpRight className="w-5 h-5" />
            </Link>

            <Link
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary transition-colors"
            >
              {cfg.secondaryCtaLabel}
            </Link>
          </motion.div>

          <motion.div variants={sectionVariants} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {cfg.proof.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-border/60 bg-background/35 px-4 py-2 text-sm font-semibold text-foreground/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={sectionVariants} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="#como-funciona"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Como funciona
              </a>
              <span className="text-muted-foreground/50">•</span>
              <a
                href="#quando"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Quando faz sentido
              </a>
              <span className="text-muted-foreground/50">•</span>
              <a
                href="#diferenciais"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Diferenciais
              </a>
              <span className="text-muted-foreground/50">•</span>
              <a
                href="#perguntas"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Perguntas
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* COMO FUNCIONA */}
      <motion.section
        id="como-funciona"
        className="py-16 md:py-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,0%,100%,0.02),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Como funciona na prática
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Um desenho do que acontece no fluxo. Clique nas etapas para destacar no canvas.
            </p>
          </div>

          <SpotlightCard
            className="rounded-2xl border-gradient bg-card p-4 md:p-6"
            size={720}
            intensity={0.12}
          >
            <ProductFlowDiagram slug={slug} activeId={activeId ?? undefined} />
          </SpotlightCard>

          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {callouts.map((c) => {
                const selected = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onMouseEnter={() => setHoverId(c.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onFocus={() => setHoverId(c.id)}
                    onBlur={() => setHoverId(null)}
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                      selected
                        ? "border-foreground/20 bg-secondary text-foreground"
                        : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {c.title}
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <p className="text-center text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {activeCallout?.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Ver isso na sua operação
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* QUANDO */}
      <motion.section
        id="quando"
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {cfg.whenTitle}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {cfg.whenSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {product.solves.map((s, idx) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <SpotlightCard className="rounded-2xl border-gradient bg-card p-6 md:p-7 text-center" size={520} intensity={0.09}>
                  <p className="text-base text-foreground/80 leading-relaxed">{s}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* DIFERENCIAIS */}
      <motion.section
        id="diferenciais"
        className="py-16 md:py-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0,0%,100%,0.03),transparent_65%)]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {cfg.pillarsTitle}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {cfg.pillarsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {cfg.pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <SpotlightCard className="rounded-2xl border-gradient bg-card p-7 md:p-8" size={640} intensity={0.10}>
                  <div className="text-center">
                    <div className="font-display text-base font-semibold text-foreground">
                      {p.title}
                    </div>
                    <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* AUTORIDADE */}
      <motion.section
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {cfg.authorityTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <SpotlightCard className="rounded-2xl border-gradient bg-card p-7 md:p-8" size={680} intensity={0.10}>
              <div className="text-center">
                <div className="font-display text-base font-semibold text-foreground">
                  {cfg.authorityLeftTitle}
                </div>
                <div className="mt-5 space-y-3">
                  {cfg.authorityLeft.map((t) => (
                    <div
                      key={t}
                      className="rounded-xl border border-border/60 bg-background/35 px-4 py-3 text-base text-foreground/80"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl border-gradient bg-card p-7 md:p-8" size={680} intensity={0.10}>
              <div className="text-center">
                <div className="font-display text-base font-semibold text-foreground">
                  {cfg.authorityRightTitle}
                </div>
                <div className="mt-5 space-y-3">
                  {cfg.authorityRight.map((t) => (
                    <div
                      key={t}
                      className="rounded-xl border border-border/60 bg-background/35 px-4 py-3 text-base text-foreground/80"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </motion.section>

      {/* COMO COMEÇAMOS */}
      <motion.section
        className="py-16 md:py-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(0,0%,100%,0.03),transparent_65%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {cfg.startTitle}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Sem complicar. A gente começa pelo que dá previsibilidade e reduz retrabalho.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {cfg.startSteps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <SpotlightCard className="rounded-2xl border-gradient bg-card p-7 text-center" size={560} intensity={0.09}>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl border border-border/60 bg-background/40 text-base font-extrabold text-foreground/80">
                    {idx + 1}
                  </div>
                  <div className="mt-5 font-display text-base font-semibold text-foreground">
                    {s.title}
                  </div>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
            >
              {cfg.primaryCtaLabel}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* PERGUNTAS */}
      <motion.section
        id="perguntas"
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Perguntas frequentes
            </h2>
            <p className="text-base text-muted-foreground mt-4 leading-relaxed">
              Respostas diretas para alinhar cenário, escopo e ativação.
            </p>
          </div>

          <div className="space-y-3">
            {product.faq.map((f, idx) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.45, delay: idx * 0.02 }}
              >
                <details className="group rounded-2xl border-gradient bg-card p-6">
                  <summary className="cursor-pointer list-none font-display font-semibold text-foreground flex items-center justify-between">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-base text-muted-foreground leading-relaxed mt-3">{f.a}</p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        className="pb-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <SpotlightCard className="rounded-2xl border-gradient bg-card p-10 md:p-12" size={860} intensity={0.12}>
            <div className="text-center">
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                {cfg.finalTitle}
              </h3>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {cfg.finalSubtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.2)]"
                >
                  {cfg.primaryCtaLabel}
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#contato"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Agendar conversa
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </motion.section>
    </>
  );
}

function getPageConfig(slug: ProductSlug): PageConfig {
  switch (slug) {
    case "commerce":
      return {
        headline: "Uma loja Shopify pronta para vender",
        subheadline:
          "O Cecília Commerce constrói ou migra sua loja para Shopify com UX, UI, integrações e Go Live. Você sai com uma base confiável para operar e escalar com a suíte Cecília.",
        proof: [
          "Diagnóstico antes do build",
          "SEO e rastreio validados",
          "Go Live com checklist dentro do produto",
        ],
        primaryCtaLabel: "Agendar diagnóstico",
        whatsappMessage:
          "Quero entender o Cecília Commerce. Minha intenção é construir ou migrar para Shopify e colocar a loja no ar com validação. Pode me orientar no diagnóstico e no plano?",
        secondaryCtaLabel: "Ver o fluxo",
        callouts: [
          {
            id: "commerce:diagnostico",
            title: "Diagnóstico",
            description:
              "Você vê o que precisa estar pronto para operar. Catálogo, integrações, regras, SEO, rastreio e riscos de migração.",
          },
          {
            id: "commerce:cecilia",
            title: "Construção e Migração",
            description:
              "O Commerce absorve o trabalho de tema, setup, integrações e validações. O checklist já faz parte do produto.",
          },
          {
            id: "commerce:cecilia:2",
            title: "SEO e Rastreio",
            description:
              "Antes de colocar no ar, você valida indexação, eventos, pixels e redirecionamentos para não perder tráfego nem mensuração.",
          },
          {
            id: "commerce:loja",
            title: "Loja Online",
            description:
              "A loja entra no ar com base pronta para operar, vender e integrar Core, Pay e Vision.",
          },
        ],
        whenTitle: "Quando o Commerce faz sentido",
        whenSubtitle:
          "Se você quer entrar na Shopify com previsibilidade, sem improviso e sem quebrar tráfego, dados e operação.",
        pillarsTitle: "O que deixa o Commerce superior",
        pillarsSubtitle:
          "O objetivo é simples: lançar com clareza. Menos surpresa e mais controle do que acontece no dia 1.",
        pillars: [
          {
            title: "Go Live com validação",
            description:
              "Pagamentos, frete, impostos, SEO e rastreio são validados antes do lançamento. Sem depender de sorte.",
          },
          {
            title: "UX e performance",
            description:
              "Tema pensado para conversão e velocidade. A loja nasce leve para não virar um projeto de correção eterna.",
          },
          {
            title: "Integrações previsíveis",
            description:
              "Conexões com ERP e apps essenciais são desenhadas com critérios e testes. Menos fragilidade no pós lançamento.",
          },
          {
            title: "Base pronta para a suíte Cecília",
            description:
              "A estrutura do Commerce já considera Core, Pay e Vision. Você não precisa refazer o que deveria existir desde o início.",
          },
        ],
        authorityTitle: "O que você passa a controlar",
        authorityLeftTitle: "Sinais de maturidade",
        authorityLeft: [
          "Checklist de Go Live dentro do produto",
          "Rastreio e SEO conferidos antes de abrir tráfego",
          "Integrações testadas com cenários reais",
        ],
        authorityRightTitle: "Como avaliamos sucesso",
        authorityRight: [
          "Conversão e velocidade no tema",
          "Integridade do catálogo e do pedido",
          "Estabilidade do checkout e dos pagamentos",
        ],
        startTitle: "Como começamos",
        startSteps: [
          {
            title: "Diagnóstico",
            description:
              "Mapeamos operação, integrações e riscos. Você sabe o que precisa estar pronto para lançar sem perder controle.",
          },
          {
            title: "Construção",
            description:
              "Tema, setup e integrações entram em um fluxo de validação. Você enxerga o que foi feito e o que falta.",
          },
          {
            title: "Go Live",
            description:
              "Validações finais, publicação e acompanhamento pós lançamento para estabilizar o que depende de uso real.",
          },
        ],
        finalTitle: "Coloque sua loja no ar com controle",
        finalSubtitle:
          "Se você quer construir ou migrar para Shopify sem improviso, a conversa começa pelo diagnóstico. A gente desenha o plano e executa com validação.",
      };

    case "core":
      return {
        headline: "Pedidos com regras claras e rastreio",
        subheadline:
          "O Cecília Core recebe o pedido da Shopify, aplica regras por CNPJ, estoque e canal e envia para o ERP correto. Você enxerga cada decisão, cada estado e onde algo travou.",
        proof: [
          "Motor de regras auditável",
          "Confirmação de destino no ERP",
          "Trilha do pedido por evento",
        ],
        primaryCtaLabel: "Mapear regras Multi CNPJ",
        whatsappMessage:
          "Quero entender o Cecília Core. Minha operação é Multi CNPJ e preciso dividir pedidos por regras e enviar para o ERP correto com rastreio. Pode me ajudar a mapear regras e ativação?",
        secondaryCtaLabel: "Ver o fluxo",
        callouts: [
          {
            id: "core:shopify",
            title: "Entrada",
            description:
              "O pedido entra pela Shopify e vira um evento rastreável. Nada fica solto em planilha ou chat.",
          },
          {
            id: "core:core",
            title: "Motor de regras",
            description:
              "CNPJ, estoque e canal definem destino. A regra fica explícita e registrada. Sem improviso na operação.",
          },
          {
            id: "core:erp",
            title: "ERP",
            description:
              "O Core envia para o ERP correto e acompanha confirmação, faturamento e status. Você sabe se chegou e quando.",
          },
          {
            id: "core:visao",
            title: "Trilha do pedido",
            description:
              "Você vê linha do tempo, alertas e estados por etapa. O time trabalha com previsibilidade.",
          },
        ],
        whenTitle: "Quando o Core faz sentido",
        whenSubtitle:
          "Quando a operação cresce e a divisão por CNPJ vira um risco. Você precisa de regras, rastreio e previsibilidade entre Shopify e ERP.",
        pillarsTitle: "Por que o Core parece mais avançado",
        pillarsSubtitle:
          "Não é só roteamento. É governança do fluxo, com auditoria e decisões explícitas.",
        pillars: [
          {
            title: "Regra explícita",
            description:
              "Você consegue explicar o destino de cada pedido. A regra fica documentada, testada e rastreável.",
          },
          {
            title: "Confirmação do ERP",
            description:
              "O fluxo não termina no envio. O Core acompanha confirmação, status e retorno, reduzindo falhas silenciosas.",
          },
          {
            title: "Trilha por evento",
            description:
              "Cada etapa deixa um rastro. Você vê onde travou e o que precisa de ação humana.",
          },
          {
            title: "Operação previsível",
            description:
              "Quando existe exceção, ela vira um caminho controlado. O time sai do modo incêndio e ganha rotina.",
          },
        ],
        authorityTitle: "O que você passa a enxergar",
        authorityLeftTitle: "O que vira claro",
        authorityLeft: [
          "Para qual ERP o pedido foi encaminhado",
          "Qual regra decidiu o CNPJ e o destino",
          "Qual etapa travou e desde quando",
        ],
        authorityRightTitle: "O que isso reduz",
        authorityRight: [
          "Correção manual de expedição e faturamento",
          "Pedido perdido entre sistemas",
          "Discussão interna sem evidência do fluxo",
        ],
        startTitle: "Como começamos",
        startSteps: [
          {
            title: "Diagnóstico de regras",
            description:
              "Mapeamos CNPJ, estoque, canal, exceções e como o ERP espera receber os dados.",
          },
          {
            title: "Ativação por etapas",
            description:
              "Começamos com um subconjunto de cenários para validar em produção sem interromper a operação.",
          },
          {
            title: "Rastreio e alertas",
            description:
              "Definimos estados, alertas e visibilidade para operação e atendimento. O time passa a enxergar o caminho.",
          },
        ],
        finalTitle: "Transforme Multi CNPJ em regra",
        finalSubtitle:
          "Se você precisa dividir pedidos por CNPJ e enviar para o ERP correto com rastreio, o ponto de partida é mapear regras e exceções. A gente conduz isso com clareza.",
      };

    case "pay":
      return {
        headline: "Split financeiro por CNPJ no Asaas",
        subheadline:
          "O Cecília Pay recebe dados da Shopify, identifica para qual CNPJ cada valor deve ir e executa o split automático no Asaas. O time financeiro enxerga status e concilia com rastreabilidade.",
        proof: [
          "Split automático no gateway",
          "Alocação por regra",
          "Conciliação auditável",
        ],
        primaryCtaLabel: "Entender meu split no Asaas",
        whatsappMessage:
          "Quero entender o Cecília Pay. Uso Asaas e preciso dividir pagamentos por CNPJ com rastreabilidade e conciliação. Pode me orientar no desenho do split e nos cenários de taxa e parcela?",
        secondaryCtaLabel: "Ver o fluxo",
        callouts: [
          {
            id: "pay:shopify",
            title: "Shopify",
            description:
              "O Pay recebe do pedido o que precisa para alocar valores por item e por regra.",
          },
          {
            id: "pay:pay",
            title: "Alocação",
            description:
              "Antes de autorizar, o Pay define para qual CNPJ cada parte do valor deve ir, já considerando taxas e parcelas.",
          },
          {
            id: "pay:asaas",
            title: "Asaas",
            description:
              "O split acontece dentro do gateway. Cada repasse nasce certo e com status rastreável.",
          },
          {
            id: "pay:cnpj1",
            title: "Repasse",
            description:
              "Cada CNPJ recebe o valor correto. O time financeiro concilia por período e por regra.",
          },
        ],
        whenTitle: "Quando o Pay faz sentido",
        whenSubtitle:
          "Quando o split é manual, improvisado ou vira dor na conciliação. O objetivo é dividir certo e enxergar o status de cada repasse.",
        pillarsTitle: "O que faz o Pay parecer produto",
        pillarsSubtitle:
          "Não é planilha. É um fluxo financeiro com regra, status e rastreabilidade.",
        pillars: [
          {
            title: "Split no Asaas",
            description:
              "A divisão acontece no gateway. Você não depende de repasse manual nem de acerto depois.",
          },
          {
            title: "Validação antes",
            description:
              "O Pay valida regras antes de autorizar. Isso reduz inconsistência e retrabalho no financeiro.",
          },
          {
            title: "Status e trilha",
            description:
              "Você enxerga a transação, o split e o repasse. Quando existe falha, existe evidência do que aconteceu.",
          },
          {
            title: "Cenários reais",
            description:
              "Taxas, parcelas, estorno e chargeback entram no desenho desde o diagnóstico para não quebrar a conciliação.",
          },
        ],
        authorityTitle: "O que o financeiro ganha",
        authorityLeftTitle: "O que fica rastreável",
        authorityLeft: [
          "Regra que definiu a alocação por CNPJ",
          "Status por transação e por repasse",
          "Conciliação por período sem retrabalho",
        ],
        authorityRightTitle: "O que deixa de acontecer",
        authorityRight: [
          "Repasse errado corrigido manualmente",
          "Fechamento com divergência",
          "Discussão sobre para onde foi o valor",
        ],
        startTitle: "Como começamos",
        startSteps: [
          {
            title: "Diagnóstico do split",
            description:
              "Mapeamos regras, CNPJs, taxas, parcelas e cenários como estorno. O desenho nasce completo.",
          },
          {
            title: "Implementação e testes",
            description:
              "Ativamos com testes controlados e validação de conciliação antes de liberar todo o volume.",
          },
          {
            title: "Rotina do financeiro",
            description:
              "Definimos relatórios e leitura do status. O time sabe exatamente onde olhar.",
          },
        ],
        finalTitle: "Faça split sem dor de conciliação",
        finalSubtitle:
          "Se você precisa dividir pagamentos por CNPJ no Asaas e ter rastreio de repasses, a conversa começa pelo desenho do split e pelos cenários reais.",
      };

    case "vision":
      return {
        headline: "Uma visão única da operação",
        subheadline:
          "O Cecília Vision centraliza informações de Shopify, ERP, atendimento, planilhas e outros sistemas. Depois trata, organiza e entrega relatórios, painéis e insights com IA.",
        proof: [
          "SSOT para e commerce",
          "Tratamento e padronização",
          "Painéis e alertas por área",
        ],
        primaryCtaLabel: "Desenhar meu SSOT",
        whatsappMessage:
          "Quero entender o Cecília Vision. Preciso centralizar dados de Shopify, ERP, atendimento e planilhas para ter uma visão única e relatórios consistentes. Pode me orientar no desenho do SSOT e nos painéis?",
        secondaryCtaLabel: "Ver o fluxo",
        callouts: [
          {
            id: "vision:fontes",
            title: "Fontes",
            description:
              "Shopify, ERP, atendimento, planilhas e sistemas internos entram no mesmo pipeline.",
          },
          {
            id: "vision:vision",
            title: "Tratamento",
            description:
              "O Vision padroniza e organiza para que a mesma pergunta gere a mesma resposta para todo mundo.",
          },
          {
            id: "vision:paineis",
            title: "Painéis",
            description:
              "Dashboards por área com acompanhamento contínuo. Operação, atendimento e financeiro enxergam o mesmo fluxo.",
          },
          {
            id: "vision:insights",
            title: "Insights",
            description:
              "IA ajuda a destacar padrões e anomalias. O ponto central é estrutura consistente para insight ser confiável.",
          },
        ],
        whenTitle: "Quando o Vision faz sentido",
        whenSubtitle:
          "Quando os dados existem, mas não conversam. O Vision cria consistência e contexto para o time decidir sem ficar caçando informação.",
        pillarsTitle: "Por que o Vision destrava rápido",
        pillarsSubtitle:
          "Você deixa de viver de exportação e planilha. A operação passa a ter uma leitura única.",
        pillars: [
          {
            title: "SSOT",
            description:
              "Uma base única para números e eventos. O mesmo pedido tem o mesmo contexto para todo time.",
          },
          {
            title: "Tratamento",
            description:
              "Normalização e regras de consistência. Divergência deixa de ser um debate e vira um dado rastreável.",
          },
          {
            title: "Alertas",
            description:
              "Sinais quando algo foge do padrão. Antes de virar um incêndio no atendimento ou na operação.",
          },
          {
            title: "Insights com IA",
            description:
              "IA acelera perguntas do dia a dia e destaca anomalias. Sempre em cima de estrutura consistente.",
          },
        ],
        authorityTitle: "O que muda para o time",
        authorityLeftTitle: "O que fica simples",
        authorityLeft: [
          "Relatório consistente para o mesmo número",
          "Linha do tempo por pedido e por ocorrência",
          "Contexto único para operação e atendimento",
        ],
        authorityRightTitle: "O que isso reduz",
        authorityRight: [
          "Planilha paralela para explicar divergência",
          "Tempo perdido caçando dados",
          "Decisão baseada em recorte incompleto",
        ],
        startTitle: "Como começamos",
        startSteps: [
          {
            title: "Fontes críticas",
            description:
              "Listamos as fontes e as perguntas que mais geram retrabalho. Começamos pelo que muda a rotina.",
          },
          {
            title: "Tratamento e consistência",
            description:
              "Definimos regras de padronização e o que é verdade para o negócio. O SSOT nasce confiável.",
          },
          {
            title: "Painéis e alertas",
            description:
              "Entregamos dashboards e alertas por área, com leitura simples para o time tomar decisão.",
          },
        ],
        finalTitle: "Pare de caçar informação",
        finalSubtitle:
          "Se sua operação tem dados em vários sistemas e falta uma visão única, o ponto de partida é mapear fontes e perguntas críticas. A gente transforma isso em rotina clara.",
      };
  }
}
