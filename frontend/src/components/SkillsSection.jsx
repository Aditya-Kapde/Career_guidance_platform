import React from 'react';
import { Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SkillsSection({
  skills = [
    { name: "Structural Analysis & Design", level: "Expert" },
    { name: "Geotechnical & Soil Mechanics", level: "Advanced" },
    { name: "Project Estimation & Budgeting", level: "Advanced" },
    { name: "Land Surveying & GIS Mapping", level: "Advanced" }
  ]
}) {
  const getProgressWidth = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'w-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-sm shadow-emerald-500/20';
      case 'advanced': return 'w-4/5 bg-gradient-to-r from-indigo-400 to-purple-500 shadow-sm shadow-indigo-500/20';
      case 'intermediate': return 'w-3/5 bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm shadow-amber-500/20';
      default: return 'w-2/5 bg-slate-400';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/30 rounded-full blur-2xl pointer-events-none" />
      
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
        <Award className="w-5 h-5 text-indigo-600" />
        Core Competencies & Skills
      </h2>
      
      <div className="space-y-5 relative z-10">
        {skills.map((skill, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 2 }}
            className="flex flex-col p-3.5 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors"
          >
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-500" />
                {skill.name}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold border ${
                skill.level?.toLowerCase() === 'expert' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : skill.level?.toLowerCase() === 'advanced'
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                  : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>{skill.level}</span>
            </div>
            <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${getProgressWidth(skill.level)}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
