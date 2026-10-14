"use client";

import { CHAPTER_TOTAL, type Chapter } from "@/data/chapters";

export function MobileChapterBar({ chapter, index }: { chapter: Chapter; index: number }) {
  const progress = (index / Math.max(1, Number(CHAPTER_TOTAL))) * 100;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper lg:hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5">
        <p className="label truncate text-ink">{chapter.canvas.label}</p>
        <p className="label shrink-0 text-ink">
          {chapter.number}
          <span className="text-muted"> / {CHAPTER_TOTAL}</span>
        </p>
      </div>
      <div className="h-px bg-line" aria-hidden>
        <div className="chapter-meter h-px bg-accent" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
