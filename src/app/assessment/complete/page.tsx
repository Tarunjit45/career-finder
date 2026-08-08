'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function AssessmentCompletePage() {
  useEffect(() => {
    trackEvent('assessment_completed');
  }, []);
  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 shadow-sm">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      {/* Main Title */}
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark tracking-tight">
        THAT’S IT.
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-brand-muted mt-3 max-w-sm leading-relaxed">
        We’ve got a clear starting point based on how you naturally think and work.
      </p>

      {/* Single CTA */}
      <div className="mt-10 w-full">
        <Link
          href="/explore"
          className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-brand-primary text-white font-semibold text-base sm:text-lg shadow-md hover:bg-brand-primary-hover transition-all transform hover:-translate-y-0.5"
        >
          <span>View Exploration Map</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </Link>
      </div>

      <p className="mt-4 text-xs text-brand-subtle">
        No diagnosis. Just genuine areas worth exploring next.
      </p>
    </div>
  );
}
