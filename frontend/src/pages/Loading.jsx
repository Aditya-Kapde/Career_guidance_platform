import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import api from '../services/api';

export default function Loading() {
  const navigate = useNavigate();
  const { educationLevel, responses, traitScores, setAssessmentReport } = useAssessment();
  const [status, setStatus] = useState('loading'); // 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const performAnalysis = async () => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const payload = {
        educationLevel,
        responses,
        traitScores
      };
      
      const response = await api.post('/assessment/analyze', payload);
      setAssessmentReport(response);
      navigate('/results');
    } catch (err) {
      console.error("Analysis API failed:", err);
      setStatus('error');
      setErrorMsg(
        err.response?.data?.error || 
        err.message || 
        "Failed to reach the server. Make sure the backend server is running."
      );
    }
  };

  useEffect(() => {
    // If no assessment has been conducted, redirect back to home
    if (!educationLevel || !traitScores) {
      navigate('/');
      return;
    }
    
    performAnalysis();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic colorful blobs in background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse" />

      {status === 'loading' ? (
        <div className="text-center max-w-sm relative z-10 space-y-8 animate-fade-in">
          {/* Animated AI Illustration Core */}
          <div className="relative flex items-center justify-center w-36 h-36 mx-auto">
            {/* Pulsing ring outer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-indigo-500"
            />

            {/* Rotating dashes inner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-250 opacity-40"
            />

            {/* Solid base ring */}
            <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center border border-indigo-50" />

            {/* Pulsing brain/core icon */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative z-10 bg-gradient-to-br from-indigo-500 to-purple-650 p-4.5 rounded-full text-white shadow-lg shadow-indigo-200"
            >
              <Cpu className="w-10 h-10 stroke-[1.8]" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-2 right-2 z-25 text-purple-600 bg-white p-1 rounded-full shadow-md border border-purple-50"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Loading text message */}
          <div className="space-y-3">
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-2xl font-extrabold text-slate-800"
            >
              Analyzing your responses...
            </motion.h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] mx-auto">
              Our AI model is mapping your preferences to professional job segments and education roadmaps.
            </p>
          </div>

          {/* Horizontal bar progression */}
          <div className="w-48 h-1.5 bg-slate-150 rounded-full overflow-hidden mx-auto">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative h-full w-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            />
          </div>
        </div>
      ) : (
        /* Dynamic Error Display Overlay with Retry option */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glassmorphism rounded-xl-card p-8 border-rose-200 text-center max-w-sm relative z-10 shadow-2xl shadow-indigo-100/50 space-y-6"
        >
          <div className="mx-auto w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center border border-rose-100 animate-bounce">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Analysis Failed</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {errorMsg}
            </p>
          </div>
          <button
            onClick={performAnalysis}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retry Analysis</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
