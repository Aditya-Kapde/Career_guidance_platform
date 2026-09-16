import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import roadmapApi from '../services/roadmapApi';
import { useAssessment } from '../context/AssessmentContext';
import AppShell from '../components/layout/AppShell';
import CareerHero from '../components/CareerHero';
import RoadmapTimeline from '../components/RoadmapTimeline';
import CareerFlowDiagram from '../components/CareerFlowDiagram';
import SkillsSection from '../components/SkillsSection';
import ToolsSection from '../components/ToolsSection';
import EntranceExamsSection from '../components/EntranceExamsSection';
import IndustriesSection from '../components/IndustriesSection';
import TopCollegesSection from '../components/TopCollegesSection';
import CareerProgressionSection from '../components/CareerProgressionSection';
import ResourcesSection from '../components/ResourcesSection';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';

export default function CareerRoadmap() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const { educationLevel, assessmentReport } = useAssessment();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const report = assessmentReport?.report || assessmentReport;
  const matchedCareer = report?.topCareers?.find((c) => c.id === careerId) ||
    report?.topCareerRecommendations?.find((c) => c.id === careerId);
  const score = matchedCareer ? matchedCareer.score : null;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    roadmapApi.getRoadmapByCareerId(careerId)
      .then((data) => {
        if (isMounted) {
          setRoadmap(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error fetching career roadmap:', err);
          if (err.response?.status === 404) {
            setError('not_found');
          } else {
            setError('error');
          }
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [careerId]);

  if (loading) {
    return (
      <AppShell title="Career Roadmap">
        <div className="py-24">
          <LoadingState 
            message="Loading Career Roadmap..." 
            description="Assembling milestone pathways, entrance exams, and skills matrix."
          />
        </div>
      </AppShell>
    );
  }

  if (error === 'not_found' || !roadmap) {
    return (
      <AppShell title="Career Roadmap">
        <div className="py-16">
          <ErrorState
            title="Roadmap Not Found"
            message={`We couldn't locate a pre-compiled roadmap for the career ID "${careerId}". Please choose another career from your report.`}
            retryLabel="Return to Report"
            onRetry={() => navigate('/report')}
          />
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell title="Career Roadmap">
        <div className="py-16">
          <ErrorState
            title="Failed to Load Roadmap"
            message="There was a server communication error while loading the roadmap. Please try again."
            retryLabel="Retry"
            onRetry={() => window.location.reload()}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={roadmap.title || 'Career Roadmap'} subtitle="Comprehensive milestone & decision roadmap">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/report')}
          >
            Back to Report
          </Button>

          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
            ID: {careerId}
          </span>
        </div>

        {/* Hero Section */}
        <CareerHero
          title={roadmap.title}
          icon={roadmap.icon}
          description={roadmap.description}
          overview={roadmap.overview}
          compatibilityScore={score}
        />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <RoadmapTimeline 
              roadmaps={roadmap.roadmaps} 
              educationLevel={educationLevel} 
            />
            <CareerFlowDiagram careerId={careerId} />
            <CareerProgressionSection careerProgression={roadmap.careerProgression} />
          </div>

          {/* Sidebar Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <SkillsSection skills={roadmap.skills} />
            <ToolsSection tools={roadmap.tools} />
            <EntranceExamsSection entranceExams={roadmap.entranceExams} />
            <IndustriesSection industries={roadmap.industries} />
            <TopCollegesSection topColleges={roadmap.topColleges} />
            <ResourcesSection resources={roadmap.resources} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
