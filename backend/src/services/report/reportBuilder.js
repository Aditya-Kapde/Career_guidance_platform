import { generateAnalytics } from './analytics.service.js';
import { generateRoadmaps } from './roadmap.service.js';
import { getCurrentTimestamp, generateConfidenceScore } from './report.utils.js';

/**
 * Transforms assessment inputs and AI outputs into a standardized Unified Report Object.
 * This acts as the single source of truth for downstream features like analytics, roadmaps, and PDFs.
 * 
 * @param {Object} assessmentInput - The original payload (educationLevel, responses, traitScores)
 * @param {Object} aiReport - The generated AI analysis or fallback analysis
 * @param {Array<Object>} engineCareers - Top career matches from the deterministic engine
 * @returns {import('./report.types.js').UnifiedReport}
 */
export const buildReport = (assessmentInput, aiReport, engineCareers) => {
  // Combine careers from AI and engine, utilizing the AI descriptions if available
  const topCareerRecommendations = (aiReport?.topCareers || engineCareers).map(career => {
    const engineMatch = engineCareers.find(c => c.career.toLowerCase() === career.career.toLowerCase());
    return {
      id: career.id || (engineMatch ? engineMatch.id : null),
      career: career.career,
      score: career.score || (engineMatch ? engineMatch.score : null),
      reason: career.matchReason || career.reason || (engineMatch ? engineMatch.description : null),
      // Advanced deep dive fields
      // Advanced deep dive fields
      requiredEducation: career.requiredEducation || null,
      personalityFit: career.personalityFit || null,
      industries: career.industries || [],
      remoteOpportunities: career.remoteOpportunities || null,
      entrepreneurshipScore: career.entrepreneurshipScore || null,
      globalDemand: career.globalDemand || null,
      requiredCertifications: career.requiredCertifications || [],
      aiImpact: career.aiImpact || null,
      salaryProgression: career.salaryProgression || null,
      workEnvironment: career.workEnvironment || null,
      pros: career.pros || [],
      cons: career.cons || [],
      whoShouldAvoid: career.whoShouldAvoid || null,
      typicalDay: career.typicalDay || null,
      growthPath: career.growthPath || null
    };
  });

  const report = {
    student: {}, // Placeholder for future user profile integration
    assessmentMetadata: {
      educationLevel: assessmentInput.educationLevel || "Unknown",
    },
    traitScores: assessmentInput.traitScores || {},
    iqScore: assessmentInput.iqScore,
    dominantTraits: extractDominantTraits(assessmentInput.traitScores),
    careerCompatibility: {}, // Placeholder for broader compatibility metrics
    topCareerRecommendations,
    // Provide fallbacks if old schema was generated
    strengths: aiReport?.swot?.strengths || aiReport?.strengths || [],
    developmentAreas: aiReport?.swot?.weaknesses || aiReport?.skillsToDevelop || [],
    studyRecommendations: aiReport?.learningStrategy?.recommendations || aiReport?.studyTips || [],
    careerRoadmaps: generateRoadmaps(topCareerRecommendations),
    analytics: {}, // Placeholder, will be populated below
    aiInsights: {
      summary: aiReport?.executiveSummary?.profileSummary || aiReport?.summary || "",
      closingMessage: aiReport?.closingMessage || "",
      insightsList: aiReport?.aiInsights || []
    },
    // New Advanced Phase 6 fields
    executiveSummaryData: aiReport?.executiveSummary || null,
    traitAnalysisDeep: aiReport?.traitAnalysis || null,
    careerComparison: aiReport?.careerComparison || null,
    swot: aiReport?.swot || null,
    actionPlan: aiReport?.actionPlan || null,
    learningStrategy: aiReport?.learningStrategy || null,
    parentGuidance: aiReport?.parentGuidance || null,
    skillGapAnalysis: aiReport?.skillGapAnalysis || null,
    resourceRecommendations: aiReport?.resourceRecommendations || null,
    confidenceScore: generateConfidenceScore(),
    generatedAt: getCurrentTimestamp()
  };

  report.analytics = generateAnalytics(report);

  return report;
};

/**
 * Helper to extract top traits from the traitScores object.
 * @param {Object} scores 
 * @returns {Array<string>}
 */
const extractDominantTraits = (scores = {}) => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trait]) => trait);
};
