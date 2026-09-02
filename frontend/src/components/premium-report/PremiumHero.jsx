import React from 'react';
import { motion } from 'framer-motion';

const PremiumHero = ({ reportData }) => {
  return (
    <motion.section 
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-[75vh] flex flex-col justify-center py-24 px-6 sm:px-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 overflow-hidden shadow-2xl shadow-indigo-900/50 mb-12"
    >
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/30 blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/20 blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 1, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="h-1.5 w-16 bg-gradient-to-r from-indigo-400 to-fuchsia-400 rounded-full shadow-lg shadow-indigo-400/50"></span>
          <span className="text-sm font-black tracking-[0.2em] text-indigo-200 uppercase">Executive Career Blueprint</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-8"
        >
          Strategic <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300">
            Intelligence.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl text-indigo-100/80 font-light mb-16 max-w-2xl leading-relaxed"
        >
          Curated exclusively for <span className="font-semibold text-white">{reportData.student?.name || 'the Candidate'}</span> on <span className="font-semibold text-white">{new Date(reportData.generatedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          <div>
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Top Match</p>
            <p className="text-xl font-bold text-white truncate pr-2">{reportData.analytics?.overallProfileSummary?.highestCareerMatch || 'Pending Analysis'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Readiness</p>
            <p className="text-xl font-bold text-white flex items-baseline gap-1">
              {reportData.analytics?.careerReadiness?.score || 0}
              <span className="text-sm text-indigo-300 font-medium">/ 100</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Confidence</p>
            <p className="text-xl font-bold text-white flex items-baseline gap-1">
              {reportData.confidenceScore || 0}
              <span className="text-sm text-indigo-300 font-medium">%</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Report ID</p>
            <p className="text-sm font-mono text-indigo-100/70 mt-1.5 bg-black/20 inline-block px-2 py-1 rounded-md">CG-{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PremiumHero;
