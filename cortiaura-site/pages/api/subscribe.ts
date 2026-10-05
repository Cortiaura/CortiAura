import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { ok: boolean; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_INTERESTS = ['stress', 'sleep', 'gut', 'tech'];

/**
 * Adds a subscriber to MailerLite.
 * - Founding Community sign-ups (source: 'founding') go to MAILERLITE_FOUNDING_GROUP_ID,
 *   falling back to MAILERLITE_GROUP_ID if that is not set.
 * - Other sign-ups go to MAILERLITE_GROUP_ID.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const { email, name, country, interests, consent, source } = req.body || {};

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
  }
  if (consent !== true) {
    return res.status(400).json({ ok: false, message: 'Please tick the box to agree to receive emails.' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId =
    source === 'founding'
      ? process.env.MAILERLITE_FOUNDING_GROUP_ID || process.env.MAILERLITE_GROUP_ID
      : process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    console.error('Missing MAILERLITE_API_KEY');
    return res.status(500).json({ ok: false, message: 'Sign-up is temporarily unavailable. Please try again later.' });
  }

  const cleanInterests = Array.isArray(interests)
    ? interests.filter((i: unknown) => typeof i === 'string' && ALLOWED_INTERESTS.includes(i))
    : [];

  const fields: Record<string, string> = {};
  if (typeof name === 'string' && name.trim()) fields.name = name.trim().slice(0, 100);
  if (typeof country === 'string' && country.trim()) fields.country = country.trim().slice(0, 100);
  if (cleanInterests.length) fields.interest = cleanInterests.join(', ');

  try {
    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: email.trim(),
        fields,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    if (mlRes.status === 200 || mlRes.status === 201) {
      return res.status(200).json({ ok: true, message: 'Subscribed' });
    }

    console.error('MailerLite error:', mlRes.status, await mlRes.text());
    return res.status(502).json({ ok: false, message: 'Sign-up failed. Please try again.' });
  } catch (err) {
    console.error('MailerLite request failed:', err);
    return res.status(502).json({ ok: false, message: 'Sign-up failed. Please try again.' });
  }
}
