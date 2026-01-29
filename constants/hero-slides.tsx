import type { HeroSlideData } from "@/types/hero";

import { WelcomeSlide } from "@/components/features/hero/slides/WelcomeSlide";

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "travel-welcome",
    title: "AI-First DINK Life",
    backgroundImage: "",
    content: <WelcomeSlide />,
  },
];
