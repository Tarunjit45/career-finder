'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CardOption from '@/components/CardOption';
import { saveStage } from '@/lib/storage';
import { EducationStage } from '@/types';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function OnboardingStagePage() {
  const router = useRouter();

  useEffect(() => {
    trackEvent('exploration_started');
  }, []);

  const handleSelect = (stage: EducationStage) => {
    trackEvent('stage_selected', { stage });
    saveStage(stage);
    router.push('/onboarding/intent');
  };

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="text-center w-full mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          Step 1 of 2
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight">
          WHERE ARE YOU?
        </h1>
        <p className="text-base text-brand-muted mt-2">
          Let’s start from where you are right now.
        </p>
      </div>

      {/* Option Cards */}
      <div className="w-full space-y-4">
        <CardOption
          emoji="🎒"
          title="I’m in school"
          subtitle="Class 1–12 or preparing for board exams"
          onClick={() => handleSelect('school')}
          showArrow
        />

        <CardOption
          emoji="🎓"
          title="I’m in college"
          subtitle="Undergraduate or postgraduate studies"
          onClick={() => handleSelect('college')}
          showArrow
        />

        <CardOption
          emoji="💼"
          title="I’m working"
          subtitle="Early in a job or building work experience"
          onClick={() => handleSelect('working')}
          showArrow
        />
      </div>

      {/* Secondary Fresh Start Card */}
      <div className="w-full mt-8 pt-6 border-t border-brand-border/60 text-center">
        <p className="text-xs text-brand-muted mb-3 font-medium">
          Already started a career and want a change?
        </p>
        <button
          type="button"
          onClick={() => handleSelect('fresh_start')}
          className="w-full py-3.5 px-4 rounded-xl border border-brand-border bg-white text-sm font-semibold text-brand-dark hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-light/40 transition-all flex items-center justify-center gap-2"
        >
          <span>🔄 I want a fresh start</span>
        </button>
      </div>
    </div>
  );
}
