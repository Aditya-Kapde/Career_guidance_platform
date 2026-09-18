import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import assessmentApi from '../services/assessmentApi';
import Button from '../components/ui/Button';

const ANALYSIS_STEPS = [
  { id: 'responses', label: 'Validating response integrity' },
  { id: 'traits', label: 'Evaluating 15 psychometric dimensions' },
  { id: 'matching', label: 'Computing deterministic career alignment' },
  { id: 'insights', label: 'Synthesizing verified graduation roadmaps' }
];

export default function Loading() {
  const navigate = useNavigate();
  const { 
    educationLevel, 
    getDetailedResponses, 
    setAssessmentReport, 
    setReportId 
  } = useAssessment();

  const [status, setStatus] = useState('loading'); // 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const executionRef = useRef(false);

  useEffect(() => {
    if (status !== 'loading') return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [status]);

  const performAnalysis = async () => {
    setStatus('loading');
    setErrorMsg('');
    setActiveStepIndex(0);

    try {
      const detailedResponses = getDetailedResponses();
      if (!detailedResponses || detailedResponses.length === 0) {
        throw new Error('No assessment responses found. Please complete the questions first.');
      }

      const payload = {
        educationLevel: educationLevel || 'undergraduate',
        responses: detailedResponses
      };

      const response = await assessmentApi.analyzeAssessment(payload);
      
      const newReportId = response.reportId;
      const reportPayload = response.report || response;
      
      setReportId(newReportId);
      setAssessmentReport(reportPayload);

      setTimeout(() => {
        navigate('/report');
      }, 800);

    } catch (err) {
      console.error('Analysis API execution failed:', err);
      setStatus('error');
      setErrorMsg(
        err.userMessage || 
        err.response?.data?.error || 
        err.message || 
        'We could not generate a reliable report from this assessment. Please retry the analysis.'
      );
    }
  };

  useEffect(() => {
    if (!educationLevel) {
      navigate('/assessment');
      return;
    }
    if (!executionRef.current) {
      executionRef.current = true;
      performAnalysis();
    }
  }, [educationLevel]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md mx-auto text-center">
        {status === 'loading' ? (
          <div className="space-y-8">
            {/* Animated Icon Container */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-400"
              />
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                <BrainCircuit className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Synthesizing Your Career Profile
              </h2>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Processing psychometric metrics against standardized career compatibility models.
              </p>
            </div>

            {/* Progress Checklist */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm text-left space-y-3.5">
              {ANALYSIS_STEPS.map((step, idx) => {
                const isDone = idx < activeStepIndex;
                const isCurrent = idx === activeStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 transition-colors ${
                      isDone
                        ? 'text-indigo-950 font-semibold'
                        : isCurrent
                        ? 'text-indigo-600 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2.5 h-2.5 rounded-full bg-indigo-600"
                        />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Error State */
          <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-soft-md space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Evaluation Interrupted
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {errorMsg}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button
                variant="primary"
                size="md"
                icon={RotateCcw}
                onClick={performAnalysis}
              >
                Retry Analysis
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/assessment')}
              >
                Return to Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
