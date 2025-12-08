import { WelcomeSlide } from "@/components/features/hero/slides/WelcomeSlide";
import { ModernFeatureSlide } from "@/components/features/hero/slides/ModernFeatureSlide";
import type { HeroSlideData } from "@/types/hero";

export const HERO_SLIDES: HeroSlideData[] = [
    {
        id: "welcome",
        title: "Welcome",
        backgroundImage: "/images/backgrounds/Background.png",
        content: <WelcomeSlide />,
    },
    {
        id: "health",
        title: "Health",
        backgroundImage: "/images/backgrounds/Health.png",
        content: (
            <ModernFeatureSlide
                headline="YOUR BODY,"
                headlineAccent="YOUR RULES"
                title="AI-Powered Health Tracking"
                subtitle="Designed for Your Lifestyle"
                features={[
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        ),
                        text: "Scan meals, get instant nutrition",
                        gradient: "from-emerald-500/20 to-teal-600/20",
                        iconBg: "from-emerald-400 to-teal-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        text: "Flexible goals that adapt to travel",
                        gradient: "from-blue-500/20 to-cyan-600/20",
                        iconBg: "from-blue-400 to-cyan-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        text: "Compete & earn rewards",
                        gradient: "from-amber-500/20 to-orange-600/20",
                        iconBg: "from-amber-400 to-orange-500",
                    }
                ]}
            />
        ),
    },
    {
        id: "wellness",
        title: "Wellness",
        backgroundImage: "/images/backgrounds/Wellness.png",
        content: (
            <ModernFeatureSlide
                headline="DESIGN YOUR"
                headlineAccent="BEST LIFE"
                title="Mental Clarity & Personal Growth"
                subtitle=""
                features={[
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        text: "Digital vision boards",
                        gradient: "from-purple-500/20 to-pink-600/20",
                        iconBg: "from-purple-400 to-pink-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        ),
                        text: "Mindfulness tools",
                        gradient: "from-indigo-500/20 to-purple-600/20",
                        iconBg: "from-indigo-400 to-purple-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        ),
                        text: "Community support",
                        gradient: "from-teal-500/20 to-cyan-600/20",
                        iconBg: "from-teal-400 to-cyan-500",
                    }
                ]}
            />
        ),
    },
    {
        id: "community",
        title: "Community",
        backgroundImage: "/images/backgrounds/Community.png",
        content: (
            <ModernFeatureSlide
                headline="FIND YOUR"
                headlineAccent="PEOPLE"
                title="Your Tribe Is Waiting"
                subtitle="You're Not Alone in This Journey"
                features={[
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        ),
                        text: "Meet compatible DINKs",
                        gradient: "from-rose-500/20 to-pink-600/20",
                        iconBg: "from-rose-400 to-pink-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        ),
                        text: "Local & virtual events",
                        gradient: "from-orange-500/20 to-amber-600/20",
                        iconBg: "from-orange-400 to-amber-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ),
                        text: "Build real friendships",
                        gradient: "from-sky-500/20 to-blue-600/20",
                        iconBg: "from-sky-400 to-blue-500",
                    }
                ]}
            />
        ),
    },
    {
        id: "travel",
        title: "Travel",
        backgroundImage: "/images/backgrounds/Travel.png",
        content: (
            <ModernFeatureSlide
                headline="WANDER TOGETHER"
                headlineAccent="Live Unlimited"
                title="Find Your Perfect Travel Companions"
                subtitle=""
                features={[
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        text: "Match with compatible adventurers",
                        gradient: "from-cyan-500/20 to-blue-600/20",
                        iconBg: "from-cyan-400 to-blue-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        text: "Plan trips collaboratively",
                        gradient: "from-violet-500/20 to-purple-600/20",
                        iconBg: "from-violet-400 to-purple-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        ),
                        text: "Split costs, share experiences",
                        gradient: "from-emerald-500/20 to-green-600/20",
                        iconBg: "from-emerald-400 to-green-500",
                    }
                ]}
            />
        ),
    },
    {
        id: "finance",
        title: "Finance",
        backgroundImage: "/images/backgrounds/Finance.png",
        content: (
            <ModernFeatureSlide
                headline="BUILD WEALTH"
                headlineAccent="RETIRE EARLY"
                title="Smart Money Moves Together"
                subtitle="Quality Care Without Breaking the Bank"
                features={[
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ),
                        text: "Join investment groups",
                        gradient: "from-green-500/20 to-emerald-600/20",
                        iconBg: "from-green-400 to-emerald-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        ),
                        text: "Plan early retirement",
                        gradient: "from-yellow-500/20 to-amber-600/20",
                        iconBg: "from-yellow-400 to-amber-500",
                    },
                    {
                        icon: (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        ),
                        text: "FIRE community access",
                        gradient: "from-blue-500/20 to-indigo-600/20",
                        iconBg: "from-blue-400 to-indigo-500",
                    }
                ]}
            />
        ),
    },
];

