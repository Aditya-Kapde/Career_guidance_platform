import React from 'react';
import CareerKnowledgeCard from './CareerKnowledgeCard';
import { Compass } from 'lucide-react';

const CareerKnowledgeSection = ({ careerRoadmaps }) => {
  if (!careerRoadmaps || careerRoadmaps.length === 0) return null;

  return (
    <div className="mb-16 mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
          <Compass size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Career Pathways</h2>
          <p className="text-gray-500 mt-1">Detailed roadmaps, education paths, and required skills for your top matches.</p>
        </div>
      </div>

      <div className="space-y-4">
        {careerRoadmaps.map((roadmap, index) => (
          <CareerKnowledgeCard key={roadmap.id || index} roadmap={roadmap} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CareerKnowledgeSection;
