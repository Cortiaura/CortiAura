import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { format } from 'date-fns';
import { getAllPosts, getPostBySlug, type FrontMatter } from '../../lib/posts';
import SiteLayout from '../../components/SiteLayout';
import { ORG_ID, PRASHANT_ID, PRASHANT_URL, WEBSITE_ID } from '../../lib/site';

type Props = {
  frontMatter: FrontMatter;
  slug: string;
  source: MDXRemoteSerializeResult;
  related: { slug: string; title: string; summary: string | null }[];
};

export default function BlogPost({ frontMatter, slug, source, related }: Props) {
  const url = `https://www.cortiaura.com/blog/${slug}`;
  const title = frontMatter.seoTitle || `${frontMatter.title} | CortiAura`;
  const ogImage = `https://www.cortiaura.com/api/og?title=${encodeURIComponent(frontMatter.title)}`;
  const updated = frontMatter.updated && frontMatter.updated !== frontMatter.date ? frontMatter.updated : undefined;
  const isPrashant = /prashant/i.test(frontMatter.author || '');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontMatter.title,
    description: frontMatter.summary,
    datePublished: frontMatter.date,
    dateModified: updated || frontMatter.date,
    mainEntityOfPage: url,
    image: ogImage,
    author: isPrashant
      ? { '@type': 'Person', '@id': PRASHANT_ID, name: 'Dr Prashant Bhand', jobTitle: 'Gastroenterologist', url: PRASHANT_URL }
      : frontMatter.author
        ? { '@type': 'Person', name: frontMatter.author, jobTitle: frontMatter.authorTitle }
        : { '@id': ORG_ID },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'CortiAura',
      logo: { '@type': 'ImageObject', url: 'https://www.cortiaura.com/assets/logo.svg' },
    },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-GB',
  };
  const faqSchema = frontMatter.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: frontMatter.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <SiteLayout>
      <Head>
        <title>{title}</title>
        {frontMatter.summary && <meta name="description" content={frontMatter.summary} />}
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title} />
        {frontMatter.summary && <meta property="og:description" content={frontMatter.summary} />}
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={frontMatter.title} />
        <meta property="article:published_time" content={frontMatter.date} />
        {updated && <meta property="article:modified_time" content={updated} />}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>
      <main>
        <header className="bg-misty">
          <div className="container-site max-w-[820px] py-16 md:py-20">
            <Link href="/blog" className="text-[15px] font-semibold text-garnet hover:text-imperial">
              <span aria-hidden>←</span> All articles
            </Link>
            <h1 className="heading-lg mt-6 md:!text-[56px]">{frontMatter.title}</h1>
            <p className="mt-5 text-[15px] text-muted">
              {frontMatter.author && (
                <>
                  By{' '}
                  {isPrashant ? (
                    <Link href="/authors/prashant-bhand" className="font-semibold text-ink underline-offset-2 hover:underline">
                      {frontMatter.author}
                    </Link>
                  ) : (
                    <span className="font-semibold text-ink">{frontMatter.author}</span>
                  )}
                  {frontMatter.authorTitle ? `, ${frontMatter.authorTitle}` : ''} ·{' '}
                </>
              )}
              <time dateTime={frontMatter.date}>{format(new Date(frontMatter.date), 'd MMMM yyyy')}</time>
              {updated && (
                <>
                  {' '}· Updated <time dateTime={updated}>{format(new Date(updated), 'd MMMM yyyy')}</time>
                </>
              )}
            </p>
          </div>
        </header>

        <article className="container-site max-w-[820px] py-14">
          <div className="article">
            <MDXRemote {...source} />
          </div>

          {frontMatter.author && (
            <aside className="mt-14 flex flex-wrap items-center gap-5 rounded-xl bg-misty p-6" aria-label="About the author">
              <img src="/assets/prashant.jpeg" alt="" className="h-20 w-20 rounded-full object-cover" style={{ objectPosition: '50% 20%' }} />
              <p className="min-w-0 flex-[1_1_300px] text-[15px] text-ink">
                <span className="font-semibold text-raisin">About the author:</span> {frontMatter.author} is an NHS
                gastroenterologist with 9–10 years of experience in gastroenterology, and the founder of CortiAura.
                {isPrashant && (
                  <>
                    {' '}
                    <Link href="/authors/prashant-bhand" className="font-semibold text-garnet hover:text-imperial">
                      More from Dr Bhand
                    </Link>
                  </>
                )}
              </p>
            </aside>
          )}

          <p className="mt-8 text-[13px] text-muted">
            This article is for general information only and is not medical advice. If you have symptoms that concern you,
            speak to your GP.
          </p>

          {frontMatter.signup !== false && (
            <aside className="mt-12 rounded-xl border border-line p-7" aria-label="Follow our work">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Follow our work</p>
              <p className="mt-3 text-[17px] leading-relaxed text-ink">
                Get new articles on the gut–brain connection and updates on our research, straight to your inbox.
              </p>
              <Link href="/founding" className="btn-primary mt-5">
                Join the Founding Community
              </Link>
            </aside>
          )}

          {related.length > 0 && (
            <nav className="mt-14 border-t border-line pt-10" aria-label="Related articles">
              <h2 className="text-[22px] font-semibold text-raisin">Related articles</h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="rounded-xl bg-misty p-5">
                    <Link href={`/blog/${r.slug}`} className="font-semibold leading-snug text-raisin hover:text-garnet">
                      {r.title}
                    </Link>
                    {r.summary && <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">{r.summary}</p>}
                  </li>
                ))}
              </ul>
              <Link href="/blog" className="mt-6 inline-block text-[15px] font-semibold text-garnet hover:text-imperial">
                All articles <span aria-hidden>→</span>
              </Link>
            </nav>
          )}
        </article>
      </main>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug || '');
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { notFound: true };
  const { frontMatter, content } = getPostBySlug(slug);
  const mdxSource = await serialize(content);
  // Related articles: most shared tags first, then most recent.
  const tags = new Set((frontMatter.tags || []).map((t) => t.toLowerCase()));
  const related = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score: (p.frontMatter.tags || []).filter((t) => tags.has(t.toLowerCase())).length,
      time: new Date(p.frontMatter.date).valueOf(),
    }))
    .sort((a, b) => b.score - a.score || b.time - a.time)
    .slice(0, 3)
    .map(({ p }) => ({ slug: p.slug, title: p.frontMatter.title, summary: p.frontMatter.summary || null }));
  // Remove undefined values, which Next.js cannot serialise.
  const cleanFrontMatter = JSON.parse(JSON.stringify(frontMatter));
  return { props: { frontMatter: cleanFrontMatter, slug, source: mdxSource, related } };
};
