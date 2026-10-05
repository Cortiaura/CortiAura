import React from 'react';

type Update = {
  tag: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

const updates: Update[] = [
  {
    tag: 'Product',
    title: 'Prototype development underway',
    body:
      'We have partnered with an experienced UK medical device engineering team to take CortiAura from concept to working prototype. Safety comes first: risk management, electrical safety and quality systems are being designed in from day one to recognised medical device standards, not added later. This sets the highest safety bar from the start, whatever route to market we take.',
  },
  {
    tag: 'Clinical',
    title: 'Early safety study designed',
    body:
      'We have designed an early study focusing on safety and feasibility, and we are now building partnerships with clinical and academic collaborators to take it forward.',
  },
  {
    tag: 'Community',
    title: 'Early community now open',
    body:
      'Be among the first to follow CortiAura’s journey. Join our list for behind-the-scenes updates and priority access when we launch. Free to join, no obligation.',
    cta: { label: 'Join the list', href: '/#get-involved' },
  },
];

const LatestUpdates: React.FC = () => {
  return (
    <section id="latest" className="relative bg-[#0B0B1A] py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-sm uppercase tracking-[0.18em] text-[#FBDDCF]/70">
          Progress update · October 2026
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white text-center">
          Latest from CortiAura
        </h2>
        <p className="mt-4 text-center text-[#F9F6FA]/75 max-w-2xl mx-auto">
          Building carefully: safe, well-engineered and guided by science.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {updates.map((u) => (
            <article
              key={u.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 transition hover:border-[#970148]/50"
            >
              <span className="self-start rounded-full bg-gradient-to-r from-[#970148] to-[#FBDDCF] px-3 py-1 text-xs font-semibold text-white">
                {u.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{u.title}</h3>
              <p className="mt-3 text-[#F9F6FA]/75 leading-relaxed">{u.body}</p>
              {u.cta && (
                <a
                  href={u.cta.href}
                  className="mt-5 inline-flex items-center gap-1 font-semibold text-[#FBDDCF] hover:text-white transition"
                >
                  {u.cta.label} <span aria-hidden>→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
