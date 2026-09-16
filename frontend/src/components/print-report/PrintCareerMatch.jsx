import React from 'react';
import { Briefcase, MapPin, GraduationCap, DollarSign, BrainCircuit, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const PrintCareerMatch = ({ topCareers }) => {
  if (!topCareers || topCareers.length === 0) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-8">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 03
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Top Compatible Career Pathways
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Mathematical cosine-weighted compatibility evaluation against standardized industry profiles.
        </p>
      </div>

      <div className="space-y-8">
        {topCareers.map((career, idx) => {
          const score = Math.round(career.score || 85);
          return (
            <div key={idx} className="rounded-2xl border border-slate-200/90 overflow-hidden print:break-inside-avoid shadow-xs">
              {/* Header Bar */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {Array.isArray(career.industries) ? career.industries.slice(0, 2).join(' • ') : (career.industries || 'Strategic Industry')}
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight">{career.career}</h3>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-400 block leading-tight">
                    {score}%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Compatibility
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 bg-white space-y-4 text-xs">
                {/* Match Reason */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="font-bold text-slate-800 block mb-1">Strategic Alignment:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {career.matchReason || career.reason || "Strong alignment with candidate's analytical orientation, structured reasoning, and problem-solving velocity."}
                  </p>
                </div>

                {/* 4 Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Education</span>
                    <p className="font-bold text-slate-800 text-[11px] truncate">{career.requiredEducation || "Bachelor's Degree"}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Salary Range</span>
                    <p className="font-bold text-slate-800 text-[11px] truncate">{career.salaryProgression || "₹6 LPA - ₹25 LPA+"}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Environment</span>
                    <p className="font-bold text-slate-800 text-[11px] truncate">{career.workEnvironment || "Office / Hybrid"}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">AI Disruption</span>
                    <p className="font-bold text-slate-800 text-[11px] truncate">{career.aiImpact || "Augmented / Low Risk"}</p>
                  </div>
                </div>

                {/* Pros & Cons */}
                {(career.pros || career.cons) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {career.pros && career.pros.length > 0 && (
                      <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                        <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-1">Key Advantages</span>
                        <ul className="space-y-1 text-[11px] text-emerald-950 font-medium">
                          {career.pros.slice(0, 2).map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {career.cons && career.cons.length > 0 && (
                      <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
                        <span className="text-[10px] font-bold uppercase text-rose-800 block mb-1">Considerations / Risks</span>
                        <ul className="space-y-1 text-[11px] text-rose-950 font-medium">
                          {career.cons.slice(0, 2).map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-rose-500 font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PrintCareerMatch;
