"use client";

import { BrandCanvas } from "@/components/layout/BrandCanvas";
import { Footer } from "@/components/layout/Footer";
import { MobileChapterBar } from "@/components/layout/MobileChapterBar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { StoryHeader } from "@/components/layout/StoryHeader";
import { Capabilities } from "@/components/chapters/Capabilities";
import { CompanyDNA } from "@/components/chapters/CompanyDNA";
import { ContactChapter } from "@/components/chapters/ContactChapter";
import { OurApproach } from "@/components/chapters/OurApproach";
import { Overview } from "@/components/chapters/Overview";
import { PeopleCulture } from "@/components/chapters/PeopleCulture";
import { ContactDrawer } from "@/components/contact/ContactDrawer";
import { IntroLoader } from "@/components/interactions/IntroLoader";
import { ScrollProgress } from "@/components/interactions/ScrollProgress";
import { chapterIdList, chapters } from "@/data/chapters";
import { useActiveChapter } from "@/hooks/useActiveChapter";

export function SplitLayout() {
  const activeIndex = useActiveChapter(chapterIdList);
  const chapter = chapters[activeIndex] ?? chapters[0];

  return (
    <>
      <IntroLoader />
      <ScrollProgress />
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      >
        Агуулга руу очих
      </a>
      <div
        id="page-shell"
        className="flex min-h-dvh flex-col lg:grid lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] xl:grid-cols-[minmax(0,43fr)_minmax(0,57fr)]"
      >
        <BrandCanvas chapter={chapter} />
        <div className="contents lg:block lg:min-w-0">
          <StoryHeader activeId={chapter.id} />
          <main id="story" className="order-3 min-w-0 pb-16 lg:order-none lg:pb-0">
            <Overview />
            <CompanyDNA />
            <Capabilities />
            <PeopleCulture />
            <OurApproach />
            <ContactChapter />
          </main>
          <Footer />
        </div>
      </div>
      <MobileChapterBar chapter={chapter} index={activeIndex} />
      <MobileNavigation activeId={chapter.id} />
      <ContactDrawer />
    </>
  );
}
