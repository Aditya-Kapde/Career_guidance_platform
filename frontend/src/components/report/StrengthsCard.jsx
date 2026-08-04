import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const StrengthsCard = ({ strengths }) => {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Core Strengths</h3>
      <ul className="space-y-3">
        {strengths.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <span className="text-gray-700 leading-tight">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrengthsCard;
