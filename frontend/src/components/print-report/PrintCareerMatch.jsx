import React from 'react';
import { Briefcase, Zap, MapPin, GraduationCap, Users, DollarSign, BrainCircuit } from 'lucide-react';

const CareerMatchAnalysis = ({ topCareers }) => {
  if (!topCareers || topCareers.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-before-page">
      <div className="mb-16">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 03</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Career Match Profiles</h3>
        <p className="text-gray-500 mt-4 max-w-2xl text-lg">In-depth structural analysis of your highest compatibility career pathways.</p>
      </div>

      <div className="space-y-24">
        {topCareers.map((career, idx) => (
          <div key={idx} className="print:break-inside-avoid">
            {/* Career Header */}
            <div className="bg-gray-900 text-white p-8 rounded-t-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-3xl font-bold tracking-tight mb-2">{career.career}</h4>
                <p className="text-gray-400 font-medium">{career.industries?.join(', ') || 'Various Industries'}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-4xl font-extrabold text-indigo-400">{career.score}%</span>
                <span className="text-sm font-semibold tracking-wider uppercase text-gray-500 mt-1">Match Score</span>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="border-x border-b border-gray-200 rounded-b-2xl p-8 bg-white">
              <div className="mb-10">
                <h5 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-indigo-600 pl-4">Strategic Fit Rationale</h5>
                <p className="text-gray-600 leading-relaxed pl-5">{career.matchReason}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                <div>
                  <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Core Attributes</h5>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <GraduationCap className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Education Level</p>
                        <p className="text-gray-600 text-sm">{career.requiredEducation}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <BrainCircuit className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">AI Disruption Risk</p>
                        <p className="text-gray-600 text-sm">{career.aiImpact}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <DollarSign className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Salary Progression</p>
                        <p className="text-gray-600 text-sm">{career.salaryProgression}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Work Environment</p>
                        <p className="text-gray-600 text-sm">{career.workEnvironment}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Execution & Reality</h5>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Briefcase className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Typical Day</p>
                        <p className="text-gray-600 text-sm">{career.typicalDay}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Who Should Avoid This</p>
                        <p className="text-gray-600 text-sm">{career.whoShouldAvoid}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="text-indigo-600 shrink-0" size={20}/>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Growth Path</p>
                        <p className="text-gray-600 text-sm">{career.growthPath}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
                <div>
                  <h5 className="text-sm font-bold text-emerald-700 mb-3 uppercase tracking-wider">Strategic Advantages</h5>
                  <ul className="space-y-2">
                    {career.pros?.map((pro, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-rose-700 mb-3 uppercase tracking-wider">Potential Risks</h5>
                  <ul className="space-y-2">
                    {career.cons?.map((con, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-rose-500 mt-1">•</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerMatchAnalysis;
