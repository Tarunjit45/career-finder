import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EXPLORATION_AREAS, CAREER_DIRECTIONS } from '@/data/careers';
import CardOption from '@/components/CardOption';

interface ExploreDirectionsPageProps {
  params: Promise<{
    areaId: string;
  }>;
}

export default async function ExploreDirectionsPage({ params }: ExploreDirectionsPageProps) {
  const { areaId } = await params;
  const area = EXPLORATION_AREAS.find((a) => a.id === areaId);

  if (!area) {
    notFound();
  }

  const directions = CAREER_DIRECTIONS.filter((d) => d.areaId === areaId);

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exploration Map</span>
        </Link>
      </div>

      {/* Title & Prompt */}
      <div className="text-center w-full mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
          {area.emoji} {area.title}
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark mt-2 tracking-tight">
          What sounds interesting to you?
        </h1>
        <p className="text-sm text-brand-muted mt-2">
          Pick a direction to see actual careers and what they do.
        </p>
      </div>

      {/* Directions List */}
      <div className="w-full space-y-4">
        {directions.map((direction) => (
          <CardOption
            key={direction.id}
            emoji={direction.emoji}
            title={direction.title}
            subtitle={direction.tagline}
            href={`/explore/${area.id}/${direction.id}`}
            showArrow
          />
        ))}
      </div>

      {/* Bottom Reassurance */}
      <p className="mt-10 text-xs text-brand-subtle text-center">
        You can always come back and explore other directions.
      </p>
    </div>
  );
}
