import React from 'react';
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

const BENEFITS = [
  { title: 'Priority access', text: 'Be first in line when CortiAura becomes available.', icon: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z' },
  { title: 'Founding-member discount', text: 'An exclusive discount on your first purchase at launch.', icon: 'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8zM7 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z' },
  { title: 'Behind-the-scenes updates', text: 'Occasional news from the lab and the team, straight to your inbox.', icon: 'M4 4h16v12H5.2L4 17.2zM8 9h8M8 12h5' },
  { title: 'Help shape CortiAura', text: 'Share your views in short surveys as we design the experience.', icon: 'M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.8c1.6.8 2.7 2.6 3 5.2' },
];

const STEPS = [
  { title: 'Join for free', text: 'One short form and you’re a founding member.' },
  { title: 'Follow the journey', text: 'Occasional updates as the prototype takes shape. No spam.' },
  { title: 'Share your views', text: 'Short, optional surveys that help us design CortiAura around real people.' },
  { title: 'First access at launch', text: 'You hear first, with your founding-member discount ready.' },
];

const FAQ = [
  { q: 'Does joining cost anything?', a: 'No. Joining is completely free and you are not committing to buy anything.' },
  { q: 'When will CortiAura be available?', a: 'CortiAura is in development and we are not giving a launch date yet. Founding members will be the first to hear.' },
  { q: 'How does the founding-member discount work?', a: 'Founding members will receive an exclusive discount on their first purchase when CortiAura launches. We will confirm the full terms before launch.' },
  { q: 'What will you do with my details?', a: 'We use your details only to send you CortiAura updates and offers. We never sell your data, and you can unsubscribe at any time.' },
];

const INTERESTS = [
  { value: 'stress', label: 'Stress & calm' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'gut', label: 'Gut wellbeing' },
  { value: 'tech', label: 'Wearable tech' },
];

const COUNTRIES = ['United Kingdom', 'Ireland', 'United States', 'India', 'Other'];

type Status = { type: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

function SignupForm() {
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      country: String(data.get('country') || ''),
      interests: data.getAll('interest').map(String),
      consent: data.get('consent') === 'on',
      source: 'founding',
    };
    if (!payload.name.trim()) return setStatus({ type: 'error', message: 'Please enter your first name.' });
    if (!payload.consent) return setStatus({ type: 'error', message: 'Please tick the box to agree to receive emails.' });

    setStatus({ type: 'submitting' });
    try {
      const res = await fetch('/api/subscribe', {
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
      <div className="py-8 text-center" role="status">
        <img src="/assets/symbol.svg" alt="" className="mx-auto w-16" />
        <h2 className="heading-md mt-5">Welcome to the Founding Community.</h2>
        <p className="mt-3 text-ink">
          Thank you for joining. If we have asked you to confirm your email, please check your inbox. We will be in touch
          with news from the team soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="heading-md">Join for free</h2>
      <p className="mt-2 text-[15px] text-ink">It takes 30 seconds. No payment, no obligation.</p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fc-name" className="field-label">First name</label>
          <input id="fc-name" name="name" type="text" required autoComplete="given-name" className="field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fc-email" className="field-label">Email</label>
          <input id="fc-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fc-country" className="field-label">Country</label>
          <select id="fc-country" name="country" className="field" defaultValue="United Kingdom">
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <fieldset className="flex flex-col gap-2.5">
          <legend className="field-label">
            What interests you most? <span className="font-normal text-muted">(optional)</span>
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {INTERESTS.map((i) => (
              <label
                key={i.value}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-[#CDBFC2] px-4 text-[15px] has-[:checked]:border-garnet has-[:checked]:bg-misty"
              >
                <input type="checkbox" name="interest" value={i.value} className="accent-garnet" /> {i.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
          <input type="checkbox" name="consent" required className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
          <span>
            I’d like to receive emails from CortiAura about the Founding Community, product news and launch offers. I can
            unsubscribe at any time. See our{' '}
            <a href="/privacy" className="text-garnet underline underline-offset-2">
              privacy policy
            </a>
            .
          </span>
        </label>
        {status.type === 'error' && (
          <p role="alert" className="text-[15px] text-red-700">
            {status.message}
          </p>
        )}
        <button type="submit" className="btn-primary" disabled={status.type === 'submitting'}>
          {status.type === 'submitting' ? 'Joining…' : 'Join the Founding Community'}
        </button>
      </form>
      <p className="mt-4 text-[13px] text-muted">
        Joining is free and doesn’t commit you to buy. Founding-member discount terms will be confirmed before launch.
      </p>
    </>
  );
}

export default function FoundingPage() {
  return (
    <SiteLayout>
      <Head>
        <title>Join the CortiAura Founding Community</title>
        <meta
          name="description"
          content="Be among the first to follow CortiAura, a new wearable built around the gut–brain connection. Free to join, with priority access and a founding-member discount at launch."
        />
        <link rel="canonical" href="https://cortiaura.com/founding" />
        <meta property="og:title" content="Join the CortiAura Founding Community" />
        <meta property="og:image" content="https://cortiaura.com/assets/og-image.png" />
      </Head>
      <main>
        <section className="bg-misty">
          <div className="container-site flex flex-wrap items-start gap-16 py-20">
            <div className="min-w-0 flex-[1_1_480px]">
              <p className="eyebrow">The CortiAura Founding Community</p>
              <h1 className="heading-xl mt-5">Be among the first.</h1>
              <p className="mt-6 max-w-[520px] text-[20px] leading-relaxed text-ink">
                CortiAura is a new kind of wearable, built around the connection between your gut, your brain and your
                nervous system. Join our founding members and follow the journey from the very beginning.
              </p>
              <ul className="mt-10 flex flex-col gap-5">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex items-start gap-4">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-7 w-7 shrink-0 text-garnet" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={b.icon} />
                    </svg>
                    <div>
                      <p className="font-semibold">{b.title}</p>
                      <p className="text-ink">{b.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div id="join" className="min-w-0 flex-[1_1_420px] scroll-mt-24 rounded-2xl bg-white p-8 shadow-[0_8px_32px_rgba(104,2,56,0.08)] md:p-10">
              <SignupForm />
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="next-heading">
          <div className="container-site py-20">
            <p className="eyebrow">What happens next</p>
            <h2 id="next-heading" className="heading-lg mt-4">From sign-up to launch day.</h2>
            <ol className="mt-12 flex flex-wrap gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="min-w-0 flex-[1_1_220px] border-t-[3px] border-garnet pt-5">
                  <p className="font-display text-[40px] leading-none text-garnet">{i + 1}</p>
                  <p className="mt-3 font-semibold">{s.title}</p>
                  <p className="mt-1 text-ink">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-misty" aria-labelledby="faq-heading">
          <div className="container-site max-w-[880px] py-20">
            <h2 id="faq-heading" className="heading-lg">Common questions</h2>
            <div className="mt-8 flex flex-col gap-3">
              {FAQ.map((f, i) => (
                <details key={f.q} className="group rounded-xl bg-white px-7 py-5" open={i === 0}>
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
      </main>
    </SiteLayout>
  );
}
