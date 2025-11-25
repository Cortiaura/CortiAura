import React from 'react';
import Head from 'next/head';
import Header from './Header';
import SiteFooter from './SiteFooter';
import CookieBanner from './CookieBanner';

type Props = {
  children: React.ReactNode;
  className?: string;
  transparentBg?: boolean;
};

const SiteLayout: React.FC<Props> = ({ children, className = '', transparentBg = false }) => {
  return (
    <div className={`relative min-h-screen overflow-hidden ${transparentBg ? 'bg-transparent' : 'bg-[#0B0B1A]'} ${className}`}>
      <Head>
        <link rel="icon" href="/assets/favicon.svg?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/android-chrome-512x512.png?v=3" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png?v=3" />
        <meta name="theme-color" content="#0B0B1A" />
      </Head>
      <Header />
      {!transparentBg && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_50%_40%,rgba(175,152,228,.18),transparent_60%)] aura-anim"
        />
      )}
      <main>{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
};

export default SiteLayout;
