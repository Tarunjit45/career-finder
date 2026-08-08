'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X } from 'lucide-react';
import { getStoredJourney, getStoredProfile } from '@/lib/storage';

export default function Navigation() {
  const pathname = usePathname();
  const [hasStartedJourney, setHasStartedJourney] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function checkState() {
      const journey = getStoredJourney();
      const profile = getStoredProfile();
      const hasAnswersOrCareer =
        Object.keys(journey.assessmentAnswers).length > 0 ||
        Boolean(journey.activeCareerId) ||
        Boolean(journey.currentStage);

      setHasStartedJourney(hasAnswersOrCareer);
      setIsLoggedIn(!profile.isGuest && Boolean(profile.email));
    }

    checkState();

    window.addEventListener('career_finder_journey_updated', checkState);
    window.addEventListener('career_finder_profile_updated', checkState);

    return () => {
      window.removeEventListener('career_finder_journey_updated', checkState);
      window.removeEventListener('career_finder_profile_updated', checkState);
    };
  }, [pathname]);

  // If user has started exploration or is logged in, show authenticated/active nav items
  const showActiveNav = hasStartedJourney || isLoggedIn;

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading font-bold text-lg text-brand-dark hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white shadow-sm">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="tracking-tight text-xl font-bold">Compass</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          {showActiveNav ? (
            <>
              <Link
                href="/explore"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith('/explore')
                    ? 'text-brand-primary font-semibold'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
              >
                Explore
              </Link>
              <Link
                href="/journey"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith('/journey')
                    ? 'text-brand-primary font-semibold'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
              >
                My Journey
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/profile'
                    ? 'text-brand-primary font-semibold'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/about'
                    ? 'text-brand-primary font-semibold'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
              >
                About
              </Link>
              <Link
                href="/auth/sign-in"
                className="text-sm font-semibold text-brand-dark hover:text-brand-primary transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-border/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-card border-b border-brand-border px-4 py-4 space-y-3 shadow-md">
          {showActiveNav ? (
            <>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname.startsWith('/explore')
                    ? 'bg-brand-primary-light text-brand-primary font-semibold'
                    : 'text-brand-dark hover:bg-brand-bg'
                }`}
              >
                Explore
              </Link>
              <Link
                href="/journey"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname.startsWith('/journey')
                    ? 'bg-brand-primary-light text-brand-primary font-semibold'
                    : 'text-brand-dark hover:bg-brand-bg'
                }`}
              >
                My Journey
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname === '/profile'
                    ? 'bg-brand-primary-light text-brand-primary font-semibold'
                    : 'text-brand-dark hover:bg-brand-bg'
                }`}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname === '/about'
                    ? 'bg-brand-primary-light text-brand-primary font-semibold'
                    : 'text-brand-dark hover:bg-brand-bg'
                }`}
              >
                About
              </Link>
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-brand-primary hover:bg-brand-primary-light"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
