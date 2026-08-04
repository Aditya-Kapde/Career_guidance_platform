import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const components = [
  "PremiumHero",
  "ExecutiveBriefing",
  "TraitDeepDive",
  "CareerMatchAnalysis",
  "CareerComparison",
  "PremiumSWOT",
  "PremiumActionPlan",
  "PremiumSkillGap",
  "PremiumLearningStrategy",
  "PremiumParentGuidance",
  "PremiumResources",
  "PremiumClosing"
];

const testPdfComponent = async (componentName) => {
  let browser;
  try {
    console.log(`\n--- Testing ${componentName} ---`);
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    
    page.on('console', msg => {
      // ignore standard react warnings to keep output clean, but log errors or specific logs
      if(msg.type() === 'error' || msg.text().includes('[PdfTest]')) {
        console.log(`[Browser]: ${msg.text()}`);
      }
    });

    const url = `http://localhost:5173/pdf-test?component=${componentName}`;
    console.log(`Navigating to ${url}...`);
    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    await page.waitForSelector('#report-ready', { timeout: 15000 });
    await page.waitForFunction('window.__REPORT_READY__ === true', { timeout: 15000 });

    const metrics = await page.evaluate(() => {
      return {
        height: document.body.scrollHeight,
        html: document.body.innerHTML
      };
    });

    const debugDir = path.resolve(process.cwd(), 'debug_output');
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir);
    }

    const htmlPath = path.join(debugDir, `debug-${componentName}.html`);
    fs.writeFileSync(htmlPath, metrics.html);
    
    const screenshotPath = path.join(debugDir, `debug-${componentName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    const pdfPath = path.join(debugDir, `debug-${componentName}.pdf`);
    fs.writeFileSync(pdfPath, pdfBuffer);

    console.log(`[Success] HTML, Screenshot, and PDF saved for ${componentName}. Height: ${metrics.height}px.`);

    if (metrics.height === 0 || metrics.html.length < 100) {
      return { success: false, reason: "Rendered height is 0 or HTML is empty" };
    }

    return { success: true };
  } catch (error) {
    console.error(`[Failed] ${componentName} crashed:`, error.message);
    return { success: false, reason: error.message };
  } finally {
    if (browser) await browser.close();
  }
};

const runAllTests = async () => {
  for (const component of components) {
    const result = await testPdfComponent(component);
    if (!result.success) {
      console.log(`\n========================================`);
      console.log(`❌ FAILURE DETECTED`);
      console.log(`Component: ${component}`);
      console.log(`Reason: ${result.reason}`);
      console.log(`Check the /debug_output folder for the latest artifacts.`);
      console.log(`STOPPING EXECUTION.`);
      console.log(`========================================`);
      process.exit(1);
    }
  }
  console.log(`\n✅ All components rendered successfully without crashing.`);
};

runAllTests();
