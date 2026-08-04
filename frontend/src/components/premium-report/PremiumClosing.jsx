import React from 'react';
import { Lightbulb, Compass } from 'lucide-react';

const PremiumClosing = ({ aiInsights, closingMessage }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto print:break-before-page">
      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Conclusion</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Final AI Insights</h3>
      </div>

      {aiInsights && aiInsights.length > 0 && (
        <div className="space-y-6 mb-16">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex gap-4 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <Lightbulb className="text-indigo-500 shrink-0" size={24} />
              <p className="text-indigo-900 font-medium leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      )}

      {closingMessage && (
        <div className="relative p-12 bg-gray-900 rounded-3xl text-center overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <Compass className="text-indigo-400 mx-auto mb-6 opacity-80" size={48} />
          <p className="relative z-10 text-xl md:text-2xl text-white font-medium leading-relaxed max-w-3xl mx-auto">
            "{closingMessage}"
          </p>
          <div className="mt-8 text-gray-400 text-sm font-bold tracking-widest uppercase">
            End of Report
          </div>
        </div>
      )}
    </section>
  );
};

export default PremiumClosing;
