'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getQuestionsForStage, getStageMeta } from '@/data/assessments';
import { getStoredJourney, getStoredProfile, saveAnswer } from '@/lib/storage';
import { trackEvent } from '@/lib/analytics';
import ProgressBar from '@/components/ProgressBar';
import { EducationStage } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const [stage, setStage] = useState<EducationStage>('college');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const journey = getStoredJourney();
    const currentStage = journey.currentStage || 'college';
    setStage(currentStage);

    trackEvent('assessment_started', { stage: currentStage });

    if (journey.assessmentAnswers) {
      setAnswers(journey.assessmentAnswers);
    }
  }, []);

  const stageMeta = getStageMeta(stage);

  // Active question set for this stage, with lightweight condition filtering if needed
  const activeQuestions = useMemo(() => {
    const rawQuestions = getQuestionsForStage(stage);
    return rawQuestions.filter((q) => {
      if (!q.condition) return true;
      const priorAnswer = answers[q.condition.questionId];
      return priorAnswer === q.condition.answerId;
    });
  }, [stage, answers]);

  const totalQuestions = activeQuestions.length;
  const currentQuestion =
    activeQuestions[currentIndex] || activeQuestions[0] || getQuestionsForStage('college')[0];
  const selectedAnswer = answers[currentQuestion?.id];

  const handleSelectOption = (optionId: string) => {
    if (isTransitioning || !currentQuestion) return;

    // Save answer
    saveAnswer(currentQuestion.id, optionId);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));

    setIsTransitioning(true);

    // Auto advance smoothly after 200ms
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        // Complete! Route to completion screen
        trackEvent('assessment_completed', { stage, answersCount: totalQuestions });
        router.push('/assessment/complete');
      }
    }, 220);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      router.push('/onboarding/intent');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="w-full max-w-lg px-4 py-20 text-center">
        <p className="text-sm text-brand-muted">Loading discovery questions...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
      {/* Header controls: Back + Question Counter */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-brand-border/40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentIndex === 0 ? 'Back' : 'Previous'}</span>
        </button>

        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary-light px-2.5 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3" />
          <span>{stageMeta.badge}</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-8">
        <ProgressBar
          current={currentIndex + 1}
          total={totalQuestions}
          labelPrefix="Question"
        />
      </div>

      {/* Stage Subtitle & Main Question */}
      <div className="text-center w-full mb-8 transition-opacity duration-150">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-subtle block mb-1">
          {stageMeta.heading}
        </span>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight leading-snug">
          {currentQuestion.title}
        </h1>

        {currentQuestion.subtitle && (
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto">
            {currentQuestion.subtitle}
          </p>
        )}
      </div>

      {/* Options List */}
      <div
        className={`w-full space-y-3.5 transition-all duration-200 ${
          isTransitioning ? 'opacity-50 translate-y-1' : 'opacity-100 translate-y-0'
        }`}
      >
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option.id)}
              className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-brand-primary-light/40 border-brand-primary ring-2 ring-brand-primary/20 shadow-xs'
                  : 'bg-white border-brand-border hover:border-brand-primary/50 hover:bg-brand-bg/50 shadow-subtle'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {option.emoji && (
                  <span className="text-xl sm:text-2xl mt-0.5 shrink-0 select-none">
                    {option.emoji}
                  </span>
                )}
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-brand-dark leading-snug">
                    {option.label}
                  </h3>
                  {option.description && (
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Helpful context footnote */}
      <p className="text-xs text-brand-subtle text-center mt-8">
        Single-tap to select. There are no right or wrong answers.
      </p>
    </div>
  );
}
