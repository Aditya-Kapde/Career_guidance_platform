import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Clock, Briefcase, GraduationCap, Layout, Code, Award, Lightbulb } from 'lucide-react';

const CareerKnowledgeCard = ({ roadmap, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0); // Open the first one by default

  if (!roadmap || !roadmap.overview) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg">
            {index + 1}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{roadmap.title || roadmap.career}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{roadmap.description || roadmap.overview?.careerType}</p>
          </div>
        </div>
        <ChevronDown 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={24} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100"
          >
            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50">
              
              {/* Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen size={16} /> Overview
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {roadmap.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Clock size={14}/> Duration</div>
                    <div className="font-semibold text-gray-900">{roadmap.estimatedDuration}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Difficulty</div>
                    <div className="font-semibold text-gray-900">{roadmap.difficultyLevel}</div>
                  </div>
                </div>
              </div>

              {/* Education Path */}
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GraduationCap size={16} /> Education Path
                </h4>
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="mb-4">
                    <span className="font-semibold text-gray-900 block mb-2">Degree Options:</span>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.degreeOptions?.map((deg, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{deg}</span>
                      ))}
                    </div>
                  </div>
                  {roadmap.entranceExams && roadmap.entranceExams.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-900 block mb-2">Entrance Exams:</span>
                      <p className="text-gray-600 text-sm">{roadmap.entranceExams.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              {roadmap.timeline && (
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layout size={16} /> Pathway Timeline
                  </h4>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {roadmap.timeline.map((step, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-600 text-slate-50 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          {i + 1}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-slate-900">{step.year}</h5>
                          </div>
                          <div className="text-slate-500 text-sm">{step.focus}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills & Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Lightbulb size={16} /> Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.coreSkills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Code size={16} /> Tools & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.toolsAndTechnologies?.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 text-slate-100 rounded-full text-sm">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Briefcase size={16} /> Project Milestones
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm border-t-4 border-t-emerald-500">
                    <h5 className="font-bold text-gray-900 mb-2">Beginner</h5>
                    <p className="text-sm text-gray-600">{roadmap.beginnerProjects?.[0]?.name}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm border-t-4 border-t-blue-500">
                    <h5 className="font-bold text-gray-900 mb-2">Intermediate</h5>
                    <p className="text-sm text-gray-600">{roadmap.intermediateProjects?.[0]?.name}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm border-t-4 border-t-purple-500">
                    <h5 className="font-bold text-gray-900 mb-2">Advanced</h5>
                    <p className="text-sm text-gray-600">{roadmap.advancedProjects?.[0]?.name}</p>
                  </div>
                </div>
              </div>

              {/* Emerging Fields */}
              {roadmap.emergingFields && roadmap.emergingFields.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Award size={16} /> Emerging Opportunities
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {roadmap.emergingFields.join(" • ")}
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerKnowledgeCard;
