import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Compass, BookOpen, Award, ArrowLeft, Play, Sparkles, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const modules = [
    {
      icon: Compass,
      title: "Interests & Passions",
      desc: "Identify what activities and industries excite you most.",
      status: "Ready",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Award,
      title: "Skills & Strengths",
      desc: "Evaluate your technical, soft, and analytical skills.",
      status: "Ready",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: BookOpen,
      title: "Work Style Preference",
      desc: "Find what working environment aligns with your lifestyle.",
      status: "Ready",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Dynamic Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white py-12 px-6 shadow-lg shadow-indigo-900/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <button 
              onClick={() => navigate('/')} 
              className="inline-flex items-center text-xs font-semibold text-indigo-200 hover:text-white transition-colors mb-4 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Onboarding
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2.5">
              Career Guide Dashboard <Sparkles className="w-7 h-7 text-indigo-400 animate-pulse" />
            </h1>
            <p className="text-indigo-200/80 text-sm md:text-base mt-2 max-w-xl">
              Complete your student profiling module. Our AI model will process your responses to recommend matching fields and pathways.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-900/60 p-2.5 rounded-xl border border-indigo-700/30">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-indigo-300">Model Provider</p>
              <p className="text-sm font-bold text-white">Groq AI (Llama 3)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Core Layout */}
      <main className="max-w-4xl mx-auto px-6 mt-8">
        {/* Prominent Action Call Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl-card p-8 shadow-xl shadow-slate-100 border border-slate-150 mb-8 relative overflow-hidden"
        >
          {/* Subtle colorful aura */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Core Assessment
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">
              Full AI Career Evaluation
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl text-sm md:text-base">
              Take the complete 15-question assessment. The report includes career matching rankings, key growth skills, and custom degree pathways.
            </p>
            <button
              onClick={() => navigate('/assessment')}
              className="mt-6 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Launch Assessment</span>
            </button>
          </div>
        </motion.div>

        {/* Modular Grid Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Assessment Breakdowns
        </h3>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {modules.map((mod, idx) => {
            const ModIcon = mod.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphism rounded-xl-card p-6 shadow-md hover:shadow-lg transition-all border border-slate-100 hover:border-slate-200 group"
              >
                <div className={`p-3 bg-gradient-to-br ${mod.color} rounded-xl text-white inline-flex mb-4 group-hover:scale-105 transition-transform`}>
                  <ModIcon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">{mod.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{mod.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                    {mod.status}
                  </span>
                  <button 
                    onClick={() => alert(`Starting component: ${mod.title}`)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Configure
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
