"use client";

import { createContext, useContext, ReactNode } from "react";

interface HeroCarouselContextType {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const HeroCarouselContext = createContext<HeroCarouselContextType | undefined>(
  undefined,
);

export function HeroCarouselProvider({ children }: { children: ReactNode }) {
  // Always return 0 since we only have one slide (welcome slide)
  const currentSlide = 0;
  const setCurrentSlide = () => {}; // No-op since there's only one slide

  return (
    <HeroCarouselContext.Provider value={{ currentSlide, setCurrentSlide }}>
      {children}
    </HeroCarouselContext.Provider>
  );
}

export function useHeroCarousel() {
  const context = useContext(HeroCarouselContext);

  if (context === undefined) {
    throw new Error(
      "useHeroCarousel must be used within a HeroCarouselProvider",
    );
  }

  return context;
}
