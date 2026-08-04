import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import PrintHero from '../components/print-report/PrintHero';
import PrintExecutiveBriefing from '../components/print-report/PrintExecutiveBriefing';
import PrintTraitDeepDive from '../components/print-report/PrintTraitDeepDive';
import PrintCareerMatch from '../components/print-report/PrintCareerMatch';
import PrintCareerComparison from '../components/print-report/PrintCareerComparison';
import PrintSWOT from '../components/print-report/PrintSWOT';
import PrintActionPlan from '../components/print-report/PrintActionPlan';
import PrintSkillGap from '../components/print-report/PrintSkillGap';
import PrintLearningStrategy from '../components/print-report/PrintLearningStrategy';
import PrintParentGuidance from '../components/print-report/PrintParentGuidance';
import PrintResources from '../components/print-report/PrintResources';
import PrintClosing from '../components/print-report/PrintClosing';

const ReportPrint = () => {
  const [searchParams] = useSearchParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/report/latest');
        setReportData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        setError("Unable to load report. Please complete an assessment first.");
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  // Set __REPORT_READY__ for Puppeteer once data is loaded and DOM is mounted
  useEffect(() => {
    if (!loading && reportData) {
      const waitReady = async () => {
        // Wait for all fonts to be ready
        if (document.fonts) {
          await document.fonts.ready;
        }

        // Wait for all images to finish loading
        const images = Array.from(document.images);
        await Promise.all(
          images.filter(img => !img.complete).map(img => new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if error
          }))
        );

        // Add a slight delay for any React re-renders or chart animations
        setTimeout(() => {
          window.__REPORT_READY__ = true;
          console.log("Report is fully ready for PDF generation.");
        }, 1000);
      };
      
      waitReady();
    }
  }, [loading, reportData]);

  if (loading) {
    return (
      <div className="py-20 bg-white flex items-center justify-center w-[794px] mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="py-20 bg-white flex items-center justify-center p-4 w-[794px] mx-auto">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Report Found</h2>
          <p className="text-gray-600">{error || "Please complete the assessment to generate your report."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 font-sans print-mode mx-auto">
      {/* Puppeteer Hook for PDF Generation */}
      <div id="report-ready" className="hidden"></div>
      
      <main className="w-full">
        <PrintHero reportData={reportData} />
        
        {reportData.executiveSummaryData && (
          <PrintExecutiveBriefing summary={reportData.executiveSummaryData} />
        )}

        {reportData.traitAnalysisDeep && (
          <PrintTraitDeepDive traits={reportData.traitAnalysisDeep} />
        )}

        {reportData.topCareerRecommendations && (
          <PrintCareerMatch topCareers={reportData.topCareerRecommendations} />
        )}

        {reportData.careerComparison && (
          <PrintCareerComparison comparison={reportData.careerComparison} />
        )}

        {reportData.swot && (
          <PrintSWOT swot={reportData.swot} />
        )}

        {reportData.actionPlan && (
          <PrintActionPlan actionPlan={reportData.actionPlan} />
        )}

        {reportData.skillGapAnalysis && (
          <PrintSkillGap skillGapAnalysis={reportData.skillGapAnalysis} />
        )}

        {reportData.learningStrategy && (
          <PrintLearningStrategy strategy={reportData.learningStrategy} />
        )}

        {reportData.parentGuidance && (
          <PrintParentGuidance guidance={reportData.parentGuidance} />
        )}

        {reportData.resourceRecommendations && (
          <PrintResources resources={reportData.resourceRecommendations} />
        )}

        {reportData.aiInsights && (
          <PrintClosing 
            aiInsights={reportData.aiInsights.insightsList} 
            closingMessage={reportData.aiInsights.closingMessage} 
          />
        )}
      </main>
    </div>
  );
};

export default ReportPrint;
