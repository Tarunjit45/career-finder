'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Check,
  Sparkles,
  DollarSign,
  GraduationCap,
  PlayCircle,
  HelpCircle,
} from 'lucide-react';
import { CAREERS, EXPLORATION_AREAS, CAREER_DIRECTIONS } from '@/data/careers';
import { trackEvent } from '@/lib/analytics';
import { getStoredJourney, toggleSaveCareer } from '@/lib/storage';

interface CareerDetailsPageProps {
  params: Promise<{
    careerId: string;
  }>;
}

export default function CareerDetailsPage({ params }: CareerDetailsPageProps) {
  const { careerId } = use(params);
  const career = CAREERS.find((c) => c.id === careerId);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (career) {
      trackEvent('career_viewed', { careerId: career.id, title: career.title });
      const journey = getStoredJourney();
      setIsSaved((journey.savedCareerIds || []).includes(career.id));
    }
  }, [career]);

  if (!career) {
    notFound();
  }

  const area = EXPLORATION_AREAS.find((a) => a.id === career.areaId);
  const direction = CAREER_DIRECTIONS.find((d) => d.id === career.directionId);
  const relatedCareers = CAREERS.filter((c) => career.relatedCareerIds.includes(c.id));

  const handleToggleSave = () => {
    const isNowSaved = toggleSaveCareer(career.id);
    setIsSaved(isNowSaved);
    if (isNowSaved) {
      trackEvent('career_saved', { careerId: career.id, title: career.title });
    }
  };

  const progressionSteps = career.learningProgression
    ? [
        { title: '1. Learn', desc: career.learningProgression.learn },
        { title: '2. Practice', desc: career.learningProgression.practice },
        { title: '3. Build', desc: career.learningProgression.build },
        { title: '4. Portfolio', desc: career.learningProgression.portfolio },
        { title: '5. Experience', desc: career.learningProgression.experience },
        { title: '6. Opportunity', desc: career.learningProgression.opportunity },
      ]
    : career.waysToGetThere.map((w, idx) => ({ title: `${idx + 1}. ${w.stage}`, desc: w.description }));

  return (
    <div className="w-full max-w-xl px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center">
      {/* Back button + Save button */}
      <div className="w-full mb-6 flex items-center justify-between">
        <Link
          href={direction ? `/explore/${career.areaId}/${direction.id}` : '/explore'}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {direction?.title || 'Explore'}</span>
        </Link>

        <button
          type="button"
          onClick={handleToggleSave}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isSaved
              ? 'bg-brand-primary text-white border-brand-primary'
              : 'bg-white text-brand-muted border-brand-border hover:border-brand-primary hover:text-brand-dark'
          }`}
        >
          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          <span>{isSaved ? 'Saved to Journey' : 'Save Path'}</span>
        </button>
      </div>

      {/* Header Profile */}
      <div className="w-full text-left bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-subtle mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-3xl shrink-0">
            {career.emoji}
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
              {direction?.title || area?.title || 'Career Path'}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight">
              {career.title}
            </h1>
          </div>
        </div>

        <p className="text-base sm:text-lg text-brand-muted font-normal leading-relaxed">
          {career.oneLiner}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          QUESTION 1: WHAT IS THIS? (What does a person actually do?)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-2xl border border-brand-border shadow-xs mb-5">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-brand-primary" />
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-dark">
            1. WHAT IS THIS? (WHAT YOU ACTUALLY DO)
          </h2>
        </div>
        <ul className="space-y-3">
          {career.whatTheyDo.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-brand-muted leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          QUESTION 2: WOULD I ENJOY IT? (Experience over personality score)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-br from-brand-primary-light/40 via-white to-white p-6 sm:p-7 rounded-2xl border-2 border-brand-primary/40 shadow-xs mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <h2 className="text-xs uppercase font-bold tracking-widest text-brand-primary">
              2. WOULD I ENJOY IT?
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-brand-border text-brand-muted">
            5-min challenge
          </span>
        </div>

        <p className="text-sm text-brand-dark leading-relaxed font-medium mb-3">
          Don’t guess from a personality test. Experience what solving a real {career.title} problem actually feels like.
        </p>

        <div className="space-y-2.5 mb-5">
          {career.youMayEnjoyIf.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0 stroke-[2.5]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/careers/${career.id}/path`}
          className="w-full py-3 px-4 rounded-xl bg-brand-primary text-white font-semibold text-sm shadow-sm hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Try 5-Minute Micro-Experience</span>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          QUESTION 3: HOW CAN I BECOME THIS? (Learning Progression)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-2xl border border-brand-border shadow-xs mb-5">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-4 h-4 text-brand-primary" />
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-dark">
            3. HOW CAN I BECOME THIS?
          </h2>
        </div>

        <div className="space-y-4">
          {progressionSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-brand-primary-light text-brand-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-xs text-brand-dark uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          QUESTION 4: CAN I MAKE MONEY DOING THIS? (Where money comes from)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-2xl border border-brand-border shadow-xs mb-8">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-dark">
            4. WHERE DOES THE MONEY COME FROM?
          </h2>
        </div>
        <p className="text-xs text-brand-muted mb-4">
          No fake salary promises. Here are the realistic commercial channels for this craft:
        </p>

        <div className="space-y-3">
          {(career.incomePaths || [
            {
              type: 'job',
              title: 'Full-Time Employment',
              emoji: '🎯',
              description: 'Company payroll for building and supporting product value.',
              whereMoneyComesFrom: 'Direct revenue generated by the business.',
            },
          ]).map((inc, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-brand-bg/60 border border-brand-border/80">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-dark">
                <span>{inc.emoji}</span>
                <span>{inc.title}</span>
              </div>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {inc.description}
              </p>
              <div className="mt-2 pt-2 border-t border-brand-border/40 text-[11px] text-brand-dark/80 font-medium flex items-center gap-1.5">
                <span className="text-brand-primary font-bold">Revenue Source:</span>
                <span>{inc.whereMoneyComesFrom}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Sticky Action Button */}
      <div className="w-full space-y-3 sticky bottom-4 z-30">
        <Link
          href={`/careers/${career.id}/path`}
          className="w-full py-4 px-6 rounded-xl bg-brand-primary text-white font-semibold text-base sm:text-lg shadow-lg hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
        >
          <span>Explore This Path & Next Steps</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Related Careers */}
      {relatedCareers.length > 0 && (
        <div className="w-full mt-12 pt-8 border-t border-brand-border/60">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-subtle mb-4">
            COMPLEMENTARY PATHS
          </h2>
          <div className="space-y-2.5">
            {relatedCareers.map((rel) => (
              <Link
                key={rel.id}
                href={`/careers/${rel.id}`}
                className="p-4 rounded-xl bg-white border border-brand-border hover:border-brand-primary flex items-center justify-between text-xs font-semibold text-brand-dark transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span>{rel.emoji}</span>
                  <span>{rel.title}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-subtle" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
