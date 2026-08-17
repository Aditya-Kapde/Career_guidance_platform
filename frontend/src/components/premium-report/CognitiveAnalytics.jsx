import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';

const CognitiveAnalytics = ({ iqScore }) => {
  if (iqScore === undefined || iqScore === null) return null;

  const maxScore = 10;
  const scorePercent = (iqScore / maxScore) * 100;
  
  let diagnosticTitle = "";
  let diagnosticFeedback = "";
  let colorClass = "";

  if (iqScore >= 8) {
    diagnosticTitle = "Exceptional Analytical Aptitude";
    diagnosticFeedback = "Demonstrates superior logical reasoning, pattern recognition, and quantitative problem-solving capabilities. Highly suited for complex, data-driven, or structural challenges.";
    colorClass = "text-emerald-600";
  } else if (iqScore >= 5) {
    diagnosticTitle = "Strong Problem Solving";
    diagnosticFeedback = "Shows solid foundational logic and spatial reasoning skills. Well-equipped for analytical tasks and standard cognitive problem-solving scenarios.";
    colorClass = "text-indigo-600";
  } else {
    diagnosticTitle = "Developing Cognitive Frameworks";
    diagnosticFeedback = "Currently building fundamental quantitative and spatial logic skills. Structured practice and guided analytical exercises will help strengthen these foundational competencies.";
    colorClass = "text-amber-600";
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          
          {/* Left Panel: Score Display */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 md:p-12 text-white flex flex-col items-center justify-center md:w-2/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain size={120} />
            </div>
            
            <h3 className="text-indigo-200 font-bold tracking-widest uppercase text-sm mb-6 z-10">
              Cognitive & IQ Analytics
            </h3>
            
            <div className="relative w-40 h-40 flex items-center justify-center z-10 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="8"
                />
                {/* Progress Ring */}
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="url(#gradient)" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 283" }}
                  animate={{ strokeDasharray: `${(scorePercent * 283) / 100}, 283` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold">{iqScore}</span>
                <span className="text-indigo-200 text-sm font-medium">out of {maxScore}</span>
              </div>
            </div>
            
            <div className="z-10 flex items-center gap-2 mt-2">
              <Zap className="text-amber-400 w-5 h-5" />
              <span className="font-semibold text-white">Score: {scorePercent}%</span>
            </div>
          </div>
          
          {/* Right Panel: Feedback */}
          <div className="p-8 md:p-12 flex flex-col justify-center md:w-3/5 bg-slate-50">
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              <Target size={16} /> Diagnostic Assessment
            </h4>
            <h2 className={`text-2xl font-bold mb-4 ${colorClass}`}>
              {diagnosticTitle}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {diagnosticFeedback}
            </p>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 italic">
                * Note: This cognitive score evaluates quantitative reasoning and spatial logic patterns derived from the objective aptitude section of your assessment.
              </p>
            </div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default CognitiveAnalytics;
