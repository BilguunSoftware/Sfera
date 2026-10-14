"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getChapter } from "@/data/chapters";
import { processSteps } from "@/data/process";
import { approachStory } from "@/data/story";
import { TextReveal } from "@/components/interactions/TextReveal";
import { useMotion } from "@/components/providers/MotionProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export function OurApproach() {
  const chapter = getChapter("approach");
  const [activeId, setActiveId] = useState(processSteps[0]?.id ?? "");
  const activeIndex = Math.max(0, processSteps.findIndex((step) => step.id === activeId));
  const active = processSteps[activeIndex];
  const { enabled } = useMotion();

  const select = (index: number) => {
    const step = processSteps[index];
    if (!step) return;
    setActiveId(step.id);
    document.getElementById(`step-tab-${step.id}`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!processSteps.length) return;
    const last = processSteps.length - 1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(activeIndex === last ? 0 : activeIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(activeIndex <= 0 ? last : activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(last);
    }
  };

  return (
    <section id={chapter.id} className="chapter bg-paper">
      <SectionLabel>{approachStory.label}</SectionLabel>
      <p className="label mt-6 text-ink">{approachStory.overline}</p>
      <TextReveal
        lines={approachStory.headline}
        accentWords={approachStory.accentWords}
        className="section-title mt-5"
      />

      {processSteps.length === 0 || !active ? (
        <p className="mt-10 text-sm text-muted">Арга барилын алхам тохируулаагүй байна.</p>
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Ажлын арга барил"
            aria-orientation="horizontal"
            className="relative mt-14"
            onKeyDown={onKeyDown}
          >
            <div className="absolute top-3 right-0 left-0 hidden h-px bg-line md:block" aria-hidden />
            <div
              className="timeline-progress absolute top-3 left-0 hidden h-px w-full origin-left bg-accent md:block"
              style={{ transform: `scaleX(${activeIndex / Math.max(1, processSteps.length - 1)})` }}
              aria-hidden
            />
            <div className="grid gap-3 md:grid-cols-3 md:gap-6">
              {processSteps.map((step) => {
                const selected = step.id === active.id;
                return (
                  <button
                    key={step.id}
                    id={`step-tab-${step.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="approach-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(step.id)}
                    className="relative min-h-16 py-3 text-left md:pt-8"
                  >
                    <span
                      className={cn(
                        "mb-3 block h-2.5 w-2.5 border transition-transform duration-500 md:mb-6",
                        selected ? "scale-125 border-accent bg-accent" : "border-ink bg-paper",
                      )}
                      aria-hidden
                    />
                    <span className="label text-muted">{step.number}</span>
                    <span className={cn("display mt-2 block text-[clamp(1.4rem,2vw,2rem)]", selected && "text-accent")}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div id="approach-panel" role="tabpanel" aria-labelledby={`step-tab-${active.id}`} aria-live="polite" className="mt-10 grid min-h-[11rem] items-end gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={enabled ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={enabled ? { opacity: 0, y: -10 } : undefined}
                transition={{ duration: enabled ? 0.42 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="label text-accent">{active.label}</p>
                <p className="prose-copy mt-4 text-ink/80">{active.description}</p>
              </motion.div>
            </AnimatePresence>
            <motion.span
              key={`arrow-${active.id}`}
              aria-hidden
              className="display text-[clamp(4rem,8vw,6.5rem)] leading-none text-accent"
              initial={enabled ? { opacity: 0, x: -18, y: 18 } : false}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: enabled ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              ↗
            </motion.span>
          </div>
        </>
      )}
    </section>
  );
}
