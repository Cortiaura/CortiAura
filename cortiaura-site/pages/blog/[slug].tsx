import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { format } from 'date-fns';
import { getAllPosts, getPostBySlug, type FrontMatter } from '../../lib/posts';
import SiteLayout from '../../components/SiteLayout';

type Props = {
  frontMatter: FrontMatter;
  slug: string;
  source: MDXRemoteSerializeResult;
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

export default function BlogPost({ frontMatter, slug, source, prev, next }: Props) {
  const url = `https://www.cortiaura.com/blog/${slug}`;
  const title = frontMatter.seoTitle || `${frontMatter.title} | CortiAura`;
  const ogImage = `https://www.cortiaura.com/api/og?title=${encodeURIComponent(frontMatter.title)}`;
  const updated = frontMatter.updated && frontMatter.updated !== frontMatter.date ? frontMatter.updated : undefined;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontMatter.title,
    description: frontMatter.summary,
    datePublished: frontMatter.date,
    dateModified: updated || frontMatter.date,
    mainEntityOfPage: url,
    image: ogImage,
    author: frontMatter.author
      ? { '@type': 'Person', name: frontMatter.author, jobTitle: frontMatter.authorTitle, url: 'https://www.cortiaura.com/about' }
      : { '@type': 'Organization', name: 'CortiAura' },
    publisher: { '@type': 'Organization', name: 'CortiAura', logo: { '@type': 'ImageObject', url: 'https://www.cortiaura.com/assets/logo.svg' } },
  };

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
                  By <span className="font-semibold text-ink">{frontMatter.author}</span>
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
              </p>
            </aside>
          )}

          <p className="mt-8 text-[13px] text-muted">
            This article is for general information only and is not medical advice. If you have symptoms that concern you,
            speak to your GP.
          </p>

          <nav className="mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-8 text-[15px]" aria-label="More articles">
            <div>
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="font-semibold text-garnet hover:text-imperial">
                  <span aria-hidden>←</span> {prev.title}
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link href={`/blog/${next.slug}`} className="font-semibold text-garnet hover:text-imperial">
                  {next.title} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </nav>
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
  const prev = all[idx + 1] ? { slug: all[idx + 1].slug, title: all[idx + 1].frontMatter.title } : null;
  const next = all[idx - 1] ? { slug: all[idx - 1].slug, title: all[idx - 1].frontMatter.title } : null;
  // Remove undefined values, which Next.js cannot serialise.
  const cleanFrontMatter = JSON.parse(JSON.stringify(frontMatter));
  return { props: { frontMatter: cleanFrontMatter, slug, source: mdxSource, prev, next } };
};
