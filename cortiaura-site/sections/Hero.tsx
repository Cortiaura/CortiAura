import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container-site flex flex-wrap items-center gap-16 py-20 md:py-28">
        <div className="min-w-0 flex-[1_1_520px]">
          <p className="eyebrow">Neurotechnology for the gut–brain axis</p>
          <h1 className="heading-xl mt-5">Restoring the conversation between gut and brain.</h1>
          <p className="mt-7 max-w-[560px] text-[20px] leading-relaxed text-ink">
            CortiAura is developing a non-invasive wearable that works with the body’s own gut–brain connection,
            engineered to the highest safety standards and guided by science.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/founding" className="btn-primary">
              Join the Founding Community
            </Link>
            <Link href="/#science" className="btn-outline">
              Explore the science
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_360px] justify-center">
          <div className="flex aspect-square w-full max-w-[300px] items-center md:max-w-[440px] justify-center rounded-full bg-misty">
            <div className="flex aspect-square w-[64%] items-center justify-center rounded-full bg-blush">
              <img src="/assets/symbol.svg" alt="" className="w-[52%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
