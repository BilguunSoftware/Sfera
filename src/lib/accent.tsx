import type { ReactNode } from "react";

export function renderAccent(text: string, words: string[], className: string): ReactNode {
  if (!text || words.length === 0) return text;

  const escaped = words
    .filter(Boolean)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (escaped.length === 0) return text;

  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gu"));

  return parts.map((part, index) =>
    words.includes(part) ? (
      <span key={`${index}-${part}`} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
