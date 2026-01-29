"use client";

import { Button } from "@heroui/button";

import { BRAND_COLORS } from "@/constants/brand";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";

export function WelcomeSlide() {
  const { openWaitlistModal } = useWaitlistModal();

  return (
    <>
      <div className="max-w-6xl mx-auto text-center space-y-7 md:space-y-8">
        <div className="space-y-4 md:space-y-5">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-extrabold text-white leading-[0.92] tracking-tight">
            <span className="bg-gradient-to-r from-[#E7F1FF] via-[#B8D3FF] to-[#8FB8FF] bg-clip-text text-transparent">
              DINKLife.
            </span>
            <br />
            <span className="text-white/85 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
              AI-forward community.
            </span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
            One place to plan, match, and go.
          </p>
        </div>

        {/* Primary CTA Button - Centered and Above Trust Badges */}
        <div className="pt-3 pb-2">
          <Button
            className="
                            relative overflow-hidden
                            font-semibold text-white shadow-lg
                            transition-all duration-300
                            hover:scale-[1.02] hover:shadow-blue-500/30
                            active:scale-[0.99]
                            rounded-full
                            px-7 md:px-9
                            h-11 md:h-12
                            text-base md:text-lg
                            group
                        "
            size="lg"
            style={{
              background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 70%, ${BRAND_COLORS.primary.light} 100%)`,
            }}
            onPress={openWaitlistModal}
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
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="whitespace-nowrap">Get Early Access</span>
              <svg
                className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Button>
        </div>

        {/* Trust Badges - Below Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-1 text-xs md:text-sm text-white/70">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>100% Free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>No Credit Card</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>Privacy Protected</span>
          </div>
        </div>
      </div>
    </>
  );
}
