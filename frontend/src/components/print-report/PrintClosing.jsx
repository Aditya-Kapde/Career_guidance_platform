import React from 'react';
import { Lightbulb, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

const PrintClosing = ({ aiInsights, closingMessage }) => {
  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-12 bg-white print:break-before-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Final Synthesis
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Strategic Career Intelligence Takeaways
        </h2>
      </div>

      {aiInsights && aiInsights.length > 0 && (
        <div className="space-y-3 mb-8">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100/90 print:break-inside-avoid">
              <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-950 font-medium leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      )}

      {closingMessage && (
        <div className="p-8 bg-slate-900 text-white rounded-3xl text-center print:break-inside-avoid relative overflow-hidden mb-8">
          <Compass className="w-8 h-8 text-indigo-400 mx-auto mb-4 opacity-90" />
          <blockquote className="text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto italic text-slate-100">
            "{closingMessage}"
          </blockquote>
        </div>
      )}

      {/* Official Verification Sign-off */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>PathFinder AI • Autonomous Cognitive & Psychometric Profiling System</span>
        </div>
        <div className="font-mono text-[10px]">
          END OF DOCUMENT
        </div>
      </div>
    </section>
  );
};

export default PrintClosing;
