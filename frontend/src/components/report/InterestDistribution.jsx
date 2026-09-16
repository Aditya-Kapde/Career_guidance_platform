import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RESTRICTED_COLORS = [
  '#4F46E5', // Indigo
  '#6366F1', // Indigo light
  '#8B5CF6', // Purple
  '#0EA5E9', // Sky
  '#10B981', // Emerald
  '#F59E0B'  // Amber
];

export default function InterestDistribution({ interestDistribution = {} }) {
  if (!interestDistribution || Object.keys(interestDistribution).length === 0) return null;

  const data = Object.entries(interestDistribution)
    .filter(([, val]) => Number(val) > 0)
    .map(([key, val]) => ({
      name: key,
      value: Number(val)
    }));

  if (data.length === 0) return null;

  // Find top domain
  const topDomain = [...data].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat h-full flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
            Domain Alignment
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Interest Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Proportional breakdown of your interest affinity across industries.
          </p>
        </div>

        {/* Donut Chart */}
        <div className="w-full h-56 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={RESTRICTED_COLORS[index % RESTRICTED_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => [`${val}%`, 'Affinity']}
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Top Interest Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Primary
            </span>
            <span className="text-xs font-black text-slate-900 truncate max-w-[80px]">
              {topDomain?.name || 'General'}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Custom Legend */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        {data.slice(0, 4).map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: RESTRICTED_COLORS[idx % RESTRICTED_COLORS.length] }}
            />
            <span className="text-slate-600 truncate">{entry.name}:</span>
            <span className="font-bold text-slate-900 ml-auto">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
