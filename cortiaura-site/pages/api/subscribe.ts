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

  // API key is required for live calls
  if (!apiKey) {
    return res.status(500).json({ ok: false, message: 'Missing MAILERLITE_API_KEY' });
  }

  try {
    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: { name, role },
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    if (mlRes.status === 200 || mlRes.status === 201) {
      console.log('MailerLite success, sending response');
      const responseData = { ok: true, message: 'Subscribed' };
      console.log('Response data:', responseData);
      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(responseData);
    }

    const text = await mlRes.text();
    console.error('MailerLite error:', mlRes.status, text);
    return res.status(500).json({ ok: false, message: 'Subscription failed' });
  } catch (err) {
    console.error('MailerLite request failed:', err);
    return res.status(500).json({ ok: false, message: 'Request failed' });
  }
}
