import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, Award, Zap, BrainCircuit, Users, Hammer, Eye } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function LearningProfileCard({ learningProfile, traitScores = {} }) {
  if (!learningProfile) return null;

  const preferredStyle = learningProfile.preferredStyle || 'Analytical & Visual';
  const confidence = learningProfile.confidence || 86;

  // Extract and normalize modality scores out of 100%
  const rawAnalytical = (traitScores.logical || 0) + (traitScores.analyticalThinking || 0) + (traitScores.problemSolving || 0);
  const rawVisual = (traitScores.creativity || 0) + (traitScores.curiosity || 0);
  const rawCollaborative = (traitScores.teamwork || 0) + (traitScores.communication || 0) + (traitScores.empathy || 0);
  const rawPractical = (traitScores.planning || 0) + (traitScores.decisionMaking || 0) + (traitScores.adaptability || 0);

  const rawMax = Math.max(rawAnalytical, rawVisual, rawCollaborative, rawPractical, 10);

  const calcPercentage = (raw) => {
    if (!raw || raw === 0) return 60;
    return Math.min(98, Math.max(45, Math.round((raw / rawMax) * 75 + 23)));
  };

  const styleBreakdown = [
    { 
      label: 'Analytical & Structured', 
      desc: 'Formulas, algorithmic proofs & systematic logic',
      icon: BrainCircuit,
      rating: calcPercentage(rawAnalytical),
      variant: 'indigo'
    },
    { 
      label: 'Collaborative & Interactive', 
      desc: 'Peer debriefs, team discussions & workshops',
      icon: Users,
      rating: calcPercentage(rawCollaborative),
      variant: 'purple'
    },
    { 
      label: 'Visual & Conceptual', 
      desc: 'Architecture diagrams, mental models & flowcharts',
      icon: Eye,
      rating: calcPercentage(rawVisual),
      variant: 'emerald'
    },
    { 
      label: 'Practical & Project-Based', 
      desc: 'Hands-on builds, case studies & active sandboxes',
      icon: Hammer,
      rating: calcPercentage(rawPractical),
      variant: 'amber'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat h-full flex flex-col justify-between space-y-6">
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
              PEDAGOGICAL STYLE & COGNITIVE RETENTION
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Learning Profile
            </h3>
          </div>

          <Badge variant="indigo" size="sm">
            {confidence}% Model Confidence
          </Badge>
        </div>

        {/* Primary Style Focus Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-slate-50 border border-indigo-100/90 mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Primary Cognitive Modality
            </span>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded-full">
              Optimal Track
            </span>
          </div>

          <h4 className="text-lg font-black text-indigo-950">
            {preferredStyle} Learning
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            You retain complex multi-step concepts most rapidly through structured problem decomposition, conceptual visual maps, and milestone project builds.
          </p>
        </div>

        {/* Modality Breakdown Out of 100% */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Modality Breakdown</span>
            <span>Rating / 100%</span>
          </div>

          {styleBreakdown.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Icon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {item.rating}%
                  </span>
                </div>

                <ProgressBar value={item.rating} variant={item.variant} size="sm" />

                <p className="text-[11px] text-slate-500 pt-0.5">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Synthesized from cognitive question response patterns & speed.</span>
      </div>
    </div>
  );
}
