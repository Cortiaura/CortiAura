import React from 'react';
import Link from 'next/link';

type Ref = { n: number };
const Cite: React.FC<Ref> = ({ n }) => (
  <sup className="text-xs text-muted">
    <a href={`#ref-${n}`} className="hover:text-garnet">[{n}]</a>
  </sup>
);

export const FAQ = [
  {
    q: 'What is the gut–brain axis?',
    a: 'The gut–brain axis is the two-way communication network between your digestive system and your brain. It works through nerves, gut hormones, the immune system and signals from gut microbes. It helps explain why stress can upset your stomach, and why how your gut feels can affect your mood and wellbeing.',
  },
  {
    q: 'What does the vagus nerve do?',
    a: 'The vagus nerve is the longest cranial nerve, running from the brainstem down through the chest to the abdomen, including the gut. It is the main nerve of the parasympathetic nervous system, which supports the body’s “rest and digest” state. Around 80% of its fibres carry information from the body to the brain, making it a key line of gut–brain communication.',
  },
  {
    q: 'How does stress affect the gut?',
    a: 'When you are stressed, your body shifts towards “fight or flight”. The nerves that control the gut respond too, which can change how it moves and how sensitive it feels. NHS guidance notes that stress and anxiety can trigger or worsen gut symptoms in some people.',
  },
  {
    q: 'What is non-invasive vagus nerve stimulation?',
    a: 'Vagus nerve stimulation uses gentle electrical signals to stimulate the vagus nerve. Implanted stimulators have been used in epilepsy care for more than 20 years. Non-invasive approaches work through the skin, at the neck or the ear, with no surgery; one such device is recommended by NICE for cluster headache. A 2022 review of ear-based stimulation studies found side effects were generally mild and short-lived. Research into other uses is ongoing.',
  },
  {
    q: 'Can I buy CortiAura yet?',
    a: 'Not yet. CortiAura is in development. Join our Founding Community and we will let you know about our progress and when CortiAura becomes available.',
  },
];

// Reference numbers shown after each answer, in FAQ order.
const FAQ_REFS: number[][] = [[1], [2], [1, 3], [4, 5, 6], []];

const REFERENCES = [
  {
    text: 'Mayer EA. Gut feelings: the emerging biology of gut–brain communication.',
    source: 'Nature Reviews Neuroscience 2011;12:453–466.',
    url: 'https://www.nature.com/articles/nrn3071',
  },
  {
    text: 'Bonaz B, Bazin T, Pellissier S. The vagus nerve at the interface of the microbiota–gut–brain axis.',
    source: 'Frontiers in Neuroscience 2018;12:49.',
    url: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2018.00049/full',
  },
  {
    text: 'NHS inform. IBS and your mental health.',
    source: 'NHS Scotland.',
    url: 'https://www.nhsinform.scot/illnesses-and-conditions/stomach-liver-and-gastrointestinal-tract/irritable-bowel-syndrome-ibs/ibs-and-your-mental-health/',
  },
  {
    text: 'NICE. Vagus nerve stimulation for refractory epilepsy in children (IPG50).',
    source: '2004.',
    url: 'https://www.nice.org.uk/guidance/ipg50',
  },
  {
    text: 'NICE. gammaCore for cluster headache (MTG46).',
    source: '2019.',
    url: 'https://www.nice.org.uk/guidance/mtg46',
  },
  {
    text: 'Kim AY, Marduy A, de Melo PS, et al. Safety of transcutaneous auricular vagus nerve stimulation (taVNS): a systematic review and meta-analysis.',
    source: 'Scientific Reports 2022;12:22055.',
    url: 'https://www.nature.com/articles/s41598-022-25864-1',
  },
];

const GutBrain: React.FC = () => {
  return (
    <section className="bg-misty" aria-labelledby="gut-brain-heading">
      <div className="container-site py-20 md:py-24">
        <p className="eyebrow">The gut–brain connection</p>
        <h2 id="gut-brain-heading" className="heading-lg mt-4 max-w-[820px]">
          Your gut, your brain and your stress response are more connected than you think.
        </h2>
        <p className="mt-6 max-w-[760px] text-lg text-ink">
          Feeling stressed can unsettle your stomach, and an unsettled gut can affect your mood, energy and sleep.
          Science is revealing how closely the digestive system and the nervous system work together, and why that
          connection matters for everyday wellbeing.
        </p>

        <h3 className="heading-md mt-16">Your questions, answered</h3>
        <div className="mt-6 flex max-w-[880px] flex-col gap-3">
          {FAQ.map((item, i) => (
            <details key={item.q} className="group rounded-xl bg-white px-7 py-5" open={i === 0}>
              <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-garnet transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-ink">
                {item.a}
                {FAQ_REFS[i].map((n) => (
                  <Cite key={n} n={n} />
                ))}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 max-w-[880px] text-[13px] leading-relaxed text-muted">
          <p className="font-semibold text-ink">References</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {REFERENCES.map((r, i) => (
              <li key={r.url} id={`ref-${i + 1}`}>
                {r.text}{' '}
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-garnet">
                  {r.source}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <Link href="/founding" className="btn-primary mt-10">
          Get updates on CortiAura
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
};

export default GutBrain;
