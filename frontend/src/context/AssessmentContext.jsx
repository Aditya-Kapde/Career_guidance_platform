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

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`pathfinder_${key}`);
    if (item === null || item === undefined) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading pathfinder_${key} from localStorage:`, err);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(`pathfinder_${key}`);
    } else {
      localStorage.setItem(`pathfinder_${key}`, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`Error writing pathfinder_${key} to localStorage:`, err);
  }
};

const AssessmentContext = createContext(null);

const selectRandomQuestions = (allQuestions) => {
  if (!allQuestions || allQuestions.length === 0) return [];
  // Return shuffled questions for assessment (up to 40)
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 40);
};

export function AssessmentProvider({ children }) {
  const [educationLevel, setEducationLevel] = useState(() => getStored('educationLevel', null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => getStored('currentQuestionIndex', 0));
  const [responses, setResponses] = useState(() => getStored('responses', {}));
  const [traitScores, setTraitScores] = useState(() => getStored('traitScores', INITIAL_TRAIT_SCORES));
  const [selectedQuestions, setSelectedQuestions] = useState(() => getStored('selectedQuestions', []));
  const [assessmentReport, setAssessmentReport] = useState(() => getStored('assessmentReport', null));
  const [reportId, setReportId] = useState(() => getStored('reportId', null));

  // Sync state to localStorage whenever values change
  useEffect(() => {
    setStored('educationLevel', educationLevel);
  }, [educationLevel]);

  useEffect(() => {
    setStored('currentQuestionIndex', currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    setStored('responses', responses);
  }, [responses]);

  useEffect(() => {
    setStored('traitScores', traitScores);
  }, [traitScores]);

  useEffect(() => {
    setStored('selectedQuestions', selectedQuestions);
  }, [selectedQuestions]);

  useEffect(() => {
    setStored('assessmentReport', assessmentReport);
  }, [assessmentReport]);

  useEffect(() => {
    setStored('reportId', reportId);
  }, [reportId]);

  // If educationLevel is chosen and no questions are selected yet, pick them
  useEffect(() => {
    if (educationLevel) {
      setSelectedQuestions((prev) => {
        if (prev && prev.length > 0) return prev;
        return selectRandomQuestions(QUESTIONS);
      });
    }
  }, [educationLevel]);

  // Recalculate trait scores dynamically from responses & selected questions
  useEffect(() => {
    if (!selectedQuestions || selectedQuestions.length === 0) return;
    if (Object.keys(responses).length === 0) return;

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
    setReportId(null);

    // Clear all localStorage keys
    [
      'educationLevel',
      'currentQuestionIndex',
      'responses',
      'traitScores',
      'selectedQuestions',
      'assessmentReport',
      'reportId'
    ].forEach((k) => {
      localStorage.removeItem(`pathfinder_${k}`);
    });
  };

  const getSelectedOptionsForQuestion = (questionIndex) => {
    return responses[questionIndex] || [];
  };

  const getDetailedResponses = () => {
    const detailed = [];
    Object.keys(responses).forEach((qIdxStr) => {
      const qIdx = parseInt(qIdxStr, 10);
      const question = selectedQuestions[qIdx];
      if (!question) return;

      const selectedOptionIndexes = responses[qIdx] || [];
      selectedOptionIndexes.forEach((optIdx) => {
        const option = question.options[optIdx];
        if (option) {
          detailed.push({
            questionId: question.id,
            selectedOptionId: option.id
          });
        }
      });
    });
    return detailed;
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
        reportId,
        setReportId,
        selectOption,
        getSelectedOptionsForQuestion,
        getDetailedResponses,
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
