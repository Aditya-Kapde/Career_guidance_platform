import React, { useEffect, useState } from 'react';
import api from '../services/api';
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
import CognitiveAnalytics from '../components/premium-report/CognitiveAnalytics';

import { useAssessment } from '../context/AssessmentContext';

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { reportId } = useAssessment();

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) {
        setError("No active report session found. Please complete an assessment.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/report/${reportId}`);
        setReportData(response);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        setError("Unable to load report. Please complete an assessment first.");
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-600 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-4 rounded-full border-b-2 border-pink-400 animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 text-center max-w-md w-full transform transition-all hover:scale-105">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3">No Report Found</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">{error}</p>
          <a href="/assessment" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 transition-all duration-300">
            Take Assessment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <ReportHeader reportData={reportData} />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        <PremiumHero reportData={reportData} />
        
        {reportData.executiveSummaryData && (
          <ExecutiveBriefing execData={reportData.executiveSummaryData} />
        )}

        <CognitiveAnalytics iqScore={reportData.iqScore} />

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
