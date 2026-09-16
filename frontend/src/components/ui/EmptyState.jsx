import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'No Data Available',
  description = 'There is currently no information to display for this section.',
  actionLabel,
  onAction,
  actionIcon,
  className = ''
}) {
  return (
    <div className={`p-8 md:p-12 text-center rounded-2xl bg-white border border-slate-200/80 shadow-soft-sm flex flex-col items-center justify-center max-w-md mx-auto ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-4 neu-flat">
        <Icon className="w-7 h-7 stroke-[1.75]" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} icon={actionIcon || Sparkles} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
