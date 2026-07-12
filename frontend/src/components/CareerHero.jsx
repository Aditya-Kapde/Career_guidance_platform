import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const CareerIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Compass;
  return <IconComponent className={className} />;
};

export default function CareerHero({ 
  title = "Civil Engineer", 
  icon = "HardHat", 
  description = "Directs public sector infrastructure construction, including bridge foundations, highway maps, and structural safety grids.", 
  overview = {
    salary: {
      entryLevel: "₹3.5 LPA - ₹5 LPA",
      midLevel: "₹6 LPA - ₹12 LPA",
      seniorLevel: "₹15 LPA - ₹25 LPA+",
      currency: "INR"
    },
    growth: "Moderate",
    degree: "Bachelor's Degree in Civil Engineering (B.E. / B.Tech)",
    workEnvironment: "Hybrid (Split between office design work and active construction site supervision)",
    careerType: "STEM / Engineering",
    difficulty: "High",
    futureDemand: "High"
  },
  compatibilityScore
}) {
  const stats = [
    {
      label: "AI Compatibility",
      value: compatibilityScore ? `${compatibilityScore}% Match` : "Not Assessed",
      icon: "Cpu",
      bg: "bg-indigo-50 text-indigo-600 border-indigo-100/50"
    },
    {
      label: "Average Salary (LPA)",
      value: overview.salary ? `${overview.salary.entryLevel} - ${overview.salary.seniorLevel}` : "₹3.5 - ₹25 LPA+",
      icon: "Coins",
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100/50"
    },
    {
      label: "Future Demand",
      value: overview.futureDemand || "High",
      icon: "Sparkles",
      bg: "bg-blue-50 text-blue-600 border-blue-100/50"
    },
    {
      label: "Route Difficulty",
      value: overview.difficulty || "High",
      icon: "Flame",
      bg: "bg-orange-50 text-orange-600 border-orange-100/50"
    },
    {
      label: "Required Degree",
      value: overview.degree || "Bachelor's Degree",
      icon: "GraduationCap",
      bg: "bg-sky-50 text-sky-600 border-sky-100/50"
    },
    {
      label: "Work Environment",
      value: overview.workEnvironment || "Hybrid / Office",
      icon: "Building",
      bg: "bg-violet-50 text-violet-600 border-violet-100/50"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism rounded-[24px] p-6 md:p-8 shadow-xl border border-white relative overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 relative z-10">
        <div className="p-4 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20 shrink-0">
          <CareerIcon name={icon} className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <div className="text-center md:text-left flex-1">
          <span className="bg-indigo-50 text-indigo-600 px-3.5 py-1 rounded-full text-xs font-extrabold border border-indigo-100/50 uppercase tracking-widest mb-2.5 inline-block">
            {overview.careerType || "Professional Stream"}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-white/70 hover:bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3.5"
          >
            <div className={`p-2.5 rounded-xl border ${stat.bg}`}>
              <CareerIcon name={stat.icon} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                {stat.label}
              </span>
              <span className="text-slate-800 text-xs md:text-sm font-extrabold leading-snug">
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
