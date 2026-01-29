"use client";

import HeroSection from "@/components/features/waitlist/HeroSection";
import WhyDinkLifeSection from "@/components/sections/WhyDinkLifeSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        type="application/ld+json"
      />

      <div className="bg-white">
        {/* Hero Section - Full viewport */}
        <section className="h-screen w-full">
          <HeroSection />
        </section>

        {/* Why DINKLife Section */}
        <section className="min-h-screen w-full">
          <WhyDinkLifeSection />
        </section>

        {/* What You Get Section */}
        <section className="min-h-screen w-full">
          <WhatYouGetSection />
        </section>

        {/* Testimonials Section */}
        <section className="min-h-screen w-full">
          <TestimonialsSection />
        </section>

        {/* FAQ Section */}
        <section className="min-h-screen w-full">
          <FAQSection />
        </section>

        {/* Founder Message Section */}
        <section className="min-h-screen w-full">
          <FounderMessageSection />
        </section>
      </div>
    </>
  );
}
