import React from 'react';

const StressEpidemic: React.FC = () => {
  return (
    <section id="stress" className="relative py-24 md:py-32 bg-[#0B0B1A]/95 backdrop-blur-sm">
      {/* Subtle top glow for smooth transition from hero */}
      <div className="absolute -top-16 inset-x-0 h-16 bg-gradient-to-b from-[#41234E]/40 to-transparent" />

      <div className="container-default">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
            When stress stays high, balance breaks.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-[#F9F6FA]/80">
            Chronic load dulls focus, disrupts sleep, and erodes resilience—awareness is the first step to restoring balance.
          </p>
        </div>

        <div className="mt-10 container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            {/* Hover aura */}
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-25 transition duration-500" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(175,152,228,0.5), transparent 60%)' }} />
            <div className="relative">
              <div className="text-2xl">
                <span className="bg-[linear-gradient(90deg,#AF98E4,#63D7C7)] bg-clip-text text-transparent">⚡</span>
              </div>
              <h3 className="mt-3 text-white text-lg font-semibold">1 in 3 adults report daily stress</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-25 transition duration-500" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(175,152,228,0.5), transparent 60%)' }} />
            <div className="relative">
              <div className="text-2xl">
                <span className="bg-[linear-gradient(90deg,#AF98E4,#63D7C7)] bg-clip-text text-transparent">🌙</span>
              </div>
              <h3 className="mt-3 text-white text-lg font-semibold">↑45% sleep disruption since 2020</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-25 transition duration-500" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(175,152,228,0.5), transparent 60%)' }} />
            <div className="relative">
              <div className="text-2xl">
                <span className="bg-[linear-gradient(90deg,#AF98E4,#63D7C7)] bg-clip-text text-transparent">💼</span>
              </div>
              <h3 className="mt-3 text-white text-lg font-semibold">$300B+ annual productivity loss</h3>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StressEpidemic;
