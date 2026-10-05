import React from 'react';
import Link from 'next/link';

type Update = {
  tag: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

export const UPDATES: Update[] = [
  {
    tag: 'Product',
    title: 'Prototype development underway',
    body: 'We have partnered with an experienced UK medical device engineering team to take CortiAura from concept to working prototype, with risk management, electrical safety and quality systems designed in from day one.',
  },
  {
    tag: 'Clinical',
    title: 'Early safety study designed',
    body: 'We have designed an early study focusing on safety and feasibility, and we are building partnerships with clinical and academic collaborators to take it forward.',
  },
  {
    tag: 'Community',
    title: 'Founding Community now open',
    body: 'Be among the first to follow CortiAura’s journey, with priority access and an exclusive founding-member discount when we launch. Free to join.',
    cta: { label: 'Join the Founding Community', href: '/founding' },
  },
];

const LatestUpdates: React.FC = () => {
  return (
    <section id="latest" className="scroll-mt-24 bg-white" aria-labelledby="latest-heading">
      <div className="container-site py-24">
        <p className="eyebrow">Progress update · October 2026</p>
        <h2 id="latest-heading" className="heading-lg mt-4">
          Latest from CortiAura
        </h2>
        <div className="mt-12 flex flex-wrap gap-6">
          {UPDATES.map((u) => (
            <article key={u.title} className="flex min-w-0 flex-[1_1_320px] flex-col rounded-xl border border-line p-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-garnet">{u.tag}</p>
              <h3 className="heading-md mt-3 !text-[28px]">{u.title}</h3>
              <p className="mt-4 text-ink">{u.body}</p>
              {u.cta && (
                <Link href={u.cta.href} className="mt-auto pt-5 font-semibold text-garnet hover:text-imperial">
                  {u.cta.label} <span aria-hidden>→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
