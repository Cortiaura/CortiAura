import React from 'react';

const STANDARDS = ['ISO 13485 · Quality management', 'ISO 14971 · Risk management', 'IEC 60601 · Electrical safety'];

const MILESTONES = [
  { status: 'Complete', label: 'Concept & science', done: true },
  { status: 'In progress', label: 'Prototype engineering', done: true },
  { status: 'Next', label: 'Safety & bench testing', done: false },
  { status: 'Designed', label: 'Early safety study', done: false },
  { status: 'Planned', label: 'Launch readiness', done: false },
];

const Safety: React.FC = () => {
  return (
    <section id="safety" className="bg-raisin text-white" aria-labelledby="safety-heading">
      <div className="container-site py-24">
        <p className="eyebrow-light">Built safely, built to standard</p>
        <h2 id="safety-heading" className="heading-lg mt-4 max-w-[760px] text-white">
          Safety designed in from day one, not added later.
        </h2>
        <p className="mt-6 max-w-[680px] text-[#E8DEDF]">
          We are building CortiAura to recognised medical device safety standards from the very first prototype: the
          highest bar, whatever route to market we take.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {STANDARDS.map((s) => (
            <li key={s} className="rounded-full border border-[#6B6365] px-4 py-2 text-[15px]">
              {s}
            </li>
          ))}
        </ul>
        <ol className="mt-16 flex flex-wrap" aria-label="Development milestones">
          {MILESTONES.map((m) => (
            <li
              key={m.label}
              className={'min-w-0 flex-[1_1_180px] border-t-[3px] pb-6 pr-5 pt-6 ' + (m.done ? 'border-blush' : 'border-[#6B6365]')}
            >
              <p className={'text-[13px] font-semibold uppercase tracking-[0.1em] ' + (m.done ? 'text-blush' : 'text-[#BDB3B5]')}>
                {m.status}
              </p>
              <p className="mt-2 font-semibold">{m.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Safety;
