import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full max-w-xl px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center text-left">
      {/* Brand Badge */}
      <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm mb-6">
        <Compass className="w-6 h-6 stroke-[2.2]" />
      </div>

      <div className="text-center w-full mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          Our Philosophy
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark mt-2 tracking-tight">
          Calm Career Navigation
        </h1>
        <p className="text-base text-brand-muted mt-2 max-w-md mx-auto">
          We believe figuring out your life shouldn’t feel like filling out a tax form.
        </p>
      </div>

      <div className="w-full space-y-6 text-sm text-brand-muted leading-relaxed">
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-border shadow-xs">
          <h2 className="font-heading font-bold text-lg text-brand-dark mb-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>One screen = one decision</span>
          </h2>
          <p>
            Most career websites throw 50-filter dashboards, overwhelming test reports, and
            unhelpful buzzwords at you. We built Compass around one simple principle: give your brain
            the space to make one calm, thoughtful choice at a time.
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-border shadow-xs">
          <h2 className="font-heading font-bold text-lg text-brand-dark mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>No fake precision</span>
          </h2>
          <p>
            No algorithm can truthfully tell you you are 87.43% suited for one specific job.
            You are a growing, adaptable human being. We provide qualitative starting points—areas
            worth exploring—so you can decide what actually resonates.
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-border shadow-xs">
          <h2 className="font-heading font-bold text-lg text-brand-dark mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>A journey, not a verdict</span>
          </h2>
          <p>
            Your career evolves over time through curiosity, mini projects, and practical steps.
            We guide you from discovery to exploration, building skills, and seizing real opportunities.
          </p>
        </div>
      </div>

      <div className="mt-10 w-full">
        <Link
          href="/onboarding/stage"
          className="w-full py-4 px-6 rounded-xl bg-brand-primary text-white font-semibold text-base shadow-md hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2"
        >
          <span>Start Exploring</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}
