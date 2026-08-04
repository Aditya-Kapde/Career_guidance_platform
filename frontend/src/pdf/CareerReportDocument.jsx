import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import CoverPage from '../components/pdf/CoverPage';
import ExecutiveSummaryPage from '../components/pdf/ExecutiveSummaryPage';
import AnalyticsPage from '../components/pdf/AnalyticsPage';
import CareerKnowledgePage from '../components/pdf/CareerKnowledgePage';
import SWOTPage from '../components/pdf/SWOTPage';
import ActionPlanPage from '../components/pdf/ActionPlanPage';
import LearningStrategyPage from '../components/pdf/LearningStrategyPage';
import ParentGuidancePage from '../components/pdf/ParentGuidancePage';
import SkillGapAnalysisPage from '../components/pdf/SkillGapAnalysisPage';
import ResourceRecommendationsPage from '../components/pdf/ResourceRecommendationsPage';
import CareerComparisonPage from '../components/pdf/CareerComparisonPage';
import TraitAnalysisPage from '../components/pdf/TraitAnalysisPage';
import CareerDeepDivePage from '../components/pdf/CareerDeepDivePage';
import { styles } from './styles';

const ClosingPage = ({ insights }) => (
  <Page size="A4" style={styles.page}>
    <View style={{ flex: 1, padding: 40, justifyContent: 'center' }}>
      <Text style={{ ...styles.header, textAlign: 'center' }}>Personalized AI Insights</Text>
      
      {insights?.insightsList && insights.insightsList.length > 0 ? (
        insights.insightsList.map((insight, i) => (
          <View key={i} style={styles.highlightBox}>
            <Text style={{ ...styles.text, fontSize: 13, lineHeight: 1.6, fontStyle: 'italic' }}>"{insight}"</Text>
          </View>
        ))
      ) : (
        <Text style={{ ...styles.text, fontSize: 14, lineHeight: 1.8, textAlign: 'center' }}>
          {insights?.closingMessage || "Believe in yourself and your unique strengths. Your career journey is just beginning."}
        </Text>
      )}

      {insights?.closingMessage && insights?.insightsList && insights.insightsList.length > 0 && (
        <Text style={{ ...styles.text, fontSize: 12, marginTop: 40, textAlign: 'center', color: '#4f46e5', fontWeight: 700 }}>
          {insights.closingMessage}
        </Text>
      )}
    </View>
    <View style={styles.footer} fixed>
      <Text>AI Career Guidance Platform</Text>
      <Text render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} />
    </View>
  </Page>
);

const CareerReportDocument = ({ reportData }) => {
  if (!reportData) return null;

  return (
    <Document>
      <CoverPage reportData={reportData} />
      
      {reportData.executiveSummaryData && (
        <ExecutiveSummaryPage execData={reportData.executiveSummaryData} />
      )}
      
      {reportData.traitAnalysisDeep && (
        <TraitAnalysisPage traits={reportData.traitAnalysisDeep} />
      )}
      
      <AnalyticsPage 
        analytics={reportData.analytics} 
        traitScores={reportData.traitScores} 
      />

      <CareerDeepDivePage topCareers={reportData.topCareerRecommendations} />
      
      {reportData.careerComparison && (
        <CareerComparisonPage comparison={reportData.careerComparison} />
      )}
      
      {reportData.swot && (
        <SWOTPage swot={reportData.swot} />
      )}

      {reportData.actionPlan && (
        <ActionPlanPage actionPlan={reportData.actionPlan} />
      )}

      {reportData.skillGapAnalysis && (
        <SkillGapAnalysisPage skillGapAnalysis={reportData.skillGapAnalysis} />
      )}

      {reportData.learningStrategy && (
        <LearningStrategyPage strategy={reportData.learningStrategy} />
      )}

      {reportData.resourceRecommendations && (
        <ResourceRecommendationsPage resources={reportData.resourceRecommendations} />
      )}
      
      <CareerKnowledgePage 
        careerRoadmaps={reportData.careerRoadmaps} 
      />

      {reportData.parentGuidance && (
        <ParentGuidancePage guidance={reportData.parentGuidance} />
      )}
      
      <ClosingPage 
        insights={reportData.aiInsights} 
      />
    </Document>
  );
};

export default CareerReportDocument;
