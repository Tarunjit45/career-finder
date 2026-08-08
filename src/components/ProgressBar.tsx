import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  labelPrefix?: string;
}

export default function ProgressBar({
  current,
  total,
  labelPrefix = 'Question',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-brand-muted tracking-wide">
        <span>
          {labelPrefix} {current} of {total}
        </span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full h-2 rounded-full bg-brand-border/70 overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
