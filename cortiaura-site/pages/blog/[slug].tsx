import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import { format } from 'date-fns';
import SiteLayout from '../../components/SiteLayout';

type Props = {
  frontMatter: {
    title: string;
    date: string;
    summary?: string;
  };
  slug: string;
  source: MDXRemoteSerializeResult;
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

export default function BlogPost({ frontMatter, source, prev, next }: Props) {
  return (
    <SiteLayout>
      <Head>
        <title>{frontMatter.title} — CortiAura™ Blog</title>
        {frontMatter.summary && <meta name="description" content={frontMatter.summary} />}
      </Head>
      <main className="min-h-screen bg-[#0B0B1A] py-20">
        <article className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold gradient-text">{frontMatter.title}</h1>
          <div className="mt-2 text-sm text-white/60">{format(new Date(frontMatter.date), 'PPP')}</div>
          <div className="prose prose-invert max-w-none mt-8">
            <MDXRemote {...source} />
          </div>

          <hr className="my-10 border-white/10" />
          <div className="flex justify-between text-sm">
            <div>
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="text-white/80 hover:text-white">
                  ← {prev.title}
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link href={`/blog/${next.slug}`} className="text-white/80 hover:text-white">
                  {next.title} →
                </Link>
              )}
            </div>
          </div>
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
  return { props: { frontMatter, slug, source: mdxSource, prev, next } };
};
