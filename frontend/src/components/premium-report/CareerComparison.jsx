import React from 'react';

const CareerComparison = ({ comparison }) => {
  if (!comparison || comparison.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 04</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Dimensional Career Comparison</h3>
        <p className="text-gray-500 mt-4 text-lg">A side-by-side structural evaluation of your top career pathways across 10 critical dimensions.</p>
      </div>

      <div className="overflow-x-auto pb-8">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider w-1/5">Dimension</th>
              {comparison.map((c, idx) => (
                <th key={idx} className="p-4 border-b-2 border-indigo-600 text-sm font-bold text-indigo-900 w-1/5 bg-indigo-50/30">
                  {c.career}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {[
              { key: 'salary', label: 'Salary Potential' },
              { key: 'difficulty', label: 'Learning Difficulty' },
              { key: 'educationLength', label: 'Education Length' },
              { key: 'competition', label: 'Competition' },
              { key: 'jobStability', label: 'Job Stability' },
              { key: 'remoteWork', label: 'Remote Viability' },
              { key: 'aiResistance', label: 'AI Resistance' },
              { key: 'creativity', label: 'Creativity Required' },
              { key: 'leadership', label: 'Leadership Focus' },
              { key: 'entrepreneurial', label: 'Entrepreneurial' }
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900 bg-white sticky left-0">{row.label}</td>
                {comparison.map((c, idx) => (
                  <td key={idx} className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      c[row.key]?.toLowerCase() === 'high' ? 'bg-indigo-100 text-indigo-800' :
                      c[row.key]?.toLowerCase() === 'low' ? 'bg-gray-100 text-gray-600' :
                      c[row.key]?.toLowerCase() === 'yes' ? 'bg-emerald-100 text-emerald-800' :
                      c[row.key]?.toLowerCase() === 'no' ? 'bg-rose-100 text-rose-800' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {c[row.key] || '-'}
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

export default CareerComparison;
