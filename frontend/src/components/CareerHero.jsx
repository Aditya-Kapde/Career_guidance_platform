import React from 'react';
import { Compass, Sparkles, TrendingUp, Award, Layers, DollarSign, GraduationCap, Briefcase } from 'lucide-react';
import Badge from './ui/Badge';

export default function CareerHero({
  title = 'Career Roadmap',
  description,
  overview,
  compatibilityScore
}) {
  const isOverviewObject = overview && typeof overview === 'object';
  const overviewText = !isOverviewObject && typeof overview === 'string' ? overview : null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat relative overflow-hidden space-y-6">
      {/* Background soft aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="indigo" size="md" icon={Compass}>
              CAREER ROADMAP & MILESTONES
            </Badge>
            {compatibilityScore !== null && compatibilityScore !== undefined && (
              <Badge variant="emerald" size="md">
                {compatibilityScore}% Match
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>

          {description && typeof description === 'string' && (
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {compatibilityScore !== null && compatibilityScore !== undefined && (
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100/80 shrink-0 text-center min-w-[130px]">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
              Your Fit Score
            </span>
            <span className="text-3xl font-black text-indigo-900 font-mono">
              {compatibilityScore}%
            </span>
          </div>
        )}
      </div>

      {/* Structured Overview Card if overview is an object */}
      {isOverviewObject && (
        <div className="relative z-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Career Overview & Market Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {overview.degree && (
              <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> Required Education
                </span>
                <span className="font-bold text-slate-900 block leading-snug">
                  {overview.degree}
                </span>
              </div>
            )}

            {overview.futureDemand && (
              <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Future Demand
                </span>
                <span className="font-bold text-slate-900 block leading-snug">
                  {overview.futureDemand}
                </span>
              </div>
            )}

            {overview.workEnvironment && (
              <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-sky-500" /> Environment
                </span>
                <span className="font-bold text-slate-900 block leading-snug">
                  {overview.workEnvironment}
                </span>
              </div>
            )}

            {overview.salary && typeof overview.salary === 'object' && (
              <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" /> Compensation Range
                </span>
                <span className="font-bold text-slate-900 block leading-snug">
                  {overview.salary.entryLevel || '₹4 - 8 LPA'} (Entry) → {overview.salary.seniorLevel || '₹20+ LPA'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* String overview fallback */}
      {overviewText && (
        <div className="relative z-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Executive Overview</span>
          </div>
          <p>{overviewText}</p>
        </div>
      )}
    </div>
  );
}
