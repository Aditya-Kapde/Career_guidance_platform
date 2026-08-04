import React from 'react';
import { motion } from 'framer-motion';
import { MapIcon } from 'lucide-react';

const NextSteps = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-8 text-center mt-12 mb-8 shadow-sm"
    >
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-indigo-100 text-indigo-600">
        <MapIcon size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Roadmap</h2>
      <p className="text-gray-600 max-w-lg mx-auto mb-6">
        A personalized step-by-step roadmap to achieve your top career matches is currently under development.
      </p>
      <div className="inline-block bg-white px-6 py-3 rounded-full text-sm font-bold text-indigo-600 shadow-sm border border-indigo-100">
        Coming in Phase 4
      </div>
    </motion.div>
  );
};

export default NextSteps;
