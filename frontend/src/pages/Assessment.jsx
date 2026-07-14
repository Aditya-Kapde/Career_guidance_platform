import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, GraduationCap, Cpu } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import QuestionCard from '../components/QuestionCard';

const EDUCATION_LEVELS = [
  { id: 'class-8', name: 'Class 8', desc: 'Middle School foundation' },
  { id: 'class-9', name: 'Class 9', desc: 'Pre-board specialization prep' },
  { id: 'class-10', name: 'Class 10', desc: 'Secondary school milestone' },
  { id: 'puc', name: 'PUC (11th & 12th)', desc: 'Pre-university course streams' },
  { id: 'diploma', name: 'Diploma', desc: 'Vocational & technical tracks' },
  { id: 'undergraduate', name: 'Undergraduate', desc: 'College degrees & certifications' }
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
    responses,
    traitScores,
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
      const payload = {
        educationLevel,
        responses,
        traitScores
      };
      console.log("Assessment completed payload details:", payload);
      navigate('/loading');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex === 0) {
      setEducationLevel(null); // return to education select stage
    } else {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // State calculations
  const totalQuestions = selectedQuestions.length;
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const selectedOptions = currentQuestion ? getSelectedOptionsForQuestion(currentQuestionIndex) : [];
  const isNextDisabled = selectedOptions.length === 0;
  const progressPercent = currentQuestion 
    ? Math.round((currentQuestionIndex / totalQuestions) * 100) 
    : 0;

  // Header render helper
  const renderHeader = () => (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-indigo-650 rounded-lg text-white">
          <Cpu className="w-5 h-5" />
        </div>
        <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-650">
          PathFinder AI
        </span>
      </div>
      <button 
        onClick={() => { resetAssessment(); navigate('/'); }}
        className="text-xs font-semibold text-slate-500 hover:text-rose-500 transition-colors"
      >
        Cancel
      </button>
    </header>
  );

  // STAGE 1: Education Selection Panel
  if (!educationLevel) {
    return (
      <div className="min-h-screen py-8 px-6 flex flex-col justify-between max-w-lg mx-auto">
        <div>
          {renderHeader()}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              Select your current education level
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              We personalize your assessment and recommendation schema based on your current education level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EDUCATION_LEVELS.map((level) => {
              const isSelected = educationLevel === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => handleEducationSelect(level.id)}
                  className={`p-4 rounded-xl text-left border transition-all duration-150 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-sm shadow-indigo-100/30 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-1.5">
                    <GraduationCap className={`w-5 h-5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {level.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{level.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-4">
          <button
            onClick={handleContinueToAssessment}
            disabled={!educationLevel}
            className={`w-full py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center space-x-2 ${
              educationLevel
                ? 'bg-gradient-to-r from-indigo-600 to-purple-650 text-white shadow-lg shadow-indigo-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Continue to Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // STAGE 2: Assessment Questionnaire Flow
  return (
    <div className="min-h-screen py-8 px-6 flex flex-col justify-between max-w-lg mx-auto">
      <div>
        {renderHeader()}

        {/* Progress Bar & Status */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-150 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-indigo-650 to-purple-650"
            />
          </div>
        </div>

        {/* Interactive Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="glassmorphism p-6 md:p-8 rounded-xl-card shadow-lg shadow-slate-100 border border-slate-150"
          >
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                selectedOptions={selectedOptions}
                onSelectOption={(optionIdx) =>
                  selectOption(currentQuestionIndex, optionIdx, (currentQuestion.questionType || currentQuestion.type) === 'multiple')
                }
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center gap-4 mt-8 pt-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 font-semibold text-slate-700 text-sm flex items-center justify-center space-x-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all ${
            !isNextDisabled
              ? 'bg-gradient-to-r from-indigo-600 to-purple-650 text-white shadow-md shadow-indigo-100'
              : 'bg-slate-250 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <span>
            {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
