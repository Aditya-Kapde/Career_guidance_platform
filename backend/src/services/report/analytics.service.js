import { CANONICAL_TRAITS } from '../careerEngine.service.js';

/**
 * Deterministic analytics engine for PathFinder AI.
 * Transforms canonical raw and normalized trait scores into ranking, profile, and distribution metrics.
 */

export const generateAnalytics = (report) => {
  const normalizedScores = report.normalizedScores || report.traitScores || {};
  const rawScores = report.rawScores || {};
  const iqScore = report.iqScore;
  const topCareers = report.topCareerRecommendations || [];

  const traitRanking = getTraitRanking(normalizedScores, rawScores);
  const careerRanking = getCareerRanking(topCareers);
  
  const dominantTraits = traitRanking.slice(0, 5);
  const developmentAreas = traitRanking.slice(-5).reverse();

  const careerReadiness = calculateCareerReadiness(normalizedScores, topCareers);
  const careerConfidence = calculateCareerConfidence(normalizedScores, topCareers);
  
  const learningProfile = inferLearningProfile(normalizedScores);
  const interestDistribution = calculateInterestDistribution(topCareers);
  const strengthDistribution = calculateStrengthDistribution(normalizedScores);

  const overallProfileSummary = generateOverallSummary(traitRanking, careerRanking, interestDistribution, iqScore);

  return {
    traitRanking,
    dominantTraits,
    developmentAreas,
    careerRanking,
    careerReadiness,
    careerConfidence,
    learningProfile,
    interestDistribution,
    strengthDistribution,
    overallProfileSummary,
    ...(iqScore !== undefined && { iqScore })
  };
};

const getTraitRanking = (normalizedScores, rawScores) => {
  return CANONICAL_TRAITS
    .map((trait) => ({
      trait,
      score: normalizedScores[trait] || 0,
      rawScore: rawScores[trait] || 0,
      label: formatTraitLabel(trait)
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));
};

const formatTraitLabel = (traitKey) => {
  return traitKey
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const getCareerRanking = (topCareers) => {
  return [...topCareers].sort((a, b) => b.score - a.score);
};

const calculateCareerReadiness = (normalizedScores, topCareers) => {
  const scores = Object.values(normalizedScores);
  const avgNormalizedScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 50;
  const topCareerScore = topCareers.length > 0 ? topCareers[0].score : 50;
  
  // Both inputs are standard 0-100% scales
  const score = Math.min(100, Math.max(0, Math.round((avgNormalizedScore * 0.4) + (topCareerScore * 0.6))));
  
  let level = "Developing";
  let description = "Focus on building foundational skills across key domains.";
  
  if (score >= 80) {
    level = "Excellent";
    description = "Highly ready for career progression with strong foundational alignment across multiple traits.";
  } else if (score >= 65) {
    level = "Strong";
    description = "Well-prepared profile with solid competencies and clear specializations.";
  } else if (score >= 50) {
    level = "Moderate";
    description = "Balanced foundational readiness with actionable growth opportunities.";
  }

  return { score, level, description };
};

const calculateCareerConfidence = (normalizedScores, topCareers) => {
  const scores = Object.values(normalizedScores);
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 50;
  const variance = scores.length ? scores.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / scores.length : 0;
  
  // Spread between top 1 and top 2 career
  const spread = topCareers.length >= 2 ? (topCareers[0].score - topCareers[1].score) : 5;

  // Documented transparent calculation: decisive spread + score variance
  let score = Math.min(96, Math.max(70, Math.round(78 + (spread * 1.2) - (Math.sqrt(variance) * 0.15))));

  let level = "Moderate";
  let explanation = "Guidance alignment is calculated directly from your response distribution.";

  if (score >= 85) {
    level = "High";
    explanation = "Clear distinction in top careers and decisive trait scoring patterns indicate strong alignment.";
  } else if (score < 75) {
    level = "Exploratory";
    explanation = "Balanced trait distribution suggests versatility across multiple potential disciplines.";
  }

  return { score, level, explanation };
};

const inferLearningProfile = (normalizedScores) => {
  // Map using canonical 15 traits
  const profileScores = {
    "Analytical & Structured": ((normalizedScores.logicalThinking || 0) + (normalizedScores.analyticalThinking || 0) + (normalizedScores.problemSolving || 0)) / 3,
    "Visual & Creative": ((normalizedScores.creativity || 0) + (normalizedScores.curiosity || 0)) / 2,
    "Collaborative & Interactive": ((normalizedScores.teamwork || 0) + (normalizedScores.communication || 0) + (normalizedScores.empathy || 0)) / 3,
    "Practical & Project-Based": ((normalizedScores.planning || 0) + (normalizedScores.decisionMaking || 0) + (normalizedScores.adaptability || 0)) / 3
  };

  const sortedProfiles = Object.entries(profileScores).sort(([, a], [, b]) => b - a);
  const topProfile = sortedProfiles[0];
  const style = topProfile ? topProfile[0] : "Analytical & Structured";
  const confidence = Math.round(Math.min(95, Math.max(70, (topProfile ? topProfile[1] : 60))));

  return {
    preferredStyle: style,
    confidence
  };
};

const calculateInterestDistribution = (topCareers) => {
  const categories = {
    Technology: ["developer", "engineer", "software", "data", "cloud", "cybersecurity", "ai", "computer"],
    Engineering: ["civil", "mechanical", "architect", "structural"],
    Business: ["accountant", "analyst", "finance", "banker", "marketing", "entrepreneur", "management"],
    Healthcare: ["doctor", "psychologist", "medical", "nurse", "health"],
    Creative: ["designer", "ux", "graphic", "artist", "media"],
    Education: ["teacher", "educator", "professor", "academic"]
  };

  const distribution = {
    Technology: 0,
    Engineering: 0,
    Business: 0,
    Healthcare: 0,
    Creative: 0,
    Education: 0,
    Other: 0
  };

  let totalHits = 0;

  topCareers.forEach(careerObj => {
    const id = (careerObj.id || '').toLowerCase();
    const name = (careerObj.career || '').toLowerCase();
    const searchTarget = `${id} ${name}`;
    let matched = false;

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(kw => searchTarget.includes(kw))) {
        distribution[category] += careerObj.score || 50;
        totalHits += careerObj.score || 50;
        matched = true;
        break;
      }
    }
    if (!matched) {
      distribution.Other += careerObj.score || 50;
      totalHits += careerObj.score || 50;
    }
  });

  if (totalHits === 0) return distribution;

  Object.keys(distribution).forEach(k => {
    distribution[k] = Math.round((distribution[k] / totalHits) * 100);
  });

  return distribution;
};

const calculateStrengthDistribution = (normalizedScores) => {
  const buckets = {
    Technical: ["logicalThinking", "analyticalThinking", "problemSolving"],
    Creative: ["creativity", "curiosity"],
    Communication: ["communication", "empathy", "teamwork"],
    Leadership: ["leadership", "decisionMaking"],
    Execution: ["planning", "attentionToDetail", "adaptability", "riskTaking"]
  };

  const distribution = {};

  for (const [bucket, mappedTraits] of Object.entries(buckets)) {
    let sum = 0;
    let count = 0;
    mappedTraits.forEach(t => {
      if (normalizedScores[t] !== undefined) {
        sum += normalizedScores[t];
        count++;
      }
    });
    distribution[bucket] = count > 0 ? Math.round(sum / count) : 50;
  }

  return distribution;
};

const generateOverallSummary = (traitRanking, careerRanking, interestDistribution, iqScore) => {
  const topStrength = traitRanking.length > 0 ? traitRanking[0].label : "Logical Thinking";
  const lowestTrait = traitRanking.length > 0 ? traitRanking[traitRanking.length - 1].label : "General Traits";
  const highestCareerMatch = careerRanking.length > 0 ? careerRanking[0].career : "Selected Field";
  
  let overallCategory = "Technology & Engineering";
  let maxInterest = -1;
  for (const [cat, pct] of Object.entries(interestDistribution)) {
    if (pct > maxInterest && cat !== "Other") {
      maxInterest = pct;
      overallCategory = cat;
    }
  }

  return {
    topStrength,
    topDevelopmentArea: lowestTrait,
    highestCareerMatch,
    highestTrait: topStrength,
    lowestTrait,
    overallCategory,
    ...(iqScore !== undefined && { iqScore })
  };
};
