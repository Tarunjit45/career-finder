'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Compass } from 'lucide-react';
import { getStoredJourney } from '@/lib/storage';
import { calculateDimensionScores, rankExplorationAreas, ScoredExplorationArea } from '@/lib/scoring';
import { trackEvent } from '@/lib/analytics';
import MatchBadge from '@/components/MatchBadge';

export default function ExplorationMapPage() {
  const [scoredAreas, setScoredAreas] = useState<ScoredExplorationArea[]>([]);
  const [hasAnswers, setHasAnswers] = useState(true);

  useEffect(() => {
    trackEvent('exploration_viewed');
    const journey = getStoredJourney();
    const answers = journey.assessmentAnswers || {};
    const count = Object.keys(answers).length;

    if (count === 0) {
      setHasAnswers(false);
    }

    const scores = calculateDimensionScores(answers);
    const ranked = rankExplorationAreas(scores);
    setScoredAreas(ranked);
  }, []);

  return (
    <div className="w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center w-full mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary-light text-brand-primary text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Starting Point</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight">
          YOUR EXPLORATION MAP
        </h1>

        <p className="text-base text-brand-muted mt-2 max-w-md mx-auto leading-relaxed">
          Based on what you’ve told us, these areas may be worth exploring.
        </p>
      </div>

      {/* Exploration Area Cards */}
      <div className="w-full space-y-4">
        {scoredAreas.map(({ area, matchStrength }) => (
          <Link
            key={area.id}
            href={`/explore/${area.id}`}
            className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl"
          >
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-brand-border hover:border-brand-primary/60 transition-smooth interactive-card flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-2xl border border-brand-border/60 shrink-0">
                    {area.emoji}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-dark group-hover:text-brand-primary transition-colors">
                      {area.title}
                    </h2>
                    <span className="text-xs text-brand-subtle">
                      {area.directionCount} Directions · {area.careerCount} Careers
                    </span>
                  </div>
                </div>

                <MatchBadge strength={matchStrength} />
              </div>

              <p className="text-sm text-brand-muted leading-relaxed">
                {area.tagline}
              </p>

              {/* Exploration Context */}
              <div className="text-xs text-brand-subtle font-medium italic">
                {matchStrength === '🌱 Start here' && '✨ This area seems interesting based on your answers.'}
                {matchStrength === '👀 Worth exploring' && '🔍 Some of your answers point here.'}
                {matchStrength === '🔎 Another possibility' && '💡 You might find something interesting here.'}
              </div>

              <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between">
                <span className="text-xs font-medium text-brand-subtle">
                  Curated pathways
                </span>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Retake Discovery / Bottom Actions */}
      <div className="mt-12 pt-8 border-t border-brand-border/60 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-xs font-semibold text-brand-dark">
            Want to explore differently?
          </p>
          <p className="text-xs text-brand-muted">
            You can retake the discovery questions at any time.
          </p>
        </div>

        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-white text-xs font-semibold text-brand-muted hover:text-brand-dark hover:border-brand-primary transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Discovery</span>
        </Link>
      </div>
    </div>
  );
}
