import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressRing({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  variant = 'indigo', // 'indigo' | 'emerald' | 'amber' | 'gradient'
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    indigo: '#4F46E5',
    emerald: '#10B981',
    amber: '#F59E0B',
    gradient: 'url(#gradient-ring)'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
        />
        {/* Animated fill circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colorMap[variant] || colorMap.indigo}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
          {percentage}
          <span className="text-xs font-semibold text-slate-400 ml-0.5">%</span>
        </span>
        {label && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-[10px] text-slate-400">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
