import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function CareerCompatibility({ topCareers = [] }) {
  const navigate = useNavigate();

  if (!topCareers || topCareers.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
            Top Compatibility Results
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Recommended Career Pathways
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deterministic rankings calculated from your personality matrix and cognitive aptitude.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topCareers.map((careerItem, idx) => {
          const name = careerItem.career || careerItem.title || 'Career Path';
          const score = careerItem.score || 85;
          const reason = careerItem.reason || careerItem.matchReason || 'Strong alignment with your core trait combination and problem-solving style.';
          const careerId = careerItem.id || name.toLowerCase().replace(/\s+/g, '-');
          const isTopMatch = idx === 0;

          return (
            <div
              key={idx}
              className={`
                bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between neu-flat hover:shadow-soft-lg group
                ${isTopMatch ? 'border-indigo-200/90 ring-1 ring-indigo-500/20' : 'border-slate-200/80'}
              `}
            >
              <div className="space-y-4">
                {/* Header with Title & Match % */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {isTopMatch && (
                      <Badge variant="indigo" size="sm" icon={Sparkles} className="mb-2">
                        Primary Match
                      </Badge>
                    )}
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">
                      {score}%
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">
                      Match Fit
                    </span>
                  </div>
                </div>

                {/* Progress Bar Gauge */}
                <ProgressBar
                  value={score}
                  variant={score >= 90 ? 'gradient' : score >= 80 ? 'indigo' : 'emerald'}
                  size="sm"
                />

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {reason}
                </p>

                {/* Industries or Skills chips if available */}
                {careerItem.industries && careerItem.industries.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {careerItem.industries.slice(0, 3).map((ind, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {ind}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  Detailed Growth Map
                </span>

                <Button
                  variant="soft"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate(`/career/${careerId}`)}
                  className="font-bold text-xs"
                >
                  Explore Roadmap
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
