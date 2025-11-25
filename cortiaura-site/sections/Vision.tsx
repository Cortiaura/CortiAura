import React from 'react';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="relative overflow-hidden bg-[#F9E4E5] py-24 md:py-32">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: Copy */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#231F20]">
            Where science meets serenity.
          </h2>
          <p className="mt-4 max-w-prose text-[#231F20]/80">
            CortiAura™ merges neuroscience, sensory design and ancient rhythmic wisdom to reimagine how we manage stress. Our vision: a future-ready wearable that helps your body find balance.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              'Natural & Non-invasive',
              'Rooted in Science',
              'Designed for Balance',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#231F20]">
                <span
                  className="mt-2 h-[6px] w-[6px] rounded-full bg-gradient-to-r from-[#970148] to-[#FBDDCF] shrink-0"
                  aria-hidden
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Abstract aura graphic */}
        <div className="relative h-72 md:h-96 w-full">
          <div className="absolute inset-0 rounded-full opacity-70 blur-2xl [background:radial-gradient(60%_60%_at_50%_50%,rgba(151,1,72,.38),transparent_60%)]" />
          <div className="absolute inset-8 rounded-full opacity-60 blur-2xl [background:radial-gradient(45%_45%_at_55%_45%,rgba(251,221,207,.32),transparent_60%)]" />
          <div className="absolute inset-0 rounded-full [mask-image:radial-gradient(circle_at_50%_50%,_#000_40%,_transparent_72%)]">
            <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
            <div className="absolute inset-6 rounded-full ring-1 ring-white/5" />
            <div className="absolute inset-12 rounded-full ring-1 ring-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
