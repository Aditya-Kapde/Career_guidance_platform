import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EntranceExamsSection({
  entranceExams = [
    "JEE Main",
    "JEE Advanced",
    "GATE (for Postgraduate/PSUs)",
    "State-level Engineering Entrances"
  ]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        Key Entrance Examinations
      </h2>
      
      <div className="grid grid-cols-1 gap-3 relative z-10">
        {entranceExams.map((exam, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 2 }}
            className="p-3.5 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3 transition-colors"
          >
            <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg border border-indigo-100/50 shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-slate-700 font-extrabold text-xs md:text-sm leading-snug">{exam}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
