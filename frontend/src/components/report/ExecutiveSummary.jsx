import React from 'react';
import { Sparkles, FileText } from 'lucide-react';
import Badge from '../ui/Badge';

export default function ExecutiveSummary({ summaryData }) {
  if (!summaryData) return null;

  const summaryText = typeof summaryData === 'string' 
    ? summaryData 
    : summaryData.profileSummary || summaryData.summary || JSON.stringify(summaryData);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat relative overflow-hidden">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <FileText className="w-4 h-4 stroke-[2.2]" />
        </div>
        <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
          Executive Profile Synthesis
        </p>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
        Profile Briefing
      </h3>

      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
        {summaryText}
      </p>
    </div>
  );
}
