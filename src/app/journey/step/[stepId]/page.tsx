'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Lightbulb, HelpCircle } from 'lucide-react';
import { CAREERS } from '@/data/careers';
import { getSimulationForCareer } from '@/data/activities';
import { getStoredJourney, completeStep } from '@/lib/storage';
import { trackEvent } from '@/lib/analytics';
import { Career } from '@/types';

interface StepActivityPageProps {
  params: Promise<{
    stepId: string;
  }>;
}

export default function StepActivityPage({ params }: StepActivityPageProps) {
  const router = useRouter();
  const { stepId } = use(params);
  const [activeCareer, setActiveCareer] = useState<Career | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);

  useEffect(() => {
    const journey = getStoredJourney();
    let career = CAREERS.find((c) => c.id === journey.activeCareerId);

    if (!career) {
      career = CAREERS.find((c) => c.nextSteps.some((s) => s.id === stepId)) || CAREERS[0];
    }

    setActiveCareer(career);
    if (career) {
      trackEvent('experience_started', { careerId: career.id, stepId });
    }
  }, [stepId]);

  if (!activeCareer) {
    return (
      <div className="w-full max-w-lg px-4 py-20 text-center">
        <p className="text-sm text-brand-muted">Loading activity...</p>
      </div>
    );
  }

  const milestone =
    activeCareer.nextSteps.find((s) => s.id === stepId) || activeCareer.nextSteps[0];

  const simulation = getSimulationForCareer(activeCareer.id);

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSelectReflection = (choice: string) => {
    setReflectionAnswer(choice);
    trackEvent('experience_enjoyed', {
      careerId: activeCareer.id,
      choice,
      optionSelected: selectedOption,
    });
  };

  const handleComplete = () => {
    trackEvent('experience_completed', {
      careerId: activeCareer.id,
      reflection: reflectionAnswer,
      decision: selectedOption,
    });
    completeStep(milestone.id);
    router.push('/journey/next');
  };

  return (
    <div className="w-full max-w-xl px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>My Journey</span>
        </Link>
      </div>

      {/* Screen Header */}
      <div className="text-center w-full mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary-light text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
          <span>{activeCareer.emoji}</span>
          <span>Try {activeCareer.title} for 5 minutes</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight">
          Experience the Work
        </h1>
        <p className="text-sm text-brand-muted mt-2">
          Instead of just reading descriptions, test how you feel making a real decision.
        </p>
      </div>

      {/* Interactive Micro-Simulation Card */}
      <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-subtle mb-6">
        {/* Scenario Header */}
        <div className="mb-5 pb-5 border-b border-brand-border/60">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-subtle block mb-1">
            THE SCENARIO
          </span>
          <p className="text-base sm:text-lg font-heading font-semibold text-brand-dark leading-relaxed">
            {simulation.scenario}
          </p>
        </div>

        {/* Question */}
        <div className="mb-4">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-primary block mb-2">
            YOUR DECISION
          </span>
          <h2 className="text-sm sm:text-base font-medium text-brand-dark">
            {simulation.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mt-4">
          {simulation.options.map((option) => {
            const isChosen = selectedOption === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-4 rounded-2xl text-left border transition-all ${
                  isChosen
                    ? 'bg-brand-primary-light/40 border-brand-primary ring-2 ring-brand-primary/20'
                    : 'bg-brand-bg/40 border-brand-border hover:border-brand-primary/50 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-brand-dark">
                      {option.label}
                    </h3>
                    {option.rationale && (
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        {option.rationale}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isChosen
                        ? 'bg-brand-primary border-brand-primary text-white'
                        : 'border-brand-border bg-white'
                    }`}
                  >
                    {isChosen && <CheckCircle2 className="w-4 h-4 text-white stroke-[3]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Micro-Feedback after decision */}
        {selectedOption && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 animate-in fade-in-50 duration-200">
            <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
              ✨ <span className="font-bold">Interesting!</span> {simulation.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Reflection Step (Unlocked after decision) */}
      {selectedOption && (
        <div className="w-full bg-brand-bg p-6 sm:p-7 rounded-3xl border border-brand-border shadow-xs mb-8 animate-in fade-in-50 duration-300">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-primary block mb-1">
            MOMENT OF HONESTY
          </span>
          <h2 className="font-heading font-bold text-base text-brand-dark mb-4">
            Did you enjoy thinking through this kind of problem?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleSelectReflection('yes')}
              className={`py-3.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                reflectionAnswer === 'yes'
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm ring-2 ring-brand-primary/20'
                  : 'bg-white text-brand-dark border-brand-border hover:border-brand-primary'
              }`}
            >
              😊 Yes, loved it
            </button>
            <button
              type="button"
              onClick={() => handleSelectReflection('maybe')}
              className={`py-3.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                reflectionAnswer === 'maybe'
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm ring-2 ring-brand-primary/20'
                  : 'bg-white text-brand-dark border-brand-border hover:border-brand-primary'
              }`}
            >
              🤔 Maybe, curious
            </button>
            <button
              type="button"
              onClick={() => handleSelectReflection('not_really')}
              className={`py-3.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                reflectionAnswer === 'not_really'
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm ring-2 ring-brand-primary/20'
                  : 'bg-white text-brand-dark border-brand-border hover:border-brand-primary'
              }`}
            >
              😐 Not really
            </button>
          </div>

          {reflectionAnswer && (
            <p className="text-xs text-brand-muted mt-3 text-center italic">
              {reflectionAnswer === 'yes' && '🌟 Great signal! This path might be a natural fit.'}
              {reflectionAnswer === 'maybe' && '🌱 Helpful feedback! You can try more activities to be sure.'}
              {reflectionAnswer === 'not_really' && '💡 Valuable learning! Crossing off what you dislike is huge progress.'}
            </p>
          )}
        </div>
      )}

      {/* Completion CTA */}
      <div className="w-full">
        <button
          type="button"
          disabled={!selectedOption || !reflectionAnswer}
          onClick={handleComplete}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-base sm:text-lg transition-all flex items-center justify-center gap-3 ${
            selectedOption && reflectionAnswer
              ? 'bg-brand-primary text-white shadow-md hover:bg-brand-primary-hover transform hover:-translate-y-0.5 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Complete This Step</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
        {(!selectedOption || !reflectionAnswer) && (
          <p className="text-xs text-brand-subtle text-center mt-2">
            Make your choice and share your reflection above to finish.
          </p>
        )}
      </div>
    </div>
  );
}
