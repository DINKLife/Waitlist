import { WelcomeSlide } from "@/components/features/hero/slides/WelcomeSlide";
import { HealthSlide } from "@/components/features/hero/slides/HealthSlide";
import { FeatureSlide } from "@/components/features/hero/slides/FeatureSlides";
import type { HeroSlideData } from "@/types/hero";

export const HERO_SLIDES: HeroSlideData[] = [
    {
        id: "welcome",
        title: "Welcome",
        backgroundImage: "/images/backgrounds/Background.png",
        overlay: "linear-gradient(180deg, rgba(0, 40, 96, 0.4) 0%, rgba(0, 40, 96, 0.7) 100%)",
        content: <WelcomeSlide />,
    },
    {
        id: "health",
        title: "Health",
        backgroundImage: "/images/backgrounds/Health.png",
        // overlay: "linear-gradient(180deg, rgba(0, 40, 96, 0.5) 0%, rgba(0, 40, 96, 0.8) 100%)",
        content: <HealthSlide />,
    },
    {
        id: "wellness",
        title: "Wellness",
        backgroundImage: "/images/backgrounds/Wellness.png",
        overlay: "linear-gradient(180deg, rgba(1, 94, 194, 0.4) 0%, rgba(0, 40, 96, 0.7) 100%)",
        content: (
            <FeatureSlide
                title="Mind & Body Balance"
                subtitle="Your wellness journey starts here"
                description="Holistic approaches to mental and physical well-being, designed for sustainable long-term health."
                accentColor="#D7E7FF"
            />
        ),
    },
    {
        id: "community",
        title: "Community",
        backgroundImage: "/images/backgrounds/Community.png",
        overlay: "linear-gradient(180deg, rgba(0, 40, 96, 0.5) 0%, rgba(1, 94, 194, 0.7) 100%)",
        content: (
            <FeatureSlide
                title="Connect & Grow Together"
                subtitle="You're not alone in this journey"
                description="Join a supportive community of people who understand your challenges and celebrate your wins."
                accentColor="#D7E7FF"
            />
        ),
    },
    {
        id: "travel",
        title: "Travel",
        backgroundImage: "/images/backgrounds/Travel.png",
        overlay: "linear-gradient(180deg, rgba(1, 94, 194, 0.4) 0%, rgba(0, 40, 96, 0.7) 100%)",
        content: (
            <FeatureSlide
                title="Explore Without Limits"
                subtitle="Maintain balance anywhere"
                description="Keep your health routines and wellness practices intact, no matter where life takes you."
                accentColor="#D7E7FF"
            />
        ),
    },
    {
        id: "finance",
        title: "Finance",
        backgroundImage: "/images/backgrounds/Finance.png",
        overlay: "linear-gradient(180deg, rgba(0, 40, 96, 0.6) 0%, rgba(1, 94, 194, 0.8) 100%)",
        content: (
            <FeatureSlide
                title="Financial Wellness Matters"
                subtitle="Affordable health for everyone"
                description="Access quality health tracking and support without breaking the bank. Your wellness shouldn't cost a fortune."
                accentColor="#D7E7FF"
            />
        ),
    },
];

