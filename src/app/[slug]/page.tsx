import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductPageClient from "@/components/ProductPageClient";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Cecília Digital | Produtos",
      description:
        "Infraestrutura e operação para e-commerce Shopify. Multi CNPJ, divisão de pagamentos e visibilidade de fluxo.",
    };
  }

  return {
    title: `${product.name} | Cecília Digital`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Cecília Digital`,
      description: product.description,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <ProductPageClient slug={product.slug} />

      <Footer />
    </main>
  );
}
