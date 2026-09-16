import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  Compass, 
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import reportApi from '../services/reportApi';
import AppShell from '../components/layout/AppShell';
import ReportHeader from '../components/report/ReportHeader';
import CareerReadinessCard from '../components/report/CareerReadinessCard';
import CareerCompatibility from '../components/report/CareerCompatibility';
import TraitRadar from '../components/report/TraitRadar';
import TraitRanking from '../components/report/TraitRanking';
import InterestDistribution from '../components/report/InterestDistribution';
import LearningProfileCard from '../components/report/LearningProfileCard';
import StrengthsCard from '../components/report/StrengthsCard';
import DevelopmentAreasCard from '../components/report/DevelopmentAreasCard';
import AIInsights from '../components/report/AIInsights';
import ReportFooter from '../components/report/ReportFooter';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

// Optional deep components
import PremiumSWOT from '../components/premium-report/PremiumSWOT';
import PremiumActionPlan from '../components/premium-report/PremiumActionPlan';
import PremiumSkillGap from '../components/premium-report/PremiumSkillGap';
import PremiumParentGuidance from '../components/premium-report/PremiumParentGuidance';

export default function Report() {
  const navigate = useNavigate();
  const { reportId, assessmentReport, educationLevel, resetAssessment } = useAssessment();
  const [reportData, setReportData] = useState(() => assessmentReport?.report || assessmentReport || null);
  const [loading, setLoading] = useState(() => !assessmentReport && !!reportId);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      if (assessmentReport) {
        const local = assessmentReport.report || assessmentReport;
        setReportData(local);
        setLoading(false);
        return;
      }

      if (reportId) {
        try {
          const res = await reportApi.getReportById(reportId);
          setReportData(res?.report || res);
          setLoading(false);
          return;
        } catch (err) {
          console.warn('Could not fetch by reportId from server:', err);
        }
      }

      setError('No active assessment report found. Complete an assessment to generate your personalized report.');
      setLoading(false);
    };

    loadReport();
  }, [reportId, assessmentReport]);

  if (loading) {
    return (
      <AppShell title="Career Report">
        <div className="py-24">
          <LoadingState 
            message="Synthesizing Career Report..." 
            description="Compiling psychometric metrics, career ranking algorithms, and AI insights."
          />
        </div>
      </AppShell>
    );
  }

  if (error || !reportData) {
    return (
      <AppShell title="Career Report">
        <div className="py-16">
          <EmptyState
            icon={Compass}
            title="No Career Report Yet"
            description={error || "Complete our ~10 minute assessment to generate your comprehensive career intelligence report."}
            actionLabel="Start Assessment"
            onAction={() => navigate('/assessment')}
            actionIcon={Sparkles}
          />
        </div>
      </AppShell>
    );
  }

  const analytics = reportData.analytics || {};
  const readiness = analytics.careerReadiness || {
    score: reportData.readinessScore || 78,
    level: 'Strong',
    description: 'High readiness and foundational alignment across evaluated career pathways.'
  };
  const confidence = analytics.careerConfidence || {
    score: 85,
    level: 'High'
  };

  const topCareers = reportData.topCareerRecommendations || reportData.topCareers || [];
  const traitScores = reportData.traitScores || {};
  const traitRanking = analytics.traitRanking || [];
  const dominantTraits = reportData.dominantTraits || [];
  const interestDistribution = analytics.interestDistribution || {};
  const learningProfile = analytics.learningProfile || { preferredStyle: 'Analytical & Visual', confidence: 84 };
  const strengths = reportData.strengths || reportData.swot?.strengths || [];
  const developmentAreas = reportData.developmentAreas || analytics.developmentAreas || reportData.swot?.weaknesses || [];
  const studyRecommendations = reportData.studyRecommendations || reportData.learningStrategy?.recommendations || [];
  const aiInsights = reportData.aiInsights || null;

  return (
    <AppShell title="Career Intelligence Report" subtitle="Official student aptitude & pathway analysis">
      <div className="space-y-12 max-w-6xl mx-auto report-container">
        {/* 1. Header with Metadata & PDF Export */}
        <ReportHeader reportData={reportData} />

        {/* 2. Hero Career Readiness Section */}
        <section aria-label="Career Readiness Hero">
          <CareerReadinessCard 
            readiness={readiness} 
            confidence={confidence} 
          />
        </section>

        {/* 3. Top Career Matches Section */}
        <section aria-label="Top Career Matches">
          <CareerCompatibility topCareers={topCareers} />
        </section>

        {/* 4. Wide Elaborative Psychometric Matrix */}
        <section aria-label="Psychometric Matrix">
          <TraitRadar traitScores={traitScores} />
        </section>

        {/* 5. Trait Ranking & Interest Distribution Grid */}
        <section aria-label="Trait Ranking & Interest Distribution" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TraitRanking traitRanking={traitRanking} dominantTraits={dominantTraits} />
          <InterestDistribution interestDistribution={interestDistribution} />
        </section>

        {/* 6. Pedagogical Learning Profile & Strengths Grid */}
        <section aria-label="Learning Profile & Strengths" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LearningProfileCard learningProfile={learningProfile} traitScores={traitScores} />
          <div className="flex flex-col gap-8">
            <StrengthsCard strengths={strengths} />
            <DevelopmentAreasCard developmentAreas={developmentAreas} />
          </div>
        </section>

        {/* 7. Skill Gap Matrix */}
        {reportData.skillGapAnalysis && (
          <section aria-label="Skill Gap Matrix" className="report-card">
            <PremiumSkillGap skillGapAnalysis={reportData.skillGapAnalysis} />
          </section>
        )}

        {/* 8. AI Personalized Guidance Card */}
        <section aria-label="AI Personalized Guidance">
          <AIInsights 
            aiInsights={aiInsights} 
            studyRecommendations={studyRecommendations} 
          />
        </section>

        {/* 9. Optional Deep Dive Sections */}
        {reportData.swot && (
          <section aria-label="SWOT Matrix" className="report-card">
            <PremiumSWOT swot={reportData.swot} />
          </section>
        )}

        {reportData.actionPlan && (
          <section aria-label="Action Plan" className="report-card">
            <PremiumActionPlan actionPlan={reportData.actionPlan} />
          </section>
        )}

        {reportData.parentGuidance && (
          <section aria-label="Parent & Mentor Guidance" className="report-card">
            <PremiumParentGuidance guidance={reportData.parentGuidance} />
          </section>
        )}

        {/* 10. Report Footer */}
        <ReportFooter />
      </div>
    </AppShell>
  );
}
