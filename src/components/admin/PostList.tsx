"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  urlName: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts/admin/list");
      if (!response.ok) {
        throw new Error("Error loading posts");
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError("Error loading posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      fetchPosts();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/blog/search?q=${encodeURIComponent(query)}&all=true`
      );
      if (!response.ok) {
        throw new Error("Error searching posts");
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError("Error searching posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting post");
      }

      // Remove o post da lista
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      alert("Error deleting post");
      console.error(err);
    }
  };

  const getImageUrl = (imageUrl: string) => {
    return imageUrl || "/images/about-cover.jpg";
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">
          Carregando posts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-lg text-muted-foreground">Nenhum post encontrado.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Crie seu primeiro post para começar.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar posts por título ou subtítulo..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-3 pl-12 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <ul className="divide-y divide-border">
        {posts.map((post) => (
          <li
            key={post._id}
            className="transition-colors hover:bg-card/40"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={getImageUrl(post.imageUrl)}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">
                      {post.title}
                    </p>
                    {!post.published && (
                      <span className="rounded-full border border-amber-500/50 bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-200">
                        Rascunho
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate">{post.urlName}</span>
                    <span>•</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/admin/blog/${post._id}`}
                  className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="inline-flex items-center rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
