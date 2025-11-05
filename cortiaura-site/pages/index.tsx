import Head from 'next/head';
import Hero from '../sections/Hero';
import StressEpidemic from '../sections/StressEpidemic';
import Vision from '../sections/Vision';
import Benefits from '../sections/Benefits';
import GetInvolved from '../sections/GetInvolved';
import SiteLayout from '../components/SiteLayout';
import WellnessFeed from '../sections/WellnessFeed';
import { getWellnessItems, type WellnessItem } from '../lib/wellnessFeed';

type HomeProps = { wellnessItems: WellnessItem[] };

export default function Home({ wellnessItems }: HomeProps) {
  return (
    <SiteLayout transparentBg>
      <Head>
        <title>CortiAura™ — Exploring the Science of Calm</title>
        <meta name="description" content="CortiAura — research-driven tools to understand stress and cultivate calm." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/android-chrome512x512.png?v=2" />
        <meta property="og:title" content="CortiAura — Exploring the Science of Calm" />
        <meta property="og:description" content="Research-driven tools and insights to understand stress and cultivate calm." />
        <meta property="og:type" content="website" />
      </Head>
      <main>
        <Hero />
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
