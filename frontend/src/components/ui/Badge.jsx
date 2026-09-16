import React from 'react';

export default function Badge({
  children,
  variant = 'indigo', // 'indigo' | 'slate' | 'emerald' | 'amber' | 'purple' | 'rose' | 'blue'
  size = 'md', // 'sm' | 'md' | 'lg'
  dot = false,
  icon: Icon,
  className = ''
}) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-medium tracking-tight gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold tracking-tight gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm font-semibold tracking-tight gap-2'
  };

  const variantStyles = {
    indigo: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      dot: 'bg-indigo-500'
    },
    slate: {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400'
    },
    emerald: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500'
    },
    amber: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
      dot: 'bg-amber-500'
    },
    purple: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
      dot: 'bg-purple-500'
    },
    rose: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dot: 'bg-rose-500'
    },
    blue: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dot: 'bg-sky-500'
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.indigo;

  return (
    <span
      className={`
        inline-flex items-center rounded-full border leading-none select-none
        ${sizeStyles[size] || sizeStyles.md}
        ${currentVariant.badge}
        ${className}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${currentVariant.dot} shrink-0`} />}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
