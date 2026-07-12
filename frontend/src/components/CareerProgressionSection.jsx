import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CareerProgressionSection({
  careerProgression = [
    {
      stage: "Junior Civil Engineer",
      duration: "1-2 years",
      responsibilities: "Assisting senior engineers, performing calculations, and daily site supervision."
    },
    {
      stage: "Assistant Engineer",
      duration: "2-5 years",
      responsibilities: "Managing structural design sub-sections and supervising site operations."
    }
  ]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <ArrowUpRight className="w-5 h-5 text-indigo-600" />
        Career Progression Pathways
      </h2>
      <div className="relative border-l border-indigo-100 ml-4 pl-6 space-y-6">
        {careerProgression.map((prog, idx) => (
          <div key={idx} className="relative">
            {/* Dot */}
            <span className="absolute -left-[30px] top-1.5 bg-indigo-50 border-2 border-indigo-500 w-4 h-4 rounded-full flex items-center justify-center shadow-sm" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="font-bold text-slate-900 text-sm md:text-base">{prog.stage}</h3>
                <span className="text-xs text-slate-450 bg-slate-100 px-2 py-0.5 rounded font-bold">{prog.duration}</span>
              </div>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{prog.responsibilities}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
