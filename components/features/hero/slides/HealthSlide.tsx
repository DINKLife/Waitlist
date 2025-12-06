export function HealthSlide() {
    return (
        <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Headline */}
            <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-white/70 font-semibold">
                    Headline
                </p>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
                    Stay Healthy. <br />
                    <span className="text-[#D7E7FF]">Live Fully.</span>
                </h2>
            </div>

            {/* Subheadline */}
            <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-white/70 font-semibold">
                    Subheadline
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90">
                    Track your health your way
                </h3>
            </div>

            {/* Main Copy */}
            <div className="space-y-3 pt-4">
                <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                    Main Copy
                </p>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/95 max-w-3xl mx-auto">
                    Scan any meal, track your workouts, hit your goals. Simple health tracking that fits your busy lifestyle.
                </p>
            </div>
        </div>
    );
}

