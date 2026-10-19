import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import type { GetStaticProps } from 'next';
import HomePage, { type HomePost } from '../components/home/HomePage';
import { getAllPosts } from '../lib/posts';
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

type Props = { posts: HomePost[]; postCount: number };

export default function Home({ posts, postCount }: Props) {
  return (
    <SiteLayout bare>
      <Head>
        <title>CortiAura™ | Non-invasive wearable for the gut–brain connection</title>
        <meta
          name="description"
          content="CortiAura is a UK neurotechnology company developing a non-invasive wearable that works with the gut–brain axis and the vagus nerve. Learn the science and join our Founding Community."
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
      <HomePage posts={posts} postCount={postCount} />
    </SiteLayout>
  );
}

const tagLabel = (t?: string) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Science');

export const getStaticProps: GetStaticProps<Props> = async () => {
  const all = getAllPosts();
  const posts: HomePost[] = all.slice(0, 5).map((p) => ({
    slug: p.slug,
    title: p.frontMatter.title,
    date: String(p.frontMatter.date),
    summary: p.frontMatter.summary || '',
    tag: tagLabel(p.frontMatter.tags?.[0]),
  }));
  return { props: { posts, postCount: all.length } };
};
