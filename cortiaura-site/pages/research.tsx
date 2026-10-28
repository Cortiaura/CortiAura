import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { SITE_URL } from '../lib/site';
import { RESEARCH_COUNTRIES, RESEARCH_PATHWAYS, RESEARCH_TOPICS } from '../lib/research';

const FOCUS = [
  {
    title: 'The gut–brain axis',
    text: 'The two-way connection between the digestive system and the brain, through nerves, hormones and the immune system.',
  },
  {
    title: 'Digestive health',
    text: 'We expect future studies to include people living with digestive conditions such as irritable bowel syndrome (IBS) and Crohn’s disease.',
  },
  {
    title: 'The vagus nerve',
    text: 'The longest nerve of the autonomic nervous system, and a major route for signals between the gut and the brain.',
  },
  {
    title: 'Stress, sleep and recovery',
    text: 'How everyday stress and rest show up in the body, including measures such as heart rate variability.',
  },
];

const WAYS = [
  {
    eyebrow: 'Option 1',
    title: 'Research interest register',
    text: 'Be among the first to hear when a CortiAura study opens. We will send you the official study information, and you decide whether you would like to take part. You can register now, before any study has started.',
    points: ['One email when a study opens', 'No obligation to take part', 'Leave the register at any time'],
  },
  {
    eyebrow: 'Option 2',
    title: 'Patient and public involvement panel',
    text: 'Help us design research that works for the people taking part. Panel members review study plans and information leaflets, and tell us what taking part would really involve, before a study starts.',
    points: [
      'Open to people with lived experience of digestive conditions, carers and members of the public',
      'Occasional short sessions, online',
      'Joining the panel is separate from taking part in a study',
    ],
  },
];

const GOOD_TO_KNOW = [
  'No study is recruiting yet. Registering does not enrol you in a study or guarantee a place.',
  'Any study will start only once it has the necessary approvals, including from an independent research ethics committee and, where required, the MHRA.',
  'We do not ask about your health on this page. If a study opens, the study team will check eligibility privately and in confidence.',
  'Taking part in research is always voluntary. You can change your mind at any time without giving a reason.',
  'Please keep following the advice of your own doctor or care team. Do not change any treatment because of anything on this website.',
];

const FAQ = [
  {
    q: 'Is a study recruiting now?',
    a: 'Not yet. Our first study is still being designed. When a study opens, people on the register will hear about it first, with full information about what taking part involves.',
  },
  {
    q: 'Do I need a diagnosis to register?',
    a: 'No. Anyone aged 18 or over can register. Each study will have its own eligibility criteria, which the study team will explain and check with you privately.',
  },
  {
    q: 'Is this an NHS study?',
    a: 'No. CortiAura is an independent UK company, and this register is run by CortiAura. Any future study will follow UK research standards and may involve NHS or university partners; if it does, we will tell you.',
  },
  {
    q: 'Will I be paid?',
    a: 'Registering is free and unpaid. Any payment or expenses for taking part in a study, or for panel sessions, will be explained clearly before you agree to anything.',
  },
  {
    q: 'What happens to my details?',
    a: 'We use them only to contact you about CortiAura research, and about general updates if you also choose those. We never sell your data, and you can ask us to remove you at any time. See our privacy policy for more.',
  },
];

type Status = { type: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

function ResearchForm() {
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const payload = {
      name: String(d.get('name') || ''),
      email: String(d.get('email') || ''),
      country: String(d.get('country') || ''),
      town: String(d.get('town') || ''),
      pathways: d.getAll('pathways').map(String),
      topics: d.getAll('topics').map(String),
      adult: d.get('adult') === 'on',
      consent: d.get('consent') === 'on',
      updates: d.get('updates') === 'on',
      company: String(d.get('company') || ''),
    };
    if (!payload.name.trim()) return setStatus({ type: 'error', message: 'Please enter your first name.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim()))
      return setStatus({ type: 'error', message: 'Please enter a valid email address.' });
    if (!payload.pathways.length) return setStatus({ type: 'error', message: 'Please choose at least one way to get involved.' });
    if (!payload.adult) return setStatus({ type: 'error', message: 'Please confirm you are 18 or over.' });
    if (!payload.consent) return setStatus({ type: 'error', message: 'Please tick the box so we can contact you about research.' });
    setStatus({ type: 'submitting' });
    try {
      const res = await fetch('/api/research', {
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
        <h3 className="heading-md">Thank you for registering.</h3>
        <p className="mt-3 text-ink">
          We will be in touch when there is a research opportunity that matches what you chose. You can ask us to remove
          your details at any time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="rs-name" className="field-label">First name</label>
          <input id="rs-name" name="name" type="text" required autoComplete="given-name" className="field" />
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="rs-email" className="field-label">Email</label>
          <input id="rs-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="rs-country" className="field-label">Country</label>
          <select id="rs-country" name="country" className="field" defaultValue="United Kingdom">
            {RESEARCH_COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="rs-town" className="field-label">
            Nearest town or city <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="rs-town" name="town" type="text" autoComplete="address-level2" className="field" />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="field-label mb-1">How would you like to be involved?</legend>
        {Object.entries(RESEARCH_PATHWAYS).map(([value, p]) => (
          <label key={value} className="flex cursor-pointer items-start gap-3 text-[15px] text-ink">
            <input type="checkbox" name="pathways" value={value} defaultChecked={value === 'register'} className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
            <span className="flex flex-col">
              <span className="font-semibold text-raisin">{p.label}</span>
              <span className="text-[14px] text-muted">{p.hint}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="field-label mb-1">
          Topics you are interested in <span className="font-normal text-muted">(optional)</span>
        </legend>
        {Object.entries(RESEARCH_TOPICS).map(([value, t]) => (
          <label key={value} className="flex cursor-pointer items-center gap-3 text-[15px] text-ink">
            <input type="checkbox" name="topics" value={value} className="h-[18px] w-[18px] shrink-0 accent-garnet" />
            {t.label}
          </label>
        ))}
      </fieldset>

      <p className="rounded-lg bg-white px-4 py-3 text-[14px] text-ink">
        Please do not include any health information. We do not need it at this stage.
      </p>

      {/* Honeypot for bots: hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="rs-company">Company</label>
        <input id="rs-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input type="checkbox" name="adult" required className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
        <span>I confirm I am 18 or over.</span>
      </label>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input type="checkbox" name="consent" required className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
        <span>
          I agree that CortiAura may contact me about its research and involvement opportunities. I understand registering
          does not enrol me in a study, and I can ask to be removed at any time. See our{' '}
          <Link href="/privacy#research" className="text-garnet underline underline-offset-2">privacy policy</Link>.
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input type="checkbox" name="updates" className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
        <span>
          Also send me CortiAura’s science newsletter and general updates. <span className="text-muted">(Optional)</span>
        </span>
      </label>

      {status.type === 'error' && (
        <p role="alert" className="text-[15px] text-red-700">{status.message}</p>
      )}
      <button type="submit" className="btn-primary" disabled={status.type === 'submitting'}>
        {status.type === 'submitting' ? 'Sending…' : 'Register my interest'}
      </button>
    </form>
  );
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function ResearchPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Get involved in gut–brain research | CortiAura</title>
        <meta
          name="description"
          content="Register your interest in future CortiAura research on the gut–brain axis, or join our patient and public involvement panel to help design studies."
        />
        <link rel="canonical" href={`${SITE_URL}/research`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>
      <main>
        <section className="bg-misty">
          <div className="container-site flex flex-wrap items-center gap-14 py-24">
            <div className="min-w-0 flex-[1_1_600px]">
              <p className="eyebrow">Research · Get involved</p>
              <h1 className="heading-xl mt-5">Help shape research into the gut–brain connection.</h1>
              <p className="mt-6 max-w-[640px] text-[20px] leading-relaxed text-ink">
                CortiAura is a UK neurotechnology company in early development. Register your interest in our future
                research, or join our panel and help design studies with us before they begin.
              </p>
              <a href="#register" className="btn-primary mt-9">Register your interest</a>
            </div>
            <div className="flex min-w-0 flex-[1_1_240px] justify-center">
              <img src="/assets/symbol.svg" alt="CortiAura symbol" className="w-[170px]" />
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="focus-heading">
          <div className="container-site py-24">
            <p className="eyebrow">Our research focus</p>
            <h2 id="focus-heading" className="heading-lg mt-4 max-w-[760px]">Understanding how the gut and brain talk to each other.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FOCUS.map((f) => (
                <div key={f.title} className="rounded-xl bg-misty p-8">
                  <h3 className="heading-md !text-[24px]">{f.title}</h3>
                  <p className="mt-3 text-ink">{f.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[760px] text-ink">
              Want to read more first? Start with{' '}
              <Link href="/blog/what-is-the-gut-brain-axis" className="text-garnet underline underline-offset-2">what the gut–brain axis is</Link>{' '}
              and{' '}
              <Link href="/blog/what-does-the-vagus-nerve-do" className="text-garnet underline underline-offset-2">what the vagus nerve does</Link>.
            </p>
          </div>
        </section>

        <section className="bg-misty" aria-labelledby="ways-heading">
          <div className="container-site py-24">
            <p className="eyebrow">Two ways to get involved</p>
            <h2 id="ways-heading" className="heading-lg mt-4 max-w-[760px]">Choose one, or both.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {WAYS.map((w) => (
                <div key={w.title} className="flex flex-col rounded-xl bg-white p-8">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-garnet">{w.eyebrow}</p>
                  <h3 className="heading-md mt-2 !text-[26px]">{w.title}</h3>
                  <p className="mt-3 text-ink">{w.text}</p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {w.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] text-ink">
                        <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-garnet" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="know-heading">
          <div className="container-site max-w-[880px] py-24">
            <p className="eyebrow">Good to know</p>
            <h2 id="know-heading" className="heading-lg mt-4">Before you register.</h2>
            <ul className="mt-8 flex flex-col gap-3">
              {GOOD_TO_KNOW.map((g) => (
                <li key={g} className="rounded-lg bg-misty px-6 py-4 text-ink">{g}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="register" className="scroll-mt-24 bg-misty" aria-labelledby="register-heading">
          <div className="container-site flex flex-wrap items-start gap-14 py-24">
            <div className="min-w-0 flex-[1_1_380px]">
              <p className="eyebrow">Register interest</p>
              <h2 id="register-heading" className="heading-lg mt-4">Join the register.</h2>
              <p className="mt-5 text-ink">
                Registering takes a minute, is free and places you under no obligation. We will only contact you about
                CortiAura research and involvement opportunities, unless you also choose to receive general updates.
              </p>
              <p className="mt-4 text-ink">
                Questions?{' '}
                <a href="mailto:Prashant@cortiaura.com" className="text-garnet underline underline-offset-2">
                  Prashant@cortiaura.com
                </a>
              </p>
            </div>
            <div className="min-w-0 flex-[1_1_480px] rounded-2xl bg-white p-8 md:p-10">
              <ResearchForm />
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="faq-heading">
          <div className="container-site max-w-[880px] py-20">
            <h2 id="faq-heading" className="heading-lg">Common questions</h2>
            <div className="mt-8 flex flex-col gap-3">
              {FAQ.map((f, i) => (
                <details key={f.q} className="group rounded-xl bg-misty px-7 py-5" open={i === 0}>
                  <summary className="cursor-pointer list-none text-lg font-semibold">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-garnet transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-ink">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <p className="container-site border-t border-line py-8 text-[13px] leading-relaxed text-muted">
            CortiAura is in development and is not available to buy or for clinical use. Nothing on this page is a claim
            about the safety or effectiveness of any product, or medical advice. This register is run by CortiAura, an
            independent company, and is not an NHS service. Any future study will take place only with the necessary
            regulatory and ethical approvals.
          </p>
        </section>
      </main>
    </SiteLayout>
  );
}
