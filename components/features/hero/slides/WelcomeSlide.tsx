export function WelcomeSlide() {
    return (
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center">
                <h1 className="font-sans text-4xl sm:text-5xl font-bold leading-tight text-white">
                    Healing for ADHD, Anxiety & Addiction — Rooted in Real Life Experience
                </h1>
            </div>

            <div className="flex flex-col justify-center">
                <p className="text-balance text-xl leading-relaxed text-white/95 md:text-2xl">
                    A community and set of tools built by someone who has lived through ADHD overwhelm,
                    anxiety spirals, addiction cycles, chronic pain, and the long climb back to self-regulation
                </p>
            </div>
        </div>
    );
}

