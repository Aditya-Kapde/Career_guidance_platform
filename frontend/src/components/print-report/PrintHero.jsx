import React from 'react';

const PremiumHero = ({ reportData }) => {
  return (
    <section className="relative flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-1 w-12 bg-indigo-600 rounded-full"></span>
          <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Career Intelligence Publication</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Strategic Career <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
            Blueprint & Analysis
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-500 font-light mb-12 max-w-2xl leading-relaxed">
          Prepared exclusively for <span className="font-semibold text-gray-900">{reportData.student?.name || 'the Candidate'}</span> on <span className="font-semibold text-gray-900">{new Date(reportData.generatedAt).toLocaleDateString()}</span>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Top Career Match</p>
            <p className="text-lg font-bold text-gray-900">{reportData.analytics?.overallProfileSummary?.highestCareerMatch || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Career Readiness</p>
            <p className="text-lg font-bold text-gray-900">{reportData.analytics?.careerReadiness?.score || 0}/100</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Analysis Confidence</p>
            <p className="text-lg font-bold text-gray-900">{reportData.confidenceScore || 0}%</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Report ID</p>
            <p className="text-sm font-mono text-gray-500 mt-1">CG-{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;
