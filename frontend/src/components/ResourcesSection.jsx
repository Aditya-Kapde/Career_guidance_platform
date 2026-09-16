import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import Badge from './ui/Badge';

export default function ResourcesSection({ resources = [] }) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm neu-flat space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <Bookmark className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Recommended Resources
        </h3>
      </div>

      <div className="space-y-2.5 pt-1">
        {resources.map((res, idx) => {
          const isObj = typeof res === 'object';
          const title = isObj ? res.title || res.name : res;
          const url = isObj ? res.url || res.link : '#';
          const type = isObj ? res.type : null;

          return (
            <div key={idx} className="p-3 rounded-2xl bg-indigo-50/40 border border-indigo-100/70 flex items-center justify-between text-xs gap-3">
              <div>
                <span className="font-bold text-slate-900 block truncate">
                  {title}
                </span>
                {type && (
                  <span className="text-indigo-600 font-semibold text-[10px] block">
                    {type}
                  </span>
                )}
              </div>

              {url && url !== '#' && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 p-1 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
