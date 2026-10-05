import React from 'react';
import Head from 'next/head';
import Header from './Header';
import SiteFooter from './SiteFooter';
import CookieBanner from './CookieBanner';

type Props = {
  children: React.ReactNode;
};

const SiteLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head>
        <link rel="icon" href="/assets/favicon.svg?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/android-chrome-512x512.png?v=4" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png?v=4" />
        <meta name="theme-color" content="#970148" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <Header />
      <div id="content" className="flex-1">
        {children}
      </div>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
};

export default SiteLayout;
