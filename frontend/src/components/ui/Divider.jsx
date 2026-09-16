import React from 'react';

export default function Divider({
  label,
  className = '',
  orientation = 'horizontal' // 'horizontal' | 'vertical'
}) {
  if (orientation === 'vertical') {
    return <div className={`w-px bg-slate-200 self-stretch my-1 ${className}`} />;
  }

  if (label) {
    return (
      <div className={`flex items-center gap-3 my-6 w-full ${className}`}>
        <div className="h-px bg-slate-200 flex-1" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
          {label}
        </span>
        <div className="h-px bg-slate-200 flex-1" />
      </div>
    );
  }

  return <hr className={`border-0 h-px bg-slate-200/80 my-6 w-full ${className}`} />;
}
