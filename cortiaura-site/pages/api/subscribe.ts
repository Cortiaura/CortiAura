import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { ok: boolean; message?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const { email, name, role } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ ok: false, message: 'Email is required' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // Option B: If no API key configured yet, mock success so we can verify UI flow
  if (!apiKey) {
    return res.status(200).json({ ok: true });
  }

  try {
    const mlRes = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        name,
        fields: { role },
        resubscribe: true,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    if (mlRes.ok) {
      return res.status(200).json({ ok: true });
    }

    const text = await mlRes.text();
    return res.status(mlRes.status || 500).json({ ok: false, message: text || 'Subscription failed' });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Request failed' });
  }
}
