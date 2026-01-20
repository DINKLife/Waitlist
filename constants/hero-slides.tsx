import { WelcomeSlide } from "@/components/features/hero/slides/WelcomeSlide";
import type { HeroSlideData } from "@/types/hero";

export const HERO_SLIDES: HeroSlideData[] = [
    {
        id: "travel-welcome",
        title: "Travel",
        backgroundImage: "/images/backgrounds/Travel.jpg",
        content: <WelcomeSlide />,
    },
];

