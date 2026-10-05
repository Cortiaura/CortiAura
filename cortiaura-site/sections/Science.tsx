import React from 'react';

const Node: React.FC<{ title: string; text: string; filled?: boolean }> = ({ title, text, filled }) => (
  <div
    className={
      'w-full max-w-[360px] rounded-xl px-6 py-5 text-center ' +
      (filled ? 'bg-garnet text-white' : 'border-[1.5px] border-raisin bg-white')
    }
  >
    <p className="font-display text-[26px]">{title}</p>
    <p className={'mt-1 text-[15px] ' + (filled ? 'text-white' : 'text-ink')}>{text}</p>
  </div>
);

const Link: React.FC = () => <div className="h-9 w-0.5 bg-garnet" aria-hidden />;

const Science: React.FC = () => {
  return (
    <section id="science" className="scroll-mt-24 bg-white" aria-labelledby="science-heading">
      <div className="container-site flex flex-wrap items-center gap-16 py-24">
        <div className="min-w-0 flex-[1_1_440px]">
          <p className="eyebrow">The science</p>
          <h2 id="science-heading" className="heading-lg mt-4">
            The vagus nerve connects gut and brain.
          </h2>
          <p className="mt-6 text-ink">
            The gut and brain are in constant two-way communication, and the vagus nerve is the main line between them.
            Stress, sleep and digestion all travel along this pathway.
          </p>
          <p className="mt-4 text-ink">
            CortiAura’s approach is to work with this pathway non-invasively, from the outside of the body, with no
            implants and no drugs.
          </p>
        </div>
        <figure className="flex min-w-0 flex-[1_1_440px] flex-col items-center" aria-label="How the vagus nerve links brain and gut">
          <Node title="Brain" text="Mood, stress response, sleep" />
          <Link />
          <Node title="Vagus nerve" text="Two-way signalling, where CortiAura works" filled />
          <Link />
          <Node title="Gut" text="Digestion, comfort, gut signals" />
        </figure>
      </div>
    </section>
  );
};

export default Science;
