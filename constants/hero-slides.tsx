import { WelcomeSlide } from "@/components/features/hero/slides/WelcomeSlide";
import type { HeroSlideData } from "@/types/hero";

export const HERO_SLIDES: HeroSlideData[] = [
    {
        id: "welcome",
        title: "Welcome",
        backgroundImage: "/images/backgrounds/Background.png",
        content: <WelcomeSlide />,
    },
];

