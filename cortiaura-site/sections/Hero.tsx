import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0B1A] to-[#41234E]" />

      {/* Very subtle animated aura (respects reduced motion via CSS) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_50%_45%,rgba(175,152,228,.18),transparent_60%)] aura-anim"
      />

      <div className="container-default">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-semibold text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            <span className="block">The world is stressed.</span>
            <span className="block">Our bodies are listening.</span>
          </h1>

          <p className="mt-5 text-[#F9F6FA] text-base sm:text-lg">
            CortiAura™ is a neuro-wellness innovation exploring a future where the body’s stress response is harmonised through science and resonance.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA: gradient fill */}
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-white font-bold shadow-md transition hover:opacity-95"
            style={{
              background:
                'linear-gradient(90deg, #AF98E4 0%, #63D7C7 100%)',
            }}
          >
            Join the Waitlist
          </a>

          {/* Secondary CTA: gradient border */}
          <a
            href="#learn-more"
            className="relative inline-flex rounded-md p-[1.5px]"
            style={{
              background:
                'linear-gradient(90deg, #AF98E4 0%, #63D7C7 100%)',
            }}
          >
            <span className="inline-flex h-full w-full items-center justify-center rounded-[calc(0.375rem-1.5px)] px-6 py-3 text-white/90 bg-transparent backdrop-blur-[1px] transition-colors hover:bg-white/5">
              Learn More
            </span>
          </a>
        </div>

        {/* Scroll cue to #stress */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <a
            href="#stress"
            aria-label="Scroll to stress section"
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/80 opacity-70 hover:opacity-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M12 16a.75.75 0 0 1-.53-.22l-5-5a.75.75 0 1 1 1.06-1.06L12 14.19l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5A.75.75 0 0 1 12 16z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      {/* Bottom gradient overlay to fade into next section */}
      <div className="absolute bottom-0 h-24 w-full bg-gradient-to-b from-transparent to-[#0B0B1A]" />
    </section>
  );
};

export default Hero;

