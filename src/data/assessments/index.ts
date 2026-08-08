import { EducationStage, AssessmentQuestion, AssessmentStageMeta } from '@/types';
import { SCHOOL_QUESTIONS } from './school';
import { COLLEGE_QUESTIONS } from './college';
import { WORKING_QUESTIONS } from './working';
import { FRESH_START_QUESTIONS } from './freshStart';

export const ASSESSMENTS_BY_STAGE: Record<EducationStage, AssessmentQuestion[]> = {
  school: SCHOOL_QUESTIONS,
  college: COLLEGE_QUESTIONS,
  working: WORKING_QUESTIONS,
  fresh_start: FRESH_START_QUESTIONS,
};

export const STAGE_METADATA: Record<EducationStage, AssessmentStageMeta> = {
  school: {
    stage: 'school',
    heading: "Let's discover what interests you.",
    subheading: 'Think about what naturally sparks your curiosity and energy.',
    badge: 'School Discovery',
  },
  college: {
    stage: 'college',
    heading: "Let's figure out what could be next.",
    subheading: 'Explore where your degree and strengths can take you in the modern economy.',
    badge: 'College Navigation',
  },
  working: {
    stage: 'working',
    heading: "Let's explore where you could go from here.",
    subheading: 'Align your experience and transferable strengths with high-growth domains.',
    badge: 'Professional Direction',
  },
  fresh_start: {
    stage: 'fresh_start',
    heading: "Let's find a direction that feels more like you.",
    subheading: 'Start fresh with zero judgment, calm steps, and real possibilities.',
    badge: 'Fresh Start',
  },
};

export function getQuestionsForStage(stage?: EducationStage): AssessmentQuestion[] {
  if (!stage || !ASSESSMENTS_BY_STAGE[stage]) {
    return ASSESSMENTS_BY_STAGE.college; // Default fallback
  }
  return ASSESSMENTS_BY_STAGE[stage];
}

export function getStageMeta(stage?: EducationStage): AssessmentStageMeta {
  if (!stage || !STAGE_METADATA[stage]) {
    return STAGE_METADATA.college;
  }
  return STAGE_METADATA[stage];
}

export function getAllAssessmentQuestions(): AssessmentQuestion[] {
  return [
    ...SCHOOL_QUESTIONS,
    ...COLLEGE_QUESTIONS,
    ...WORKING_QUESTIONS,
    ...FRESH_START_QUESTIONS,
  ];
}

// Re-export for backward compatibility
export {
  SCHOOL_QUESTIONS,
  COLLEGE_QUESTIONS,
  WORKING_QUESTIONS,
  FRESH_START_QUESTIONS,
};
