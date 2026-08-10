import React from 'react';
import { 
  Banknote, BookOpen, GraduationCap, Users, ShieldCheck, 
  Laptop, Bot, Lightbulb, User, Rocket, Info,
  PenTool, Layout, Building, Megaphone, Briefcase, Star
} from 'lucide-react';

const getCareerIcon = (careerName) => {
  const name = careerName.toLowerCase();
  if (name.includes('design') || name.includes('art')) return <PenTool size={24} className="mx-auto mb-2 text-slate-600" />;
  if (name.includes('ux') || name.includes('ui') || name.includes('web')) return <Layout size={24} className="mx-auto mb-2 text-indigo-600" />;
  if (name.includes('architect') || name.includes('civil')) return <Building size={24} className="mx-auto mb-2 text-slate-600" />;
  if (name.includes('market') || name.includes('sales')) return <Megaphone size={24} className="mx-auto mb-2 text-slate-600" />;
  return <Briefcase size={24} className="mx-auto mb-2 text-slate-600" />;
};

const getDimensionIcon = (key) => {
  const icons = {
    salary: <Banknote size={18} className="text-slate-600" />,
    difficulty: <BookOpen size={18} className="text-slate-600" />,
    educationLength: <GraduationCap size={18} className="text-slate-600" />,
    competition: <Users size={18} className="text-slate-600" />,
    jobStability: <ShieldCheck size={18} className="text-slate-600" />,
    remoteWork: <Laptop size={18} className="text-emerald-500" />,
    aiResistance: <Bot size={18} className="text-slate-600" />,
    creativity: <Lightbulb size={18} className="text-slate-600" />,
    leadership: <User size={18} className="text-slate-600" />,
    entrepreneurial: <Rocket size={18} className="text-slate-600" />
  };
  return icons[key] || null;
};

const CareerComparison = ({ comparison }) => {
  if (!comparison || comparison.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto print:break-before-page">
      <div className="mb-10 max-w-[90rem] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">Chapter 04 • Career Pathways</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Dimensional Career Comparison</h3>
          <p className="text-slate-500 text-lg">A side-by-side evaluation of your top career pathways across 10 critical dimensions.</p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm text-sm font-medium text-slate-700">
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>High</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>Medium</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Yes</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>No</div>
        </div>
      </div>

      <div className="overflow-x-auto pb-8 rounded-2xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full text-center border-collapse min-w-[900px]">
          <thead>
            <tr>
              <th className="p-6 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/5 text-left bg-white">
                Dimension
              </th>
              {comparison.map((c, idx) => {
                const isBestFit = idx === 0;
                return (
                  <th key={idx} className={`p-6 border-b border-slate-200 relative w-1/5 align-bottom ${isBestFit ? 'bg-indigo-50/50' : 'bg-white'}`}>
                    {isBestFit && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-indigo-200 whitespace-nowrap">
                        <Star size={10} className="fill-indigo-700" /> Best overall fit
                      </div>
                    )}
                    {getCareerIcon(c.career)}
                    <div className={`text-sm font-bold ${isBestFit ? 'text-indigo-900' : 'text-slate-900'}`}>
                      {c.career}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
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
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-800 bg-white sticky left-0 text-left flex items-center gap-3">
                  {getDimensionIcon(row.key)}
                  {row.label}
                </td>
                {comparison.map((c, idx) => {
                  const isBestFit = idx === 0;
                  const val = c[row.key] || '-';
                  const lowerVal = val.toLowerCase();
                  
                  let badgeClass = 'bg-slate-100 text-slate-600';
                  if (lowerVal === 'high') badgeClass = 'bg-indigo-100 text-indigo-700';
                  else if (lowerVal === 'yes') badgeClass = 'bg-emerald-100 text-emerald-700';
                  else if (lowerVal === 'no') badgeClass = 'bg-rose-100 text-rose-700';
                  else if (lowerVal === 'long') badgeClass = 'bg-orange-100 text-orange-700';

                  return (
                    <td key={idx} className={`p-4 ${isBestFit ? 'bg-indigo-50/30' : ''}`}>
                      <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${badgeClass}`}>
                        {val}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={comparison.length + 1} className="p-4 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-center gap-2">
                  <Info size={14} className="text-slate-400" />
                  Comparisons are directional and should be considered alongside interests, aptitude, and goals.
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default CareerComparison;
