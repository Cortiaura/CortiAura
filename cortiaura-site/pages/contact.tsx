import React from 'react';
import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

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
        <title>Contact — CortiAura™</title>
        <meta name="description" content="Contact CortiAura — send us your questions, partnership requests, or feedback." />
      </Head>
      <main className="bg-[#231F20] py-16">
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">Contact Us</h1>
          <p className="mt-3 text-center text-[#F9F6FA]/80">We welcome questions and collaborations. Email us at <a className="underline hover:text-white" href="mailto:Prashant@cortiaura.com">Prashant@cortiaura.com</a> or use the form below.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#970148]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#63D7C7]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#63D7C7]"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={onChange}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#63D7C7]"
                placeholder="Share details about your query or interest"
              />
            </div>

            {status.type !== 'idle' && (
              <p className={
                status.type === 'error'
                  ? 'text-sm text-red-400'
                  : status.type === 'success'
                  ? 'text-sm text-emerald-400'
                  : 'text-sm text-[#F9F6FA]/80'
              }>
                {status.message || (status.type === 'submitting' ? 'Sending…' : '')}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status.type === 'submitting'}
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-white font-bold shadow-md transition hover:opacity-95 disabled:opacity-50 bg-gradient-to-r from-[#970148] to-[#FBDDCF]"
              >
                {status.type === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </SiteLayout>
  );
}
