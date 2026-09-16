import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Play, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  Layers, 
  GraduationCap 
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import AppShell from '../components/layout/AppShell';
import Card from '../components/ui/Card';
import SoftCard from '../components/ui/SoftCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Dashboard() {
  const navigate = useNavigate();
  const { educationLevel, reportId, assessmentReport } = useAssessment();

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
    <AppShell title="Student Overview" subtitle="Personal career evaluation hub">
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Welcome & Primary Action Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-sm neu-flat relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="md" icon={Sparkles}>
                  CAREER INTELLIGENCE ENGINE
                </Badge>
                <Badge variant="slate" size="sm">
                  v2.0 Architecture
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {reportId || assessmentReport 
                  ? 'Your Career Intelligence Report is Ready'
                  : 'Start Your Personal Aptitude Assessment'
                }
              </h2>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                {reportId || assessmentReport
                  ? 'Explore your calculated readiness scores, top matching pathways, trait radar, and AI study recommendations.'
                  : 'Take our ~10 minute evaluation. Our engine will map your strengths to personalized graduation roadmaps and industry opportunities.'
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
                    View Official Report
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="primary"
                    icon={Play}
                    onClick={() => navigate('/assessment')}
                  >
                    Launch Assessment
                  </Button>
                )}

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/assessment')}
                >
                  {educationLevel ? 'Update Assessment' : 'Select Stream'}
                </Button>
              </div>
            </div>

            {/* Right System Info Panel */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 neu-inset space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Groq AI Engine</span>
                  <span className="text-[10px] text-slate-400 block">Llama 3 70B Parameter Model</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Evaluation Type:</span>
                  <strong className="text-slate-900">Psychometric + Cognitive</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current Level:</span>
                  <strong className="text-indigo-600 uppercase">
                    {educationLevel ? educationLevel.replace('-', ' ') : 'Not Selected'}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Report Status:</span>
                  <strong className={reportId ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                    {reportId ? 'Analyzed' : 'Pending'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Assessment Pillars */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Platform Intelligence Modules
            </h3>
            <p className="text-xs text-slate-500">
              Core components that synthesize your personalized career report.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <Card key={idx} hover className="neu-flat border-slate-200/80 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <Badge variant={mod.statusVariant} size="sm">
                        {mod.status}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">
                      {mod.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Automatic Engine</span>
                    <button
                      onClick={() => navigate('/assessment')}
                      className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
