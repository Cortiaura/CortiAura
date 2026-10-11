import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { CLINIC_TYPES, CLINIC_INTERESTS } from '../lib/clinic';

const WHO = [
  { title: 'Private gastroenterology', text: 'Clinics seeing patients with IBS and other disorders of gut–brain interaction.' },
  { title: 'Functional and integrative medicine', text: 'Practices taking a whole-person approach to gut health, stress and recovery.' },
  { title: 'Wellness and lifestyle clinics', text: 'Services supporting sleep, stress and everyday wellbeing.' },
  { title: 'Private GP and multi-specialty groups', text: 'Primary care and hospital groups looking ahead to new gut–brain care options.' },
];

const OFFER = [
  { title: 'Evidence first', text: 'Plain-English summaries of our research and the wider science, before anyone else.' },
  { title: 'Shape the product', text: 'Clinical input into how CortiAura fits real clinic workflows.' },
  { title: 'Pilot opportunities', text: 'Invitations to take part in future studies, where suitable and approved.' },
  { title: 'Early access', text: 'Priority consideration once CortiAura is available for clinic use.' },
];

const STEPS = [
  'Register your interest using the form below.',
  'We send a short welcome and our latest evidence update.',
  'We arrange a call when there is a relevant opportunity for your clinic.',
];

type Status = { type: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

function ClinicForm() {
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const payload = {
      name: String(d.get('name') || ''),
      email: String(d.get('email') || ''),
      role: String(d.get('role') || ''),
      clinic: String(d.get('clinic') || ''),
      clinicType: String(d.get('clinicType') || ''),
      town: String(d.get('town') || ''),
      website: String(d.get('website') || ''),
      interests: d.getAll('interests').map(String),
      notes: String(d.get('notes') || ''),
      consent: d.get('consent') === 'on',
    };
    if (!payload.consent) return setStatus({ type: 'error', message: 'Please tick the box so we can contact you.' });
    setStatus({ type: 'submitting' });
    try {
      const res = await fetch('/api/clinic', {
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
        <p className="mt-3 text-ink">
          We have your details and will be in touch, usually within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="cl-name" className="field-label">Full name</label>
          <input id="cl-name" name="name" type="text" required autoComplete="name" className="field" />
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="cl-email" className="field-label">Work email</label>
          <input id="cl-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="cl-clinic" className="field-label">Clinic or organisation</label>
          <input id="cl-clinic" name="clinic" type="text" required autoComplete="organization" className="field" />
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="cl-role" className="field-label">
            Your role <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="cl-role" name="role" type="text" autoComplete="organization-title" placeholder="e.g. Medical director" className="field" />
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="cl-type" className="field-label">Type of clinic</label>
          <select id="cl-type" name="clinicType" required className="field" defaultValue="">
            <option value="" disabled>Choose one</option>
            {CLINIC_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor="cl-town" className="field-label">
            Town or city <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="cl-town" name="town" type="text" autoComplete="address-level2" className="field" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cl-web" className="field-label">
          Clinic website <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="cl-web" name="website" type="url" placeholder="https://" className="field" />
      </div>
      <fieldset className="flex flex-col gap-2.5">
        <legend className="field-label mb-1">I am interested in</legend>
        {Object.entries(CLINIC_INTERESTS).map(([value, label]) => (
          <label key={value} className="flex cursor-pointer items-center gap-3 text-[15px] text-ink">
            <input type="checkbox" name="interests" value={value} className="h-[18px] w-[18px] shrink-0 accent-garnet" />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cl-notes" className="field-label">
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="cl-notes" name="notes" rows={3} className="field" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
        <input type="checkbox" name="consent" required className="mt-1 h-[18px] w-[18px] shrink-0 accent-garnet" />
        <span>
          I agree that CortiAura may contact me about clinic partnerships and updates. I can unsubscribe at any time. See our{' '}
          <Link href="/privacy" className="text-garnet underline underline-offset-2">privacy policy</Link>.
        </span>
      </label>
      {status.type === 'error' && (
        <p role="alert" className="text-[15px] text-red-700">{status.message}</p>
      )}
      <button type="submit" className="btn-primary" disabled={status.type === 'submitting'}>
        {status.type === 'submitting' ? 'Sending…' : 'Register clinic interest'}
      </button>
    </form>
  );
}

export default function ClinicsPage() {
  return (
    <SiteLayout>
      <Head>
        <title>For clinics: become a founding clinic partner | CortiAura</title>
        <meta
          name="description"
          content="CortiAura is inviting UK private, functional medicine and wellness clinics to become founding clinic partners as we develop gut–brain neurotechnology."
        />
        <link rel="canonical" href="https://www.cortiaura.com/clinics" />
      </Head>
      <main>
        <section className="bg-misty">
          <div className="container-site flex flex-wrap items-center gap-14 py-24">
            <div className="min-w-0 flex-[1_1_600px]">
              <p className="eyebrow">For clinics · Founding clinic partners</p>
              <h1 className="heading-xl mt-5">Help shape the future of gut–brain care.</h1>
              <p className="mt-6 max-w-[640px] text-[20px] leading-relaxed text-ink">
                CortiAura is developing non-invasive neurotechnology built around the gut–brain connection. We are inviting a
                small group of UK clinics to follow our progress closely and help shape how it reaches patients.
              </p>
              <a href="#register" className="btn-primary mt-9">Register your clinic</a>
            </div>
            <div className="flex min-w-0 flex-[1_1_240px] justify-center">
              <img src="/assets/symbol.svg" alt="" className="w-[170px]" />
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="who-heading">
          <div className="container-site py-24">
            <p className="eyebrow">Who it is for</p>
            <h2 id="who-heading" className="heading-lg mt-4 max-w-[760px]">Clinics that see the gut–brain connection every day.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHO.map((w) => (
                <div key={w.title} className="rounded-xl bg-misty p-8">
                  <h3 className="heading-md !text-[24px]">{w.title}</h3>
                  <p className="mt-3 text-ink">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-misty" aria-labelledby="offer-heading">
          <div className="container-site flex flex-wrap gap-12 py-24">
            <div className="min-w-0 flex-[1_1_440px]">
              <p className="eyebrow">What partners receive</p>
              <h2 id="offer-heading" className="heading-lg mt-4 md:!text-[40px]">A closer view, and a voice.</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {OFFER.map((o) => (
                  <li key={o.title} className="rounded-lg bg-white px-6 py-4">
                    <p className="font-semibold">{o.title}</p>
                    <p className="text-[15px] text-ink">{o.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 flex-[1_1_440px]">
              <p className="eyebrow">How it works</p>
              <h2 className="heading-lg mt-4 md:!text-[40px]">Simple, and no commitment.</h2>
              <ol className="mt-6 flex flex-col gap-4">
                {STEPS.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-garnet font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1.5">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-ink">
                Founded by an NHS gastroenterologist and a neuroscientist. Read our latest thinking on the{' '}
                <Link href="/blog" className="text-garnet underline underline-offset-2">blog</Link>, or{' '}
                <Link href="/about" className="text-garnet underline underline-offset-2">meet the founders</Link>.
              </p>
            </div>
          </div>
        </section>

        <section id="register" className="scroll-mt-24 bg-white" aria-labelledby="register-heading">
          <div className="container-site flex flex-wrap items-start gap-14 py-24">
            <div className="min-w-0 flex-[1_1_380px]">
              <p className="eyebrow">Register interest</p>
              <h2 id="register-heading" className="heading-lg mt-4">Become a founding clinic partner.</h2>
              <p className="mt-5 text-ink">
                Registering is free and places you under no obligation. We will only contact you about CortiAura clinic
                partnerships and updates.
              </p>
              <p className="mt-4 text-ink">
                Prefer email?{' '}
                <a href="mailto:Prashant@cortiaura.com" className="text-garnet underline underline-offset-2">
                  Prashant@cortiaura.com
                </a>
              </p>
            </div>
            <div className="min-w-0 flex-[1_1_480px] rounded-2xl bg-misty p-8 md:p-10">
              <ClinicForm />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <p className="container-site border-t border-line py-8 text-[13px] leading-relaxed text-muted">
            CortiAura is in development and is not yet available for clinical use or sale. Nothing on this page is a claim about
            the safety or effectiveness of any product. Any future pilot study will take place only with the necessary
            regulatory and ethical approvals.
          </p>
        </section>
      </main>
    </SiteLayout>
  );
}
