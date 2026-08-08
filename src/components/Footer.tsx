import React from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-border/60 py-10 bg-brand-bg text-brand-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-heading font-semibold text-sm text-brand-dark">Compass</span>
          <span className="text-xs text-brand-subtle">· Calm Career Navigation</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-brand-muted">
          <Link href="/about" className="hover:text-brand-dark transition-colors">
            Our Philosophy
          </Link>
          <Link href="/explore" className="hover:text-brand-dark transition-colors">
            Exploration Map
          </Link>
          <Link href="/profile" className="hover:text-brand-dark transition-colors">
            My Journey
          </Link>
        </div>

        <p className="text-xs text-brand-subtle">
          One screen = one decision.
        </p>
      </div>
    </footer>
  );
}
