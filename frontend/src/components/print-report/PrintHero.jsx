import React from 'react';
import { Sparkles, GraduationCap, Calendar, Award, CheckCircle2, Compass } from 'lucide-react';

const PrintHero = ({ reportData }) => {
  if (!reportData) return null;

  const metadata = reportData.assessmentMetadata || {};
  const educationLevel = metadata.educationLevel || 'Undergraduate';
  const generatedAt = reportData.generatedAt 
    ? new Date(reportData.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const topMatch = reportData.topCareerRecommendations?.[0]?.career 
    || reportData.analytics?.overallProfileSummary?.highestCareerMatch 
    || 'Multidisciplinary Professional';

  const readinessScore = reportData.analytics?.careerReadiness?.score 
    || reportData.readinessScore 
    || 82;

  const confidenceScore = reportData.confidenceScore || 88;
  const reportCode = `PI-${(reportData.id || reportData.reportId || '849204').slice(0, 8).toUpperCase()}`;

  return (
    <section className="w-full max-w-[760px] mx-auto px-6 py-12 border-b border-slate-200/80 bg-white">
      {/* Top Header Publication Crest */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-sm">
            <Compass className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              PathFinder <span className="text-indigo-600">AI</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Official Career Intelligence Report
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Analysis</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            REF: {reportCode}
          </div>
        </div>
      </div>

      {/* Main Title & Document Subtitle */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic Career Blueprint</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Comprehensive Aptitude & <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
            Career Compatibility Portfolio
          </span>
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          An individualized evaluation mapping cognitive inclination, psychometric trait distribution, and high-probability career roadmaps based on standardized academic models.
        </p>
      </div>

      {/* Symmetrical 4-Card Key Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 mb-8">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Top Compatibility
          </span>
          <p className="text-sm font-extrabold text-slate-900 truncate">
            {topMatch}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Readiness Index
          </span>
          <p className="text-sm font-extrabold text-indigo-600">
            {readinessScore}/100
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Confidence Score
          </span>
          <p className="text-sm font-extrabold text-emerald-600">
            {confidenceScore}%
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Education Stage
          </span>
          <p className="text-sm font-extrabold text-slate-800 uppercase">
            {educationLevel.replace('-', ' ')}
          </p>
        </div>
      </div>

      {/* Candidate Publication Meta */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>Evaluation Level: <strong className="text-slate-800">{educationLevel.replace('-', ' ').toUpperCase()}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Issued: <strong className="text-slate-800">{generatedAt}</strong></span>
        </div>
      </div>
    </section>
  );
};

export default PrintHero;
