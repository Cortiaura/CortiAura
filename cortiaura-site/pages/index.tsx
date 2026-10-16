import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import Hero from '../sections/Hero';
import GutBrain from '../sections/GutBrain';
import Science from '../sections/Science';
import Safety from '../sections/Safety';
import LatestUpdates from '../sections/LatestUpdates';
import Team from '../sections/Team';
import TwoPaths from '../sections/TwoPaths';
import { ORGANIZATION, PRASHANT, RATNAKAR, ORG_ID, WEBSITE_ID } from '../lib/site';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION,
    PRASHANT,
    RATNAKAR,
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: 'https://www.cortiaura.com/',
      name: 'CortiAura',
      publisher: { '@id': ORG_ID },
    },
  ],
};

export default function Home() {
  return (
    <SiteLayout>
      <Head>
        <title>CortiAura™ | Non-invasive wearable for the gut–brain connection</title>
        <meta
          name="description"
          content="CortiAura is a UK neurotechnology company developing a non-invasive wearable built around the gut–brain axis and vagus nerve. Join our Founding Community."
        />
        <link rel="canonical" href="https://www.cortiaura.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CortiAura" />
        <meta property="og:url" content="https://www.cortiaura.com/" />
        <meta property="og:title" content="CortiAura | Neurotechnology for the gut–brain connection" />
        <meta
          property="og:description"
          content="A non-invasive wearable that works with the gut–brain axis and the vagus nerve, engineered to the highest safety standards."
        />
        <meta property="og:image" content="https://www.cortiaura.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.cortiaura.com/assets/og-image.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      </Head>
      <main>
        <Hero />
        <GutBrain />
        <Science />
        <Safety />
        <LatestUpdates />
        <Team />
        <TwoPaths />
      </main>
    </SiteLayout>
  );
}
