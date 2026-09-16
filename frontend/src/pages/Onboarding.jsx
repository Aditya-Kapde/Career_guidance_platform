import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  GraduationCap, 
  TrendingUp, 
  BrainCircuit, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Target 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import SoftCard from '../components/ui/SoftCard';
import assessmentApi from '../services/assessmentApi';

export default function Onboarding() {
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'connected' | 'offline'

  useEffect(() => {
    assessmentApi.checkHealth()
      .then((data) => {
        if (data && data.status === 'ok') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('connected');
        }
      })
      .catch(() => {
        setBackendStatus('offline');
      });
  }, []);

  const featurePillars = [
    {
      icon: BrainCircuit,
      title: 'Cognitive & Trait Engine',
      description: 'Deterministic 15-dimension psychometric and cognitive aptitude mapping.'
    },
    {
      icon: Target,
      title: 'Precision Career Matching',
      description: 'Matches your unique profile against curated STEM, business, design, and health tracks.'
    },
    {
      icon: Layers,
      title: 'Step-by-Step Roadmaps',
      description: 'Milestone roadmaps from high school through certifications, college, and internships.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-100/40 via-purple-50/20 to-transparent pointer-events-none blur-3xl -z-10" />

      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <GraduationCap className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none block">
              PathFinder <span className="text-indigo-600">AI</span>
            </span>
            <span className="text-[11px] font-medium text-slate-400 block tracking-tight">
              Personal Career Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-soft-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Career Engine Active</span>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex"
            >
              <Badge variant="indigo" size="md" icon={Sparkles}>
                PERSONAL CAREER INTELLIGENCE
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]"
            >
              Discover where your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">strengths</span> can take you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal"
            >
              Take a comprehensive psychometric assessment that analyzes your traits, cognitive aptitude, interests, and learning preferences to uncover high-compatibility career pathways.
            </motion.p>

            {/* CTA & Time Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                size="lg"
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/assessment')}
                className="shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35"
              >
                Start Assessment
              </Button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/80 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200/80">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>~10 minutes • Personalized report</span>
              </div>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-200/70"
            >
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">15+</span>
                <span className="text-[11px] text-slate-500 font-medium">Core Traits Analyzed</span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">100%</span>
                <span className="text-[11px] text-slate-500 font-medium">Deterministic Match</span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">Groq AI</span>
                <span className="text-[11px] text-slate-500 font-medium">Personalized Insights</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract Career Intelligence Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background subtle glow rings */}
            <div className="absolute w-80 h-80 rounded-full bg-indigo-200/50 blur-3xl -z-10" />
            <div className="absolute w-60 h-60 rounded-full bg-purple-200/40 blur-2xl -z-10 translate-x-12 translate-y-12" />

            {/* Interactive Visual Container */}
            <div className="w-full max-w-md space-y-4">
              {/* Top Trait Alignment Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft-lg relative neu-flat group hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Career Readiness Score</h4>
                      <p className="text-[10px] text-slate-400">High Foundational Alignment</p>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">
                    88 / 100
                  </Badge>
                </div>

                {/* Progress Mini Track */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                  <div className="bg-emerald-500 h-full rounded-full w-[88%]" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Analytical & Logical Fit</span>
                  <span className="text-emerald-600 font-bold">Top 5% Match</span>
                </div>
              </motion.div>

              {/* Middle Floating Career Matching Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="grid grid-cols-2 gap-3.5"
              >
                {/* Career 1 */}
                <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-soft-md neu-flat">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Top Match</span>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      94%
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-tight mb-1">
                    Software Engineer
                  </p>
                  <p className="text-[11px] text-slate-400">
                    High logical & systems architecture fit
                  </p>
                </div>

                {/* Career 2 */}
                <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-soft-md neu-flat">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-purple-600 tracking-wider">Alternative</span>
                    <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      89%
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-tight mb-1">
                    Data Scientist
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Strong pattern & statistical mastery
                  </p>
                </div>
              </motion.div>

              {/* Bottom AI Insights Preview */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-4 shadow-soft-lg flex items-center justify-between gap-4 border border-indigo-800/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">AI Personalization Ready</span>
                    <span className="text-[10px] text-indigo-200 block">Personalized study advice & roadmaps</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-indigo-300 bg-white/10 px-2.5 py-1 rounded-lg shrink-0">
                  Llama 3 Powered
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature Pillars Grid */}
        <section className="mt-16 md:mt-20 pt-10 border-t border-slate-200/70">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featurePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card key={idx} hover className="neu-flat border-slate-200/80 p-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span>© {new Date().getFullYear()} PathFinder AI Career Platform. All student data processed deterministically.</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400">Server Status:</span>
          {backendStatus === 'connected' ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              API Connected
            </span>
          ) : backendStatus === 'checking' ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-500">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Connecting...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Local Mock Ready
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
