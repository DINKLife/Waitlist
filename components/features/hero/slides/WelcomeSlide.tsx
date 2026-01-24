"use client";

import { Button } from "@heroui/button";
import { BRAND_COLORS } from "@/constants/brand";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";

export function WelcomeSlide() {
    const { openWaitlistModal } = useWaitlistModal();

    return (
        <>
            <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-8">
                {/* Main Headline with gradient effect - Enhanced Contrast */}
                <div className="space-y-4 mb-6 md:mb-8">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        LIVE YOUR ADVENTURE
                        <br />
                        <span className="bg-gradient-to-r from-[#D7E7FF] via-[#a8d0ff] to-[#7eb8ff] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(215,231,255,0.5)]">
                            TOGETHER
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                        A community and experiences for DINK couples—travel, wellness, and intentional living.
                    </p>
                </div>

                {/* Primary CTA Button - Centered and Above Trust Badges */}
                <div className="pt-4 pb-2">
                    <Button
                        size="lg"
                        onPress={openWaitlistModal}
                        className="
                            relative overflow-hidden
                            font-bold text-white shadow-2xl
                            transition-all duration-300
                            hover:scale-105 hover:shadow-blue-500/50
                            active:scale-95
                            rounded-full
                            px-8 md:px-10
                            h-12 md:h-14
                            text-base md:text-lg
                            group
                        "
                        style={{
                            background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 50%, ${BRAND_COLORS.primary.light} 100%)`,
                        }}
                    >
                        {/* Animated gradient overlay */}
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.light} 100%)`,
                            }}
                        />

                        {/* Button content */}
                        <span className="relative flex items-center gap-2">
                            <svg
                                className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span className="whitespace-nowrap">Join the Waitlist</span>
                            <svg
                                className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Button>
                </div>

                {/* Trust Badges - Below Button */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-2 text-xs md:text-sm text-white/70">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>100% Free</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>No Credit Card</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Privacy Protected</span>
                    </div>
                </div>
            </div>
        </>
    );
}

