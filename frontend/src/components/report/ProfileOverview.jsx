import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, AlertCircle } from 'lucide-react';

const ProfileOverview = ({ overallProfileSummary, confidenceScore }) => {
  if (!overallProfileSummary) return null;

  const items = [
    {
      label: "Top Strength",
      value: overallProfileSummary.topStrength,
      icon: <Award className="text-emerald-500" size={24} />,
      bg: "bg-emerald-50"
    },
    {
      label: "Top Match",
      value: overallProfileSummary.highestCareerMatch,
      icon: <Target className="text-blue-500" size={24} />,
      bg: "bg-blue-50"
    },
    {
      label: "Category",
      value: overallProfileSummary.overallCategory,
      icon: <TrendingUp className="text-purple-500" size={24} />,
      bg: "bg-purple-50"
    },
    {
      label: "Area to Develop",
      value: overallProfileSummary.topDevelopmentArea,
      icon: <AlertCircle className="text-amber-500" size={24} />,
      bg: "bg-amber-50"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {items.map((item, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg}`}>
            {item.icon}
          </div>
          <span className="text-sm font-medium text-gray-500 mb-1">{item.label}</span>
          <span className="text-lg font-bold text-gray-900 capitalize">{item.value}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default ProfileOverview;
