"use client";

import { getChapter } from "@/data/chapters";
import { contactStory } from "@/data/story";
import { useUi } from "@/components/providers/UiProvider";
import { TextReveal } from "@/components/interactions/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactChapter() {
  const chapter = getChapter("contact");
  const { openContact } = useUi();

  return (
    <section id={chapter.id} className="chapter relative overflow-hidden bg-accent text-ink">
      <svg
        className="asterisk-spin pointer-events-none absolute -right-[22%] -bottom-[38%] w-[min(92vw,680px)] text-white opacity-[0.18]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <path d="M50 2 V98 M2 50 H98 M16 16 L84 84 M84 16 L16 84" stroke="currentColor" strokeWidth="1.15" />
      </svg>

      <div className="relative">
        <SectionLabel className="text-ink/70">{contactStory.label}</SectionLabel>
        <p className="label mt-6 text-ink/80">{contactStory.overline}</p>
        <TextReveal
          lines={contactStory.headline}
          accentWords={contactStory.accentWords}
          accentClassName="text-paper"
          className="section-title mt-5 max-w-[10ch]"
        />
        <p className="prose-copy mt-6 text-ink/85">{contactStory.description}</p>
        <button
          type="button"
          onClick={openContact}
          className="group mt-10 inline-flex min-h-14 items-center gap-4 bg-ink px-7 py-4 font-mono text-[11px] tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          {contactStory.cta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
}
