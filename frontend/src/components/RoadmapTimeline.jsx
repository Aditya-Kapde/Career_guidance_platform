import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, CheckCircle2, Circle, ChevronDown, ChevronUp, Milestone } from 'lucide-react';

const STAGE_ORDER = ['class9', 'class10', 'class11_12', 'diploma', 'undergraduate'];

const STAGE_LABELS = {
  class9: "Class 9 Pathway",
  class10: "Class 10 Pathway",
  class11_12: "Class 11 & 12 (PUC) Pathway",
  diploma: "Diploma Pathway",
  undergraduate: "Undergraduate Pathway"
};

export default function RoadmapTimeline({
  roadmaps = {},
  educationLevel = "class-9"
}) {
  // Map educationLevel to active stage key
  const getStageKey = (edu) => {
    if (!edu) return 'class9';
    switch (edu.toLowerCase()) {
      case 'class-8':
      case 'class-9':
        return 'class9';
      case 'class-10':
        return 'class10';
      case 'puc':
      case 'class-11':
      case 'class-12':
      case 'class11_12':
        return 'class11_12';
      case 'diploma':
        return 'diploma';
      case 'undergraduate':
        return 'undergraduate';
      default:
        return 'class9';
    }
  };

  const currentStage = getStageKey(educationLevel);
  const currentStageIndex = STAGE_ORDER.indexOf(currentStage);

  // Accordion open/close state. Initialize current stage as open.
  const [expandedStages, setExpandedStages] = useState({
    [currentStage]: true
  });

  // Expand the active stage automatically if educationLevel updates
  useEffect(() => {
    setExpandedStages(prev => ({
      ...prev,
      [currentStage]: true
    }));
  }, [currentStage]);

  const toggleStage = (stage) => {
    setExpandedStages(prev => ({
      ...prev,
      [stage]: !prev[stage]
    }));
  };

  // Scroll to current stage header on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById(`stage-${currentStage}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [currentStage]);

  // Calculations for progress indicator
  const totalStages = STAGE_ORDER.length;
  const completedCount = currentStageIndex; // e.g. if index is 2, 2 stages (0 and 1) are complete
  const progressPercent = (completedCount / totalStages) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <Milestone className="w-5 h-5 text-indigo-600" />
        Interactive Career Roadmap
      </h2>
      <p className="text-xs md:text-sm text-slate-500 mb-6">
        Personalized path based on your current education level: <span className="font-bold text-indigo-600 uppercase">{educationLevel ? educationLevel.replace('-', ' ') : 'Class 9'}</span>
      </p>

      {/* Progress Indicator */}
      <div className="mb-8 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Roadmap Progress</span>
          <span className="text-xs font-bold text-slate-500">
            {completedCount} of {totalStages} Stages Cleared ({Math.round(progressPercent)}%)
          </span>
        </div>
        <div className="w-full bg-slate-150 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stages Timeline List */}
      <div className="space-y-6">
        {STAGE_ORDER.map((stageKey, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = idx > currentStageIndex;
          const steps = roadmaps[stageKey] || [];
          const isOpen = !!expandedStages[stageKey];

          // Determine stage color theme classes
          let bgHeader = "bg-slate-50/50 hover:bg-slate-100/50";
          let textTitle = "text-slate-850";
          
          if (isCurrent) {
            bgHeader = "bg-indigo-50/20 hover:bg-indigo-50/40";
            textTitle = "text-indigo-900 font-extrabold";
          } else if (isCompleted) {
            bgHeader = "bg-emerald-50/10 hover:bg-emerald-50/20";
            textTitle = "text-slate-700";
          } else if (isUpcoming) {
            textTitle = "text-slate-400";
          }

          return (
            <div 
              key={stageKey} 
              id={`stage-${stageKey}`}
              className={`rounded-xl border transition-all overflow-hidden ${
                isCurrent 
                  ? "shadow-md ring-2 ring-indigo-500/10 border-indigo-200" 
                  : "border-slate-150 shadow-sm"
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleStage(stageKey)}
                className={`w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${bgHeader}`}
              >
                <div className="flex items-center gap-3">
                  {/* Status Indicator Icon */}
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    </span>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                  )}

                  <div>
                    <h3 className={`text-sm md:text-base font-bold ${textTitle}`}>
                      {STAGE_LABELS[stageKey]}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {isCompleted && <span className="text-emerald-600">Completed</span>}
                      {isCurrent && <span className="text-indigo-600 font-bold">Current Stage</span>}
                      {isUpcoming && <span className="text-slate-400">Upcoming</span>}
                    </span>
                  </div>
                </div>
                
                <div className="text-slate-400 p-1 hover:text-slate-650">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Steps List */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="border-t border-slate-100 bg-white"
                  >
                    <div className="p-4 space-y-6">
                      {steps.length > 0 ? (
                        steps.map((step, stepIdx) => (
                          <div 
                            key={stepIdx} 
                            className={`pl-4 border-l-2 relative ${
                              isCurrent 
                                ? "border-indigo-400" 
                                : isCompleted 
                                ? "border-emerald-400" 
                                : "border-slate-200"
                            }`}
                          >
                            {/* Step Marker Dot */}
                            <span className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
                              isCurrent 
                                ? "bg-indigo-500" 
                                : isCompleted 
                                ? "bg-emerald-500" 
                                : "bg-slate-300"
                            }`} />

                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h4 className="font-bold text-slate-800 text-sm md:text-base">
                                {step.title}
                              </h4>
                              <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                <Tag className="w-2.5 h-2.5" />
                                {step.type}
                              </span>
                            </div>

                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-2">
                              {step.description}
                            </p>

                            <div className="flex items-center gap-1 text-slate-400 text-[10px] md:text-xs font-semibold">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Duration: {step.duration}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-xs text-slate-400 py-2">
                          No specific milestones recorded for this stage.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
