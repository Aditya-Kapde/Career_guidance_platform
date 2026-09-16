import React from 'react';
import { Sparkles, BrainCircuit, Lightbulb, BookOpen, CheckCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function AIInsights({ aiInsights, studyRecommendations = [] }) {
  if (!aiInsights && (!studyRecommendations || studyRecommendations.length === 0)) return null;

  const summary = aiInsights?.summary || '';
  const insightsList = aiInsights?.insightsList || [];
  const closingMessage = aiInsights?.closingMessage || '';

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-indigo-800/50 shadow-soft-xl relative overflow-hidden space-y-8">
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -z-0" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="md" icon={Sparkles}>
              AI PERSONALIZED
            </Badge>
            <span className="text-xs text-indigo-300 font-mono">
              Groq Llama 3 Analysis
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Personalized Career Intelligence
          </h2>
        </div>

        <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs font-semibold text-indigo-200 self-start sm:self-auto">
          <BrainCircuit className="w-4 h-4 text-purple-300" />
          <span>Generative Synthesis</span>
        </div>
      </div>

      {/* Executive Summary Narrative */}
      {summary && (
        <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-[11px] font-bold tracking-widest text-indigo-300 uppercase block mb-2">
            Synthesis Summary
          </span>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            {summary}
          </p>
        </div>
      )}

      {/* Structured Insights / Tips Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insights Column */}
        {insightsList.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-300">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">Strategic Insights</h3>
            </div>
            <ul className="space-y-3">
              {insightsList.map((insight, idx) => {
                const text = typeof insight === 'string' ? insight : insight.text || JSON.stringify(insight);
                return (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Study Tips Column */}
        {studyRecommendations.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-300">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-base text-white">Academic & Prep Strategy</h3>
            </div>
            <ul className="space-y-3">
              {studyRecommendations.map((tip, idx) => {
                const text = typeof tip === 'string' ? tip : tip.recommendation || JSON.stringify(tip);
                return (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Closing Guidance */}
      {closingMessage && (
        <div className="relative z-10 pt-4 border-t border-white/10 text-center">
          <p className="text-xs sm:text-sm italic text-indigo-200/90 max-w-xl mx-auto">
            "{closingMessage}"
          </p>
        </div>
      )}
    </div>
  );
}
