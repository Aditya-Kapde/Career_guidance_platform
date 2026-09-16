import React from 'react';

export default function SoftCard({
  children,
  className = '',
  inset = false,
  raised = false,
  hover = false,
  onClick,
  ...props
}) {
  let depthClass = 'neu-flat';
  if (inset) depthClass = 'neu-inset';
  else if (raised) depthClass = 'neu-raised';

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl p-6 transition-all duration-200
        ${depthClass}
        ${hover ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
