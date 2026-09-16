import React from 'react';
import Card from './Card';
import Badge from './Badge';

export default function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  tag,
  tagVariant = 'indigo',
  variant = 'default', // 'default' | 'accent' | 'emerald' | 'amber'
  className = ''
}) {
  const iconColors = {
    default: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    accent: 'bg-purple-50 text-purple-600 border-purple-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  return (
    <Card hover className={`relative overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconColors[variant] || iconColors.default}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </span>
        </div>
        {tag && (
          <Badge variant={tagVariant} size="sm">
            {tag}
          </Badge>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-slate-500 leading-normal">
            {subtext}
          </p>
        )}
      </div>
    </Card>
  );
}
