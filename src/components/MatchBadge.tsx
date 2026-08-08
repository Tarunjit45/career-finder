import React from 'react';
import { MatchStrength } from '@/types';
import { Sparkles, Compass, Check } from 'lucide-react';

interface MatchBadgeProps {
  strength: MatchStrength;
  className?: string;
}

export default function MatchBadge({ strength, className = '' }: MatchBadgeProps) {
  if (strength === '🌱 Start here') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs ${className}`}
      >
        <span className="text-xs select-none">🌱</span>
        Start here
      </span>
    );
  }

  if (strength === '👀 Worth exploring') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-xs ${className}`}
      >
        <span className="text-xs select-none">👀</span>
        Worth exploring
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs ${className}`}
    >
      <span className="text-xs select-none">🔎</span>
      Another possibility
    </span>
  );
}
