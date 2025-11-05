import React from 'react';

type IconCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const IconCard: React.FC<IconCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-[var(--color-text-dark)]">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default IconCard;
