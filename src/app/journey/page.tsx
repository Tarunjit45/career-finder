'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Compass, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { getStoredJourney, resetJourney } from '@/lib/storage';
import { CAREERS } from '@/data/careers';
import { Career, CareerMilestone } from '@/types';
import { trackEvent } from '@/lib/analytics';
import JourneyTimeline from '@/components/JourneyTimeline';

export default function MyJourneyPage() {
  const router = useRouter();
  const [activeCareer, setActiveCareer] = useState<Career | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackEvent('journey_viewed');
    const journey = getStoredJourney();
    setCompletedSteps(journey.completedStepIds || []);

    if (journey.activeCareerId) {
      const found = CAREERS.find((c) => c.id === journey.activeCareerId);
      if (found) {
        setActiveCareer(found);
      }
    } else if (journey.savedCareerIds?.length > 0) {
      const found = CAREERS.find((c) => c.id === journey.savedCareerIds[0]);
      if (found) {
        setActiveCareer(found);
      }
    } else {
      // Default to AI Engineer for instant graceful demo if none selected
      setActiveCareer(CAREERS[0]);
    }

    setIsLoading(false);
  }, []);

  if (isLoading || !activeCareer) {
    return (
      <div className="w-full max-w-lg px-4 py-20 text-center">
        <p className="text-sm text-brand-muted">Loading your journey...</p>
      </div>
    );
  }

  const firstStep: CareerMilestone = activeCareer.nextSteps[0] || {
    id: `${activeCareer.id}-step-1`,
    title: `Explore what ${activeCareer.title}s actually do`,
    description: 'Before learning anything, understand what this career actually looks like day-to-day.',
    durationMinutes: 5,
  };

  const isFirstStepCompleted = completedSteps.includes(firstStep.id);

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Header */}
      <div className="text-center w-full mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          MY JOURNEY
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight flex items-center justify-center gap-2">
          <span>{activeCareer.emoji}</span>
          <span>{activeCareer.title.toUpperCase()}</span>
        </h1>
        <p className="text-sm text-brand-muted mt-1.5">
          You’re currently exploring this path.
        </p>
      </div>

      {/* 🌟 MOST PROMINENT ELEMENT: "YOUR NEXT STEP" CARD */}
      <div className="w-full mb-10">
        <div className="text-left mb-2.5 flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR NEXT STEP</span>
          </span>
          <span className="text-xs font-semibold text-brand-subtle">
            ~5 min activity
          </span>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-brand-primary/40 shadow-lift flex flex-col gap-4 relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-dark leading-snug">
                {firstStep.title}
              </h2>
              <p className="text-sm text-brand-muted mt-2 leading-relaxed">
                {firstStep.description}
              </p>
            </div>
          </div>

          {isFirstStepCompleted ? (
            <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Completed</span>
              </span>
              <Link
                href={`/journey/step/${firstStep.id}`}
                className="text-xs font-semibold text-brand-primary hover:underline"
              >
                Review Activity →
              </Link>
            </div>
          ) : (
            <div className="pt-2">
              <Link
                href={`/journey/step/${firstStep.id}`}
                className="w-full py-3.5 px-5 rounded-xl bg-brand-primary text-white font-semibold text-base shadow-md hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Start Next Step</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Long-term vertical path */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-3xl border border-brand-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-dark">
            YOUR PATH
          </h2>
          <span className="text-xs text-brand-subtle">
            Stage 2 of 7
          </span>
        </div>

        <JourneyTimeline currentStageName="Explore" />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 w-full flex items-center justify-between text-xs text-brand-muted">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore other careers</span>
        </Link>

        <Link
          href={`/careers/${activeCareer.id}`}
          className="hover:text-brand-primary transition-colors font-medium"
        >
          View career breakdown
        </Link>
      </div>
    </div>
  );
}
