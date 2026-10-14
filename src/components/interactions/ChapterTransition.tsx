"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useMotion } from "@/components/providers/MotionProvider";
import { CHAPTER_TOTAL, type Chapter } from "@/data/chapters";
import { renderAccent } from "@/lib/accent";
import { ease } from "@/lib/animations";
import { gsap } from "@/lib/gsap";

type ChapterTransitionProps = {
  chapter: Chapter;
};

function revealCopy(node: HTMLElement) {
  const lines = node.querySelectorAll<HTMLElement>("[data-line]");
  const enters = node.querySelectorAll<HTMLElement>("[data-enter]");
  const timeline = gsap.timeline();
  timeline.fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 0.78, stagger: 0.075, ease: ease.out });
  timeline.fromTo(
    enters,
    { autoAlpha: 0, y: 12 },
    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: ease.soft },
    0.18,
  );
  return timeline;
}

export function ChapterTransition({ chapter }: ChapterTransitionProps) {
  const { enabled, ready } = useMotion();
  const [current, setCurrent] = useState(chapter);
  const copyRef = useRef<HTMLDivElement>(null);
  const pending = useRef(chapter);
  const displayedId = useRef(chapter.id);
  const exiting = useRef(false);
  const mounted = useRef(true);
  const exitTween = useRef<gsap.core.Timeline | null>(null);
  const revealTween = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      exitTween.current?.kill();
      revealTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    pending.current = chapter;
    const node = copyRef.current;

    const commit = (next: Chapter) => {
      if (!mounted.current || next.id === displayedId.current) return;
      displayedId.current = next.id;
      setCurrent(next);
    };

    if (!ready) return;

    if (!enabled || !node) {
      exitTween.current?.kill();
      exiting.current = false;
      const frame = requestAnimationFrame(() => commit(pending.current));
      return () => cancelAnimationFrame(frame);
    }

    if (chapter.id === displayedId.current || exiting.current) return;

    const lines = node.querySelectorAll<HTMLElement>("[data-line]");
    const enters = node.querySelectorAll<HTMLElement>("[data-enter]");
    revealTween.current?.kill();
    exiting.current = true;

    const timeline = gsap.timeline({
      onComplete: () => {
        exiting.current = false;
        exitTween.current = null;
        if (!mounted.current) return;
        const next = pending.current;
        if (next.id === displayedId.current) {
          if (copyRef.current) revealTween.current = revealCopy(copyRef.current);
          return;
        }
        commit(next);
      },
    });

    timeline.to(lines, { yPercent: -110, duration: 0.42, stagger: 0.045, ease: ease.in }, 0);
    timeline.to(enters, { autoAlpha: 0, y: -8, duration: 0.28, ease: ease.in }, 0);
    exitTween.current = timeline;
  }, [chapter, enabled, ready]);

  useLayoutEffect(() => {
    const node = copyRef.current;
    if (!node) return;

    const lines = node.querySelectorAll<HTMLElement>("[data-line]");
    const enters = node.querySelectorAll<HTMLElement>("[data-enter]");

    if (!ready || !enabled) {
      gsap.set([node, ...lines, ...enters], { clearProps: "opacity,visibility,transform" });
      return;
    }

    revealTween.current?.kill();
    const timeline = revealCopy(node);
    revealTween.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [current.id, enabled, ready]);

  return (
    <div>
      <p className="sr-only" aria-live="polite">
        {current.canvas.label}. {current.canvas.lines.join(" ")} {current.canvas.description}
      </p>
      <div ref={copyRef} className="canvas-copy-body">
        <p data-enter className="label text-accent">
          {current.canvas.label}
        </p>
        <p aria-hidden className="canvas-heading display mt-3 text-paper">
          {current.canvas.lines.map((line, index) => (
            <span key={`${current.id}-${index}`} className="mask-line">
              <span data-line className="block">
                {renderAccent(line, current.canvas.accentWords, "text-accent")}
              </span>
            </span>
          ))}
        </p>
        <p data-enter className="mt-4 max-w-[18rem] text-[13.5px] leading-relaxed whitespace-pre-line text-white/72">
          {current.canvas.description}
        </p>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
        <p className="max-w-[12rem] font-mono text-[10px] leading-relaxed tracking-[0.16em] text-white/55">
          {siteConfig.canvasMotto}
        </p>
        <p key={current.number} className="counter-pop font-mono text-[12px] tracking-[0.18em] text-paper">
          {current.number}
          <span className="text-white/40"> / {CHAPTER_TOTAL}</span>
        </p>
      </div>
    </div>
  );
}
