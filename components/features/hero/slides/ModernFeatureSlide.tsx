/**
 * ModernFeatureSlide Component
 * 
 * A reusable, modern slide component for displaying features
 * with gradient headlines, fashionable icons, and interactive cards.
 * 
 * @param headline - First part of the main headline (e.g., "YOUR BODY,")
 * @param headlineAccent - Highlighted part of headline with gradient (e.g., "YOUR RULES")
 * @param title - Main title text (e.g., "AI-Powered Health Tracking")
 * @param subtitle - Supporting subtitle text (e.g., "Designed for Your Lifestyle")
 * @param features - Array of feature objects with icon, text, gradient colors
 */

export interface SlideFeature {
    icon: React.ReactNode;
    text: string;
    gradient: string;
    iconBg: string;
    iconColor?: string;
}

interface ModernFeatureSlideProps {
    headline: string;
    headlineAccent: string;
    title: string;
    subtitle: string;
    features: SlideFeature[];
}

export function ModernFeatureSlide({
    headline,
    headlineAccent,
    title,
    subtitle,
    features
}: ModernFeatureSlideProps) {
    return (
        <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-7">
            {/* Main Headline with gradient effect */}
            <div className="space-y-2 mb-5 md:mb-6">
                <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
                    {headline}
                    <br />
                    <span className="bg-gradient-to-r from-[#D7E7FF] via-[#a8d0ff] to-[#7eb8ff] bg-clip-text text-transparent">
                        {headlineAccent}
                    </span>
                </h1>
            </div>

            {/* Subtitle with modern styling */}
            <div className="space-y-1.5 mb-6 md:mb-7">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
                    {title}
                </h2>
                <p className="text-lg sm:text-xl md:text-xl lg:text-2xl font-light text-white/80 leading-relaxed">
                    {subtitle}
                </p>
            </div>

            {/* Features List with fashionable icons */}
            <div className="grid gap-3 md:gap-4 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${feature.gradient} border border-white/25 hover:border-white/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10`}
                    >
                        <div className="flex items-center gap-4 sm:gap-5 md:gap-5 p-4 sm:p-5 md:p-5 lg:p-6">
                            {/* Modern gradient icon */}
                            <div className="flex-shrink-0">
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-2.5 sm:p-3 md:p-3`}>
                                    <div className={feature.iconColor || "text-white"}>
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>

                            {/* Feature text */}
                            <div className="flex-grow text-left">
                                <div className="flex items-center gap-2.5 md:gap-3">
                                    <span className="text-xl sm:text-2xl md:text-2xl font-bold text-white/90">✓</span>
                                    <p className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold text-white leading-relaxed">
                                        {feature.text}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Subtle glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

