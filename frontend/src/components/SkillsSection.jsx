import React from 'react';
import { Award, Zap } from 'lucide-react';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';

export default function SkillsSection({ skills = [] }) {
  if (!skills || skills.length === 0) return null;

  const getLevelValue = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 95;
      case 'advanced': return 80;
      case 'intermediate': return 65;
      default: return 50;
    }
  };

  const getBadgeVariant = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'emerald';
      case 'advanced': return 'indigo';
      case 'intermediate': return 'amber';
      default: return 'slate';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm neu-flat space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <Award className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Required Competencies
        </h3>
      </div>

      <div className="space-y-3.5 pt-1">
        {skills.map((skill, idx) => {
          const val = getLevelValue(skill.level);
          const badgeVar = getBadgeVariant(skill.level);

          return (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-indigo-600" />
                  {skill.name}
                </span>
                <Badge variant={badgeVar} size="sm">
                  {skill.level || 'Standard'}
                </Badge>
              </div>

              <ProgressBar value={val} variant={badgeVar === 'emerald' ? 'emerald' : 'indigo'} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
