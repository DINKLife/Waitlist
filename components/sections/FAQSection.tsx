"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

const faqItems = [
    {
        id: "what-is-dinklife",
        question: "What is DINKLife?",
        answer:
            "DINKLife is a healing platform built by someone who has lived through ADHD overwhelm, anxiety spirals, addiction cycles, and chronic pain. It's a community and set of tools designed to help you rebuild yourself – physically, mentally, and emotionally. We focus on understanding how the nervous system works, how trauma gets stored in the body, and how to create real, lasting change.",
    },
    {
        id: "when-will-it-launch",
        question: "When will DINKLife launch?",
        answer:
            "We're currently in early development and building the platform with our founding community. By joining the waitlist, you'll be among the first to know when we launch and get exclusive early access. We'll keep you updated with honest, behind-the-scenes progress as we build.",
    },
    {
        id: "what-do-i-get",
        question: "What do I get by joining the waitlist?",
        answer:
            "When you join the waitlist, you'll receive: (1) The 7-Day Nervous System Reset guide absolutely free, (2) Early access to the DINKLife community as a founding member, (3) Behind-the-scenes updates on our building process, and (4) Founder-only pricing with lifetime discounted access when we launch.",
    },
    {
        id: "is-it-free",
        question: "Is joining the waitlist free?",
        answer:
            "Yes! Joining the waitlist is completely free. You'll get the 7-Day Nervous System Reset guide immediately, and there's no obligation to purchase anything. When we launch, you'll have the option to join with special founder pricing, but there's no commitment required now.",
    },
    {
        id: "who-is-this-for",
        question: "Who is DINKLife for?",
        answer:
            "DINKLife is for anyone struggling with ADHD, anxiety, addiction, chronic pain, or emotional overwhelm. It's especially for people who are tired of polished wellness apps and want something built by someone who truly understands what it's like to be drowning – and who fought their way back. If you're ready to rebuild yourself physically, mentally, and emotionally, this is for you.",
    },
    {
        id: "how-is-it-different",
        question: "How is DINKLife different from other wellness apps?",
        answer:
            "DINKLife isn't built from a place of perfection – it's built from survival. Our founder lived through decades of unmanaged ADHD, chronic anxiety, addiction, injuries, and burnout. This platform is built by someone who knows what it's like to be drowning and fought their way back. We focus on real, practical tools based on understanding the nervous system, trauma storage, and how alignment affects anxiety – not just generic wellness advice.",
    },
    {
        id: "what-is-nervous-system-reset",
        question: "What is the 7-Day Nervous System Reset?",
        answer:
            "The 7-Day Nervous System Reset is a fast, ADHD-friendly routine designed to lower anxiety, tension, and inflammation. It's a practical guide that helps you understand and work with your nervous system rather than against it. You'll receive this guide immediately when you join the waitlist, completely free.",
    },
    {
        id: "can-i-share",
        question: "Can I share this with friends?",
        answer:
            "Absolutely! We encourage you to share DINKLife with anyone who might benefit. The more people we can help, the better. When you join the waitlist, you'll also get access to share your unique referral link to help others discover the platform.",
    },
];

export default function FAQSection() {
    return (
        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#D7E7FF] rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#015EC2] rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <ScrollAnimation direction="fadeUp" delay={0} duration={0.8}>
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#D7E7FF] to-[#015EC2] mb-6 shadow-lg shadow-[#015EC2]/30">
                            <svg
                                className="w-8 h-8 md:w-10 md:h-10"
                                style={{ color: BRAND_COLORS.primary.dark }}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
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
                            Everything you need to know about DINKLife and joining the waitlist
                        </p>
                    </div>
                </ScrollAnimation>

                {/* FAQ Accordion */}
                <ScrollAnimation direction="fadeUp" delay={200} duration={0.8}>
                    <div className="space-y-4">
                        <Accordion
                            variant="splitted"
                            selectionMode="multiple"
                            className="gap-4"
                            itemClasses={{
                                base: "group border-2 border-gray-200 rounded-xl bg-white",
                                trigger: [
                                    "px-6 py-5",
                                    "bg-white",
                                    "border-0",
                                    "rounded-xl",
                                    "hover:bg-[#D7E7FF]/20",
                                    "data-[hover=true]:bg-[#D7E7FF]/20",
                                    "data-[open=true]:bg-[#D7E7FF]/30",
                                    "transition-all",
                                    "duration-300",
                                    "shadow-sm",
                                    "hover:shadow-md",
                                    "data-[open=true]:shadow-md",
                                ].join(" "),
                                indicator: [
                                    "text-[#015EC2]",
                                    "data-[open=true]:text-[#002860]",
                                    "data-[open=true]:rotate-180",
                                    "transition-transform",
                                    "duration-300",
                                ].join(" "),
                                title: [
                                    "font-semibold",
                                    "text-base",
                                    "md:text-lg",
                                    "text-[#002860]",
                                    "data-[open=true]:text-[#002860]",
                                ].join(" "),
                                content: [
                                    "px-6",
                                    "py-4",
                                    "bg-white",
                                    "border-t-2",
                                    "border-[#D7E7FF]",
                                    "rounded-b-xl",
                                    "leading-relaxed",
                                ].join(" "),
                            }}
                        >
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    aria-label={item.question}
                                    title={item.question}
                                    classNames={{
                                        base: "border-2 border-gray-200 rounded-xl bg-white hover:border-[#015EC2] data-[open=true]:border-[#015EC2] transition-colors duration-300",
                                        trigger: "data-[open=true]:bg-[#D7E7FF]/30",
                                        title: "text-[#002860]",
                                        indicator: "text-[#015EC2]",
                                        content: "text-[#002860]",
                                    }}
                                >
                                    <div
                                        className="text-base md:text-lg leading-relaxed"
                                        style={{ color: BRAND_COLORS.primary.dark }}
                                    >
                                        {item.answer}
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </ScrollAnimation>

                {/* CTA Section */}
                <ScrollAnimation direction="scale" delay={400} duration={0.8}>
                    <div className="mt-12 md:mt-16 text-center">
                        <div
                            className="inline-block rounded-2xl p-8 md:p-10 border-2"
                            style={{
                                background: `linear-gradient(135deg, ${BRAND_COLORS_RGBA.primaryLight[30]} 0%, ${BRAND_COLORS_RGBA.primaryLight[10]} 100%)`,
                                borderColor: BRAND_COLORS_RGBA.primaryLight[60],
                            }}
                        >
                            <h3
                                className="text-2xl md:text-3xl font-bold mb-4"
                                style={{ color: BRAND_COLORS.primary.dark }}
                            >
                                Still have questions?
                            </h3>
                            <p
                                className="text-base md:text-lg mb-6 max-w-xl mx-auto"
                                style={{ color: BRAND_COLORS.primary.dark }}
                            >
                                Join our waitlist to get early access and connect with our community. We're here to help.
                            </p>
                            <p
                                className="text-sm"
                                style={{ color: BRAND_COLORS.primary.dark, opacity: 0.7 }}
                            >
                                Reach out to us through our social links in the navbar above
                            </p>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}

