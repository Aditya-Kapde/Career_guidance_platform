  import { getLatestReport } from '../services/report/reportStore.js';
  import { generatePremiumPDF } from '../services/pdf.service.js';

  /**
   * Controller endpoint to retrieve the most recently generated report.
   * Exposes: GET /api/report/latest
   * Note: This is a temporary endpoint until an assessment ID based system is in place.
   */
  export const fetchLatestReport = async (req, res) => {
    try {
      const report = getLatestReport();
      
      if (!report) {
        return res.status(404).json({ error: "No report found. Please complete an assessment first." });
      }

      return res.status(200).json(report);
    } catch (error) {
      console.error("Error in fetchLatestReport controller:", error);
      return res.status(500).json({ 
        error: "An unexpected error occurred while retrieving the report." 
      });
    }
  };

  /**
   * Controller endpoint to generate and download the premium PDF report using Puppeteer.
   * Exposes: GET /api/report/pdf
   */
  export const downloadPdf = async (req, res) => {
    try {
      const report = getLatestReport();
      if (!report) {
        return res.status(404).json({ error: "No report found. Please complete an assessment first." });
      }

      let pdfBuffer = await generatePremiumPDF();
      pdfBuffer = Buffer.from(pdfBuffer);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Career-Intelligence-Report.pdf"',
        'Content-Length': pdfBuffer.length
      });
      
      return res.end(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      return res.status(500).json({ 
        error: "An unexpected error occurred while generating the PDF." 
      });
    }
  };
