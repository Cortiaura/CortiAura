import React from 'react';

const AuraBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <img
        src="/assets/gradient-bg.svg"
        alt=""
        className="w-[140%] max-w-none blur-3xl opacity-60 select-none pointer-events-none"
      />
    </div>
  );
};

export default AuraBackground;
