import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

interface CardOptionProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
  showArrow?: boolean;
  className?: string;
}

export default function CardOption({
  emoji,
  title,
  subtitle,
  badge,
  selected = false,
  onClick,
  href,
  showArrow = false,
  className = '',
}: CardOptionProps) {
  const content = (
    <div
      className={`relative w-full text-left p-5 sm:p-6 rounded-2xl bg-white border transition-smooth interactive-card cursor-pointer flex items-center justify-between gap-4 ${
        selected
          ? 'border-brand-primary ring-2 ring-brand-primary/20 bg-brand-primary-light/30'
          : 'border-brand-border hover:border-brand-border-hover'
      } ${className}`}
    >
      <div className="flex items-start sm:items-center gap-4 flex-1">
        {emoji && (
          <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-bg flex items-center justify-center text-2xl select-none border border-brand-border/60">
            {emoji}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-heading font-semibold text-base sm:text-lg text-brand-dark leading-snug">
              {title}
            </h3>
            {badge && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-primary-light text-brand-primary border border-brand-primary/20">
                {badge}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-sm text-brand-muted leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Indicator */}
      <div className="shrink-0 pl-2">
        {selected ? (
          <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-sm">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
        ) : showArrow ? (
          <div className="w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center text-brand-subtle group-hover:text-brand-dark transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl text-left"
    >
      {content}
    </button>
  );
}
