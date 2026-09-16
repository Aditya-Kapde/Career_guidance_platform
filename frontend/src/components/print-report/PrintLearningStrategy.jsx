import React from 'react';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';

const PrintLearningStrategy = ({ strategy }) => {
  if (!strategy) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 08
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Pedagogical Learning Strategy
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Tailored learning modalities to optimize knowledge retention and accelerate concept mastery.
        </p>
      </div>

      <div className="p-5 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 mb-6 print:break-inside-avoid space-y-2">
        <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs uppercase tracking-wider">
          <Brain className="w-4 h-4 text-indigo-600" />
          <span>Optimal Learning Modality</span>
        </div>
        <p className="text-xs text-indigo-950 font-medium leading-relaxed">
          {strategy.howTheyLearnBest || "Thrives in structured, problem-centric learning environments with direct practical projects, visual diagrams, and iterative feedback loops."}
        </p>
      </div>

      {strategy.recommendations && strategy.recommendations.length > 0 && (
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 print:break-inside-avoid space-y-3">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>High-Yield Study Formats</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {strategy.recommendations.map((rec, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-xs">
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PrintLearningStrategy;
