import React from 'react';
import { Flag, Zap, Layout, BookOpen, Trophy, GraduationCap, CheckCircle2 } from 'lucide-react';

const PrintActionPlan = ({ actionPlan }) => {
  if (!actionPlan || actionPlan.length === 0) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 06
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Phased Strategic Action Plan
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Milestone timeline from immediate 30-day habits to long-term multi-year execution targets.
        </p>
      </div>

      <div className="space-y-4">
        {actionPlan.map((phase, idx) => (
          <div key={idx} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 print:break-inside-avoid space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">{phase.phase}</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">
                Phase Milestone
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              {phase.skills && (
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-700 block text-[11px]">Primary Skills:</span>
                  <p className="text-slate-600 leading-snug">{phase.skills}</p>
                </div>
              )}

              {phase.habits && (
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-700 block text-[11px]">Key Habit to Build:</span>
                  <p className="text-slate-600 leading-snug">{phase.habits}</p>
                </div>
              )}

              {(phase.books || phase.courses) && (
                <div className="space-y-0.5 sm:col-span-2">
                  <span className="font-bold text-slate-700 block text-[11px]">Recommended Study & Resources:</span>
                  <p className="text-slate-600 leading-snug">{phase.books} {phase.courses ? `• ${phase.courses}` : ''}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrintActionPlan;
