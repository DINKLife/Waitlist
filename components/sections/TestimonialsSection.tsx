"use client";

import Image from "next/image";
import { Button } from "@heroui/button";

import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";

const testimonials = [
  {
    id: "ai-planning",
    quote:
      "The AI suggestions felt like a true co-pilot. We planned a long weekend in minutes and it fit our pace perfectly.",
    name: "Maya + Chris",
    role: "Founding members, Austin",
    badge: "AI planning",
  },
  {
    id: "wellness-reset",
    quote:
      "Wellness feels baked in, not bolted on. The rituals are simple and we actually keep them.",
    name: "Sierra + Andre",
    role: "Remote creatives",
    badge: "Wellness",
  },
  {
    id: "community",
    quote:
      "We met members who share our calendar and our goals. It feels like community, not another feed.",
    name: "Priya + Evan",
    role: "Newly married",
    badge: "Community",
  },
  {
    id: "fire",
    quote:
      "FIRE-aware planning is the secret sauce. We can say yes to experiences without second-guessing the budget.",
    name: "Jordan + Lee",
    role: "Finance-minded travelers",
    badge: "FIRE",
  },
];

export default function TestimonialsSection() {
  const { openWaitlistModal } = useWaitlistModal();

  return (
    <section className="w-full bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation delay={0} direction="fadeUp" duration={0.8}>
          <div className="text-center mb-10 md:mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4"
              style={{ color: BRAND_COLORS.primary.dark }}
            >
              Real Couples, Real Momentum
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: BRAND_COLORS.primary.dark }}
            >
              Founding members are already planning smarter, traveling better,
              and building community with intention.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={120} direction="fadeUp" duration={0.8}>
          <div className="mb-10 md:mb-12">
            <div className="relative w-full overflow-hidden rounded-3xl border border-[#E1ECFF] bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  fill
                  alt="Members sharing a sunset moment"
                  className="object-cover"
                  priority={false}
                  src="/images/testimonials-lifestyle.png"
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation
              key={testimonial.id}
              delay={index * 120}
              direction="fadeUp"
              duration={0.8}
            >
              <div className="h-full rounded-2xl border border-[#E1ECFF] bg-white p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-4 border"
                  style={{
                    color: BRAND_COLORS.primary.dark,
                    borderColor: BRAND_COLORS_RGBA.primaryLight[60],
                    background: BRAND_COLORS_RGBA.primaryLight[20],
                  }}
                >
                  <span>{testimonial.badge}</span>
                </div>
                <p className="text-base md:text-lg text-[#002860] leading-relaxed mb-6">
                  “{testimonial.quote}”
                </p>
                <div>
                  <p className="text-sm md:text-base font-semibold text-[#002860]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs md:text-sm text-[#002860]/70">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={480} direction="scale" duration={0.8}>
          <div className="mt-12 md:mt-14 text-center">
            <Button
              className="font-semibold text-white rounded-full px-8 md:px-10 h-12 md:h-14 shadow-md transition-transform duration-300 hover:scale-[1.02]"
              size="lg"
              style={{
                background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 70%, ${BRAND_COLORS.primary.light} 100%)`,
              }}
              onPress={openWaitlistModal}
            >
              Get Early Access
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
