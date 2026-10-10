import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Dr Prashant Bhand',
      jobTitle: 'Gastroenterologist',
      worksFor: { '@type': 'Organization', name: 'CortiAura' },
      knowsAbout: ['Gastroenterology', 'Gut–brain axis', 'Vagus nerve', 'Neuromodulation'],
      url: 'https://www.cortiaura.com/about',
    },
    {
      '@type': 'Person',
      name: 'Dr Ratnakar Mishra',
      jobTitle: 'Co-founder',
      worksFor: { '@type': 'Organization', name: 'CortiAura' },
      knowsAbout: ['Neuroscience', 'Synaptic plasticity', 'Neurodegeneration'],
      url: 'https://www.cortiaura.com/about',
    },
  ],
};

const PRINCIPLES = [
  { title: 'Evidence-led', text: 'Guided by research, with transparency and rigour.' },
  { title: 'Safety first', text: 'Built to recognised medical device safety standards from the first prototype.' },
  { title: 'Non-invasive', text: 'Working with the body from the outside, with no implants and no drugs.' },
];

const Check = () => (
  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-garnet" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function AboutPage() {
  return (
    <SiteLayout>
      <Head>
        <title>About CortiAura | Clinician-led gut–brain neurotechnology</title>
        <meta
          name="description"
          content="Meet the team behind CortiAura: Dr Prashant Bhand, NHS gastroenterologist, and Dr Ratnakar Mishra, clinical neuroscientist."
        />
        <link rel="canonical" href="https://www.cortiaura.com/about" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
      </Head>

      <main>
        <section className="bg-misty">
          <div className="container-site py-20 md:py-24">
            <p className="eyebrow">About us</p>
            <h1 className="heading-xl mt-5 max-w-[860px]">A clinician and a neuroscientist, building for the gut–brain connection.</h1>
            <p className="mt-7 max-w-[680px] text-[20px] leading-relaxed text-ink">
              CortiAura brings together everyday clinical experience in gastroenterology and deep expertise in neuroscience
              to develop safe, non-invasive technology built around the gut–brain connection.
            </p>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="founder-heading">
          <div className="container-site flex flex-wrap items-start gap-14 py-20">
            <img
              src="/assets/prashant.jpeg"
              alt="Portrait of Dr Prashant Bhand"
              className="aspect-[4/5] w-full max-w-[380px] rounded-xl object-cover"
              style={{ objectPosition: '50% 20%' }}
            />
            <div className="min-w-0 flex-[1_1_420px]">
              <p className="eyebrow">Founder &amp; CEO</p>
              <h2 id="founder-heading" className="heading-lg mt-3">Dr Prashant Bhand</h2>
              <p className="mt-5 text-ink">
                Dr Prashant Bhand is an NHS gastroenterologist with a focus on the gut–brain axis and
                non-invasive neuromodulation. He founded CortiAura to explore safe, science-based ways to support the
                body’s natural balance.
              </p>
              <ul className="mt-6 space-y-3 text-ink">
                <li className="flex gap-3"><Check />NHS gastroenterologist with 9–10 years’ experience in gastroenterology</li>
                <li className="flex gap-3"><Check />Trained at Grant Medical College, Mumbai; worked in Ireland before joining the NHS in 2017</li>
                <li className="flex gap-3"><Check />Postgraduate qualification in AI and machine learning</li>
                <li className="flex gap-3"><Check />Interests: the gut–brain axis, vagus nerve pathways and autonomic balance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white" aria-labelledby="cofounder-heading">
          <div className="container-site flex flex-wrap-reverse items-start gap-14 border-t border-line py-20">
            <div className="min-w-0 flex-[1_1_420px]">
              <p className="eyebrow">Co-founder</p>
              <h2 id="cofounder-heading" className="heading-lg mt-3">Dr Ratnakar Mishra</h2>
              <p className="mt-5 text-ink">
                Dr Ratnakar Mishra is a clinical neuroscientist who has worked across leading academic centres and
                pharmaceutical and biotech teams in neurodegeneration, neuro-ophthalmology and rare diseases. At CortiAura
                he guides the neuroscience behind our approach.
              </p>
              <ul className="mt-6 space-y-3 text-ink">
                <li className="flex gap-3"><Check />15+ years of experience in neuroscience and neuro-ophthalmology research</li>
                <li className="flex gap-3"><Check />PhD in Biochemistry and Neuroscience (synaptic connectivity), University of Göttingen, Germany</li>
                <li className="flex gap-3"><Check />Postdoctoral training in Clinical Neuroscience, University of Cambridge, UK</li>
                <li className="flex gap-3"><Check />Senior scientist roles at Astellas Pharma, Cambridge, and Medinect Ophtho, Belfast</li>
                <li className="flex gap-3"><Check />More than 10 published neuroscience papers, with grants from Fight for Sight UK, Addenbrooke’s Trust and Boehringer Ingelheim</li>
              </ul>
            </div>
            <img
              src="/assets/team/ratnakar-mishra.jpg"
              alt="Portrait of Dr Ratnakar Mishra"
              className="aspect-[4/5] w-full max-w-[380px] rounded-xl object-cover"
              style={{ objectPosition: '50% 15%' }}
            />
          </div>
        </section>

        <section className="bg-misty" aria-labelledby="principles-heading">
          <div className="container-site py-20">
            <p className="eyebrow">How we work</p>
            <h2 id="principles-heading" className="heading-lg mt-3">Our principles</h2>
            <div className="mt-10 flex flex-wrap gap-6">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="min-w-0 flex-[1_1_280px] rounded-xl bg-white p-8">
                  <h3 className="heading-md">{p.title}</h3>
                  <p className="mt-3 text-ink">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/founding" className="btn-primary">Join the Founding Community</Link>
              <Link href="/contact" className="btn-outline">Clinical collaborations</Link>
              <Link href="/investors" className="btn-outline">Investor information</Link>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
