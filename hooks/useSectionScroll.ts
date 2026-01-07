/**
 * Custom hook for section-based scroll snapping
 * Handles smooth scrolling between page sections with snap behavior
 */

import { useEffect, useRef, RefObject } from "react";

type SectionName = "hero" | "whatYouGet" | "founder" | "faq";

interface SectionRefs {
  hero: RefObject<HTMLElement>;
  whatYouGet: RefObject<HTMLElement>;
  founder: RefObject<HTMLElement>;
  faq: RefObject<HTMLElement>;
}

interface SectionPositions {
  heroTop: number;
  heroBottom: number;
  whatYouGetTop: number;
  whatYouGetBottom: number;
  founderTop: number;
  founderBottom: number;
  faqTop: number;
  faqBottom: number;
  viewportHeight: number;
}

interface UseSectionScrollOptions {
  sectionRefs: SectionRefs;
  isAtLastSlide: boolean;
}

/**
 * Calculate positions of all sections relative to viewport
 */
function getSectionPositions(
  heroSection: HTMLElement,
  whatYouGetSection: HTMLElement,
  founderSection: HTMLElement,
  faqSection: HTMLElement
): SectionPositions {
  const heroRect = heroSection.getBoundingClientRect();
  const whatYouGetRect = whatYouGetSection.getBoundingClientRect();
  const founderRect = founderSection.getBoundingClientRect();
  const faqRect = faqSection.getBoundingClientRect();
  const scrollY = window.scrollY;

  return {
    heroTop: scrollY + heroRect.top,
    heroBottom: scrollY + heroRect.bottom,
    whatYouGetTop: scrollY + whatYouGetRect.top,
    whatYouGetBottom: scrollY + whatYouGetRect.bottom,
    founderTop: scrollY + founderRect.top,
    founderBottom: scrollY + founderRect.bottom,
    faqTop: scrollY + faqRect.top,
    faqBottom: scrollY + faqRect.bottom,
    viewportHeight: window.innerHeight,
  };
}

/**
 * Scroll to a specific section with smooth behavior
 */
function snapToSection(
  targetSection: SectionName,
  positions: SectionPositions,
  isScrollingRef: RefObject<boolean>
): void {
  if (isScrollingRef.current) return;

  isScrollingRef.current = true;

  let targetY: number;
  switch (targetSection) {
    case "hero":
      targetY = positions.heroTop;
      break;
    case "whatYouGet":
      targetY = positions.whatYouGetTop;
      break;
    case "founder":
      targetY = positions.founderTop;
      break;
    case "faq":
      targetY = positions.faqTop;
      break;
  }

  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });

  setTimeout(() => {
    isScrollingRef.current = false;
  }, 600);
}

/**
 * Handle wheel events for section transitions
 */
function createWheelHandler(
  sectionRefs: SectionRefs,
  isAtLastSlide: boolean,
  isScrollingRef: RefObject<boolean>
): (e: WheelEvent) => void {
  return (e: WheelEvent) => {
    const { hero, whatYouGet, founder, faq } = sectionRefs;
    if (!hero.current || !whatYouGet.current || !founder.current || !faq.current) return;

    const positions = getSectionPositions(
      hero.current,
      whatYouGet.current,
      founder.current,
      faq.current
    );
    const scrollY = window.scrollY;
    const currentViewportTop = scrollY;
    const currentViewportBottom = scrollY + positions.viewportHeight;

    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    // Check transition between hero and WhatYouGetSection (only when at last slide)
    if (isAtLastSlide) {
      const isInHeroWhatYouGetZone =
        currentViewportTop < positions.whatYouGetTop &&
        currentViewportBottom > positions.heroBottom;
      const isAtHeroBottom =
        Math.abs(currentViewportBottom - positions.heroBottom) < 30;
      const isAtWhatYouGetTop =
        Math.abs(currentViewportTop - positions.whatYouGetTop) < 30;

      if (
        isInHeroWhatYouGetZone ||
        (isAtHeroBottom && isScrollingDown) ||
        (isAtWhatYouGetTop && isScrollingUp)
      ) {
        e.preventDefault();
        e.stopPropagation();

        if (isInHeroWhatYouGetZone) {
          snapToSection(
            isScrollingDown ? "whatYouGet" : "hero",
            positions,
            isScrollingRef
          );
        } else if (isAtHeroBottom && isScrollingDown) {
          snapToSection("whatYouGet", positions, isScrollingRef);
        } else if (isAtWhatYouGetTop && isScrollingUp) {
          snapToSection("hero", positions, isScrollingRef);
        }
        return;
      }
    } else {
      // Not at last slide, let carousel handle horizontal scrolling
      return;
    }

    // Check if we're within WhatYouGetSection (not at boundaries)
    const isWithinWhatYouGetSection =
      currentViewportTop >= positions.whatYouGetTop &&
      currentViewportBottom <= positions.whatYouGetBottom;

    // If we're within WhatYouGetSection, allow normal scrolling
    if (isWithinWhatYouGetSection) {
      // Check if we're near the bottom and trying to scroll down
      const distanceToBottom =
        positions.whatYouGetBottom - currentViewportBottom;
      if (distanceToBottom < 30 && isScrollingDown) {
        // At bottom, scrolling down -> snap to FounderMessageSection
        e.preventDefault();
        e.stopPropagation();
        snapToSection("founder", positions, isScrollingRef);
        return;
      }
      // Otherwise allow normal scrolling within section
      return;
    }

    // Check transition between WhatYouGetSection and FounderMessageSection
    const isAtWhatYouGetBottom =
      Math.abs(currentViewportBottom - positions.whatYouGetBottom) < 30;
    const isAtFounderTop =
      Math.abs(currentViewportTop - positions.founderTop) < 30;
    const isInWhatYouGetFounderZone =
      currentViewportTop < positions.founderTop &&
      currentViewportBottom > positions.whatYouGetBottom;

    // Check if FounderMessageSection is showing when it shouldn't
    const isShowingFounderPrematurely =
      currentViewportTop < positions.founderTop &&
      currentViewportBottom > positions.whatYouGetBottom &&
      currentViewportTop < positions.whatYouGetBottom;

    // Prevent scroll if at boundaries or showing FounderMessageSection prematurely
    if (
      isInWhatYouGetFounderZone ||
      isShowingFounderPrematurely ||
      (isAtWhatYouGetBottom && isScrollingDown) ||
      (isAtFounderTop && isScrollingUp)
    ) {
      e.preventDefault();
      e.stopPropagation();

      if (isShowingFounderPrematurely) {
        // Force snap back to WhatYouGetSection
        snapToSection("whatYouGet", positions, isScrollingRef);
      } else if (isInWhatYouGetFounderZone) {
        snapToSection(
          isScrollingDown ? "founder" : "whatYouGet",
          positions,
          isScrollingRef
        );
      } else if (isAtWhatYouGetBottom && isScrollingDown) {
        snapToSection("founder", positions, isScrollingRef);
      } else if (isAtFounderTop && isScrollingUp) {
        snapToSection("whatYouGet", positions, isScrollingRef);
      }
      return;
    }

    // Check if we're within FounderMessageSection (not at boundaries)
    const isWithinFounderSection =
      currentViewportTop >= positions.founderTop &&
      currentViewportBottom <= positions.founderBottom;

    // If we're within FounderMessageSection, allow normal scrolling
    if (isWithinFounderSection) {
      // Check if we're near the bottom and trying to scroll down
      const distanceToBottom = positions.founderBottom - currentViewportBottom;
      if (distanceToBottom < 30 && isScrollingDown) {
        // At bottom, scrolling down -> snap to FAQSection
        e.preventDefault();
        e.stopPropagation();
        snapToSection("faq", positions, isScrollingRef);
        return;
      }
      // Otherwise allow normal scrolling within section
      return;
    }

    // Check transition between FounderMessageSection and FAQSection
    const isAtFounderBottom =
      Math.abs(currentViewportBottom - positions.founderBottom) < 30;
    const isAtFaqTop = Math.abs(currentViewportTop - positions.faqTop) < 30;
    const isInFounderFaqZone =
      currentViewportTop < positions.faqTop &&
      currentViewportBottom > positions.founderBottom;

    // Check if FAQSection is showing when it shouldn't
    const isShowingFaqPrematurely =
      currentViewportTop < positions.faqTop &&
      currentViewportBottom > positions.founderBottom &&
      currentViewportTop < positions.founderBottom;

    // Prevent scroll if at boundaries or showing FAQSection prematurely
    if (
      isInFounderFaqZone ||
      isShowingFaqPrematurely ||
      (isAtFounderBottom && isScrollingDown) ||
      (isAtFaqTop && isScrollingUp)
    ) {
      e.preventDefault();
      e.stopPropagation();

      if (isShowingFaqPrematurely) {
        // Force snap back to FounderMessageSection
        snapToSection("founder", positions, isScrollingRef);
      } else if (isInFounderFaqZone) {
        snapToSection(
          isScrollingDown ? "faq" : "founder",
          positions,
          isScrollingRef
        );
      } else if (isAtFounderBottom && isScrollingDown) {
        snapToSection("faq", positions, isScrollingRef);
      } else if (isAtFaqTop && isScrollingUp) {
        snapToSection("founder", positions, isScrollingRef);
      }
      return;
    }

    // Check if we're within FAQSection (normal scrolling allowed)
    const isWithinFaqSection =
      currentViewportTop >= positions.faqTop &&
      currentViewportBottom <= positions.faqBottom;

    // If within FAQSection, allow normal scrolling
    if (isWithinFaqSection) {
      return;
    }
  };
}

/**
 * Handle scroll events to enforce complete snap
 */
function createScrollHandler(
  sectionRefs: SectionRefs,
  isAtLastSlide: boolean,
  isScrollingRef: RefObject<boolean>
): () => void {
  return () => {
    if (isScrollingRef.current) return;

    const { hero, whatYouGet, founder, faq } = sectionRefs;
    if (!hero.current || !whatYouGet.current || !founder.current || !faq.current) return;

    const positions = getSectionPositions(
      hero.current,
      whatYouGet.current,
      founder.current,
      faq.current
    );
    const scrollY = window.scrollY;
    const currentViewportTop = scrollY;
    const currentViewportBottom = scrollY + positions.viewportHeight;

    // Check transition between hero and WhatYouGetSection (only when at last slide)
    if (isAtLastSlide) {
      const isBetweenHeroWhatYouGet =
        currentViewportTop < positions.whatYouGetTop &&
        currentViewportBottom > positions.heroBottom;

      if (isBetweenHeroWhatYouGet) {
        const heroVisibleHeight = Math.max(
          0,
          positions.heroBottom - currentViewportTop
        );
        const whatYouGetVisibleHeight = Math.max(
          0,
          currentViewportBottom - positions.whatYouGetTop
        );

        if (heroVisibleHeight > whatYouGetVisibleHeight + 10) {
          snapToSection("hero", positions, isScrollingRef);
        } else if (whatYouGetVisibleHeight > heroVisibleHeight + 10) {
          snapToSection("whatYouGet", positions, isScrollingRef);
        }
        return;
      }
    }

    // Check if we're within WhatYouGetSection (normal scrolling allowed)
    const isWithinWhatYouGetSection =
      currentViewportTop >= positions.whatYouGetTop &&
      currentViewportBottom <= positions.whatYouGetBottom;

    // If within WhatYouGetSection, don't enforce snap (allow normal scrolling)
    if (isWithinWhatYouGetSection) {
      return;
    }

    // Check if FounderMessageSection is showing when it shouldn't
    const isShowingFounderPrematurely =
      currentViewportTop < positions.founderTop &&
      currentViewportBottom > positions.whatYouGetBottom &&
      currentViewportTop < positions.whatYouGetBottom;

    if (isShowingFounderPrematurely) {
      // Force snap back to WhatYouGetSection
      snapToSection("whatYouGet", positions, isScrollingRef);
      return;
    }

    // Check transition between WhatYouGetSection and FounderMessageSection (at boundaries only)
    const isBetweenWhatYouGetFounder =
      currentViewportTop < positions.founderTop &&
      currentViewportBottom > positions.whatYouGetBottom;

    if (isBetweenWhatYouGetFounder) {
      const whatYouGetVisibleHeight = Math.max(
        0,
        positions.whatYouGetBottom - currentViewportTop
      );
      const founderVisibleHeight = Math.max(
        0,
        currentViewportBottom - positions.founderTop
      );

      // Use threshold for smooth transitions
      if (whatYouGetVisibleHeight > founderVisibleHeight + 15) {
        snapToSection("whatYouGet", positions, isScrollingRef);
      } else if (founderVisibleHeight > whatYouGetVisibleHeight + 15) {
        snapToSection("founder", positions, isScrollingRef);
      }
    }

    // Check if we're within FounderMessageSection (normal scrolling allowed)
    const isWithinFounderSection =
      currentViewportTop >= positions.founderTop &&
      currentViewportBottom <= positions.founderBottom;

    // If within FounderMessageSection, don't enforce snap (allow normal scrolling)
    if (isWithinFounderSection) {
      return;
    }

    // Check if FAQSection is showing when it shouldn't
    const isShowingFaqPrematurely =
      currentViewportTop < positions.faqTop &&
      currentViewportBottom > positions.founderBottom &&
      currentViewportTop < positions.founderBottom;

    if (isShowingFaqPrematurely) {
      // Force snap back to FounderMessageSection
      snapToSection("founder", positions, isScrollingRef);
      return;
    }

    // Check transition between FounderMessageSection and FAQSection (at boundaries only)
    const isBetweenFounderFaq =
      currentViewportTop < positions.faqTop &&
      currentViewportBottom > positions.founderBottom;

    if (isBetweenFounderFaq) {
      const founderVisibleHeight = Math.max(
        0,
        positions.founderBottom - currentViewportTop
      );
      const faqVisibleHeight = Math.max(
        0,
        currentViewportBottom - positions.faqTop
      );

      // Use threshold for smooth transitions
      if (founderVisibleHeight > faqVisibleHeight + 15) {
        snapToSection("founder", positions, isScrollingRef);
      } else if (faqVisibleHeight > founderVisibleHeight + 15) {
        snapToSection("faq", positions, isScrollingRef);
      }
    }

    // Check if we're within FAQSection (normal scrolling allowed)
    const isWithinFaqSection =
      currentViewportTop >= positions.faqTop &&
      currentViewportBottom <= positions.faqBottom;

    // If within FAQSection, don't enforce snap (allow normal scrolling)
    if (isWithinFaqSection) {
      return;
    }
  };
}

/**
 * Custom hook for section-based scroll snapping
 */
export function useSectionScroll({
  sectionRefs,
  isAtLastSlide,
}: UseSectionScrollOptions): void {
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const { hero, whatYouGet, founder, faq } = sectionRefs;

    if (!hero.current || !whatYouGet.current || !founder.current || !faq.current) {
      return;
    }

    const handleWheel = createWheelHandler(
      sectionRefs,
      isAtLastSlide,
      isScrollingRef
    );
    const handleScroll = createScrollHandler(
      sectionRefs,
      isAtLastSlide,
      isScrollingRef
    );

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRefs, isAtLastSlide]);
}

