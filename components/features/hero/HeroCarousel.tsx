"use client";

import { HeroSlide } from "./HeroSlide";
import { HERO_SLIDES } from "@/constants/hero-slides";

export default function HeroCarousel() {
    const slide = HERO_SLIDES[0];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <HeroSlide
                slide={slide}
                index={0}
            />
        </div>
    );
}

