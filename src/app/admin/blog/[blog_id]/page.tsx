import PostForm from "@/components/admin/PostForm";
import connectDB from "@/lib/mongodb";
import Post, { IContent } from "@/models/Post";
import { notFound } from "next/navigation";

interface PageProps {
  params: { blog_id: string };
}

export default async function EditPostPage({ params }: PageProps) {
  await connectDB();

  const post = await Post.findById(params.blog_id).lean();

  if (!post) {
    notFound();
  }

  const postData = {
    _id: post._id.toString(),
    title: post.title,
    subtitle: post.subtitle,
    urlName: post.urlName,
    content: (post.content ?? []) as IContent[],
    imageUrl: post.imageUrl,
    published: post.published,
    keywords: post.keywords ?? [],
    metaDescription: post.metaDescription ?? "",
    metaTitle: post.metaTitle ?? "",
    metaImage: post.metaImage ?? "",
    metaImageAlt: post.metaImageAlt ?? "",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">
        Editar post
      </h1>
      <div>
        <PostForm post={postData} />
      </div>
    </div>
  );
}
