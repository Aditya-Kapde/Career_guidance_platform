import React, { createContext, useContext, useState, useEffect } from 'react';
import questionsData from '../data/questions.json';

const QUESTIONS = questionsData.questions;

const INITIAL_TRAIT_SCORES = {
  logicalThinking: 0,
  problemSolving: 0,
  creativity: 0,
  leadership: 0,
  communication: 0,
  curiosity: 0,
  teamwork: 0,
  decisionMaking: 0,
  adaptability: 0,
  planning: 0,
  attentionToDetail: 0,
  riskTaking: 0,
  analyticalThinking: 0,
  empathy: 0,
  learningStyle: 0
};

const AssessmentContext = createContext(null);

const selectRandomQuestions = (allQuestions) => {
  if (!allQuestions || allQuestions.length === 0) return [];

  const interestQuestions = allQuestions.filter(q => q.category === 'interest');
  const behaviourQuestions = allQuestions.filter(q => q.category === 'behaviour');
  const aptitudeQuestions = allQuestions.filter(q => q.category === 'aptitude');

  const selectRandomFromCategory = (categoryQuestions, count) => {
    const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const selectedInterest = selectRandomFromCategory(interestQuestions, 4);
  const selectedBehaviour = selectRandomFromCategory(behaviourQuestions, 4);
  const selectedAptitude = selectRandomFromCategory(aptitudeQuestions, 4);

  const interleaved = [];
  for (let i = 0; i < 4; i++) {
    if (selectedInterest[i]) interleaved.push(selectedInterest[i]);
    if (selectedBehaviour[i]) interleaved.push(selectedBehaviour[i]);
    if (selectedAptitude[i]) interleaved.push(selectedAptitude[i]);
  }
  return interleaved;
};

export function AssessmentProvider({ children }) {
  const [educationLevel, setEducationLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({}); // e.g., { 0: [1], 1: [0, 2] }
  const [traitScores, setTraitScores] = useState(INITIAL_TRAIT_SCORES);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [assessmentReport, setAssessmentReport] = useState(null);

  useEffect(() => {
    if (educationLevel) {
      setSelectedQuestions(selectRandomQuestions(QUESTIONS));
    } else {
      setSelectedQuestions([]);
    }
  }, [educationLevel]);

  useEffect(() => {
    const newScores = { ...INITIAL_TRAIT_SCORES };
    
    Object.keys(responses).forEach((qIdxStr) => {
      const qIdx = parseInt(qIdxStr, 10);
      const question = selectedQuestions[qIdx];
      if (!question) return;

      const selectedOptionIndexes = responses[qIdx] || [];
      selectedOptionIndexes.forEach((optIdx) => {
        const option = question.options[optIdx];
        if (option && option.traitScores) {
          Object.keys(option.traitScores).forEach((trait) => {
            if (trait in newScores) {
              newScores[trait] += option.traitScores[trait];
            }
          });
        }
      });
    });

    setTraitScores(newScores);
  }, [responses, selectedQuestions]);
  
  const selectOption = (questionIndex, optionIndex, isMultipleChoice) => {
    setResponses((prev) => {
      const currentSelections = prev[questionIndex] || [];
      if (isMultipleChoice) {
        if (currentSelections.includes(optionIndex)) {
          // Remove if already selected
          return {
            ...prev,
            [questionIndex]: currentSelections.filter((i) => i !== optionIndex),
          };
        } else {
          // Add to selections
          return {
            ...prev,
            [questionIndex]: [...currentSelections, optionIndex],
          };
        }
      } else {
        // Single choice - replace selection
        return {
          ...prev,
          [questionIndex]: [optionIndex],
        };
      }
    });
  };

  const resetAssessment = () => {
    setEducationLevel(null);
    setCurrentQuestionIndex(0);
    setResponses({});
    setTraitScores(INITIAL_TRAIT_SCORES);
    setSelectedQuestions([]);
    setAssessmentReport(null);
  };

  const getSelectedOptionsForQuestion = (questionIndex) => {
    return responses[questionIndex] || [];
  };

  return (
    <AssessmentContext.Provider
      value={{
        educationLevel,
        setEducationLevel,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        responses,
        setResponses,
        traitScores,
        selectedQuestions,
        assessmentReport,
        setAssessmentReport,
        selectOption,
        getSelectedOptionsForQuestion,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
