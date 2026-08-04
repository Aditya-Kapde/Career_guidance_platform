import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const TraitRadar = ({ traitScores }) => {
  if (!traitScores) return null;

  const data = Object.entries(traitScores).map(([subject, A]) => ({
    subject: subject.charAt(0).toUpperCase() + subject.slice(1),
    A,
    fullMark: 100,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Trait Profile</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Student" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TraitRadar;
