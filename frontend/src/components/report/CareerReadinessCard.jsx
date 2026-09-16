import React from 'react';
import { TrendingUp, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import ProgressRing from '../ui/ProgressRing';
import Badge from '../ui/Badge';

export default function CareerReadinessCard({ readiness, confidence }) {
  if (!readiness) return null;

  const score = readiness.score || 75;
  const level = readiness.level || 'Strong';
  const description = readiness.description || 'Highly aligned with career requirements and growth benchmarks.';

  const getBadgeVariant = (s) => {
    if (s >= 80) return 'emerald';
    if (s >= 60) return 'indigo';
    if (s >= 40) return 'amber';
    return 'rose';
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-md neu-flat relative overflow-hidden">
      {/* Background soft aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Explanation Column */}
        <div className="md:col-span-8 space-y-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Primary Assessment Metric
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {score}
                <span className="text-xl sm:text-2xl font-bold text-slate-400 ml-1">/ 100</span>
              </h2>
              <Badge variant={getBadgeVariant(score)} size="md" dot>
                {level} Alignment
              </Badge>
            </div>
            <p className="text-lg font-bold text-slate-800">
              Overall Career Readiness Benchmark
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            {description}
          </p>

          {confidence && (
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Assessment Reliability: <strong className="text-slate-800">{confidence.level || 'High'} Confidence</strong> ({confidence.score || 88}% consistency)
              </span>
            </div>
          )}
        </div>

        {/* Right Circular Gauge */}
        <div className="md:col-span-4 flex items-center justify-center">
          <div className="p-4 bg-slate-50/70 rounded-3xl border border-slate-100/90 neu-inset shadow-inner">
            <ProgressRing
              value={score}
              size={150}
              strokeWidth={14}
              variant="gradient"
              label="Readiness"
              sublabel={`${level}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
