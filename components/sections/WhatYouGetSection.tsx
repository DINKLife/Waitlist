"use client";

import Image from "next/image";

import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const benefits = [
  {
    id: "community",
    icon: "/images/icons/early-access-community.png",
    accent: "from-[#4CC3FF] via-[#5BD3FF] to-[#8FE5FF]",
    ring: "ring-[#7BD7FF]/40",
    title: "AI-Matched Community",
    description:
      "Meet members who share your pace and priorities. Smart matching surfaces people, plans, and local meetups you will actually say yes to.",
  },
  {
    id: "travel",
    icon: "/images/icons/behind-scenes-updates.png",
    accent: "from-[#3B82F6] via-[#60A5FA] to-[#93C5FD]",
    ring: "ring-[#7FB6FF]/40",
    title: "AI-Curated Travel",
    description:
      "Dream trips built around your style, calendar, and budget. Itineraries that feel custom without the planning spiral.",
  },
  {
    id: "wellness",
    icon: "/images/icons/nervous-system-reset.png",
    accent: "from-[#2DD4BF] via-[#5EEAD4] to-[#99F6E4]",
    ring: "ring-[#6EE7D8]/35",
    title: "Wellness, Built In",
    description:
      "Simple, repeatable rituals that keep you grounded and connected, plus travel and community experiences that support your nervous system.",
  },
  {
    id: "fire",
    icon: "/images/icons/founder-pricing.png",
    accent: "from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD]",
    ring: "ring-[#B6A6FF]/40",
    title: "FIRE-Friendly Value",
    description:
      "Founder pricing, exclusive partner perks, and AI guidance that balances experiences today with long-term financial freedom.",
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="w-full bg-[#F7FAFF] py-12 md:py-16 px-6 md:px-12 lg:px-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <ScrollAnimation delay={0} direction="fadeUp" duration={0.8}>
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4"
              style={{ color: "#002860" }}
            >
              What You Unlock with DINKLife
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: "#002860" }}
            >
              A modern, AI-forward lifestyle hub for DINK members that blends
              community, travel, wellness, and FIRE into one intentional
              ecosystem.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={120} direction="fadeUp" duration={0.8}>
          <div className="mb-8 md:mb-10">
            <div className="relative w-full overflow-hidden rounded-3xl border border-[#E1ECFF] bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  fill
                  alt="Members planning travel and wellness together"
                  className="object-cover"
                  priority={false}
                  src="/images/benefits-lifestyle.png"
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Benefits Grid - Equal Height Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <ScrollAnimation
              key={benefit.id}
              delay={index * 100}
              direction="fadeUp"
              duration={0.8}
            >
              <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-[#E1ECFF] h-full flex flex-col">
                {/* Icon - Dark Blue/Black Background */}
                <div className="mb-6 flex justify-center flex-shrink-0">
                  <div
                    className={`relative overflow-hidden w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border border-white/70 bg-white shadow-sm ring-1 ${benefit.ring}`}
                    style={{
                      boxShadow: "0 10px 24px rgba(11, 42, 95, 0.12)",
                    }}
                  >
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${benefit.accent} opacity-30`}
                    />
                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                      <Image
                        fill
                        alt={benefit.title}
                        className="object-contain"
                        src={benefit.icon}
                      />
                    </div>
                  </div>
                </div>

                {/* Content - Flex grow to fill space */}
                <div className="flex flex-col flex-grow">
                  <h3
                    className="text-lg md:text-xl font-bold mb-3 text-center flex-shrink-0"
                    style={{ color: "#002860" }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-sm md:text-base text-center leading-relaxed flex-grow"
                    style={{ color: "#002860" }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
