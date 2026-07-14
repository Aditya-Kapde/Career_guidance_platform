import React from 'react';

export default function FlowLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white/90 p-4 rounded-xl border border-slate-100 backdrop-blur-md text-xs font-bold shadow-sm z-10 relative">
      <div className="flex items-center gap-2">
        <div className="w-3.5 h-3.5 rounded-lg bg-emerald-50 border border-emerald-350 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
        <span className="text-slate-600">Completed Step</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3.5 h-3.5 rounded-lg bg-indigo-50 border border-indigo-500 flex items-center justify-center animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-650" />
        </div>
        <span className="text-indigo-950 font-black">Current Position</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3.5 h-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-450" />
        </div>
        <span className="text-slate-500">Future Step</span>
      </div>
    </div>
  );
}
