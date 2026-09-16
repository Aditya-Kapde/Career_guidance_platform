import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'normal', // 'none' | 'sm' | 'normal' | 'lg' | 'xl'
  onClick,
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border border-slate-200/80 bg-white shadow-soft-sm
        ${glass ? 'glass-card' : ''}
        ${hover ? 'transition-all duration-200 hover:shadow-soft-md hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${paddingStyles[padding] || paddingStyles.normal}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
