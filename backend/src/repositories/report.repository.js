import crypto from 'crypto';
import { Report } from '../models/Report.js';

export class ReportRepository {
  async create(reportData, userId = null, assessmentId = null) {
    const reportId = reportData.id || reportData.reportId || crypto.randomUUID();
    
    // Normalize Maps/Objects for persistence
    const reportDoc = new Report({
      _id: reportId,
      reportId,
      userId: userId || reportData.userId || null,
      assessmentId: assessmentId || reportData.assessmentId || null,
      versions: reportData.versions || {
        assessmentVersion: '2.0.0',
        scoringVersion: '2.0.0',
        careerLibraryVersion: '2.0.0',
        reportPromptVersion: '2.0.0'
      },
      assessmentMetadata: reportData.assessmentMetadata || {
        educationLevel: reportData.educationLevel || 'undergraduate',
        completedQuestionsCount: Array.isArray(reportData.responses) ? reportData.responses.length : 0,
        assessmentVersion: '2.0.0'
      },
      rawScores: reportData.rawScores || {},
      normalizedScores: reportData.normalizedScores || {},
      traitScores: reportData.traitScores || {},
      iqScore: reportData.iqScore !== undefined ? reportData.iqScore : 0,
      dominantTraits: reportData.dominantTraits || [],
      topCareerRecommendations: reportData.topCareerRecommendations || [],
      strengths: reportData.strengths || [],
      developmentAreas: reportData.developmentAreas || [],
      studyRecommendations: reportData.studyRecommendations || [],
      careerRoadmaps: reportData.careerRoadmaps || [],
      analytics: reportData.analytics || {},
      aiInsights: reportData.aiInsights || {},
      executiveSummaryData: reportData.executiveSummaryData || null,
      traitAnalysisDeep: reportData.traitAnalysisDeep || null,
      careerComparison: reportData.careerComparison || null,
      swot: reportData.swot || null,
      actionPlan: reportData.actionPlan || null,
      learningStrategy: reportData.learningStrategy || null,
      parentGuidance: reportData.parentGuidance || null,
      skillGapAnalysis: reportData.skillGapAnalysis || null,
      resourceRecommendations: reportData.resourceRecommendations || null,
      generatedAt: reportData.generatedAt || new Date().toISOString()
    });

    await reportDoc.save();
    return reportId;
  }

  async findById(reportId) {
    if (!reportId) return null;
    const doc = await Report.findOne({ $or: [{ reportId }, { _id: reportId }] });
    return doc ? doc.toJSON() : null;
  }

  async findByUserId(userId) {
    if (!userId) return [];
    const docs = await Report.find({ userId }).sort({ createdAt: -1 });
    return docs.map(d => d.toJSON());
  }

  async deleteById(reportId) {
    return Report.deleteOne({ $or: [{ reportId }, { _id: reportId }] });
  }

  async clear() {
    return Report.deleteMany({});
  }
}

export const reportRepository = new ReportRepository();
