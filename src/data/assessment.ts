import { AssessmentQuestion } from '@/types';
import {
  ASSESSMENTS_BY_STAGE,
  STAGE_METADATA,
  getQuestionsForStage,
  getStageMeta,
  getAllAssessmentQuestions,
  SCHOOL_QUESTIONS,
  COLLEGE_QUESTIONS,
  WORKING_QUESTIONS,
  FRESH_START_QUESTIONS,
} from './assessments';

export {
  ASSESSMENTS_BY_STAGE,
  STAGE_METADATA,
  getQuestionsForStage,
  getStageMeta,
  getAllAssessmentQuestions,
  SCHOOL_QUESTIONS,
  COLLEGE_QUESTIONS,
  WORKING_QUESTIONS,
  FRESH_START_QUESTIONS,
};

// Default fallback set for general imports
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = COLLEGE_QUESTIONS;
