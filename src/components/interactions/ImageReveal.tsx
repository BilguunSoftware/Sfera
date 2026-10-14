"use client";

import Image from "next/image";
import { useRef } from "react";
import { useMotion } from "@/components/providers/MotionProvider";
import { duration, ease } from "@/lib/animations";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
};

export function ImageReveal({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName,
  objectPosition = "center",
}: ImageRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useMotion();

  useGSAP(
    () => {
      const ScrollTrigger = ensureGsap();
      if (!ScrollTrigger || !ready || !enabled || !rootRef.current) return;

      const frame = rootRef.current.querySelector<HTMLElement>("[data-frame]");
      const photo = rootRef.current.querySelector<HTMLElement>("[data-photo]");
      const zoom = rootRef.current.querySelector<HTMLElement>("[data-zoom]");
      if (!frame || !photo || !zoom) return;

      gsap.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: duration.reveal,
          ease: ease.inOut,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        zoom,
        { scale: 1.14 },
        {
          scale: 1,
          duration: 1.45,
          ease: ease.out,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        photo,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [ready, enabled, src], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className={cn("relative overflow-hidden bg-[#ddd9d0]", className)}>
      <div data-frame className="relative h-full w-full">
        <div data-photo className="absolute -top-[10%] left-0 h-[120%] w-full">
          <div data-zoom className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className={cn("object-cover", imageClassName)}
              style={{ objectPosition }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
