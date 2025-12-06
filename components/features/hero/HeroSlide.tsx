import Image from "next/image";
import { WaitlistForm } from "../waitlist/WaitlistForm";
import type { HeroSlideData } from "@/types/hero";

interface HeroSlideProps {
    slide: HeroSlideData;
    index: number;
    isActive: boolean;
}

export function HeroSlide({ slide, index, isActive }: HeroSlideProps) {
    return (
        <div
            className="relative flex-shrink-0 w-full h-full snap-start snap-always"
            style={{ scrollSnapAlign: "start" }}
        >
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
                {/* Overlay for better text readability */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: slide.overlay || "linear-gradient(180deg, rgba(0, 40, 96, 0.4) 0%, rgba(0, 40, 96, 0.7) 100%)",
                    }}
                />
            </div>
            {/* Content */}
            <div
                className={`relative z-10 flex flex-col h-full justify-end pb-32 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-90"
                    }`}
            >
                <div className="px-6 md:px-12 lg:px-20">
                    <div className="mx-auto w-full max-w-7xl">
                        {/* Slide Content */}
                        <div className="mb-8">
                            {slide.content}
                        </div>

                        {/* Waitlist Form (First Slide Only) */}
                        {index === 0 && (
                            <div className="flex w-full justify-center">
                                <WaitlistForm />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

