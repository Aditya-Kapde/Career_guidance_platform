import React from 'react';
import { Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ToolsSection({
  tools = [
    "AutoCAD",
    "Revit",
    "STAAD.Pro",
    "ArcGIS",
    "Primavera P6",
    "MATLAB"
  ]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/30 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
        <Wrench className="w-5 h-5 text-indigo-600" />
        Industry Tools & Software
      </h2>
      
      <div className="flex flex-wrap gap-2.5 relative z-10">
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-3.5 py-2 bg-slate-50/70 hover:bg-gradient-to-tr hover:from-indigo-50 hover:to-purple-50 border border-slate-100 hover:border-indigo-150 text-slate-700 hover:text-indigo-700 rounded-xl font-bold text-xs md:text-sm shadow-sm cursor-pointer transition-all flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
            {tool}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
