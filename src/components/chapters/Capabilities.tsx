"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getChapter } from "@/data/chapters";
import { media } from "@/data/media";
import { services } from "@/data/services";
import { capabilitiesStory } from "@/data/story";
import { ImageReveal } from "@/components/interactions/ImageReveal";
import { TextReveal } from "@/components/interactions/TextReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export function Capabilities() {
  const chapter = getChapter("capabilities");
  const [openId, setOpenId] = useState(services[0]?.id ?? "");

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = services.findIndex((service) => service.id === openId);
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const nextIndex =
      event.key === "ArrowDown"
        ? (Math.max(index, 0) + 1) % services.length
        : (Math.max(index, 0) - 1 + services.length) % services.length;
    const next = services[nextIndex];
    setOpenId(next.id);
    document.getElementById(`service-tab-${next.id}`)?.focus();
  };

  return (
    <section id={chapter.id} className="chapter bg-paper">
      <SectionLabel>{capabilitiesStory.label}</SectionLabel>
      <p className="label mt-6 text-ink">{capabilitiesStory.overline}</p>
      <TextReveal lines={capabilitiesStory.headline} className="section-title mt-5 max-w-[14ch]" />
      <p className="prose-copy mt-6 text-ink/80">{capabilitiesStory.description}</p>

      {services.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Үйлчилгээний мэдээлэл тохируулаагүй байна.</p>
      ) : (
        <div className="mt-12 border-t border-line" onKeyDown={onKeyDown}>
          {services.map((service) => {
            const open = service.id === openId;
            return (
              <div key={service.id} className="border-b border-line">
                <h3 className="m-0">
                  <button
                    id={`service-tab-${service.id}`}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`service-panel-${service.id}`}
                    onClick={() => setOpenId(open ? "" : service.id)}
                    className="flex w-full items-center gap-4 py-6 text-left sm:gap-6"
                  >
                    <span className={cn("label w-8 shrink-0", open ? "text-accent" : "text-muted")}>{service.number}</span>
                    <span className="display flex-1 text-[clamp(1.35rem,2.3vw,2.15rem)]">{service.title}</span>
                    <span className="label hidden text-muted md:block">{service.englishLabel}</span>
                    <ChevronDown
                      aria-hidden
                      className={cn("chevron shrink-0 transition-transform duration-300", open && "rotate-180")}
                      size={18}
                      strokeWidth={1.5}
                    />
                  </button>
                </h3>
                <div
                  id={`service-panel-${service.id}`}
                  role="region"
                  aria-labelledby={`service-tab-${service.id}`}
                  aria-hidden={!open}
                  data-open={open}
                  className="expand-panel"
                >
                  <div className="overflow-hidden">
                    <div className="grid items-start gap-6 pb-8 md:grid-cols-[1.15fr_0.85fr]">
                      <div>
                        <p className="label text-accent md:hidden">{service.englishLabel}</p>
                        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/80 md:mt-0">
                          {service.description}
                        </p>
                      </div>
                      <div className="service-photo relative aspect-[16/10] overflow-hidden bg-[#ddd9d0]">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 24vw, 100vw"
                          className="object-cover"
                          style={{ objectPosition: service.imagePosition }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <figure className="group mt-14">
        <ImageReveal
          src={media.capabilities.src}
          alt={media.capabilities.alt}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="aspect-[16/8] w-full"
        />
        <figcaption className="mt-3 label text-ink">
          {media.capabilities.caption} <span aria-hidden>↗</span>
        </figcaption>
      </figure>
    </section>
  );
}
