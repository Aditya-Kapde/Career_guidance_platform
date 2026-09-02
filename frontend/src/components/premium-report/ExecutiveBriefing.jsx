import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertTriangle, Lightbulb, Brain, Zap } from 'lucide-react';

const ExecutiveBriefing = ({ execData }) => {
  if (!execData) return null;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-12"
    >
      <div className="mb-16">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
          <span className="h-1.5 w-12 bg-indigo-500 rounded-full"></span>
          <h2 className="text-sm font-black tracking-widest text-indigo-500 uppercase">Chapter 01</h2>
        </motion.div>
        <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Executive Briefing</motion.h3>
      </div>

      <motion.div variants={itemVariants} className="mb-16 relative">
        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
        <p className="text-2xl md:text-3xl font-light text-slate-700 leading-snug">
          {execData.profileSummary}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-amber-100 transition-all duration-300">
            <h4 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-500"><Lightbulb size={24}/></div>
              Cognitive Style
            </h4>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Learning</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{execData.learningStyle || "Self-directed learning through hands-on experience."}</p>
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Communication</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{execData.communicationStyle || "Clear, direct, and focused on practical outcomes."}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 h-full">
          <motion.div variants={itemVariants} className="flex-1 w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl shadow-indigo-600/30 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
            <h4 className="flex items-center gap-3 text-sm font-black text-indigo-200 uppercase tracking-widest mb-6 relative z-10">
              <Zap size={18} className="text-yellow-400" /> Key Strength
            </h4>
            <p className="text-2xl font-light leading-snug relative z-10">{execData.biggestStrength}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1 w-full bg-white rounded-3xl p-8 shadow-xl shadow-rose-100 border border-rose-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-rose-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-all duration-500"></div>
            <h4 className="flex items-center gap-3 text-sm font-black text-rose-500 uppercase tracking-widest mb-6 relative z-10">
              <AlertTriangle size={18} /> Development Area
            </h4>
            <p className="text-xl font-medium text-slate-700 leading-snug relative z-10">{execData.biggestDevelopmentOpportunity}</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExecutiveBriefing;
