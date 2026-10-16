import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts } from '../../lib/posts';
import SiteLayout from '../../components/SiteLayout';
import { ORGANIZATION, PRASHANT, PRASHANT_URL, PRASHANT_ID } from '../../lib/site';

type PostCard = { slug: string; title: string; summary?: string; date: string };

const Check = () => (
  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-garnet" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function PrashantBhandPage({ posts }: { posts: PostCard[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${PRASHANT_URL}#page`,
        url: PRASHANT_URL,
        name: 'Dr Prashant Bhand, Gastroenterologist',
        mainEntity: { '@id': PRASHANT_ID },
        inLanguage: 'en-GB',
      },
      PRASHANT,
      ORGANIZATION,
    ],
  };

  return (
    <SiteLayout>
      <Head>
        <title>Dr Prashant Bhand, Gastroenterologist | CortiAura</title>
        <meta
          name="description"
          content="Dr Prashant Bhand is an NHS gastroenterologist and founder of CortiAura. Read his evidence-based articles on the gut–brain axis and the vagus nerve."
        />
        <link rel="canonical" href={PRASHANT_URL} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={PRASHANT_URL} />
        <meta property="og:title" content="Dr Prashant Bhand, Gastroenterologist" />
        <meta property="og:image" content="https://www.cortiaura.com/assets/prashant.jpeg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <main>
        <section className="bg-misty">
          <div className="container-site flex flex-wrap items-start gap-12 py-20">
            <img
              src="/assets/prashant.jpeg"
              alt="Portrait of Dr Prashant Bhand"
              className="aspect-square w-full max-w-[260px] rounded-xl object-cover"
              style={{ objectPosition: '50% 20%' }}
            />
            <div className="min-w-0 flex-[1_1_420px]">
              <p className="eyebrow">Author</p>
              <h1 className="heading-xl mt-4">Dr Prashant Bhand</h1>
              <p className="mt-3 text-[20px] font-semibold text-garnet">Gastroenterologist · Founder, CortiAura</p>
              <p className="mt-6 max-w-[680px] text-[18px] leading-relaxed text-ink">
                Dr Prashant Bhand is an NHS gastroenterologist with 9–10 years of experience in gastroenterology. He writes
                about the gut–brain axis, the vagus nerve and the autonomic nervous system, explaining the science in plain
                English with references to the NHS, NICE and peer-reviewed research.
              </p>
              <ul className="mt-6 space-y-3 text-ink">
                <li className="flex gap-3"><Check />NHS gastroenterologist with 9–10 years’ experience in gastroenterology</li>
                <li className="flex gap-3"><Check />Trained at Grant Medical College, Mumbai; worked in Ireland before joining the NHS in 2017</li>
                <li className="flex gap-3"><Check />Postgraduate qualification in AI and machine learning</li>
                <li className="flex gap-3">
                  <Check />
                  <span>
                    Founder of <Link href="/about" className="font-semibold text-garnet hover:text-imperial">CortiAura</Link>, a UK
                    neurotechnology company
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container-site py-16" aria-labelledby="articles-heading">
          <h2 id="articles-heading" className="heading-lg">Articles by Dr Bhand</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-xl border border-line p-8 transition-colors hover:border-garnet"
              >
                <h3 className="heading-md group-hover:text-garnet">{p.title}</h3>
                {p.summary && <p className="mt-3 text-ink">{p.summary}</p>}
                <p className="mt-auto pt-5 text-sm text-muted">{format(new Date(p.date), 'd MMMM yyyy')}</p>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-[13px] text-muted">
            Articles are for general information only and are not medical advice. If you have symptoms that concern you,
            speak to your GP.
          </p>
        </section>
      </main>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const posts: PostCard[] = getAllPosts()
    .filter(({ frontMatter }) => /prashant/i.test(frontMatter.author || ''))
    .map(({ slug, frontMatter }) => ({
      slug,
      title: frontMatter.title,
      date: String(frontMatter.date),
      ...(frontMatter.summary ? { summary: frontMatter.summary } : {}),
    }));
  return { props: { posts } };
}
