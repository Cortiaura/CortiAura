import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import Hero from '../sections/Hero';
import GutBrain from '../sections/GutBrain';
import Science from '../sections/Science';
import Safety from '../sections/Safety';
import LatestUpdates from '../sections/LatestUpdates';
import Team from '../sections/Team';
import TwoPaths from '../sections/TwoPaths';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cortiaura.com/#organization',
      name: 'CortiAura',
      url: 'https://cortiaura.com/',
      logo: 'https://cortiaura.com/assets/logo.svg',
      email: 'Prashant@cortiaura.com',
      sameAs: ['https://www.linkedin.com/company/cortiaura', 'https://x.com/CortiAura'],
      founder: [
        { '@type': 'Person', name: 'Dr Prashant Bhand' },
        { '@type': 'Person', name: 'Dr Ratnakar Mishra' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cortiaura.com/#website',
      url: 'https://cortiaura.com/',
      name: 'CortiAura',
      publisher: { '@id': 'https://cortiaura.com/#organization' },
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
          content="CortiAura is a UK neurotechnology company developing a non-invasive wearable that works with the gut–brain axis and the vagus nerve. Learn the science and join our Founding Community."
        />
        <link rel="canonical" href="https://cortiaura.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CortiAura" />
        <meta property="og:url" content="https://cortiaura.com/" />
        <meta property="og:title" content="CortiAura | Neurotechnology for the gut–brain connection" />
        <meta
          property="og:description"
          content="A non-invasive wearable that works with the gut–brain axis and the vagus nerve, engineered to the highest safety standards."
        />
        <meta property="og:image" content="https://cortiaura.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cortiaura.com/assets/og-image.png" />
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
