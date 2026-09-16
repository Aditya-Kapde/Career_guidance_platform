import React from 'react';
import { Target, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

const PrintExecutiveBriefing = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-10 border-b border-slate-200/80 bg-white print:break-after-page">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase block mb-1">
          Chapter 01
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Executive Aptitude Briefing
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Synthesized behavioral observations and primary cognitive archetype.
        </p>
      </div>

      {/* Main Quote / Profile Summary */}
      <div className="p-5 bg-slate-50/90 rounded-2xl border-l-4 border-indigo-600 border border-slate-200/60 mb-8">
        <p className="text-sm font-semibold text-slate-800 leading-relaxed italic">
          "{summary.profileSummary || summary}"
        </p>
      </div>

      {/* 2-Column Symmetrical Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Cognitive & Communication */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Cognitive & Learning Pattern
            </h3>
          </div>
          
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-0.5">Learning Modality:</span>
              <p className="text-slate-600 leading-relaxed">
                {summary.learningStyle || "Self-directed, structured conceptual absorption through real-world applications."}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-700 block mb-0.5">Communication Profile:</span>
              <p className="text-slate-600 leading-relaxed">
                {summary.communicationStyle || "Clear, analytical, and focused on practical collaboration and goal delivery."}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Key Strength & Development Area */}
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Core Anchor Strength</span>
            </div>
            <p className="text-xs text-emerald-950 font-medium leading-relaxed">
              {summary.biggestStrength || "Demonstrates strong foundational problem-solving and structured cognitive agility."}
            </p>
          </div>

          <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Primary Development Opportunity</span>
            </div>
            <p className="text-xs text-rose-950 font-medium leading-relaxed">
              {summary.biggestDevelopmentOpportunity || "Expanding tolerance for open-ended ambiguity and building high-tempo decision habits."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintExecutiveBriefing;
