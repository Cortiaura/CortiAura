import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function AboutPage() {
  const team: { name: string; role: string; bio: string; image: string }[] = [
    {
      name: 'Chief Executive Officer',
      role: 'CEO',
      bio: 'Leads vision, partnerships, and clinical collaborations.',
      image: '/assets/team/ceo.jpg',
    },
    {
      name: 'Chief Financial Officer',
      role: 'CFO',
      bio: 'Stewards strategy, compliance, and sustainable growth.',
      image: '/assets/team/cfo.jpg',
    },
    {
      name: 'People Head',
      role: 'People & Culture',
      bio: 'Builds team culture, hiring, and researcher participant care.',
      image: '/assets/team/people-head.jpg',
    },
  ];
  return (
    <SiteLayout>
      <Head>
        <title>About — CortiAura™</title>
        <meta
          name="description"
          content="About Dr. Prashant Bhand and CortiAura’s mission to harmonise the body's stress response through science, design, and ethical innovation."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dr. Prashant Bhand',
              jobTitle: 'Consultant Gastroenterologist',
              affiliation: 'NHS',
              knowsAbout: [
                'Gastroenterology',
                'Gut–brain axis',
                'Vagus nerve',
                'Stress physiology',
                'Neuromodulation',
              ],
              worksFor: { '@type': 'Organization', name: 'CortiAura' },
              url: 'https://cortiaura.com/about',
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-semibold text-white">About CortiAura</h1>
            <p className="mt-4 text-[#F9F6FA]/85 max-w-3xl">
              A research-led exploration into helping the body restore balance in a world of constant demand.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] max-w-2xl justify-self-end rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white/5 ring-1 ring-white/10 rounded-2xl" />
            <Image
              src="/assets/product-hero.jpg"
              alt="CortiAura product visual"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/gradient-bg.svg';
              }}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B1A]" />
      </section>

      {/* Founder */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Founder — Dr. Prashant Bhand</h2>
            <p className="mt-4 text-[#F9F6FA]/85">
              Dr. Prashant Bhand is a Consultant Gastroenterologist with the NHS, focused on the gut–brain axis, stress physiology, and non-invasive neuromodulation. He founded CortiAura™ to explore science-based ways to support the body’s natural stress regulation and restore everyday balance.
            </p>
            <h3 className="sr-only">Highlights</h3>
            <ul className="mt-6 space-y-2 text-[#F9F6FA]/80">
              <li className="flex gap-2"><span>•</span><span>NHS Consultant Gastroenterologist (UK)</span></li>
              <li className="flex gap-2"><span>•</span><span>15+ years in clinical practice across endoscopy, IBD, and functional GI disorders</span></li>
              <li className="flex gap-2"><span>•</span><span>Research interests: vagus-nerve pathways, cortisol rhythms, autonomic balance</span></li>
              <li className="flex gap-2"><span>•</span><span>Presenter at clinical forums; contributor to audit and service-improvement projects</span></li>
              <li className="flex gap-2"><span>•</span><span>Founder & IP lead for the CortiAura™ method (TM filed; IP paper in progress)</span></li>
            </ul>
            <div className="mt-8">
              <h3 className="text-white font-medium">Mission</h3>
              <p className="mt-2 text-[#F9F6FA]/80">
                Evidence-led, ethical, and designed for real life: bringing calm within reach through gentle, non-drug, non-invasive approaches.
              </p>
            </div>
          </div>
          <div className="relative w-full aspect-square max-w-md justify-self-end rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white/5 ring-1 ring-white/10 rounded-2xl" />
            <Image
              src="/assets/prashant.jpeg"
              alt="Portrait of Dr. Prashant Bhand"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[50%_20%]"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement & { dataset: Record<string, string> };
                if (!img.dataset.tryjpg) {
                  img.dataset.tryjpg = '1';
                  img.src = '/assets/prashant.jpg';
                } else {
                  img.src = '/assets/gradient-bg.svg';
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">Team</h2>
            <p className="mt-3 text-center text-[#F9F6FA]/80">A growing group committed to evidence-led calm.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.filter((m) => m.name && m.role).map((m) => (
                <div key={m.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/gradient-bg.svg';
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-white font-medium">{m.name}</h3>
                    <p className="text-[#F9F6FA]/70 text-sm">{m.role}</p>
                    <p className="text-[#F9F6FA]/80 text-sm mt-2">{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission & Principles */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
              <h3 className="text-white font-medium">Evidence-led</h3>
              <p className="text-[#F9F6FA]/75 mt-2">Guided by research with transparency and rigor.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
              <h3 className="text-white font-medium">Ethical & Non-invasive</h3>
              <p className="text-[#F9F6FA]/75 mt-2">Respecting the body with gentle, human-centered design.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
              <h3 className="text-white font-medium">Designed for Everyday Calm</h3>
              <p className="text-[#F9F6FA]/75 mt-2">Practical and accessible for real life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Callouts */}
      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex flex-wrap gap-4 justify-center">
            {/* Clinical collaborations */}
            <a
              href="https://www.linkedin.com/company/cortiaura/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex rounded-md p-[1.5px]"
              style={{ background: 'linear-gradient(90deg, #AF98E4 0%, #63D7C7 100%)' }}
            >
              <span className="inline-flex items-center justify-center rounded-[calc(0.375rem-1.5px)] px-6 py-3 text-white/90 bg-transparent backdrop-blur-[1px] hover:bg-white/5 transition-colors">
                Clinical collaborations
              </span>
            </a>

            {/* Advisors & investors */}
            <a
              href="https://www.linkedin.com/company/cortiaura/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex rounded-md p-[1.5px]"
              style={{ background: 'linear-gradient(90deg, #AF98E4 0%, #63D7C7 100%)' }}
            >
              <span className="inline-flex items-center justify-center rounded-[calc(0.375rem-1.5px)] px-6 py-3 text-white/90 bg-transparent backdrop-blur-[1px] hover:bg-white/5 transition-colors">
                Advisors & investors
              </span>
            </a>

            {/* Join the waitlist */}
            <a
              href="/#get-involved"
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-white font-semibold shadow-md transition hover:opacity-95 bg-gradient-to-r from-[#AF98E4] to-[#63D7C7]"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
