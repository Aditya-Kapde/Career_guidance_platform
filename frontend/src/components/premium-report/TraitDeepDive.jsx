import React from 'react';

const TraitDeepDive = ({ traits }) => {
  if (!traits || traits.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-gray-100 print:break-after-page print:pt-10">
      <div className="mb-16">
        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-2">Chapter 02</h2>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Personality Blueprint & Traits</h3>
        <p className="text-gray-500 mt-4 max-w-2xl text-lg">A deep dive into your core psychological drivers, outlining structural advantages and potential blind spots in professional environments.</p>
      </div>

      <div className="space-y-16">
        {traits.map((trait, idx) => (
          <div key={idx} className="relative pl-8 md:pl-0">
            {/* Minimalist vertical timeline line */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200 md:hidden"></div>
            
            <div className="md:grid md:grid-cols-12 md:gap-12 items-start">
              <div className="md:col-span-4 mb-6 md:mb-0 relative">
                <div className="hidden md:block absolute right-0 top-2 bottom-0 w-px bg-gray-200"></div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{trait.trait}</h4>
                <div className="h-1 w-12 bg-indigo-600 rounded-full mb-6"></div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Interpretation</p>
                <p className="text-gray-600 leading-relaxed text-sm pr-6">{trait.interpretation}</p>
              </div>

              <div className="md:col-span-8 space-y-8">
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Advantages
                  </h5>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">{trait.advantages}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Limitations
                  </h5>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">{trait.limitations}</p>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Career Relevance
                  </h5>
                  <p className="text-gray-600 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">{trait.careerRelevance}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TraitDeepDive;
