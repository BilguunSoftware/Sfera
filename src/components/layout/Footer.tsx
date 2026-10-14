"use client";

import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation";
import { useMotion } from "@/components/providers/MotionProvider";
import { duration, ease } from "@/lib/animations";
import { ensureGsap, gsap, useGSAP } from "@/lib/gsap";
import { scrollToId } from "@/lib/scroll";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const { enabled, ready } = useMotion();
  const hasContact = Boolean(siteConfig.email || siteConfig.phone || siteConfig.address);

  useGSAP(
    () => {
      if (!ensureGsap() || !ready || !enabled) return;
      gsap.from("[data-wordmark]", {
        yPercent: 30,
        opacity: 0,
        duration: duration.reveal,
        ease: ease.out,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [ready, enabled], revertOnUpdate: true },
  );

  return (
    <footer ref={rootRef} className="order-4 bg-footer px-5 py-16 pb-28 text-paper sm:px-8 lg:order-none lg:px-12 lg:pt-20 lg:pb-14 xl:px-16">
      <p data-wordmark className="display text-[clamp(4rem,12vw,7.5rem)] leading-[0.82] tracking-[-0.06em]">
        {siteConfig.logoText}
        <span className="text-accent">{siteConfig.logoMark}</span>
      </p>
      <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-white/60">
        {siteConfig.tagline.toUpperCase()}.
      </p>
      {siteConfig.industry ? (
        <p className="label mt-3 text-white/40">{siteConfig.industry}</p>
      ) : null}

      <div className="mt-12 grid gap-10 border-t border-white/12 pt-8 sm:grid-cols-2">
        <nav aria-label="Хөлний цэс" className="flex flex-col items-start gap-3">
          {footerNav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-white/80 transition-colors hover:text-paper"
              onClick={(event) => {
                event.preventDefault();
                scrollToId(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {hasContact ? (
          <div className="space-y-2 text-sm text-white/75">
            {siteConfig.email ? (
              <a className="block hover:text-paper" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            ) : null}
            {siteConfig.phone ? (
              <a className="block hover:text-paper" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                {siteConfig.phone}
              </a>
            ) : null}
            {siteConfig.address ? <p>{siteConfig.address}</p> : null}
            {siteConfig.socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3">
                {siteConfig.socialLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener" className="label text-white/70 hover:text-paper">
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-white/12 pt-6 font-mono text-[10px] tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {siteConfig.year} {siteConfig.companyName}
        </p>
        {siteConfig.studio.url ? (
          <a href={siteConfig.studio.url} target="_blank" rel="noreferrer noopener" className="hover:text-paper">
            WEBSITE BY {siteConfig.studio.name.toUpperCase()} ↗
          </a>
        ) : (
          <span>WEBSITE BY {siteConfig.studio.name.toUpperCase()} ↗</span>
        )}
      </div>
    </footer>
  );
}
