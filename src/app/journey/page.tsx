'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Compass,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Bookmark,
  PlayCircle,
  TrendingUp,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { getStoredJourney, resetJourney } from '@/lib/storage';
import { CAREERS, EXPLORATION_AREAS } from '@/data/careers';
import { Career, CareerMilestone } from '@/types';
import { trackEvent } from '@/lib/analytics';

export default function MyJourneyPage() {
  const router = useRouter();
  const [activeCareer, setActiveCareer] = useState<Career | null>(null);
  const [savedCareers, setSavedCareers] = useState<Career[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackEvent('journey_viewed');
    const journey = getStoredJourney();
    setCompletedSteps(journey.completedStepIds || []);

    const saved = CAREERS.filter((c) => (journey.savedCareerIds || []).includes(c.id));
    setSavedCareers(saved);

    if (journey.activeCareerId) {
      const found = CAREERS.find((c) => c.id === journey.activeCareerId);
      if (found) {
        setActiveCareer(found);
      }
    } else if (saved.length > 0) {
      setActiveCareer(saved[0]);
    } else {
      setActiveCareer(CAREERS[0]);
    }

    setIsLoading(false);
  }, []);

  if (isLoading || !activeCareer) {
    return (
      <div className="w-full max-w-lg px-4 py-20 text-center">
        <p className="text-sm text-brand-muted">Loading your exploration journey...</p>
      </div>
    );
  }

  const firstStep: CareerMilestone = activeCareer.nextSteps[0] || {
    id: `${activeCareer.id}-step-1`,
    title: `Explore what ${activeCareer.title}s actually do`,
    description: 'Spend 5 minutes testing if you enjoy this kind of problem solving before committing.',
    durationMinutes: 5,
  };

  const isFirstStepCompleted = completedSteps.includes(firstStep.id);

  return (
    <div className="w-full max-w-xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* 🧭 PHILOSOPHY BANNER: "YOU DON'T HAVE TO DECIDE TODAY" */}
      <div className="w-full text-center bg-gradient-to-b from-brand-primary-light/40 to-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-xs mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-brand-primary text-xs font-bold mb-3 shadow-2xs">
          <Compass className="w-3.5 h-3.5" />
          <span>Exploration Mindset</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight leading-tight">
          YOU DON’T HAVE TO DECIDE TODAY.
        </h1>

        <p className="text-sm sm:text-base text-brand-muted mt-3 max-w-md mx-auto leading-relaxed">
          Your next step isn’t locking into a single career forever. It’s learning enough about yourself and the world through quick experiments to make a better choice.
        </p>

        {/* Exploration Metric Pills */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-brand-border/60 text-center">
          <div className="p-2 rounded-xl bg-white border border-brand-border/60">
            <span className="block text-base font-extrabold text-brand-dark">6</span>
            <span className="text-[11px] text-brand-subtle font-medium">Directions</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-brand-border/60">
            <span className="block text-base font-extrabold text-brand-primary">
              {completedSteps.length > 0 ? completedSteps.length : '1'}
            </span>
            <span className="text-[11px] text-brand-subtle font-medium">Experiences</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-brand-border/60">
            <span className="block text-base font-extrabold text-emerald-600">
              {savedCareers.length > 0 ? savedCareers.length : '3'}
            </span>
            <span className="text-[11px] text-brand-subtle font-medium">Shortlisted</span>
          </div>
        </div>
      </div>

      {/* 🌟 NEXT 5-MINUTE EXPERIMENTAL STEP */}
      <div className="w-full mb-8">
        <div className="text-left mb-2.5 flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRY THE EXPERIENCE</span>
          </span>
          <span className="text-xs font-semibold text-brand-subtle">
            ~5 min activity
          </span>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-brand-primary/40 shadow-lift flex flex-col gap-4 relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                {activeCareer.emoji} {activeCareer.title}
              </span>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-dark mt-1 leading-snug">
                {firstStep.title}
              </h2>
              <p className="text-sm text-brand-muted mt-2 leading-relaxed">
                {firstStep.description}
              </p>
            </div>
          </div>

          {isFirstStepCompleted ? (
            <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulation completed</span>
              </div>
              <Link
                href={`/journey/step/${firstStep.id}`}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-bg hover:bg-brand-border/60 text-brand-dark text-xs font-semibold transition-colors text-center"
              >
                Retake simulation
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href={`/journey/step/${firstStep.id}`}
                className="w-full py-3.5 px-5 rounded-xl bg-brand-primary text-white font-semibold text-sm shadow-sm hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Launch 5-Minute Challenge</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 📋 SHORTLISTED PATHS WORTH EXPLORING */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-brand-dark flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-primary" />
            <span>YOUR CURRENT EXPLORATION PATHS</span>
          </h2>
          <Link
            href="/explore"
            className="text-xs font-bold text-brand-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Browse All Map</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {(savedCareers.length > 0 ? savedCareers : CAREERS.slice(0, 3)).map((career) => (
            <div
              key={career.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-border hover:border-brand-primary/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-xl shrink-0">
                  {career.emoji}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-brand-dark">
                    {career.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-1">
                    {career.oneLiner}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Link
                  href={`/careers/${career.id}`}
                  className="px-3 py-1.5 rounded-lg bg-brand-bg text-brand-dark text-xs font-semibold hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Understand Path
                </Link>
                <Link
                  href={`/careers/${career.id}/path`}
                  className="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:bg-brand-primary-hover transition-colors inline-flex items-center gap-1"
                >
                  <span>Experience</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔄 RESET / EXPLORE AGAIN */}
      <div className="w-full pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            if (confirm('Start a fresh exploration journey?')) {
              resetJourney();
              router.push('/onboarding/stage');
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-red-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset and start fresh</span>
        </button>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary hover:underline"
        >
          <span>Explore another direction</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
