"use client";

import Image from "next/image";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const benefits = [
  {
    id: "nervous-system-reset",
    icon: "/images/icons/nervous-system-reset.png",
    title: "The 7-Day Nervous System Reset",
    description: "A fast, ADHD-friendly routine to lower anxiety, tension, and inflammation.",
  },
  {
    id: "early-access",
    icon: "/images/icons/early-access-community.png",
    title: "Early Access to the DINKLife Community",
    description: "Be part of the founding group shaping the platform.",
  },
  {
    id: "behind-scenes",
    icon: "/images/icons/behind-scenes-updates.png",
    title: "Behind-the-scenes Updates",
    description: "Honest, real updates on building DINKLife.",
  },
  {
    id: "founder-pricing",
    icon: "/images/icons/founder-pricing.png",
    title: "Founder-only Pricing",
    description: "Special lifetime discounted access for early members.",
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollAnimation direction="fadeUp" delay={0} duration={0.8}>
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4"
              style={{ color: "#002860" }}
            >
              WHAT YOU GET WHEN YOU JOIN NOW
            </h2>
            <p className="text-lg md:text-xl" style={{ color: "#002860" }}>
              Joining the early access list gives you:
            </p>
          </div>
        </ScrollAnimation>

        {/* Benefits Grid - Equal Height Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <ScrollAnimation key={benefit.id} direction="fadeUp" delay={index * 100} duration={0.8}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                {/* Icon - Dark Blue/Black Background */}
                <div className="mb-6 flex justify-center flex-shrink-0">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #001a3d 0%, #002860 50%, #015EC2 100%)",
                    }}
                  >
                    <div className="relative w-12 h-12 md:w-16 md:h-16">
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        fill
                        className="object-contain brightness-0 invert"
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

