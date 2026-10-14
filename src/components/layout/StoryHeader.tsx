"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { headerNav } from "@/data/navigation";
import { MotionToggle } from "@/components/interactions/MotionToggle";
import { useUi } from "@/components/providers/UiProvider";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export function StoryHeader({ activeId }: { activeId: string }) {
  const { openContact, toggleMenu, menuOpen } = useUi();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 order-1 border-b border-line bg-paper lg:order-none",
        scrolled && "bg-paper/88 backdrop-blur-md",
      )}
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:px-5 lg:h-16 lg:gap-4 lg:px-6 xl:px-8">
        <p className="flex min-w-0 items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span className="display text-[1.05rem] tracking-[-0.04em] text-ink lg:hidden">{siteConfig.logoText}</span>
          <span className="label hidden whitespace-nowrap text-ink lg:inline 2xl:hidden">{siteConfig.logoText}</span>
          <span className="label hidden whitespace-nowrap tracking-[0.14em]! text-ink 2xl:inline">
            {siteConfig.headerEyebrow}
          </span>
        </p>

        <nav className="ml-auto hidden shrink-0 items-center gap-x-3 lg:flex xl:gap-x-5" aria-label="Үндсэн цэс">
          {headerNav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="nav-link label inline-flex min-h-11 items-center whitespace-nowrap px-0.5 text-[10px] leading-none tracking-[0.08em]! text-ink xl:tracking-[0.14em]!"
              aria-current={activeId === item.id ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToId(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:ml-0 lg:block">
          <MotionToggle />
        </div>

        <button
          type="button"
          onClick={openContact}
          aria-current={activeId === "contact" ? "page" : undefined}
          className={cn(
            "group label ml-auto hidden min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border border-ink px-3 text-[10px] tracking-[0.12em]! transition-colors duration-300 hover:bg-ink hover:text-paper lg:ml-0 lg:inline-flex",
            activeId === "contact" ? "bg-ink text-paper" : "text-ink",
          )}
          aria-label="Холбоо барих"
        >
          <span>{siteConfig.talkLabel}</span>
          <AnimatedArrow />
        </button>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label="Цэс нээх"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
