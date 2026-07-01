import React, { useEffect, useState } from 'react';

const screens = [
  '/mobile_app_main_screen.webp',
  '/schedule-mobile.webp',
  '/Avilability.webp',
  '/notification.webp',
  '/Documents.webp',
  '/Job_location.webp',
  '/Timesheet.webp',
  '/Booking.webp',
];

export default function PhoneMockupUI() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % screens.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: 260, height: 530 }}>

      {/* Shadow glow */}
      <div className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{ boxShadow: '0 40px 80px rgba(23,149,199,0.3), 0 0 0 1px rgba(23,149,199,0.15)', filter: 'blur(1px)', transform: 'scale(0.97) translateY(8px)' }} />

      {/* Phone body */}
      <div className="relative w-full h-full rounded-[44px] overflow-hidden border-[5px] border-slate-800"
        style={{ background: '#183963', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>

        {/* Physical buttons */}
        <div className="absolute -left-1.5 top-24 w-1 h-8 bg-slate-700 rounded-l-full" />
        <div className="absolute -left-1.5 top-36 w-1 h-12 bg-slate-700 rounded-l-full" />
        <div className="absolute -left-1.5 top-52 w-1 h-12 bg-slate-700 rounded-l-full" />
        <div className="absolute -right-1.5 top-32 w-1 h-16 bg-slate-700 rounded-r-full" />

        {/* Screen area — real screenshots */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 38 }}>
          {screens.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Logezy mobile app"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}
            />
          ))}

          {/* Screen indicator dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
            {screens.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 16 : 5,
                  height: 5,
                  background: i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
