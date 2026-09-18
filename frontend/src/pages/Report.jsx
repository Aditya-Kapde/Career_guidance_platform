import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  AlertCircle,
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
import EmptyState from '../components/ui/EmptyState';

// Advanced Deep Analysis Sections
import PremiumSWOT from '../components/premium-report/PremiumSWOT';
import PremiumActionPlan from '../components/premium-report/PremiumActionPlan';
import PremiumSkillGap from '../components/premium-report/PremiumSkillGap';
import PremiumParentGuidance from '../components/premium-report/PremiumParentGuidance';

export default function Report() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryReportId = searchParams.get('id');

  const { reportId: contextReportId, assessmentReport } = useAssessment();
  const activeReportId = queryReportId || contextReportId;

  const [reportData, setReportData] = useState(() => assessmentReport?.report || assessmentReport || null);
  const [loading, setLoading] = useState(() => !assessmentReport && !!activeReportId);
  const [error, setError] = useState(null);

  // PDF Export Feedback State
  const [isExporting, setIsExporting] = useState(false);
  const [exportFeedback, setExportFeedback] = useState(null); // { type: 'success' | 'error', message: string }

  const loadReport = useCallback(async () => {
    if (queryReportId && queryReportId !== contextReportId) {
      setLoading(true);
      try {
        const res = await reportApi.getReportById(queryReportId);
        const data = res?.report || res;
        if (!data || !data.topCareerRecommendations) {
          throw new Error('Retrieved report data is incomplete.');
        }
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('Could not fetch report by URL id:', err);
        setError(err.userMessage || 'Report not found, expired, or access is restricted.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (assessmentReport) {
      const local = assessmentReport.report || assessmentReport;
      setReportData(local);
      setLoading(false);
      return;
    }

    if (activeReportId) {
      setLoading(true);
      try {
        const res = await reportApi.getReportById(activeReportId);
        const data = res?.report || res;
        setReportData(data);
        setError(null);
      } catch (err) {
        console.error('Could not fetch report by active id:', err);
        setError(err.userMessage || 'Unable to retrieve report session.');
      } finally {
        setLoading(false);
      }
      return;
    }

    setError('No active assessment report found. Complete an assessment to generate your personalized report.');
    setLoading(false);
  }, [queryReportId, contextReportId, assessmentReport, activeReportId]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  const handleExportPdf = async () => {
    const id = activeReportId || reportData?.id || reportData?.reportId;
    if (!id) {
      window.print();
      return;
    }

    if (isExporting) return;
    setIsExporting(true);
    setExportFeedback(null);

    try {
      const blob = await reportApi.downloadPdfBlob(id);
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `PathFinder-Career-Report-${id.slice(0, 8)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setExportFeedback({
        type: 'success',
        message: 'PDF report generated and downloaded successfully.'
      });
    } catch (err) {
      console.error('PDF export failed:', err);
      setExportFeedback({
        type: 'error',
        message: 'PDF export encountered an issue. Falling back to browser print dialog.'
      });
      // Fallback
      setTimeout(() => {
        window.print();
      }, 500);
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        setExportFeedback(null);
      }, 5000);
    }
  };

  if (loading) {
    return (
      <AppShell title="Career Guidance Report">
        <div className="py-24">
          <LoadingState 
            message="Synthesizing Career Guidance Report..." 
            description="Compiling psychometric metrics, deterministic career models, and verified roadmaps."
          />
        </div>
      </AppShell>
    );
  }

  if (error || !reportData) {
    return (
      <AppShell title="Career Guidance Report">
        <div className="py-16">
          <EmptyState
            icon={Compass}
            title="No Active Career Report"
            description={error || "Complete our ~10 minute assessment to generate your comprehensive career guidance report."}
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
    score: 80,
    level: 'Strong',
    description: 'High readiness and foundational alignment across evaluated career pathways.'
  };
  const confidence = analytics.careerConfidence || {
    score: 85,
    level: 'High'
  };

  const topCareers = reportData.topCareerRecommendations || reportData.topCareers || [];
  const normalizedScores = reportData.normalizedScores || reportData.traitScores || {};
  const traitRanking = analytics.traitRanking || [];
  const dominantTraits = reportData.dominantTraits || [];
  const interestDistribution = analytics.interestDistribution || {};
  const learningProfile = analytics.learningProfile || { preferredStyle: 'Analytical & Structured', confidence: 85 };
  const strengths = reportData.strengths || reportData.swot?.strengths || [];
  const developmentAreas = reportData.developmentAreas || analytics.developmentAreas || reportData.swot?.weaknesses || [];
  const studyRecommendations = reportData.studyRecommendations || reportData.learningStrategy?.recommendations || [];
  const aiInsights = reportData.aiInsights || null;

  return (
    <AppShell title="Career Guidance Report" subtitle="Student cognitive profile & milestone roadmap">
      <div className="space-y-12 max-w-6xl mx-auto report-container">
        
        {/* PDF Export Feedback Toast */}
        {exportFeedback && (
          <div 
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold transition-all ${
              exportFeedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              {exportFeedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <span>{exportFeedback.message}</span>
            </div>
            <button
              onClick={() => setExportFeedback(null)}
              className="text-xs px-2 py-1 hover:bg-black/5 rounded-md cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. Header with Metadata & PDF Export */}
        <ReportHeader 
          reportData={reportData} 
          onExportPdf={handleExportPdf}
          isExporting={isExporting}
        />

        {/* 2. Hero Career Readiness Section */}
        <section aria-label="Career Readiness Overview">
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
          <TraitRadar traitScores={normalizedScores} />
        </section>

        {/* 5. Trait Ranking & Interest Distribution Grid */}
        <section aria-label="Trait Ranking & Interest Distribution" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TraitRanking traitRanking={traitRanking} dominantTraits={dominantTraits} />
          <InterestDistribution interestDistribution={interestDistribution} />
        </section>

        {/* 6. Pedagogical Learning Profile & Strengths Grid */}
        <section aria-label="Learning Profile & Strengths" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LearningProfileCard learningProfile={learningProfile} traitScores={normalizedScores} />
          <div className="flex flex-col gap-8">
            <StrengthsCard strengths={strengths} />
            <DevelopmentAreasCard developmentAreas={developmentAreas} />
          </div>
        </section>

        {/* 7. Action Plan, SWOT & Skill Gap Deep Dives */}
        {reportData.actionPlan && (
          <section aria-label="Strategic Action Plan">
            <PremiumActionPlan actionPlan={reportData.actionPlan} />
          </section>
        )}

        {reportData.swot && (
          <section aria-label="SWOT Analysis">
            <PremiumSWOT swot={reportData.swot} />
          </section>
        )}

        {reportData.skillGapAnalysis && (
          <section aria-label="Skill Gap Analysis">
            <PremiumSkillGap skillGap={reportData.skillGapAnalysis} />
          </section>
        )}

        {reportData.parentGuidance && (
          <section aria-label="Parental Guidance">
            <PremiumParentGuidance parentGuidance={reportData.parentGuidance} />
          </section>
        )}

        {/* 8. AI Narrative Insights */}
        {aiInsights && (
          <section aria-label="AI Synthesis & Insights">
            <AIInsights 
              insights={aiInsights} 
              studyTips={studyRecommendations} 
            />
          </section>
        )}

        {/* 9. Official Ethical Guidance Footer */}
        <ReportFooter />
      </div>
    </AppShell>
  );
}
