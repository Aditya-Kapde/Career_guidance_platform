import { calculateCareerMatches } from '../services/careerEngine.service.js';
import { generateCareerReport, getGroqClient } from '../services/groq.service.js';

export const startAssessment = async (req, res) => {
  res.status(200).json({ message: "Assessment controller placeholder" });
};

export const submitAssessment = async (req, res) => {
  res.status(200).json({ message: "Assessment submit placeholder" });
};

/**
 * Controller endpoint to analyze student responses and return matching career paths.
 * Exposes: POST /api/assessment/analyze
 */
export const analyzeAssessment = async (req, res) => {
  try {
    const { educationLevel, responses, traitScores } = req.body;

    // Validation checks
    if (
    !educationLevel ||
    !traitScores ||
    Object.keys(traitScores).length === 0
) {
    return res.status(400).json({
        error: "Invalid assessment payload."
    });
}

    // 1. Calculate top 4 matches using the deterministic Compatibility Engine (Source of Truth)
    const topCareers = calculateCareerMatches(traitScores);
    if (topCareers.length === 0) {
      return res.status(400).json({ 
        error: "Unable to calculate matches. Ensure traitScores contains non-zero values." 
      });
    }

    // 2. Verify if Groq SDK key is configured. If not, return deterministic fallback results
    const groqClient = getGroqClient();
    if (!groqClient) {
      console.warn("GROQ_API_KEY is not defined. Returning matching engine results with placeholders.");
      return res.status(200).json({
        summary: "Assessment successfully processed. To unlock personalized AI analysis, study tips, and detailed career fits, please configure GROQ_API_KEY in the backend .env file.",
        strengths: [
          "Logical thinking and task breakdown capability",
          "Aptitude for structured academic problem solving"
        ],
        skillsToDevelop: [
          "Specialized domain certifications",
          "Public presentation and teamwork coordination"
        ],
        studyTips: [
          "Construct calendar schedules listing daily milestones",
          "Practice problem deconstruction techniques"
        ],
        closingMessage: "Configure your GROQ_API_KEY to unlock personalized AI guidance!",
        topCareers: topCareers.map(c => ({
          id: c.id,
          career: c.career,
          score: c.score,
          reason: c.description // Fallback value from library
        }))
      });
    }

    // 3. Call Groq service to generate personalized explanations
    const aiReport = await generateCareerReport({ educationLevel, responses, traitScores }, topCareers);
    
    // Inject IDs back into the AI report's topCareers array based on name matching
    if (aiReport && Array.isArray(aiReport.topCareers)) {
      aiReport.topCareers = aiReport.topCareers.map(aiCareer => {
        const matched = topCareers.find(c => c.career.toLowerCase() === aiCareer.career.toLowerCase());
        return {
          id: matched ? matched.id : null,
          ...aiCareer
        };
      });
    }
    
    return res.status(200).json({
      success: true,
      educationLevel,
      traitScores,
      report: aiReport
    });
  } catch (error) {
    console.error("Error in analyzeAssessment controller:", error);
    return res.status(500).json({ 
      error: error.message || "An unexpected error occurred during profile evaluation." 
    });
  }
};
