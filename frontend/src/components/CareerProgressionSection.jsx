import React from 'react';
import { TrendingUp } from 'lucide-react';
import Badge from './ui/Badge';

export default function CareerProgressionSection({ careerProgression = [] }) {
  if (!careerProgression || careerProgression.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <TrendingUp className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
            Trajectory
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Career Role Progression
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
        {careerProgression.map((step, idx) => {
          const isObj = typeof step === 'object';
          const role = isObj ? step.stage || step.role || step.title : String(step);
          const yoe = isObj ? step.duration || step.experience || step.years : null;
          const desc = isObj ? step.responsibilities || step.description : null;

          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-indigo-600">
                  STAGE {String(idx + 1).padStart(2, '0')}
                </span>
                {yoe && (
                  <Badge variant="slate" size="sm">
                    {yoe}
                  </Badge>
                )}
              </div>

              <h4 className="font-bold text-sm text-slate-900 leading-tight">
                {role}
              </h4>

              {desc && (
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
