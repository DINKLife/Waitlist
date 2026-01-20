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
                            alt="Smiling person outdoors, representing the DINKLife founder message"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </ScrollAnimation>

                {/* Right Panel - Message */}
                <ScrollAnimation direction="fadeLeft" delay={200} duration={1}>
                    <div
                        className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-24 relative overflow-hidden"
                        style={{ backgroundColor: "#015EC2" }}
                    >
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
                                    DINKLife was born from a simple realization: there are millions of couples worldwide 
                                    who have chosen to focus on their careers, passions, and adventures instead of having 
                                    children—yet they lacked a dedicated community to connect and share experiences.
                                </p>
                                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center">
                                    But the vision for DINKLife runs deeper than just creating a platform. My personal 
                                    journey with ADHD led me to discover the transformative power of physiological healing 
                                    and breathwork. Through these practices, I found clarity, focus, and a profound sense 
                                    of peace that traditional approaches never provided.
                                </p>
                                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center">
                                    I realized that so many of us—especially high-achieving DINK couples—are constantly 
                                    moving, constantly achieving, yet we&apos;ve lost touch with ourselves. We&apos;re indoors, 
                                    glued to screens, disconnected from nature and our own bodies. We need to get outside. 
                                    We need to breathe. We need to rediscover our self-love and reconnect with what truly 
                                    matters.
                                </p>
                                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center">
                                    DINKLife is about more than travel and community—it&apos;s about creating space for couples 
                                    to step away from the noise, experience transformative adventures together, and remember 
                                    who they are beneath all the doing. It&apos;s about healing, growth, and living intentionally 
                                    in a world that constantly pulls us in every direction.
                                </p>
                                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center">
                                    Today, we&apos;re building a community that celebrates not just the freedom of the DINK 
                                    lifestyle, but the opportunity it provides to invest in ourselves, our relationships, 
                                    and our wellbeing in ways that truly transform how we experience life.
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

