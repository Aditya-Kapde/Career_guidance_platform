import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { ZoomIn, ZoomOut, Maximize, Lock, Unlock } from 'lucide-react';

export default function FlowControls({ isInteractive, onToggleInteractive }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="flex items-center gap-1 bg-white/95 p-1 rounded-xl border border-slate-100 shadow-md backdrop-blur-md relative z-10">
      <button
        type="button"
        onClick={() => zoomIn()}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-650 hover:text-indigo-650 transition-colors cursor-pointer"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => zoomOut()}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-650 hover:text-indigo-650 transition-colors cursor-pointer"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => fitView({ duration: 400 })}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-650 hover:text-indigo-650 transition-colors cursor-pointer"
        title="Fit View"
      >
        <Maximize className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-slate-200 mx-1" />
      <button
        type="button"
        onClick={onToggleInteractive}
        className={`p-2 rounded-lg transition-colors cursor-pointer ${
          isInteractive 
            ? 'hover:bg-slate-100 text-slate-600 hover:text-indigo-600' 
            : 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm'
        }`}
        title={isInteractive ? "Click to Lock Canvas Pan/Zoom" : "Click to Unlock Canvas Pan/Zoom"}
      >
        {isInteractive ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      </button>
    </div>
  );
}
