import React from 'react';
import { Star, Users, TrendUp, Clock, Shield } from '@phosphor-icons/react';
import AnimatedCounter from './AnimatedCounter';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Compliance used to be our biggest headache. Now every document, every certificate, every expiry date is tracked automatically. It\'s transformed how we run our healthcare staffing operation.',
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'CareFirst Group',
    rating: 5,
    metric: 'Full compliance automated',
    gradient: 'from-blue-500 to-blue-700',
    accentColor: '#1795C7',
    accentLight: 'rgba(23,149,199,0.08)',
    initials: 'SM',
  },
  {
    quote: 'The digital timesheets alone saved us hours every week. Timesheets approved, invoices out, payroll done — it all just flows now.',
    name: 'James Okafor',
    role: 'Director',
    company: 'MedStaff UK',
    rating: 5,
    metric: 'Hours saved every week',
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: '#059669',
    accentLight: 'rgba(5,150,105,0.08)',
    initials: 'JO',
  },
  {
    quote: 'Honestly, the shift management alone was worth it. We\'re placing more temps in less time and the team is less stressed than they\'ve ever been.',
    name: 'Priya Sharma',
    role: 'Founder',
    company: 'NurseSync',
    rating: 5,
    metric: 'More placements, less stress',
    gradient: 'from-[#1795C7] to-[#183765]',
    accentColor: '#183765',
    accentLight: 'rgba(24,55,101,0.08)',
    initials: 'PS',
  },
];

const stats = [
  { value: 600, suffix: '+', label: 'UK agencies', icon: Users, color: 'text-[#1795C7]', bg: 'bg-[#EEF7FC]', border: 'border-[#CCE8F5]' },
  { value: 98, suffix: '%', label: 'client retention', icon: TrendUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { value: 80, suffix: '%', label: 'less admin time', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  { value: 99, suffix: '%', label: 'compliance rate', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

const brandLogos = ['NHS', 'CareFirst Group', 'MedStaff UK', 'NurseSync', 'HealthForce'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const statVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Social proof logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by leading UK agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {brandLogos.map((name) => (
              <motion.div key={name}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white transition-all duration-200 cursor-default group">
                <span className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors tracking-wide">{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="section-tag mb-5 inline-flex">
            <Star weight="fill" className="h-3 w-3" />
            Customer Stories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-5 leading-[1.08]"
            style={{ letterSpacing: '-0.025em' }}>
            Loved by UK agencies
          </h2>
          <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            See how workforce leaders across the UK transformed their operations with Logezy.
          </p>
        </motion.div>

        {/* Testimonial cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {testimonials.map(({ quote, name, role, company, rating, metric, gradient, accentColor, accentLight, initials }) => (
            <motion.div key={name}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative bg-white rounded-2xl border border-slate-200 p-8 flex flex-col"
            >
              {/* Gradient top accent line */}
              <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Top row: stars + metric badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-0.5">
                  {[...Array(rating)].map((_,j) => (
                    <Star key={j} weight="fill" className="h-4 w-4 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: accentLight, color: accentColor, border: `1px solid ${accentColor}22` }}>
                  {metric}
                </span>
              </div>

              {/* Big quote mark */}
              <div className="text-7xl font-black leading-none mb-3 -mt-1"
                style={{ color: accentLight, fontFamily: 'Georgia, serif', lineHeight: 0.8 }}>
                "
              </div>

              {/* Quote text */}
              <p className="text-slate-600 leading-relaxed italic text-[15px] mb-8 flex-1">
                {quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-md`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{role} · <span className="font-medium text-slate-500">{company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {stats.map(({ value, suffix, label, icon: Icon, color, bg, border }) => (
            <motion.div key={label}
              variants={statVariants}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`saas-card text-center p-7 ${bg} border ${border}`}
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-4 shadow-sm ${color}`}
              >
                <Icon weight="fill" className="h-5 w-5" />
              </motion.div>
              <p className={`text-4xl font-black ${color} mb-1.5`}>
                <AnimatedCounter to={value} suffix={suffix} />
              </p>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
