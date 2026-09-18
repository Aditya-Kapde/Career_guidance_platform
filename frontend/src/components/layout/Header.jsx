import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Menu, LogIn, LogOut, User } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function Header({ onOpenMobileMenu, title, subtitle }) {
  const navigate = useNavigate();
  const { educationLevel } = useAssessment();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Title / Breadcrumb */}
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {title || 'Career Guidance Platform'}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Top Header Actions */}
      <div className="flex items-center gap-3">
        {educationLevel && (
          <Badge variant="indigo" size="sm" dot className="hidden md:inline-flex">
            Level: {educationLevel.replace('-', ' ').toUpperCase()}
          </Badge>
        )}

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}

        {!educationLevel ? (
          <Button
            size="sm"
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/assessment')}
          >
            Take Assessment
          </Button>
        ) : null}
      </div>
    </header>
  );
}
