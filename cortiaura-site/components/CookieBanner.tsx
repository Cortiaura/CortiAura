import React from 'react';
import Link from 'next/link';
import { CONSENT_EVENT, readConsent, writeConsent } from '../lib/consent';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const update = () => setVisible(readConsent() === null);
    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4" role="region" aria-label="Cookie choices">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-ink">
          We use essential cookies to run this site. With your permission, we&rsquo;d also like to use analytics cookies
          (HubSpot) to understand how visitors use it.{' '}
          <Link href="/cookies" className="text-garnet underline underline-offset-2">
            Learn more
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => writeConsent('declined')} className="btn-outline min-h-[44px] px-5">
            Decline
          </button>
          <button type="button" onClick={() => writeConsent('accepted')} className="btn-primary min-h-[44px] px-5">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
