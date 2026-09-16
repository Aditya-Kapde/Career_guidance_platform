import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';

export default function AppShell({ 
  children, 
  title, 
  subtitle,
  hideNavigation = false,
  fullWidth = false
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (hideNavigation) {
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-900">
      {/* Desktop Persistent Sidebar */}
      <Sidebar className="hidden lg:flex shrink-0" />

      {/* Mobile Drawer and Navigation */}
      <MobileNavigation isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content Area with Header */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Header 
          onOpenMobileMenu={() => setMobileOpen(true)} 
          title={title} 
          subtitle={subtitle} 
        />

        <main className={`flex-1 w-full ${fullWidth ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
