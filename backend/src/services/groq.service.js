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
Generate a personalized career counseling report based on the student's traits and scores.
1. Provide an overall student profile summary ("summary").
2. Detail exactly why each of the 4 matched careers fits their specific traits ("reason" inside each item in "topCareers"). Use the exact names of the matched careers provided.
3. List 4 core strengths ("strengths") based on their high trait values.
4. List 3 key developmental areas / skills to improve ("skillsToDevelop") relevant to their profile.
5. Provide 3 highly targeted study and revision tips ("studyTips") customized for the student's education level.
6. Share a motivational closing statement ("closingMessage").

You MUST return a valid JSON object matching the following structure EXACTLY:
{
  "summary": "Detailed overall student profile summary...",
  "strengths": ["Core Strength 1", "Core Strength 2", "Core Strength 3", "Core Strength 4"],
  "skillsToDevelop": ["Growth Skill 1", "Growth Skill 2", "Growth Skill 3"],
  "studyTips": ["Personalized Study Tip 1", "Personalized Study Tip 2", "Personalized Study Tip 3"],
  "closingMessage": "A warm, inspiring motivational quote or closing statement...",
  "topCareers": [
    {
      "id": "career-id-1",
      "career": "Career Name 1",
      "score": 95,
      "reason": "Detailed explanation of why their traits (like problemSolving) make them highly compatible with this career..."
    },
    ... for all 4 careers in the exact order provided ...
  ]
}

Ensure the output is clean, valid JSON, containing only the JSON structure.
`;

  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Received an empty response from the Groq API completion.");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Groq Service Error:", error);
    throw new Error(`Failed to generate AI report: ${error.message}`);
  }
};
