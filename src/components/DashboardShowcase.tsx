import React, { useState } from 'react';
import { CalendarBlank, Clock, ChartBar, FileText, ArrowRight, Desktop } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const tabs = [
  {
    id: 'schedule',
    label: 'Schedule',
    icon: CalendarBlank,
    image: '/schudule.png',
    url: 'app.logezy.co.uk/schedule',
    headline: 'Fill every shift in minutes',
    desc: 'Drag, drop, done. Manage your full weekly rota across all clients and candidates — with real-time visibility of who is working where.',
  },
  {
    id: 'timesheets',
    label: 'Timesheets',
    icon: Clock,
    image: '/image_01.png',
    url: 'app.logezy.co.uk/timesheets',
    headline: 'Payroll that runs itself',
    desc: 'Track total hours, approved hours, and invoiced hours week by week. Full transparency on charge rates and pay rates across your workforce.',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: ChartBar,
    image: '/reports.png',
    url: 'app.logezy.co.uk/reports',
    headline: 'Insights that drive decisions',
    desc: 'Detailed staff reports showing every shift, candidate, job, hours, pay rate and status — fully exportable and customisable to your needs.',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: FileText,
    image: '/image_00.png',
    url: 'app.logezy.co.uk/invoices',
    headline: 'Get paid faster',
    desc: 'A live invoices summary across your entire client base — see what\'s paid, what\'s overdue, and your total invoiced value at a glance.',
  },
];

export default function DashboardShowcase() {
  const [active, setActive] = useState('schedule');
  const ref = useScrollReveal();
  const current = tabs.find(t => t.id === active)!;

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0C1835 0%, #0E2050 100%)' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14 sr">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ background: 'rgba(23,149,199,0.15)', border: '1px solid rgba(23,149,199,0.3)', color: '#A8D8EE' }}>
            <Desktop weight="fill" className="h-3 w-3" />
            Product Tour
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            See Logezy <span className="gradient-text">in action</span>
          </h2>
          <p className="text-xl max-w-xl mx-auto" style={{ color: 'rgba(165,210,255,0.60)' }}>
            Explore the platform transforming how UK agencies manage their workforce.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center mb-10 sr">
          <div className="inline-flex rounded-2xl p-1.5 gap-1" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active === id
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                }`}>
                <Icon weight="fill" className={`h-4 w-4 ${active === id ? 'text-blue-600' : ''}`} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start">

          <div className="sr-left">
            <h3 className="text-3xl font-black text-white mb-4">{current.headline}</h3>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(165,210,255,0.60)' }}>{current.desc}</p>
            <Link to="/features" className="btn-primary">
              Explore this feature
              <ArrowRight weight="fill" className="h-4 w-4" />
            </Link>
          </div>

          <div className="sr-right">
            {/* Browser chrome wrapper */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 24px 64px rgba(23,149,199,0.12), 0 8px 24px rgba(0,0,0,0.08)' }}>
              <div className="browser-chrome">
                <div className="browser-dot bg-red-400" />
                <div className="browser-dot bg-amber-400" />
                <div className="browser-dot bg-emerald-400" />
                <div className="browser-bar">{current.url}</div>
              </div>
              <div key={active} style={{ animation: 'fade-in 0.35s ease forwards' }}>
                <img
                  src={current.image}
                  alt={`Logezy ${current.label}`}
                  className="w-full block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
