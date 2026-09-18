import { reportRepository } from '../../repositories/report.repository.js';

/**
 * Saves a report to persistent MongoDB storage associated with a specific user.
 * @param {Object} report 
 * @param {string|null} userId 
 * @returns {Promise<string>} reportId
 */
export const saveReport = async (report, userId = null) => {
  return reportRepository.create(report, userId || report.userId || null);
};

/**
 * Retrieves a report by its ID from persistent storage.
 * @param {string} reportId 
 * @returns {Promise<Object | null>}
 */
export const getReport = async (reportId) => {
  if (!reportId) return null;
  return reportRepository.findById(reportId);
};

/**
 * Retrieves all reports owned by a specific user from persistent storage.
 * @param {string} userId 
 * @returns {Promise<Array<Object>>}
 */
export const getReportsByUserId = async (userId) => {
  if (!userId) return [];
  return reportRepository.findByUserId(userId);
};

/**
 * Reset store (for testing).
 */
export const clearReportStore = async () => {
  return reportRepository.clear();
};
