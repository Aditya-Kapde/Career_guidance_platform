/**
 * In-memory store for generated reports.
 * Keys are UUIDs and values are the report objects.
 * Features a simple TTL cleanup to prevent memory exhaustion.
 */
import crypto from 'crypto';

const reportsMap = new Map();

// 2 hours TTL
const REPORT_TTL_MS = 2 * 60 * 60 * 1000; 

/**
 * Saves a report to memory and returns its unique ID.
 * @param {Object} report 
 * @returns {string} reportId
 */
export const saveReport = (report) => {
  const reportId = crypto.randomUUID();
  reportsMap.set(reportId, {
    data: report,
    expiresAt: Date.now() + REPORT_TTL_MS
  });
  return reportId;
};

/**
 * Retrieves a report by its ID.
 * @param {string} reportId 
 * @returns {Object | null}
 */
export const getReport = (reportId) => {
  const record = reportsMap.get(reportId);
  if (!record) return null;
  
  if (Date.now() > record.expiresAt) {
    reportsMap.delete(reportId);
    return null;
  }
  
  return record.data;
};

// Simple cleanup interval (runs every hour)
setInterval(() => {
  const now = Date.now();
  for (const [id, record] of reportsMap.entries()) {
    if (now > record.expiresAt) {
      reportsMap.delete(id);
    }
  }
}, 60 * 60 * 1000);
