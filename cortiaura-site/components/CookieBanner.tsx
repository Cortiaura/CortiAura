import React from 'react';
import Link from 'next/link';

const LS_KEY = 'cookieConsent';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(LS_KEY) !== 'true');
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(LS_KEY, 'true');
    } catch {
      // Storage unavailable: hide for this visit only.
    }
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4" role="region" aria-label="Cookie notice">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-ink">
          We only use essential cookies needed for this site to work.{' '}
          <Link href="/cookies" className="text-garnet underline underline-offset-2">
            Learn more
          </Link>
        </p>
        <button type="button" onClick={dismiss} className="btn-primary min-h-[44px] shrink-0 px-5">
          OK
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
