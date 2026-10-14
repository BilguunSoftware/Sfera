"use client";

import { getChapter } from "@/data/chapters";
import { media } from "@/data/media";
import { peopleStory } from "@/data/story";
import { ImageReveal } from "@/components/interactions/ImageReveal";
import { TextReveal } from "@/components/interactions/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PeopleCulture() {
  const chapter = getChapter("culture");

  return (
    <section id={chapter.id} className="chapter bg-people">
      <SectionLabel>{peopleStory.label}</SectionLabel>
      <p className="label mt-6 text-ink">{peopleStory.overline}</p>
      <TextReveal
        lines={peopleStory.headline}
        accentWords={peopleStory.accentWords}
        className="section-title mt-5 max-w-[12ch]"
      />
      <p className="prose-copy mt-6 text-ink/80">{peopleStory.description}</p>

      <div className="relative mt-12 grid grid-cols-12 gap-4 md:mt-16 md:gap-6">
        <figure className="group col-span-12 md:col-span-7">
          <ImageReveal
            src={media.collaboration.src}
            alt={media.collaboration.alt}
            sizes="(min-width: 768px) 34vw, 100vw"
            className="aspect-[4/5] w-full"
            imageClassName="media-zoom grayscale contrast-[1.04]"
          />
          <figcaption className="mt-3 label text-muted">{media.collaboration.caption}</figcaption>
        </figure>
        <figure className="group col-span-12 md:col-span-5 md:mt-24">
          <ImageReveal
            src={media.conversation.src}
            alt={media.conversation.alt}
            sizes="(min-width: 768px) 22vw, 80vw"
            className="aspect-[3/4] w-full"
            imageClassName="media-zoom grayscale contrast-[1.04]"
          />
          <figcaption className="mt-3 label text-muted">{media.conversation.caption}</figcaption>
        </figure>
        <span
          aria-hidden
          className="mark-spin pointer-events-none absolute top-[42%] left-1/2 -translate-x-1/2 text-[clamp(3.5rem,7vw,6rem)] leading-none text-accent md:top-[46%]"
        >
          ✳
        </span>
      </div>

      <blockquote className="mt-16 border-l-2 border-accent pl-5 md:mt-20 md:pl-6">
        <TextReveal
          as="p"
          lines={peopleStory.quote}
          className="max-w-full text-[clamp(1.85rem,7.4vw,4.35rem)] leading-[0.96] [word-break:keep-all]"
        />
      </blockquote>
    </section>
  );
}
