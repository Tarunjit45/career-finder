import { getAllAssessmentQuestions } from '@/data/assessments';
import { EXPLORATION_AREAS, CAREERS } from '@/data/careers';
import { DimensionScores, ExplorationArea, MatchStrength, Career, ScoreDimension } from '@/types';

export interface ScoredCareer {
  career: Career;
  matchPercentage: number;
  isTopMatch?: boolean;
}

export interface ScoredExplorationArea {
  area: ExplorationArea;
  matchStrength: MatchStrength;
  rawScore: number;
  matchPercentage: number;
  careers: ScoredCareer[];
  topCareer?: ScoredCareer;
}

const CAREER_PRIMARY_DIMENSIONS: Record<string, ScoreDimension[]> = {
  'ai-engineer': ['technology', 'analytical', 'scientific'],
  'ui-ux-designer': ['creativity', 'people', 'technology'],
  'product-manager': ['business', 'leadership', 'analytical'],
  'data-analyst': ['analytical', 'technology', 'business'],
  'cybersecurity-specialist': ['technology', 'analytical', 'practical'],
  'full-stack-developer': ['technology', 'practical', 'creativity'],
  'brand-designer': ['creativity', 'people'],
  'growth-strategist': ['business', 'analytical', 'leadership'],
  'biotech-researcher': ['scientific', 'analytical'],
  'people-partner': ['people', 'leadership'],
};

export function calculateDimensionScores(
  answers: Record<number, string | string[]>
): DimensionScores {
  const scores: DimensionScores = {
    technology: 0,
    creativity: 0,
    analytical: 0,
    people: 0,
    business: 0,
    scientific: 0,
    practical: 0,
    leadership: 0,
  };

  const allQuestions = getAllAssessmentQuestions();

  for (const question of allQuestions) {
    const userAnswer = answers[question.id];
    if (!userAnswer) continue;

    const selectedOptionIds = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

    for (const optId of selectedOptionIds) {
      const option = question.options.find((o) => o.id === optId);
      if (!option) continue;

      for (const [dim, weight] of Object.entries(option.weights)) {
        const dimensionKey = dim as keyof DimensionScores;
        if (scores[dimensionKey] !== undefined) {
          scores[dimensionKey] += weight || 0;
        }
      }
    }
  }

  return scores;
}

export function rankExplorationAreas(
  scores: DimensionScores
): ScoredExplorationArea[] {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  // 1. Calculate raw score for each area
  const areaRawScores = EXPLORATION_AREAS.map((area) => {
    let rawScore = 0;
    for (const dim of area.primaryDimensions) {
      rawScore += (scores[dim] || 0) * 2;
    }
    return { area, rawScore };
  });

  // Sort descending by raw score
  areaRawScores.sort((a, b) => b.rawScore - a.rawScore);

  const maxAreaScore = areaRawScores[0]?.rawScore || 1;

  // 2. Score individual careers
  const scoredCareersAll: Record<string, number> = {};
  for (const career of CAREERS) {
    const dims = CAREER_PRIMARY_DIMENSIONS[career.id] || ['technology', 'analytical'];
    let careerScore = 0;
    for (const dim of dims) {
      careerScore += (scores[dim] || 0) * 2;
    }
    scoredCareersAll[career.id] = careerScore;
  }

  const maxCareerScore = Math.max(...Object.values(scoredCareersAll), 1);

  // 3. Assemble scored areas with realistic, calibrated match percentages
  return areaRawScores.map((item, index) => {
    let matchStrength: MatchStrength = '🔎 Another possibility';
    let matchPercentage = 70;

    if (totalScore === 0) {
      // Default state when no assessment has been taken yet
      if (index === 0) {
        matchStrength = '🌱 Start here';
        matchPercentage = 95;
      } else if (index < 3) {
        matchStrength = '👀 Worth exploring';
        matchPercentage = 86 - index * 6;
      } else {
        matchPercentage = 68 - index * 3;
      }
    } else {
      // Calibrate percentage relative to user's highest scored domain
      const ratio = item.rawScore / maxAreaScore;
      if (index === 0) {
        matchStrength = '🌱 Start here';
        matchPercentage = Math.min(98, Math.max(90, Math.round(88 + ratio * 10)));
      } else if (index < 3) {
        matchStrength = '👀 Worth exploring';
        matchPercentage = Math.min(89, Math.max(72, Math.round(72 + ratio * 16)));
      } else {
        matchPercentage = Math.min(71, Math.max(55, Math.round(55 + ratio * 15)));
      }
    }

    // Careers in this area
    const areaCareers = CAREERS.filter((c) => c.areaId === item.area.id);
    const scoredCareers: ScoredCareer[] = areaCareers.map((c) => {
      const cScore = scoredCareersAll[c.id] || 0;
      let cPercent = 75;

      if (totalScore === 0) {
        cPercent = Math.max(65, matchPercentage - Math.floor(Math.random() * 6));
      } else {
        const cRatio = cScore / maxCareerScore;
        cPercent = Math.min(
          99,
          Math.max(58, Math.round(matchPercentage * 0.75 + cRatio * 25))
        );
      }

      return {
        career: c,
        matchPercentage: cPercent,
      };
    });

    // Sort careers in this area by percentage descending
    scoredCareers.sort((a, b) => b.matchPercentage - a.matchPercentage);
    if (scoredCareers.length > 0 && index === 0) {
      scoredCareers[0].isTopMatch = true;
    }

    return {
      area: item.area,
      matchStrength,
      rawScore: item.rawScore,
      matchPercentage,
      careers: scoredCareers,
      topCareer: scoredCareers[0],
    };
  });
}
