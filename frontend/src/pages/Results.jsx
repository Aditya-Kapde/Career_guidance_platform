import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Layers, 
  Target 
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import AppShell from '../components/layout/AppShell';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';

export default function Results() {
  const navigate = useNavigate();
  const { resetAssessment, educationLevel, assessmentReport, reportId } = useAssessment();

  const report = assessmentReport?.report || assessmentReport;

  useEffect(() => {
    if (!assessmentReport && !reportId) {
      navigate('/');
    }
  }, [assessmentReport, reportId, navigate]);

  if (!report && !reportId) {
    return null;
  }

  const handleRestart = () => {
    if (window.confirm('Restart the assessment? Your previous responses will be cleared.')) {
      resetAssessment();
      navigate('/');
    }
  };

  const summary = report?.executiveSummary?.profileSummary || report?.summary || 'Your assessment responses have been mapped against standardized aptitude benchmarks.';
  const topCareers = report?.topCareers || report?.topCareerRecommendations || [];
  const strengths = report?.swot?.strengths || report?.strengths || [];
  const skillsToDevelop = report?.swot?.weaknesses || report?.developmentAreas || [];

  return (
    <AppShell title="Executive Summary" subtitle="High-level aptitude & compatibility highlights">
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="indigo" size="md" icon={Sparkles}>
            ANALYSIS COMPLETE
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Profile Highlights
          </h1>

          <p className="text-sm text-slate-500 leading-relaxed">
            Evaluated for the <strong className="text-indigo-600 uppercase">{educationLevel?.replace('-', ' ') || 'Undergraduate'}</strong> educational milestone.
          </p>
        </div>

        {/* Profile Summary Card */}
        {summary && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat relative overflow-hidden">
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 block mb-2">
              Profile Synthesis
            </span>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
              {summary}
            </p>
          </div>
        )}

        {/* Top Matches Preview */}
        {topCareers.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                Leading Career Matches
              </h3>
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/report')}
              >
                View in Full Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCareers.slice(0, 4).map((career, idx) => {
                const name = career.career || career.title;
                const score = career.score || 85;
                const careerId = career.id || name?.toLowerCase().replace(/\s+/g, '-');

                return (
                  <Card key={idx} hover className="neu-flat border-slate-200/80 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">
                          {name}
                        </h4>
                        <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                          {score}%
                        </span>
                      </div>
                      <ProgressBar value={score} variant="indigo" size="sm" />
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {career.reason || career.matchReason || 'Strong trait alignment.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                      <Button
                        variant="soft"
                        size="sm"
                        icon={ArrowRight}
                        iconPosition="right"
                        onClick={() => navigate(`/career/${careerId}`)}
                      >
                        Explore Roadmap
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Strengths & Growth Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card className="neu-flat border-slate-200/80 p-6 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Key Strengths
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {strengths.slice(0, 4).map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{typeof str === 'string' ? str : str.strength || JSON.stringify(str)}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Development */}
          <Card className="neu-flat border-slate-200/80 p-6 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              Recommended Focus Areas
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {skillsToDevelop.slice(0, 4).map((dev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{typeof dev === 'string' ? dev : dev.trait || dev.skill || JSON.stringify(dev)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            icon={FileText}
            onClick={() => navigate('/report')}
            className="w-full sm:w-auto"
          >
            Open Comprehensive Report
          </Button>

          <Button
            size="lg"
            variant="secondary"
            icon={RotateCcw}
            onClick={handleRestart}
            className="w-full sm:w-auto"
          >
            Retake Assessment
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
