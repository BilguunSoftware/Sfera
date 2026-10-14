"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { companyDNA } from "@/data/companyDNA";
import type { CompanyDnaItem } from "@/data/companyDNA";
import { getChapter } from "@/data/chapters";
import { dnaStory } from "@/data/story";
import { useMotion } from "@/components/providers/MotionProvider";
import { TextReveal } from "@/components/interactions/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export function CompanyDNA() {
  const chapter = getChapter("dna");
  const [activeId, setActiveId] = useState(companyDNA[0]?.id ?? "");
  const active = companyDNA.find((item) => item.id === activeId) ?? companyDNA[0];
  const { enabled } = useMotion();

  if (!active) {
    return (
      <section id={chapter.id} className="chapter bg-dna">
        <p>Компанийн ДНХ-ийн мэдээлэл тохируулаагүй байна.</p>
      </section>
    );
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = companyDNA.findIndex((item) => item.id === activeId);
    const last = companyDNA.length - 1;
    let next = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index <= 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    const item = companyDNA[next];
    setActiveId(item.id);
    document.getElementById(`dna-tab-${item.id}`)?.focus();
  };

  const lineMotion = {
    hidden: { y: enabled ? "110%" : "0%", opacity: enabled ? 0 : 1 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: enabled ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id={chapter.id} className="chapter bg-dna">
      <SectionLabel>{dnaStory.label}</SectionLabel>
      <p className="label mt-6 text-accent">{dnaStory.kicker}</p>
      <TextReveal
        lines={dnaStory.headline}
        accentWords={dnaStory.accentWords}
        className="section-title mt-5 max-w-[12ch]"
      />
      <p className="prose-copy mt-6 text-ink/80">{dnaStory.description}</p>

      <div className="mt-12 border border-line md:grid md:grid-cols-2">
        <div role="tablist" aria-label="Компанийн ДНХ" aria-orientation="vertical" onKeyDown={onKeyDown}>
          {companyDNA.map((item) => {
            const selected = item.id === active.id;
            return (
              <button
                key={item.id}
                id={`dna-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="dna-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "relative flex min-h-[5.5rem] w-full items-center gap-4 border-b border-line px-5 py-5 text-left transition-colors duration-500 last:border-b-0 md:min-h-[8.5rem] md:px-6",
                  selected ? "bg-accent text-ink" : "bg-transparent text-ink hover:bg-paper",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="dna-index"
                    className="absolute top-0 bottom-0 left-0 w-[3px] bg-ink"
                    transition={{ duration: enabled ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <span className={cn("label w-8 shrink-0 transition-transform duration-500", selected && "scale-110")}>
                  {item.number}
                </span>
                <span>
                  <span className="display block text-[clamp(1.35rem,2vw,1.85rem)]">{item.label}</span>
                  <span className={cn("label mt-2 block", selected ? "text-ink/70" : "text-muted")}>
                    {item.englishLabel}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="dna-panel"
          role="tabpanel"
          aria-labelledby={`dna-tab-${active.id}`}
          aria-live="polite"
          className="relative min-h-[22rem] overflow-hidden bg-ink p-6 text-paper sm:p-8 md:min-h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="relative"
              initial={enabled ? "hidden" : false}
              animate="show"
              exit={enabled ? "hidden" : undefined}
              variants={{
                hidden: { opacity: enabled ? 0 : 1 },
                show: {
                  opacity: 1,
                  transition: { duration: enabled ? 0.28 : 0, staggerChildren: enabled ? 0.06 : 0 },
                },
              }}
            >
              <DnaSymbol item={active} enabled={enabled} />
              <motion.p variants={lineMotion} className="label text-accent">
                {active.englishLabel}
              </motion.p>
              <div className="display mt-8 text-[clamp(2rem,3vw,2.8rem)]">
                {active.title.split("\n").map((line) => (
                  <span key={line} className="mask-line">
                    <motion.span variants={lineMotion} className="block">
                      {line}
                    </motion.span>
                  </span>
                ))}
              </div>
              <motion.p variants={lineMotion} className="mt-6 max-w-sm text-sm leading-relaxed text-white/72">
                {active.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DnaSymbol({ item, enabled }: { item: CompanyDnaItem; enabled: boolean }) {
  return (
    <motion.div
      key={item.symbol}
      aria-hidden
      className="pointer-events-none absolute top-5 right-5 text-white/25"
      initial={enabled ? { opacity: 0, scale: 0.82, rotate: -8 } : false}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: enabled ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="display absolute -top-6 -right-1 text-[5.5rem] leading-none text-white/10">{item.number}</span>
      <svg width="92" height="92" viewBox="0 0 92 92" fill="none" className={enabled ? "mark-spin" : undefined}>
        {item.symbol === "orbit" ? (
          <>
            <circle cx="46" cy="46" r="28" stroke="currentColor" />
            <ellipse cx="46" cy="46" rx="40" ry="14" stroke="#F16F4B" />
          </>
        ) : null}
        {item.symbol === "axis" ? (
          <>
            <path d="M46 8 V84 M8 46 H84" stroke="currentColor" />
            <circle cx="46" cy="46" r="6" stroke="#F16F4B" />
          </>
        ) : null}
        {item.symbol === "plus" ? (
          <>
            <path d="M46 14 V78 M14 46 H78" stroke="#F16F4B" />
            <path d="M24 24 L68 68 M68 24 L24 68" stroke="currentColor" />
          </>
        ) : null}
      </svg>
    </motion.div>
  );
}
