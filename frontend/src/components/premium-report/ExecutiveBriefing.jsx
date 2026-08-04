import React from 'react';
import { Target, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

const ExecutiveBriefing = ({ execData }) => {
  if (!execData) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-after-page print:pt-10">
      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 01</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Executive Briefing</h3>
      </div>

      <div className="prose prose-lg text-gray-600 mb-16 leading-relaxed max-w-none">
        <p className="text-2xl font-light text-gray-900 leading-snug border-l-4 border-indigo-600 pl-6">
          {execData.profileSummary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div className="space-y-12">
          <div>
            <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">
              <Target size={20} className="text-indigo-600"/> Personality & Behaviour
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4"><span className="font-semibold text-gray-900">Interpretation:</span> {execData.personalityInterpretation}</p>
            <p className="text-gray-600 leading-relaxed"><span className="font-semibold text-gray-900">Dominant Pattern:</span> {execData.dominantBehaviour}</p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">
              <Lightbulb size={20} className="text-amber-500"/> Cognitive Style
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4"><span className="font-semibold text-gray-900">Learning:</span> {execData.learningStyle}</p>
            <p className="text-gray-600 leading-relaxed mb-4"><span className="font-semibold text-gray-900">Communication:</span> {execData.communicationStyle}</p>
            <p className="text-gray-600 leading-relaxed"><span className="font-semibold text-gray-900">Decision Making:</span> {execData.decisionMaking}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100/50">
            <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-900 uppercase tracking-widest mb-4">
              <TrendingUp size={16} /> Key Finding / Strength
            </h4>
            <p className="text-gray-800 font-medium leading-relaxed">{execData.biggestStrength}</p>
          </div>

          <div className="bg-rose-50/50 rounded-2xl p-8 border border-rose-100/50">
            <h4 className="flex items-center gap-2 text-sm font-bold text-rose-900 uppercase tracking-widest mb-4">
              <AlertTriangle size={16} /> Risk / Development Area
            </h4>
            <p className="text-gray-800 font-medium leading-relaxed">{execData.biggestDevelopmentOpportunity}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBriefing;
