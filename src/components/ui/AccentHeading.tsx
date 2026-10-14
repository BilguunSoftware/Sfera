import { renderAccent } from "@/lib/accent";
import { cn } from "@/lib/utils";

type AccentHeadingProps = {
  lines: string[];
  accentWords?: string[];
  accentClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
};

export function AccentHeading({
  lines,
  accentWords = [],
  accentClassName = "text-accent",
  as: Tag = "h2",
  className,
  id,
}: AccentHeadingProps) {
  return (
    <Tag id={id} className={cn("display", className)}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block">
          {renderAccent(line, accentWords, accentClassName)}
        </span>
      ))}
    </Tag>
  );
}
