"use client";

import { useEffect, useRef } from "react";
import HeroSection from "@/components/features/waitlist/HeroSection";
import WhyDinkLifeSection from "@/components/sections/WhyDinkLifeSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import FounderMessageSection from "@/components/sections/FounderMessageSection";
import FAQSection from "@/components/sections/FAQSection";
import { useHeroCarousel } from "@/contexts/HeroCarouselContext";
import { HERO_SLIDES } from "@/constants/hero-slides";
import { siteConfig } from "@/config/site";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  founder: {
    "@type": "Person",
    name: siteConfig.author,
  },
  audience: {
    "@type": "Audience",
    audienceType: "DINK Couples (Dual Income No Kids)",
  },
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.instagram,
    siteConfig.links.linkedin,
    siteConfig.links.facebook,
    siteConfig.links.discord,
    siteConfig.links.youtube,
  ],
  potentialAction: {
    "@type": "JoinAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}?ref=waitlist`,
    },
    name: "Join DINKLife Waitlist",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is DINKLife?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DINKLife is a platform designed exclusively for DINK (Dual Income No Kids) couples. It provides tools, resources, and a community tailored for couples living the DINK lifestyle.",
      },
    },
    {
      "@type": "Question",
      name: "What do I get by joining the waitlist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you join the waitlist, you'll receive: The 7-Day Nervous System Reset guide (free), Early access to the DINKLife community as a founding member, Behind-the-scenes updates, and Founder-only pricing with lifetime discounted access.",
      },
    },
    {
      "@type": "Question",
      name: "Is joining the waitlist free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Joining the waitlist is completely free. You'll get the 7-Day Nervous System Reset guide immediately, and there's no obligation to purchase anything.",
      },
    },
    {
      "@type": "Question",
      name: "What is a DINK couple?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DINK stands for Dual Income No Kids. DINK couples are partners who both work and have chosen not to have children, allowing them to focus on their careers, relationships, and personal growth.",
      },
    },
  ],
};

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const whatYouGetSectionRef = useRef<HTMLElement>(null);
  const founderSectionRef = useRef<HTMLElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const { currentSlide } = useHeroCarousel();
  const totalSlides = HERO_SLIDES.length;
  const isAtLastSlide = currentSlide === totalSlides - 1;
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const whatYouGetSection = whatYouGetSectionRef.current;
    const founderSection = founderSectionRef.current;
    const faqSection = faqSectionRef.current;

    if (!heroSection || !whatYouGetSection || !founderSection || !faqSection) return;

    // Get section positions
    const getSectionPositions = () => {
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
    };

    // Snap to complete section
    const snapToSection = (targetSection: 'hero' | 'whatYouGet' | 'founder' | 'faq') => {
      if (isScrollingRef.current) return;

      isScrollingRef.current = true;
      const positions = getSectionPositions();

      let targetY: number;
      if (targetSection === 'hero') {
        targetY = positions.heroTop;
      } else if (targetSection === 'whatYouGet') {
        targetY = positions.whatYouGetTop;
      } else if (targetSection === 'founder') {
        targetY = positions.founderTop;
      } else {
        targetY = positions.faqTop;
      }

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    // Handle wheel events - complete transfers between sections
    const handleWheel = (e: WheelEvent) => {
      const positions = getSectionPositions();
      const scrollY = window.scrollY;
      const currentViewportTop = scrollY;
      const currentViewportBottom = scrollY + positions.viewportHeight;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Check transition between hero and WhatYouGetSection (only when at last slide)
      if (isAtLastSlide) {
        const isInHeroWhatYouGetZone = currentViewportTop < positions.whatYouGetTop && currentViewportBottom > positions.heroBottom;
        const isAtHeroBottom = Math.abs(currentViewportBottom - positions.heroBottom) < 30;
        const isAtWhatYouGetTop = Math.abs(currentViewportTop - positions.whatYouGetTop) < 30;

        if (isInHeroWhatYouGetZone || (isAtHeroBottom && isScrollingDown) || (isAtWhatYouGetTop && isScrollingUp)) {
          e.preventDefault();
          e.stopPropagation();

          if (isInHeroWhatYouGetZone) {
            snapToSection(isScrollingDown ? 'whatYouGet' : 'hero');
          } else if (isAtHeroBottom && isScrollingDown) {
            snapToSection('whatYouGet');
          } else if (isAtWhatYouGetTop && isScrollingUp) {
            snapToSection('hero');
          }
          return;
        }
      } else {
        // Not at last slide, let carousel handle horizontal scrolling
        return;
      }

      // Check if we're within WhatYouGetSection (not at boundaries)
      const isWithinWhatYouGetSection = currentViewportTop >= positions.whatYouGetTop &&
        currentViewportBottom <= positions.whatYouGetBottom;

      // If we're within WhatYouGetSection, allow normal scrolling
      if (isWithinWhatYouGetSection) {
        // Check if we're near the bottom and trying to scroll down
        const distanceToBottom = positions.whatYouGetBottom - currentViewportBottom;
        if (distanceToBottom < 30 && isScrollingDown) {
          // At bottom, scrolling down -> snap to FounderMessageSection
          e.preventDefault();
          e.stopPropagation();
          snapToSection('founder');
          return;
        }
        // Otherwise allow normal scrolling within section
        return;
      }

      // Check transition between WhatYouGetSection and FounderMessageSection
      const isAtWhatYouGetBottom = Math.abs(currentViewportBottom - positions.whatYouGetBottom) < 30;
      const isAtFounderTop = Math.abs(currentViewportTop - positions.founderTop) < 30;
      const isInWhatYouGetFounderZone = currentViewportTop < positions.founderTop && currentViewportBottom > positions.whatYouGetBottom;

      // Check if FounderMessageSection is showing when it shouldn't (scrolling from hero/WhatYouGetSection top)
      const isShowingFounderPrematurely = currentViewportTop < positions.founderTop &&
        currentViewportBottom > positions.whatYouGetBottom &&
        currentViewportTop < positions.whatYouGetBottom;

      // Prevent scroll if at boundaries or showing FounderMessageSection prematurely
      if (isInWhatYouGetFounderZone || isShowingFounderPrematurely || (isAtWhatYouGetBottom && isScrollingDown) || (isAtFounderTop && isScrollingUp)) {
        e.preventDefault();
        e.stopPropagation();

        if (isShowingFounderPrematurely) {
          // Force snap back to WhatYouGetSection
          snapToSection('whatYouGet');
        } else if (isInWhatYouGetFounderZone) {
          snapToSection(isScrollingDown ? 'founder' : 'whatYouGet');
        } else if (isAtWhatYouGetBottom && isScrollingDown) {
          snapToSection('founder');
        } else if (isAtFounderTop && isScrollingUp) {
          snapToSection('whatYouGet');
        }
        return;
      }

      // Check if we're within FounderMessageSection (not at boundaries)
      const isWithinFounderSection = currentViewportTop >= positions.founderTop &&
        currentViewportBottom <= positions.founderBottom;

      // If we're within FounderMessageSection, allow normal scrolling
      if (isWithinFounderSection) {
        // Check if we're near the bottom and trying to scroll down
        const distanceToBottom = positions.founderBottom - currentViewportBottom;
        if (distanceToBottom < 30 && isScrollingDown) {
          // At bottom, scrolling down -> snap to FAQSection
          e.preventDefault();
          e.stopPropagation();
          snapToSection('faq');
          return;
        }
        // Otherwise allow normal scrolling within section
        return;
      }

      // Check transition between FounderMessageSection and FAQSection
      const isAtFounderBottom = Math.abs(currentViewportBottom - positions.founderBottom) < 30;
      const isAtFaqTop = Math.abs(currentViewportTop - positions.faqTop) < 30;
      const isInFounderFaqZone = currentViewportTop < positions.faqTop && currentViewportBottom > positions.founderBottom;

      // Check if FAQSection is showing when it shouldn't (scrolling from FounderMessageSection top)
      const isShowingFaqPrematurely = currentViewportTop < positions.faqTop &&
        currentViewportBottom > positions.founderBottom &&
        currentViewportTop < positions.founderBottom;

      // Prevent scroll if at boundaries or showing FAQSection prematurely
      if (isInFounderFaqZone || isShowingFaqPrematurely || (isAtFounderBottom && isScrollingDown) || (isAtFaqTop && isScrollingUp)) {
        e.preventDefault();
        e.stopPropagation();

        if (isShowingFaqPrematurely) {
          // Force snap back to FounderMessageSection
          snapToSection('founder');
        } else if (isInFounderFaqZone) {
          snapToSection(isScrollingDown ? 'faq' : 'founder');
        } else if (isAtFounderBottom && isScrollingDown) {
          snapToSection('faq');
        } else if (isAtFaqTop && isScrollingUp) {
          snapToSection('founder');
        }
        return;
      }

      // Check if we're within FAQSection (normal scrolling allowed)
      const isWithinFaqSection = currentViewportTop >= positions.faqTop &&
        currentViewportBottom <= positions.faqBottom;

      // If within FAQSection, allow normal scrolling
      if (isWithinFaqSection) {
        return;
      }

      // Allow normal scrolling within sections
    };

    // Handle scroll events to enforce complete snap
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const positions = getSectionPositions();
      const scrollY = window.scrollY;
      const currentViewportTop = scrollY;
      const currentViewportBottom = scrollY + positions.viewportHeight;

      // Check transition between hero and WhatYouGetSection (only when at last slide)
      if (isAtLastSlide) {
        const isBetweenHeroWhatYouGet = currentViewportTop < positions.whatYouGetTop && currentViewportBottom > positions.heroBottom;

        if (isBetweenHeroWhatYouGet) {
          const heroVisibleHeight = Math.max(0, positions.heroBottom - currentViewportTop);
          const whatYouGetVisibleHeight = Math.max(0, currentViewportBottom - positions.whatYouGetTop);

          if (heroVisibleHeight > whatYouGetVisibleHeight + 10) {
            snapToSection('hero');
          } else if (whatYouGetVisibleHeight > heroVisibleHeight + 10) {
            snapToSection('whatYouGet');
          }
          return;
        }
      }

      // Check if we're within WhatYouGetSection (normal scrolling allowed)
      const isWithinWhatYouGetSection = currentViewportTop >= positions.whatYouGetTop &&
        currentViewportBottom <= positions.whatYouGetBottom;

      // If within WhatYouGetSection, don't enforce snap (allow normal scrolling)
      if (isWithinWhatYouGetSection) {
        return;
      }

      // Check if FounderMessageSection is showing when it shouldn't
      const isShowingFounderPrematurely = currentViewportTop < positions.founderTop &&
        currentViewportBottom > positions.whatYouGetBottom &&
        currentViewportTop < positions.whatYouGetBottom;

      if (isShowingFounderPrematurely) {
        // Force snap back to WhatYouGetSection
        snapToSection('whatYouGet');
        return;
      }

      // Check transition between WhatYouGetSection and FounderMessageSection (at boundaries only)
      const isBetweenWhatYouGetFounder = currentViewportTop < positions.founderTop && currentViewportBottom > positions.whatYouGetBottom;

      if (isBetweenWhatYouGetFounder) {
        const whatYouGetVisibleHeight = Math.max(0, positions.whatYouGetBottom - currentViewportTop);
        const founderVisibleHeight = Math.max(0, currentViewportBottom - positions.founderTop);

        // Use threshold for smooth transitions
        if (whatYouGetVisibleHeight > founderVisibleHeight + 15) {
          snapToSection('whatYouGet');
        } else if (founderVisibleHeight > whatYouGetVisibleHeight + 15) {
          snapToSection('founder');
        }
      }

      // Check if we're within FounderMessageSection (normal scrolling allowed)
      const isWithinFounderSection = currentViewportTop >= positions.founderTop &&
        currentViewportBottom <= positions.founderBottom;

      // If within FounderMessageSection, don't enforce snap (allow normal scrolling)
      if (isWithinFounderSection) {
        return;
      }

      // Check if FAQSection is showing when it shouldn't
      const isShowingFaqPrematurely = currentViewportTop < positions.faqTop &&
        currentViewportBottom > positions.founderBottom &&
        currentViewportTop < positions.founderBottom;

      if (isShowingFaqPrematurely) {
        // Force snap back to FounderMessageSection
        snapToSection('founder');
        return;
      }

      // Check transition between FounderMessageSection and FAQSection (at boundaries only)
      const isBetweenFounderFaq = currentViewportTop < positions.faqTop && currentViewportBottom > positions.founderBottom;

      if (isBetweenFounderFaq) {
        const founderVisibleHeight = Math.max(0, positions.founderBottom - currentViewportTop);
        const faqVisibleHeight = Math.max(0, currentViewportBottom - positions.faqTop);

        // Use threshold for smooth transitions
        if (founderVisibleHeight > faqVisibleHeight + 15) {
          snapToSection('founder');
        } else if (faqVisibleHeight > founderVisibleHeight + 15) {
          snapToSection('faq');
        }
      }

      // Check if we're within FAQSection (normal scrolling allowed)
      const isWithinFaqSection = currentViewportTop >= positions.faqTop &&
        currentViewportBottom <= positions.faqBottom;

      // If within FAQSection, don't enforce snap (allow normal scrolling)
      if (isWithinFaqSection) {
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAtLastSlide]);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="bg-white">
        {/* Hero Section - Full viewport */}
        <section ref={heroSectionRef} className="h-screen w-full">
          <HeroSection />
        </section>

        {/* <WhyDinkLifeSection /> */}

        {/* What You Get Section */}
        <section ref={whatYouGetSectionRef} className="min-h-screen w-full">
          <WhatYouGetSection />
        </section>

        {/* Founder Message Section */}
        <section ref={founderSectionRef} className="min-h-screen w-full">
          <FounderMessageSection />
        </section>

        {/* FAQ Section */}
        <section ref={faqSectionRef} className="min-h-screen w-full">
          <FAQSection />
        </section>
      </div>
    </>
  );
}
