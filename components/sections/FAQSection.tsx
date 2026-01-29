"use client";

import { BRAND_COLORS } from "@/constants/brand";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const faqItems = [
  {
    id: "ai-help",
    question: "What does the AI actually do?",
    answer:
      "It plans travel, suggests wellness rhythms, and matches you with members and events based on your pace, budget, and goals.",
  },
  {
    id: "pricing",
    question: "Will DINKLife be free?",
    answer:
      "Joining the waitlist is free. Founding members get early access and special pricing when we launch.",
  },
  {
    id: "launch",
    question: "When will you launch?",
    answer:
      "We are building now with a founding community. Waitlist members get the first invites to early access.",
  },
  {
    id: "privacy",
    question: "How is my data handled?",
    answer:
      "We do not sell personal data. You control what you share and can opt out at any time.",
  },
  {
    id: "for-who",
    question: "Who is this built for?",
    answer:
      "Adventurers, digital nomads, and people designing an intentional, flexible life—who want smarter travel, better wellness routines, and a community that fits.",
  },
  {
    id: "benefits",
    question: "What do I get on the waitlist?",
    answer:
      "Early access when we open invites, founder-only pricing at launch, and occasional updates as we ship new features.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollAnimation delay={0} direction="fadeUp" duration={0.8}>
          <div className="text-center mb-8 md:mb-10">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-tight"
              style={{ color: BRAND_COLORS.primary.dark }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: BRAND_COLORS.primary.dark }}
            >
              Clear answers about the product, pricing, and launch timeline.
            </p>
          </div>
        </ScrollAnimation>

        {/* FAQ List */}
        <ScrollAnimation delay={200} direction="fadeUp" duration={0.8}>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E1ECFF] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(11,42,95,0.06)]"
              >
                <h3 className="text-base md:text-lg font-semibold text-[#002860]">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm md:text-base text-[#002860]/80 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
