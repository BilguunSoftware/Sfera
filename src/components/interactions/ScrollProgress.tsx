"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const track = trackRef.current;
    if (!bar || !track) return;

    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleY(${progress})`;
      track.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="pointer-events-none fixed top-0 right-0 z-50 h-dvh w-px bg-line"
      role="progressbar"
      aria-label="Хуудасны гүйлт"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div ref={barRef} className="progress-line h-full w-full bg-accent" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
