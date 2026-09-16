import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({
  value = 0, // 0 - 100
  max = 100,
  label,
  showValue = false,
  variant = 'indigo', // 'indigo' | 'emerald' | 'amber' | 'purple' | 'gradient'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const fillStyles = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-600',
    gradient: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600'
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-slate-800">{percentage}%</span>}
        </div>
      )}

      <div className={`w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/60 ${sizeStyles[size] || sizeStyles.md}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${fillStyles[variant] || fillStyles.indigo}`}
        />
      </div>
    </div>
  );
}
