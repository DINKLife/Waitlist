"use client";

import { useRef } from "react";
import HeroSection from "@/components/features/waitlist/HeroSection";
import WhyDinkLifeSection from "@/components/sections/WhyDinkLifeSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import FounderMessageSection from "@/components/sections/FounderMessageSection";
import FAQSection from "@/components/sections/FAQSection";
import { useHeroCarousel } from "@/contexts/HeroCarouselContext";
import { HERO_SLIDES } from "@/constants/hero-slides";
import { siteConfig } from "@/config/site";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import {
  getOrganizationStructuredData,
  getFAQStructuredData,
} from "@/lib/seo/structured-data";

// Structured Data for SEO
const structuredData = getOrganizationStructuredData();
const faqStructuredData = getFAQStructuredData();

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const whatYouGetSectionRef = useRef<HTMLElement>(null);
  const founderSectionRef = useRef<HTMLElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const { currentSlide } = useHeroCarousel();
  const totalSlides = HERO_SLIDES.length;
  const isAtLastSlide = currentSlide === totalSlides - 1;

  // Use custom hook for section scroll behavior
  useSectionScroll({
    sectionRefs: {
      hero: heroSectionRef,
      whatYouGet: whatYouGetSectionRef,
      founder: founderSectionRef,
      faq: faqSectionRef,
    },
    isAtLastSlide,
  });

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
