"use client";

import { useEffect, useState } from "react";

export function useActiveChapter(ids: readonly string[]) {
  const [active, setActive] = useState(0);
  const key = ids.join("|");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!elements.length) return;

    let frame = 0;
    let settle = 0;
    let current = 0;
    let queued = 0;

    const findChapter = (probe: number) => {
      let next = 0;
      for (let index = 0; index < elements.length; index += 1) {
        if (elements[index].getBoundingClientRect().top <= probe) next = index;
      }
      return next;
    };

    const commit = (next: number) => {
      if (next === queued) return;
      queued = next;
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (next !== current) {
          current = next;
          setActive(next);
        }
      }, 70);
    };

    const measure = () => {
      const probe = window.innerHeight * 0.38;
      const hold = 56;
      const currentElement = elements[current];

      if (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        if (rect.top - hold <= probe && rect.bottom + hold >= probe) return;
      }

      commit(findChapter(probe));
    };

    const requestMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    const story = document.getElementById("story");
    const resizeObserver = new ResizeObserver(requestMeasure);
    if (story) resizeObserver.observe(story);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", requestMeasure);
      resizeObserver.disconnect();
    };
  }, [ids, key]);

  return active;
}
