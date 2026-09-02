import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Compass, RefreshCw, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export default function Results() {
  const navigate = useNavigate();
  const { resetAssessment, educationLevel, assessmentReport } = useAssessment();

  const report = assessmentReport?.report || assessmentReport;

  useEffect(() => {
    if (assessmentReport) {
      console.log("[Development Mode] Received API Response:", assessmentReport);
    }
  }, [assessmentReport]);

  useEffect(() => {
    if (!assessmentReport) {
      navigate('/');
    }
  }, [assessmentReport, navigate]);

  if (!assessmentReport || !report) {
    return null;
  }

  const handleRestart = () => {
    resetAssessment();
    navigate('/');
  };

  // Safe mapping of nested JSON data from Groq output
  const summary = report.executiveSummary?.profileSummary;
  const topCareers = report.topCareers || [];
  const strengths = report.swot?.strengths || [];
  const skillsToDevelop = report.swot?.weaknesses || report.skillGapAnalysis?.map(s => s.skill) || [];
  const studyTips = report.learningStrategy?.recommendations || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <header className="text-center mb-16 relative">
          <motion.div variants={itemVariants} className="inline-flex p-4 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 mb-6 border border-indigo-50">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Your Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">is Ready</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-slate-500 font-light max-w-2xl mx-auto">
            Based on your preference profile for the <span className="font-bold text-indigo-500 uppercase">{educationLevel?.replace('-', ' ') || 'Undergraduate'}</span> level.
          </motion.p>
        </header>

        {/* Profile Summary Card */}
        {summary && (
          <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-all duration-700"></div>
            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                Profile Overview
              </span>
              <p className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed max-w-4xl mx-auto">
                {summary}
              </p>
            </div>
          </motion.div>
        )}

        {/* Career Recommendations Section */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-1.5 w-12 bg-indigo-500 rounded-full"></span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="text-indigo-500" size={28}/> Recommended Pathways
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topCareers.length > 0 ? (
              topCareers.map((career, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <h3 className="font-black text-slate-900 text-2xl tracking-tight group-hover:text-indigo-600 transition-colors">
                        {career.career}
                      </h3>
                      <span className="shrink-0 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-black tracking-widest uppercase border border-indigo-100">
                        {career.score}% Match
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium mb-8">
                      {career.matchReason || "No detailed suitability analysis available for this career."}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Actionable Pathway</span>
                    <button
                      onClick={() => navigate(`/career/${career.id || career.career.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl"
                    >
                      <span>Explore Route</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-slate-100 text-slate-500 font-medium">
                No career recommendations available.
              </div>
            )}
          </div>
        </motion.section>

        {/* Analysis Grid (Strengths & Improvements & Tips) */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Strengths Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500"><CheckCircle size={20}/></div>
              Core Strengths
            </h3>
            <ul className="space-y-4">
              {strengths.length > 0 ? (
                strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-emerald-500 mt-1 font-bold">+</span>
                    <span className="leading-relaxed font-medium">{strength}</span>
                  </li>
                ))
              ) : (
                <p className="text-slate-500 italic">No strengths available.</p>
              )}
            </ul>
          </div>

          {/* Areas of Improvement */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500"><AlertTriangle size={20}/></div>
              Skills to Develop
            </h3>
            <ul className="space-y-4">
              {skillsToDevelop.length > 0 ? (
                skillsToDevelop.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-rose-500 mt-1 font-bold">-</span>
                    <span className="leading-relaxed font-medium">{skill}</span>
                  </li>
                ))
              ) : (
                <p className="text-slate-500 italic">No skills to develop available.</p>
              )}
            </ul>
          </div>

          {/* Study Tips */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl shadow-indigo-600/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 relative z-10">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md text-white"><BookOpen size={20}/></div>
              Academic Tips
            </h3>
            <ul className="space-y-4 relative z-10">
              {studyTips.length > 0 ? (
                studyTips.slice(0, 4).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-indigo-100">
                    <span className="text-yellow-400 mt-1 font-bold">★</span>
                    <span className="leading-relaxed font-medium">{tip}</span>
                  </li>
                ))
              ) : (
                <p className="text-indigo-200 italic">No study tips available.</p>
              )}
            </ul>
          </div>
        </motion.section>

        {/* Action Footer */}
        <motion.footer variants={itemVariants} className="text-center flex flex-col sm:flex-row items-center justify-center gap-6 pb-12">
          <button
            onClick={() => navigate('/report')}
            className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl shadow-slate-900/20 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <Award className="w-6 h-6 text-yellow-400" />
            <span>View Full Premium Report</span>
          </button>
          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-3 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-lg font-bold py-4 px-10 rounded-2xl shadow-sm transition-all transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Restart Assessment</span>
          </button>
        </motion.footer>
      </motion.div>
    </div>
  );
}
