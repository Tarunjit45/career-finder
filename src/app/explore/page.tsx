'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Compass, Sparkles } from 'lucide-react';
import { getStoredJourney } from '@/lib/storage';
import { calculateDimensionScores, rankExplorationAreas, ScoredExplorationArea } from '@/lib/scoring';
import { trackEvent } from '@/lib/analytics';
import { CAREERS } from '@/data/careers';
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
          <span>A Map, Not a Verdict</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight">
          YOUR EXPLORATION MAP
        </h1>

        <p className="text-base text-brand-muted mt-2 max-w-md mx-auto leading-relaxed">
          You don’t have to choose a single career today. Here are the broad directions and possibilities worth exploring next.
        </p>
      </div>

      {/* Exploration Area Cards */}
      <div className="w-full space-y-5">
        {scoredAreas.map(({ area, matchStrength }) => {
          const areaCareers = CAREERS.filter((c) => c.areaId === area.id);

          return (
            <div
              key={area.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-border hover:border-brand-primary/60 transition-all shadow-xs flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center text-2xl border border-brand-border/60 shrink-0">
                    {area.emoji}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-dark">
                      {area.title}
                    </h2>
                    <span className="text-xs text-brand-subtle font-medium">
                      {area.directionCount} Directions · {area.careerCount} Careers
                    </span>
                  </div>
                </div>

                <MatchBadge strength={matchStrength} />
              </div>

              <p className="text-sm text-brand-muted leading-relaxed">
                {area.tagline}
              </p>

              {/* Career quick links under this area */}
              <div className="pt-2 border-t border-brand-border/40">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Explore in this direction:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {areaCareers.slice(0, 4).map((career) => (
                    <Link
                      key={career.id}
                      href={`/careers/${career.id}`}
                      className="px-3 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-dark hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-light/30 transition-all inline-flex items-center gap-1.5"
                    >
                      <span>{career.emoji}</span>
                      <span>{career.title}</span>
                    </Link>
                  ))}
                  <Link
                    href={`/explore/${area.id}`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-brand-border text-xs font-semibold text-brand-muted hover:text-brand-dark hover:border-brand-border-hover transition-all inline-flex items-center gap-1"
                  >
                    <span>View all {area.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between">
                <span className="text-xs font-medium text-brand-subtle">
                  {matchStrength === '🌱 Start here' && '✨ Strongest alignment with your natural energy'}
                  {matchStrength === '👀 Worth exploring' && '🔍 High complementary crossover'}
                  {matchStrength === '🔎 Another possibility' && '💡 Alternative paths to broaden perspective'}
                </span>
                <Link
                  href={`/explore/${area.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
                >
                  <span>Explore Paths</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retake Discovery / Bottom Actions */}
      <div className="w-full mt-10 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake assessment</span>
        </Link>

        <Link
          href="/journey"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary hover:underline"
        >
          <span>View My Journey Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
