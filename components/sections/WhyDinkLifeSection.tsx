"use client";

import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const pillars = [
  {
    id: "ai",
    title: "AI-forward planning",
    description:
      "A concierge-like co-pilot that removes friction from travel, wellness, and community decisions.",
  },
  {
    id: "community",
    title: "People who get it",
    description:
      "Match with DINK members who share your pace, priorities, and season of life.",
  },
  {
    id: "wellness",
    title: "Wellness with momentum",
    description:
      "Simple, repeatable rituals that keep your nervous system grounded and your relationship connected.",
  },
  {
    id: "fire",
    title: "FIRE without FOMO",
    description:
      "Travel and experiences that align with long-term freedom, not just short-term impulses.",
  },
];

export default function WhyDinkLifeSection() {
  return (
    <section className="w-full min-h-screen bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-start">
          <div className="space-y-6 md:space-y-8">
            <ScrollAnimation delay={0} direction="fadeUp" duration={0.8}>
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#015EC2] font-semibold">
                Why DINKLife
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#002860]">
                Built for DINK members who want more intentionality and less
                noise.
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={120} direction="fadeUp" duration={0.8}>
              <p className="text-lg md:text-xl leading-relaxed text-[#002860]/80">
                DINKLife is a modern lifestyle platform for members who want to
                travel well, stay grounded, and make FIRE-aligned choices
                without sacrificing connection.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={220} direction="fadeUp" duration={0.8}>
              <div className="rounded-2xl border border-[#E1ECFF] bg-[#F7FAFF] p-6 md:p-8">
                <p className="text-base md:text-lg text-[#002860] leading-relaxed">
                  We built DINKLife to feel like a smart, realistic co-pilot—so
                  you can focus on the life you are designing together.
                </p>
              </div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <ScrollAnimation
                key={pillar.id}
                delay={index * 120}
                direction="fadeUp"
                duration={0.8}
              >
                <div className="rounded-2xl border border-[#E1ECFF] bg-white p-5 md:p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-[#002860] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#002860]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
