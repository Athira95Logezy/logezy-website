import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const logos = [
  'MedStaff UK', 'CareFirst Group', 'NurseSync', 'HealthForce Pro',
  'StaffBridge', 'CareLink360', 'PrimeNurse', 'ShiftWell',
  'MedStaff UK', 'CareFirst Group', 'NurseSync', 'HealthForce Pro',
  'StaffBridge', 'CareLink360', 'PrimeNurse', 'ShiftWell',
];

export default function TrustedBy() {
  const ref = useScrollReveal();

  return (
    <section className="py-14 border-b border-white/5" style={{ background: '#0C1835' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-blue-300/70 uppercase tracking-widest mb-10 sr in-view">
          Trusted by 600+ UK staffing &amp; healthcare agencies
        </p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0C1835, transparent)' }} />
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0C1835, transparent)' }} />
          <div className="flex overflow-hidden">
            <div className="marquee-track">
              {logos.map((name, i) => (
                <div key={i} className="inline-flex items-center mx-8 flex-shrink-0">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
