"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "@/components/providers/MotionProvider";
import { gsap } from "@/lib/gsap";

type OrbitAnimationProps = {
  variant: number;
  monogram: string;
};

export function OrbitAnimation({ variant, monogram }: OrbitAnimationProps) {
  const rigRef = useRef<HTMLDivElement>(null);
  const { enabled, ready } = useMotion();

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig || !ready) return;

    if (!enabled) {
      gsap.set(rig, { rotationX: 16, rotationY: -10 });
      return;
    }

    const tiltX = gsap.quickTo(rig, "rotationX", { duration: 0.9, ease: "power3.out" });
    const tiltY = gsap.quickTo(rig, "rotationY", { duration: 0.9, ease: "power3.out" });
    tiltX(16);
    tiltY(-10);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      tiltY(-10 + nx * 14);
      tiltX(16 - ny * 10);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, ready]);

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig || !ready || !enabled) return;
    const letter = rig.querySelector<HTMLElement>(".orbit-letter");
    if (!letter) return;
    const tween = gsap.fromTo(letter, { scale: 0.92 }, { scale: 1, duration: 0.7, ease: "power3.out" });
    return () => {
      tween.kill();
    };
  }, [variant, enabled, ready]);

  return (
    <div className="orbit-scene" aria-hidden>
      <div ref={rigRef} className="orbit-rig" data-variant={variant}>
        <div className="orbit-glow" />
        <div className="orbit-frame">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="orbit-axis" />
        <div className="orbit-axis-h" />
        <div className="orbit-spin-drift">
          <div className="ring ring-far" />
        </div>
        <div className="orbit-spin">
          <div className="ring ring-thin" />
        </div>
        <div className="orbit-spin-reverse">
          <div className="ring ring-orange" />
        </div>
        <div className="orbit-spin-slow">
          <div className="ring ring-dash" />
          <span className="orbit-plus" style={{ top: "2%", left: "50%" }}>
            +
          </span>
          <span className="orbit-plus" style={{ top: "72%", left: "8%" }}>
            +
          </span>
          <span className="orbit-plus" style={{ top: "28%", left: "94%" }}>
            +
          </span>
        </div>
        <div className="ring ring-equator" />
        <div className="orbit-letter display">{monogram}</div>
      </div>
    </div>
  );
}
