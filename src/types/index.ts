export type EducationStage = 'school' | 'college' | 'working' | 'fresh_start';

export type UserIntent = 'confused' | 'explore' | 'choose' | 'fresh_start';

export type ScoreDimension =
  | 'technology'
  | 'creativity'
  | 'analytical'
  | 'people'
  | 'business'
  | 'scientific'
  | 'practical'
  | 'leadership';

export interface AssessmentOption {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
  weights: Partial<Record<ScoreDimension, number>>;
}

export interface AssessmentQuestion {
  id: number;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: AssessmentOption[];
}

export interface DimensionScores {
  technology: number;
  creativity: number;
  analytical: number;
  people: number;
  business: number;
  scientific: number;
  practical: number;
  leadership: number;
}

export type MatchStrength = '🌱 Start here' | '👀 Worth exploring' | '🔎 Another possibility';

export interface ExplorationArea {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  primaryDimensions: ScoreDimension[];
  directionCount: number;
  careerCount: number;
}

export interface CareerDirection {
  id: string;
  areaId: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  careers: string[]; // Career IDs
}

export interface MicroSimulation {
  scenario: string;
  question: string;
  options: {
    id: string;
    label: string;
    rationale?: string;
  }[];
  explanation: string;
}

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  durationMinutes?: number;
  isCompleted?: boolean;
  actionType?: 'read' | 'reflect' | 'simulate';
  simulation?: MicroSimulation;
  content?: {
    summary: string;
    keyTakeaways: string[];
    miniReflection: string;
  };
}

export interface Career {
  id: string;
  directionId: string;
  areaId: string;
  title: string;
  emoji: string;
  tagline: string;
  oneLiner: string;
  whatTheyDo: string[];
  youMayEnjoyIf: string[];
  whatYouNeed: string[];
  waysToGetThere: {
    stage: string;
    description: string;
  }[];
  relatedCareerIds: string[];
  nextSteps: CareerMilestone[];
}

export interface UserJourneyState {
  currentStage?: EducationStage;
  currentIntent?: UserIntent;
  assessmentAnswers: Record<number, string | string[]>;
  scores?: DimensionScores;
  matchedAreaIds?: string[];
  activeCareerId?: string;
  completedStepIds: string[];
  savedCareerIds: string[];
  updatedAt: string;
}

export interface UserProfile {
  id?: string;
  email?: string;
  fullName?: string;
  createdAt?: string;
  isGuest: boolean;
}
