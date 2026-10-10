import React from 'react';
import { useRouter } from 'next/router';
import { CONSENT_EVENT, readConsent } from '../lib/consent';

/**
 * "Be first to know" sign-up box.
 * - Appears once per visitor, after 25 seconds or halfway down the page, and only
 *   once the cookie banner has been answered (so the two never stack).
 * - Never shown on pages that already have a form, or on the legal pages.
 * - Closing it hides it for 30 days; signing up hides it for good.
 * - Sends sign-ups to /api/subscribe (HubSpot). No health questions are asked.
 */

const STORE_KEY = 'signupPopup';
const SNOOZE_DAYS = 30;
const DELAY_MS = 25000;
const HIDDEN_ON = ['/founding', '/investors', '/contact', '/privacy', '/cookies'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Choice = 'founding' | 'newsletter';
type Status = { type: 'idle' | 'sending' | 'done' | 'error'; message?: string };

function shouldShow(): boolean {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return true;
    const saved = JSON.parse(raw) as { state: string; at: number };
    if (saved.state === 'subscribed') return false;
    return Date.now() - saved.at > SNOOZE_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function remember(state: 'closed' | 'subscribed') {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    // Storage unavailable: it may show again on a later visit.
  }
}

const SignupPopup: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [choice, setChoice] = React.useState<Choice>('founding');
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const lastFocus = React.useRef<HTMLElement | null>(null);

  const hiddenHere = HIDDEN_ON.some((p) => router.pathname === p || router.pathname.startsWith(`${p}/`));

  // Decide when to open.
  React.useEffect(() => {
    if (hiddenHere || !shouldShow()) return;
    let fired = false;
    let timer: number | undefined;

    const fire = () => {
      if (fired) return;
      if (readConsent() === null) return; // wait until the cookie banner is answered
      fired = true;
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.5) fire();
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(CONSENT_EVENT, onConsent);
    };
    // If the timer passed while the banner was still up, open once it is answered.
    let due = false;
    const onConsent = () => {
      if (due) window.setTimeout(fire, 1500);
    };

    timer = window.setTimeout(() => {
      due = true;
      fire();
    }, DELAY_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(CONSENT_EVENT, onConsent);
    return cleanup;
  }, [hiddenHere]);

  const close = React.useCallback(() => {
    if (status.type !== 'done') remember('closed');
    setOpen(false);
    lastFocus.current?.focus?.();
  }, [status.type]);

  // Escape to close, keep keyboard focus inside the box, focus it on open.
  React.useEffect(() => {
    if (!open) return;
    const box = dialogRef.current;
    box?.querySelector<HTMLElement>('input, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && box) {
        const items = Array.from(box.querySelectorAll<HTMLElement>('button, input, a[href]')).filter(
          (el) => !el.hasAttribute('disabled')
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open || hiddenHere) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') || '').trim();
    const name = String(data.get('name') || '').trim();
    if (!EMAIL_RE.test(email)) return setStatus({ type: 'error', message: 'Please enter a valid email address.' });
    if (data.get('consent') !== 'on')
      return setStatus({ type: 'error', message: 'Please tick the box to agree to receive emails.' });

    setStatus({ type: 'sending' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, consent: true, source: choice }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.message || 'Sign-up failed. Please try again.');
      remember('subscribed');
      setStatus({ type: 'done' });
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'Sign-up failed. Please try again.' });
    }
  };

  const consentText =
    choice === 'founding'
      ? 'I’d like to receive emails from CortiAura about the Founding Community, product news and launch offers.'
      : 'I’d like to receive CortiAura’s science newsletter and new blog posts.';

  const optionClass = (on: boolean) =>
    `flex cursor-pointer items-start gap-3 rounded-lg border-[1.5px] px-4 py-3 transition-colors ${
      on ? 'border-garnet bg-misty' : 'border-[#CDBFC2] bg-white hover:border-garnet'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-raisin/40" aria-hidden="true" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white px-6 pb-7 pt-6 shadow-2xl sm:max-w-[480px] sm:rounded-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-misty hover:text-raisin focus-visible:outline focus-visible:outline-2 focus-visible:outline-garnet"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status.type === 'done' ? (
          <div className="flex flex-col gap-3 py-4" aria-live="polite">
            <h2 id="signup-title" className="heading-md text-raisin">
              {choice === 'founding' ? 'You’re on the list' : 'You’re subscribed'}
            </h2>
            <p className="text-[16px] leading-relaxed text-ink">
              {choice === 'founding'
                ? 'Thank you for joining the Founding Community. You’ll hear from us first about early access.'
                : 'Thank you. Our next science newsletter will arrive in your inbox soon.'}
            </p>
            <button type="button" onClick={close} className="btn-primary mt-2 self-start">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 pr-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-garnet">CortiAura</p>
              <h2 id="signup-title" className="heading-md text-raisin">
                Be first to know
              </h2>
              <p className="text-[16px] leading-relaxed text-ink">
                We’re building a new approach to gut–brain wellbeing, guided by clinicians and science.
              </p>
            </div>

            <fieldset className="flex flex-col gap-2.5">
              <legend className="field-label mb-2.5 text-raisin">What would you like?</legend>
              <label className={optionClass(choice === 'founding')}>
                <input
                  type="radio"
                  name="choice"
                  value="founding"
                  checked={choice === 'founding'}
                  onChange={() => setChoice('founding')}
                  className="mt-1 h-[18px] w-[18px] accent-garnet"
                />
                <span className="flex flex-col">
                  <span className="font-semibold text-raisin">Join the Founding Community</span>
                  <span className="text-[14px] text-muted">Early access and a founding-member offer</span>
                </span>
              </label>
              <label className={optionClass(choice === 'newsletter')}>
                <input
                  type="radio"
                  name="choice"
                  value="newsletter"
                  checked={choice === 'newsletter'}
                  onChange={() => setChoice('newsletter')}
                  className="mt-1 h-[18px] w-[18px] accent-garnet"
                />
                <span className="flex flex-col">
                  <span className="font-semibold text-raisin">Get our science newsletter and blog</span>
                  <span className="text-[14px] text-muted">Evidence-based reads, about once a month</span>
                </span>
              </label>
            </fieldset>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="field-label text-raisin">
                  First name <span className="font-normal text-muted">(optional)</span>
                </span>
                <input name="name" type="text" autoComplete="given-name" className="field" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="field-label text-raisin">Email</span>
                <input name="email" type="email" required autoComplete="email" className="field" />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
              <input type="checkbox" name="consent" required className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-garnet" />
              <span>
                {consentText} I can unsubscribe at any time. See our{' '}
                <a href="/privacy" className="text-garnet underline underline-offset-2">
                  privacy policy
                </a>
                .
              </span>
            </label>

            {status.type === 'error' && (
              <p role="alert" className="text-sm font-medium text-garnet">
                {status.message}
              </p>
            )}

            <button type="submit" className="btn-primary w-full" disabled={status.type === 'sending'}>
              {status.type === 'sending' ? 'Sending…' : choice === 'founding' ? 'Join the waitlist' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPopup;
