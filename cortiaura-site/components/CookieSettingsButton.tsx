import React from 'react';
import { writeConsent } from '../lib/consent';

/** Clears the stored cookie choice so the cookie banner appears again. */
const CookieSettingsButton: React.FC = () => (
  <button type="button" onClick={() => writeConsent(null)} className="btn-outline min-h-[44px] px-5">
    Change cookie settings
  </button>
);

export default CookieSettingsButton;
