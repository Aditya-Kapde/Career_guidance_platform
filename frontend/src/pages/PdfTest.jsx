import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

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

const PdfTest = () => {
  const [searchParams] = useSearchParams();
  const componentName = searchParams.get('component');
  
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inject mock report data to completely bypass the backend API dependency for this isolated rendering test.
    const mockReportData = {
      executiveSummaryData: { profileSummary: "Mock summary" },
      traitAnalysisDeep: [{ trait: "Mock Trait", interpretation: "Mock interpretation" }],
      topCareerRecommendations: [{ id: "mock1", career: "Mock Career", matchReason: "Mock Reason", industries: [], pros: [], cons: [] }],
      careerComparison: [{ career: "Mock Career", salary: "High" }],
      swot: { strengths: ["Mock Strength"], weaknesses: [], opportunities: [], threats: [] },
      actionPlan: [{ phase: "Mock Phase", skills: "Mock Skills" }],
      skillGapAnalysis: [{ skill: "Mock Skill", targetLevel: "Expert", priority: "High" }],
      learningStrategy: { howTheyLearnBest: "Mock Learning", recommendations: ["Mock tip"] },
      parentGuidance: { howToSupport: "Mock support" },
      resourceRecommendations: [{ type: "Course", name: "Mock Course", explanation: "Mock explanation" }],
      aiInsights: { insightsList: ["Mock insight"], closingMessage: "Mock closing" }
    };
    
    setReportData(mockReportData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && reportData) {
      const waitReady = async () => {
        if (document.fonts) await document.fonts.ready;
        
        const images = Array.from(document.images);
        await Promise.all(
          images.filter(img => !img.complete).map(img => new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          }))
        );

        setTimeout(() => {
          window.__REPORT_READY__ = true;
          console.log(`[PdfTest] Component ${componentName} is ready.`);
        }, 1000);
      };
      
      waitReady();
    }
  }, [loading, reportData, componentName]);

  if (loading) return <div className="min-h-screen">Loading...</div>;
  if (error || !reportData) return <div className="min-h-screen">Error</div>;

  const renderComponent = () => {
    switch(componentName) {
      case 'PremiumHero': return <PremiumHero reportData={reportData} />;
      case 'ExecutiveBriefing': return <ExecutiveBriefing summary={reportData.executiveSummaryData} />;
      case 'TraitDeepDive': return <TraitDeepDive traits={reportData.traitAnalysisDeep} />;
      case 'CareerMatchAnalysis': return <CareerMatchAnalysis topCareers={reportData.topCareerRecommendations} />;
      case 'CareerComparison': return <CareerComparison comparison={reportData.careerComparison} />;
      case 'PremiumSWOT': return <PremiumSWOT swot={reportData.swot} />;
      case 'PremiumActionPlan': return <PremiumActionPlan actionPlan={reportData.actionPlan} />;
      case 'PremiumSkillGap': return <PremiumSkillGap skillGapAnalysis={reportData.skillGapAnalysis} />;
      case 'PremiumLearningStrategy': return <PremiumLearningStrategy strategy={reportData.learningStrategy} />;
      case 'PremiumParentGuidance': return <PremiumParentGuidance guidance={reportData.parentGuidance} />;
      case 'PremiumResources': return <PremiumResources resources={reportData.resourceRecommendations} />;
      case 'PremiumClosing': return <PremiumClosing aiInsights={reportData.aiInsights?.insightsList} closingMessage={reportData.aiInsights?.closingMessage} />;
      default: return <div>Unknown component</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans print-mode">
      <div id="report-ready" className="hidden"></div>
      {renderComponent()}
    </div>
  );
};

export default PdfTest;
