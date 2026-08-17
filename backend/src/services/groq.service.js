import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';

let groqInstance = null;

/**
 * Initializes and returns the Groq client instance if the API key is configured.
 * @returns {Groq|null}
 */
export const getGroqClient = () => {
  if (!groqInstance && process.env.GROQ_API_KEY) {
    groqInstance = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqInstance;
};

/**
 * Generates structured, personalized career explanations using Groq LLM completions.
 * 
 * @param {Object} payload - Assessment state data containing educationLevel and traitScores
 * @param {Array} topCareers - Top 4 careers computed deterministically by the Career Engine
 * @returns {Object} Personalized career report JSON
 */
export const generateCareerReport = async (payload, topCareers) => {
  const client = getGroqClient();
  if (!client) {
    throw new Error("Groq API client is not initialized. Please ensure GROQ_API_KEY is configured in your .env file.");
  }

  // Identify top dominant traits
  const sortedTraits = Object.entries(payload.traitScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait]) => trait);

  // Construct a highly structured instruction prompt
  const userPrompt = `
You are a senior career advisor analyzing a student's preference profile.

STUDENT PROFILE DETAILS:
- Current Education Level: ${payload.educationLevel}
- Dominant Student Traits: ${sortedTraits.join(', ')}
- Full Trait Scores: ${JSON.stringify(payload.traitScores)}

DETERMINISTIC COMPATIBILITY RANKINGS (Calculated by the backend scoring engine):
${topCareers.map((c, i) => `${i + 1}. ${c.career} (ID: ${c.id}, Match Score: ${c.score}%). Description: ${c.description}`).join('\n')}

INSTRUCTIONS:
Generate a premium, deeply personalized career consulting report based on the student's traits.
Do NOT use generic AI language. Write like a seasoned McKinsey consultant advising a student.
Never repeat the same sentence twice. 
CRITICAL: NEVER generate motivational quotes like "Believe in yourself". Every single insight must reference specific assessment findings (e.g. "Your high adaptability score explains why entrepreneurship ranked above...").

You MUST return a valid JSON object matching the following structure EXACTLY:
{
  "executiveSummary": {
    "profileSummary": "High-level summary of the student.",
    "personalityInterpretation": "...",
    "dominantBehaviour": "...",
    "learningStyle": "...",
    "communicationStyle": "...",
    "decisionMaking": "...",
    "biggestStrength": "...",
    "biggestDevelopmentOpportunity": "...",
    "readiness": "...",
    "confidenceLevel": "..."
  },
  "traitAnalysis": [
    {
      "trait": "Name of trait",
      "interpretation": "What the score means",
      "realWorldImpact": "...",
      "advantages": "...",
      "limitations": "...",
      "improvements": "...",
      "careerRelevance": "..."
    } // Generate for top 4 traits
  ],
  "topCareers": [
    {
      "id": "career-id-1",
      "career": "Career Name 1",
      "score": 95,
      "matchReason": "Deep, evidence-based reason why this career matches",
      "requiredEducation": "...",
      "personalityFit": "...",
      "industries": ["...", "..."],
      "remoteOpportunities": "...",
      "entrepreneurshipScore": "High/Med/Low",
      "globalDemand": "...",
      "requiredCertifications": ["...", "..."],
      "aiImpact": "...",
      "salaryProgression": "...",
      "workEnvironment": "...",
      "pros": ["...", "..."],
      "cons": ["...", "..."],
      "whoShouldAvoid": "...",
      "typicalDay": "...",
      "growthPath": "..."
    } // For all 4 careers provided in the prompt
  ],
  "careerComparison": [
    {
      "career": "Career Name",
      "salary": "High/Med/Low",
      "difficulty": "High/Med/Low",
      "educationLength": "Short/Med/Long",
      "futureScope": "...",
      "aiResistance": "...",
      "creativity": "...",
      "leadership": "...",
      "communication": "...",
      "jobStability": "...",
      "competition": "...",
      "remoteWork": "Yes/No",
      "entrepreneurial": "High/Med/Low"
    } // For all 4 careers
  ],
  "swot": {
    "strengths": ["...", "...", "..."],
    "weaknesses": ["...", "...", "..."],
    "opportunities": ["...", "...", "..."],
    "threats": ["...", "...", "..."]
  },
  "actionPlan": [
    { "phase": "30 Days", "skills": "...", "books": "...", "courses": "...", "projects": "...", "habits": "...", "competitions": "...", "certifications": "..." },
    { "phase": "90 Days", "skills": "...", "books": "...", "courses": "...", "projects": "...", "habits": "...", "competitions": "...", "certifications": "..." },
    { "phase": "6 Months", "skills": "...", "books": "...", "courses": "...", "projects": "...", "habits": "...", "competitions": "...", "certifications": "..." },
    { "phase": "1 Year", "skills": "...", "books": "...", "courses": "...", "projects": "...", "habits": "...", "competitions": "...", "certifications": "..." },
    { "phase": "3 Years", "skills": "...", "books": "...", "courses": "...", "projects": "...", "habits": "...", "competitions": "...", "certifications": "..." }
  ],
  "learningStrategy": {
    "howTheyLearnBest": "...",
    "recommendations": ["watch videos", "read books", "build projects", "join communities", "learn alone", "learn in groups"] // keep only the ones that apply
  },
  "parentGuidance": {
    "howToSupport": "...",
    "whatNotToForce": "...",
    "extracurriculars": "...",
    "howToMotivate": "...",
    "avoidBurnout": "...",
    "evaluateProgress": "..."
  },
  "skillGapAnalysis": [
    { "skill": "...", "targetLevel": "...", "priority": "High/Med/Low", "difficulty": "...", "estimatedTime": "...", "recommendedResources": "..." } // Top 4 skills
  ],
  "resourceRecommendations": [
    { "type": "Book", "name": "...", "explanation": "..." },
    { "type": "YouTube Channel", "name": "...", "explanation": "..." },
    { "type": "Course", "name": "...", "explanation": "..." } // Provide 6-8 varied resources
  ],
  "aiInsights": [
    "Insight 1 (e.g. You naturally communicate ideas well...)",
    "Insight 2 (e.g. Your low analytical score suggests...)" // 3-4 insights
  ],
  "closingMessage": "A professional, inspiring closing statement."
}

Ensure the output is clean, valid JSON, containing only the JSON structure.
`;

  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 8000,
      temperature: 0.3
    });

    let content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Received an empty response from the Groq API completion.");
    }
    
    // Remove reasoning blocks (e.g., <think>...</think>) from Qwen/DeepSeek models
    content = content.replace(/<think>[\s\S]*?<\/think>/ig, '').trim();
    // Clean markdown formatting if model outputted code blocks
    content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    // Sometimes models might still have pre-text or post-text. Extract just the {...} part as a fallback
    if (!content.startsWith('{')) {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        content = match[0];
      }
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Groq Service Error:", error);
    throw new Error(`Failed to generate AI report: ${error.message}`);
  }
};
