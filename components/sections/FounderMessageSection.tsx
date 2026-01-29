"use client";

import Image from "next/image";

import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

export default function FounderMessageSection() {
  return (
    <section className="w-full bg-[#F7FAFF] py-12 md:py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-8">
        <ScrollAnimation delay={0} direction="fadeUp" duration={0.9}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Community that fits",
                body: "Match with members who share your pace, priorities, and schedule.",
              },
              {
                title: "Wellness that sticks",
                body: "Lightweight rituals and resets that actually fit real life.",
              },
              {
                title: "Travel, simplified",
                body: "AI-guided trip ideas tailored to budget, energy, and timing.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-[#E1ECFF] bg-white p-4 md:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-sm md:text-base font-semibold text-[#002860] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-[#002860]/75 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={150} direction="fadeUp" duration={0.9}>
          <div className="rounded-3xl border border-[#E1ECFF] bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl overflow-hidden border border-white shadow-md flex-shrink-0">
                <Image
                  fill
                  priority
                  alt="Portrait of the DINKLife founder"
                  className="object-cover object-top"
                  src="/images/founder/founder-photo.png"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#015EC2]">
                  Founder
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#002860] mt-1">
                  Timothy Brown
                </h2>
                <p className="text-sm text-[#002860]/70">
                  Building DINKLife for modern members
                </p>
                <p className="text-base md:text-lg text-[#002860] leading-relaxed mt-4">
                  I built DINKLife as a DINK myself after years of planning
                  travel, wellness, and money in scattered places. We are
                  creating a simple AI co-pilot so members can make smarter
                  decisions together without losing the human touch.
                </p>
                <p className="text-sm text-[#002860]/70 mt-4">
                  — Timothy Brown, Founder
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
