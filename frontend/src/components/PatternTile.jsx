import React from 'react';

export default function PatternTile({ tile }) {
  if (!tile) return null;

  if (tile.isMissing) {
    return (
      <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-indigo-300 bg-indigo-50/50 text-indigo-300 rounded-lg">
        <span className="text-3xl md:text-4xl font-extrabold opacity-50">?</span>
      </div>
    );
  }

  // Base colors mapping
  const colorMap = {
    blue: '#2563EB',
    green: '#16A34A',
    orange: '#EA580C',
    pink: '#DB2777',
    purple: '#9333EA',
    red: '#DC2626',
    yellow: '#EAB308',
    slate: '#475569'
  };

  const getThemeColor = (colorStr) => colorMap[colorStr] || colorStr || '#475569';
  const themeColor = getThemeColor(tile.color);

  // Layout classes mapping
  const sizeMap = {
    sm: 'w-1/3 h-1/3',
    md: 'w-1/2 h-1/2',
    lg: 'w-3/4 h-3/4',
    full: 'w-full h-full'
  };
  const sizeClass = sizeMap[tile.size] || sizeMap.lg;

  const rotateMap = {
    0: '',
    90: 'rotate-90',
    180: 'rotate-180',
    270: '-rotate-90',
    up: '-rotate-90',
    down: 'rotate-90',
    left: 'rotate-180',
    right: ''
  };
  const rotateClass = tile.direction ? rotateMap[tile.direction] : (rotateMap[tile.rotation] || '');

  // Render Arrow
  if (tile.type === 'arrow') {
    return (
      <div className="w-full h-full flex items-center justify-center p-2">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={themeColor} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`w-3/4 h-3/4 transition-transform ${rotateClass}`}
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    );
  }

  // Render Dots
  if (tile.type === 'dots') {
    const count = parseInt(tile.count) || 1;
    return (
      <div className="w-full h-full flex items-center justify-center p-2">
        <div className="grid grid-cols-2 gap-1.5 place-items-center w-3/4 h-3/4">
          {Array.from({ length: count }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-full w-3 h-3 md:w-4 md:h-4" 
              style={{ backgroundColor: themeColor }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render Shape
  if (tile.type === 'shape') {
    const isOutline = tile.variant === 'outline';
    const isFaded = tile.variant === 'faded';
    const fillStyle = isOutline ? 'none' : themeColor;
    const strokeStyle = isOutline ? themeColor : 'none';
    const opacity = isFaded ? 0.4 : 1;
    const strokeW = isOutline ? "3" : "0";

    const renderShapeSVG = () => {
      switch (tile.shape) {
        case 'circle':
          return <circle cx="12" cy="12" r="10" fill={fillStyle} stroke={strokeStyle} strokeWidth={strokeW} />;
        case 'square':
          return <rect x="2" y="2" width="20" height="20" rx="2" fill={fillStyle} stroke={strokeStyle} strokeWidth={strokeW} />;
        case 'diamond':
          return <path d="M12 2L22 12L12 22L2 12Z" fill={fillStyle} stroke={strokeStyle} strokeWidth={strokeW} strokeLinejoin="round" />;
        case 'triangle':
          return <path d="M12 2L22 20H2Z" fill={fillStyle} stroke={strokeStyle} strokeWidth={strokeW} strokeLinejoin="round" />;
        case 'cross':
          return <path d="M9 2H15V9H22V15H15V22H9V15H2V9H9V2Z" fill={fillStyle} stroke={strokeStyle} strokeWidth={strokeW} strokeLinejoin="round" />;
        case 'plus':
          return <path d="M12 4V20M4 12H20" stroke={themeColor} strokeWidth="4" strokeLinecap="round" />;
        default:
          return <rect x="4" y="4" width="16" height="16" fill={fillStyle} stroke={strokeStyle} strokeWidth={strokeW} />;
      }
    };

    return (
      <div className="w-full h-full flex items-center justify-center p-2" style={{ opacity }}>
        <svg 
          viewBox="0 0 24 24" 
          className={`${sizeClass} transition-transform ${rotateClass}`}
        >
          {renderShapeSVG()}
        </svg>
      </div>
    );
  }

  // Default fallback (text or unknown)
  return (
    <div className="w-full h-full flex items-center justify-center p-2 bg-slate-50 rounded-lg border border-slate-200">
      <span className="font-bold text-slate-700 text-center text-sm md:text-base">{tile.text || 'Unknown'}</span>
    </div>
  );
}
