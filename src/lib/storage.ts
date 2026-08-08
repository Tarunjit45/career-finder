import { EducationStage, UserIntent, UserJourneyState, UserProfile } from '@/types';
import { calculateDimensionScores } from './scoring';

const STORAGE_KEY = 'career_finder_journey_state';
const PROFILE_KEY = 'career_finder_user_profile';

const DEFAULT_STATE: UserJourneyState = {
  currentStage: undefined,
  currentIntent: undefined,
  assessmentAnswers: {},
  scores: undefined,
  matchedAreaIds: [],
  activeCareerId: undefined,
  completedStepIds: [],
  savedCareerIds: [],
  updatedAt: new Date().toISOString(),
};

export function getStoredJourney(): UserJourneyState {
  if (typeof window === 'undefined') {
    return DEFAULT_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveJourneyState(state: Partial<UserJourneyState>): UserJourneyState {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_STATE, ...state };
  }

  try {
    const current = getStoredJourney();
    const updated: UserJourneyState = {
      ...current,
      ...state,
      updatedAt: new Date().toISOString(),
    };

    // If answers changed, recalculate scores
    if (state.assessmentAnswers) {
      updated.scores = calculateDimensionScores(updated.assessmentAnswers);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for real-time reactivity across components
    window.dispatchEvent(new Event('career_finder_journey_updated'));
    return updated;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveStage(stage: EducationStage): void {
  saveJourneyState({ currentStage: stage });
}

export function saveIntent(intent: UserIntent): void {
  saveJourneyState({ currentIntent: intent });
}

export function saveAnswer(questionId: number, answer: string | string[]): UserJourneyState {
  const current = getStoredJourney();
  const updatedAnswers = {
    ...current.assessmentAnswers,
    [questionId]: answer,
  };
  return saveJourneyState({ assessmentAnswers: updatedAnswers });
}

export function setActiveCareer(careerId: string): void {
  const current = getStoredJourney();
  const saved = new Set(current.savedCareerIds);
  saved.add(careerId);

  saveJourneyState({
    activeCareerId: careerId,
    savedCareerIds: Array.from(saved),
  });
}

export function completeStep(stepId: string): void {
  const current = getStoredJourney();
  const completed = new Set(current.completedStepIds);
  completed.add(stepId);

  saveJourneyState({
    completedStepIds: Array.from(completed),
  });
}

export function toggleSaveCareer(careerId: string): boolean {
  const current = getStoredJourney();
  const saved = new Set(current.savedCareerIds);
  let isSaved = false;

  if (saved.has(careerId)) {
    saved.delete(careerId);
    isSaved = false;
  } else {
    saved.add(careerId);
    isSaved = true;
  }

  saveJourneyState({ savedCareerIds: Array.from(saved) });
  return isSaved;
}

export function resetJourney(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('career_finder_journey_updated'));
}

export function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') {
    return { isGuest: true };
  }

  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { isGuest: true };
    return JSON.parse(raw);
  } catch {
    return { isGuest: true };
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('career_finder_profile_updated'));
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event('career_finder_profile_updated'));
}
