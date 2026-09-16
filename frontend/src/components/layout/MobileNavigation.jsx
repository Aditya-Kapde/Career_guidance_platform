import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  Sparkles,
  X,
  Compass,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessment } from '../../context/AssessmentContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

export default function MobileNavigation({ isOpen, onClose }) {
  const location = useLocation();
  const { educationLevel, reportId, resetAssessment } = useAssessment();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Assessment', path: '/assessment', icon: GraduationCap },
    { label: 'Report', path: '/report', icon: FileText },
    { label: 'Summary', path: '/results', icon: Sparkles }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop & Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col justify-between p-5 shadow-2xl border-r border-slate-200"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base text-slate-900">
                      PathFinder AI
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-colors
                          ${isActive
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            : 'text-slate-600 hover:bg-slate-50'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5 text-current" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Avatar name="Student" size="sm" status={educationLevel ? 'online' : 'offline'} />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {educationLevel ? educationLevel.replace('-', ' ').toUpperCase() : 'Guest Student'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {reportId ? 'Report Ready' : 'Active'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Reset assessment?')) {
                      resetAssessment();
                      onClose();
                    }
                  }}
                  className="w-full py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Assessment</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-indigo-600 stroke-[2.2]' : 'text-slate-400'}`} />
              <span className="text-[10px] leading-none">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
