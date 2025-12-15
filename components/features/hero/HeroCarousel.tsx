"use client";

import { useRef, useState, useEffect } from "react";
import { HeroSlide } from "./HeroSlide";
import { HERO_SLIDES } from "@/constants/hero-slides";
import { useHeroCarousel } from "@/contexts/HeroCarouselContext";

export default function HeroCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { setCurrentSlide: setContextSlide } = useHeroCarousel();
    const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    const carousel = carouselRef.current;
    const container = containerRef.current;
    if (!carousel || !container) return;

    const handleScroll = () => {
      const scrollPosition = carousel.scrollLeft;
      const slideWidth = carousel.offsetWidth;
      const newSlide = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(newSlide);
      setContextSlide(newSlide);
    };

    // Enhanced wheel handler with viewport detection
    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical wheel events
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Check if hero section is in viewport
        const rect = container.getBoundingClientRect();
        const isHeroInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
        
        if (!isHeroInView) {
          // Not in hero section, allow normal scroll
          return;
        }
        
        const slideWidth = carousel.offsetWidth;
        const scrollLeft = carousel.scrollLeft;
        const scrollWidth = carousel.scrollWidth;
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;
        
        // Calculate current slide index
        const currentSlideIndex = Math.round(scrollLeft / slideWidth);
        
        // Precise boundary detection
        const tolerance = 2;
        const isAtStart = scrollLeft <= tolerance;
        const isAtEnd = Math.abs((scrollLeft + slideWidth) - scrollWidth) <= tolerance;
        const isLastSlide = currentSlideIndex >= totalSlides - 1;
        const isFirstSlide = currentSlideIndex <= 0;
        
        // Allow vertical scroll only at exact boundaries
        if ((isScrollingDown && isAtEnd && isLastSlide) || 
            (isScrollingUp && isAtStart && isFirstSlide)) {
          // Allow page scroll
          return;
        }
        
        // Prevent vertical scroll and convert to horizontal
        e.preventDefault();
        e.stopPropagation();
        
        // Calculate target slide
        let targetSlide: number;
        if (isScrollingDown) {
          targetSlide = Math.min(currentSlideIndex + 1, totalSlides - 1);
        } else {
          targetSlide = Math.max(currentSlideIndex - 1, 0);
        }
        
        // Scroll to target slide
        if (targetSlide !== currentSlideIndex) {
          carousel.scrollTo({
            left: targetSlide * slideWidth,
            behavior: "smooth",
          });
        }
      }
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [setContextSlide, totalSlides]);

    const scrollToSlide = (index: number) => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const slideWidth = carousel.offsetWidth;
        carousel.scrollTo({
            left: slideWidth * index,
            behavior: "smooth",
        });
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto h-full snap-x snap-mandatory scrollbar-hide"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {HERO_SLIDES.map((slide, index) => (
                    <HeroSlide
                        key={slide.id}
                        slide={slide}
                        index={index}
                        isActive={currentSlide === index}
                    />
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className="group relative transition-all duration-300 hover:scale-125"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-500 ease-out ${
                                currentSlide === index
                                    ? "bg-white scale-150 w-8"
                                    : "bg-white/40 hover:bg-white/70 w-2"
                            }`}
                        />
                        {currentSlide === index && (
                            <div
                                className="absolute inset-0 rounded-full bg-white/30 animate-ping"
                                style={{ animationDuration: "2s" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Scroll Indicator */}
            {currentSlide === 0 && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300">
                            Scroll to explore
                        </p>
                        <svg
                            className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-y-1 transition-all duration-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            )}
            {currentSlide === HERO_SLIDES.length - 1 && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300">
                            Scroll down to continue
                        </p>
                        <svg
                            className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-y-1 transition-all duration-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}

