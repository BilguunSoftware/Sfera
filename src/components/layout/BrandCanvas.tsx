"use client";

import { siteConfig } from "@/config/site";
import type { Chapter } from "@/data/chapters";
import { ChapterTransition } from "@/components/interactions/ChapterTransition";
import { OrbitAnimation } from "@/components/interactions/OrbitAnimation";

export function BrandCanvas({ chapter }: { chapter: Chapter }) {
  return (
    <aside className="brand-canvas relative order-2 isolate bg-ink text-paper lg:sticky lg:top-0 lg:z-20 lg:order-none lg:h-dvh lg:max-h-dvh lg:self-start lg:overflow-hidden" aria-label={siteConfig.companyName}>
      <div className="canvas-grid absolute inset-0" aria-hidden />
      <div className="canvas-shell">
        <header className="canvas-header flex items-start justify-between gap-4">
          <div>
            <p className="display text-[1.45rem] tracking-[-0.05em]">
              {siteConfig.logoText}
              <span className="text-accent">{siteConfig.logoMark}</span>
            </p>
            <p className="label mt-3 text-white/55">
              {siteConfig.profileLabel} / {siteConfig.profileIndex}
            </p>
          </div>
          <p className="label text-white/55">{siteConfig.year}</p>
        </header>
        <div className="canvas-orbit py-5 md:py-0 lg:py-2">
          <OrbitAnimation variant={chaptersIndex(chapter)} monogram={siteConfig.monogram} />
        </div>
        <div className="canvas-copy">
          <ChapterTransition chapter={chapter} />
        </div>
      </div>
    </aside>
  );
}

function chaptersIndex(chapter: Chapter) {
  return Number.parseInt(chapter.number, 10);
}
