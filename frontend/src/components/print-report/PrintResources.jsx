import React from 'react';
import { Book, PlaySquare, GraduationCap, Compass } from 'lucide-react';

const PrintResources = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  const getIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('book')) return <Book className="text-amber-500 w-4 h-4" />;
    if (t.includes('youtube') || t.includes('video')) return <PlaySquare className="text-red-500 w-4 h-4" />;
    return <GraduationCap className="text-indigo-500 w-4 h-4" />;
  };

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 10
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Curated Professional Resources
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Verified books, digital platforms, and capstone resources tailored for skill acquisition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((res, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 print:break-inside-avoid flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0">
              {getIcon(res.type)}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {res.type || 'Resource'}
              </span>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">{res.name}</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">{res.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrintResources;
