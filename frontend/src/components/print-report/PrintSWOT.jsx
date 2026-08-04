import React from 'react';
import { Target, AlertCircle, TrendingUp, ShieldAlert } from 'lucide-react';

const PremiumSWOT = ({ swot }) => {
  if (!swot) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 05</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Strategic SWOT Analysis</h3>
        <p className="text-gray-500 mt-4 text-lg">An evaluation of your internal attributes against external market conditions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100/50 print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900 mb-6 border-b border-emerald-200/50 pb-2">
            <Target className="text-emerald-600" size={24} /> Strengths
          </h4>
          <ul className="space-y-4">
            {swot.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-emerald-800">
                <span className="text-emerald-500 mt-1">•</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100/50 print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-lg font-bold text-rose-900 mb-6 border-b border-rose-200/50 pb-2">
            <AlertCircle className="text-rose-600" size={24} /> Weaknesses
          </h4>
          <ul className="space-y-4">
            {swot.weaknesses?.map((w, i) => (
              <li key={i} className="flex items-start gap-3 text-rose-800">
                <span className="text-rose-500 mt-1">•</span> {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100/50 print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-lg font-bold text-indigo-900 mb-6 border-b border-indigo-200/50 pb-2">
            <TrendingUp className="text-indigo-600" size={24} /> Opportunities
          </h4>
          <ul className="space-y-4">
            {swot.opportunities?.map((o, i) => (
              <li key={i} className="flex items-start gap-3 text-indigo-800">
                <span className="text-indigo-500 mt-1">•</span> {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-100/50 print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-lg font-bold text-amber-900 mb-6 border-b border-amber-200/50 pb-2">
            <ShieldAlert className="text-amber-600" size={24} /> Threats
          </h4>
          <ul className="space-y-4">
            {swot.threats?.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-amber-800">
                <span className="text-amber-500 mt-1">•</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PremiumSWOT;
