"use client";

import HeroSection from "@/components/features/waitlist/HeroSection";
import WhyDinkLifeSection from "@/components/sections/WhyDinkLifeSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import FounderMessageSection from "@/components/sections/FounderMessageSection";
import FAQSection from "@/components/sections/FAQSection";
import {
  getOrganizationStructuredData,
  getFAQStructuredData,
} from "@/lib/seo/structured-data";

// Structured Data for SEO
const structuredData = getOrganizationStructuredData();
const faqStructuredData = getFAQStructuredData();

export default function Home() {
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
        <section className="h-screen w-full">
          <HeroSection />
        </section>

        {/* <WhyDinkLifeSection /> */}

        {/* What You Get Section */}
        <section className="min-h-screen w-full">
          <WhatYouGetSection />
        </section>

        {/* Founder Message Section */}
        <section className="min-h-screen w-full">
          <FounderMessageSection />
        </section>

        {/* FAQ Section */}
        <section className="min-h-screen w-full">
          <FAQSection />
        </section>
      </div>
    </>
  );
}
