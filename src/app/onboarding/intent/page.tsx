'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CardOption from '@/components/CardOption';
import { saveIntent, getStoredJourney } from '@/lib/storage';
import { UserIntent } from '@/types';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function OnboardingIntentPage() {
  const router = useRouter();
  const journey = getStoredJourney();
  const isWorking = journey.currentStage === 'working' || journey.currentStage === 'fresh_start';

  const handleSelect = (intent: UserIntent) => {
    trackEvent('intent_selected', { intent });
    saveIntent(intent);
    router.push('/assessment');
  };

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link
          href="/onboarding/stage"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="text-center w-full mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          Step 2 of 2
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight">
          WHAT DO YOU NEED?
        </h1>
        <p className="text-base text-brand-muted mt-2">
          There’s no wrong answer.
        </p>
      </div>

      {/* Option Cards */}
      <div className="w-full space-y-4">
        <CardOption
          emoji="🤔"
          title="I don’t know what I want"
          subtitle="Everything feels confusing and I want a clear starting point"
          onClick={() => handleSelect('confused')}
          showArrow
        />

        <CardOption
          emoji="🔎"
          title="I want to explore my options"
          subtitle="I have some interests, but want to see what careers actually look like"
          onClick={() => handleSelect('explore')}
          showArrow
        />

        <CardOption
          emoji="🧭"
          title="I want to choose a path"
          subtitle="I want structured clarity to pick a primary focus area"
          onClick={() => handleSelect('choose')}
          showArrow
        />

        {isWorking && (
          <CardOption
            emoji="🔄"
            title="I want a fresh start"
            subtitle="I’m ready to pivot into a new field that aligns with my true energy"
            onClick={() => handleSelect('fresh_start')}
            showArrow
          />
        )}
      </div>
    </div>
  );
}
