import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap, 
  Compass, 
  CheckCircle2
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const EDUCATION_LEVELS = [
  { id: 'class-8', name: 'Class 8', desc: 'Middle School foundation and exploratory aptitude' },
  { id: 'class-9', name: 'Class 9', desc: 'Pre-board specialization prep & stream exploration' },
  { id: 'class-10', name: 'Class 10', desc: 'Secondary school milestone & stream choice decision' },
  { id: 'puc', name: 'PUC (11th & 12th)', desc: 'Pre-university science, commerce, and arts streams' },
  { id: 'diploma', name: 'Diploma', desc: 'Vocational, polytechnic & applied technical tracks' },
  { id: 'undergraduate', name: 'Undergraduate', desc: 'College degrees, majors & career placement readiness' }
];

export default function Assessment() {
  const navigate = useNavigate();
  const {
    educationLevel,
    setEducationLevel,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectOption,
    getSelectedOptionsForQuestion,
    resetAssessment,
    selectedQuestions
  } = useAssessment();

  const handleEducationSelect = (level) => {
    setEducationLevel(level);
  };

  const handleContinueToAssessment = () => {
    if (educationLevel) {
      setCurrentQuestionIndex(0);
    }
  };

  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex === selectedQuestions.length - 1;
    if (isLastQuestion) {
      navigate('/loading');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex === 0) {
      setEducationLevel(null);
    } else {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const totalQuestions = selectedQuestions.length;
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const selectedOptions = currentQuestion ? getSelectedOptionsForQuestion(currentQuestionIndex) : [];
  const isMultiple = currentQuestion ? (currentQuestion.questionType || currentQuestion.type) === 'multiple' : false;
  
  // Strict check: must have at least 1 selected option to proceed
  const isNextDisabled = selectedOptions.length === 0;
  
  const progressPercent = totalQuestions > 0 
    ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100) 
    : 0;

  // Global Header
  const renderHeader = () => (
    <header className="flex items-center justify-between py-5 mb-6 border-b border-slate-200/80">
      <div 
        onClick={() => { resetAssessment(); navigate('/'); }} 
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
          <GraduationCap className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none block">
            PathFinder <span className="text-indigo-600">AI</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Career Evaluation</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            resetAssessment();
            navigate('/');
          }}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
        >
          Exit Assessment
        </button>
      </div>
    </header>
  );

  // STAGE 1: Education Selection Panel
  if (!educationLevel) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-between">
        <div>
          {renderHeader()}

          <div className="my-8 text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="indigo" size="md" icon={Compass}>
              Step 1 of 2
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Select Your Education Stage
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
              We personalize your assessment questions, career compatibility standards, and graduation roadmaps based on your current education milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            {EDUCATION_LEVELS.map((level) => {
              const isSelected = educationLevel === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => handleEducationSelect(level.id)}
                  className={`
                    p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer focus:outline-none flex flex-col justify-between
                    ${isSelected
                      ? 'bg-indigo-50/80 border-indigo-600 shadow-md shadow-indigo-100/50 ring-2 ring-indigo-600/30 neu-flat'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80 shadow-soft-sm'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                      {level.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {level.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-end">
          <Button
            size="lg"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            disabled={!educationLevel}
            onClick={handleContinueToAssessment}
          >
            Continue to Assessment
          </Button>
        </div>
      </div>
    );
  }

  // STAGE 2: Assessment Questionnaire Flow (Clean, Centered, Focused)
  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col justify-between">
      <div>
        {renderHeader()}

        {/* Top Progress & Metrics Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft-sm mb-8 neu-flat">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                QUESTION {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {educationLevel.replace('-', ' ').toUpperCase()} STREAM
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
              <span>{progressPercent}% Completed</span>
            </div>
          </div>

          <ProgressBar value={progressPercent} variant="gradient" size="sm" />
        </div>

        {/* Centered Question Card */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-soft-md neu-flat"
            >
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  selectedOptions={selectedOptions}
                  onSelectOption={(optionIdx) => {
                    selectOption(currentQuestionIndex, optionIdx, isMultiple);
                    
                    // Single choice auto-advances after slight visual confirmation
                    if (!isMultiple) {
                      setTimeout(() => {
                        handleNext();
                      }, 300);
                    }
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between gap-4">
        <Button
          variant="secondary"
          size="md"
          icon={ArrowLeft}
          onClick={handlePrev}
        >
          {currentQuestionIndex === 0 ? 'Change Level' : 'Previous'}
        </Button>

        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          disabled={isNextDisabled}
          onClick={handleNext}
          className={isNextDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Analyze My Profile' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
