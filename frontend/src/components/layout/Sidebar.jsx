import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  Sparkles, 
  LayoutDashboard,
  RotateCcw,
  LogIn,
  LogOut
} from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

export default function Sidebar({ className = '' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { educationLevel, reportId, assessmentReport, resetAssessment } = useAssessment();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: 'Assessment',
      path: '/assessment',
      icon: GraduationCap,
      badge: educationLevel ? 'In Progress' : null,
      badgeVariant: 'amber'
    },
    {
      label: 'Career Report',
      path: '/report',
      icon: FileText,
      badge: reportId || assessmentReport ? 'Ready' : null,
      badgeVariant: 'emerald'
    },
    {
      label: 'Summary',
      path: '/results',
      icon: Sparkles,
      badge: null
    }
  ];

  const handleReset = () => {
    if (window.confirm('Reset current assessment session and start fresh?')) {
      resetAssessment();
      navigate('/');
    }
  };

  return (
    <aside className={`w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 select-none z-30 ${className}`}>
      {/* Brand & Logo Header */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-indigo-200/50 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                PathFinder <span className="text-indigo-600">AI</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 block tracking-tight">
                Career Guidance
              </span>
            </div>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 group
                  ${active
                    ? 'bg-indigo-50/90 text-indigo-700 shadow-sm shadow-indigo-100/40 border border-indigo-100/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <Badge variant={item.badgeVariant || 'indigo'} size="sm">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        {/* Active Profile Indicator */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Avatar name={user ? user.name : 'Student'} size="sm" status={isAuthenticated ? 'online' : 'offline'} />
            <div className="truncate">
              <span className="text-xs font-bold text-slate-800 block truncate">
                {isAuthenticated ? user.name : (educationLevel ? educationLevel.replace('-', ' ').toUpperCase() : 'Guest Student')}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {isAuthenticated ? user.email : (educationLevel ? 'Assessment Active' : 'Not Signed In')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={handleReset}
            className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Reset current session"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          
          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogIn className="w-3 h-3" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
