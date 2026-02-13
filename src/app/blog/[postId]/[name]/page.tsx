import ContentBlockRenderer from "@/components/blog/ContentBlockRenderer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: {
    postId: string;
    name: string;
  };
}

async function getPost(postId: string) {
  await connectDB();

  const post = await Post.findOne({
    _id: postId,
    published: true,
  })
    .populate("authorId", "email name")
    .lean();

  if (!post) return null;

  const authorId = post.authorId;
  const author =
    authorId && typeof authorId === "object" && "email" in authorId
      ? {
          name: (authorId as { name?: string; email: string }).name,
          email: (authorId as { email: string }).email,
        }
      : null;

  return {
    _id: post._id.toString(),
    title: post.title,
    subtitle: post.subtitle,
    urlName: post.urlName,
    content: post.content,
    imageUrl: post.imageUrl,
    metaDescription: post.metaDescription,
    metaTitle: post.metaTitle,
    metaImage: post.metaImage,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author,
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.postId);

  if (!post) {
    return { title: "Post não encontrado | Cecília Digital" };
  }

  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.subtitle || "Artigo do blog Cecília Digital.";
  const imageUrl = post.metaImage || post.imageUrl;

  return {
    title: `${title} | Cecília Digital`,
    description,
    openGraph: {
      title: `${title} | Cecília Digital`,
      description,
      ...(imageUrl && { images: [imageUrl] }),
      type: "article",
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.postId);

  if (!post) notFound();

  if (params.name !== post.urlName) {
    redirect(`/blog/${params.postId}/${post.urlName}`);
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao blog
          </Link>

          <header className="mb-10">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.subtitle}
              </p>
            )}

            <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-6">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.createdAt.toString()}>
                {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.author && (
                <>
                  <span>•</span>
                  <span>
                    {post.author.name || post.author.email || "Autor"}
                  </span>
                </>
              )}
            </div>
          </header>

          <ContentBlockRenderer content={post.content as unknown[]} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
