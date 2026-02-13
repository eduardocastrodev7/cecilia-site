import React from "react";
import type { ProductSlug } from "@/lib/products";

type Props = {
  slug: ProductSlug;
};

/**
 * Monochrome "mock UI" visuals to make each product feel like software.
 * No colored gradients, only subtle panels, lines and labels.
 */
export default function ProductVisual({ slug }: Props) {
  switch (slug) {
    case "commerce":
      return <CommerceVisual />;
    case "core":
      return <CoreVisual />;
    case "pay":
      return <PayVisual />;
    case "vision":
      return <VisionVisual />;
    default:
      return null;
  }
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/30 p-3">
      <div className="text-[11px] font-semibold tracking-wide text-muted-foreground">
        {title}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Chip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

function Dot({ state }: { state: "ok" | "warn" | "err" }) {
  const cls =
    state === "ok"
      ? "bg-foreground/70"
      : state === "warn"
      ? "bg-foreground/40"
      : "bg-foreground/25";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function CommerceVisual() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Panel title="Checklist de lançamento">
        <div className="space-y-2">
          {[
            { label: "Rastreamento", state: "warn" as const },
            { label: "SEO e redirecionamentos", state: "ok" as const },
            { label: "Pagamentos", state: "ok" as const },
            { label: "Frete", state: "warn" as const },
          ].map((x) => (
            <div
              key={x.label}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1"
            >
              <span className="text-[11px] text-muted-foreground">{x.label}</span>
              <Dot state={x.state} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Progresso da migração">
        <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
          <div className="h-full w-[78%] rounded-full bg-foreground/35" />
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground">78% validado</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Catálogo", "Clientes", "Pedidos", "Apps"].map((x) => (
            <Chip key={x}>{x}</Chip>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function CoreVisual() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Panel title="Regras de roteamento">
        <div className="space-y-2">
          {[
            "CNPJ por canal",
            "Prioridade de estoque",
            "Roteamento por região",
            "Reprocessamento automático",
          ].map((x, i) => (
            <div
              key={x}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1"
            >
              <span className="text-[11px] text-muted-foreground">{x}</span>
              <span className="text-[10px] text-foreground/60">R{i + 1}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Trilha de auditoria">
        <div className="space-y-2">
          {[
            { e: "pedido.criado", s: "ok" as const },
            { e: "roteamento.aplicado", s: "ok" as const },
            { e: "erp.sincronizacao.falha", s: "err" as const },
            { e: "reprocessamento.agendado", s: "warn" as const },
          ].map((x) => (
            <div
              key={x.e}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-2 py-1"
            >
              <Dot state={x.s} />
              <span className="text-[11px] text-muted-foreground">{x.e}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function PayVisual() {
  return (
    <div className="space-y-3">
      <Panel title="Fluxo de pagamento">
        <div className="grid grid-cols-3 gap-2">
          {["Início", "Validar", "Dividir", "Operadora", "Repasse", "Concluído"].map(
            (x) => (
              <div
                key={x}
                className="rounded-lg border border-border/60 bg-background/40 px-2 py-1 text-[11px] text-muted-foreground"
              >
                {x}
              </div>
            )
          )}
        </div>
      </Panel>

      <Panel title="Status">
        <div className="grid grid-cols-3 gap-2">
          {[
            { t: "validado", s: "ok" as const },
            { t: "processando", s: "warn" as const },
            { t: "concluído", s: "ok" as const },
          ].map((x) => (
            <div
              key={x.t}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1"
            >
              <span className="text-[11px] text-muted-foreground">{x.t}</span>
              <Dot state={x.s} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function VisionVisual() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Panel title="Fluxos monitorados">
        <div className="space-y-2">
          {[
            { t: "Pedido → ERP", s: "ok" as const },
            { t: "Cancelamento → ERP", s: "ok" as const },
            { t: "Pagamento → repasse", s: "warn" as const },
            { t: "Expedição → Shopify", s: "ok" as const },
          ].map((x) => (
            <div
              key={x.t}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-2 py-1"
            >
              <span className="text-[11px] text-muted-foreground">{x.t}</span>
              <Dot state={x.s} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Alertas e trilha">
        <div className="space-y-2">
          {[
            { e: "pedido.aguardando_erp", s: "warn" as const },
            { e: "erp.sincronizacao.falha", s: "err" as const },
            { e: "repasse.concluído", s: "ok" as const },
          ].map((x) => (
            <div
              key={x.e}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-2 py-1"
            >
              <Dot state={x.s} />
              <span className="text-[11px] text-muted-foreground">{x.e}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["por CNPJ", "por canal", "por etapa"].map((x) => (
            <Chip key={x}>{x}</Chip>
          ))}
        </div>
      </Panel>
    </div>
  );
}
