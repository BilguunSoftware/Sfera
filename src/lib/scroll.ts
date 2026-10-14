import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const motionOn = document.documentElement.dataset.motion !== "off";
  const header = document.querySelector("header");
  const offset = -((header?.getBoundingClientRect().height ?? 64) + 12);

  if (lenis && motionOn) {
    lenis.scrollTo(element, {
      offset,
      duration: 1.28,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: motionOn ? "smooth" : "auto" });
}
