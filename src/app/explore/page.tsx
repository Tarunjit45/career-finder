'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Compass, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
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

  const topArea = scoredAreas[0];
  const topProfession = topArea?.careers?.[0];

  return (
    <div className="w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center w-full mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary-light text-brand-primary text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Interest Match Analysis</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight">
          YOUR EXPLORATION MAP
        </h1>

        <p className="text-base text-brand-muted mt-2 max-w-md mx-auto leading-relaxed">
          Here is how strongly different domains and professions match your natural energy and problem-solving preferences.
        </p>
      </div>

      {/* 🏆 HIGHLIGHT CARD: TOP MATCHING PROFESSION */}
      {topProfession && (
        <div className="w-full mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-brand-primary text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 border border-white/30">
                {topProfession.career.emoji}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/25 text-white text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Trophy className="w-3 h-3 text-amber-300" />
                  <span>Strongest Match</span>
                </div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {topProfession.career.title}
                </h2>
                <p className="text-xs text-white/85 mt-0.5 line-clamp-1">
                  {topProfession.career.oneLiner}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t border-white/20 sm:border-t-0">
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {topProfession.matchPercentage}%
                </span>
                <span className="text-[11px] block text-white/80 font-medium">
                  Interest Match
                </span>
              </div>

              <Link
                href={`/careers/${topProfession.career.id}`}
                className="px-4 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-xs hover:bg-white/90 transition-all inline-flex items-center gap-1.5"
              >
                <span>Explore Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Exploration Area Cards with Percentages */}
      <div className="w-full space-y-5">
        {scoredAreas.map(({ area, matchStrength, matchPercentage, careers }) => {
          return (
            <div
              key={area.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-border hover:border-brand-primary/60 transition-all shadow-xs flex flex-col gap-4"
            >
              {/* Header with Title and Match Percentage Badge */}
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

                <MatchBadge strength={matchStrength} percentage={matchPercentage} />
              </div>

              {/* Progress Bar for Visual Percentage Indication */}
              <div className="w-full">
                <div className="flex items-center justify-between text-xs font-semibold mb-1 text-brand-muted">
                  <span>Domain Affinity</span>
                  <span className="text-brand-dark font-bold">{matchPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-brand-bg overflow-hidden border border-brand-border/40">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      matchPercentage >= 85
                        ? 'bg-emerald-500'
                        : matchPercentage >= 70
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-brand-muted leading-relaxed">
                {area.tagline}
              </p>

              {/* Career quick links with exact Match % chips */}
              <div className="pt-2 border-t border-brand-border/40">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Matching Professions:</span>
                  </span>
                  <span className="text-[11px] text-brand-subtle font-normal">
                    Ranked by interest alignment
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {careers.slice(0, 4).map(({ career, matchPercentage: cPercent, isTopMatch }) => (
                    <Link
                      key={career.id}
                      href={`/careers/${career.id}`}
                      className="p-2.5 rounded-xl bg-brand-bg/80 border border-brand-border hover:border-brand-primary hover:bg-brand-primary-light/30 transition-all flex items-center justify-between gap-2 text-xs group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base shrink-0">{career.emoji}</span>
                        <span className="font-semibold text-brand-dark truncate group-hover:text-brand-primary">
                          {career.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                            cPercent >= 90
                              ? 'bg-emerald-100 text-emerald-700'
                              : cPercent >= 75
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {cPercent}% Match
                        </span>
                      </div>
                    </Link>
                  ))}
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
                  <span>Explore All Paths</span>
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
