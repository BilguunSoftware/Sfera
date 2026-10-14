import type { CSSProperties } from "react";

/**
 * Visual tokens for the SFERA template.
 * Change colors here — components read them through CSS variables.
 */
export const theme = {
  primaryDark: "#151619",
  paperBackground: "#F3F1EB",
  secondaryBackground: "#E8E7E0",
  dnaBackground: "#E9E8E2",
  peopleBackground: "#E4E2DA",
  accentColor: "#F16F4B",
  borderColor: "#D7D4CC",
  softGray: "#8B8E8B",
  footerDark: "#18191C",
  fontFamily: {
    display: "var(--font-manrope), var(--font-plex), sans-serif",
    body: "var(--font-plex), var(--font-manrope), sans-serif",
    mono: "var(--font-plex-mono), ui-monospace, monospace",
  },
} as const;

export function themeStyle(): CSSProperties {
  return {
    "--sfera-ink": theme.primaryDark,
    "--sfera-paper": theme.paperBackground,
    "--sfera-warm": theme.secondaryBackground,
    "--sfera-dna": theme.dnaBackground,
    "--sfera-people": theme.peopleBackground,
    "--sfera-accent": theme.accentColor,
    "--sfera-line": theme.borderColor,
    "--sfera-muted": theme.softGray,
    "--sfera-footer": theme.footerDark,
    "--font-display": theme.fontFamily.display,
    "--font-body": theme.fontFamily.body,
    "--font-label": theme.fontFamily.mono,
  } as CSSProperties;
}
