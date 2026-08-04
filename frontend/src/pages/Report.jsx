import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ReportHeader from '../components/report/ReportHeader';
import ReportFooter from '../components/report/ReportFooter';

import PremiumHero from '../components/premium-report/PremiumHero';
import ExecutiveBriefing from '../components/premium-report/ExecutiveBriefing';
import TraitDeepDive from '../components/premium-report/TraitDeepDive';
import CareerMatchAnalysis from '../components/premium-report/CareerMatchAnalysis';
import CareerComparison from '../components/premium-report/CareerComparison';
import PremiumSWOT from '../components/premium-report/PremiumSWOT';
import PremiumActionPlan from '../components/premium-report/PremiumActionPlan';
import PremiumSkillGap from '../components/premium-report/PremiumSkillGap';
import PremiumLearningStrategy from '../components/premium-report/PremiumLearningStrategy';
import PremiumParentGuidance from '../components/premium-report/PremiumParentGuidance';
import PremiumResources from '../components/premium-report/PremiumResources';
import PremiumClosing from '../components/premium-report/PremiumClosing';

const Report = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Report Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/assessment" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Take Assessment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <ReportHeader reportData={reportData} />
      
      <main className="w-full">

        <PremiumHero reportData={reportData} />
        
        {reportData.executiveSummaryData && (
          <ExecutiveBriefing execData={reportData.executiveSummaryData} />
        )}

        {reportData.traitAnalysisDeep && (
          <TraitDeepDive traits={reportData.traitAnalysisDeep} />
        )}

        {reportData.topCareerRecommendations && (
          <CareerMatchAnalysis topCareers={reportData.topCareerRecommendations} />
        )}

        {reportData.careerComparison && (
          <CareerComparison comparison={reportData.careerComparison} />
        )}

        {reportData.swot && (
          <PremiumSWOT swot={reportData.swot} />
        )}

        {reportData.actionPlan && (
          <PremiumActionPlan actionPlan={reportData.actionPlan} />
        )}

        {reportData.skillGapAnalysis && (
          <PremiumSkillGap skillGapAnalysis={reportData.skillGapAnalysis} />
        )}

        {reportData.learningStrategy && (
          <PremiumLearningStrategy strategy={reportData.learningStrategy} />
        )}

        {reportData.parentGuidance && (
          <PremiumParentGuidance guidance={reportData.parentGuidance} />
        )}

        {reportData.resourceRecommendations && (
          <PremiumResources resources={reportData.resourceRecommendations} />
        )}

        {reportData.aiInsights && (
          <PremiumClosing 
            aiInsights={reportData.aiInsights.insightsList} 
            closingMessage={reportData.aiInsights.closingMessage} 
          />
        )}
        
      </main>

      <ReportFooter />
    </div>
  );
};

export default Report;
