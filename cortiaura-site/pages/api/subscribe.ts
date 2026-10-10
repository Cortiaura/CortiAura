import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { ok: boolean; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Founding page interest values -> HubSpot "Interests" (ca_interests) option values.
const INTEREST_MAP: Record<string, string> = {
  stress: 'stress_calm',
  sleep: 'sleep',
  gut: 'gut_wellbeing',
  tech: 'wearable_tech',
};

// What the visitor signed up for -> HubSpot "Signed up for" (ca_signed_up_for) option value.
const SIGNUP_MAP: Record<string, string> = {
  founding: 'founding_members_waitlist',
  newsletter: 'newsletter_blog',
};

const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';

/** Adds a value to a HubSpot multi-checkbox value ("a;b") without duplicates. */
function mergeMulti(existing: string | null | undefined, add: string[]): string {
  const set = new Set((existing || '').split(';').filter(Boolean));
  add.forEach((v) => set.add(v));
  return Array.from(set).join(';');
}

/**
 * Adds or updates a sign-up as a contact in CortiAura's HubSpot.
 * - source 'founding' (default) joins the Founding Members waitlist.
 * - source 'newsletter' joins the newsletter and blog list.
 * Existing contacts keep their other details; choices are added, never removed.
 * Requires HUBSPOT_ACCESS_TOKEN (a HubSpot private app token with contact read/write access).
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

  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.error('Missing HUBSPOT_ACCESS_TOKEN');
    return res.status(500).json({ ok: false, message: 'Sign-up is temporarily unavailable. Please try again later.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const signup = SIGNUP_MAP[typeof source === 'string' ? source : 'founding'] || SIGNUP_MAP.founding;
  const cleanInterests = Array.isArray(interests)
    ? interests.map((i: unknown) => (typeof i === 'string' ? INTEREST_MAP[i] : undefined)).filter(Boolean) as string[]
    : [];

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  try {
    // Look up an existing contact by email so we add to, rather than overwrite, their choices.
    const lookup = await fetch(
      `${HUBSPOT_API}/${encodeURIComponent(cleanEmail)}?idProperty=email&properties=ca_signed_up_for,ca_interests,ca_audience,ca_lead_source_channel`,
      { headers }
    );

    let existing: Record<string, string | null> | null = null;
    let id: string | null = null;
    if (lookup.status === 200) {
      const body = await lookup.json();
      id = body.id;
      existing = body.properties || {};
    } else if (lookup.status !== 404) {
      console.error('HubSpot lookup error:', lookup.status, await lookup.text());
      return res.status(502).json({ ok: false, message: 'Sign-up failed. Please try again.' });
    }

    const properties: Record<string, string> = {
      email: cleanEmail,
      ca_signed_up_for: mergeMulti(existing?.ca_signed_up_for, [signup]),
      hs_legal_basis: 'Freely given consent from contact',
      ca_email_consent_date: new Date().toISOString().slice(0, 10),
    };
    if (cleanInterests.length) properties.ca_interests = mergeMulti(existing?.ca_interests, cleanInterests);
    if (typeof name === 'string' && name.trim()) properties.firstname = name.trim().slice(0, 100);
    if (typeof country === 'string' && country.trim()) properties.country = country.trim().slice(0, 100);
    // Only set audience and source for new contacts, so investors or partners keep their tags.
    if (!existing?.ca_audience && signup === SIGNUP_MAP.founding) properties.ca_audience = 'founding_member';
    if (!existing?.ca_lead_source_channel) properties.ca_lead_source_channel = 'website';

    const write = await fetch(id ? `${HUBSPOT_API}/${id}` : HUBSPOT_API, {
      method: id ? 'PATCH' : 'POST',
      headers,
      body: JSON.stringify({ properties }),
    });

    if (write.status === 200 || write.status === 201) {
      return res.status(200).json({ ok: true, message: 'Subscribed' });
    }

    console.error('HubSpot write error:', write.status, await write.text());
    return res.status(502).json({ ok: false, message: 'Sign-up failed. Please try again.' });
  } catch (err) {
    console.error('HubSpot request failed:', err);
    return res.status(502).json({ ok: false, message: 'Sign-up failed. Please try again.' });
  }
}
