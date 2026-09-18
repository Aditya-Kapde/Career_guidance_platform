import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIBRARY_PATH = path.join(__dirname, '../data/careerLibrary.json');
const MASTER_PATH = path.join(__dirname, '../data/master.json');

export const CANONICAL_TRAITS = [
  'logicalThinking',
  'problemSolving',
  'creativity',
  'leadership',
  'communication',
  'curiosity',
  'teamwork',
  'decisionMaking',
  'adaptability',
  'planning',
  'attentionToDetail',
  'riskTaking',
  'analyticalThinking',
  'empathy',
  'learningStyle'
];

let careerLibrary = [];
let masterQuestions = [];

const loadData = () => {
  try {
    careerLibrary = JSON.parse(fs.readFileSync(LIBRARY_PATH, 'utf-8'));
    const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf-8'));
    masterQuestions = masterData.questions || [];
  } catch (error) {
    console.error("Error reading database files in careerEngine:", error);
  }
};

loadData();

/**
 * Evaluates detailed responses against master questions to generate raw & normalized trait scores.
 * 
 * @param {Array<{ questionId: string, selectedOptionId: string }>} responses
 * @returns {{ rawScores: Object, normalizedScores: Object, iqScore: number, validCount: number }}
 */
export const evaluateResponses = (responses) => {
  if (masterQuestions.length === 0) loadData();

  const rawScores = {};
  const maxPossibleScores = {};
  
  CANONICAL_TRAITS.forEach(t => {
    rawScores[t] = 0;
    maxPossibleScores[t] = 0;
  });

  // Calculate theoretical max for normalization
  masterQuestions.forEach(q => {
    if (q.options) {
      const traitMaxInQuestion = {};
      q.options.forEach(opt => {
        if (opt.traitScores) {
          Object.entries(opt.traitScores).forEach(([t, val]) => {
            if (CANONICAL_TRAITS.includes(t)) {
              traitMaxInQuestion[t] = Math.max(traitMaxInQuestion[t] || 0, val);
            }
          });
        }
      });
      Object.entries(traitMaxInQuestion).forEach(([t, val]) => {
        maxPossibleScores[t] = (maxPossibleScores[t] || 0) + val;
      });
    }
  });

  let iqScore = 0;
  let validCount = 0;

  if (!Array.isArray(responses) || responses.length === 0) {
    const normalizedScores = {};
    CANONICAL_TRAITS.forEach(t => { normalizedScores[t] = 0; });
    return { rawScores, normalizedScores, iqScore, validCount: 0 };
  }

  responses.forEach(res => {
    if (!res || !res.questionId || !res.selectedOptionId) return;

    const question = masterQuestions.find(q => q.id === res.questionId);
    if (!question) return;

    const selectedOption = question.options?.find(opt => opt.id === res.selectedOptionId);
    if (!selectedOption) return;

    validCount++;

    const isObjective = ['quantitative', 'spatial_pattern', 'pattern', 'logical_reasoning'].includes(question.questionType || question.type)
      || question.category === 'aptitude'
      || question.category === 'IQ ANALYSIS';

    if (isObjective) {
      const hasTraits = selectedOption.traitScores && Object.values(selectedOption.traitScores).some(v => v > 0);
      if (selectedOption.isCorrect === true || hasTraits) {
        if (selectedOption.traitScores) {
          Object.entries(selectedOption.traitScores).forEach(([trait, val]) => {
            if (trait in rawScores) {
              rawScores[trait] += val;
            }
          });
        }
        if (selectedOption.isCorrect === true || hasTraits) {
          iqScore += 1;
        }
      }
    } else {
      if (selectedOption.traitScores) {
        Object.entries(selectedOption.traitScores).forEach(([trait, val]) => {
          if (trait in rawScores) {
            rawScores[trait] += val;
          }
        });
      }
    }
  });

  // Calculate normalized scores (0-100%)
  const normalizedScores = {};
  const maxRawObtained = Math.max(...Object.values(rawScores), 1);

  CANONICAL_TRAITS.forEach(t => {
    const possibleMax = maxPossibleScores[t] || 10;
    // Scale against possible max, or profile-relative if low sample
    const absolutePercent = Math.min(100, Math.round((rawScores[t] / possibleMax) * 100));
    const relativePercent = Math.min(100, Math.round((rawScores[t] / maxRawObtained) * 100));
    // Blended normalization for balanced representation
    normalizedScores[t] = Math.max(0, Math.min(100, Math.round((absolutePercent * 0.6) + (relativePercent * 0.4))));
  });

  return { rawScores, normalizedScores, iqScore, validCount };
};

/**
 * Calculates career compatibility matches based on normalized profile shape.
 * 
 * @param {Object} normalizedScores - Normalized student scores (0-100) or raw trait scores
 * @returns {Array} List of top 4 career recommendations
 */
export const calculateCareerMatches = (normalizedScores) => {
  if (careerLibrary.length === 0) loadData();
  if (!normalizedScores || Object.keys(normalizedScores).length === 0) {
    return [];
  }

  // Determine scaling
  const maxScore = Math.max(...Object.values(normalizedScores), 0) || 1;
  const isZeroToOneHundred = maxScore > 10;

  const matches = careerLibrary.map((career) => {
    let totalSimilarityWeighted = 0;
    let totalWeight = 0;

    for (const [trait, requiredValue] of Object.entries(career.requiredTraits)) {
      const studentValue = normalizedScores[trait] || 0;
      // Convert student value to 0-5 scale
      const studentScale5 = isZeroToOneHundred 
        ? (studentValue / 100) * 5 
        : (studentValue / maxScore) * 5;

      const distance = Math.abs(studentScale5 - requiredValue);
      const similarity = Math.max(0, 5 - distance) / 5;

      totalSimilarityWeighted += similarity * requiredValue;
      totalWeight += requiredValue;
    }

    const scorePercentage = totalWeight > 0 
      ? Math.round((totalSimilarityWeighted / totalWeight) * 100) 
      : 0;

    return {
      id: career.id,
      career: career.name,
      score: Math.min(100, Math.max(30, scorePercentage)),
      description: career.description
    };
  });

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 4);
};
