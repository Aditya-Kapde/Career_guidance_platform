import React from 'react';
import { Target, AlertCircle, TrendingUp, ShieldAlert } from 'lucide-react';

const PrintSWOT = ({ swot }) => {
  if (!swot) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 05
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Strategic SWOT Analysis
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Internal psychological drivers juxtaposed against external market landscape factors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 print:break-inside-avoid space-y-3">
          <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              Strengths (Internal Assets)
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950 font-medium">
            {swot.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200/80 print:break-inside-avoid space-y-3">
          <div className="flex items-center gap-2 border-b border-rose-200/60 pb-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-950">
              Development Areas (Internal Gaps)
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-rose-950 font-medium">
            {swot.weaknesses?.map((w, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-rose-500 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="p-5 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 print:break-inside-avoid space-y-3">
          <div className="flex items-center gap-2 border-b border-indigo-200/60 pb-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
              Opportunities (External Drivers)
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-indigo-950 font-medium">
            {swot.opportunities?.map((o, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200/80 print:break-inside-avoid space-y-3">
          <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
              Threats (External Risks)
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-amber-950 font-medium">
            {swot.threats?.map((t, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-amber-500 font-bold">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrintSWOT;
