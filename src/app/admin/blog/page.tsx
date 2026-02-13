import PostList from "@/components/admin/PostList";
import Link from "next/link";

export default function AdminBlogPage() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Gerenciar posts
        </h1>
        <div className="flex gap-3">
          <Link
            href="/admin/user"
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Gerenciar usuários
          </Link>
          <Link
            href="/admin/blog/create"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Criar novo post
          </Link>
        </div>
      </div>
      <div>
        <PostList />
      </div>
    </div>
  );
}


