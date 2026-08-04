import React from 'react';
import { motion } from 'framer-motion';

const ExecutiveSummary = ({ summary }) => {
  if (!summary) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
      <p className="text-gray-700 leading-relaxed text-lg">
        {summary}
      </p>
    </motion.div>
  );
};

export default ExecutiveSummary;
