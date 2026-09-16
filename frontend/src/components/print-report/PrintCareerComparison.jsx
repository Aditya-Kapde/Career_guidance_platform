import React from 'react';

const PrintCareerComparison = ({ comparison }) => {
  if (!comparison || comparison.length === 0) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 04
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Dimensional Career Comparison
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Side-by-side structural evaluation of top career alternatives across core decision variables.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white print:break-inside-avoid">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-3 font-bold uppercase tracking-wider text-[10px] text-slate-300 w-1/4">
                Dimension
              </th>
              {comparison.slice(0, 3).map((c, idx) => (
                <th key={idx} className="p-3 font-bold text-xs text-indigo-300">
                  {c.career}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {[
              { key: 'salary', label: 'Salary Potential' },
              { key: 'difficulty', label: 'Learning Difficulty' },
              { key: 'educationLength', label: 'Study Duration' },
              { key: 'competition', label: 'Market Competition' },
              { key: 'jobStability', label: 'Job Stability' },
              { key: 'remoteWork', label: 'Remote Viability' },
              { key: 'aiResistance', label: 'AI Resistance' },
              { key: 'creativity', label: 'Creativity Required' },
              { key: 'leadership', label: 'Leadership Focus' }
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="p-3 font-bold text-slate-900 text-[11px]">
                  {row.label}
                </td>
                {comparison.slice(0, 3).map((c, idx) => (
                  <td key={idx} className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                      c[row.key]?.toLowerCase() === 'high' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      c[row.key]?.toLowerCase() === 'low' ? 'bg-slate-100 text-slate-600' :
                      c[row.key]?.toLowerCase() === 'yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      c[row.key]?.toLowerCase() === 'no' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-slate-50 text-slate-700 border border-slate-200'
                    }`}>
                      {c[row.key] || 'Standard'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PrintCareerComparison;
