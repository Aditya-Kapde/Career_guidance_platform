import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Check, 
  GraduationCap, 
  ClipboardCopy, 
  School, 
  Award, 
  FileCheck, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  UserCheck, 
  Compass, 
  FileBadge2 
} from 'lucide-react';

const CATEGORY_CONFIG = {
  education: { icon: GraduationCap, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  'entrance-exam': { icon: ClipboardCopy, bg: 'bg-sky-50 text-sky-600 border-sky-200' },
  exam: { icon: ClipboardCopy, bg: 'bg-sky-50 text-sky-600 border-sky-200' },
  college: { icon: School, bg: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  degree: { icon: Award, bg: 'bg-violet-50 text-violet-600 border-violet-200' },
  certification: { icon: FileCheck, bg: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  internship: { icon: Briefcase, bg: 'bg-amber-50 text-amber-600 border-amber-200' },
  job: { icon: UserCheck, bg: 'bg-rose-50 text-rose-600 border-rose-200' },
  promotion: { icon: TrendingUp, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  'gov-exam': { icon: ClipboardCopy, bg: 'bg-purple-50 text-purple-600 border-purple-200' },
  'higher-studies': { icon: BookOpen, bg: 'bg-teal-50 text-teal-600 border-teal-200' },
  specialization: { icon: FileBadge2, bg: 'bg-pink-50 text-pink-600 border-pink-200' }
};

export default function FlowNode({ data }) {
  const { label, type = 'education', status = 'future', stream } = data;
  const config = CATEGORY_CONFIG[type] || { icon: Compass, bg: 'bg-slate-50 text-slate-600 border-slate-200' };
  const IconComponent = config.icon;

  let cardClass = 'bg-white border-slate-200/90 text-slate-800 shadow-soft-sm hover:shadow-soft-md';
  let badge = null;

  if (status === 'completed') {
    cardClass = 'bg-emerald-50/90 border-emerald-400/80 text-emerald-950 shadow-soft-sm';
    badge = (
      <span className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-xs">
        <Check className="w-3 h-3 stroke-[3]" />
      </span>
    );
  } else if (status === 'current') {
    cardClass = 'bg-indigo-50/95 border-indigo-600 text-indigo-950 shadow-soft-md ring-3 ring-indigo-500/20';
    badge = (
      <span className="absolute -top-3 -right-3 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border-2 border-white shadow-sm animate-pulse">
        Current
      </span>
    );
  }

  const showStreamTag = stream && stream !== 'Core';

  return (
    <div className={`w-[230px] p-3.5 rounded-2xl border transition-all relative ${cardClass}`}>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: status === 'completed' ? '#10B981' : status === 'current' ? '#4F46E5' : '#94A3B8',
          width: 8,
          height: 8,
          border: '2px solid white'
        }}
      />

      {/* Optional Stream Tag Header */}
      {showStreamTag && (
        <div className="mb-2">
          <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
            {stream}
          </span>
        </div>
      )}

      <div className="flex items-start gap-2.5">
        <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}>
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-bold leading-snug break-words">
            {label}
          </div>
        </div>
      </div>

      {badge}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: status === 'completed' ? '#10B981' : status === 'current' ? '#4F46E5' : '#94A3B8',
          width: 8,
          height: 8,
          border: '2px solid white'
        }}
      />
    </div>
  );
}
