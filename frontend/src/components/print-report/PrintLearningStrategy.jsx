import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const PremiumLearningStrategy = ({ strategy }) => {
  if (!strategy) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 08</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Learning Strategy</h3>
        <p className="text-gray-500 mt-4 text-lg">Evidence-based techniques for maximizing your knowledge retention and skill acquisition.</p>
      </div>

      <div className="bg-indigo-50 p-8 md:p-12 rounded-3xl border border-indigo-100 mb-12 print:break-inside-avoid">
        <h4 className="flex items-center gap-3 text-xl font-bold text-indigo-900 mb-4">
          <Brain className="text-indigo-600" /> Optimal Learning Pattern
        </h4>
        <p className="text-lg text-indigo-800 leading-relaxed font-medium">
          {strategy.howTheyLearnBest}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 print:break-inside-avoid">
        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
          <Sparkles size={16} className="text-amber-500" /> High-Yield Formats
        </h4>
        <div className="flex flex-wrap gap-3">
          {strategy.recommendations?.map((rec, i) => (
            <span key={i} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold uppercase tracking-wide">
              {rec}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumLearningStrategy;
