"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { headerNav } from "@/data/navigation";
import { MotionToggle } from "@/components/interactions/MotionToggle";
import { useMotion } from "@/components/providers/MotionProvider";
import { useUi } from "@/components/providers/UiProvider";
import { useDialog } from "@/hooks/useDialog";
import { scrollToId } from "@/lib/scroll";

export function MobileNavigation({ activeId }: { activeId: string }) {
  const { menuOpen, closeMenu, openContact } = useUi();
  const { enabled } = useMotion();
  const panelRef = useDialog(menuOpen, closeMenu);

  return (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Цэс"
          tabIndex={-1}
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex flex-col bg-paper px-6 py-5 text-ink outline-none"
          initial={enabled ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={enabled ? { opacity: 0, y: 12 } : undefined}
          transition={{ duration: enabled ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between">
            <p className="display text-2xl">
              {siteConfig.logoText}
              <span className="text-accent">{siteConfig.logoMark}</span>
            </p>
            <button type="button" onClick={closeMenu} className="inline-flex min-h-11 items-center gap-2 label">
              Хаах
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mt-12 flex flex-col" aria-label="Үндсэн цэс">
            {headerNav.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={activeId === item.id ? "page" : undefined}
                className="flex items-baseline justify-between border-t border-line py-5"
                onClick={(event) => {
                  event.preventDefault();
                  closeMenu();
                  scrollToId(item.id);
                }}
              >
                <span className="display text-[clamp(2rem,8vw,3rem)]">{item.label}</span>
                <span className="label text-muted">0{index}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto flex items-center justify-between border-t border-line pt-6">
            <MotionToggle />
            <button
              type="button"
              className="label min-h-11 border border-ink px-4"
              onClick={openContact}
            >
              {siteConfig.talkLabel} ↗
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
