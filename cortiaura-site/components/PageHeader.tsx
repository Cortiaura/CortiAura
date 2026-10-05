import React from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
};

const PageHeader: React.FC<Props> = ({ eyebrow, title, intro }) => (
  <section className="bg-misty">
    <div className="container-site py-16 md:py-20">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="heading-lg mt-4 max-w-[860px] md:!text-[56px]">{title}</h1>
      {intro && <div className="mt-5 max-w-[680px] text-lg text-ink">{intro}</div>}
    </div>
  </section>
);

export default PageHeader;
