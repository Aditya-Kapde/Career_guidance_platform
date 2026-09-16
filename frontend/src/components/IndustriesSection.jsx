import React from 'react';
import { Building2 } from 'lucide-react';
import Badge from './ui/Badge';

export default function IndustriesSection({ industries = [] }) {
  if (!industries || industries.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm neu-flat space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
          <Building2 className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Hiring Industries
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {industries.map((ind, idx) => (
          <Badge key={idx} variant="blue" size="md">
            {ind}
          </Badge>
        ))}
      </div>
    </div>
  );
}
