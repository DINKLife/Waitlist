"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const founderCards = [
  {
    id: "community",
    title: "Community for DINK couples",
    summary:
      "I wanted a place where DINK couples could find people who share the same season of life—without having to explain their choices.",
  },
  {
    id: "wellness",
    title: "Nervous system & wellness",
    summary:
      "Learning how my nervous system, trauma, and patterns of overwhelm worked helped me rebuild life with more honesty and stability.",
  },
  {
    id: "adventure",
    title: "Adventure & time outside",
    summary:
      "We spend too much time indoors and on screens. DINKLife is about getting outside, breathing deeply, and exploring together.",
  },
  {
    id: "intentionalLiving",
    title: "Intentional living & money",
    summary:
      "Without kids, we have a unique chance to invest in our relationships, wellbeing, and financial freedom on purpose—not by default.",
  },
] as const;

export default function FounderMessageSection() {
  const [activeId, setActiveId] = useState<(typeof founderCards)[number]["id"]>(
    founderCards[0]?.id ?? "community"
  );

  return (
    <section className="w-full bg-white flex items-stretch">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Panel - Photo */}
        <ScrollAnimation direction="fadeRight" delay={0} duration={1}>
          <div className="relative w-full h-[420px] sm:h-[480px] lg:h-full lg:min-h-[520px] bg-gradient-to-br from-gray-200 to-gray-300">
            <Image
              src="/images/founder/founder-photo.png"
              alt="Smiling person outdoors, representing the DINKLife founder message"
              fill
              className="object-contain"
              priority
            />
          </div>
        </ScrollAnimation>

        {/* Right Panel - Interactive Founder Widget */}
        <ScrollAnimation direction="fadeLeft" delay={200} duration={1}>
          <div
            className="w-full flex flex-col items-center justify-center px-6 md:px-10 lg:px-14 py-10 md:py-14 lg:py-16 relative overflow-hidden"
            style={{ backgroundColor: "#015EC2" }}
          >
            <div className="relative z-10 max-w-xl w-full space-y-6">
              {/* Compact header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#9CA3AF" }}
                >
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                    From the Founder
                  </h2>
                  <p className="text-sm md:text-base text-white/85">
                    A quick look at why DINKLife exists—for community, wellness, and adventure.
                  </p>
                </div>
              </div>

              {/* Interactive cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {founderCards.map((card) => {
                  const isActive = card.id === activeId;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActiveId(card.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveId(card.id);
                        }
                      }}
                      className={`text-left rounded-xl border transition transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/80 focus-visible:ring-offset-[#015EC2] cursor-pointer p-4 bg-white/5 border-white/15 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg ${
                        isActive ? "bg-white/15 border-white/70 shadow-lg" : ""
                      }`}
                    >
                      <h3 className="text-sm md:text-base font-semibold text-white mb-1">
                        {card.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                        {card.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Founder name */}
              <div className="pt-2">
                <p className="text-sm md:text-base text-white/90">
                  — Timothy Brown, Founder of DINKLife
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

