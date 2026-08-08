'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Compass, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WhatsNextPage() {
  useEffect(() => {
    try {
      // Gentle celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#10B981', '#6366F1'],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center text-center">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      {/* Screen Title */}
      <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
        Milestone Reached
      </span>
      <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-dark mt-2 tracking-tight">
        WHAT’S NEXT?
      </h1>
      <p className="text-base text-brand-muted mt-2 max-w-sm">
        You completed this step. What would you like to do next?
      </p>

      {/* Decision Options */}
      <div className="w-full space-y-4 mt-8">
        <Link
          href="/journey"
          className="w-full p-5 rounded-2xl bg-brand-primary text-white font-semibold text-base shadow-md hover:bg-brand-primary-hover transition-all flex items-center justify-between group transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            <span>Continue this path</span>
          </div>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/explore"
          className="w-full p-5 rounded-2xl bg-white border border-brand-border text-brand-dark font-semibold text-base hover:border-brand-primary/60 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-brand-primary" />
            <span>Explore something else</span>
          </div>
          <ArrowRight className="w-5 h-5 text-brand-subtle group-hover:text-brand-dark group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      <p className="mt-8 text-xs text-brand-subtle">
        Your progress is saved locally. You can sign in anytime to sync across devices.
      </p>
    </div>
  );
}
