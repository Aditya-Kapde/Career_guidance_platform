import React from 'react';

const PremiumSkillGap = ({ skillGapAnalysis }) => {
  if (!skillGapAnalysis || skillGapAnalysis.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 07</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Skill Gap Matrix</h3>
        <p className="text-gray-500 mt-4 text-lg">Analysis of specific competencies required for your targeted careers and your current baseline.</p>
      </div>

      <div className="overflow-visible pb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider">Skill Requirement</th>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider">Target Level</th>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider">Priority</th>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider">Difficulty</th>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider">Est. Time</th>
              <th className="p-4 border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase tracking-wider">Recommended Resources</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {skillGapAnalysis.map((gap, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900 bg-white sticky left-0">{gap.skill}</td>
                <td className="p-4">{gap.targetLevel}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    gap.priority?.toLowerCase() === 'high' ? 'bg-rose-100 text-rose-800' :
                    gap.priority?.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {gap.priority}
                  </span>
                </td>
                <td className="p-4">{gap.difficulty}</td>
                <td className="p-4 font-mono text-xs">{gap.estimatedTime}</td>
                <td className="p-4 italic text-gray-600">{gap.recommendedResources}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PremiumSkillGap;
