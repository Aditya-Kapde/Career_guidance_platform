import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Loading from './pages/Loading';
import Results from './pages/Results';
import CareerRoadmap from './pages/CareerRoadmap';
import Report from './pages/Report';
import ReportPrint from './pages/ReportPrint';
import PdfTest from './pages/PdfTest';
import './App.css';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report-print" element={<ReportPrint />} />
          <Route path="/pdf-test" element={<PdfTest />} />
          <Route path="/career/:careerId" element={<CareerRoadmap />} />
        </Routes>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
