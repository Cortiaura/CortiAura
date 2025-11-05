import React, { useState } from 'react';

const GetInvolved: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (value: string) => {
    // Basic, practical email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const role = String(form.get('role') || '');

    // Light validation
    if (!name || name.length < 2) {
      setStatus('Please enter your name (2+ characters).');
      setStatusType('error');
      return;
    }
    if (!email || !isValidEmail(email)) {
      setStatus('Please enter a valid email address.');
      setStatusType('error');
      return;
    }

    setLoading(true);
    setStatus('');
    setStatusType('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role }),
      });
      if (res.ok) {
        setStatus("Thank you — you're on the list!");
        setStatusType('success');
        e.currentTarget.reset();
      } else {
        setStatus('Something went wrong. Please try again.');
        setStatusType('error');
      }
    } catch (err) {
      setStatus('Something went wrong. Please try again.');
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="get-involved" className="relative bg-[#0B0B1A] py-24 md:py-32 text-center">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Be part of the calm movement.
        </h2>
        <p className="mt-4 text-[#F9F6FA]/80 max-w-xl mx-auto">
          Join our waitlist for updates, early access and research insights.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 mx-auto max-w-lg rounded-2xl bg-white/[0.03] backdrop-blur p-8 border border-white/10 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#63D7C7]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#63D7C7]"
          />
          <select
            name="role"
            className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#63D7C7]"
            defaultValue=""
          >
            <option value="" className="text-black">I'm interested as...</option>
            <option value="participant" className="text-black">Participant</option>
            <option value="advisor" className="text-black">Advisor</option>
            <option value="investor" className="text-black">Investor</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-gradient-to-r from-[#AF98E4] to-[#63D7C7] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Join the CortiAura Waitlist'}
          </button>
        </form>

        <p
          id="status"
          className={
            `mt-6 ${statusType === 'success' ? 'text-[#63D7C7]/90' : statusType === 'error' ? 'text-red-300/90' : 'text-[#63D7C7]/80'}`
          }
        >
          {status}
        </p>
      </div>

      <div className="absolute -top-16 inset-x-0 h-16 bg-gradient-to-b from-[#0B0B1A]/0 to-[#0B0B1A]" />
    </section>
  );
};

export default GetInvolved;
