import Image from "next/image";

export default function WhyDinkLifeSection() {
  return (
    <section className="w-full min-h-screen bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Section - Visuals and Quote */}
          <div className="space-y-6">
            {/* Quote Box */}
            <div className="relative bg-gray-100 rounded-2xl p-6 md:p-8 shadow-lg">
              <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                It needed a healing platform built by someone who knows what it's like to be{" "}
                <strong className="font-bold">drowning</strong> — and someone who{" "}
                <strong className="font-bold">fought their way back.</strong>
              </p>
              <div className="text-6xl md:text-8xl font-serif text-gray-300 mt-4 leading-none">
                99
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Image 1 - Warehouse/Industrial */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/other/image 6.png"
                  alt="Person in warehouse setting"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 2 - Outdoor/Camping */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image
                  src="/images/other/image 7.png"
                  alt="Person in outdoor setting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Text Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight" style={{ color: "#002860" }}>
              WHY DINKLIFE EXISTS
            </h2>

            {/* Introductory Text */}
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800">
              I didn't build DINKLife from a place of perfection — I built it from{" "}
              <strong className="font-bold">survival.</strong>
            </p>

            {/* Section Heading */}
            <p className="text-lg md:text-xl font-bold text-gray-800 mt-6">
              After living for decades with:
            </p>

            {/* Bulleted List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">Unmanaged ADHD</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">Chronic Anxiety</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">6 alcohol-related DWIs</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">Chronic Inflammation & Pain</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">A Traumatic Ankle And Collarbone Injury</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">Years Of Shame And Self-Medication</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">Emotional Overwhelm</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: "#002860" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800">Burnout</span>
                </div>
              </div>
            </div>

            {/* Concluding Statements */}
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 mt-8">
              I realized the world didn't need another polished{" "}
              <strong className="font-bold">&quot;wellness app.&quot;</strong>
            </p>

            {/* Call to Action Bar */}
            <div
              className="mt-8 rounded-lg p-6 md:p-8 text-white text-xl md:text-2xl font-semibold"
              style={{
                background: "linear-gradient(90deg, #015EC2 0%, #002860 100%)",
              }}
            >
              DINKLife is the path I wish I had 10 years ago.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

