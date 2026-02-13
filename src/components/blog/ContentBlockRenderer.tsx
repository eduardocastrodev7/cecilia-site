"use client";

import type { IContent } from "@/models/Post";
import { parseContentLinks } from "@/lib/parseContentLinks";
import Image from "next/image";
import React from "react";

function normalizeItem(item: unknown): IContent {
  if (typeof item === "string") {
    return { type: "text", content: item };
  }
  if (item && typeof item === "object" && "type" in item && "content" in item) {
    return item as IContent;
  }
  return { type: "text", content: "" };
}

export default function ContentBlockRenderer({
  content,
}: {
  content: unknown[];
}) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="prose prose-invert max-w-none space-y-6">
      {content.map((raw, index) => {
        const block = normalizeItem(raw);
        const key = `block-${index}`;

        switch (block.type) {
          case "text": {
            const parts = parseContentLinks(block.content);
            return (
              <p
                key={key}
                className="text-base text-foreground leading-relaxed"
              >
                {parts.map((part, i) =>
                  typeof part === "string" ? (
                    <React.Fragment key={i}>{part}</React.Fragment>
                  ) : (
                    React.cloneElement(part, {
                      ...part.props,
                      className:
                        "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
                      key: i,
                    })
                  )
                )}
              </p>
            );
          }
          case "image": {
            const src = block.imageUrl || block.content;
            if (!src) return null;
            return (
              <div key={key} className="relative aspect-video w-full overflow-hidden rounded-xl my-6">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            );
          }
          case "video": {
            const url = block.videoUrl || block.content;
            if (!url) return null;
            return (
              <div key={key} className="relative aspect-video w-full overflow-hidden rounded-xl my-6">
                <iframe
                  src={url}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            );
          }
          case "audio": {
            const url = block.audioUrl || block.content;
            if (!url) return null;
            return (
              <div key={key} className="my-6">
                <audio src={url} controls className="w-full" />
              </div>
            );
          }
          case "link": {
            const href = block.linkUrl || block.content;
            const label = block.content || "Link";
            if (!href) return null;
            return (
              <p key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {label}
                </a>
              </p>
            );
          }
          case "quote": {
            const text = block.quoteText || block.content;
            if (!text) return null;
            return (
              <blockquote
                key={key}
                className="border-l-4 border-primary/50 pl-6 py-2 my-6 italic text-muted-foreground"
              >
                {text}
              </blockquote>
            );
          }
          case "code": {
            return (
              <pre
                key={key}
                className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-sm my-6"
                data-language={block.codeLanguage}
              >
                <code>{block.content}</code>
              </pre>
            );
          }
          case "list": {
            const items = block.listItems || (block.content ? block.content.split("\n").filter(Boolean) : []);
            if (items.length === 0) return null;
            return (
              <ul key={key} className="list-disc list-inside space-y-2 my-6">
                {items.map((item, i) => (
                  <li key={i} className="text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          case "table": {
            const rows = block.tableData || [];
            if (rows.length === 0) return null;
            return (
              <div key={key} className="overflow-x-auto my-6">
                <table className="min-w-full border border-border rounded-lg overflow-hidden">
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-card/40" : "bg-card/20"}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="border-b border-border px-4 py-2 text-sm text-foreground"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case "embed": {
            if (block.embedCode) {
              return (
                <div
                  key={key}
                  className="my-6 [&>iframe]:rounded-lg [&>iframe]:w-full [&>iframe]:aspect-video"
                  dangerouslySetInnerHTML={{ __html: block.embedCode }}
                />
              );
            }
            const url = block.embedUrl || block.content;
            if (!url) return null;
            return (
              <div key={key} className="relative aspect-video w-full overflow-hidden rounded-xl my-6">
                <iframe
                  src={url}
                  title="Embed"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            );
          }
          default:
            return (
              <p key={key} className="text-foreground">
                {block.content}
              </p>
            );
        }
      })}
    </div>
  );
}
