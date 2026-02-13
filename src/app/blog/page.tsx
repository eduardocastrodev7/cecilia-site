import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Cecília Digital",
  description:
    "Artigos e insights sobre e-commerce, Shopify, infraestrutura e operação.",
};

interface BlogPost {
  _id: string;
  title: string;
  subtitle?: string;
  urlName: string;
  imageUrl: string;
  createdAt: Date;
}

async function getPosts(
  page: number = 1,
  limit: number = 20
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  await connectDB();

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find({ published: true })
      .select("_id title subtitle urlName imageUrl createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Post.countDocuments({ published: true }),
  ]);

  return {
    posts: posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      subtitle: post.subtitle,
      urlName: post.urlName,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
    })),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export default async function BlogPage() {
  const { posts, total } = await getPosts(1, 20);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Blog
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Insights e artigos
              <br />
              <span className="text-muted-foreground">
                sobre e-commerce e infraestrutura.
              </span>
            </h1>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-border bg-card/60 p-12 text-center">
              <p className="text-lg text-muted-foreground">
                Nenhum post publicado ainda.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post._id}/${post.urlName}`}
                  className="group rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.subtitle && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {total > posts.length && (
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Mostrando {posts.length} de {total} posts
              </p>
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Carregar mais
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
