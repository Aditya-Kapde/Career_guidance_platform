import React, { useState } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { BrainCircuit, Sparkles, TrendingUp, Compass, Award, Layers } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

const BASELINE_15_TRAITS = {
  logicalThinking: 75,
  problemSolving: 80,
  creativity: 85,
  leadership: 70,
  communication: 78,
  curiosity: 88,
  teamwork: 74,
  decisionMaking: 76,
  adaptability: 82,
  planning: 72,
  attentionToDetail: 79,
  riskTaking: 68,
  analyticalThinking: 84,
  empathy: 75,
  learningStyle: 80
};

export default function TraitRadar({ traitScores = {} }) {
  // Use provided traitScores or merge with standard 15-trait benchmark
  const effectiveScores = (traitScores && Object.keys(traitScores).length >= 5)
    ? traitScores
    : { ...BASELINE_15_TRAITS, ...(traitScores || {}) };

  const rawEntries = Object.entries(effectiveScores);
  const maxRawScore = Math.max(...rawEntries.map(([, v]) => Number(v) || 0), 1);

  // Normalize scores so they render across the full radar radius (0-100%)
  const data = rawEntries.map(([key, value]) => {
    const rawVal = Number(value) || 0;
    // Normalize to 0-100 scale based on relative strength
    const normalized = Math.min(100, Math.max(15, Math.round((rawVal / maxRawScore) * 85 + (rawVal > 0 ? 15 : 0))));
    
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/_/g, ' ');

    return {
      subject: label,
      rawScore: rawVal,
      score: normalized,
      fullMark: 100
    };
  });

  // Extract top 4 dominant traits
  const topTraits = [...data]
    .sort((a, b) => b.rawScore - a.rawScore)
    .slice(0, 4);

  // Categorized dimensions for elaborative right panel
  const categories = [
    {
      name: 'Cognitive & Analytical',
      icon: BrainCircuit,
      traits: data.filter(d => ['Logical Thinking', 'Problem Solving', 'Analytical Thinking', 'Decision Making'].includes(d.subject))
    },
    {
      name: 'Interpersonal & Communication',
      icon: Award,
      traits: data.filter(d => ['Communication', 'Teamwork', 'Leadership', 'Empathy'].includes(d.subject))
    },
    {
      name: 'Methodological & Execution',
      icon: Layers,
      traits: data.filter(d => ['Planning', 'Attention To Detail', 'Adaptability', 'Learning Style'].includes(d.subject))
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm" icon={BrainCircuit}>
              PSYCHOMETRIC MATRIX
            </Badge>
            <span className="text-xs font-semibold text-slate-400">
              15 Dimension Assessment
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Comprehensive Trait Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Multi-axial psychometric evaluation mapping your cognitive inclinations, behavioral archetypes, and task execution styles.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs font-bold text-indigo-900 shrink-0 self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Normalized Aptitude Scale</span>
        </div>
      </div>

      {/* Main Elaborative Grid (Radar + Detailed Dimensions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Large Stunning Radar Chart */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-3xl border border-slate-100 relative neu-inset">
          <div className="w-full h-80 sm:h-96 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <defs>
                  <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.2} />
                  </radialGradient>
                </defs>
                <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={false} 
                  axisLine={false} 
                />
                <Radar
                  name="Trait Aptitude"
                  dataKey="score"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#radarFill)"
                  fillOpacity={0.8}
                />
                <Tooltip
                  formatter={(val, name, item) => [`${item.payload.score}% (Raw: ${item.payload.rawScore})`, 'Aptitude Level']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <span className="text-[11px] text-slate-400 font-medium mt-2 text-center">
            * Chart automatically normalized across core dimensions for clear spatial comparison.
          </span>
        </div>

        {/* Right Column: Categorized Trait Meters & Dominance Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Dominant Trait Index
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {topTraits.map((t, idx) => (
                <div key={idx} className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 truncate">{t.subject}</span>
                    <span className="font-mono text-indigo-700 font-black">{t.score}%</span>
                  </div>
                  <ProgressBar value={t.score} variant="gradient" size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Deep Dive */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {categories.map((cat, cIdx) => {
              const Icon = cat.icon;
              if (cat.traits.length === 0) return null;

              return (
                <div key={cIdx} className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Icon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{cat.name}</span>
                  </div>
                  <div className="space-y-2 pl-5 border-l-2 border-slate-100">
                    {cat.traits.slice(0, 2).map((tr, tIdx) => (
                      <div key={tIdx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                          <span>{tr.subject}</span>
                          <span className="font-mono text-slate-800">{tr.score}%</span>
                        </div>
                        <ProgressBar value={tr.score} variant="indigo" size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
