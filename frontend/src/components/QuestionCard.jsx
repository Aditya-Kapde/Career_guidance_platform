import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function QuestionCard({ question, selectedOptions, onSelectOption }) {
  const isMultiple = question.type === 'multiple';

  return (
    <div className="w-full">
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
                  
                  {/* Option Text */}
                  <span className={`font-semibold text-slate-800 text-sm md:text-base ${
                    isSelected ? 'text-indigo-950 font-bold' : ''
                  }`}>
                    {typeof option === 'object' ? option.text : option}
                  </span>
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
