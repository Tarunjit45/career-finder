import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EXPLORATION_AREAS, CAREER_DIRECTIONS, CAREERS } from '@/data/careers';

interface ExploreCareersPageProps {
  params: Promise<{
    areaId: string;
    directionId: string;
  }>;
}

export default async function ExploreCareersPage({ params }: ExploreCareersPageProps) {
  const { areaId, directionId } = await params;
  const area = EXPLORATION_AREAS.find((a) => a.id === areaId);
  const direction = CAREER_DIRECTIONS.find((d) => d.id === directionId);

  if (!area || !direction) {
    notFound();
  }

  const careers = CAREERS.filter((c) => c.directionId === directionId);

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link
          href={`/explore/${area.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{area.title}</span>
        </Link>
      </div>

      {/* Screen Title & Psychological Reassurance */}
      <div className="text-center w-full mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          {direction.emoji} {direction.title}
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight">
          CAREER PATHS
        </h1>
        <p className="text-base font-medium text-brand-muted mt-2">
          You don’t need to decide yet. <span className="text-brand-dark font-semibold">Just explore.</span>
        </p>
      </div>

      {/* Careers List */}
      <div className="w-full space-y-4">
        {careers.map((career) => (
          <Link
            key={career.id}
            href={`/careers/${career.id}`}
            className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-border hover:border-brand-primary/60 transition-smooth interactive-card flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{career.emoji}</span>
                  <h2 className="font-heading font-bold text-lg text-brand-dark group-hover:text-brand-primary transition-colors">
                    {career.title}
                  </h2>
                </div>

                <div className="w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center text-brand-subtle group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-sm text-brand-muted leading-relaxed">
                {career.oneLiner}
              </p>

              <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between text-xs text-brand-subtle">
                <span>{career.whatTheyDo.length} Key Responsibilities</span>
                <span className="font-semibold text-brand-primary group-hover:underline">
                  View breakdown →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Fallback if direction has fewer careers yet */}
      {careers.length === 0 && (
        <div className="w-full p-8 text-center bg-white rounded-2xl border border-brand-border">
          <p className="text-sm text-brand-muted">
            More specific pathways are currently being curated for {direction.title}.
          </p>
          <Link
            href={`/explore/${area.id}`}
            className="mt-4 inline-block text-xs font-semibold text-brand-primary hover:underline"
          >
            Explore other directions
          </Link>
        </div>
      )}
    </div>
  );
}
