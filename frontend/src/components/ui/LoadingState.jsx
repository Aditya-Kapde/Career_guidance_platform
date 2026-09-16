import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingState({
  message = 'Loading data...',
  description = 'Please wait while we retrieve your career insights.',
  className = ''
}) {
  return (
    <div className={`p-12 text-center flex flex-col items-center justify-center max-w-sm mx-auto ${className}`}>
      <div className="relative w-16 h-16 mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-full h-full rounded-full border-3 border-indigo-100 border-t-indigo-600 shadow-sm"
        />
        <div className="absolute inset-2 rounded-full bg-indigo-50/50 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-800 mb-1">
        {message}
      </h3>
      {description && (
        <p className="text-xs text-slate-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
