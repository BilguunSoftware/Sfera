"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getLenis } from "@/lib/scroll";

type UiContextValue = {
  menuOpen: boolean;
  contactOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openContact: () => void;
  closeContact: () => void;
};

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const openMenu = useCallback(() => {
    setContactOpen(false);
    setMenuOpen(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => {
      const next = !open;
      if (next) setContactOpen(false);
      return next;
    });
  }, []);

  const openContact = useCallback(() => {
    setMenuOpen(false);
    setContactOpen(true);
  }, []);

  useEffect(() => {
    const locked = menuOpen || contactOpen;
    const shell = document.getElementById("page-shell");
    const lenis = getLenis();

    if (!locked) return;

    shell?.setAttribute("inert", "");
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      shell?.removeAttribute("inert");
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [menuOpen, contactOpen]);

  const value = useMemo(
    () => ({
      menuOpen,
      contactOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      openContact,
      closeContact,
    }),
    [menuOpen, contactOpen, openMenu, closeMenu, toggleMenu, openContact, closeContact],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within UiProvider");
  return context;
}
