/**
 * @typedef {Object} AssessmentMetadata
 * @property {string} educationLevel - The student's education level.
 */

/**
 * @typedef {Object} CareerRecommendation
 * @property {string} id - Career ID.
 * @property {string} career - Career title.
 * @property {number} score - Compatibility score.
 * @property {string} reason - Description or explanation for why it matches.
 */

/**
 * @typedef {Object} UnifiedReport
 * @property {Object} student - Placeholder for student info if added later.
 * @property {AssessmentMetadata} assessmentMetadata - Metadata about the assessment.
 * @property {Object} traitScores - Normalized scores for each trait evaluated.
 * @property {number} [iqScore] - Overall metric for objective aptitude/IQ questions.
 * @property {Array<CareerRecommendation>} topCareerRecommendations - Deterministic engine recommendations with AI enhancements.
 * @property {Array<string>} strengths - Key strengths identified.
 * @property {Array<string>} developmentAreas - Areas for skill development.
 * @property {Array<string>} studyRecommendations - Recommended study techniques.
 * @property {Object} aiInsights - Any raw or extra AI analysis.
 * @property {Object} analytics - Analytics data placeholder.
 * @property {Array<Object>} careerRoadmaps - Roadmap data placeholder.
 * @property {number} confidenceScore - Estimated confidence in the results (1-100).
 * @property {string} generatedAt - ISO Timestamp of generation.
 */

/**
 * @typedef {Object} AssessmentOption
 * @property {string} id - Option ID (e.g., "A", "B").
 * @property {string} text - The text of the option.
 * @property {boolean} [isCorrect] - (Optional) True if this is the correct answer (for objective questions).
 * @property {string} [image] - (Optional) Path to an image for the option.
 * @property {Object} [traitScores] - Trait weights assigned to this option.
 */

/**
 * @typedef {Object} AssessmentQuestion
 * @property {string} id - Question ID.
 * @property {string} [category] - (Optional) Category, e.g., "IQ ANALYSIS", "QUANTITATIVE".
 * @property {'personality'|'quantitative'|'spatial_pattern'|'logical_reasoning'|'single'|'multiple'} questionType - The type of question.
 * @property {string} question - The text of the question.
 * @property {string} [questionImage] - (Optional) Path to an image for matrix/puzzle questions.
 * @property {Array<AssessmentOption>} options - The available choices.
 */

export {}; // Make it a module
