'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { saveProfile } from '@/lib/storage';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signUp({
          email,
          password: password || 'temp_password',
          options: {
            data: { full_name: fullName },
          },
        });

        if (error) {
          saveProfile({
            email,
            fullName: fullName || email.split('@')[0],
            isGuest: false,
          });
        } else {
          saveProfile({
            email,
            fullName: fullName || email.split('@')[0],
            isGuest: false,
          });
        }
      } else {
        saveProfile({
          email,
          fullName: fullName || email.split('@')[0],
          isGuest: false,
        });
      }

      router.push('/journey');
    } catch {
      setErrorMsg('Could not complete registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm px-4 py-12 sm:py-20 flex flex-col items-center">
      {/* Brand Icon */}
      <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm mb-6">
        <Compass className="w-6 h-6 stroke-[2.2]" />
      </div>

      <div className="text-center w-full mb-8">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark tracking-tight">
          Save your journey
        </h1>
        <p className="text-sm text-brand-muted mt-1.5">
          Save your matched careers and progress.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1.5">
            Your Name
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Tarun"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-brand-border bg-white text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
            <User className="w-4 h-4 text-brand-subtle absolute left-3.5 top-4" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-brand-border bg-white text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
            <Mail className="w-4 h-4 text-brand-subtle absolute left-3.5 top-4" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1.5">
            Create Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-brand-border bg-white text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />
            <Lock className="w-4 h-4 text-brand-subtle absolute left-3.5 top-4" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl bg-brand-primary text-white font-semibold text-base shadow-md hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 mt-2"
        >
          <span>{isLoading ? 'Creating account...' : 'Create Account'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      <p className="mt-6 text-xs text-brand-muted text-center">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="font-semibold text-brand-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
