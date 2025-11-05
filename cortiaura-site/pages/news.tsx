import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

// Placeholder SSR fetch of 5 RSS items (stubbed for now)
export async function getServerSideProps() {
  const items = [
    { title: 'CortiAura featured in HealthTech Weekly', link: '#', date: '2025-10-18' },
    { title: 'Interview: The science of calm', link: '#', date: '2025-10-05' },
    { title: 'Research note: Autonomic balance 101', link: '#', date: '2025-09-28' },
    { title: 'Community update: Early cohort plans', link: '#', date: '2025-09-12' },
    { title: 'Product thinking: Signals to serenity', link: '#', date: '2025-08-30' },
  ];
  return { props: { items } };
}

export default function News({ items }: { items: { title: string; link: string; date: string }[] }) {
  return (
    <SiteLayout>
      <Head>
        <title>News — CortiAura™</title>
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
