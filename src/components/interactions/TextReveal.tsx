"use client";

import { useRef } from "react";
import { useMotion } from "@/components/providers/MotionProvider";
import { renderAccent } from "@/lib/accent";
import { duration, ease } from "@/lib/animations";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  lines: string[];
  accentWords?: string[];
  accentClassName?: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
};

export function TextReveal({
  lines,
  accentWords = [],
  accentClassName = "text-accent",
  as: Tag = "h2",
  className,
  id,
}: TextRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useMotion();

  useGSAP(
    () => {
      if (!ensureGsap() || !ready || !enabled) return;
      const lineNodes = gsap.utils.toArray<HTMLElement>("[data-reveal-line]");
      if (!lineNodes.length) return;

      gsap.fromTo(
        lineNodes,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: duration.slow,
          stagger: 0.08,
          ease: ease.out,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 86%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready, enabled, lines.join("|")], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef}>
      <Tag id={id} className={cn("display", className)}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="mask-line">
            <span data-reveal-line className="block">
              {renderAccent(line, accentWords, accentClassName)}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
