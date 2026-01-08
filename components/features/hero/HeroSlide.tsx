import Image from "next/image";
import type { HeroSlideData } from "@/types/hero";

interface HeroSlideProps {
    slide: HeroSlideData;
    index: number;
}

export function HeroSlide({ slide, index }: HeroSlideProps) {
    return (
        <div className="relative flex-shrink-0 w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={slide.backgroundImage}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                />
                {/* Background hover overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/images/backgrounds/background-hover.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                {/* Dark overlay for better text contrast - Trending 2024 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
                {/* Optional custom overlay for better text readability */}
                {slide.overlay && (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: slide.overlay,
                        }}
                    />
                )}
            </div>
            {/* Content - Centered vertically following trending designs */}
            <div className="relative z-10 flex flex-col h-full justify-center items-center opacity-100 translate-y-0 scale-100">
                <div className="px-6 md:px-12 lg:px-20 w-full">
                    <div className="mx-auto w-full max-w-7xl">
                        {/* Slide Content */}
                        {slide.content}
                    </div>
                </div>
            </div>
        </div>
    );
}

