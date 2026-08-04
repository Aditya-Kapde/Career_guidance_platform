import React from 'react';
import { motion } from 'framer-motion';

const CareerCards = ({ careers }) => {
  if (!careers || careers.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Career Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careers.map((c, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{c.career}</h3>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-indigo-600">{c.score}</span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Match</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {c.reason || c.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerCards;
