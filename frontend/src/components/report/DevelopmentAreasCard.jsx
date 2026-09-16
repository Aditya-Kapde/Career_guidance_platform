import React from 'react';
import { TrendingUp, Target, ArrowUpRight } from 'lucide-react';
import Badge from '../ui/Badge';

export default function DevelopmentAreasCard({ developmentAreas = [] }) {
  if (!developmentAreas || developmentAreas.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Target className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
              Growth Potential
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Areas to Develop
            </h3>
          </div>
        </div>

        <ul className="space-y-3 pt-2">
          {developmentAreas.map((item, idx) => {
            const isObj = typeof item === 'object';
            const trait = isObj ? (item.trait || item.skill || item.name) : item;
            const text = isObj ? (item.advice || item.description || item.improvement) : null;

            return (
              <li key={idx} className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {trait}
                  </span>
                  <Badge variant="amber" size="sm">
                    Growth Focus
                  </Badge>
                </div>
                {text && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                    {text}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-400">
        Targeted coaching in these areas maximizes overall career trajectory.
      </div>
    </div>
  );
}
