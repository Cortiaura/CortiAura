import React from 'react';

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="relative bg-[#F9E4E5] py-24 md:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#231F20] text-center">
          Rebalance. Refocus. Restore.
        </h2>
        <p className="mt-4 text-center text-[#231F20]/80 max-w-2xl mx-auto">
          By harmonising the body’s rhythm, CortiAura aims to help people better manage stress,
          reduce emotional strain, and reclaim calm.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative rounded-2xl border border-[#970148]/10 bg-white backdrop-blur
                      p-6 transition hover:border-[#970148]/30">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition
                        [background:radial-gradient(80%_80%_at_50%_0%,rgba(151,1,72,.18),transparent_60%)]"/>
            <div className="mb-4 h-10 w-10 rounded-full flex items-center justify-center
                            bg-gradient-to-br from-[#970148] to-[#FBDDCF] text-white/90">🧘</div>
            <h3 className="text-[#231F20] font-medium">Calm Mind</h3>
            <p className="text-[#231F20]/75 mt-2">Supports relaxation and emotional balance.</p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-2xl border border-[#970148]/10 bg-white backdrop-blur p-6 hover:border-[#970148]/30">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition
                        [background:radial-gradient(80%_80%_at_50%_0%,rgba(151,1,72,.18),transparent_60%)]"/>
            <div className="mb-4 h-10 w-10 rounded-full flex items-center justify-center
                            bg-gradient-to-br from-[#970148] to-[#FBDDCF] text-white/90">⚖️</div>
            <h3 className="text-[#231F20] font-medium">Balanced Body</h3>
            <p className="text-[#231F20]/75 mt-2">Encourages a steadier stress response.</p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-2xl border border-[#970148]/10 bg-white backdrop-blur p-6 hover:border-[#970148]/30">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition
                        [background:radial-gradient(80%_80%_at_50%_0%,rgba(151,1,72,.18),transparent_60%)]"/>
            <div className="mb-4 h-10 w-10 rounded-full flex items-center justify-center
                            bg-gradient-to-br from-[#970148] to-[#FBDDCF] text-white/90">🎯</div>
            <h3 className="text-[#231F20] font-medium">Renewed Focus</h3>
            <p className="text-[#231F20]/75 mt-2">Helps you think clearer and perform better.</p>
          </div>
        </div>
      </div>

      {/* top fade from Vision */}
      <div className="pointer-events-none absolute -top-16 inset-x-0 h-16 bg-gradient-to-b from-[#231F20]/0 to-[#231F20]" />
    </section>
  );
};

export default Benefits;
