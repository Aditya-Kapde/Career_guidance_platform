import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  badge,
  icon: Icon,
  className = '',
  align = 'left' // 'left' | 'center'
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 ${align === 'center' ? 'text-center items-center' : ''} ${className}`}>
      <div className={`space-y-1.5 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
        {eyebrow && (
          <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
            {eyebrow}
          </p>
        )}
        <div className={`flex items-center gap-2.5 flex-wrap ${align === 'center' ? 'justify-center' : ''}`}>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          {badge}
        </div>
        {subtitle && (
          <p className="text-sm text-slate-500 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
