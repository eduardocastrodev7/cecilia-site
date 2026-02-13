"use client";

import type { IContent } from "@/models/Post";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CONTENT_TYPES: IContent["type"][] = [
  "text",
  "image",
  "video",
  "audio",
  "link",
  "quote",
  "code",
  "list",
  "table",
  "embed",
];

interface Post {
  _id?: string;
  title: string;
  subtitle?: string;
  urlName: string;
  content: IContent[];
  imageUrl: string;
  published?: boolean;
  keywords?: string[];
  metaDescription?: string;
  metaTitle?: string;
  metaImage?: string;
  metaImageAlt?: string;
}

interface PostFormProps {
  post?: Post;
}

function normalizeContent(content: unknown): IContent[] {
  if (!Array.isArray(content) || content.length === 0) {
    return [{ type: "text", content: "" }];
  }
  return content.map((item) => {
    if (typeof item === "string") {
      return { type: "text" as const, content: item };
    }
    if (item && typeof item === "object" && "type" in item && "content" in item) {
      return item as IContent;
    }
    return { type: "text" as const, content: "" };
  });
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [urlName, setUrlName] = useState(post?.urlName || "");
  const [content, setContent] = useState<IContent[]>(() =>
    normalizeContent(post?.content)
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(
    post?.imageUrl || "/images/about-cover.jpg"
  );
  const [published, setPublished] = useState(post?.published ?? true);
  const [keywords, setKeywords] = useState(
    post?.keywords?.join(", ") || ""
  );
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription || ""
  );
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || "");
  const [metaImage, setMetaImage] = useState(post?.metaImage || "");
  const [metaImageAlt, setMetaImageAlt] = useState(post?.metaImageAlt || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlName(e.target.value.replace(/[^a-z0-9-]/g, ""));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const addBlock = () => {
    setContent([...content, { type: "text", content: "" }]);
  };

  const removeBlock = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, updates: Partial<IContent>) => {
    const next = [...content];
    next[index] = { ...next[index], ...updates };
    setContent(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const validContent: IContent[] = content
        .map((b) => {
          const c = (b.content || "").trim();
          const img = (b.imageUrl || c).trim();
          const vid = (b.videoUrl || c).trim();
          const aud = (b.audioUrl || c).trim();
          const lnk = (b.linkUrl || "").trim();
          const quote = (b.quoteText || c).trim();
          const embUrl = (b.embedUrl || c).trim();
          const embCode = (b.embedCode || "").trim();
          const hasContent =
            c.length > 0 ||
            img.length > 0 ||
            vid.length > 0 ||
            aud.length > 0 ||
            (b.type === "link" && lnk.length > 0) ||
            quote.length > 0 ||
            embUrl.length > 0 ||
            embCode.length > 0 ||
            (b.type === "list" && (b.listItems?.length ?? 0) > 0) ||
            (b.type === "table" && (b.tableData?.length ?? 0) > 0);
          if (!hasContent) return null;
          const out: IContent = { type: b.type, content: c || img || vid || aud || quote || embUrl || " " };
          if (b.imageUrl || (b.type === "image" && img)) out.imageUrl = img;
          if (b.videoUrl || (b.type === "video" && vid)) out.videoUrl = vid;
          if (b.audioUrl || (b.type === "audio" && aud)) out.audioUrl = aud;
          if (b.linkUrl || (b.type === "link" && lnk)) out.linkUrl = lnk;
          if (b.quoteText || (b.type === "quote" && quote)) out.quoteText = quote;
          if (b.codeLanguage) out.codeLanguage = b.codeLanguage;
          if (b.listItems?.length) out.listItems = b.listItems;
          if (b.tableData?.length) out.tableData = b.tableData;
          if (b.embedCode || (b.type === "embed" && embCode)) out.embedCode = embCode;
          if (b.embedUrl || (b.type === "embed" && embUrl)) out.embedUrl = embUrl;
          return out;
        })
        .filter((b): b is IContent => b !== null);

      if (validContent.length === 0) {
        setError("Adicione pelo menos um bloco de conteúdo válido");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subtitle", subtitle.trim());
      formData.append("urlName", urlName.toLowerCase().trim());
      formData.append("content", JSON.stringify(validContent));
      formData.append("keywords", keywords.trim());
      formData.append("metaDescription", metaDescription.trim());
      formData.append("metaTitle", metaTitle.trim());
      formData.append("metaImage", metaImage.trim());
      formData.append("metaImageAlt", metaImageAlt.trim());
      if (image) formData.append("image", image);
      if (isEditing) formData.append("published", published.toString());

      const url = isEditing
        ? `/api/posts/edit/${post._id}`
        : "/api/posts/create";
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao salvar");

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !post._id) return;
    if (!confirm("Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."))
      return;
    try {
      const res = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      alert("Erro ao excluir o post");
      console.error(err);
    }
  };

  const inputBase =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelBase = "block text-sm font-medium text-foreground mb-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        <div>
          <label htmlFor="title" className={labelBase}>Título *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputBase}
            placeholder="Título do post"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className={labelBase}>
            Subtítulo <span className="text-muted-foreground">(opcional)</span>
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputBase}
            placeholder="Subtítulo"
          />
        </div>

        <div>
          <label htmlFor="urlName" className={labelBase}>
            URL * <span className="text-muted-foreground text-xs">(apenas letras minúsculas, números e hífens)</span>
          </label>
          <input
            type="text"
            id="urlName"
            value={urlName}
            onChange={handleUrlNameChange}
            required
            pattern="[a-z0-9-]+"
            className={inputBase}
            placeholder="meu-post"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelBase}>Conteúdo *</label>
            <button
              type="button"
              onClick={addBlock}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <Plus className="w-4 h-4" /> Adicionar bloco
            </button>
          </div>
          <div className="space-y-4">
            {content.map((block, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card/40 p-4 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <select
                    value={block.type}
                    onChange={(e) => {
                      const newType = e.target.value as IContent["type"];
                      const contentVal =
                        block.type === "list" && block.listItems
                          ? block.listItems.join("\n")
                          : block.content;
                      updateBlock(index, { type: newType, content: contentVal });
                    }}
                    className={`${inputBase} w-auto min-w-[140px]`}
                  >
                    {CONTENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Remover bloco"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {block.type === "text" && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    rows={4}
                    className={`${inputBase} resize-y`}
                    placeholder="Texto do parágrafo. Use (label)[url] para links."
                  />
                )}
                {block.type === "image" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={block.imageUrl || block.content}
                      onChange={(e) =>
                        updateBlock(index, { imageUrl: e.target.value, content: e.target.value })
                      }
                      className={inputBase}
                      placeholder="URL da imagem"
                    />
                  </div>
                )}
                {block.type === "video" && (
                  <input
                    type="text"
                    value={block.videoUrl || block.content}
                    onChange={(e) =>
                      updateBlock(index, { videoUrl: e.target.value, content: e.target.value })
                    }
                    className={inputBase}
                    placeholder="URL do vídeo"
                  />
                )}
                {block.type === "audio" && (
                  <input
                    type="text"
                    value={block.audioUrl || block.content}
                    onChange={(e) =>
                      updateBlock(index, { audioUrl: e.target.value, content: e.target.value })
                    }
                    className={inputBase}
                    placeholder="URL do áudio"
                  />
                )}
                {block.type === "link" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => updateBlock(index, { content: e.target.value })}
                      className={inputBase}
                      placeholder="Texto do link"
                    />
                    <input
                      type="text"
                      value={block.linkUrl || ""}
                      onChange={(e) => updateBlock(index, { linkUrl: e.target.value })}
                      className={inputBase}
                      placeholder="URL"
                    />
                  </div>
                )}
                {block.type === "quote" && (
                  <textarea
                    value={block.quoteText || block.content}
                    onChange={(e) =>
                      updateBlock(index, { quoteText: e.target.value, content: e.target.value })
                    }
                    rows={3}
                    className={`${inputBase} resize-y`}
                    placeholder="Citação"
                  />
                )}
                {block.type === "code" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={block.codeLanguage || ""}
                      onChange={(e) => updateBlock(index, { codeLanguage: e.target.value })}
                      className={inputBase}
                      placeholder="Linguagem (ex: javascript)"
                    />
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(index, { content: e.target.value })}
                      rows={6}
                      className={`${inputBase} font-mono text-xs resize-y`}
                      placeholder="Código"
                    />
                  </div>
                )}
                {block.type === "list" && (
                  <textarea
                    value={
                      Array.isArray(block.listItems)
                        ? block.listItems.join("\n")
                        : block.content
                    }
                    onChange={(e) =>
                      updateBlock(index, {
                        listItems: e.target.value.split("\n").filter(Boolean),
                        content: e.target.value,
                      })
                    }
                    rows={4}
                    className={`${inputBase} resize-y`}
                    placeholder="Um item por linha"
                  />
                )}
                {block.type === "table" && (
                  <textarea
                    value={
                      Array.isArray(block.tableData)
                        ? block.tableData.map((r) => r.join(" | ")).join("\n")
                        : block.content
                    }
                    onChange={(e) => {
                      const rows = e.target.value
                        .split("\n")
                        .map((r) => r.split("|").map((c) => c.trim()));
                      updateBlock(index, { tableData: rows, content: e.target.value });
                    }}
                    rows={4}
                    className={`${inputBase} font-mono text-xs resize-y`}
                    placeholder="Células separadas por |, linhas separadas por enter"
                  />
                )}
                {block.type === "embed" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={block.embedUrl || block.content}
                      onChange={(e) =>
                        updateBlock(index, { embedUrl: e.target.value, content: e.target.value })
                      }
                      className={inputBase}
                      placeholder="URL do embed"
                    />
                    <textarea
                      value={block.embedCode || ""}
                      onChange={(e) => updateBlock(index, { embedCode: e.target.value })}
                      rows={3}
                      className={`${inputBase} font-mono text-xs`}
                      placeholder="Ou código HTML do embed"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="image" className={labelBase}>
            Imagem principal <span className="text-muted-foreground">(opcional - usa padrão se não enviar)</span>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
          />
          {imagePreview && (
            <div className="mt-3 flex items-start gap-3">
              <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-lg border border-border">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-lg border border-destructive px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                Remover imagem
              </button>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border p-4 space-y-4">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            SEO
          </h3>
          <div>
            <label htmlFor="keywords" className={labelBase}>Keywords (separadas por vírgula)</label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className={inputBase}
              placeholder="palavra1, palavra2, palavra3"
            />
          </div>
          <div>
            <label htmlFor="metaDescription" className={labelBase}>Meta Description</label>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              className={`${inputBase} resize-y`}
              placeholder="Descrição para SEO"
            />
          </div>
          <div>
            <label htmlFor="metaTitle" className={labelBase}>Meta Title</label>
            <input
              type="text"
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={inputBase}
              placeholder="Título para SEO"
            />
          </div>
          <div>
            <label htmlFor="metaImage" className={labelBase}>Meta Image URL</label>
            <input
              type="text"
              id="metaImage"
              value={metaImage}
              onChange={(e) => setMetaImage(e.target.value)}
              className={inputBase}
              placeholder="https://..."
            />
          </div>
          <div>
            <label htmlFor="metaImageAlt" className={labelBase}>Meta Image Alt</label>
            <input
              type="text"
              id="metaImageAlt"
              value={metaImageAlt}
              onChange={(e) => setMetaImageAlt(e.target.value)}
              className={inputBase}
              placeholder="Texto alternativo"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card/40 px-4 py-3">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
            />
            <label htmlFor="published" className="text-sm font-medium text-foreground">
              Publicado
            </label>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                Excluir post
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/blog")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Salvando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Criar post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
