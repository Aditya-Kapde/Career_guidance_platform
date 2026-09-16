import React from 'react';

export default function IconButton({
  icon: Icon,
  variant = 'secondary', // 'primary' | 'secondary' | 'ghost' | 'soft' | 'neu'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  onClick,
  disabled = false,
  label,
  ...props
}) {
  const sizeStyles = {
    sm: 'w-8 h-8 rounded-lg p-1.5',
    md: 'w-10 h-10 rounded-xl p-2.5',
    lg: 'w-12 h-12 rounded-2xl p-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md hover:shadow-indigo-500/20 active:bg-indigo-800',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-sm hover:border-slate-300',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
    soft: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100',
    neu: 'bg-white neu-flat hover:shadow-md text-slate-700'
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${iconSizes[size]} text-current`} />}
    </button>
  );
}
