/**
 * Simple in-memory store for the latest generated report.
 * Used temporarily until a database and assessment ID system is implemented.
 */

let latestReport = null;

/**
 * Saves a report to memory.
 * @param {import('./report.types.js').UnifiedReport} report 
 */
export const saveLatestReport = (report) => {
  latestReport = report;
};

/**
 * Retrieves the most recently saved report.
 * @returns {import('./report.types.js').UnifiedReport | null}
 */
export const getLatestReport = () => {
  return latestReport;
};
