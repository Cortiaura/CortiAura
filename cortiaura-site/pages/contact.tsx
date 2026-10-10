import React from 'react';
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = { type: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

export default function ContactPage() {
  const [form, setForm] = React.useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name (2+ characters).' });
      return;
    }
    if (!emailRegex.test(form.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' });
      return;
    }
    if (!form.subject.trim()) {
      setStatus({ type: 'error', message: 'Please add a subject.' });
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Please write a short message (10+ characters).' });
      return;
    }

    setStatus({ type: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        setStatus({ type: 'success', message: 'Thanks for reaching out. We’ll get back to you soon.' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data?.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  return (
    <SiteLayout>
      <Head>
        <title>Contact | CortiAura</title>
        <meta name="description" content="Contact CortiAura with questions, clinical or research collaboration ideas, or feedback." />
        <link rel="canonical" href="https://www.cortiaura.com/contact" />
      </Head>
      <main>
        <PageHeader
          eyebrow="Contact"
          title="Get in touch"
          intro={
            <>
              We welcome questions and collaborations, especially from clinicians and researchers in gastroenterology and
              neuroscience. Email{' '}
              <a className="text-garnet underline underline-offset-2" href="mailto:Prashant@cortiaura.com">
                Prashant@cortiaura.com
              </a>{' '}
              or use the form below.
            </>
          }
        />
        <section className="container-site max-w-[760px] py-14">
          <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-wrap gap-5">
              <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
                <label className="field-label" htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} className="field" autoComplete="name" />
              </div>
              <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={form.email} onChange={onChange} className="field" autoComplete="email" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={onChange} className="field" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="field-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} className="field py-3" />
            </div>

            {status.type !== 'idle' && (
              <p
                role="status"
                className={
                  status.type === 'error' ? 'text-[15px] text-red-700' : status.type === 'success' ? 'text-[15px] text-green-800' : 'text-[15px] text-ink'
                }
              >
                {status.message || (status.type === 'submitting' ? 'Sending…' : '')}
              </p>
            )}

            <div>
              <button type="submit" disabled={status.type === 'submitting'} className="btn-primary">
                {status.type === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </SiteLayout>
  );
}
