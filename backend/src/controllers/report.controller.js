import { getReport, getReportsByUserId } from '../services/report/reportStore.js';
import { generatePremiumPDF } from '../services/pdf.service.js';

/**
 * Controller endpoint to retrieve a report by ID with ownership enforcement.
 * Exposes: GET /api/report/:id
 */
export const fetchReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await getReport(id);
    
    if (!report) {
      return res.status(404).json({ error: "Report not found or has expired." });
    }

    // Authorization check
    if (report.userId) {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required to view this private report." });
      }
      if (req.user.id !== report.userId) {
        return res.status(403).json({ error: "Access denied: You are not authorized to access this report." });
      }
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error("Error in fetchReport controller:", error);
    return res.status(500).json({ 
      error: "An unexpected error occurred while retrieving the report." 
    });
  }
};

/**
 * Controller endpoint to retrieve all reports belonging to the authenticated user.
 * Exposes: GET /api/report/user/me
 */
export const fetchUserReports = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const reports = await getReportsByUserId(req.user.id);
    return res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Error in fetchUserReports controller:", error);
    return res.status(500).json({ error: "Failed to fetch user reports." });
  }
};

/**
 * Controller endpoint to generate and download the premium PDF report.
 * Exposes: GET /api/report/pdf/:id
 */
export const downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await getReport(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found or has expired." });
    }

    // Authorization check
    if (report.userId) {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required to download this report." });
      }
      if (req.user.id !== report.userId) {
        return res.status(403).json({ error: "Access denied: You are not authorized to download this report." });
      }
    }

    const pdfBuffer = await generatePremiumPDF(id);
    const safeBuffer = Buffer.from(pdfBuffer);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="PathFinder-Career-Report-${id.slice(0, 8)}.pdf"`,
      'Content-Length': safeBuffer.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    
    return res.end(safeBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return res.status(500).json({ 
      error: "An unexpected error occurred while generating the PDF. Please try again." 
    });
  }
};
