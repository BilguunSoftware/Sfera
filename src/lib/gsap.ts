"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (typeof window === "undefined") return null;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    registered = true;
  }
  return ScrollTrigger;
}

export { gsap, ScrollTrigger, useGSAP };
