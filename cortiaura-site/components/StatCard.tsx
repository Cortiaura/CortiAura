import React from 'react';

type StatCardProps = {
  value: string;
  label: string;
};

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-3xl font-bold text-[var(--color-text-dark)]">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
};

export default StatCard;
