import React from 'react';

const ReportFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} AI Career Guidance Platform. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="text-sm text-gray-400">Generated securely</span>
        </div>
      </div>
    </footer>
  );
};

export default ReportFooter;
