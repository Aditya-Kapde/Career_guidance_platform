import React from 'react';
import { Target, TrendingUp, Clock, Award, CheckCircle2, AlertTriangle, Zap, Layers } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function PremiumSkillGap({ skillGapAnalysis = [] }) {
  if (!skillGapAnalysis || skillGapAnalysis.length === 0) return null;

  const getPriorityBadgeVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'rose';
      case 'medium': return 'amber';
      default: return 'emerald';
    }
  };

  const getProgressPercentage = (targetLevel) => {
    switch (targetLevel?.toLowerCase()) {
      case 'expert':
      case 'master': return 95;
      case 'proficient':
      case 'advanced': return 80;
      case 'competent':
      case 'intermediate': return 65;
      default: return 50;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm" icon={Target}>
              COMPETENCY GAP ANALYSIS
            </Badge>
            <span className="text-xs font-semibold text-slate-400">
              Targeted Career Readiness Baseline
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Detailed benchmarking of target competencies required for your matched career pathways against your current aptitude baseline.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center min-w-[100px]">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Identified Gaps</span>
            <span className="text-xl font-black text-slate-900 font-mono">{skillGapAnalysis.length}</span>
          </div>
        </div>
      </div>

      {/* Structured Competency Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGapAnalysis.map((gap, idx) => {
          const priority = gap.priority || 'Medium';
          const targetLevel = gap.targetLevel || 'Proficient';
          const difficulty = gap.difficulty || 'Medium';
          const estTime = gap.estimatedTime || gap.estTime || '3 - 6 months';
          const progress = getProgressPercentage(targetLevel);
          const badgeVar = getPriorityBadgeVariant(priority);

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all shadow-soft-sm flex flex-col justify-between space-y-4 neu-flat group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    {gap.skill}
                  </h4>
                  <Badge variant={badgeVar} size="sm" dot>
                    {priority} Priority
                  </Badge>
                </div>

                {/* Target vs Baseline Meter */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span className="text-slate-400">Target Standard:</span>
                    <strong className="text-slate-900 font-bold">{targetLevel}</strong>
                  </div>
                  <ProgressBar
                    value={progress}
                    variant={badgeVar === 'rose' ? 'amber' : 'gradient'}
                    size="sm"
                  />
                </div>

                {/* Metadata badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2 bg-white rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Difficulty</span>
                    <span className="font-bold text-slate-800">{difficulty}</span>
                  </div>

                  <div className="p-2 bg-white rounded-xl border border-slate-200/60">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> Est. Time
                    </span>
                    <span className="font-bold text-slate-800">{estTime}</span>
                  </div>
                </div>
              </div>

              {/* Actionable growth note */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <Zap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Recommended focus for upcoming academic term.</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
