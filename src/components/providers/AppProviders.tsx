"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { UiProvider } from "@/components/providers/UiProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <UiProvider>
        <SmoothScroll />
        {children}
      </UiProvider>
    </MotionProvider>
  );
}
