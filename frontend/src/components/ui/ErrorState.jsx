import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't process this request. Your data is safe; please try again.",
  onRetry,
  retryLabel = 'Try Again',
  className = ''
}) {
  return (
    <div className={`p-8 md:p-10 text-center rounded-2xl bg-white border border-rose-200/80 shadow-soft-sm flex flex-col items-center justify-center max-w-md mx-auto ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shadow-sm">
        <AlertCircle className="w-7 h-7 stroke-[1.75]" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <Button onClick={onRetry} icon={RotateCcw} variant="primary">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
