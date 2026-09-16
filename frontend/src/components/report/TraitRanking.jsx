import React from 'react';
import ProgressBar from '../ui/ProgressBar';

export default function TraitRanking({ traitRanking = [], dominantTraits = [] }) {
  // If traitRanking is not directly supplied, format from dominant/raw
  const items = (traitRanking.length > 0 ? traitRanking : dominantTraits).slice(0, 8);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat h-full flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
            Aptitude Hierarchy
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Trait Ranking
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Ordered comparison of your evaluated cognitive and behavioral strengths.
          </p>
        </div>

        {/* Ranked Rows List */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const name = (item.trait || item.name || '')
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (s) => s.toUpperCase());
            const score = item.score || 0;
            const rankStr = String(idx + 1).padStart(2, '0');

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-400 text-[11px]">
                      {rankStr}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {name}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-indigo-600">
                    {score}
                  </span>
                </div>

                <ProgressBar
                  value={score}
                  variant={idx < 3 ? 'gradient' : 'indigo'}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Evaluated Scale: 0 - 100</span>
        <span className="font-semibold text-indigo-600">Top Quartile Indexed</span>
      </div>
    </div>
  );
}
