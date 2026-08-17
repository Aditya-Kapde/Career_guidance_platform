import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import api from '../../services/api';

const ReportHeader = ({ reportData, onDownloadPdf }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            CG
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Career Guidance</h1>
        </div>
        <div className="flex items-center gap-4">
          {isMounted && reportData && (
            <button
              onClick={onDownloadPdf}
              className="no-print flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors outline-none cursor-pointer"
            >
              <Download size={16} />
              Download Report (PDF)
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ReportHeader;
