import React, { useState } from 'react';
import { Heartbeat, Briefcase, Users, CheckCircle, ArrowRight, Buildings } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  {
    id: 'healthcare', icon: Heartbeat, label: 'Healthcare',
    color: 'from-rose-500 to-pink-600',
    activeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
    inactiveStyle: 'bg-white text-slate-500 border-slate-200 hover:border-slate-300',
    headline: 'Place the right healthcare staff exactly when needed',
    desc: "From nurses to support workers, Logezy gives healthcare staffing agencies the scheduling, compliance, and workforce management tools to place the right people exactly when they're needed.",
    points: ['NMC / HCPC registration tracking', 'DBS & right-to-work automation', 'Mandatory training reminders', 'CQC-ready compliance logs', 'GPS clock-in for lone workers'],
    image: '/DASHBAORD_NEW.png',
    url: 'app.logezy.co.uk/dashboard',
    stat: '98%', statLabel: 'compliance rate', statColor: 'text-rose-600',
  },
  {
    id: 'hospitality', icon: Briefcase, label: 'Hospitality',
    color: 'from-amber-500 to-orange-600',
    activeStyle: 'bg-amber-50 text-amber-700 border-amber-200',
    inactiveStyle: 'bg-white text-slate-500 border-slate-200 hover:border-slate-300',
    headline: 'Keep every shift covered — even at the last minute',
    desc: 'Keep every shift covered during busy seasons, peak events, and last-minute rushes. Logezy makes temporary staffing in hospitality faster, cleaner, and far less stressful.',
    points: ['Last-minute shift fill & alerts', 'Multi-venue scheduling', 'Digital timesheets on mobile', 'Auto invoicing per client venue', 'Seasonal demand forecasting'],
    image: '/schudule.png',
    url: 'app.logezy.co.uk/schedule',
    stat: '3×', statLabel: 'faster shift fill', statColor: 'text-amber-600',
  },
  {
    id: 'education', icon: Users, label: 'Education',
    color: 'from-violet-500 to-purple-600',
    activeStyle: 'bg-violet-50 text-violet-700 border-violet-200',
    inactiveStyle: 'bg-white text-slate-500 border-slate-200 hover:border-slate-300',
    headline: 'Supply the right staff without the paperwork headache',
    desc: 'Place the right teachers and support staff without the paperwork headache. Logezy handles compliance tracking and shift management so your consultants can focus on what they do best.',
    points: ['Same-day teacher placements', 'DBS & safeguarding checks', 'School portal with live visibility', 'AWR-compliant payroll', 'Holiday & absence tracking'],
    image: '/reports.png',
    url: 'app.logezy.co.uk/reports',
    stat: '60%', statLabel: 'faster bookings', statColor: 'text-violet-600',
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const listContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const listItemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function IndustrySolutions() {
  const [active, setActive] = useState<string>('healthcare');
  const current = industries.find(i => i.id === active)!;

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="section-tag mb-5 inline-flex">
            <Buildings weight="fill" className="h-3 w-3" />
            Industry Solutions
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-5 leading-[1.08]"
            style={{ letterSpacing: '-0.025em' }}>
            Built for the industries<br />
            <span className="gradient-text">that never slow down</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Whether you staff hospitals, hotels, or schools — Logezy adapts to the speed and compliance demands of your sector.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {industries.map(({ id, icon: Icon, label, activeStyle, inactiveStyle }) => (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 ${
                active === id ? `${activeStyle} shadow-md scale-105` : `${inactiveStyle}`
              }`}>
              <Icon weight="fill" className="h-4 w-4" />
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-copy'}
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 border-2 ${
                current.id === 'healthcare' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                current.id === 'hospitality' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                'bg-violet-50 text-violet-700 border-violet-100'
              }`}>
                <current.icon weight="fill" className="h-4 w-4" />
                {current.label}
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-5 leading-[1.1]"
                style={{ letterSpacing: '-0.02em' }}>
                {current.headline}
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">{current.desc}</p>

              <motion.ul
                variants={listContainerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3 mb-10"
              >
                {current.points.map(pt => (
                  <motion.li key={pt} variants={listItemVariants} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <CheckCircle weight="fill" className="h-3 w-3 text-white" />
                    </div>
                    {pt}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex items-center gap-8">
                <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link to="/contact" className="btn-primary rounded-2xl inline-flex items-center gap-2">
                    See {current.label} demo
                    <ArrowRight weight="fill" className="h-4 w-4" />
                  </Link>
                </motion.div>
                <div>
                  <p className={`text-3xl font-black ${current.statColor}`}>{current.stat}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{current.statLabel}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right — real screenshot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-screen'}
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="rounded-2xl overflow-hidden border border-slate-200"
                style={{ boxShadow: '0 24px 64px rgba(23,149,199,0.08), 0 8px 24px rgba(0,0,0,0.06)' }}>
                <div className="browser-chrome">
                  <div className="browser-dot bg-red-400" />
                  <div className="browser-dot bg-amber-400" />
                  <div className="browser-dot bg-emerald-400" />
                  <div className="browser-bar">{current.url}</div>
                </div>
                <img
                  src={current.image}
                  alt={`Logezy ${current.label}`}
                  className="w-full block"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
