import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

// Real company updates. Add the newest at the top.
export async function getStaticProps() {
  const items = [
    { title: 'Prototype development underway with a UK medical device engineering team', link: '/#latest', date: '2026-10-05' },
    { title: 'Early safety and feasibility study designed', link: '/#latest', date: '2026-10-05' },
    { title: 'Early community now open: join for updates and priority access', link: '/#get-involved', date: '2026-10-05' },
  ];
  return { props: { items } };
}

export default function News({ items }: { items: { title: string; link: string; date: string }[] }) {
  return (
    <SiteLayout>
      <Head>
        <title>News — CortiAura™</title>
        <meta name="description" content="The latest news and progress updates from CortiAura, the UK neurotechnology company working with the gut–brain connection." />
        <link rel="canonical" href="https://cortiaura.com/news" />
      </Head>
      <main className="min-h-screen bg-[#0B0B1A] py-20">
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">News</h1>
          <ul className="mt-10 space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <a href={item.link} className="text-white text-lg font-medium hover:underline">
                  {item.title}
                </a>
                <div className="mt-1 text-sm text-white/60">{new Date(item.date).toDateString()}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteLayout>
  );
}
