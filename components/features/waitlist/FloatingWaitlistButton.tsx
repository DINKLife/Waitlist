"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { BRAND_COLORS, WAITLIST_FORM_URL } from "@/constants/brand";
import { useHeroCarousel } from "@/contexts/HeroCarouselContext";

export function FloatingWaitlistButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  
  // Hide button on welcome slide (slide 0)
  let isWelcomeSlide = false;
  try {
    const carousel = useHeroCarousel();
    isWelcomeSlide = carousel.currentSlide === 0;
  } catch {
    // Not in carousel context, show button (not on home page with carousel)
  }

  useEffect(() => {
    // Show button after a short delay for smooth entrance
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      // Trigger initial bounce animation after button appears
      setTimeout(() => setShouldBounce(true), 100);
    }, 500);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    // Pulse effect every 30 seconds as a gentle reminder
    const pulseInterval = setInterval(() => {
      setShouldPulse(true);
      // Reset pulse after animation completes
      setTimeout(() => setShouldPulse(false), 2000);
    }, 30000); // 30 seconds

    return () => clearInterval(pulseInterval);
  }, []);

  // Reset bounce animation after it completes
  useEffect(() => {
    if (shouldBounce) {
      const timer = setTimeout(() => setShouldBounce(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldBounce]);

  // Don't render on welcome slide
  if (isWelcomeSlide) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
          ${shouldBounce ? "animate-bounce" : ""}
          bottom-6 right-6 md:bottom-8 md:right-8
          max-md:left-1/2 max-md:-translate-x-1/2 max-md:right-auto
        `}
      >
        <Button
          size="lg"
          onPress={() => window.open(WAITLIST_FORM_URL, '_blank', 'noopener,noreferrer')}
          className={`
            relative overflow-hidden
            font-bold text-white shadow-2xl
            transition-all duration-300
            hover:scale-105 hover:shadow-blue-500/50
            active:scale-95
            rounded-full
            px-6 md:px-8
            h-14 md:h-16
            text-base md:text-lg
            group
            ${shouldPulse ? "animate-pulse-scale" : ""}
          `}
          style={{
            background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 50%, ${BRAND_COLORS.primary.light} 100%)`,
          }}
        >
          {/* Animated gradient overlay on hover */}
          <span 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${BRAND_COLORS.primary.main} 0%, ${BRAND_COLORS.primary.light} 100%)`,
            }}
          />
          
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-700" />
          
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
          </span>
        </Button>

        {/* Pulse animation ring - shows every 30 seconds */}
        {shouldPulse && (
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
            style={{
              background: BRAND_COLORS.primary.light,
              animationDuration: "2s",
            }}
          />
        )}
      </div>
    </>
  );
}

