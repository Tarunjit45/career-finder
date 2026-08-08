import { ASSESSMENT_QUESTIONS } from '@/data/assessment';
import { EXPLORATION_AREAS } from '@/data/careers';
import { DimensionScores, ExplorationArea, MatchStrength } from '@/types';

export interface ScoredExplorationArea {
  area: ExplorationArea;
  matchStrength: MatchStrength;
  rawScore: number;
}

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

  for (const question of ASSESSMENT_QUESTIONS) {
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
  const scoredAreas = EXPLORATION_AREAS.map((area) => {
    // Primary dimensions contribute 2x, secondary general affinity contributes 1x
    let areaScore = 0;

    for (const dim of area.primaryDimensions) {
      areaScore += (scores[dim] || 0) * 2;
    }

    // Add baseline affinity to prevent zero matches if user selected diverse interests
    const totalDimensions = Object.values(scores).reduce((a, b) => a + b, 0);
    if (totalDimensions === 0) {
      areaScore = Math.random() * 0.1; // Default neutral state
    }

    return {
      area,
      rawScore: areaScore,
    };
  });

  // Sort descending by rawScore
  scoredAreas.sort((a, b) => b.rawScore - a.rawScore);

  // Assign qualitative, exploration-oriented guidance (no fake precision)
  return scoredAreas.map((item, index) => {
    let matchStrength: MatchStrength = '🔎 Another possibility';

    if (index === 0) {
      matchStrength = '🌱 Start here';
    } else if (index < 3) {
      matchStrength = '👀 Worth exploring';
    }

    return {
      area: item.area,
      matchStrength,
      rawScore: item.rawScore,
    };
  });
}
