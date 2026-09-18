import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculateCareerMatches, evaluateResponses } from '../services/careerEngine.service.js';
import { generateCareerReport, getGroqClient } from '../services/groq.service.js';
import { buildReport, REPORT_VERSIONS } from '../services/report/reportBuilder.js';
import { saveReport } from '../services/report/reportStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MASTER_PATH = path.join(__dirname, '../data/master.json');

/**
 * Returns the versioned question catalog for assessment.
 * Exposes: GET /api/assessment/questions
 */
export const getQuestions = async (req, res) => {
  try {
    const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf-8'));
    return res.status(200).json({
      success: true,
      metadata: {
        version: REPORT_VERSIONS.assessmentVersion,
        totalQuestions: masterData.questions?.length || 0,
        description: masterData.metadata?.description
      },
      traits: masterData.traits || [],
      educationLevels: masterData.educationLevels || [],
      questions: masterData.questions || []
    });
  } catch (error) {
    console.error("Error reading questions:", error);
    return res.status(500).json({ error: "Failed to load assessment questions." });
  }
};

/**
 * Controller endpoint to analyze student responses, score server-side, and return canonical report.
 * Exposes: POST /api/assessment/analyze
 */
export const analyzeAssessment = async (req, res) => {
  try {
    let { educationLevel, responses } = req.body;
    const userId = req.user ? req.user.id : null;

    // Strict Input Validation
    if (!educationLevel || typeof educationLevel !== 'string' || educationLevel.length > 50) {
      return res.status(400).json({ error: "Invalid or missing education level." });
    }

    if (!Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: "Assessment responses array is required." });
    }

    // 1. Server-side Response Evaluation (Single Source of Truth)
    const evaluation = evaluateResponses(responses);
    const { rawScores, normalizedScores, iqScore, validCount } = evaluation;

    if (validCount === 0) {
      return res.status(400).json({ error: "None of the submitted responses matched valid question IDs." });
    }

    // 2. Deterministic Career Matching Engine
    const topCareers = calculateCareerMatches(normalizedScores);
    if (topCareers.length === 0) {
      return res.status(400).json({ 
        error: "Unable to calculate matches from assessment response distribution." 
      });
    }

    // 3. AI Insights or Deterministic Fallback Generation
    const groqClient = getGroqClient();
    let aiReport = null;

    if (groqClient) {
      try {
        aiReport = await generateCareerReport({ educationLevel, responses, traitScores: normalizedScores }, topCareers);
      } catch (aiErr) {
        console.warn("Groq AI generation warning (using fallback):", aiErr.message);
      }
    }

    if (!aiReport) {
      aiReport = {
        summary: `Assessment successfully evaluated across 15 psychometric dimensions for ${educationLevel.replace('-', ' ')}.`,
        strengths: [
          "Demonstrated structured logical thinking and problem deconstruction aptitude.",
          "High alignment with analytical reasoning and systemic evaluation."
        ],
        skillsToDevelop: [
          "Hands-on technical portfolio construction and industrial tooling.",
          "Multi-stakeholder technical presentation and active team collaboration."
        ],
        studyTips: [
          "Construct milestone-driven calendar blocks for weekly self-study.",
          "Practice end-to-end problem decomposition on real-world projects."
        ],
        closingMessage: "Use these personalized results and roadmaps to navigate your next academic and career milestones.",
        topCareers: topCareers.map(c => ({
          id: c.id,
          career: c.career,
          score: c.score,
          reason: c.description
        }))
      };
    }

    // 4. Build Canonical Validated Report
    const unifiedReport = buildReport(
      { educationLevel, responses, rawScores, normalizedScores, iqScore, userId },
      aiReport,
      topCareers
    );

    // 5. Persist Report & Assessment
    const reportId = await saveReport(unifiedReport, userId);

    return res.status(200).json({
      success: true,
      reportId,
      educationLevel,
      rawScores,
      normalizedScores,
      iqScore,
      report: unifiedReport
    });
  } catch (error) {
    console.error("Error in analyzeAssessment controller:", error);
    return res.status(500).json({ 
      error: error.message || "An unexpected error occurred during profile evaluation." 
    });
  }
};
