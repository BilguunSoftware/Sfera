"use client";

import { useLayoutEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { duration, ease } from "@/lib/animations";
import { gsap } from "@/lib/gsap";

export function IntroLoader() {
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const motionOn = document.documentElement.dataset.motion !== "off";
    if (!motionOn) {
      const frame = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(frame);
    }

    const timeout = window.setTimeout(() => setDone(true), 2600);
    const timeline = gsap.timeline({
      onComplete: () => setDone(true),
    });

    timeline
      .from(".loader-mark", { y: 24, opacity: 0, duration: 0.5, ease: ease.out })
      .from(".loader-rule", { scaleX: 0, duration: 0.4, ease: ease.soft }, "-=0.15")
      .to(".loader-root", {
        yPercent: -100,
        duration: duration.slow,
        ease: ease.inOut,
        delay: 0.22,
      });

    return () => {
      window.clearTimeout(timeout);
      timeline.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="loader-root fixed inset-0 z-[80] flex items-center justify-center bg-ink text-paper"
      aria-hidden
    >
      <div className="loader-mark px-6 text-center">
        <p className="label text-white/50">
          {siteConfig.profileLabel} / {siteConfig.profileIndex}
        </p>
        <p className="display mt-4 text-[clamp(3.5rem,8vw,6rem)]">
          {siteConfig.logoText}
          <span className="text-accent">{siteConfig.logoMark}</span>
        </p>
        <div className="loader-rule mx-auto mt-6 h-px w-24 origin-left bg-accent" />
        <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-white/60">
          {siteConfig.tagline.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
