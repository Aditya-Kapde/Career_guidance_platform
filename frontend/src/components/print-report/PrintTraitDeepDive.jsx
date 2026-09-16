import React from 'react';
import { BrainCircuit, CheckCircle2, AlertCircle, Compass } from 'lucide-react';

const PrintTraitDeepDive = ({ traits }) => {
  if (!traits || traits.length === 0) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 02
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Psychometric Trait Deep Dive
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Structural analysis of core psychological drivers, situational advantages, and career relevancies.
        </p>
      </div>

      <div className="space-y-6">
        {traits.map((trait, idx) => (
          <div key={idx} className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 print:break-inside-avoid space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-900">{trait.trait}</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Dimension {idx + 1}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {trait.interpretation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-1">
                  Key Advantage
                </span>
                <p className="text-emerald-950 font-medium text-[11px] leading-snug">
                  {trait.advantages}
                </p>
              </div>

              <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
                <span className="text-[10px] font-bold uppercase text-rose-800 block mb-1">
                  Limitation / Blindspot
                </span>
                <p className="text-rose-950 font-medium text-[11px] leading-snug">
                  {trait.limitations}
                </p>
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100">
                <span className="text-[10px] font-bold uppercase text-indigo-800 block mb-1">
                  Career Relevance
                </span>
                <p className="text-indigo-950 font-medium text-[11px] leading-snug">
                  {trait.careerRelevance}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrintTraitDeepDive;
