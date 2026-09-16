import React from 'react';
import { Download, Calendar, GraduationCap, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import reportApi from '../../services/reportApi';

export default function ReportHeader({ reportData }) {
  if (!reportData) return null;

  const metadata = reportData.assessmentMetadata || {};
  const educationLevel = metadata.educationLevel || 'Undergraduate';
  const generatedAt = reportData.generatedAt 
    ? new Date(reportData.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) 
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const reportId = reportData.id || reportData.reportId;

  const handleDownloadPdf = () => {
    if (reportId) {
      window.open(reportApi.downloadPdfUrl(reportId), '_blank');
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-sm neu-flat mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Title & Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge variant="indigo" size="md" icon={Sparkles}>
              OFFICIAL CAREER INTELLIGENCE REPORT
            </Badge>
            <Badge variant="emerald" size="md" dot>
              Verified Analysis
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Your Career Intelligence Profile
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            A comprehensive deterministic assessment of your cognitive strengths, trait distribution, and high-compatibility career pathways.
          </p>

          {/* Student Profile Info Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Education: <strong className="text-slate-900">{educationLevel.replace('-', ' ').toUpperCase()}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Assessment Date: <strong className="text-slate-900">{generatedAt}</strong></span>
            </div>

            {reportData.iqScore !== undefined && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Cognitive Index: <strong className="text-slate-900">{reportData.iqScore}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0 no-print">
          <Button
            variant="secondary"
            size="md"
            icon={Download}
            onClick={handleDownloadPdf}
            className="shadow-soft-sm hover:shadow-soft-md"
          >
            Download PDF Report
          </Button>
        </div>
      </div>
    </div>
  );
}
