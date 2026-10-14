import { cn } from "@/lib/utils";

export function AnimatedArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1",
        className,
      )}
    >
      ↗
    </span>
  );
}
