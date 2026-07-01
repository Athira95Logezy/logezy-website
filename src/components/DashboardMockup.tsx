import React from 'react';

export default function DashboardMockup({ animate = true }: { animate?: boolean }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80"
      style={{ boxShadow: '0 32px 80px rgba(23,149,199,0.18), 0 8px 32px rgba(0,0,0,0.08)' }}>

      {/* Browser chrome */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5" />
      </div>

      {/* Real dashboard screenshot */}
      <img
        src="/DASHBAORD_NEW.webp"
        alt="Logezy Dashboard"
        loading="lazy"
        decoding="async"
        className="w-full block"
      />
    </div>
  );
}
