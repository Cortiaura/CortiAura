import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const { name, email, subject, message } = (req.body || {}) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, message: 'Missing required fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '');
    if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM || !process.env.MAIL_TO) {
      return res.status(500).json({ ok: false, message: 'Email configuration missing on server' });
    }

    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${String(message).replace(/\n/g, '<br/>')}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Email failed to send' });
  }
}
