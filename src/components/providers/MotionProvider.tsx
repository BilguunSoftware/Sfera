"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "sfera-motion";
const CHANGE_EVENT = "sfera-motion-change";

let clientReady = false;

function subscribeReady(onStoreChange: () => void) {
  const frame = requestAnimationFrame(() => {
    clientReady = true;
    onStoreChange();
  });
  return () => cancelAnimationFrame(frame);
}

function getReadySnapshot() {
  return clientReady;
}

function getServerReadySnapshot() {
  return false;
}

function subscribeMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  media.addEventListener("change", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    media.removeEventListener("change", onStoreChange);
  };
}

function readMotionPreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "on") return true;
    if (stored === "off") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
}

type MotionContextValue = {
  enabled: boolean;
  ready: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribeMotion, readMotionPreference, () => true);
  const ready = useSyncExternalStore(subscribeReady, getReadySnapshot, getServerReadySnapshot);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled, ready]);

  const toggle = useCallback(() => {
    const next = !readMotionPreference();
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const value = useMemo(() => ({ enabled, ready, toggle }), [enabled, ready, toggle]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within MotionProvider");
  }
  return context;
}
