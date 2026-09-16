import React from 'react';
import { Wrench } from 'lucide-react';
import Badge from './ui/Badge';

export default function ToolsSection({ tools = [] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm neu-flat space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
          <Wrench className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Tools & Technologies
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {tools.map((tool, idx) => {
          const name = typeof tool === 'string' ? tool : tool.name || JSON.stringify(tool);
          return (
            <Badge key={idx} variant="purple" size="md">
              {name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
