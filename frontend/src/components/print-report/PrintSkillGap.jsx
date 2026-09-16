import React from 'react';

const PrintSkillGap = ({ skillGapAnalysis }) => {
  if (!skillGapAnalysis || skillGapAnalysis.length === 0) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 07
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Executive Skill Gap Matrix
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Competency readiness analysis comparing student baseline against target industry proficiency requirements.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white print:break-inside-avoid">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-slate-300">
                Core Competency
              </th>
              <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-slate-300">
                Target Proficiency
              </th>
              <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-slate-300">
                Priority
              </th>
              <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-slate-300">
                Est. Time
              </th>
              <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-slate-300">
                Recommended Resources
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {skillGapAnalysis.slice(0, 6).map((gap, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="p-3 font-bold text-slate-900 text-[11px]">
                  {gap.skill}
                </td>
                <td className="p-3 font-medium text-[11px] text-slate-600">
                  {gap.targetLevel || "Proficient"}
                </td>
                <td className="p-3">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                    gap.priority?.toLowerCase() === 'high' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    gap.priority?.toLowerCase() === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {gap.priority || "Medium"}
                  </span>
                </td>
                <td className="p-3 font-mono text-[10px] text-slate-500">
                  {gap.estimatedTime || "3-6 Mos"}
                </td>
                <td className="p-3 text-[11px] text-slate-600 italic">
                  {gap.recommendedResources || "Interactive Lab / Projects"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PrintSkillGap;
