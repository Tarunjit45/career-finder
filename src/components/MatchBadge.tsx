import React from 'react';
import { MatchStrength } from '@/types';

interface MatchBadgeProps {
  strength: MatchStrength;
  percentage?: number;
  className?: string;
}

export default function MatchBadge({ strength, percentage, className = '' }: MatchBadgeProps) {
  const percentText = percentage !== undefined ? `${percentage}% Match` : '';

  if (strength === '🌱 Start here') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {percentage !== undefined && (
          <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-2xs">
            {percentText}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
          <span className="text-xs select-none">🌱</span>
          Start here
        </span>
      </div>
    );
  }

  if (strength === '👀 Worth exploring') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {percentage !== undefined && (
          <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-2xs">
            {percentText}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-xs">
          <span className="text-xs select-none">👀</span>
          Worth exploring
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {percentage !== undefined && (
        <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-amber-600 text-white shadow-2xs">
          {percentText}
        </span>
      )}
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
        <span className="text-xs select-none">🔎</span>
        Another possibility
      </span>
    </div>
  );
}
