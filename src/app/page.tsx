'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function HomePage() {
  useEffect(() => {
    trackEvent('landing_viewed');
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-2xl sm:max-w-3xl px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 text-center flex flex-col items-center">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary-light text-brand-primary border border-brand-primary/20 text-xs font-semibold tracking-wide mb-8 shadow-xs">
          <Compass className="w-3.5 h-3.5" />
          <span>Calm Career Navigation</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl sm:leading-[1.18] text-brand-dark tracking-tight max-w-xl">
          YOU DON’T HAVE TO KNOW WHAT YOU WANT TO BECOME.
        </h1>

        {/* Subheading */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-brand-muted max-w-md font-normal leading-relaxed">
          Let’s figure out what’s next.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 sm:mt-10 w-full sm:w-auto">
          <Link
            href="/onboarding/stage"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary text-white font-semibold text-base sm:text-lg shadow-md hover:bg-brand-primary-hover hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Audience note */}
        <p className="mt-5 text-xs sm:text-sm text-brand-subtle">
          For students, graduates & people starting over.
        </p>
      </section>

      {/* Visual Journey Section */}
      <section className="w-full bg-white border-y border-brand-border/60 py-16 sm:py-20 px-4 sm:px-6 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-primary">
            How It Works
          </h2>
          <p className="font-heading font-bold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight">
            Your career is a journey, not a single decision.
          </p>
          <p className="text-sm sm:text-base text-brand-muted mt-3 leading-relaxed max-w-lg mx-auto">
            You don’t need to predict the next 40 years today. We take one calm step at a time.
          </p>

          {/* 4 Step Visual Progression */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-3 text-left">
            <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark">
                  DISCOVER
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Understand what actually energizes you through simple questions.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark">
                  EXPLORE
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Inspect real careers and daily tasks without pressure to decide.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm mb-3">
                  3
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark">
                  BUILD
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Focus on the exact next step and skill to gain true confidence.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/80 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                  4
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark">
                  OPPORTUNITY
                </h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Step into real internships, projects, and high-impact roles.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom simple CTA */}
          <div className="mt-12">
            <Link
              href="/onboarding/stage"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover hover:underline underline-offset-4 transition-all"
            >
              <span>Begin your guided discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
