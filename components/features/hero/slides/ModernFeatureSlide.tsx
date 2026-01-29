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
  features,
}: ModernFeatureSlideProps) {
  return (
    <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-8">
      {/* Main Headline with gradient effect - Enhanced Contrast */}
      <div className="space-y-2 mb-6 md:mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {headline}
          <br />
          <span className="bg-gradient-to-r from-[#D7E7FF] via-[#a8d0ff] to-[#7eb8ff] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(215,231,255,0.5)]">
            {headlineAccent}
          </span>
        </h1>
      </div>

      {/* Subtitle with modern styling - Enhanced Contrast */}
      <div className="space-y-2 mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/95 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Features List with fashionable icons - Enhanced Contrast & Beauty */}
      <div className="grid gap-4 md:gap-5 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20 shadow-lg shadow-black/30`}
          >
            {/* Enhanced background with better opacity */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

            <div className="relative flex items-center gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-6 lg:p-7">
              {/* Modern gradient icon - Enhanced */}
              <div className="flex-shrink-0">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-2xl shadow-black/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 p-3 sm:p-3.5 md:p-4 ring-2 ring-white/20`}
                >
                  <div
                    className={feature.iconColor || "text-white drop-shadow-lg"}
                  >
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Feature text - Enhanced Contrast */}
              <div className="flex-grow text-left">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-2xl sm:text-3xl md:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    ✓
                  </span>
                  <p className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                    {feature.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
          </div>
        ))}
      </div>
    </div>
  );
}
