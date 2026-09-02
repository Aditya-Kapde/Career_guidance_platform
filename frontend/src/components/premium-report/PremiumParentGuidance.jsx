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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
          <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900 mb-4">
            <HeartHandshake className="text-emerald-600" /> How To Support
          </h4>
          <p className="text-emerald-800 leading-relaxed">{guidance.howToSupport}</p>
        </div>

        <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100">
          <h4 className="flex items-center gap-2 text-lg font-bold text-rose-900 mb-4">
            <ShieldAlert className="text-rose-600" /> What NOT To Force
          </h4>
          <p className="text-rose-800 leading-relaxed">{guidance.whatNotToForce}</p>
        </div>

        <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
          <h4 className="flex items-center gap-2 text-lg font-bold text-indigo-900 mb-4">
            <Zap className="text-indigo-600" /> Motivation Strategy
          </h4>
          <p className="text-indigo-800 leading-relaxed">{guidance.howToMotivate}</p>
        </div>
      </div>
    </section>
  );
};

export default PremiumParentGuidance;
