import React from 'react';
import { BookOpen } from 'lucide-react';

const LearningProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
          <BookOpen size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Learning Profile</h3>
      </div>
      
      <div className="flex-grow flex flex-col justify-center">
        <div className="mb-2">
          <span className="text-sm text-gray-500">Preferred Style</span>
          <div className="text-2xl font-bold text-gray-900 mt-1">{profile.preferredStyle}</div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Confidence</span>
            <span className="font-medium text-gray-900">{profile.confidence}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${profile.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProfileCard;
