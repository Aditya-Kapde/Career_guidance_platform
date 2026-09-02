import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Zap, MapPin, GraduationCap, Users, DollarSign, BrainCircuit, Target, ShieldCheck, AlertCircle, TrendingUp } from 'lucide-react';

const CareerMatchAnalysis = ({ topCareers }) => {
  if (!topCareers || topCareers.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 1, y: 30 },
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
        <motion.div variants={cardVariants} className="flex items-center gap-4 mb-4">
          <span className="h-1.5 w-12 bg-purple-500 rounded-full"></span>
          <h2 className="text-sm font-black tracking-widest text-purple-500 uppercase">Chapter 03</h2>
        </motion.div>
        <motion.h3 variants={cardVariants} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Career Match Profiles</motion.h3>
        <motion.p variants={cardVariants} className="text-slate-500 mt-4 max-w-2xl text-xl font-light">
          In-depth structural analysis of your highest compatibility career pathways.
        </motion.p>
      </div>

      <div className="space-y-12">
        {topCareers.map((career, idx) => (
          <motion.div key={idx} variants={cardVariants} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:shadow-indigo-100 transition-all duration-500">
            {/* Career Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Target className="text-indigo-300" size={20} />
                  </div>
                  <p className="text-indigo-200 font-medium tracking-wide">{career.industries?.join(', ') || 'Various Industries'}</p>
                </div>
                <h4 className="text-4xl md:text-5xl font-black tracking-tight">{career.career}</h4>
              </div>
              
              <div className="relative z-10 flex flex-col items-start md:items-end bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 drop-shadow-sm">
                  {career.score}%
                </span>
                <span className="text-sm font-bold tracking-widest uppercase text-indigo-200/80 mt-2">Match Score</span>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="p-10">
              <div className="mb-12">
                <h5 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-4">
                  <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Zap size={20} /></span>
                  Strategic Fit Rationale
                </h5>
                <p className="text-xl text-slate-600 font-light leading-relaxed pl-14">{career.matchReason}</p>
              </div>

              <div className="mb-12">
                <div className="space-y-6">
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">Core Attributes</h5>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0"><BrainCircuit size={22}/></div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm tracking-wide">AI Disruption Risk & Impact</p>
                        <p className="text-slate-600 mt-1">{career.aiImpact}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0"><DollarSign size={22}/></div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm tracking-wide">Global Demand</p>
                        <p className="text-slate-600 mt-1">{career.globalDemand}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CareerMatchAnalysis;
