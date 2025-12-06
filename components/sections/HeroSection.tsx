import Image from "next/image";

import { WaitlistForm } from "@/components/Waitlist";

export default function HeroSection() {
  return (
    <section 
      className="relative flex flex-col min-h-screen w-full group"
      style={{
        backgroundImage: "url('/images/backgrounds/Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background hover overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/backgrounds/background-hover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content container at bottom */}
      <div className="relative z-10 flex flex-col flex-1 justify-end pb-12 md:pb-16">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-3">
              <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col justify-center">
                  <h1 className="font-sans text-5xl font-bold leading-tight text-white">
                    Healing for ADHD, Anxiety & Addiction — Rooted in Real Life Experience
                  </h1>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-balance text-xl leading-relaxed text-white/95 md:text-2xl lg:text-2xl">
                    A community and set of tools built by someone who has lived through ADHD overwhelm, anxiety spirals,
                    addiction cycles, chronic pain, and the long climb back to self-regulation
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

