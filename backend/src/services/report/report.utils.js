/**
 * Utility functions for report generation.
 */

/**
 * Returns current ISO timestamp.
 * @returns {string} ISO date string
 */
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Generates a mock confidence score between 80 and 99.
 * @returns {number} Confidence score
 */
export const generateConfidenceScore = () => {
  return Math.floor(Math.random() * (99 - 80 + 1) + 80);
};
