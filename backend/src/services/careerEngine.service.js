import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIBRARY_PATH = path.join(__dirname, '../data/careerLibrary.json');
let careerLibrary = [];

try {
  careerLibrary = JSON.parse(fs.readFileSync(LIBRARY_PATH, 'utf-8'));
} catch (error) {
  console.error("Error reading career library database:", error);
}

/**
 * Calculates career compatibility matches based on normalized profile shape.
 * 
 * Algorithm:
 * 1. Finds the maximum raw score the student obtained across all traits.
 * 2. Normalizes student scores to a 0-5 scale relative to their max score.
 * 3. For each career, calculates trait-by-trait distance (abs diff) to the required weights.
 * 4. Computes similarity (1.0 for perfect match, 0.0 for max distance), weighted by importance.
 * 5. Aggregates and normalizes to a percentage (0-100).
 * 6. Sorts descending and returns top 4 matches.
 * 
 * @param {Object} traitScores - Raw student scores (e.g. { logicalThinking: 8, problemSolving: 5 })
 * @returns {Array} List of top 4 career recommendations
 */
export const calculateCareerMatches = (traitScores) => {
  if (!traitScores || Object.keys(traitScores).length === 0) {
    return [];
  }

  // 1. Identify maximum student raw score (defaults to 1 if all are 0)
  const rawScores = Object.values(traitScores);
  const maxStudentScore = Math.max(...rawScores, 0) || 1;

  // 2. Score compatibility for every career profile
  const matches = careerLibrary.map((career) => {
    let totalSimilarityWeighted = 0;
    let totalWeight = 0;

    for (const [trait, requiredValue] of Object.entries(career.requiredTraits)) {
      const studentRawValue = traitScores[trait] || 0;
      // Normalize student value to 0-5 scale relative to their highest trait
      const normalizedStudentValue = (studentRawValue / maxStudentScore) * 5;

      // Distance on the 5-point scale
      const distance = Math.abs(normalizedStudentValue - requiredValue);
      // Map to similarity: distance 0 -> similarity 1, distance 5 -> similarity 0
      const similarity = Math.max(0, 5 - distance) / 5;

      // Accumulate weighted similarity based on importance value of the trait
      totalSimilarityWeighted += similarity * requiredValue;
      totalWeight += requiredValue;
    }

    const scorePercentage = totalWeight > 0 
      ? Math.round((totalSimilarityWeighted / totalWeight) * 100) 
      : 0;

    return {
      career: career.name,
      score: scorePercentage,
      description: career.description
    };
  });

  // 3. Sort by score percentage descending
  matches.sort((a, b) => b.score - a.score);

  // 4. Slice the top 4 matched profiles
  return matches.slice(0, 4);
};
