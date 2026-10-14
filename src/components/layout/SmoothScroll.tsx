"use client";

import { useEffect } from "react";
import { useMotion } from "@/components/providers/MotionProvider";
import { ensureGsap, gsap } from "@/lib/gsap";
import { registerLenis } from "@/lib/scroll";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const { enabled, ready } = useMotion();

  useEffect(() => {
    if (!ready || !enabled) return;

    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const ScrollTrigger = ensureGsap();
      if (!ScrollTrigger || cancelled) return;

      const lenis = new Lenis({
        duration: 1.08,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        autoRaf: false,
        respectReducedMotion: false,
      });

      registerLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
      requestAnimationFrame(refresh);

      cleanup = () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        gsap.ticker.remove(onTick);
        lenis.destroy();
        registerLenis(null);
        gsap.ticker.lagSmoothing(500);
      };
    };

    void start();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled, ready]);

  return null;
}
