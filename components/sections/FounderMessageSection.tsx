"use client";

import Image from "next/image";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";

export default function FounderMessageSection() {
    return (
        <section className="w-full min-h-screen bg-white flex items-stretch">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                {/* Left Panel - Photo */}
                <ScrollAnimation direction="fadeRight" delay={0} duration={1}>
                    <div className="relative w-full h-screen lg:h-auto lg:min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
                        <Image
                            src="/images/founder/founder-photo.png"
                            alt="Timothy Brown, Founder of DINKLife"
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                    </div>
                </ScrollAnimation>

                {/* Right Panel - Message */}
                <ScrollAnimation direction="fadeLeft" delay={200} duration={1}>
                    <div
                        className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-24 relative overflow-hidden"
                        style={{ backgroundColor: "#015EC2" }}
                    >
                        {/* Decorative quotation marks */}
                        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-30 z-0">
                            <div
                                className="text-white font-serif leading-none"
                                style={{ fontSize: "clamp(80px, 15vw, 150px)" }}
                            >
                                "
                            </div>
                            <div
                                className="text-white font-serif leading-none -mt-4 md:-mt-8"
                                style={{ fontSize: "clamp(80px, 15vw, 150px)" }}
                            >
                                "
                            </div>
                        </div>

                        <div className="relative z-10 max-w-2xl w-full">
                            {/* Profile Icon */}
                            <div className="flex justify-center mb-8 md:mb-10">
                                <div
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: "#9CA3AF" }}
                                >
                                    <svg
                                        className="w-12 h-12 md:w-16 md:h-16 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Heading */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 md:mb-12 uppercase tracking-tight">
                                A MESSAGE FROM THE FOUNDER
                            </h2>

                            {/* Message */}
                            <div className="space-y-6 mb-10 md:mb-12">
                                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center">
                                    For years I lived in a cycle of anxiety, addiction, and shame – all while my body
                                    was falling apart from injuries and stress. I finally started healing when I learned
                                    how the nervous system works... how trauma gets stored in the body... how ADHD
                                    creates overwhelm... and how alignment affects anxiety. I'm rebuilding myself –
                                    physically, mentally, emotionally. And now I'm building a place to help others do the
                                    same.
                                </p>
                            </div>

                            {/* Founder Info */}
                            <div className="text-center">
                                <p
                                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2"
                                    style={{ fontFamily: "sans-serif" }}
                                >
                                    Timothy Brown
                                </p>
                                <p className="text-base md:text-lg text-white/90" style={{ fontFamily: "sans-serif" }}>
                                    Founder of DINKLife
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}

