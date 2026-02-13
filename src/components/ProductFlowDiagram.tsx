"use client";

import React from "react";

import { cn } from "@/lib/utils";
import type { ProductSlug } from "@/lib/products";

type Props = {
  slug: ProductSlug;
  className?: string;
  /**
   * ID do estado ativo para realçar partes do fluxo.
   * Ex.: "commerce:diagnostico", "pay:asaas", "vision:tratamento".
   */
  activeId?: string | null;
};

/**
 * Fluxos com linguagem visual premium.
 * Objetivo: parecer uma plataforma em ação, não um fluxograma de slide.
 * Implementação: HTML e CSS com animações leves.
 */
export default function ProductFlowDiagram({ slug, className, activeId }: Props) {
  return (
    <div className={cn("w-full", className)}>
      {slug === "commerce" ? <CommerceFlow activeId={activeId} /> : null}
      {slug === "core" ? <CoreFlow activeId={activeId} /> : null}
      {slug === "pay" ? <PayFlow activeId={activeId} /> : null}
      {slug === "vision" ? <VisionFlow activeId={activeId} /> : null}
    </div>
  );
}

function isActive(activeId: string | null | undefined, id: string) {
  if (!activeId) return false;
  return activeId === id || activeId.startsWith(`${id}:`);
}

function Canvas({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "commerce" | "core" | "pay" | "vision";
}) {
  const pattern =
    variant === "commerce"
      ? "linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      : variant === "core"
        ? "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
        : variant === "pay"
          ? "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
          : "linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)";

  const patternSize =
    variant === "pay" ? "72px 72px" : variant === "commerce" ? "80px 80px" : "84px 84px";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.10),transparent_62%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: pattern, backgroundSize: patternSize }}
      />
      <div className="relative z-10 p-5 md:p-8">{children}</div>
    </div>
  );
}

function NodeCard({
  id,
  activeId,
  badge,
  title,
  subtitle,
  emphasis,
  className,
  children,
}: {
  id: string;
  activeId?: string | null;
  badge?: string;
  title: string;
  subtitle: string;
  emphasis?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const active = isActive(activeId, id);

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300",
        "px-5 py-5 md:px-6 md:py-6",
        emphasis ? "shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_30px_90px_-60px_rgba(255,255,255,0.28)]" : "",
        active ? "border-white/20 bg-white/[0.05]" : "",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {badge ? (
          <div
            className={cn(
              "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl",
              "border border-white/10 bg-white/[0.03]",
              active ? "text-foreground" : "text-foreground/80"
            )}
          >
            <span className="text-sm font-extrabold">{badge}</span>
          </div>
        ) : null}

        <div className="min-w-0">
          <div className="font-display text-base font-semibold leading-tight text-foreground">
            {title}
          </div>
          <div className="mt-1 text-sm text-foreground/70 leading-relaxed">{subtitle}</div>
        </div>
      </div>

      {children ? <div className="mt-4">{children}</div> : null}

      {emphasis ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />
      ) : null}
    </div>
  );
}

function FlowLineX({
  direction,
  active,
  className,
}: {
  direction: "right" | "left";
  active?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-20 md:w-28 flex items-center", className)}>
      <div className={cn("h-1 w-full", active ? "flow-line" : "flow-line flow-soft")}>
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            direction === "right" ? "right-[-2px]" : "left-[-2px]",
            "h-0 w-0 border-y-[6px] border-y-transparent",
            direction === "right" ? "border-l-[8px] border-l-white/40" : "border-r-[8px] border-r-white/40"
          )}
        />
      </div>
    </div>
  );
}

function FlowLineY({
  direction,
  active,
  className,
}: {
  direction: "down" | "up";
  active?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("h-10 md:h-14 flex items-center justify-center", className)}>
      <div className={cn("relative h-full w-1", active ? "flow-line-y" : "flow-line-y flow-soft")}>
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2",
            direction === "down" ? "bottom-[-2px]" : "top-[-2px]",
            "h-0 w-0 border-x-[6px] border-x-transparent",
            direction === "down" ? "border-t-[8px] border-t-white/40" : "border-b-[8px] border-b-white/40"
          )}
        />
      </div>
    </div>
  );
}

function DuplexLineX({
  active,
  className,
}: {
  active?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-20 md:w-28", className)}>
      <div className="flex flex-col gap-1.5">
        <FlowLineX direction="right" active={active} className="w-full md:w-full" />
        <FlowLineX direction="left" active={active} className="w-full md:w-full opacity-70" />
      </div>
    </div>
  );
}

function MiniList({
  items,
  activeId,
  prefix,
}: {
  items: string[];
  activeId?: string | null;
  prefix: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((t, i) => {
        const rowId = `${prefix}:${i}`;
        const rowActive = isActive(activeId, rowId);
        return (
          <div
            key={rowId}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5",
              rowActive ? "border-white/20 bg-white/[0.03]" : ""
            )}
          >
            <span
              className={cn(
                "inline-block h-3.5 w-1.5 rounded-full",
                rowActive ? "bg-foreground/70" : "bg-foreground/45"
              )}
            />
            <span className="text-sm font-semibold text-foreground/80">{t}</span>
          </div>
        );
      })}
    </div>
  );
}

function TokenRow({
  tokens,
  size = "md",
  className,
}: {
  tokens: string[];
  size?: "sm" | "md";
  className?: string;
}) {
  const pill =
    size === "sm"
      ? "px-2.5 py-1 text-xs"
      : "px-3 py-1 text-sm";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tokens.map((t) => (
        <span
          key={t}
          className={cn(
            "inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] font-semibold text-foreground/80",
            pill
          )}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function MeterBars({
  rows,
  activeKey,
}: {
  rows: { label: string; value: number; id: string }[];
  activeKey?: string | null;
}) {
  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const rowActive = isActive(activeKey, r.id);
        return (
          <div key={r.id} className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-foreground/75">{r.label}</span>
              <span className="text-sm font-semibold text-muted-foreground">{r.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden border border-white/10">
              <div
                className={cn(
                  "h-full rounded-full",
                  "bg-gradient-to-r from-white/35 via-white/70 to-white/35",
                  "shimmer",
                  rowActive ? "opacity-100" : "opacity-80"
                )}
                style={{ width: `${r.value}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------- Commerce -------------------------------- */

function CommerceFlow({ activeId }: { activeId?: string | null }) {
  return (
    <>
      <div className="hidden md:block">
        <Canvas variant="commerce">
          <div className="grid grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center gap-6">
            <NodeCard
              id="commerce:diagnostico"
              activeId={activeId}
              badge="1"
              title="Diagnóstico"
              subtitle="Mapa da operação, riscos e requisitos"
            />

            <FlowLineX direction="right" active={isActive(activeId, "commerce:diagnostico") || isActive(activeId, "commerce:cecilia")} />

            <NodeCard
              id="commerce:cecilia"
              activeId={activeId}
              badge="2"
              title="Cecília Commerce"
              subtitle="Construção, migração e Go Live"
              emphasis
              className="float-slow"
            >
              <MiniList
                activeId={activeId}
                prefix="commerce:cecilia"
                items={["UX e UI", "Integrações", "SEO e Rastreio", "Go Live"]}
              />
            </NodeCard>

            <div className="pt-6">
                <FlowLineX direction="right" active={isActive(activeId, "commerce:cecilia") || isActive(activeId, "commerce:loja")} />
              </div>

            <NodeCard
              id="commerce:loja"
              activeId={activeId}
              badge="3"
              title="Loja Online"
              subtitle="Ativa, validada e vendendo"
            />
          </div>
        </Canvas>
      </div>

      <div className="md:hidden">
        <Canvas variant="commerce">
          <div className="space-y-4">
            <NodeCard
              id="commerce:diagnostico"
              activeId={activeId}
              badge="1"
              title="Diagnóstico"
              subtitle="Mapa da operação, riscos e requisitos"
            />
            <FlowLineY direction="down" active={isActive(activeId, "commerce:diagnostico") || isActive(activeId, "commerce:cecilia")} />
            <NodeCard
              id="commerce:cecilia"
              activeId={activeId}
              badge="2"
              title="Cecília Commerce"
              subtitle="Construção, migração e Go Live"
              emphasis
            >
              <MiniList
                activeId={activeId}
                prefix="commerce:cecilia"
                items={["UX e UI", "Integrações", "SEO e Rastreio", "Go Live"]}
              />
            </NodeCard>
            <FlowLineY direction="down" active={isActive(activeId, "commerce:cecilia") || isActive(activeId, "commerce:loja")} />
            <NodeCard
              id="commerce:loja"
              activeId={activeId}
              badge="3"
              title="Loja Online"
              subtitle="Ativa, validada e vendendo"
            />
          </div>
        </Canvas>
      </div>
    </>
  );
}

/* -------------------------------- Core -------------------------------- */

function CoreFlow({ activeId }: { activeId?: string | null }) {
  return (
    <>
      <div className="hidden md:block">
        <Canvas variant="core">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-[minmax(0,1fr)_96px_minmax(0,1.35fr)_96px_minmax(0,1fr)] items-start gap-5">
              <NodeCard
                id="core:shopify"
                activeId={activeId}
                badge="1"
                title="Shopify"
                subtitle="Pedido e atualizações do fluxo"
              />

              <div className="pt-7">
                <DuplexLineX
                  active={isActive(activeId, "core:shopify") || isActive(activeId, "core:core")}
                  className="w-full md:w-full"
                />
</div>

              <div>
                <NodeCard
                  id="core:core"
                  activeId={activeId}
                  badge="2"
                  title="Cecília Core"
                  subtitle="Motor de regras com auditoria"
                  emphasis
                >
                  <div>
                    <TokenRow tokens={["Canal", "CNPJ", "Estoque"]} size="sm" />
                    <div className="mt-4">
                      <MiniList
                    activeId={activeId}
                    prefix="core:core"
                    items={["Regra aplicada", "Destino definido", "Evento registrado"]}
                  />
                    </div>
                  </div>
                </NodeCard>

                <div className="mt-5">
                  <FlowLineY
                    direction="down"
                    active={isActive(activeId, "core:visao") || isActive(activeId, "core:core")}
                  />
                </div>

                <NodeCard
                  id="core:visao"
                  activeId={activeId}
                  title="Trilha do Pedido"
                  subtitle="Linha do tempo e alertas por etapa"
                  className="mt-4"
                >
                  <MiniList
                    activeId={activeId}
                    prefix="core:visao"
                    items={["Recebido", "Encaminhado", "Confirmado"]}
                  />
                </NodeCard>
              </div>

              <div className="pt-7">
                <DuplexLineX
                  active={isActive(activeId, "core:erp") || isActive(activeId, "core:core")}
                  className="w-full md:w-full"
                />
</div>

              <NodeCard
                id="core:erp"
                activeId={activeId}
                badge="3"
                title="ERP"
                subtitle="Faturamento, estoque e status"
              >
                <TokenRow tokens={["Confirmação"]} size="sm" />
              </NodeCard>
            </div>
          </div>
        </Canvas>
      </div>

      <div className="md:hidden">
        <Canvas variant="core">
          <div className="space-y-4">
            <NodeCard
              id="core:shopify"
              activeId={activeId}
              badge="1"
              title="Shopify"
              subtitle="Pedido e atualizações do fluxo"
            />
            <FlowLineY direction="down" active={isActive(activeId, "core:shopify") || isActive(activeId, "core:core")} />
            <NodeCard
              id="core:core"
              activeId={activeId}
              badge="2"
              title="Cecília Core"
              subtitle="Motor de regras com auditoria"
              emphasis
            >
              <TokenRow tokens={["Canal", "CNPJ", "Estoque"]} />
              <div className="mt-4">
                <MiniList
                  activeId={activeId}
                  prefix="core:core"
                  items={["Regra aplicada", "Destino definido", "Evento registrado"]}
                />
              </div>
            </NodeCard>
            <FlowLineY direction="down" active={isActive(activeId, "core:core") || isActive(activeId, "core:erp")} />
            <NodeCard
              id="core:erp"
              activeId={activeId}
              badge="3"
              title="ERP"
              subtitle="Faturamento, estoque e status"
            />
            <FlowLineY direction="down" active={isActive(activeId, "core:erp") || isActive(activeId, "core:visao")} />
            <NodeCard
              id="core:visao"
              activeId={activeId}
              title="Trilha do Pedido"
              subtitle="Linha do tempo e alertas por etapa"
            >
              <MiniList
                activeId={activeId}
                prefix="core:visao"
                items={["Recebido", "Encaminhado", "Confirmado"]}
              />
            </NodeCard>
          </div>
        </Canvas>
      </div>
    </>
  );
}

/* -------------------------------- Pay -------------------------------- */

function PayFlow({ activeId }: { activeId?: string | null }) {
  return (
    <>
      <div className="hidden md:block">
        <Canvas variant="pay">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-[minmax(0,1fr)_96px_minmax(0,1.35fr)_96px_minmax(0,1fr)] items-start gap-5">
              <NodeCard
                id="pay:shopify"
                activeId={activeId}
                badge="1"
                title="Shopify"
                subtitle="Envia dados do pedido e do pagamento"
              />

              <div className="pt-7">
                <FlowLineX
                  direction="right"
                  active={isActive(activeId, "pay:shopify") || isActive(activeId, "pay:pay")}
                  className="w-full md:w-full"
                />
              </div>

              <NodeCard
                id="pay:pay"
                activeId={activeId}
                badge="2"
                title="Cecília Pay"
                subtitle="Alocação por CNPJ e validação"
                emphasis
              >
                <MeterBars
                  activeKey={activeId}
                  rows={[
                    { label: "CNPJ 1", value: 64, id: "pay:cnpj1" },
                    { label: "CNPJ 2", value: 36, id: "pay:cnpj2" },
                  ]}
                />
                <div className="mt-4">
                  <TokenRow tokens={["Regras", "Taxas", "Parcelas"]} />
                </div>
              </NodeCard>

              <div className="pt-7">
                <FlowLineX
                  direction="right"
                  active={isActive(activeId, "pay:pay") || isActive(activeId, "pay:asaas")}
                  className="w-full md:w-full"
                />
              </div>

              <NodeCard
                id="pay:asaas"
                activeId={activeId}
                badge="3"
                title="Asaas"
                subtitle="Split automático no gateway"
              >
                <MiniList
                  activeId={activeId}
                  prefix="pay:asaas"
                  items={["Split executado", "Status por repasse", "Conciliação"]}
                />
              </NodeCard>
            </div>

            <div className="mt-10 mx-auto w-full max-w-4xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <FlowLineY
                    direction="down"
                    active={isActive(activeId, "pay:asaas") || isActive(activeId, "pay:cnpj1")}
                    className="h-7 md:h-7"
                  />
                  <div className="mt-2 w-full">
                    <NodeCard
                      id="pay:cnpj1"
                      activeId={activeId}
                      title="CNPJ 1"
                      subtitle="Recebe o valor correto"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <FlowLineY
                    direction="down"
                    active={isActive(activeId, "pay:asaas") || isActive(activeId, "pay:cnpj2")}
                    className="h-7 md:h-7"
                  />
                  <div className="mt-2 w-full">
                    <NodeCard
                      id="pay:cnpj2"
                      activeId={activeId}
                      title="CNPJ 2"
                      subtitle="Recebe o valor correto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Canvas>
      </div>

      <div className="md:hidden">
        <Canvas variant="pay">
          <div className="space-y-4">
            <NodeCard
              id="pay:shopify"
              activeId={activeId}
              badge="1"
              title="Shopify"
              subtitle="Envia dados do pedido e do pagamento"
            />
            <FlowLineY direction="down" active={isActive(activeId, "pay:shopify") || isActive(activeId, "pay:pay")} />
            <NodeCard
              id="pay:pay"
              activeId={activeId}
              badge="2"
              title="Cecília Pay"
              subtitle="Alocação por CNPJ e validação"
              emphasis
            >
              <MeterBars
                activeKey={activeId}
                rows={[
                  { label: "CNPJ 1", value: 64, id: "pay:cnpj1" },
                  { label: "CNPJ 2", value: 36, id: "pay:cnpj2" },
                ]}
              />
            </NodeCard>
            <FlowLineY direction="down" active={isActive(activeId, "pay:pay") || isActive(activeId, "pay:asaas")} />
            <NodeCard
              id="pay:asaas"
              activeId={activeId}
              badge="3"
              title="Asaas"
              subtitle="Split automático no gateway"
            />

            <div className="pt-2">
              <div className="grid grid-cols-2 gap-4">
                <NodeCard
                  id="pay:cnpj1"
                  activeId={activeId}
                  title="CNPJ 1"
                  subtitle="Valor correto"
                />
                <NodeCard
                  id="pay:cnpj2"
                  activeId={activeId}
                  title="CNPJ 2"
                  subtitle="Valor correto"
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <FlowLineY direction="up" active={isActive(activeId, "pay:cnpj1") || isActive(activeId, "pay:asaas")} className="h-8" />
                <FlowLineY direction="up" active={isActive(activeId, "pay:cnpj2") || isActive(activeId, "pay:asaas")} className="h-8" />
              </div>
            </div>
          </div>
        </Canvas>
      </div>
    </>
  );
}

/* -------------------------------- Vision -------------------------------- */

function VisionFlow({ activeId }: { activeId?: string | null }) {
  return (
    <>
      <div className="hidden md:block">
        <Canvas variant="vision">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-[minmax(0,1.15fr)_96px_minmax(0,1.35fr)_96px_minmax(0,1fr)] items-start gap-5">
              <NodeCard
                id="vision:fontes"
                activeId={activeId}
                badge="1"
                title="Fontes"
                subtitle="Shopify, ERP, Atendimento, Planilhas e outros"
              >
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Shopify",
                    "ERP",
                    "Atendimento",
                    "Planilhas",
                    "Outros Sistemas",
                  ].map((t) => (
                    <span
                      key={t}
                      className="inline-flex w-full items-center justify-start rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </NodeCard>

              <div className="pt-7">
                <FlowLineX
                  direction="right"
                  active={isActive(activeId, "vision:fontes") || isActive(activeId, "vision:vision")}
                  className="w-full md:w-full"
                />
              </div>

              <NodeCard
                id="vision:vision"
                activeId={activeId}
                badge="2"
                title="Cecília Vision"
                subtitle="Tratamento, estruturação e contexto"
                emphasis
              >
                <MiniList
                  activeId={activeId}
                  prefix="vision:vision"
                  items={["Tratamento", "Organização", "Modelagem"]}
                />
                <div className="mt-4">
                  <TokenRow tokens={["SSOT", "Alertas", "IA"]} />
                </div>
              </NodeCard>

              <div className="pt-7">
                <FlowLineX
                  direction="right"
                  active={
                    isActive(activeId, "vision:vision") ||
                    isActive(activeId, "vision:paineis") ||
                    isActive(activeId, "vision:relatorios") ||
                    isActive(activeId, "vision:insights")
                  }
                  className="w-full md:w-full"
                />
              </div>

              <div className="space-y-4">
                <NodeCard
                  id="vision:paineis"
                  activeId={activeId}
                  badge="3"
                  title="Painéis"
                  subtitle="Acompanhamento contínuo"
                />
                <NodeCard
                  id="vision:relatorios"
                  activeId={activeId}
                  title="Relatórios"
                  subtitle="Conferência e rotina"
                />
                <NodeCard
                  id="vision:insights"
                  activeId={activeId}
                  title="Insights"
                  subtitle="Padrões e anomalias com IA"
                />
              </div>
            </div>
          </div>
        </Canvas>
      </div>

      <div className="md:hidden">
        <Canvas variant="vision">
          <div className="space-y-4">
            <NodeCard
              id="vision:fontes"
              activeId={activeId}
              title="Fontes"
              subtitle="Shopify, ERP, Atendimento, Planilhas e outros"
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  "Shopify",
                  "ERP",
                  "Atendimento",
                  "Planilhas",
                  "Outros Sistemas",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </NodeCard>

            <FlowLineY direction="down" active={isActive(activeId, "vision:fontes") || isActive(activeId, "vision:vision")} />

            <NodeCard
              id="vision:vision"
              activeId={activeId}
              title="Cecília Vision"
              subtitle="Tratamento, estruturação e contexto"
              emphasis
            >
              <MiniList
                activeId={activeId}
                prefix="vision:vision"
                items={["Tratamento", "Organização", "Modelagem"]}
              />
            </NodeCard>

            <FlowLineY
              direction="down"
              active={
                isActive(activeId, "vision:vision") ||
                isActive(activeId, "vision:paineis") ||
                isActive(activeId, "vision:relatorios") ||
                isActive(activeId, "vision:insights")
              }
            />

            <NodeCard
              id="vision:paineis"
              activeId={activeId}
              title="Painéis"
              subtitle="Acompanhamento contínuo"
            />
            <NodeCard
              id="vision:relatorios"
              activeId={activeId}
              title="Relatórios"
              subtitle="Conferência e rotina"
            />
            <NodeCard
              id="vision:insights"
              activeId={activeId}
              title="Insights"
              subtitle="Padrões e anomalias com IA"
            />
          </div>
        </Canvas>
      </div>
    </>
  );
}
