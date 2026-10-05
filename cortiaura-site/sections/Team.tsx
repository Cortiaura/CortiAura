import React from 'react';
import Link from 'next/link';

const PEOPLE = [
  {
    name: 'Dr Prashant Bhand',
    role: 'Founder & CEO',
    bio: 'Consultant gastroenterologist in the NHS with 9–10 years’ specialist experience. Postgraduate qualification in AI and machine learning.',
    image: '/assets/prashant.jpeg',
    position: '50% 20%',
  },
  {
    name: 'Dr Ratnakar Mishra',
    role: 'Co-founder',
    bio: 'Clinical neuroscientist. PhD, University of Göttingen; postdoctoral research, University of Cambridge.',
    image: '/assets/team/ratnakar-mishra.jpg',
    position: '50% 15%',
  },
];

const Team: React.FC = () => {
  return (
    <section id="team" className="scroll-mt-24 bg-misty" aria-labelledby="team-heading">
      <div className="container-site py-24">
        <p className="eyebrow">The team</p>
        <h2 id="team-heading" className="heading-lg mt-4 max-w-[760px]">
          Founded by a clinician who sees the problem every week.
        </h2>
        <div className="mt-12 flex flex-wrap gap-6">
          {PEOPLE.map((p) => (
            <div key={p.name} className="flex min-w-0 flex-[1_1_340px] flex-wrap overflow-hidden rounded-xl bg-white">
              <img
                src={p.image}
                alt={`Portrait of ${p.name}`}
                className="h-[240px] w-full object-cover sm:w-[190px]"
                style={{ objectPosition: p.position }}
              />
              <div className="min-w-0 flex-[1_1_180px] p-7">
                <p className="font-display text-[26px] leading-tight">{p.name}</p>
                <p className="mt-1 font-semibold text-garnet">{p.role}</p>
                <p className="mt-3 text-[15px] text-ink">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/about" className="mt-8 inline-block font-semibold text-garnet hover:text-imperial">
          More about the team <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
};

export default Team;
