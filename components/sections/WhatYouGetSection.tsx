"use client";

import Image from "next/image";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const benefits = [
  {
    id: "community",
    icon: "/images/icons/early-access-community.png",
    title: "A Community That Gets You",
    description: "Connect with couples who share your values—same season of life, same drive to explore, grow, and design a life on your terms.",
  },
  {
    id: "travel",
    icon: "/images/icons/behind-scenes-updates.png",
    title: "Travel That Fits Your Life",
    description: "Curated experiences and practical resources for couples who want real adventures—without the overwhelm. Achievable, memorable, built for two.",
  },
  {
    id: "wellness",
    icon: "/images/icons/nervous-system-reset.png",
    title: "Wellness Built Into the Journey",
    description: "From breathwork to nature immersion, access practices and retreats that help you recharge, reconnect, and show up fully—for each other and for life.",
  },
  {
    id: "fire",
    icon: "/images/icons/founder-pricing.png",
    title: "Founder Access & Smarter Value",
    description: "Early members get founder pricing, exclusive discounts, and resources to invest in experiences that matter—without sacrificing your financial goals.",
  },
];

export default function WhatYouGetSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 lg:px-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <ScrollAnimation direction="fadeUp" delay={0} duration={0.8}>
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4"
              style={{ color: "#002860" }}
            >
              MORE THAN TRAVEL—A LIFESTYLE
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "#002860" }}>
              A community where DINK couples connect over travel, wellness, and building the life you want—together.
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

