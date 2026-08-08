'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '@/data/assessment';
import { getStoredJourney, saveAnswer } from '@/lib/storage';
import { trackEvent } from '@/lib/analytics';
import ProgressBar from '@/components/ProgressBar';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    trackEvent('assessment_started');
    const journey = getStoredJourney();
    if (journey.assessmentAnswers) {
      setAnswers(journey.assessmentAnswers);
      // Optional: resume where left off if partial
      const answeredCount = Object.keys(journey.assessmentAnswers).length;
      if (answeredCount > 0 && answeredCount < ASSESSMENT_QUESTIONS.length) {
        setCurrentIndex(answeredCount);
      }
    }
  }, []);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex] || ASSESSMENT_QUESTIONS[0];
  const selectedAnswer = answers[currentQuestion.id];

  const handleSelectOption = (optionId: string) => {
    if (isTransitioning) return;

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
          <span>{currentIndex === 0 ? 'Onboarding' : 'Previous'}</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
          Discovery
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

      {/* Section Subheading & Main Question */}
      <div className="text-center w-full mb-8 transition-opacity duration-150">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-subtle">
          LET’S GET TO KNOW YOU
        </span>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-3 tracking-tight leading-snug">
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
              className={`w-full text-left p-5 rounded-2xl border transition-smooth interactive-card cursor-pointer flex items-center justify-between gap-4 ${
                isSelected
                  ? 'border-brand-primary ring-2 ring-brand-primary/20 bg-brand-primary-light/40'
                  : 'border-brand-border bg-white hover:border-brand-border-hover'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {option.emoji && (
                  <span className="text-2xl select-none shrink-0">{option.emoji}</span>
                )}
                <span className="font-heading font-semibold text-base sm:text-lg text-brand-dark">
                  {option.label}
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-brand-border bg-brand-bg text-transparent'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-brand-subtle text-center">
        Clicking an answer automatically continues to the next question.
      </p>
    </div>
  );
}
