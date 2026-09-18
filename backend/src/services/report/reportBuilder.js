import { generateAnalytics } from './analytics.service.js';
import { generateRoadmaps } from './roadmap.service.js';
import { getCurrentTimestamp } from './report.utils.js';

export const REPORT_VERSIONS = {
  assessmentVersion: '2.0.0',
  scoringVersion: '2.0.0',
  careerLibraryVersion: '2.0.0',
  reportPromptVersion: '2.0.0'
};

/**
 * Transforms assessment inputs and AI outputs into a standardized Canonical Report Object.
 * Acts as the validated single source of truth for downstream features (UI, Analytics, Roadmaps, PDF).
 * 
 * @param {Object} params
 * @param {string} params.educationLevel
 * @param {Array<Object>} params.responses
 * @param {Object} params.rawScores
 * @param {Object} params.normalizedScores
 * @param {number} [params.iqScore]
 * @param {string} [params.userId]
 * @param {Object} aiReport - AI analysis or deterministic fallback
 * @param {Array<Object>} engineCareers - Top career matches from deterministic engine
 * @returns {Object} Canonical validated report
 */
export const buildReport = ({ educationLevel, responses, rawScores, normalizedScores, iqScore, userId }, aiReport, engineCareers) => {
  const topCareerRecommendations = (engineCareers || []).map((engineCareer, idx) => {
    const aiCareer = aiReport?.topCareers?.find(
      c => (c.id && c.id === engineCareer.id) || (c.career && c.career.toLowerCase() === engineCareer.career.toLowerCase())
    );

    return {
      id: engineCareer.id,
      career: engineCareer.career,
      score: engineCareer.score,
      description: engineCareer.description,
      matchReason: aiCareer?.matchReason || aiCareer?.reason || engineCareer.description,
      requiredEducation: aiCareer?.requiredEducation || null,
      personalityFit: aiCareer?.personalityFit || null,
      industries: aiCareer?.industries || [],
      remoteOpportunities: aiCareer?.remoteOpportunities || null,
      entrepreneurshipScore: aiCareer?.entrepreneurshipScore || null,
      globalDemand: aiCareer?.globalDemand || null,
      requiredCertifications: aiCareer?.requiredCertifications || [],
      aiImpact: aiCareer?.aiImpact || null,
      salaryProgression: aiCareer?.salaryProgression || null,
      workEnvironment: aiCareer?.workEnvironment || null,
      pros: aiCareer?.pros || [],
      cons: aiCareer?.cons || [],
      whoShouldAvoid: aiCareer?.whoShouldAvoid || null,
      typicalDay: aiCareer?.typicalDay || null,
      growthPath: aiCareer?.growthPath || null
    };
  });

  const raw = rawScores || {};
  const normalized = normalizedScores || {};

  const report = {
    userId: userId || null,
    versions: REPORT_VERSIONS,
    assessmentMetadata: {
      educationLevel: educationLevel || 'undergraduate',
      completedQuestionsCount: Array.isArray(responses) ? responses.length : 0,
      assessmentVersion: REPORT_VERSIONS.assessmentVersion
    },
    rawScores: raw,
    normalizedScores: normalized,
    traitScores: normalized, // backward compatibility
    iqScore: iqScore !== undefined ? iqScore : 0,
    dominantTraits: extractDominantTraits(normalized),
    topCareerRecommendations,
    strengths: aiReport?.swot?.strengths || aiReport?.strengths || [
      'Logical structure formulation and methodical problem breakdown.',
      'Aptitude for specialized domain skill acquisition.'
    ],
    developmentAreas: aiReport?.swot?.weaknesses || aiReport?.skillsToDevelop || [
      'Public presentation and multi-stakeholder technical communication.',
      'Hands-on portfolio projects and specialized technical certifications.'
    ],
    studyRecommendations: aiReport?.learningStrategy?.recommendations || aiReport?.studyTips || [
      'Establish a weekly structured milestone calendar.',
      'Deconstruct complex domain challenges into testable mini-projects.'
    ],
    careerRoadmaps: generateRoadmaps(topCareerRecommendations),
    analytics: {},
    aiInsights: {
      summary: aiReport?.executiveSummary?.profileSummary || aiReport?.summary || 'Comprehensive psychometric analysis mapped against standardized career competencies.',
      closingMessage: aiReport?.aiInsights?.closingMessage || aiReport?.closingMessage || 'Focus on your core traits while systematically addressing identified development areas.',
      insightsList: aiReport?.aiInsights?.insightsList || aiReport?.aiInsights || []
    },
    executiveSummaryData: aiReport?.executiveSummary || null,
    traitAnalysisDeep: aiReport?.traitAnalysis || null,
    careerComparison: aiReport?.careerComparison || null,
    swot: aiReport?.swot || null,
    actionPlan: aiReport?.actionPlan || null,
    learningStrategy: aiReport?.learningStrategy || null,
    parentGuidance: aiReport?.parentGuidance || null,
    skillGapAnalysis: aiReport?.skillGapAnalysis || null,
    resourceRecommendations: aiReport?.resourceRecommendations || null,
    generatedAt: getCurrentTimestamp()
  };

  report.analytics = generateAnalytics(report);

  return report;
};

const extractDominantTraits = (scores = {}) => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trait]) => trait);
};
