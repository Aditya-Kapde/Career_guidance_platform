import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  AlertCircle, 
  Compass, 
  Cpu 
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import assessmentApi from '../services/assessmentApi';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ANALYSIS_STEPS = [
  { id: 'responses', label: 'Understanding your responses' },
  { id: 'traits', label: 'Mapping your core traits & aptitude' },
  { id: 'matching', label: 'Finding compatible career paths' },
  { id: 'insights', label: 'Preparing personalized AI insights' }
];

export default function Loading() {
  const navigate = useNavigate();
  const { 
    educationLevel, 
    responses, 
    traitScores, 
    getDetailedResponses, 
    setAssessmentReport, 
    setReportId 
  } = useAssessment();

  const [status, setStatus] = useState('loading'); // 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Progressive step animation timer
  useEffect(() => {
    if (status !== 'loading') return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [status]);

  const performAnalysis = async () => {
    setStatus('loading');
    setErrorMsg('');
    setActiveStepIndex(0);

    try {
      const payload = {
        educationLevel,
        responses: getDetailedResponses ? getDetailedResponses() : responses,
        traitScores
      };

      const response = await assessmentApi.analyzeAssessment(payload);
      
      const newReportId = response.reportId;
      const reportPayload = response.report || response;
      
      setReportId(newReportId);
      setAssessmentReport(reportPayload);

      // Smooth slight delay so user can absorb the complete analysis checklist
      setTimeout(() => {
        navigate('/report');
      }, 1000);

    } catch (err) {
      console.error('Analysis API execution failed:', err);
      setStatus('error');
      setErrorMsg(
        err.userMessage || 
        err.response?.data?.error || 
        'Unable to connect to the career matching engine. Please ensure the backend server is running.'
      );
    }
  };

  useEffect(() => {
    if (!educationLevel || !traitScores) {
      navigate('/');
      return;
    }
    performAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden text-slate-900 select-none">
      {/* Background radial ambiance */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl -z-10 animate-pulse-soft" />
      <div className="absolute w-[350px] h-[350px] bg-purple-200/30 rounded-full blur-2xl -z-10 translate-x-24 translate-y-24" />

      {status === 'loading' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft-xl neu-flat text-center space-y-8 relative z-10"
        >
          {/* Animated Core Node Visual */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Pulsing orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-300 opacity-60"
            />
            {/* Outer soft glow */}
            <div className="absolute inset-2 rounded-full bg-indigo-50 animate-ping opacity-25" />

            {/* Core Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-lg shadow-indigo-300 relative z-10">
              <BrainCircuit className="w-8 h-8 stroke-[1.75]" />
            </div>

            {/* Sparkle badge */}
            <motion.div
              animate={{ y: [-2, 2, -2], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-white border border-indigo-100 shadow-md flex items-center justify-center text-indigo-600 z-20"
            >
              <Sparkles className="w-4 h-4 fill-indigo-100" />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Analyzing Your Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
              Our deterministic engine and Groq AI are synthesizing your 15-dimension personality matrix.
            </p>
          </div>

          {/* Progressive Analysis Checklist */}
          <div className="space-y-3 text-left pt-2">
            {ANALYSIS_STEPS.map((step, idx) => {
              const isCompleted = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                      : isCurrent
                      ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950 shadow-xs'
                      : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}

                  <span className={`text-xs font-semibold ${isCompleted ? 'line-through opacity-80' : ''}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        /* Polished Error & Retry State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-rose-200/80 shadow-soft-xl text-center space-y-6 relative z-10 neu-flat"
        >
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mx-auto shadow-sm">
            <AlertCircle className="w-8 h-8 stroke-[1.75]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Analysis Failed
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {errorMsg}
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              variant="primary"
              size="lg"
              icon={RotateCcw}
              onClick={performAnalysis}
              fullWidth
            >
              Retry Profile Analysis
            </Button>

            <button
              type="button"
              onClick={() => navigate('/assessment')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Return to Assessment
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
