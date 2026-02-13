import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Cecília Digital | Infraestrutura para E-commerce",
  description:
    "Infraestrutura e operação para e-commerce Shopify. Multi CNPJ, divisão de pagamentos e visão do fluxo. Escale sem quebrar.",
  authors: [{ name: "Cecília Digital" }],
  openGraph: {
    title: "Cecília Digital | Infraestrutura para E-commerce",
    description:
      "Infraestrutura e operação para e-commerce Shopify escalar sem quebrar.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
