"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeroCarouselContextType {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const HeroCarouselContext = createContext<HeroCarouselContextType | undefined>(undefined);

export function HeroCarouselProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <HeroCarouselContext.Provider value={{ currentSlide, setCurrentSlide }}>
      {children}
    </HeroCarouselContext.Provider>
  );
}

export function useHeroCarousel() {
  const context = useContext(HeroCarouselContext);
  if (context === undefined) {
    throw new Error("useHeroCarousel must be used within a HeroCarouselProvider");
  }
  return context;
}

