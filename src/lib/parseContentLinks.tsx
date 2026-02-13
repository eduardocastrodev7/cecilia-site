import React from "react";

/**
 * Processa texto e converte links no formato (label)[url] em elementos React
 * @param text - Texto que pode conter links no formato (label)[url]
 * @returns Array de elementos React (texto e links)
 *
 * @example
 * parseContentLinks("Texto (link)[https://example.com] mais texto")
 * // Retorna: [<span>Texto </span>, <a href="https://example.com">link</a>, <span> mais texto</span>]
 */
export function parseContentLinks(
  text: string
): (string | React.ReactElement)[] {
  if (!text) return [];

  // Regex para encontrar padrão (label)[url]
  const linkPattern = /\(([^)]+)\)\[([^\]]+)\]/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    // Adiciona texto antes do link
    if (match.index > lastIndex) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(textBefore);
      }
    }

    // Adiciona o link
    const label = match[1];
    const url = match[2];
    parts.push(
      <a
        key={`link-${keyCounter++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="content-link"
      >
        {label}
      </a>
    );

    lastIndex = linkPattern.lastIndex;
  }

  // Adiciona texto restante após o último link
  if (lastIndex < text.length) {
    const textAfter = text.substring(lastIndex);
    if (textAfter) {
      parts.push(textAfter);
    }
  }

  // If no links found, return the original text
  if (parts.length === 0) {
    return [text];
  }

  return parts;
}
