import React from 'react';
import { Flag, BookOpen, Layout, Zap, Trophy, GraduationCap } from 'lucide-react';

const PremiumActionPlan = ({ actionPlan }) => {
  if (!actionPlan || actionPlan.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-16">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 06</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Strategic Action Plan</h3>
        <p className="text-gray-500 mt-4 text-lg">Your phased roadmap from the next 30 days to the next 3 years.</p>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {actionPlan.map((phase, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-100 text-indigo-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Flag size={18} />
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm print:break-inside-avoid">
              <h4 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{phase.phase}</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"><Zap size={14}/> Focus Skills</h5>
                  <p className="text-sm text-gray-700">{phase.skills}</p>
                </div>
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"><Layout size={14}/> Habits to Build</h5>
                  <p className="text-sm text-gray-700">{phase.habits}</p>
                </div>
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"><BookOpen size={14}/> Books & Courses</h5>
                  <p className="text-sm text-gray-700">{phase.books} | {phase.courses}</p>
                </div>
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"><Trophy size={14}/> Projects / Competitions</h5>
                  <p className="text-sm text-gray-700">{phase.projects} | {phase.competitions}</p>
                </div>
                <div>
                  <h5 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"><GraduationCap size={14}/> Certifications</h5>
                  <p className="text-sm text-gray-700">{phase.certifications}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumActionPlan;
