import type { LucideIcon } from "lucide-react";
import { Boxes, CreditCard, Database, Rocket } from "lucide-react";

export type ProductSlug = "commerce" | "core" | "pay" | "vision";

export type ProductFAQ = {
  q: string;
  a: string;
};

export type ProductFlowNode = {
  label: string;
  hint?: string;
};

export type Product = {
  slug: ProductSlug;
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  longDescription: string;
  highlights: string[];
  outcomes: string[];
  solves: string[];
  flow: ProductFlowNode[];
  resources: string[];
  faq: ProductFAQ[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "commerce",
    icon: Rocket,
    name: "Cecília Commerce",
    tagline: "Construção e migração Shopify",
    description:
      "Criamos ou migramos sua loja Shopify com setup completo e checklist de lançamento incluído. A loja entra no ar pronta para vender e pronta para integrar com a suíte Cecília.",
    features: ["Criação", "Migração", "Setup ponta a ponta", "Performance"],
    longDescription:
      "Do diagnóstico ao lançamento: tema, configurações, integrações com ERP e validações de rastreamento e SEO. Tudo com acompanhamento no pós lançamento.",
    highlights: [
      "Diagnóstico e arquitetura da loja (operação, canais e regras)",
      "Construção do tema com foco em performance e conversão",
      "Configuração de pagamentos, fretes, impostos e apps essenciais",
      "Migração com validação (catálogo, clientes e pedidos)",
      "Checklist de lançamento com validações (rastreamento, SEO, redirecionamentos, eventos)",
    ],
    outcomes: [
      "Loja pronta para operar no dia 1",
      "Lançamento com checklist e validação",
      "Base preparada para integrar Core/Pay/Vision",
    ],
    solves: [
      "Migrações que quebram SEO e rastreamento",
      "Lojas que nascem sem base operacional",
      "Lançamento sem validações e sem contingência",
      "Setup de apps e integrações sem critério",
    ],
    flow: [
      { label: "Diagnóstico", hint: "mapa da operação e regras" },
      { label: "Construção", hint: "tema + catálogo + configurações" },
      { label: "Migração", hint: "clientes, pedidos, SEO e redirecionamentos" },
      { label: "Validação", hint: "pagamento, frete, rastreamento e testes" },
      { label: "Lançamento", hint: "acompanhamento pós lançamento" },
    ],
    resources: [
      "Checklist de lançamento (pagamentos, frete, impostos, rastreamento)",
      "Validação de SEO e redirecionamentos",
      "Revisão de performance (tempo de carregamento e boas práticas)",
      "Base para integrações e governança",
    ],
    faq: [
      {
        q: "Vocês migram de qualquer plataforma?",
        a: "Sim. O processo muda conforme a origem, mas seguimos o mesmo padrão: mapeamento, migração, validação e checklist antes do lançamento.",
      },
      {
        q: "O checklist de lançamento está incluso?",
        a: "Sim. O checklist faz parte do Cecília Commerce. Validamos pagamentos, frete, impostos, rastreamento, SEO e redirecionamentos antes de colocar a loja no ar.",
      },
      {
        q: "Vocês fazem tema e experiência de compra?",
        a: "Sim. Construímos ou ajustamos o tema com foco em conversão e performance. Se você tiver uma agência parceira, trabalhamos junto e a Cecília assume a parte técnica.",
      },
      {
        q: "Como ficam integrações com ERP?",
        a: "Mapeamos o que precisa sincronizar e como o ERP recebe os dados. O objetivo é evitar integrações frágeis e reduzir retrabalho no pós lançamento.",
      },
      {
        q: "Eu já tenho uma loja no ar, dá para melhorar sem migrar?",
        a: "Sim. Em alguns casos fazemos uma revisão do tema, do setup e das integrações sem mudar de plataforma. O diagnóstico define o melhor caminho.",
      },
      {
        q: "Quanto tempo leva para colocar a loja no ar?",
        a: "Depende do volume de catálogo, integrações e do nível de personalização do tema. No diagnóstico definimos um plano com marcos de validação para evitar surpresas.",
      },
      {
        q: "O que vocês precisam de mim para começar?",
        a: "Acesso à plataforma atual, visão do catálogo e das regras da operação, e o responsável por aprovar experiência e conteúdo. O objetivo é reduzir idas e vindas e acelerar validações.",
      },
      {
        q: "Vocês mantêm as URLs e o SEO na migração?",
        a: "Sim. Mapeamos redirecionamentos, conferimos indexação, eventos e rastreamento antes do Go Live. A ideia é preservar tráfego e não quebrar a mensuração.",
      },
      {
        q: "Depois do Go Live vocês acompanham a operação?",
        a: "Sim. Acompanhamos o pós lançamento para estabilizar o que depende de uso real, como comportamento de checkout, integrações e fluxo de pedido.",
      },
    ],
  },
  {
    slug: "core",
    icon: Boxes,
    name: "Cecília Core",
    tagline: "Orquestração de pedidos na Shopify",
    description:
      "Organiza o fluxo entre Shopify e ERP com regras por CNPJ, estoque e canal. Dá rastreabilidade, reprocessamento e clareza do que está acontecendo, sem improviso.",
    features: ["Divisão por CNPJ", "Multi CNPJ", "Multi estoque", "Roteamento"],
    longDescription:
      "O Cecília Core aplica regras explícitas, registra cada decisão do fluxo e reduz falhas silenciosas. Ajuda a destravar pedidos, estabilizar integrações e deixar a operação previsível.",
    highlights: [
      "Divisão automática por CNPJ emissor com regras configuráveis",
      "Roteamento de expedição por geolocalização e disponibilidade",
      "Controle multi-estoque com reserva e sincronização",
      "Trilha de auditoria (eventos e estados do pedido)",
      "Integrações com ERP com reprocessamento automático e alertas",
    ],
    outcomes: [
      "Menos falha silenciosa em integrações",
      "Rastreabilidade por evento",
      "Operação previsível com regras explícitas",
    ],
    solves: [
      "Pedidos 'sumindo' entre Shopify e ERP",
      "Processos manuais para corrigir estoque e expedição",
      "Regras por CNPJ sem governança",
      "Falta de rastreabilidade e trilha de auditoria",
    ],
    flow: [
      { label: "Shopify", hint: "evento de pedido" },
      { label: "Core", hint: "regras por CNPJ/estoque/canal" },
      { label: "ERP", hint: "sincronização e faturamento" },
      { label: "Expedição", hint: "status e rastreio" },
      { label: "Vision", hint: "visão do fluxo" },
    ],
    resources: [
      "Regras de roteamento (CNPJ/canal/local/estoque)",
      "Trilha de auditoria (eventos + decisões de regra)",
      "Reprocessamento automático e alertas",
      "Status operacional e visibilidade do fluxo",
    ],
    faq: [
      {
        q: "Isso substitui meu ERP?",
        a: "Não. O Core organiza a operação entre Shopify e seu ERP, com regras, rastreabilidade e estabilidade.",
      },
      {
        q: "Precisa trocar os sistemas atuais?",
        a: "Não. A ideia é melhorar o fluxo sem trocar o que já funciona. O Core entra para dar regras, rastreabilidade e reprocessamento.",
      },
      {
        q: "Como definimos as regras por CNPJ e estoque?",
        a: "Começamos com um diagnóstico do seu fluxo. Depois implementamos regras claras e testadas, com cenários de exceção mapeados.",
      },
      {
        q: "O que acontece quando o ERP falha ou demora?",
        a: "O Core registra o estado, reprocessa automaticamente quando faz sentido e alerta quando precisa de ação humana. O objetivo é evitar falha silenciosa.",
      },
      {
        q: "Funciona com múltiplos estoques?",
        a: "Sim. O Core ajuda a organizar regras de disponibilidade e prioridade, deixando o fluxo previsível para operação e expedição.",
      },
      {
        q: "Quanto tempo leva para ativar em uma operação Multi CNPJ?",
        a: "Começamos pelo diagnóstico das regras e do ERP. Em seguida ativamos por etapas para validar cenários reais. O ritmo depende do número de regras e exceções.",
      },
      {
        q: "Como eu sei para qual ERP o pedido foi enviado?",
        a: "O Core registra a decisão da regra e o estado de envio. Você consegue ver o destino, a confirmação e onde o pedido parou caso exista falha.",
      },
      {
        q: "O Core altera algo no checkout da Shopify?",
        a: "Não. O Core atua no pós pedido, organizando o fluxo para ERP e operação. A experiência de compra permanece a mesma.",
      },
      {
        q: "O que acontece quando existe exceção de regra?",
        a: "Você define critérios de exceção. O Core registra, alerta e direciona para um caminho previsível, em vez de deixar a operação apagar incêndio.",
      },
    ],
  },
  {
    slug: "pay",
    icon: CreditCard,
    name: "Cecília Pay",
    tagline: "Divisão automática de pagamento por CNPJ",
    description:
      "Entre a Shopify e o gateway, identifica para qual CNPJ cada valor deve ir e executa a divisão na própria transação. Cada CNPJ recebe o valor correto com rastreabilidade.",
    features: ["Divisão", "Repasse", "Conciliação", "Status"],
    longDescription:
      "O Cecília Pay valida regras antes de autorizar e deixa claro o status do pagamento e do repasse. Isso facilita a conciliação e reduz retrabalho do time financeiro.",
    highlights: [
      "Divisão por CNPJ na mesma transação (por regra)",
      "Validações antes de autorizar (reduz inconsistência)",
      "Status por transação e por repasse",
      "Relatórios por período e trilha de auditoria",
    ],
    outcomes: [
      "Repasse correto por regra",
      "Conciliação mais rápida e auditável",
      "Menos retrabalho financeiro",
    ],
    solves: [
      "Divisão inexistente ou improvisada",
      "Repasse incorreto e conciliação manual",
      "Falta de status por transação",
      "Operação financeira sem trilha de auditoria",
    ],
    flow: [
      { label: "Pagamento", hint: "início da transação" },
      { label: "Pay", hint: "valida regras e faz a divisão" },
      { label: "Gateway", hint: "processa a transação" },
      { label: "Repasse", hint: "por CNPJ" },
      { label: "Vision", hint: "visão e conciliação" },
    ],
    resources: [
      "Regras de divisão e validações",
      "Status (validado / processando / concluído)",
      "Conciliação e relatórios",
      "Trilha de auditoria financeira",
    ],
    faq: [
      {
        q: "Funciona com qualquer gateway?",
        a: "Depende do modelo de divisão e das integrações disponíveis. A arquitetura é desenhada conforme o gateway e as regras de repasse.",
      },
      {
        q: "Como a divisão por CNPJ acontece?",
        a: "A Shopify envia os dados para o Cecília Pay. O Pay identifica o CNPJ correto e aplica a divisão no gateway, garantindo que cada CNPJ receba o valor certo.",
      },
      {
        q: "Como fica a conciliação no financeiro?",
        a: "O Pay registra status e repasses. O time financeiro consegue conciliar por período e por CNPJ, com trilha de auditoria.",
      },
      {
        q: "O split funciona com parcelas e taxas?",
        a: "Sim, desde que as regras sejam compatíveis com o gateway. No diagnóstico mapeamos cenários como parcela, juros e taxas para evitar inconsistência.",
      },
      {
        q: "O que você precisa da Shopify para ativar?",
        a: "Acesso para configurar integrações e testar o fluxo de pagamento. O objetivo é garantir validação e rastreabilidade desde o primeiro dia.",
      },
      {
        q: "O Pay funciona com Asaas?",
        a: "Sim. O Pay foi desenhado para executar o split no Asaas, garantindo que cada CNPJ receba o valor correto conforme a regra.",
      },
      {
        q: "Como ficam estorno, reembolso e chargeback?",
        a: "Tratamos esses cenários no diagnóstico. O foco é manter rastreabilidade e evitar conciliação manual quando existe devolução ou contestação.",
      },
      {
        q: "O split muda alguma coisa para o cliente no checkout?",
        a: "Não. A divisão acontece por trás, na transação e no repasse. Para o cliente final, a experiência continua simples.",
      },
      {
        q: "Quanto tempo leva para colocar o split em operação?",
        a: "Depende das regras e dos cenários como parcelas e taxas. Em geral seguimos por etapas com testes controlados antes de liberar 100 por cento do volume.",
      },
    ],
  },
  {
    slug: "vision",
    icon: Database,
    name: "Cecília Vision",
    tagline: "Relatórios e painéis da operação",
    description:
      "Recebe informações de várias fontes da empresa e transforma tudo em relatórios e painéis claros. O time enxerga o fluxo e decide com confiança.",
    features: ["Fluxos", "Alertas", "Rastreabilidade", "Relatórios"],
    longDescription:
      "O Cecília Vision consolida Shopify, ERP, time de atendimento, planilhas e outros sistemas. Depois organiza essas informações e entrega relatórios, painéis e alertas para facilitar a operação.",
    highlights: [
      "Consolidação de informações de várias fontes",
      "Organização e tratamento para relatórios consistentes",
      "Painéis por área com alertas",
      "Relatórios automatizados",
    ],
    outcomes: [
      "Visão ponta a ponta do fluxo",
      "Menos retrabalho operacional",
      "Alertas antes do incêndio",
    ],
    solves: [
      "Informações espalhadas entre áreas e sistemas",
      "Relatórios diferentes para o mesmo número",
      "Dúvidas operacionais que viram retrabalho",
      "Falta de clareza para priorizar o que corrigir",
    ],
    flow: [
      { label: "Shopify", hint: "vendas e pedidos" },
      { label: "ERP", hint: "faturamento e estoque" },
      { label: "Atendimento", hint: "ocorrências" },
      { label: "Vision", hint: "organização" },
      { label: "Relatórios", hint: "painéis e alertas" },
    ],
    resources: [
      "Linha do tempo por pedido",
      "Alertas (falhas/tempo/SLA)",
      "Visão por CNPJ/canal",
      "Trilha por pedido e evento",
    ],
    faq: [
      {
        q: "Quais fontes de informação o Vision consegue receber?",
        a: "Shopify, ERP, time de atendimento, planilhas e outros sistemas. Começamos com as fontes mais críticas para o seu dia a dia.",
      },
      {
        q: "O que o Vision entrega no final?",
        a: "Relatórios e painéis claros, com alertas quando algo foge do esperado. O objetivo é reduzir retrabalho e dar previsibilidade para a operação.",
      },
      {
        q: "Isso substitui a ferramenta de relatórios que eu já uso?",
        a: "Não necessariamente. Em muitos cenários, o Vision organiza as informações e alimenta os relatórios que você já usa. O foco é consistência e clareza.",
      },
      {
        q: "Com que frequência os relatórios atualizam?",
        a: "Depende do fluxo. Pode ser em intervalos curtos ou em janelas definidas. No diagnóstico alinhamos o que precisa ser rápido e o que pode ser consolidado.",
      },
      {
        q: "O Vision ajuda o time de atendimento?",
        a: "Sim. Quando atendimento e operação compartilham a mesma visão, fica mais fácil responder o cliente e reduzir idas e vindas.",
      },
      {
        q: "Com que frequência os dados atualizam?",
        a: "Depende da fonte e do tipo de informação. No diagnóstico definimos o que precisa ser quase em tempo real e o que pode ser consolidado em janelas.",
      },
      {
        q: "Como o Vision evita divergência de números entre times?",
        a: "Centralizando e padronizando regras de tratamento. O objetivo é que o mesmo evento gere a mesma leitura para operação, financeiro e atendimento.",
      },
      {
        q: "O Vision entrega insights com IA?",
        a: "Sim. Usamos IA para destacar padrões e anomalias e para acelerar perguntas do dia a dia. A base é uma estrutura consistente, sem isso não existe insight confiável.",
      },
      {
        q: "O Vision substitui meu BI?",
        a: "Nem sempre. Em muitos cenários o Vision organiza e alimenta as ferramentas que você já usa. O foco é consistência, contexto e agilidade na leitura.",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
