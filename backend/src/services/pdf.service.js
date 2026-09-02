import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export const generatePremiumPDF = async (reportId) => {
  let browser;
  try {
    console.log("[PDF Service] Launching Headless Chrome...");
    const browserOptions = {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    
    // Only specify executablePath if explicitly set in environment, otherwise use bundled Chromium
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      browserOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    browser = await puppeteer.launch(browserOptions);

    const page = await browser.newPage();
    
    // Set standard A4 viewport for layout
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    
    // Listen to console logs for debugging
    page.on('console', msg => console.log(`[Frontend Log]: ${msg.text()}`));

    console.log(`[PDF Service] Navigating to Report Print URL for ID: ${reportId}...`);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    await page.goto(`${clientUrl}/report-print?id=${reportId}`, { waitUntil: 'networkidle0', timeout: 60000 });
    
    console.log("[PDF Service] Waiting for #report-ready to mount...");
    await page.waitForSelector('#report-ready', { timeout: 30000 });

    console.log("[PDF Service] Waiting for window.__REPORT_READY__ flag...");
    await page.waitForFunction('window.__REPORT_READY__ === true', { timeout: 30000 });

    console.log("[PDF Service] Waiting for fonts to be ready...");
    await page.evaluateHandle('document.fonts.ready');

    // Verify DOM structure and gather metrics
    const metrics = await page.evaluate(() => {
      const sections = document.querySelectorAll('section').length;
      const height = document.body.scrollHeight;
      const images = document.images.length;
      const links = document.links.length;
      return { sections, height, images, links };
    });
    
    console.log(`[PDF Service] Verification Metrics: ${JSON.stringify(metrics)}`);
    if (metrics.sections === 0) {
      throw new Error("Validation Failed: No sections found in the DOM.");
    }

    console.log("[PDF Service] Taking Debug Screenshot...");
    const debugPath = path.resolve(process.cwd(), 'debug-report.png');
    await page.screenshot({ path: debugPath, fullPage: true });
    console.log(`[PDF Service] Debug Screenshot saved to ${debugPath}`);

    console.log("[PDF Service] Generating PDF buffer...");
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });

    console.log("[PDF Service] PDF generated successfully.");
    return pdfBuffer;
  } catch (error) {
    console.error("Puppeteer PDF Generation Error:", error);
    throw new Error("Failed to generate premium PDF report: " + error.message);
  } finally {
    if (browser) {
      console.log("[PDF Service] Closing browser...");
      await browser.close();
    }
  }
};
