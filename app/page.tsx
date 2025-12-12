import HeroSection from "@/components/features/waitlist/HeroSection";
import WhyDinkLifeSection from "@/components/sections/WhyDinkLifeSection";
import WhatYouGetSection from "@/components/sections/WhatYouGetSection";
import FounderMessageSection from "@/components/sections/FounderMessageSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      {/* <WhyDinkLifeSection /> */}
      <WhatYouGetSection />
      <FounderMessageSection />
      <FAQSection />
    </div>
  );
}
