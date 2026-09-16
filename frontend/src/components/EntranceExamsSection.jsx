import React from 'react';
import { BookOpen } from 'lucide-react';
import Badge from './ui/Badge';

export default function EntranceExamsSection({ entranceExams = [] }) {
  if (!entranceExams || entranceExams.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm neu-flat space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
          <BookOpen className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Entrance Exams & Criteria
        </h3>
      </div>

      <div className="space-y-2.5 pt-1">
        {entranceExams.map((exam, idx) => {
          const isObj = typeof exam === 'object';
          const title = isObj ? exam.name || exam.exam : exam;
          const desc = isObj ? exam.description || exam.level : null;

          return (
            <div key={idx} className="p-3 rounded-2xl bg-amber-50/40 border border-amber-100/70 text-xs">
              <span className="font-bold text-slate-900 block">
                {title}
              </span>
              {desc && (
                <span className="text-slate-500 text-[11px] block mt-0.5">
                  {desc}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
