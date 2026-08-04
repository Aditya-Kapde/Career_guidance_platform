import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const DevelopmentAreasCard = ({ areas }) => {
  if (!areas || areas.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Areas for Development</h3>
      <ul className="space-y-3">
        {areas.map((a, i) => (
          <li key={i} className="flex items-start gap-3">
            <ArrowUpRight className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <span className="text-gray-700 leading-tight">{a.trait ? a.trait : a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevelopmentAreasCard;
