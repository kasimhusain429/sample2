import React from 'react';

type LiveProjectButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ className = '', ...props }) => {
  return (
    <button
      className={`shrink-0 whitespace-nowrap rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors ${className}`}
      {...props}
    >
      Live Project
    </button>
  );
};
