import React from 'react';
import Script from 'next/script';
import { CONSENT_EVENT, readConsent } from '../lib/consent';

// HubSpot account 149513237 (EU data centre).
const HUBSPOT_SRC = 'https://js-eu1.hs-scripts.com/149513237.js';

/**
 * Loads the HubSpot tracking code (analytics, forms and pop-ups) only after
 * the visitor has accepted analytics cookies in the cookie banner.
 */
const HubSpotTracking: React.FC = () => {
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      const accepted = readConsent() === 'accepted';
      if (!accepted && allowedRef.current) {
        // Consent withdrawn: reload so the HubSpot script stops running.
        window.location.reload();
        return;
      }
      allowedRef.current = accepted;
      setAllowed(accepted);
    };
    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  if (!allowed) return null;
  return <Script id="hs-script-loader" src={HUBSPOT_SRC} strategy="afterInteractive" />;
};

const allowedRef = { current: false };

export default HubSpotTracking;
