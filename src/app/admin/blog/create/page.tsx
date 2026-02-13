import PostForm from "@/components/admin/PostForm";

export default function CreatePostPage() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">
        Criar novo post
      </h1>
      <div>
        <PostForm />
      </div>
    </div>
  );
}
