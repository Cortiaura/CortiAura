import React from 'react';
import Link from 'next/link';

const TwoPaths: React.FC = () => {
  return (
    <section className="bg-imperial text-white" aria-label="Work with us">
      <div className="container-site flex flex-wrap gap-6 py-20">
        <div className="min-w-0 flex-[1_1_400px] rounded-xl border border-[#8E3A5C] p-10">
          <p className="eyebrow-light !text-[13px]">Clinicians &amp; researchers</p>
          <h2 className="mt-3 font-display text-[34px] font-medium leading-tight">Collaborate on the evidence.</h2>
          <p className="mt-4 text-[#F3E6E9]">
            We are looking for clinical and academic partners in gastroenterology and neuroscience for our early study and
            beyond.
          </p>
          <Link href="/contact" className="btn-white mt-7">
            Get in touch
          </Link>
        </div>
        <div className="min-w-0 flex-[1_1_400px] rounded-xl border border-[#8E3A5C] p-10">
          <p className="eyebrow-light !text-[13px]">Investors</p>
          <h2 className="mt-3 font-display text-[34px] font-medium leading-tight">Interested in CortiAura?</h2>
          <p className="mt-4 text-[#F3E6E9]">
            Visit our investor page to learn more about the company and request our materials.
          </p>
          <Link href="/investors" className="btn-white mt-7">
            Investor information
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TwoPaths;
