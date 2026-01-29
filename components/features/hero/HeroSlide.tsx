import type { HeroSlideData } from "@/types/hero";

interface HeroSlideProps {
  slide: HeroSlideData;
}

export function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className="relative flex-shrink-0 w-full h-full">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2B] via-[#112C4A] to-[#1D4D7A]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_18%_12%,_rgba(210,230,255,0.45),_transparent_48%)]" />
        <div className="absolute inset-0 opacity-65 bg-[radial-gradient(circle_at_78%_8%,_rgba(160,190,220,0.35),_transparent_52%)]" />
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_60%_85%,_rgba(40,85,135,0.45),_transparent_55%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(210,230,255,0.32) 0%, rgba(170,195,220,0.18) 42%, rgba(110,140,170,0.32) 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,_transparent_1px)] [background-size:56px_56px]" />
        {slide.overlay && (
          <div
            className="absolute inset-0"
            style={{ background: slide.overlay }}
          />
        )}
      </div>
      {/* Content - Centered vertically following trending designs */}
      <div className="relative z-10 flex flex-col h-full justify-center items-center opacity-100 translate-y-0 scale-100">
        <div className="px-6 md:px-12 lg:px-20 w-full">
          <div className="mx-auto w-full max-w-7xl">
            {/* Slide Content */}
            {slide.content}
          </div>
        </div>
      </div>
    </div>
  );
}
