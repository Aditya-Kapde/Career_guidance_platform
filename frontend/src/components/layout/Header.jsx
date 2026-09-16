import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, Download, Menu, RefreshCw, Cpu } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import reportApi from '../../services/reportApi';

export default function Header({ onOpenMobileMenu, title, subtitle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { educationLevel, reportId } = useAssessment();

  const isReportPage = location.pathname.startsWith('/report');

  const handleDownloadPdf = () => {
    if (reportId) {
      window.open(reportApi.downloadPdfUrl(reportId), '_blank');
    }
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
            {title || 'Career Intelligence Platform'}
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

        {isReportPage && reportId && (
          <Button
            size="sm"
            variant="secondary"
            icon={Download}
            onClick={handleDownloadPdf}
            className="hidden sm:inline-flex"
          >
            Export PDF
          </Button>
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
