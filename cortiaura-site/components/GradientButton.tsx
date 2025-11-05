import React from 'react';

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const GradientButton: React.FC<GradientButtonProps> = ({ label, className = '', ...props }) => {
  return (
    <button
      className={`btn-gradient text-white font-semibold rounded-md px-5 py-3 shadow-md hover:opacity-95 transition ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default GradientButton;
