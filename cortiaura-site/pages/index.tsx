import Head from 'next/head';
import Hero from '../sections/Hero';
import LatestUpdates from '../sections/LatestUpdates';
import StressEpidemic from '../sections/StressEpidemic';
import Vision from '../sections/Vision';
import Benefits from '../sections/Benefits';
import GetInvolved from '../sections/GetInvolved';
import SiteLayout from '../components/SiteLayout';
import WellnessFeed from '../sections/WellnessFeed';
import { getWellnessItems, type WellnessItem } from '../lib/wellnessFeed';

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

type HomeProps = { wellnessItems: WellnessItem[] };

export default function Home({ wellnessItems }: HomeProps) {
  return (
    <SiteLayout transparentBg>
      <Head>
        <title>CortiAura™ | Non-invasive wearable for the gut–brain connection</title>
        <meta
          name="description"
          content="CortiAura is a UK neurotechnology company developing a non-invasive wearable that works with the gut–brain axis and the vagus nerve. Learn the science and join our early community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://cortiaura.com/" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CortiAura" />
        <meta property="og:url" content="https://cortiaura.com/" />
        <meta property="og:title" content="CortiAura | Neurotechnology for the gut–brain connection" />
        <meta property="og:description" content="A non-invasive wearable that works with the gut–brain axis and the vagus nerve, engineered to the highest safety standards." />
        <meta property="og:image" content="https://cortiaura.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cortiaura.com/assets/og-image.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </Head>
      <main>
        <Hero />
        <LatestUpdates />
        <StressEpidemic />
        <Vision />
        <Benefits />
        <WellnessFeed items={wellnessItems} />
        <GetInvolved />
      </main>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const wellnessItems = await getWellnessItems(6);
  return {
    props: { wellnessItems },
    revalidate: 3600,
  };
}
