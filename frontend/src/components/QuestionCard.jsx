import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PatternTile from './PatternTile';

export default function QuestionCard({ question, selectedOptions, onSelectOption }) {
  const isMultiple = (question.questionType || question.type) === 'multiple';

  return (
    <div className="w-full">
      {/* Category Badge */}
      {question.category && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wider border border-indigo-200 shadow-sm">
            {question.category.replace(/_/g, ' ')}
          </span>
        </div>
      )}

      {/* Question Graphic */}
      {(question.questionImage || question.svgComponent) && (
        <div className="mb-6 w-full max-w-md mx-auto aspect-video bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center relative">
          {question.questionImage ? (
            <img 
              src={question.questionImage} 
              alt="Question illustration" 
              className="w-full h-full object-contain z-10"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : (
            <div className="z-10">{question.svgComponent}</div>
          )}
          {/* Placeholder/Fallback */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm flex-col space-y-2" style={question.questionImage ? {display: 'none'} : {}}>
            <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Image placeholder</span>
          </div>
        </div>
      )}

      {/* Pattern Grid Graphic */}
      {(question.type === 'pattern' || question.questionType === 'pattern') && question.patternTiles && (
        <div className="mb-6 w-full max-w-xs md:max-w-sm mx-auto aspect-square bg-slate-50/50 rounded-xl border border-slate-200 p-3 md:p-4">
          <div className="w-full h-full grid grid-cols-3 gap-2 md:gap-3">
            {question.patternTiles.map((tile, idx) => (
              <div 
                key={idx} 
                className={`aspect-square rounded-lg overflow-hidden transition-all ${
                  tile.isMissing 
                    ? '' 
                    : 'border border-slate-200 bg-white shadow-sm'
                }`}
              >
                <PatternTile tile={tile} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Headline */}
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-6">
        {question.question || question.text}
      </h2>

      {/* Choice Card Stack */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOptions.includes(index);

          return (
            <button
              key={index}
              onClick={() => onSelectOption(index)}
              className="w-full text-left focus:outline-none transition-all duration-200"
            >
              <div
                className={`relative p-5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-md shadow-indigo-100/30'
                    : 'border-slate-200 bg-white/70 hover:border-slate-350 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-4 pr-6">
                  {/* Selection dot/box */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-lg border transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    } ${!isMultiple ? 'rounded-full' : ''}`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  
                  {/* Option Text and/or Graphic */}
                  <div className="flex flex-col space-y-2">
                    {option.image && (
                      <div className="w-24 h-24 bg-white rounded border border-slate-200 flex items-center justify-center overflow-hidden p-1 shadow-sm relative">
                        <img 
                          src={option.image} 
                          alt={option.text || `Option ${option.id}`} 
                          className="max-w-full max-h-full object-contain z-10"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300" style={{display: 'none'}}>
                          <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {option.patternTile && (
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                        <PatternTile tile={option.patternTile} />
                      </div>
                    )}
                    {(typeof option === 'object' && option.text) && (
                      <span className={`font-semibold text-slate-800 text-sm md:text-base ${
                        isSelected ? 'text-indigo-950 font-bold' : ''
                      }`}>
                        {option.text}
                      </span>
                    )}
                    {typeof option === 'string' && (
                      <span className={`font-semibold text-slate-800 text-sm md:text-base ${
                        isSelected ? 'text-indigo-950 font-bold' : ''
                      }`}>
                        {option}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {isMultiple && (
        <p className="text-xs text-slate-400 mt-4 text-center">
          * You can select multiple options for this question.
        </p>
      )}
    </div>
  );
}
