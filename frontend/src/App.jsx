import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Loading from './pages/Loading';
import Results from './pages/Results';
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
        </Routes>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
