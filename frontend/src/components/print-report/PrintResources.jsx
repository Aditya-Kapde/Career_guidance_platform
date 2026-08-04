import React from 'react';
import { Book, PlaySquare, GraduationCap } from 'lucide-react';

const PremiumResources = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  const getIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('book')) return <Book className="text-amber-500" size={24} />;
    if (t.includes('youtube') || t.includes('video')) return <PlaySquare className="text-red-500" size={24} />;
    return <GraduationCap className="text-indigo-500" size={24} />;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 10</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Curated Resource Library</h3>
        <p className="text-gray-500 mt-4 text-lg">Hand-picked resources to accelerate your skill acquisition.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, i) => (
          <div key={i} className="flex gap-4 bg-white border border-gray-200 p-6 rounded-2xl print:break-inside-avoid">
            <div className="shrink-0 p-3 bg-gray-50 rounded-xl border border-gray-100 h-fit">
              {getIcon(res.type)}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{res.type}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{res.name}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{res.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumResources;
