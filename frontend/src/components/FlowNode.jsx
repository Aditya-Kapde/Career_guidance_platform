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
  'entrance-exam': { icon: ClipboardCopy, bg: 'bg-blue-50 text-blue-600 border-blue-200' },
  exam: { icon: ClipboardCopy, bg: 'bg-blue-50 text-blue-600 border-blue-200' },
  college: { icon: School, bg: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  degree: { icon: Award, bg: 'bg-violet-50 text-violet-600 border-violet-200' },
  certification: { icon: FileCheck, bg: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  internship: { icon: Briefcase, bg: 'bg-orange-50 text-orange-600 border-orange-200' },
  job: { icon: UserCheck, bg: 'bg-rose-50 text-rose-600 border-rose-200' },
  promotion: { icon: TrendingUp, bg: 'bg-amber-50 text-amber-600 border-amber-200' },
  'gov-exam': { icon: ClipboardCopy, bg: 'bg-purple-50 text-purple-600 border-purple-200' },
  'higher-studies': { icon: BookOpen, bg: 'bg-teal-50 text-teal-600 border-teal-200' },
  specialization: { icon: FileBadge2, bg: 'bg-pink-50 text-pink-600 border-pink-200' }
};

export default function FlowNode({ data }) {
  const { label, type = 'education', status = 'future' } = data;
  const config = CATEGORY_CONFIG[type] || { icon: Compass, bg: 'bg-slate-50 text-slate-650 border-slate-200' };
  const IconComponent = config.icon;

  let cardClass = '';
  let badge = null;

  if (status === 'completed') {
    cardClass = 'bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-sm shadow-emerald-100/50';
    badge = (
      <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 border border-white shadow-sm flex items-center justify-center">
        <Check className="w-2.5 h-2.5 stroke-[4]" />
      </span>
    );
  } else if (status === 'current') {
    cardClass = 'bg-indigo-50/95 border-indigo-500 text-indigo-950 shadow-lg shadow-indigo-100 ring-2 ring-indigo-500/25 border-dashed scale-105 relative z-10';
    badge = (
      <span className="absolute -top-2.5 -right-2.5 bg-indigo-650 text-white rounded-full px-1.5 py-0.5 text-[8px] font-extrabold uppercase border border-white shadow-md tracking-widest animate-bounce">
        Current
      </span>
    );
  } else {
    // future
    cardClass = 'bg-white/80 border-slate-200/80 text-slate-550 shadow-sm';
  }

  return (
    <div className={`px-4 py-3.5 rounded-2xl border-2 font-bold text-xs min-w-[180px] max-w-[210px] flex items-center gap-3 backdrop-blur-md transition-all duration-350 hover:shadow-md hover:border-slate-350 ${cardClass}`}>
      {/* Target handle (input) on Top */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ 
          background: status === 'completed' ? '#10b981' : (status === 'current' ? '#4f46e5' : '#cbd5e1'), 
          width: 8, 
          height: 8,
          border: '1px solid white'
        }} 
      />

      {/* Category Icon */}
      <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}>
        <IconComponent className="w-4 h-4" />
      </div>

      {/* Label */}
      <div className="leading-snug pr-1 text-left font-extrabold">{label}</div>

      {badge}

      {/* Source handle (output) on Bottom */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ 
          background: status === 'completed' ? '#10b981' : (status === 'current' ? '#4f46e5' : '#cbd5e1'), 
          width: 8, 
          height: 8,
          border: '1px solid white'
        }} 
      />
    </div>
  );
}
