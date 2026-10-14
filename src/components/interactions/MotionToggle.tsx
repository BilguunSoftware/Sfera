"use client";

import { useMotion } from "@/components/providers/MotionProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function MotionToggle({ className }: { className?: string }) {
  const { enabled, ready, toggle } = useMotion();
  const prefersReduced = useReducedMotion();
  const label = enabled ? "Хөдөлгөөнийг унтраах" : "Хөдөлгөөнийг асаах";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={label}
      data-system-reduced={prefersReduced ? "true" : "false"}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap px-1 font-mono text-[10px] font-medium tracking-[0.1em]",
        className,
      )}
    >
      <span>MOTION</span>
      <span className={cn("min-w-6", ready ? "opacity-100" : "opacity-0", enabled ? "text-accent" : "text-muted")}>
        {enabled ? "ON" : "OFF"}
      </span>
    </button>
  );
}
