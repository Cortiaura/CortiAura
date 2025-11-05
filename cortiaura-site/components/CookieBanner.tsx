import React from 'react';

const LS_KEY = 'cookieConsent';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    try {
      const v = typeof window !== 'undefined' ? window.localStorage.getItem(LS_KEY) : 'true';
      setVisible(v !== 'true');
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="container mx-auto px-4 lg:px-8 pb-6">
        <div className="rounded-xl border border-white/10 bg-[#0B0B1A]/95 backdrop-blur p-4 text-[#F9F6FA]/85 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm">
              <p>We use essential cookies to improve your experience. Please confirm you consent to essential cookies only.</p>
              <label className="mt-2 inline-flex items-center gap-2">
                <input type="checkbox" className="accent-[#63D7C7]" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <span className="text-[#F9F6FA]/80">I agree to essential cookies only.</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <a href="/cookies" className="text-sm text-white/80 hover:text-white underline">Learn more</a>
              <button
                onClick={() => {
                  try { window.localStorage.setItem(LS_KEY, 'true'); } catch {}
                  setVisible(false);
                }}
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm text-white bg-gradient-to-r from-[#AF98E4] to-[#63D7C7] hover:opacity-90 transition ${checked ? '' : 'opacity-50 pointer-events-none'}`}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
