interface FeatureSlideProps {
    title: string;
    subtitle: string;
    description: string;
    accentColor?: string;
}

export function FeatureSlide({ title, subtitle, description, accentColor = "#D7E7FF" }: FeatureSlideProps) {
    return (
        <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                {title}
            </h2>

            <h3
                className="text-xl sm:text-2xl md:text-3xl font-semibold"
                style={{ color: accentColor }}
            >
                {subtitle}
            </h3>

            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 max-w-2xl mx-auto pt-4">
                {description}
            </p>
        </div>
    );
}

