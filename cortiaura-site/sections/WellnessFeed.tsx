import React from 'react';
import type { WellnessItem } from '../lib/wellnessFeed';

type Props = { items: WellnessItem[] };

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

const WellnessFeed: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;
  return (
    <section id="wellness" className="relative py-16 md:py-20 bg-[#0B0B1A]">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B1A] pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Wellness news from around the world.</h2>
          <p className="mt-3 text-[#F9F6FA]/80">Curated articles on stress, sleep, and brain–body balance from trusted sources.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={`${item.source}-${item.link}`} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition shadow-sm hover:shadow-md relative">
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{ background: 'linear-gradient(120deg, rgba(99,215,199,0.15), transparent 40%)' }} />
              <small className="text-xs text-[#F9F6FA]/60">{item.source}</small>
              <h3 className="mt-2 text-white font-medium leading-snug">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {item.title}
                </a>
              </h3>
              <time className="mt-2 block text-xs text-[#F9F6FA]/60">{formatDate(item.date)}</time>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WellnessFeed;
