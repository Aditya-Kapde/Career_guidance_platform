import React from 'react';
import { Sparkles } from 'lucide-react';

const AIInsights = ({ insights }) => {
  if (!insights || !insights.closingMessage) return null;

  return (
    <div className="bg-gray-900 rounded-2xl p-8 shadow-sm text-white mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-indigo-400" size={24} />
          <h2 className="text-2xl font-bold">AI Insights</h2>
        </div>
        
        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
          {insights.closingMessage}
        </p>
      </div>
    </div>
  );
};

export default AIInsights;
