import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, GraduationCap, TrendingUp, Cpu } from 'lucide-react';
import api from '../services/api';

const slides = [
  {
    icon: Compass,
    title: "Discover Your Strengths",
    description: "Take a personality-driven career assessment designed specifically for your interests and aptitude.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: GraduationCap,
    title: "AI-Powered Guidance",
    description: "Get personalized career recommendations and detailed education pathways powered by advanced AI models.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Plan Your Future",
    description: "Explore market insights, salary estimations, skills development roadmaps, and step-by-step guides.",
    color: "from-indigo-600 to-purple-600"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backendStatus, setBackendStatus] = useState('checking');
  const navigate = useNavigate();

  useEffect(() => {
    // Verify frontend-backend connectivity using Axios
    api.get('/api/health')
      .then((data) => {
        if (data.status === 'ok') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      })
      .catch((err) => {
        console.error(err);
        setBackendStatus('offline');
      });
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/assessment');
    }
  };

  const ActiveIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-8 md:max-w-md md:mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            PathFinder AI
          </span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          Skip
        </button>
      </header>

      {/* Main Content Card */}
      <main className="flex-1 flex flex-col justify-center my-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="glassmorphism rounded-xl-card p-8 shadow-xl shadow-indigo-100/40 relative overflow-hidden"
          >
            {/* Visual background element */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50" />
            
            {/* Slide Icon */}
            <div className={`inline-flex p-4 rounded-2xl text-white bg-gradient-to-br ${slides[currentSlide].color} shadow-lg shadow-indigo-200/50 mb-8`}>
              <ActiveIcon className="w-8 h-8" />
            </div>

            {/* Slide Title */}
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              {slides[currentSlide].title}
            </h1>

            {/* Slide Description */}
            <p className="text-slate-600 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="space-y-6">
        <button
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200/80 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>
            {currentSlide === slides.length - 1 ? 'Start Assessment' : 'Next'}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Backend Status Indicator */}
        <div className="flex items-center justify-center space-x-2 text-xs">
          <span className="text-slate-400">Server Link:</span>
          {backendStatus === 'checking' && (
            <span className="inline-flex items-center text-amber-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping mr-1.5" />
              Verifying connection...
            </span>
          )}
          {backendStatus === 'connected' && (
            <span className="inline-flex items-center text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
              Connected (API Health OK)
            </span>
          )}
          {backendStatus === 'offline' && (
            <span className="inline-flex items-center text-rose-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
              Offline
            </span>
          )}
          {backendStatus === 'error' && (
            <span className="inline-flex items-center text-rose-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
              Unexpected response
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
