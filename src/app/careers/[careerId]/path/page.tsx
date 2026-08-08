'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Circle, Lock, Sparkles } from 'lucide-react';
import { CAREERS } from '@/data/careers';
import { setActiveCareer } from '@/lib/storage';
import { trackEvent } from '@/lib/analytics';

interface ExplorePathPageProps {
  params: Promise<{
    careerId: string;
  }>;
}

export default function ExplorePathPage({ params }: ExplorePathPageProps) {
  const router = useRouter();
  const { careerId } = use(params);
  const career = CAREERS.find((c) => c.id === careerId);

  if (!career) {
    notFound();
  }

  const milestones = [
    {
      id: 'step-1',
      title: 'Explore the career',
      subtitle: 'Understand what day-to-day problems you’ll solve.',
      isActive: true,
    },
    {
      id: 'step-2',
      title: 'Learn the foundations',
      subtitle: 'Master the essential thinking models and basic tools.',
      isActive: false,
    },
    {
      id: 'step-3',
      title: 'Build your first project',
      subtitle: 'Create a tangible project to test your interest hands-on.',
      isActive: false,
    },
    {
      id: 'step-4',
      title: 'Build your skills',
      subtitle: 'Deepen your technical toolchain and problem solving.',
      isActive: false,
    },
    {
      id: 'step-5',
      title: 'Build your portfolio',
      subtitle: 'Package your work into a clear proof-of-work showcase.',
      isActive: false,
    },
    {
      id: 'step-6',
      title: 'Find opportunities',
      subtitle: 'Connect with startups, internships, and mentorship.',
      isActive: false,
    },
  ];

  const handleStartJourney = () => {
    trackEvent('path_started', { careerId: career.id, title: career.title });
    setActiveCareer(career.id);
    router.push('/journey');
  };

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link
          href={`/careers/${career.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {career.title}</span>
        </Link>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="text-center w-full mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          {career.emoji} {career.title}
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight">
          YOUR JOURNEY STARTS HERE
        </h1>
        <p className="text-sm text-brand-muted mt-2">
          A clear, step-by-step roadmap to explore this direction.
        </p>
      </div>

      {/* Milestones Roadmap */}
      <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-xs space-y-5 mb-8">
        {milestones.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 p-3.5 rounded-2xl transition-all ${
              item.isActive
                ? 'bg-brand-primary-light/50 border border-brand-primary/30 ring-1 ring-brand-primary/20'
                : 'opacity-70'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                item.isActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {item.isActive ? (
                <Sparkles className="w-4 h-4" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3
                  className={`font-heading font-bold text-sm sm:text-base ${
                    item.isActive ? 'text-brand-dark' : 'text-slate-500'
                  }`}
                >
                  {item.title}
                </h3>
                {item.isActive ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-primary text-white">
                    Step 1 · Ready
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    Coming next
                  </span>
                )}
              </div>
              <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <div className="w-full">
        <button
          type="button"
          onClick={handleStartJourney}
          className="w-full py-4 px-6 rounded-xl bg-brand-primary text-white font-semibold text-base sm:text-lg shadow-md hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
        >
          <span>Start This Journey</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      <p className="mt-4 text-xs text-brand-subtle text-center">
        You can always switch or add more exploration paths later.
      </p>
    </div>
  );
}
