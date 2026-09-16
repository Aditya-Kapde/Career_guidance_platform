import React from 'react';
import { School } from 'lucide-react';
import Badge from './ui/Badge';

export default function TopCollegesSection({ topColleges = [] }) {
  if (!topColleges || topColleges.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm neu-flat space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
          <School className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Premier Academic Institutions
        </h3>
      </div>

      <div className="space-y-2.5 pt-1">
        {topColleges.map((college, idx) => {
          const isObj = typeof college === 'object';
          const name = isObj ? college.name || college.college : college;
          const loc = isObj ? college.location : null;

          return (
            <div key={idx} className="p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100/70 text-xs">
              <span className="font-bold text-slate-900 block">
                {name}
              </span>
              {loc && (
                <span className="text-slate-500 text-[11px] block mt-0.5">
                  {loc}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
