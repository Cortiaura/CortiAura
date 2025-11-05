import type { NextApiRequest, NextApiResponse } from 'next';

// Mocked email handler: Accepts POST { name, email, subject, message }
// If you later add an email provider/SMTP, wire it here. Until then, returns { ok: true }.
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

  // Placeholder for real email integration
  // Example: send via SMTP or a service (e.g., Resend, SendGrid).
  // Intended recipient: Prashant@cortiaura.com
  // For now, we mock success to let the UI flow complete.
  return res.status(200).json({ ok: true });
}
