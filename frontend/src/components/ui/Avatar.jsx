import React from 'react';

export default function Avatar({
  name = 'Student',
  size = 'md', // 'sm' | 'md' | 'lg'
  src,
  status = null, // 'online' | 'busy' | 'offline'
  className = ''
}) {
  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const getInitials = (str) => {
    if (!str) return 'S';
    return str
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeStyles[size]} rounded-full object-cover border border-slate-200 shadow-sm`}
        />
      ) : (
        <div
          className={`${sizeStyles[size]} rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold flex items-center justify-center border border-white/60 shadow-sm`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
            status === 'online'
              ? 'bg-emerald-500'
              : status === 'busy'
              ? 'bg-amber-500'
              : 'bg-slate-300'
          }`}
        />
      )}
    </div>
  );
}
