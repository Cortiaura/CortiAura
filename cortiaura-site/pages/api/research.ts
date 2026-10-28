import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { RESEARCH_COUNTRIES, RESEARCH_PATHWAYS, RESEARCH_TOPICS } from '../../lib/research';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Adds values to a HubSpot multi-checkbox value ("a;b") without duplicates. */
function mergeMulti(existing: string | null | undefined, add: string[]): string {
  const set = new Set((existing || '').split(';').filter(Boolean));
  add.forEach((v) => set.add(v));
  return Array.from(set).join(';');
}

function pick<T extends { hubspot: string; label: string }>(raw: unknown, map: Record<string, T>): T[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  return raw
    .map((v) => (typeof v === 'string' ? map[v] : undefined))
    .filter((v): v is T => !!v && !seen.has(v.hubspot) && !!seen.add(v.hubspot));
}

/**
 * Research interest register and patient and public involvement (PPI) panel sign-ups.
 *
 * Collects no health information: name, email, country, optional town, how the person wants to be
 * involved and general topics. Eligibility for any study is checked later, privately, by the study team.
 *
 * Writes to HubSpot (ca_research_pathway, ca_research_topics, ca_research_consent_date). If those custom
 * properties are missing, it falls back to saving the same details in the contact's Message field so no
 * sign-up is lost. Marketing emails are added only if the person ticked the separate updates box.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  const b = (req.body || {}) as Record<string, unknown>;
  // Honeypot: real visitors never see or fill this field.
  if (clean(b.company)) return res.status(200).json({ ok: true });

  const name = clean(b.name, 100);
  const email = clean(b.email, 200).toLowerCase();
  const country = clean(b.country, 100);
  const town = clean(b.town, 100);
  const pathways = pick(b.pathways, RESEARCH_PATHWAYS);
  const topics = pick(b.topics, RESEARCH_TOPICS);
  const updates = b.updates === true;

  if (name.length < 1) return res.status(400).json({ ok: false, message: 'Please enter your first name.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
  if (!RESEARCH_COUNTRIES.includes(country)) return res.status(400).json({ ok: false, message: 'Please choose your country.' });
  if (!pathways.length) return res.status(400).json({ ok: false, message: 'Please choose at least one way to get involved.' });
  if (b.adult !== true) return res.status(400).json({ ok: false, message: 'Please confirm you are 18 or over.' });
  if (b.consent !== true) {
    return res.status(400).json({ ok: false, message: 'Please tick the box so we can contact you about research.' });
  }

  const today = new Date().toISOString().slice(0, 10);
  const summary = [
    `Research sign-up (website, ${today})`,
    `Involvement: ${pathways.map((p) => p.label).join('; ')}`,
    `Topics: ${topics.length ? topics.map((t) => t.label).join('; ') : 'Not specified'}`,
    `Research contact consent: yes; aged 18+: confirmed`,
    `Also wants general updates: ${updates ? 'yes' : 'no'}`,
  ].join('\n');

  let saved = false;

  // 1. HubSpot
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
    try {
      const fields = 'ca_research_pathway,ca_research_topics,ca_signed_up_for,ca_lead_source_channel,message';
      const lookup = await fetch(`${HUBSPOT_API}/${encodeURIComponent(email)}?idProperty=email&properties=${fields}`, { headers });
      let id: string | null = null;
      let existing: Record<string, string | null> = {};
      if (lookup.status === 200) {
        const body = await lookup.json();
        id = body.id;
        existing = body.properties || {};
      } else if (lookup.status !== 404) {
        console.error('HubSpot research lookup error:', lookup.status, await lookup.text());
      }

      const base: Record<string, string> = {
        email,
        firstname: name,
        country,
        hs_legal_basis: 'Freely given consent from contact',
        message: existing.message ? `${existing.message}\n\n${summary}` : summary,
      };
      if (town) base.city = town;
      if (!existing.ca_lead_source_channel) base.ca_lead_source_channel = 'website';
      if (updates) {
        base.ca_signed_up_for = mergeMulti(existing.ca_signed_up_for, ['newsletter_blog']);
        base.ca_email_consent_date = today;
      }

      const research: Record<string, string> = {
        ca_research_pathway: mergeMulti(existing.ca_research_pathway, pathways.map((p) => p.hubspot)),
        ca_research_consent_date: today,
      };
      if (topics.length) research.ca_research_topics = mergeMulti(existing.ca_research_topics, topics.map((t) => t.hubspot));

      const write = (properties: Record<string, string>) =>
        fetch(id ? `${HUBSPOT_API}/${id}` : HUBSPOT_API, {
          method: id ? 'PATCH' : 'POST',
          headers,
          body: JSON.stringify({ properties }),
        });

      let result = await write({ ...base, ...research });
      if (result.status === 400) {
        // Most likely the research properties have not been created yet: keep the sign-up in Message.
        console.error('HubSpot research write rejected, retrying without research fields:', await result.text());
        result = await write(base);
      }
      if (result.status === 200 || result.status === 201) saved = true;
      else console.error('HubSpot research write error:', result.status, await result.text());
    } catch (err) {
      console.error('HubSpot research request failed:', err);
    }
  }

  // 2. Email notification (no health information is ever collected, so none is sent)
  if (process.env.RESEND_API_KEY && process.env.MAIL_FROM && process.env.MAIL_TO) {
    const rows: [string, string][] = [
      ['Name', name],
      ['Email', email],
      ['Country', country],
      ['Town or city', town],
      ['Involvement', pathways.map((p) => p.label).join('; ')],
      ['Topics', topics.map((t) => t.label).join('; ')],
      ['General updates', updates ? 'Yes' : 'No'],
      ['Saved to HubSpot', saved ? 'Yes' : 'No'],
    ];
    try {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `[Research sign-up] ${pathways.map((p) => p.label).join(' + ')}`,
        text: rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n'),
        html: rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v || '-')}</p>`).join(''),
      });
      saved = true;
    } catch (err) {
      console.error('Research email failed:', err);
    }
  }

  if (!saved) {
    return res.status(502).json({ ok: false, message: 'Your details could not be sent. Please email us instead.' });
  }
  return res.status(200).json({ ok: true });
}
