import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';

const WHY = [
  { title: 'Founded where the problem is', text: 'Led by an NHS consultant gastroenterologist who sees the limits of today’s options in clinic every week.' },
  { title: 'Safety-first engineering', text: 'Built to ISO 13485, ISO 14971 and IEC 60601 from the first prototype with an experienced UK medical device partner.' },
  { title: 'Proprietary technology', text: 'Our approach is protected as we develop it. Technical detail is shared under NDA.' },
  { title: 'Flexible route to market', text: 'Designed to the highest standards so we can choose the right market entry with confidence.' },
];

const PROGRESS = [
  'Concept and scientific basis established',
  'Ranked in the top 15% of applications to the Cambridge NeuroWorks Blue Sky Proof-of-Concept Fund, powered by ARIA',
  'UK medical device engineering partner engaged; prototype development underway',
  'Early safety and feasibility study designed',
  'Regulatory and quality roadmap in place',
  'Founding Community of early adopters launched',
];

const FUNDS = [
  { title: 'Prototype completion', text: 'From engineering design to working device' },
  { title: 'Safety and bench testing', text: 'Verification against recognised standards' },
  { title: 'Early study', text: 'Safety and feasibility with clinical collaborators' },
  { title: 'Protecting our IP', text: 'Building a defensible position as we grow' },
];

const INVESTOR_TYPES = ['An angel investor', 'A venture capital fund', 'A family office', 'A strategic / industry partner', 'Other'];

type Status = { type: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

const Tick = () => (
  <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-garnet" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

function DeckForm() {
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const payload = {
      name: String(d.get('name') || ''),
      email: String(d.get('email') || ''),
      organisation: String(d.get('organisation') || ''),
      investorType: String(d.get('investorType') || ''),
      linkedin: String(d.get('linkedin') || ''),
      certify: d.get('certify') === 'on',
    };
    if (!payload.certify) return setStatus({ type: 'error', message: 'Please confirm the investor statement.' });
    setStatus({ type: 'submitting' });
    try {
      const res = await fetch('/api/investor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setStatus({ type: 'success' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: json?.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  if (status.type === 'success') {
    return (
      <div className="py-6 text-center" role="status">
        <h3 className="heading-md">Thank you.</h3>
        <p className="mt-3 text-ink">We have received your request and will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="iv-name" className="field-label">Full name</label>
          <input id="iv-name" name="name" type="text" required autoComplete="name" className="field" />
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="iv-email" className="field-label">Email</label>
          <input id="iv-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="iv-org" className="field-label">
            Fund or organisation <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="iv-org" name="organisation" type="text" autoComplete="organization" className="field" />
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="iv-type" className="field-label">I am</label>
          <select id="iv-type" name="investorType" required className="field" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {INVESTOR_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="iv-linkedin" className="field-label">
          LinkedIn profile <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="iv-linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" className="field" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input type="checkbox" name="certify" required className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
        <span>
          I confirm I am a certified high net worth investor, a certified or self-certified sophisticated investor, or an
          investment professional, and I understand investing in early-stage companies carries a high risk of losing all the
          money invested.
        </span>
      </label>
      {status.type === 'error' && (
        <p role="alert" className="text-[15px] text-red-700">
          {status.message}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={status.type === 'submitting'}>
        {status.type === 'submitting' ? 'Sending…' : 'Request the deck'}
      </button>
    </form>
  );
}

export default function InvestorsPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Investors | CortiAura</title>
        <meta name="description" content="Information for investors interested in CortiAura, a UK gut–brain neurotechnology company." />
        {/* Kept out of search results: investment information is shared with eligible investors on request. */}
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <section className="bg-raisin text-white">
          <div className="container-site flex flex-wrap items-center gap-14 py-24">
            <div className="min-w-0 flex-[1_1_600px]">
              <p className="eyebrow-light">For investors · Pre-seed round open</p>
              <h1 className="heading-xl mt-5 text-white">Building the next generation of gut–brain neurotechnology.</h1>
              <p className="mt-6 max-w-[620px] text-[20px] leading-relaxed text-[#E8DEDF]">
                CortiAura is a UK neurotechnology company developing a non-invasive wearable that works with the gut–brain
                axis, founded by a consultant gastroenterologist and a neuroscientist, and engineered to medical device
                safety standards from day one.
              </p>
              <a href="#deck" className="btn-white mt-9">
                Request the investor deck
              </a>
            </div>
            <div className="flex min-w-0 flex-[1_1_240px] justify-center">
              <img src="/assets/symbol-white.svg" alt="" className="w-[180px] opacity-90" />
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="why-heading">
          <div className="container-site py-24">
            <p className="eyebrow">Why CortiAura</p>
            <h2 id="why-heading" className="heading-lg mt-4 max-w-[760px]">A clinician-led company, built to de‑risk.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY.map((w) => (
                <div key={w.title} className="rounded-xl bg-misty p-8">
                  <h3 className="heading-md !text-[24px]">{w.title}</h3>
                  <p className="mt-3 text-ink">{w.text}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-8 inline-block font-semibold text-garnet hover:text-imperial">
              Meet the founders <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section className="bg-misty">
          <div className="container-site flex flex-wrap gap-12 py-24">
            <div className="min-w-0 flex-[1_1_440px]">
              <p className="eyebrow">Progress so far</p>
              <h2 className="heading-lg mt-4 md:!text-[40px]">What we have done</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {PROGRESS.map((p) => (
                  <li key={p} className="flex gap-3.5">
                    <Tick />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 flex-[1_1_440px]">
              <p className="eyebrow">This round</p>
              <h2 className="heading-lg mt-4 md:!text-[40px]">What it will fund</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {FUNDS.map((f) => (
                  <li key={f.title} className="rounded-lg bg-white px-6 py-4">
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-[15px] text-ink">{f.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="deck" className="scroll-mt-24 bg-white" aria-labelledby="deck-heading">
          <div className="container-site flex flex-wrap items-start gap-14 py-24">
            <div className="min-w-0 flex-[1_1_380px]">
              <p className="eyebrow">Investor deck</p>
              <h2 id="deck-heading" className="heading-lg mt-4">Request our deck.</h2>
              <p className="mt-5 text-ink">
                Tell us a little about yourself and we will be in touch, usually within two working days, to arrange a short
                introductory call and share our investor materials.
              </p>
              <p className="mt-4 text-ink">
                Prefer email?{' '}
                <a href="mailto:Prashant@cortiaura.com" className="text-garnet underline underline-offset-2">
                  Prashant@cortiaura.com
                </a>
              </p>
            </div>
            <div className="min-w-0 flex-[1_1_480px] rounded-2xl bg-misty p-8 md:p-10">
              <DeckForm />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <p className="container-site border-t border-line py-8 text-[13px] leading-relaxed text-muted">
            This page is for information only and is not an offer or invitation to buy shares. Investment opportunities are
            made available only to eligible investors through formal documentation. Investing in early-stage companies
            carries significant risk, including the loss of all capital invested.
          </p>
        </section>
      </main>
    </SiteLayout>
  );
}
