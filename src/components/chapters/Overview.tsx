"use client";

import { siteConfig } from "@/config/site";
import { getChapter } from "@/data/chapters";
import { media } from "@/data/media";
import { overviewStory } from "@/data/story";
import { ImageReveal } from "@/components/interactions/ImageReveal";
import { TextReveal } from "@/components/interactions/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { scrollToId } from "@/lib/scroll";

export function Overview() {
  const chapter = getChapter("overview");

  return (
    <section id={chapter.id} className="chapter bg-paper">
      <div className="flex items-center justify-between gap-4">
        <SectionLabel>{overviewStory.label}</SectionLabel>
        <button
          type="button"
          onClick={() => scrollToId("dna")}
          className="label min-h-11 text-muted transition-colors hover:text-ink"
          aria-label="Дараагийн бүлэг рүү"
        >
          {overviewStory.scrollHint} ↘
        </button>
      </div>

      <p className="label mt-10 text-ink">
        {siteConfig.tagline.toUpperCase()} <span aria-hidden>↗</span>
      </p>

      <div className="mt-6 flex items-end justify-between gap-4">
        <TextReveal
          as="h1"
          lines={overviewStory.headline}
          accentWords={overviewStory.accentWords}
          className="hero-title max-w-[8ch]"
        />
        <span aria-hidden className="display pb-1 text-[clamp(3.4rem,10vw,7.5rem)] leading-none text-accent">
          ↗
        </span>
      </div>

      <p className="prose-copy mt-8 text-ink/80">{overviewStory.description}</p>

      <figure className="group mt-14 md:mt-16">
        <ImageReveal
          src={media.overview.src}
          alt={media.overview.alt}
          sizes="(min-width: 1024px) 52vw, 100vw"
          priority
          className="aspect-[16/10] w-full"
        />
        <figcaption className="mt-3 flex items-center justify-between gap-4">
          <span className="label text-muted">{media.overview.label}</span>
          <span className="label text-ink">
            {media.overview.figure} <span aria-hidden>↗</span>
          </span>
        </figcaption>
      </figure>

      <div className="mt-14 border-t border-line pt-6 md:mt-16">
        <p className="label text-ink">{overviewStory.bottomPrimary}</p>
        <p className="label mt-2 text-muted">{overviewStory.bottomSecondary}</p>
      </div>
    </section>
  );
}
