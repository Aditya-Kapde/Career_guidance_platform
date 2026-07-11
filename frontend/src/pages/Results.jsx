import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Compass, RefreshCw, Star, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export default function Results() {
  const navigate = useNavigate();
  const { resetAssessment, educationLevel, assessmentReport } = useAssessment();

  // Dynamically resolve response structure (works for both Groq success and local fallback keys)
  const report = assessmentReport?.report || assessmentReport;

  useEffect(() => {
    // Log the API response in development mode to check data bindings
    if (assessmentReport) {
      console.log("[Development Mode] Received API Response:", assessmentReport);
    }
  }, [assessmentReport]);

  useEffect(() => {
    // If the report does not exist, redirect back to onboarding
    if (!assessmentReport) {
      navigate('/');
    }
  }, [assessmentReport, navigate]);

  if (!assessmentReport || !report) {
    return null; // Prevent layout flash during redirect
  }

  const handleRestart = () => {
    resetAssessment();
    navigate('/');
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <header className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-3 bg-emerald-50 rounded-full text-emerald-600 mb-4 border border-emerald-100"
        >
          <ShieldCheck className="w-8 h-8" />
        </motion.div>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight"
        >
          Your AI Career Report
        </motion.h1>
        <p className="text-slate-500 text-sm md:text-base mt-2">
          Assessment analysis based on your preference profile for{' '}
          <span className="font-semibold text-indigo-600 uppercase">
            {educationLevel?.replace('-', ' ') || 'Undergraduate'}
          </span>{' '}
          level.
        </p>
      </header>

      {/* Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glassmorphism rounded-xl-card p-6 md:p-8 shadow-xl shadow-indigo-55/20 border border-white mb-10 max-w-2xl mx-auto"
      >
        <span className="font-extrabold text-indigo-600 block mb-2 text-xs uppercase tracking-widest text-center">
          Profile Evaluation Summary
        </span>
        <p className="text-slate-700 leading-relaxed text-sm md:text-base text-center">
          {report.summary || "No summary available."}
        </p>
      </motion.div>

      {/* Career Recommendations Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-600" />
          Recommended Pathways
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {report.topCareers && report.topCareers.length > 0 ? (
            report.topCareers.map((career, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glassmorphism rounded-xl-card p-6 shadow-md border border-slate-100 hover:border-indigo-100 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                      {career.career}
                    </h3>
                    <span className="shrink-0 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-bold border border-indigo-100/50">
                      {career.score}% Match
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {career.reason || "No detailed suitability analysis available for this career."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Recommended Pathway</span>
                  <button
                    onClick={() => alert(`View details for: ${career.career}`)}
                    className="text-xs font-bold text-indigo-655 hover:text-indigo-800 transition-colors flex items-center space-x-1"
                  >
                    <span>Explore Route</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-slate-500 glassmorphism rounded-xl-card">
              No career recommendations available.
            </div>
          )}
        </div>
      </section>

      {/* Analysis Grid (Strengths & Improvements) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Strengths Card */}
        <div className="bg-white rounded-xl-card p-6 shadow-md border border-slate-150">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Core Strengths
          </h3>
          <ul className="space-y-3">
            {report.strengths && report.strengths.length > 0 ? (
              report.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                  <span className="text-emerald-500 mr-2.5 font-bold">•</span>
                  <span className="leading-relaxed">{strength}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-slate-500">No strengths available.</p>
            )}
          </ul>
        </div>

        {/* Areas of Improvement */}
        <div className="bg-white rounded-xl-card p-6 shadow-md border border-slate-150">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Skills to Develop
          </h3>
          <ul className="space-y-3">
            {report.skillsToDevelop && report.skillsToDevelop.length > 0 ? (
              report.skillsToDevelop.map((skill, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                  <span className="text-amber-500 mr-2.5 font-bold">•</span>
                  <span className="leading-relaxed">{skill}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-slate-500">No skills to develop available.</p>
            )}
          </ul>
        </div>
      </section>

      {/* Personalized Study Tips Section */}
      <section className="bg-white rounded-xl-card p-6 shadow-md border border-slate-150 mb-12">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Academic & Study Tips
        </h3>
        <ul className="space-y-3">
          {report.studyTips && report.studyTips.length > 0 ? (
            report.studyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-600">
                <span className="text-indigo-500 mr-2.5 font-bold">{idx + 1}.</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))
          ) : (
            <p className="text-sm text-slate-500">No study tips available.</p>
          )}
        </ul>
      </section>

      {/* Closing Quote */}
      {report.closingMessage ? (
        <p className="text-center italic text-slate-500 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          "{report.closingMessage}"
        </p>
      ) : (
        <p className="text-center italic text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Keep pushing forward toward your dreams!
        </p>
      )}

      {/* Action Footer */}
      <footer className="text-center pt-4">
        <button
          onClick={handleRestart}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Restart Assessment</span>
        </button>
      </footer>
    </div>
  );
}
