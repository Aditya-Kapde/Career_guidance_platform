import React from 'react';
import { HeartHandshake, ShieldAlert, Activity, BarChart, Zap } from 'lucide-react';

const PremiumParentGuidance = ({ guidance }) => {
  if (!guidance) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-12">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 09</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Parental Guidance</h3>
        <p className="text-gray-500 mt-4 text-lg">A strategic framework for parents to support, motivate, and guide the student without causing burnout.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900 mb-4">
            <HeartHandshake className="text-emerald-600" /> How To Support
          </h4>
          <p className="text-emerald-800 leading-relaxed">{guidance.howToSupport}</p>
        </div>

        <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-lg font-bold text-rose-900 mb-4">
            <ShieldAlert className="text-rose-600" /> What NOT To Force
          </h4>
          <p className="text-rose-800 leading-relaxed">{guidance.whatNotToForce}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            <Zap size={16} className="text-indigo-500" /> Motivation Strategy
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">{guidance.howToMotivate}</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            <Activity size={16} className="text-amber-500" /> Burnout Prevention
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">{guidance.avoidBurnout}</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm print:break-inside-avoid">
          <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            <BarChart size={16} className="text-emerald-500" /> Evaluating Progress
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">{guidance.evaluateProgress}</p>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 border border-gray-200 p-6 rounded-2xl print:break-inside-avoid">
        <h4 className="text-sm font-bold text-gray-900 mb-2">Recommended Extracurriculars</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{guidance.extracurriculars}</p>
      </div>
    </section>
  );
};

export default PremiumParentGuidance;
