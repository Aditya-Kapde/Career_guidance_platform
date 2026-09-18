import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default function ReportFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-slate-200/80 text-center space-y-3 pb-8">
      <div className="flex items-center justify-center gap-2 text-slate-900 font-extrabold text-sm">
        <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
          <GraduationCap className="w-3.5 h-3.5" />
        </div>
        <span>PathFinder AI • Career Guidance & Evaluation Platform</span>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Career matching is calculated using configured deterministic scoring rules.</span>
      </div>

      <p className="text-[11px] text-slate-500 max-w-lg mx-auto leading-relaxed">
        <strong>Disclaimer:</strong> This assessment provides guidance based on your responses and the configured career-matching model. It is not a psychometric diagnosis or a substitute for professional educational/career counseling.
      </p>
    </footer>
  );
}
