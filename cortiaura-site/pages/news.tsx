import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';

type NewsItem = { title: string; summary: string; link: string; date: string };

// Real company updates. Add the newest at the top.
export async function getStaticProps() {
  const items: NewsItem[] = [
    {
      title: 'CortiAura receives HMRC advance assurance for SEIS and EIS',
      summary:
        'HMRC has given Dacpras Ltd, the company behind CortiAura, advance assurance for the Seed Enterprise Investment Scheme (SEIS) and the Enterprise Investment Scheme (EIS), based on the information we supplied. Advance assurance is not an endorsement of the company or a guarantee of tax relief for any investor.',
      link: '/investors',
      date: '2026-10-21',
    },
    {
      title: 'CortiAura ranked in the top 15% for the Cambridge NeuroWorks Blue Sky Proof-of-Concept Fund',
      summary:
        'Our proposal to the Blue Sky Proof-of-Concept Fund, a UK-wide initiative run by Cambridge NeuroWorks in partnership with ARIA (the UK government’s Advanced Research and Invention Agency), was ranked in the top 15% of applications. This ranking relates to our application only and is not funding or endorsement by Cambridge NeuroWorks or ARIA.',
      link: 'https://cambridgeneuroworks.org/programmes/blue-sky-proof-of-concept-fund',
      date: '2026-10-05',
    },
    {
      title: 'Founding Community now open',
      summary: 'Join for free to follow our progress, with priority access and a founding-member discount at launch.',
      link: '/founding',
      date: '2026-10-05',
    },
    {
      title: 'Early safety and feasibility study in design',
      summary: 'We are building partnerships with clinical and academic collaborators to take the study forward.',
      link: '/#latest',
      date: '2026-10-05',
    },
    {
      title: 'Prototype development underway',
      summary: 'An experienced UK medical device engineering team is helping take CortiAura from concept to working prototype.',
      link: '/#latest',
      date: '2026-10-05',
    },
  ];
  return { props: { items } };
}

export default function News({ items }: { items: NewsItem[] }) {
  return (
    <SiteLayout>
      <Head>
        <title>News | CortiAura</title>
        <meta
          name="description"
          content="The latest news and progress updates from CortiAura, the UK neurotechnology company working with the gut–brain connection."
        />
        <link rel="canonical" href="https://www.cortiaura.com/news" />
      </Head>
      <main>
        <PageHeader eyebrow="News" title="Progress from CortiAura" intro="Milestones and company updates, newest first." />
        <section className="container-site max-w-[880px] py-16">
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.title} className="py-7">
                <p className="text-sm text-muted">
                  {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="heading-md mt-2">
                  {item.link.startsWith('http') ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-garnet">
                      {item.title}
                    </a>
                  ) : (
                    <Link href={item.link} className="hover:text-garnet">
                      {item.title}
                    </Link>
                  )}
                </h2>
                <p className="mt-2 text-ink">{item.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteLayout>
  );
}
