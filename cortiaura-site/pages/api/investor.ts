import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Emails an investor deck request to MAIL_TO. Nothing is stored on the website. */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const { name, email, organisation, investorType, linkedin, certify } = (req.body || {}) as Record<string, unknown>;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ ok: false, message: 'Please enter your full name.' });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
  }
  if (typeof investorType !== 'string' || !investorType) {
    return res.status(400).json({ ok: false, message: 'Please choose what type of investor you are.' });
  }
  if (certify !== true) {
    return res.status(400).json({ ok: false, message: 'Please confirm the investor statement.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM || !process.env.MAIL_TO) {
    console.error('Email configuration missing on server');
    return res.status(500).json({ ok: false, message: 'Requests are temporarily unavailable. Please email us instead.' });
  }

  const rows: [string, string][] = [
    ['Name', name.trim()],
    ['Email', email.trim()],
    ['Organisation', typeof organisation === 'string' ? organisation.trim() : ''],
    ['Investor type', investorType],
    ['LinkedIn', typeof linkedin === 'string' ? linkedin.trim() : ''],
    ['Self-certified eligible investor', 'Yes'],
  ];

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email.trim(),
      subject: `[Investor deck request] ${name.trim()}`,
      text: rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n'),
      html: rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v || '-')}</p>`).join(''),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Investor request email failed:', err);
    return res.status(502).json({ ok: false, message: 'Your request could not be sent. Please email us instead.' });
  }
}
