import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import Badge from '../ui/Badge';

export default function StrengthsCard({ strengths = [] }) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-widest text-emerald-700 uppercase">
              Core Aptitude
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Key Strengths
            </h3>
          </div>
        </div>

        <ul className="space-y-3 pt-2">
          {strengths.map((item, idx) => {
            const text = typeof item === 'string' ? item : item.strength || item.title || JSON.stringify(item);
            return (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100/60 text-xs sm:text-sm font-semibold text-emerald-950">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="leading-relaxed">{text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-400">
        Leverage these competencies as competitive advantages.
      </div>
    </div>
  );
}
