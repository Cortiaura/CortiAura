import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts } from '../../lib/posts';
import SiteLayout from '../../components/SiteLayout';
import PageHeader from '../../components/PageHeader';

type Post = ReturnType<typeof getAllPosts>[number];

export default function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <SiteLayout>
      <Head>
        <title>Blog | The gut–brain connection explained | CortiAura</title>
        <meta
          name="description"
          content="Evidence-based articles on the gut–brain axis, the vagus nerve and everyday wellbeing, written by an NHS consultant gastroenterologist."
        />
        <link rel="canonical" href="https://cortiaura.com/blog" />
      </Head>
      <main>
        <PageHeader
          eyebrow="Blog"
          title="The gut–brain connection, explained"
          intro="Evidence-based articles written by an NHS consultant gastroenterologist, referenced to NHS, NICE and peer-reviewed research."
        />
        <section className="container-site py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(({ slug, frontMatter }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex flex-col rounded-xl border border-line p-8 transition-colors hover:border-garnet"
              >
                <h2 className="heading-md group-hover:text-garnet">{frontMatter.title}</h2>
                {frontMatter.summary && <p className="mt-3 text-ink">{frontMatter.summary}</p>}
                <p className="mt-auto pt-5 text-sm text-muted">
                  {frontMatter.author ? `${frontMatter.author} · ` : ''}
                  {format(new Date(frontMatter.date), 'd MMMM yyyy')}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  const posts = JSON.parse(JSON.stringify(getAllPosts().map(({ slug, frontMatter }) => ({ slug, frontMatter }))));
  return { props: { posts } };
}
