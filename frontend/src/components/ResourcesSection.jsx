import React from 'react';
import { ExternalLink, BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResourcesSection({
  resources = [
    {
      title: "Indian Road Congress (IRC) Publications",
      type: "Technical Specifications / Guidelines"
    },
    {
      title: "NPTEL Civil Engineering Lectures (IIT Faculty)",
      type: "Free Online Course Video Series"
    }
  ]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50/30 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        Recommended Resources
      </h2>
      
      <div className="space-y-3.5 relative z-10">
        {resources.map((resource, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -2 }}
            className="p-4 bg-slate-50/50 hover:bg-white rounded-xl border border-slate-100 flex items-center justify-between gap-4 shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg border border-indigo-100/50 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-extrabold border border-slate-200 uppercase tracking-wider block w-max mb-1">
                  {resource.type}
                </span>
                <h3 className="font-extrabold text-slate-800 text-xs md:text-sm leading-snug">{resource.title}</h3>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors shrink-0 cursor-pointer">
              <ExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
