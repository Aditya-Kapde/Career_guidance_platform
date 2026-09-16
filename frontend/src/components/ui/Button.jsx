import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 tracking-wide',
    md: 'px-5 py-2.5 text-sm gap-2 tracking-tight',
    lg: 'px-7 py-3.5 text-base gap-2.5 tracking-tight'
  };

  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md hover:shadow-indigo-500/20 active:bg-indigo-800 border border-indigo-500/30',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-sm hover:shadow hover:border-slate-300 active:bg-slate-100',
    soft: 'bg-indigo-50/80 hover:bg-indigo-100/90 text-indigo-700 border border-indigo-100/80 active:bg-indigo-200/70',
    outline: 'bg-transparent hover:bg-slate-100/80 text-slate-700 border border-slate-300 active:bg-slate-200',
    ghost: 'bg-transparent hover:bg-slate-100/70 text-slate-600 hover:text-slate-900 active:bg-slate-200/50',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-rose-500/20 active:bg-rose-800 border border-rose-500/30'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      ) : null}
    </button>
  );
}
