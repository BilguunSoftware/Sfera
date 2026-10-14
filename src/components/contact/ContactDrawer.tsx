"use client";

import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { contactFormCopy } from "@/data/story";
import { ContactForm } from "@/components/contact/ContactForm";
import { useMotion } from "@/components/providers/MotionProvider";
import { useUi } from "@/components/providers/UiProvider";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { useDialog } from "@/hooks/useDialog";

export function ContactDrawer() {
  const { contactOpen, closeContact } = useUi();
  const { enabled } = useMotion();
  const panelRef = useDialog(contactOpen, closeContact);

  return (
    <AnimatePresence>
      {contactOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/45"
            initial={enabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={enabled ? { opacity: 0 } : undefined}
            transition={{ duration: enabled ? 0.3 : 0 }}
            onClick={closeContact}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            tabIndex={-1}
            data-lenis-prevent
            className="fixed inset-y-0 right-0 z-[71] w-full max-w-[36rem] overflow-y-auto bg-paper px-6 py-6 text-ink outline-none sm:px-10 sm:py-8"
            initial={enabled ? { x: "100%" } : false}
            animate={{ x: 0 }}
            exit={enabled ? { x: "100%" } : undefined}
            transition={{ duration: enabled ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="label text-muted">
                {siteConfig.companyName} / {contactFormCopy.drawerKicker}
              </p>
              <button type="button" onClick={closeContact} className="label min-h-11 px-2">
                {contactFormCopy.close}
              </button>
            </div>
            <AccentHeading id="contact-title" lines={contactFormCopy.title} className="section-title mt-10" />
            <ContactForm />
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
