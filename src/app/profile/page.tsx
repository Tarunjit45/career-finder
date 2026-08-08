'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Compass, CheckCircle2, RotateCcw, LogOut, ArrowRight, Bookmark } from 'lucide-react';
import { getStoredProfile, getStoredJourney, clearProfile, resetJourney } from '@/lib/storage';
import { CAREERS } from '@/data/careers';
import { Career, UserProfile, UserJourneyState } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({ isGuest: true });
  const [journey, setJourney] = useState<UserJourneyState | null>(null);

  useEffect(() => {
    setProfile(getStoredProfile());
    setJourney(getStoredJourney());
  }, []);

  const handleSignOut = () => {
    clearProfile();
    resetJourney();
    router.push('/');
  };

  const savedCareers: Career[] = journey?.savedCareerIds
    ? CAREERS.filter((c) => journey.savedCareerIds.includes(c.id))
    : [];

  const answeredCount = Object.keys(journey?.assessmentAnswers || {}).length;

  return (
    <div className="w-full max-w-lg px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
      {/* Profile Header */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-3xl border border-brand-border shadow-xs mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary-light text-brand-primary flex items-center justify-center font-bold text-lg">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg sm:text-xl text-brand-dark">
              {profile.fullName || (profile.isGuest ? 'Guest Explorer' : 'My Account')}
            </h1>
            <p className="text-xs text-brand-muted">
              {profile.email || 'Local session (Progress saved on this device)'}
            </p>
          </div>
        </div>

        {profile.isGuest && (
          <Link
            href="/auth/sign-up"
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors"
          >
            Save Account
          </Link>
        )}
      </div>

      {/* Discovery Summary */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-3xl border border-brand-border shadow-xs mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-dark">
            DISCOVERY STATUS
          </h2>
          <span className="text-xs font-semibold text-brand-primary">
            {answeredCount > 0 ? `${answeredCount}/12 Questions` : 'Not started'}
          </span>
        </div>

        <p className="text-sm text-brand-muted mb-4">
          {answeredCount >= 10
            ? 'Your discovery questions are completed and your exploration map is generated.'
            : 'Take the quick 12-question discovery to unlock tailored exploration pathways.'}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="flex-1 py-3 px-4 rounded-xl bg-brand-primary text-white text-xs font-semibold text-center hover:bg-brand-primary-hover transition-colors"
          >
            View Exploration Map
          </Link>
          <Link
            href="/assessment"
            className="py-3 px-4 rounded-xl border border-brand-border text-brand-muted hover:text-brand-dark text-xs font-semibold text-center hover:bg-brand-bg transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake</span>
          </Link>
        </div>
      </div>

      {/* Saved Careers */}
      <div className="w-full bg-white p-6 sm:p-7 rounded-3xl border border-brand-border shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase font-bold tracking-widest text-brand-dark flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-brand-primary" />
            <span>SAVED PATHWAYS ({savedCareers.length})</span>
          </h2>
        </div>

        {savedCareers.length > 0 ? (
          <div className="space-y-3">
            {savedCareers.map((career) => (
              <Link
                key={career.id}
                href={`/careers/${career.id}`}
                className="p-3.5 rounded-2xl border border-brand-border hover:border-brand-primary flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{career.emoji}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-brand-dark group-hover:text-brand-primary transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-[11px] text-brand-muted line-clamp-1">
                      {career.oneLiner}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-subtle group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-brand-muted">
            No saved careers yet. Explore recommendations and save the ones you find interesting.
          </p>
        )}
      </div>

      {/* Reset / Sign Out */}
      <button
        type="button"
        onClick={handleSignOut}
        className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors inline-flex items-center gap-1.5"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Reset session & start fresh</span>
      </button>
    </div>
  );
}
