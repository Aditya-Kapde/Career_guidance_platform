import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default function ReportFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-slate-200/80 text-center space-y-3 pb-8">
      <div className="flex items-center justify-center gap-2 text-slate-900 font-extrabold text-sm">
        <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
          <GraduationCap className="w-3.5 h-3.5" />
        </div>
        <span>PathFinder AI • Personal Career Intelligence Platform</span>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Calculated via deterministic psychometric engines & Groq Llama 3 models.</span>
      </div>

      <p className="text-[11px] text-slate-400 max-w-md mx-auto">
        This document provides personalized career and academic guidance. Final career decisions should consider individual circumstances, academic performance, and personal counsel.
      </p>
    </footer>
  );
}
