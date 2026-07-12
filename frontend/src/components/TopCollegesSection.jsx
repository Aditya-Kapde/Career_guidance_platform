import React from 'react';
import { School, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopCollegesSection({
  topColleges = [
    {
      name: "Indian Institute of Technology (IIT) Bombay",
      location: "Mumbai, India",
      rank: "Top Tier National Institute"
    },
    {
      name: "Indian Institute of Technology (IIT) Delhi",
      location: "New Delhi, India",
      rank: "Top Tier National Institute"
    }
  ]
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50/30 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
        <School className="w-5 h-5 text-indigo-600" />
        Top Higher Education Institutes
      </h2>
      
      <div className="space-y-4 relative z-10">
        {topColleges.map((college, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -2 }}
            className="p-4 bg-slate-50/50 hover:bg-white rounded-xl border border-slate-100 flex flex-col justify-between shadow-sm transition-all"
          >
            <div>
              <h3 className="font-extrabold text-slate-800 text-xs md:text-sm leading-snug mb-1.5 flex items-start gap-1.5">
                <School className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                {college.name}
              </h3>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] md:text-xs font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span>{college.location}</span>
              </div>
            </div>
            <div>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold inline-flex items-center gap-1">
                <Award className="w-3 h-3" />
                {college.rank}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
