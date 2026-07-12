import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { useAssessment } from '../context/AssessmentContext';
import CareerHero from '../components/CareerHero';
import RoadmapTimeline from '../components/RoadmapTimeline';
import SkillsSection from '../components/SkillsSection';
import ToolsSection from '../components/ToolsSection';
import EntranceExamsSection from '../components/EntranceExamsSection';
import IndustriesSection from '../components/IndustriesSection';
import TopCollegesSection from '../components/TopCollegesSection';
import CareerProgressionSection from '../components/CareerProgressionSection';
import ResourcesSection from '../components/ResourcesSection';

export default function CareerRoadmap() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const { educationLevel, assessmentReport } = useAssessment();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const report = assessmentReport?.report || assessmentReport;
  const matchedCareer = report?.topCareers?.find(c => c.id === careerId);
  const score = matchedCareer ? matchedCareer.score : null;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.get(`/api/roadmaps/${careerId}`)
      .then((data) => {
        if (isMounted) {
          setRoadmap(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching career roadmap:", err);
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-650 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading career roadmap...</p>
      </div>
    );
  }

  if (error === 'not_found' || !roadmap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Career roadmap not found</h1>
        <p className="text-slate-500 mb-6 max-w-md">We couldn't find a matching career roadmap path for this option.</p>
        <button
          onClick={() => navigate('/results')}
          className="flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 font-bold px-6 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
        >
          Return to Results
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Failed to load roadmap</h1>
        <p className="text-slate-500 mb-6 max-w-md">There was a server communication error. Please try again later.</p>
        <button
          onClick={() => navigate('/results')}
          className="flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 font-bold px-6 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
        >
          Return to Results
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-6xl mx-auto animate-fade-in">
      {/* Navigation Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/results')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-100/50 px-3 py-1 rounded-full border border-slate-100">
          ID: {careerId}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Main Column (Hero and Roadmaps) */}
        <div className="lg:col-span-2 space-y-8">
          <CareerHero 
            title={roadmap.title}
            icon={roadmap.icon}
            description={roadmap.description}
            overview={roadmap.overview}
            compatibilityScore={score}
          />
          <RoadmapTimeline roadmaps={roadmap.roadmaps} educationLevel={educationLevel} />
          <CareerProgressionSection careerProgression={roadmap.careerProgression} />
        </div>

        {/* Right / Sidebar Column (Academics, Skills, Tools) */}
        <div className="space-y-8">
          <SkillsSection skills={roadmap.skills} />
          <ToolsSection tools={roadmap.tools} />
          <EntranceExamsSection entranceExams={roadmap.entranceExams} />
          <IndustriesSection industries={roadmap.industries} />
          <TopCollegesSection topColleges={roadmap.topColleges} />
          <ResourcesSection resources={roadmap.resources} />
        </div>
      </div>
    </div>
  );
}
