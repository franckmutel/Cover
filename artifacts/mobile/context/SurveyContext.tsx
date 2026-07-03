import React, { createContext, useCallback, useContext, useState } from 'react';
import { ALL_QUESTIONS, MAX_SCORE_PER_THEME, THEMES, getRecommendation } from '@/data/questions';

export type ThemeResult = {
  themeId: number;
  name: string;
  iconName: string;
  color: string;
  score: number;
  maxScore: number;
  percentage: number;
  recommendation: ReturnType<typeof getRecommendation>;
};

type SurveyContextType = {
  answers: Record<number, number>;
  currentQuestionIndex: number;
  surveyCompleted: boolean;
  currentAnswer: number | undefined;
  setAnswer: (questionIndex: number, score: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  completeSurvey: () => void;
  resetSurvey: () => void;
  getThemeResults: () => ThemeResult[];
  totalAnswered: number;
  totalQuestions: number;
  progress: number;
};

const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const totalQuestions = ALL_QUESTIONS.length;
  const totalAnswered = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? totalAnswered / totalQuestions : 0;

  const currentAnswer = answers[currentQuestionIndex];

  const setAnswer = useCallback((questionIndex: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: score }));
  }, []);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  }, [currentQuestionIndex]);

  const completeSurvey = useCallback(() => {
    setSurveyCompleted(true);
  }, []);

  const resetSurvey = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSurveyCompleted(false);
  }, []);

  const getThemeResults = useCallback((): ThemeResult[] => {
    return THEMES.map((theme) => {
      const themeQuestions = theme.questions;
      const score = themeQuestions.reduce((sum, q) => {
        const qIndex = ALL_QUESTIONS.findIndex((aq) => aq.id === q.id);
        return sum + (answers[qIndex] ?? 0);
      }, 0);
      const percentage = Math.round((score / MAX_SCORE_PER_THEME) * 100);
      return {
        themeId: theme.id,
        name: theme.name,
        iconName: theme.iconName,
        color: theme.color,
        score,
        maxScore: MAX_SCORE_PER_THEME,
        percentage,
        recommendation: getRecommendation(theme.id, percentage),
      };
    });
  }, [answers]);

  return (
    <SurveyContext.Provider
      value={{
        answers,
        currentQuestionIndex,
        surveyCompleted,
        currentAnswer,
        setAnswer,
        goToNextQuestion,
        goToPreviousQuestion,
        completeSurvey,
        resetSurvey,
        getThemeResults,
        totalAnswered,
        totalQuestions,
        progress,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurvey must be used within SurveyProvider');
  return ctx;
}
