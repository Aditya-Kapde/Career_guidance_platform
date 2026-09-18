import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PatternTile from './PatternTile';
import Badge from './ui/Badge';

export default function QuestionCard({ 
  question, 
  selectedOptionIds = [], 
  onSelectOption 
}) {
  if (!question) return null;

  const isMultiple = (question.questionType || question.type) === 'multiple';
  const categoryName = question.category ? question.category.replace(/_/g, ' ') : 'Aptitude Assessment';
  const questionId = question.id || 'current-question';

  return (
    <fieldset className="w-full border-none p-0 m-0" aria-labelledby={`${questionId}-title`}>
      {/* Category Badge & Question Type Indicator */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <Badge variant="indigo" size="sm">
          {categoryName.toUpperCase()}
        </Badge>

        <span className="text-[11px] font-semibold text-slate-500" aria-live="polite">
          {isMultiple ? 'Select all that apply' : 'Single Choice'}
        </span>
      </div>

      {/* Pattern Matrix Graphic for Cognitive Questions */}
      {(question.type === 'pattern' || question.questionType === 'pattern') && question.patternTiles && (
        <div 
          className="mb-6 w-full max-w-xs md:max-w-sm mx-auto aspect-square bg-slate-50 rounded-2xl border border-slate-200/90 p-3 md:p-4 neu-inset"
          role="img"
          aria-label="Spatial 3x3 pattern grid sequence with a missing ninth piece"
        >
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
                {tile.isMissing ? (
                  <span className="sr-only">Missing tile in sequence</span>
                ) : (
                  <PatternTile tile={tile} />
                )}
                {tile.isMissing && <span aria-hidden="true">?</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Text Headline (Semantic Legend) */}
      <legend 
        id={`${questionId}-title`} 
        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight mb-6 block"
      >
        {question.question || question.text}
      </legend>

      {/* Options Stack with Semantic Radio/Checkbox Inputs */}
      <div className="space-y-3" role={isMultiple ? 'group' : 'radiogroup'} aria-labelledby={`${questionId}-title`}>
        {question.options && question.options.map((option, index) => {
          const optId = option.id || String.fromCharCode(65 + index);
          const isSelected = selectedOptionIds.includes(optId) || selectedOptionIds.includes(index);
          const optionText = typeof option === 'string' ? option : option.text || option.label || `Option ${optId}`;
          const inputId = `${questionId}-opt-${optId}`;

          return (
            <label
              key={optId}
              htmlFor={inputId}
              className={`
                w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 select-none
                focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2
                ${isSelected
                  ? 'bg-indigo-50/90 border-indigo-600 shadow-md shadow-indigo-100/50 ring-1 ring-indigo-600/30'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70 shadow-soft-sm'
                }
              `}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Screen-reader accessible hidden native input */}
                <input
                  type={isMultiple ? 'checkbox' : 'radio'}
                  id={inputId}
                  name={`question-${questionId}`}
                  value={optId}
                  checked={isSelected}
                  onChange={() => onSelectOption(optId)}
                  className="sr-only"
                  aria-label={optionText}
                />

                {/* Visual Check / Radio Indicator */}
                <div
                  aria-hidden="true"
                  className={`
                    w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-200
                    ${isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'border-slate-300 bg-white'
                    }
                    ${!isMultiple ? 'rounded-full' : 'rounded-md'}
                  `}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Pattern Graphic Option */}
                {option.patternTile && (
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shadow-soft-sm shrink-0"
                    aria-hidden="true"
                  >
                    <PatternTile tile={option.patternTile} />
                  </div>
                )}

                {/* Option Text */}
                <span className={`text-sm sm:text-base leading-relaxed transition-colors ${
                  isSelected ? 'text-indigo-950 font-bold' : 'text-slate-700 font-medium'
                }`}>
                  {optionText}
                </span>
              </div>

              {/* Key badge */}
              <span 
                aria-hidden="true"
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md border text-slate-400 shrink-0 hidden sm:inline-block ${
                  isSelected ? 'border-indigo-200 bg-indigo-100 text-indigo-700 font-bold' : 'border-slate-200 bg-slate-50'
                }`}
              >
                {optId}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
