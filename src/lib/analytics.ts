import { supabase, isSupabaseConfigured } from './supabase';
import { getStoredProfile } from './storage';

export type AnalyticsEventType =
  | 'landing_viewed'
  | 'exploration_started'
  | 'stage_selected'
  | 'intent_selected'
  | 'assessment_started'
  | 'assessment_completed'
  | 'exploration_viewed'
  | 'exploration_activated'
  | 'area_selected'
  | 'career_viewed'
  | 'career_saved'
  | 'path_started'
  | 'journey_viewed'
  | 'experience_started'
  | 'experience_completed'
  | 'experience_enjoyed'
  | 'return_session';

interface TrackEventPayload {
  eventName: AnalyticsEventType;
  properties?: Record<string, any>;
}

// In-memory / local analytics cache for anonymous tracking
const LOCAL_ANALYTICS_KEY = 'compass_analytics_events';

export function getAnonymousSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let sessionId = sessionStorage.getItem('compass_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('compass_session_id', sessionId);
  }
  return sessionId;
}

export async function trackEvent(
  eventName: AnalyticsEventType,
  properties: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  const sessionId = getAnonymousSessionId();
  const profile = getStoredProfile();

  const eventRecord = {
    event_name: eventName,
    session_id: sessionId,
    user_id: profile.isGuest ? null : profile.email || null,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.pathname,
    },
    created_at: new Date().toISOString(),
  };

  // 1. Store locally in sessionStorage / localStorage for anonymous observability
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    const events = raw ? JSON.parse(raw) : [];
    events.push(eventRecord);
    // Keep max 100 recent events locally
    if (events.length > 100) events.shift();
    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(events));
  } catch {
    // localStorage quota or private mode protection
  }

  // 2. If Supabase is connected, stream event to analytics_events table asynchronously
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('analytics_events').insert({
        event_name: eventName,
        session_id: sessionId,
        user_id: profile.isGuest ? null : profile.email,
        properties: eventRecord.properties,
      });
    } catch {
      // Fail silently without interrupting user experience
    }
  }

  // 3. Helpful dev console log
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] 📊 ${eventName}`, properties);
  }
}

export function getLocalAnalyticsEvents(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
