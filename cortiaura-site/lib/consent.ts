/**
 * Cookie consent helpers.
 * Stored values: 'accepted' (analytics allowed) or 'declined' (essential only).
 * Anything else (including the old value 'true') means the visitor has not chosen yet.
 */
export const CONSENT_KEY = 'cookieConsent';
export const CONSENT_EVENT = 'cortiaura:consent-change';

export type Consent = 'accepted' | 'declined' | null;

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    if (value) window.localStorage.setItem(CONSENT_KEY, value);
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Storage unavailable: the choice applies to this visit only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
