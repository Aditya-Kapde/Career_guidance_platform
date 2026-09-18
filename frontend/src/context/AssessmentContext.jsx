import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import questionsData from '../data/questions.json';

const ALL_QUESTIONS = questionsData.questions || [];
const IMMUTABLE_QUESTION_IDS = ALL_QUESTIONS.map((q) => q.id);

const STORAGE_KEY = 'pathfinder_assessment_session';

const getInitialSession = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (err) {
    console.warn('Error reading assessment session from storage:', err);
  }
  return null;
};

const persistSession = (session) => {
  try {
    if (!session) {
      sessionStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } else {
      const serialized = JSON.stringify(session);
      sessionStorage.setItem(STORAGE_KEY, serialized);
      localStorage.setItem(STORAGE_KEY, serialized);
    }
  } catch (err) {
    console.warn('Error writing assessment session to storage:', err);
  }
};

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const initialSession = useMemo(() => getInitialSession(), []);

  const [educationLevel, setEducationLevelState] = useState(() => initialSession?.educationLevel || null);
  const [currentQuestionId, setCurrentQuestionId] = useState(() => {
    if (initialSession?.currentQuestionId && IMMUTABLE_QUESTION_IDS.includes(initialSession.currentQuestionId)) {
      return initialSession.currentQuestionId;
    }
    return IMMUTABLE_QUESTION_IDS[0] || null;
  });
  const [answers, setAnswers] = useState(() => initialSession?.answers || {});
  const [assessmentReport, setAssessmentReport] = useState(() => initialSession?.assessmentReport || null);
  const [reportId, setReportId] = useState(() => initialSession?.reportId || null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Filter questions for the selected education stage if applicable, or full canonical sequence
  const activeQuestions = useMemo(() => {
    if (!educationLevel) return ALL_QUESTIONS;
    return ALL_QUESTIONS.filter((q) => {
      if (!q.educationLevels || q.educationLevels.length === 0) return true;
      return q.educationLevels.includes(educationLevel);
    });
  }, [educationLevel]);

  const activeQuestionIds = useMemo(() => {
    return activeQuestions.map((q) => q.id);
  }, [activeQuestions]);

  // Current Question Index derived safely from currentQuestionId
  const currentQuestionIndex = useMemo(() => {
    if (!currentQuestionId) return 0;
    const idx = activeQuestionIds.indexOf(currentQuestionId);
    return idx >= 0 ? idx : 0;
  }, [currentQuestionId, activeQuestionIds]);

  const currentQuestion = useMemo(() => {
    if (!currentQuestionId) return activeQuestions[0] || null;
    return activeQuestions.find((q) => q.id === currentQuestionId) || activeQuestions[0] || null;
  }, [currentQuestionId, activeQuestions]);

  // Sync state to storage
  useEffect(() => {
    if (educationLevel || Object.keys(answers).length > 0 || reportId || assessmentReport) {
      persistSession({
        educationLevel,
        currentQuestionId,
        answers,
        assessmentReport,
        reportId,
        updatedAt: new Date().toISOString()
      });
    }
  }, [educationLevel, currentQuestionId, answers, assessmentReport, reportId]);

  const setEducationLevel = useCallback((level) => {
    setEducationLevelState(level);
    if (level && activeQuestionIds.length > 0) {
      setCurrentQuestionId((prev) => (activeQuestionIds.includes(prev) ? prev : activeQuestionIds[0]));
    }
  }, [activeQuestionIds]);

  // Option selection keyed strictly by questionId
  const selectOption = useCallback((qId, optionId, isMultiple = false) => {
    if (!qId || !optionId) return;

    setAnswers((prev) => {
      const currentSelected = prev[qId] || [];
      if (isMultiple) {
        const next = currentSelected.includes(optionId)
          ? currentSelected.filter((id) => id !== optionId)
          : [...currentSelected, optionId];
        return {
          ...prev,
          [qId]: next
        };
      } else {
        return {
          ...prev,
          [qId]: [optionId]
        };
      }
    });
  }, []);

  const getSelectedOptionsForQuestionId = useCallback((qId) => {
    if (!qId) return [];
    return answers[qId] || [];
  }, [answers]);

  const goToNextQuestion = useCallback(() => {
    if (isNavigating) return false;
    setIsNavigating(true);

    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < activeQuestionIds.length) {
      const nextId = activeQuestionIds[nextIdx];
      setCurrentQuestionId(nextId);
    }

    setTimeout(() => setIsNavigating(false), 150);
    return nextIdx >= activeQuestionIds.length; // returns true if reached the end
  }, [currentQuestionIndex, activeQuestionIds, isNavigating]);

  const goToPrevQuestion = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);

    if (currentQuestionIndex > 0) {
      const prevId = activeQuestionIds[currentQuestionIndex - 1];
      setCurrentQuestionId(prevId);
    } else {
      // Return to education level selection
      setEducationLevelState(null);
    }

    setTimeout(() => setIsNavigating(false), 150);
  }, [currentQuestionIndex, activeQuestionIds, isNavigating]);

  const goToQuestionById = useCallback((qId) => {
    if (activeQuestionIds.includes(qId)) {
      setCurrentQuestionId(qId);
    }
  }, [activeQuestionIds]);

  const getDetailedResponses = useCallback(() => {
    const detailed = [];
    Object.entries(answers).forEach(([qId, optionIds]) => {
      if (Array.isArray(optionIds)) {
        optionIds.forEach((optId) => {
          detailed.push({
            questionId: qId,
            selectedOptionId: optId
          });
        });
      }
    });
    return detailed;
  }, [answers]);

  const resetAssessment = useCallback(() => {
    setEducationLevelState(null);
    setCurrentQuestionId(IMMUTABLE_QUESTION_IDS[0] || null);
    setAnswers({});
    setAssessmentReport(null);
    setReportId(null);
    persistSession(null);
  }, []);

  return (
    <AssessmentContext.Provider
      value={{
        educationLevel,
        setEducationLevel,
        currentQuestionId,
        currentQuestionIndex,
        currentQuestion,
        totalQuestions: activeQuestions.length,
        selectedQuestions: activeQuestions,
        answers,
        selectOption,
        getSelectedOptionsForQuestionId,
        goToNextQuestion,
        goToPrevQuestion,
        goToQuestionById,
        getDetailedResponses,
        resetAssessment,
        assessmentReport,
        setAssessmentReport,
        reportId,
        setReportId,
        isNavigating
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
