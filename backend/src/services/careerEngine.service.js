import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIBRARY_PATH = path.join(__dirname, '../data/careerLibrary.json');
const MASTER_PATH = path.join(__dirname, '../data/master.json');
let careerLibrary = [];
let masterQuestions = [];

try {
  careerLibrary = JSON.parse(fs.readFileSync(LIBRARY_PATH, 'utf-8'));
  const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf-8'));
  masterQuestions = masterData.questions || [];
} catch (error) {
  console.error("Error reading database files:", error);
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
      id: career.id,
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

/**
 * Evaluates detailed responses against master questions to generate trait scores and an IQ/Aptitude score.
 * 
 * @param {Array<Object>} responses - Array of response objects, e.g., [{ questionId: 'q-1', selectedOptionId: 'A' }]
 * @returns {Object} { traitScores: Object, iqScore: number }
 */
export const evaluateResponses = (responses) => {
  const traitScores = {};
  let iqScore = 0;

  if (!Array.isArray(responses) || masterQuestions.length === 0) {
    return { traitScores, iqScore };
  }

  responses.forEach(response => {
    const question = masterQuestions.find(q => q.id === response.questionId);
    if (!question) return;

    const selectedOption = question.options.find(opt => opt.id === response.selectedOptionId);
    if (!selectedOption) return;

    const isObjective = ['quantitative', 'spatial_pattern', 'logical_reasoning'].includes(question.questionType);
    
    // For objective questions, we only award points if correct
    if (isObjective) {
      if (selectedOption.isCorrect === true) {
        // Award traits
        if (selectedOption.traitScores) {
          Object.entries(selectedOption.traitScores).forEach(([trait, value]) => {
            traitScores[trait] = (traitScores[trait] || 0) + value;
          });
        }
        iqScore += 1; // Increment overall IQ score by 1 for each correct answer
      }
    } else {
      // For subjective (e.g. personality)
      if (selectedOption.traitScores) {
        Object.entries(selectedOption.traitScores).forEach(([trait, value]) => {
          traitScores[trait] = (traitScores[trait] || 0) + value;
        });
      }
    }
  });

  return { traitScores, iqScore };
};
