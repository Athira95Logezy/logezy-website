import React, { useState } from 'react';
import {
  CalendarBlank, Shield, Users, Clock, ChartBar, ArrowRight, Lightning, Receipt,
  DeviceMobile, MapPin, Bell, FileText, FolderOpen, Buildings, UserCircle, TrendUp,
  IdentificationCard, Coins, X, CheckCircle, Handshake, ClipboardText,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   FEATURES DATA
───────────────────────────────────────────── */
const features = [
  {
    id: 'scheduling',
    icon: CalendarBlank,
    title: 'Scheduling',
    tag: 'Most Popular',
    desc: 'Build and fill shifts in minutes with a drag-and-drop scheduler built for the pace of temporary staffing. Handle shift scheduling across your entire workforce effortlessly.',
    points: ['Drag-and-drop rota builder', 'Auto-fill by skills & availability', 'Instant worker notifications', 'Multi-site & multi-client scheduling', 'Conflict detection & prevention'],
    color: '#5B6CF9',
    gradient: 'linear-gradient(135deg, #5B6CF9, #8B5CF6)',
    bg: 'rgba(91,108,249,0.08)',
  },
  {
    id: 'timesheets',
    icon: Clock,
    title: 'Digital Timesheets',
    tag: 'Time Saver',
    desc: 'Workers submit timesheets from their phone, managers approve in one click. No paper, no chasing, no errors — just automated timesheet software that works.',
    points: ['Mobile-first timesheet app', 'One-click manager approval', 'GPS-verified clock in/out', 'Automated reminders', 'Exportable timesheet data'],
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
    bg: 'rgba(217,119,6,0.08)',
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Compliance',
    tag: 'Audit Ready',
    desc: 'Track right-to-work checks, DBS certificates, and expiring documents automatically. Your agency stays audit-ready without your team lifting a finger.',
    points: ['Right-to-work & DBS tracking', 'Automatic expiry alerts', 'Audit-ready compliance logs', 'GDPR document storage', 'CQC-ready reporting'],
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #10B981)',
    bg: 'rgba(5,150,105,0.08)',
  },
  {
    id: 'invoicing',
    icon: Receipt,
    title: 'Invoicing',
    tag: 'Auto',
    desc: 'Generate accurate client invoices automatically the moment timesheets are approved. Get paid faster with zero manual data entry.',
    points: ['Auto-generated on approval', 'Branded invoice templates', 'Integrated payment tracking', 'Multi-rate support', 'Bulk invoice export'],
    color: '#DB2777',
    gradient: 'linear-gradient(135deg, #DB2777, #EC4899)',
    bg: 'rgba(219,39,119,0.08)',
  },
  {
    id: 'reports',
    icon: ChartBar,
    title: 'Reports',
    tag: 'Insights',
    desc: 'See exactly how your agency is performing with real-time reports on placements, revenue, compliance, and more. Make smarter decisions backed by data.',
    points: ['Live placement & revenue reports', 'Compliance & payroll analytics', 'Custom dashboards & exports', 'Weekly performance summaries', 'Client billing reports'],
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
    bg: 'rgba(8,145,178,0.08)',
  },
  {
    id: 'mobile',
    icon: DeviceMobile,
    title: 'Mobile App',
    tag: 'iOS & Android',
    desc: 'Give your workers everything they need in their pocket. Check shifts, submit timesheets, upload documents, and clock in/out — all from the Logezy mobile app.',
    points: ['Available on iOS & Android', 'Push shift notifications', 'In-app document uploads', 'Availability management', 'Booking & timesheet history'],
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    id: 'gps',
    icon: MapPin,
    title: 'GPS Clock-In',
    tag: 'Live',
    desc: 'Verify where your workers are when they clock in and out. GPS-verified timesheets eliminate buddy punching and give clients confidence in every shift.',
    points: ['Real-time GPS verification', 'Geofenced clock-in/out', 'Location history log', 'Lone worker monitoring', 'Live map dashboard'],
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626, #EF4444)',
    bg: 'rgba(220,38,38,0.08)',
  },
  {
    id: 'dbs',
    icon: IdentificationCard,
    title: 'DBS Tracking',
    tag: 'Compliance',
    desc: 'Never miss a DBS renewal. Track certificate status across your entire workforce, set automatic reminders, and maintain a full audit trail for every worker.',
    points: ['Centralised DBS register', 'Expiry date tracking', 'Automatic renewal reminders', 'Enhanced & basic DBS support', 'Full audit trail'],
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)',
    bg: 'rgba(37,99,235,0.08)',
  },
  {
    id: 'righttowork',
    icon: FileText,
    title: 'Right to Work',
    tag: 'Legal',
    desc: 'Stay legally compliant with automated right-to-work checks for every worker. Store documents securely and receive alerts before any permit expires.',
    points: ['Automated RTW verification', 'Secure document storage', 'Visa & permit expiry alerts', 'Share code checks', 'UKBA compliance logging'],
    color: '#16A34A',
    gradient: 'linear-gradient(135deg, #16A34A, #22C55E)',
    bg: 'rgba(22,163,74,0.08)',
  },
  {
    id: 'alerts',
    icon: Bell,
    title: 'Shift Alerts',
    tag: 'Real-time',
    desc: 'Keep workers and managers informed with instant notifications. From new shift offers to timesheet reminders, Logezy handles all your workforce communications automatically.',
    points: ['Push & SMS notifications', 'Shift offer broadcasts', 'Last-minute vacancy alerts', 'Approval & rejection alerts', 'Custom notification rules'],
    color: '#EA580C',
    gradient: 'linear-gradient(135deg, #EA580C, #F97316)',
    bg: 'rgba(234,88,12,0.08)',
  },
  {
    id: 'documents',
    icon: FolderOpen,
    title: 'Document Management',
    tag: 'Secure',
    desc: 'Store, manage, and retrieve every document your agency needs — from contracts and training certificates to passports and payslips — all in one secure location.',
    points: ['Secure cloud storage', 'Worker document uploads', 'Expiry tracking & alerts', 'Role-based access control', 'One-click document requests'],
    color: '#0D9488',
    gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)',
    bg: 'rgba(13,148,136,0.08)',
  },
  {
    id: 'candidates',
    icon: Users,
    title: 'Candidate Management',
    tag: 'Core',
    desc: 'Keep every candidate record in one organised hub. No more spreadsheets — manage profiles, documents, skills, and placement history all in one place.',
    points: ['Centralised candidate profiles', 'Skills & availability tracking', 'Placement history log', 'Custom candidate tags', 'Bulk candidate import'],
    color: '#1795C7',
    gradient: 'linear-gradient(135deg, #1795C7, #0EA5E9)',
    bg: 'rgba(23,149,199,0.08)',
  },
  {
    id: 'clientportal',
    icon: Buildings,
    title: 'Client Portal',
    tag: 'Self-Service',
    desc: 'Give your clients their own portal to view shift schedules, approve timesheets, and track invoices — reducing back-and-forth emails and saving you hours every week.',
    points: ['Branded client login portal', 'Timesheet approval workflow', 'Invoice viewing & download', 'Shift schedule visibility', 'Direct messaging'],
    color: '#183765',
    gradient: 'linear-gradient(135deg, #183765, #1D4ED8)',
    bg: 'rgba(24,55,101,0.08)',
  },
  {
    id: 'workerportal',
    icon: UserCircle,
    title: 'Worker Portal',
    tag: 'Self-Service',
    desc: 'Workers can view their schedule, submit availability, upload documents, and access payslips from a dedicated self-service portal — reducing calls to your team.',
    points: ['Personal shift calendar', 'Availability submission', 'Document self-upload', 'Payslip access', 'Profile self-management'],
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    id: 'payroll',
    icon: Coins,
    title: 'Payroll',
    tag: 'Automated',
    desc: 'Process payroll in minutes, not days. Logezy calculates pay from approved timesheets, handles multiple pay rates, and exports directly to your payroll provider.',
    points: ['Timesheet-driven payroll', 'Multiple pay rates & uplifts', 'Holiday pay calculation', 'Payroll export (CSV/PDF)', 'PAYE & umbrella support'],
    color: '#B45309',
    gradient: 'linear-gradient(135deg, #B45309, #D97706)',
    bg: 'rgba(180,83,9,0.08)',
  },
  {
    id: 'availability',
    icon: ClipboardText,
    title: 'Availability',
    tag: 'Live',
    desc: 'Know exactly who is available to work and when. Workers submit their availability via the app, giving you a live view of your workforce capacity before you start scheduling.',
    points: ['Worker app availability submission', 'Real-time availability calendar', 'Recurring availability patterns', 'Availability conflict alerts', 'Shift preference management'],
    color: '#4F46E5',
    gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)',
    bg: 'rgba(79,70,229,0.08)',
  },
  {
    id: 'autoinvoicing',
    icon: Lightning,
    title: 'Auto-Processing',
    tag: 'New',
    desc: 'Let Logezy handle the entire post-shift process automatically — from timesheet approval to invoice generation and payroll calculation. Set it once and forget it.',
    points: ['End-to-end automation rules', 'Auto-approve trusted workers', 'Scheduled invoice dispatch', 'Automated payroll triggers', 'Rule-based exception handling'],
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    id: 'analytics',
    icon: TrendUp,
    title: 'Analytics',
    tag: 'Data-Driven',
    desc: 'Understand your agency at a deeper level. Revenue trends, fill rates, compliance scores, and worker performance — all visualised in one powerful analytics dashboard.',
    points: ['Revenue & margin tracking', 'Fill rate & vacancy analytics', 'Worker performance scores', 'Client profitability reports', 'Custom KPI dashboards'],
    color: '#0284C7',
    gradient: 'linear-gradient(135deg, #0284C7, #38BDF8)',
    bg: 'rgba(2,132,199,0.08)',
  },
];

/* ─────────────────────────────────────────────
   FEATURE POPUP MODAL
───────────────────────────────────────────── */
function FeatureModal({ feature, onClose }: { feature: typeof features[0]; onClose: () => void }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(12,24,53,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.05)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient top bar */}
        <div style={{ height: 5, background: feature.gradient }} />

        {/* Header */}
        <div className="px-8 pt-7 pb-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: feature.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 24px ${feature.color}35`,
                flexShrink: 0,
              }}>
                <Icon weight="fill" style={{ width: 28, height: 28, color: 'white' }} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">{feature.title}</h3>
                <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: feature.bg, color: feature.color }}>
                  {feature.tag}
                </span>
              </div>
            </div>
            {/* Close */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
            >
              <X weight="bold" className="h-4.5 w-4.5" />
            </motion.button>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-5" />

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mb-5">{feature.desc}</p>

          {/* Feature points */}
          <ul className="space-y-2.5 mb-7">
            {feature.points.map((pt, i) => (
              <motion.li
                key={pt}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 text-sm text-slate-700 font-medium"
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: feature.bg, border: `1.5px solid ${feature.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CheckCircle weight="fill" style={{ width: 12, height: 12, color: feature.color }} />
                </div>
                {pt}
              </motion.li>
            ))}
          </ul>

          {/* CTA row */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: feature.gradient, boxShadow: `0 4px 16px ${feature.color}35` }}
              >
                Read More
                <ArrowRight weight="bold" className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────── */
export default function Features() {
  const [selected, setSelected] = useState<typeof features[0] | null>(null);

  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="section-tag mb-5 inline-flex">
            <Lightning weight="fill" className="h-3 w-3" />
            Platform Features
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-5 leading-[1.08]"
            style={{ letterSpacing: '-0.025em' }}>
            Everything you need{' '}
            <span className="gradient-text">in one platform</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            18+ powerful features designed specifically for UK temp staffing agencies.
            <br />Click any feature to explore it.
          </p>
        </motion.div>

        {/* Icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              const cols = 6;
              const total = features.length;
              const isLastRow = i >= total - (total % cols || cols);
              const isLastCol = (i + 1) % cols === 0;

              return (
                <motion.button
                  key={f.id}
                  onClick={() => setSelected(f)}
                  className="relative flex flex-col items-center justify-center gap-3 group outline-none"
                  style={{
                    padding: '28px 16px',
                    background: 'white',
                    cursor: 'pointer',
                    border: 'none',
                    borderRight: isLastCol ? 'none' : '1px solid #E2E8F0',
                    borderBottom: isLastRow ? 'none' : '1px solid #E2E8F0',
                    textAlign: 'center',
                  }}
                  whileHover={{ background: f.bg }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Hover ring */}
                  <motion.div
                    className="absolute inset-1 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ border: `1.5px solid ${f.color}40` }}
                    transition={{ duration: 0.15 }}
                  />

                  {/* Icon */}
                  <motion.div
                    style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: f.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 4px 14px ${f.color}30`,
                      flexShrink: 0,
                    }}
                    whileHover={{ scale: 1.12, rotate: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon weight="fill" style={{ width: 22, height: 22, color: 'white' }} />
                  </motion.div>

                  {/* Title */}
                  <span className="text-xs font-semibold text-slate-700 leading-tight group-hover:text-slate-900 transition-colors"
                    style={{ maxWidth: 90 }}>
                    {f.title}
                  </span>

                  {/* "Click" hint — shows on hover */}
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-[10px] font-semibold absolute bottom-2"
                    style={{ color: f.color }}
                  >
                    Explore →
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-5 text-sm">Trusted by 600+ UK staffing agencies</p>
          <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link to="/features" className="btn-primary text-base py-3.5 px-8 rounded-2xl inline-flex items-center gap-2">
              Explore all features
              <ArrowRight weight="fill" className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature popup modal */}
      <AnimatePresence>
        {selected && (
          <FeatureModal feature={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
