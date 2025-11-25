import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts } from '../../lib/posts';
import SiteLayout from '../../components/SiteLayout';

type Post = ReturnType<typeof getAllPosts>[number];

export default function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <SiteLayout>
      <Head>
        <title>Blog — CortiAura™</title>
      </Head>
      <main className="min-h-screen bg-[#231F20] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">Insights & Updates</h1>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {posts.map(({ slug, frontMatter }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#970148]/40 transition"
              >
                <h2 className="text-2xl font-medium text-white group-hover:text-[#FBDDCF]">
                  {frontMatter.title}
                </h2>
                {frontMatter.summary && (
                  <p className="mt-2 text-[#F9F6FA]/80">{frontMatter.summary}</p>
                )}
                <p className="mt-4 text-sm text-[#F9F6FA]/60">
                  {format(new Date(frontMatter.date), 'MMMM d, yyyy')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
