import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PatternTile from './PatternTile';
import Badge from './ui/Badge';

export default function QuestionCard({ question, selectedOptions = [], onSelectOption }) {
  if (!question) return null;

  const isMultiple = (question.questionType || question.type) === 'multiple';
  const categoryName = question.category ? question.category.replace(/_/g, ' ') : null;

  return (
    <div className="w-full">
      {/* Category Badge & Question Type */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {categoryName ? (
          <Badge variant="indigo" size="sm">
            {categoryName}
          </Badge>
        ) : (
          <Badge variant="slate" size="sm">
            Aptitude Assessment
          </Badge>
        )}

        {isMultiple && (
          <span className="text-[11px] font-semibold text-slate-400">
            Select all that apply
          </span>
        )}
      </div>

      {/* Optional Question Image Graphic */}
      {(question.questionImage || question.svgComponent) && (
        <div className="mb-6 w-full max-w-md mx-auto aspect-video bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-hidden flex items-center justify-center relative p-3">
          {question.questionImage ? (
            <img
              src={question.questionImage}
              alt="Question scenario illustration"
              className="w-full h-full object-contain z-10"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="z-10">{question.svgComponent}</div>
          )}
          <div
            className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs flex-col space-y-1"
            style={question.questionImage ? { display: 'none' } : {}}
          >
            <span>Illustration</span>
          </div>
        </div>
      )}

      {/* Pattern Matrix Graphic for Cognitive Questions */}
      {(question.type === 'pattern' || question.questionType === 'pattern') && question.patternTiles && (
        <div className="mb-6 w-full max-w-xs md:max-w-sm mx-auto aspect-square bg-slate-50 rounded-2xl border border-slate-200/90 p-3 md:p-4 neu-inset">
          <div className="w-full h-full grid grid-cols-3 gap-2.5 md:gap-3">
            {question.patternTiles.map((tile, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-xl overflow-hidden transition-all ${
                  tile.isMissing
                    ? 'border-2 border-dashed border-indigo-300 bg-indigo-50/40 flex items-center justify-center text-indigo-400 font-bold text-lg'
                    : 'border border-slate-200 bg-white shadow-soft-sm'
                }`}
              >
                {tile.isMissing ? '?' : <PatternTile tile={tile} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Text Headline */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight mb-6">
        {question.question || question.text}
      </h2>

      {/* Options Stack */}
      <div className="space-y-3">
        {question.options && question.options.map((option, index) => {
          const isSelected = selectedOptions.includes(index);
          const optionText = typeof option === 'string' ? option : option.text || option.label || `Option ${index + 1}`;

          return (
            <motion.button
              key={index}
              type="button"
              whileHover={{ scale: 1.008 }}
              whileTap={{ scale: 0.992 }}
              onClick={() => onSelectOption(index)}
              className={`
                w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-between gap-4
                ${isSelected
                  ? 'bg-indigo-50/80 border-indigo-600/90 shadow-md shadow-indigo-100/50 ring-1 ring-indigo-600/30 neu-flat'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70 shadow-soft-sm'
                }
              `}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Soft Custom Check / Radio Indicator */}
                <div
                  className={`
                    w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200
                    ${isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'border-slate-300 bg-white'
                    }
                    ${!isMultiple ? 'rounded-full' : 'rounded-md'}
                  `}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Pattern Graphic Option if exists */}
                {option.patternTile && (
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shadow-soft-sm shrink-0">
                    <PatternTile tile={option.patternTile} />
                  </div>
                )}

                {/* Image Option if exists */}
                {option.image && (
                  <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden p-1 shadow-soft-sm shrink-0">
                    <img
                      src={option.image}
                      alt={optionText}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}

                {/* Option Text */}
                <span className={`text-sm sm:text-base font-semibold leading-relaxed transition-colors ${
                  isSelected ? 'text-indigo-950 font-bold' : 'text-slate-700'
                }`}>
                  {optionText}
                </span>
              </div>

              {/* Selection key badge */}
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border text-slate-400 shrink-0 hidden sm:inline-block ${
                isSelected ? 'border-indigo-200 bg-indigo-100 text-indigo-700 font-bold' : 'border-slate-200 bg-slate-50'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
