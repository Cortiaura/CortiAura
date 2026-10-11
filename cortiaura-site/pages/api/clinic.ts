import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { CLINIC_TYPES, CLINIC_INTERESTS as INTERESTS } from '../../lib/clinic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Founding clinic partner interest.
 * Adds or updates the contact in HubSpot (audience: Clinician, source: Website) with the clinic details
 * in the Message field, and emails a copy to MAIL_TO. Either route succeeding counts as received.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  const b = (req.body || {}) as Record<string, unknown>;
  const name = clean(b.name, 100);
  const email = clean(b.email, 200).toLowerCase();
  const role = clean(b.role, 100);
  const clinic = clean(b.clinic, 150);
  const clinicType = clean(b.clinicType, 100);
  const town = clean(b.town, 100);
  const website = clean(b.website, 200);
  const notes = clean(b.notes, 1000);
  const interests = Array.isArray(b.interests)
    ? (b.interests as unknown[]).map((i) => (typeof i === 'string' ? INTERESTS[i] : '')).filter(Boolean)
    : [];

  if (name.length < 2) return res.status(400).json({ ok: false, message: 'Please enter your full name.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, message: 'Please enter a valid work email.' });
  if (clinic.length < 2) return res.status(400).json({ ok: false, message: 'Please enter your clinic or organisation.' });
  if (!CLINIC_TYPES.includes(clinicType)) return res.status(400).json({ ok: false, message: 'Please choose your type of clinic.' });
  if (b.consent !== true) {
    return res.status(400).json({ ok: false, message: 'Please tick the box so we can contact you.' });
  }

  const summary = [
    'Founding clinic partner interest (website)',
    `Clinic type: ${clinicType}`,
    `Interested in: ${interests.length ? interests.join('; ') : 'Not specified'}`,
    notes ? `Notes: ${notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  let saved = false;

  // 1. HubSpot
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    try {
      const lookup = await fetch(`${HUBSPOT_API}/${encodeURIComponent(email)}?idProperty=email&properties=ca_audience,ca_lead_source_channel,message`, { headers });
      let id: string | null = null;
      let existing: Record<string, string | null> = {};
      if (lookup.status === 200) {
        const body = await lookup.json();
        id = body.id;
        existing = body.properties || {};
      }
      const parts = name.split(/\s+/);
      const properties: Record<string, string> = {
        email,
        firstname: parts[0],
        company: clinic,
        hs_legal_basis: 'Freely given consent from contact',
        message: existing.message ? `${existing.message}\n\n${summary}` : summary,
      };
      if (parts.length > 1) properties.lastname = parts.slice(1).join(' ');
      if (role) properties.jobtitle = role;
      if (town) properties.city = town;
      if (website) properties.website = website;
      if (!existing.ca_audience) properties.ca_audience = 'clinician';
      if (!existing.ca_lead_source_channel) properties.ca_lead_source_channel = 'website';

      const write = await fetch(id ? `${HUBSPOT_API}/${id}` : HUBSPOT_API, {
        method: id ? 'PATCH' : 'POST',
        headers,
        body: JSON.stringify({ properties }),
      });
      if (write.status === 200 || write.status === 201) saved = true;
      else console.error('HubSpot clinic write error:', write.status, await write.text());
    } catch (err) {
      console.error('HubSpot clinic request failed:', err);
    }
  }

  // 2. Email notification
  if (process.env.RESEND_API_KEY && process.env.MAIL_FROM && process.env.MAIL_TO) {
    const rows: [string, string][] = [
      ['Name', name],
      ['Email', email],
      ['Role', role],
      ['Clinic', clinic],
      ['Clinic type', clinicType],
      ['Town or city', town],
      ['Website', website],
      ['Interested in', interests.join('; ')],
      ['Notes', notes],
      ['Saved to HubSpot', saved ? 'Yes' : 'No'],
    ];
    try {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `[Clinic partner] ${clinic} (${name})`,
        text: rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n'),
        html: rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v || '-')}</p>`).join(''),
      });
      saved = true;
    } catch (err) {
      console.error('Clinic email failed:', err);
    }
  }

  if (!saved) {
    return res.status(502).json({ ok: false, message: 'Your details could not be sent. Please email us instead.' });
  }
  return res.status(200).json({ ok: true });
}

