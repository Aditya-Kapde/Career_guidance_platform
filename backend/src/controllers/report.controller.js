  import { getReport } from '../services/report/reportStore.js';
  import { generatePremiumPDF } from '../services/pdf.service.js';

  /**
   * Controller endpoint to retrieve a report by ID.
   * Exposes: GET /api/report/:id
   */
  export const fetchReport = async (req, res) => {
    try {
      const { id } = req.params;
      const report = getReport(id);
      
      if (!report) {
        return res.status(404).json({ error: "Report not found or has expired." });
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
   * Controller endpoint to generate and download the premium PDF report using Puppeteer.
   * Exposes: GET /api/report/pdf/:id
   */
  export const downloadPdf = async (req, res) => {
    try {
      const { id } = req.params;
      const report = getReport(id);
      if (!report) {
        return res.status(404).json({ error: "Report not found or has expired." });
      }

      let pdfBuffer = await generatePremiumPDF(id);
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
