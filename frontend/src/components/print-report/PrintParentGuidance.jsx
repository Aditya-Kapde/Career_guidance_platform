import React from 'react';
import { HeartHandshake, ShieldAlert, Zap, Activity, BarChart3 } from 'lucide-react';

const PrintParentGuidance = ({ guidance }) => {
  if (!guidance) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 09
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Parent & Mentor Strategic Framework
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Actionable advisory principles for supporting student potential, intrinsic motivation, and academic wellbeing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 print:break-inside-avoid space-y-2">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>How to Support</span>
          </div>
          <p className="text-xs text-emerald-950 font-medium leading-relaxed">
            {guidance.howToSupport || "Provide consistent encouragement for exploratory curiosity, structured study routines, and hands-on portfolio creation."}
          </p>
        </div>

        <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200/80 print:break-inside-avoid space-y-2">
          <div className="flex items-center gap-2 text-rose-950 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>What NOT to Force</span>
          </div>
          <p className="text-xs text-rose-950 font-medium leading-relaxed">
            {guidance.whatNotToForce || "Avoid forcing rigid career paths that disconnect from student aptitude or comparing performance with peers."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {guidance.howToMotivate && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 print:break-inside-avoid space-y-1">
            <span className="font-bold text-slate-800 text-[11px] block">Motivation Strategy</span>
            <p className="text-slate-600 leading-snug">{guidance.howToMotivate}</p>
          </div>
        )}

        {guidance.avoidBurnout && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 print:break-inside-avoid space-y-1">
            <span className="font-bold text-slate-800 text-[11px] block">Burnout Prevention</span>
            <p className="text-slate-600 leading-snug">{guidance.avoidBurnout}</p>
          </div>
        )}

        {guidance.evaluateProgress && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 print:break-inside-avoid space-y-1">
            <span className="font-bold text-slate-800 text-[11px] block">Evaluating Progress</span>
            <p className="text-slate-600 leading-snug">{guidance.evaluateProgress}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrintParentGuidance;
