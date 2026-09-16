import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, CheckCircle2, Circle, ChevronDown, ChevronUp, Milestone, Sparkles } from 'lucide-react';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';

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
  educationLevel = "undergraduate"
}) {
  const getStageKey = (edu) => {
    if (!edu) return 'undergraduate';
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
        return 'undergraduate';
    }
  };

  const currentStage = getStageKey(educationLevel);
  const currentStageIndex = Math.max(0, STAGE_ORDER.indexOf(currentStage));

  const [expandedStages, setExpandedStages] = useState({
    [currentStage]: true
  });

  useEffect(() => {
    setExpandedStages((prev) => ({
      ...prev,
      [currentStage]: true
    }));
  }, [currentStage]);

  const toggleStage = (stage) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stage]: !prev[stage]
    }));
  };

  const totalStages = STAGE_ORDER.length;
  const completedCount = currentStageIndex;
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Milestone className="w-5 h-5 text-indigo-600" />
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
              Chronological Roadmap
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Education & Skill Progression
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active level: <strong className="text-slate-800 uppercase">{educationLevel ? educationLevel.replace('-', ' ') : 'Undergraduate'}</strong>
          </p>
        </div>

        <Badge variant="indigo" size="sm">
          {completedCount} / {totalStages} Stages Cleared
        </Badge>
      </div>

      {/* Progress Track */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>Overall Progression</span>
          <span className="font-mono text-indigo-600 font-bold">{progressPercent}%</span>
        </div>
        <ProgressBar value={progressPercent} variant="gradient" size="sm" />
      </div>

      {/* Stages Accordion List */}
      <div className="space-y-4">
        {STAGE_ORDER.map((stageKey, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = idx > currentStageIndex;
          const steps = roadmaps[stageKey] || [];
          const isOpen = !!expandedStages[stageKey];

          return (
            <div
              key={stageKey}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isCurrent
                  ? 'border-indigo-200 bg-indigo-50/20 shadow-soft-sm ring-1 ring-indigo-500/20'
                  : isCompleted
                  ? 'border-emerald-200/60 bg-white'
                  : 'border-slate-200/80 bg-white'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleStage(stageKey)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer hover:bg-slate-50/80"
              >
                <div className="flex items-center gap-3.5">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 shrink-0">
                      <Circle className="w-4 h-4" />
                    </div>
                  )}

                  <div>
                    <h3 className={`text-sm sm:text-base font-bold ${
                      isCurrent ? 'text-indigo-950 font-extrabold' : isCompleted ? 'text-slate-800' : 'text-slate-500'
                    }`}>
                      {STAGE_LABELS[stageKey]}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {isCompleted && <span className="text-emerald-600">Completed Milestone</span>}
                      {isCurrent && <span className="text-indigo-600">Active Academic Stage</span>}
                      {isUpcoming && <span className="text-slate-400">Future Milestone</span>}
                    </span>
                  </div>
                </div>

                <div className="text-slate-400 p-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Steps Timeline Details */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-100 bg-white"
                  >
                    <div className="p-5 sm:p-6 space-y-6">
                      {steps.length > 0 ? (
                        steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className={`pl-4 border-l-2 relative space-y-1.5 ${
                              isCurrent ? 'border-indigo-400' : isCompleted ? 'border-emerald-400' : 'border-slate-200'
                            }`}
                          >
                            <span
                              className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
                                isCurrent ? 'bg-indigo-600' : isCompleted ? 'bg-emerald-500' : 'bg-slate-300'
                              }`}
                            />

                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                                {step.title}
                              </h4>
                              {step.type && (
                                <Badge variant="slate" size="sm">
                                  {step.type}
                                </Badge>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {step.description}
                            </p>

                            {step.duration && (
                              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 pt-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>Duration: {step.duration}</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-2">
                          Standard curriculum & self-study milestone track.
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
