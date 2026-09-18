import mongoose from 'mongoose';
import crypto from 'crypto';

const reportSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    reportId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: String,
      index: true,
      default: null
    },
    assessmentId: {
      type: String,
      index: true,
      default: null
    },
    versions: {
      assessmentVersion: { type: String, default: '2.0.0' },
      scoringVersion: { type: String, default: '2.0.0' },
      careerLibraryVersion: { type: String, default: '2.0.0' },
      reportPromptVersion: { type: String, default: '2.0.0' }
    },
    assessmentMetadata: {
      educationLevel: { type: String, required: true },
      completedQuestionsCount: { type: Number, default: 0 },
      assessmentVersion: { type: String, default: '2.0.0' }
    },
    rawScores: {
      type: Map,
      of: Number,
      default: {}
    },
    normalizedScores: {
      type: Map,
      of: Number,
      default: {}
    },
    traitScores: {
      type: Map,
      of: Number,
      default: {}
    },
    iqScore: {
      type: Number,
      default: 0
    },
    dominantTraits: {
      type: [String],
      default: []
    },
    topCareerRecommendations: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    strengths: {
      type: [String],
      default: []
    },
    developmentAreas: {
      type: [String],
      default: []
    },
    studyRecommendations: {
      type: [String],
      default: []
    },
    careerRoadmaps: {
      type: mongoose.Schema.Types.Mixed,
      default: []
    },
    analytics: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    aiInsights: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    executiveSummaryData: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    traitAnalysisDeep: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    careerComparison: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    swot: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    actionPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    learningStrategy: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    parentGuidance: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    skillGapAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    resourceRecommendations: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    generatedAt: {
      type: String,
      default: () => new Date().toISOString()
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret.reportId || ret._id;
        delete ret._id;
        delete ret.__v;
        // Convert Map fields to standard Plain Objects for JSON consistency
        if (ret.rawScores instanceof Map) ret.rawScores = Object.fromEntries(ret.rawScores);
        if (ret.normalizedScores instanceof Map) ret.normalizedScores = Object.fromEntries(ret.normalizedScores);
        if (ret.traitScores instanceof Map) ret.traitScores = Object.fromEntries(ret.traitScores);
        return ret;
      }
    }
  }
);

reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ reportId: 1, userId: 1 });

export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);
