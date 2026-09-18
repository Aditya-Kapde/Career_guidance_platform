import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Play, 
  FileText, 
  CheckCircle2, 
  Layers, 
  GraduationCap,
  Calendar,
  LogIn
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { useAuth } from '../context/AuthContext';
import reportApi from '../services/reportApi';
import AppShell from '../components/layout/AppShell';
import Card from '../components/ui/Card';
import SoftCard from '../components/ui/SoftCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Dashboard() {
  const navigate = useNavigate();
  const { educationLevel, reportId, assessmentReport, answers } = useAssessment();
  const { user, isAuthenticated } = useAuth();

  const [savedReports, setSavedReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const hasActiveSession = educationLevel && Object.keys(answers).length > 0;

  useEffect(() => {
    if (isAuthenticated) {
      setLoadingReports(true);
      reportApi.getUserReports()
        .then((res) => {
          if (res && res.reports) {
            setSavedReports(res.reports);
          }
        })
        .catch((err) => {
          console.warn('Could not load user reports:', err);
        })
        .finally(() => {
          setLoadingReports(false);
        });
    }
  }, [isAuthenticated]);

  const modules = [
    {
      icon: Compass,
      title: 'Psychometric Aptitude',
      desc: '15-dimension psychometric evaluation covering logic, risk, curiosity, and collaboration.',
      status: educationLevel ? 'Active' : 'Ready',
      statusVariant: educationLevel ? 'emerald' : 'indigo'
    },
    {
      icon: Award,
      title: 'Deterministic Matching',
      desc: 'Mathematical cosine-weighted compatibility scoring against standardized career profiles.',
      status: 'Ready',
      statusVariant: 'indigo'
    },
    {
      icon: BookOpen,
      title: 'AI Synthesis & Roadmaps',
      desc: 'Generative academic guidance, learning style profiling, and interactive roadmap diagrams.',
      status: 'Ready',
      statusVariant: 'purple'
    }
  ];

  return (
    <AppShell title="Student Overview" subtitle="Personal career guidance hub">
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Welcome & Primary Action Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="indigo" size="md" icon={Sparkles}>
                  CAREER GUIDANCE ENGINE
                </Badge>
                {isAuthenticated && (
                  <Badge variant="emerald" size="sm">
                    Student Account Verified
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {isAuthenticated ? `Welcome back, ${user?.name}` : 'Welcome to PathFinder AI'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                {reportId || assessmentReport
                  ? 'Explore your calculated readiness scores, top matching pathways, trait radar, and personalized study recommendations.'
                  : hasActiveSession
                  ? 'You have an active assessment in progress. Resume where you left off or view personalized career roadmaps.'
                  : 'Take our ~10 minute evaluation. Our deterministic engine maps your psychometric profile to verified graduation roadmaps.'
                }
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {reportId || assessmentReport ? (
                  <Button
                    size="lg"
                    variant="primary"
                    icon={FileText}
                    onClick={() => navigate('/report')}
                  >
                    View Active Report
                  </Button>
                ) : hasActiveSession ? (
                  <Button
                    size="lg"
                    variant="primary"
                    icon={Play}
                    onClick={() => navigate('/assessment')}
                  >
                    Resume Assessment
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="primary"
                    icon={Play}
                    onClick={() => navigate('/assessment')}
                  >
                    Start Assessment
                  </Button>
                )}

                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="secondary"
                    icon={LogIn}
                    onClick={() => navigate('/login')}
                  >
                    Sign In to Save Progress
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl shadow-lg shadow-indigo-200/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-indigo-200">Session Status</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="text-lg font-bold">
                  {educationLevel ? educationLevel.replace('-', ' ').toUpperCase() : 'Ready to Start'}
                </h4>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  {hasActiveSession 
                    ? `${Object.keys(answers).length} questions completed in current session.`
                    : '15 trait dimensions ready for evaluation.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved User Reports History (if authenticated) */}
        {isAuthenticated && savedReports.length > 0 && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Your Saved Career Reports</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedReports.map((rep) => {
                const dateStr = rep.savedAt ? new Date(rep.savedAt).toLocaleDateString() : 'Recent';
                const topCareer = rep.topCareerRecommendations?.[0]?.career || 'Career Report';
                const level = rep.assessmentMetadata?.educationLevel || 'Undergraduate';

                return (
                  <div
                    key={rep.id}
                    onClick={() => navigate(`/report?id=${rep.id}`)}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md hover:border-indigo-300 transition-all cursor-pointer space-y-3 neu-flat"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="indigo" size="sm">
                        {level.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{topCareer}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {rep.aiInsights?.summary || 'Psychometric profile analysis.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-end text-xs font-semibold text-indigo-600">
                      <span>View Report &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* System Methodology Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft-sm text-left flex flex-col justify-between space-y-4 neu-flat"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={m.statusVariant} size="sm">
                    {m.status}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-900">{m.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
