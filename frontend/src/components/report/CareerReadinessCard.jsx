import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const CareerReadinessCard = ({ readiness }) => {
  if (!readiness) return null;

  const data = [
    { name: 'Score', value: readiness.score },
    { name: 'Remaining', value: 100 - readiness.score }
  ];

  const getColor = (score) => {
    if (score >= 80) return '#10B981'; // emerald
    if (score >= 60) return '#3B82F6'; // blue
    if (score >= 40) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const color = getColor(readiness.score);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col items-center text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-4 self-start">Career Readiness</h3>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#F3F4F6" />
              <Label 
                value={`${readiness.score}%`} 
                position="center" 
                className="text-3xl font-bold fill-gray-900"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-2" style={{ backgroundColor: `${color}20`, color }}>
          {readiness.level}
        </span>
        <p className="text-sm text-gray-600 mt-2">{readiness.description}</p>
      </div>
    </div>
  );
};

export default CareerReadinessCard;
