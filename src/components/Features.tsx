import React, { useState } from 'react';
import {
  CalendarBlank, Shield, Users, Clock, ChartBar, ArrowRight, Lightning, Receipt,
  DeviceMobile, MapPin, Bell, FileText, FolderOpen, Buildings, UserCircle, TrendUp,
  IdentificationCard, Coins, X, CheckCircle, ClipboardText,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureIllustration } from './FeatureIllustrations';
import { useWindowWidth } from '../hooks/useWindowWidth';

const featureUrl: Record<string, string> = {
  scheduling:    'schedule',
  timesheets:    'timesheets',
  compliance:    'compliance',
  invoicing:     'invoices',
  reports:       'reports',
  mobile:        'mobile-app',
  gps:           'gps-clock-in',
  dbs:           'dbs-tracking',
  righttowork:   'right-to-work',
  alerts:        'shift-alerts',
  documents:     'documents',
  candidates:    'candidates',
  clientportal:  'client-portal',
  workerportal:  'worker-portal',
  payroll:       'payroll',
  availability:  'availability',
  autoinvoicing: 'automation',
  analytics:     'analytics',
};

const features = [
  {
    id: 'scheduling',
    icon: CalendarBlank,
    title: 'Scheduling',
    tag: 'Most Popular',
    desc: 'Build and fill shifts in minutes with a drag-and-drop scheduler built for the pace of temporary staffing. Handle scheduling across your entire workforce effortlessly.',
    points: ['Drag-and-drop rota builder', 'Auto-fill by skills & availability', 'Instant worker notifications', 'Multi-site & multi-client scheduling', 'Conflict detection & prevention'],
    color: '#5B6CF9', gradient: 'linear-gradient(135deg, #5B6CF9, #8B5CF6)', bg: 'rgba(91,108,249,0.09)',
  },
  {
    id: 'timesheets',
    icon: Clock,
    title: 'Digital Timesheets',
    tag: 'Time Saver',
    desc: 'Workers submit timesheets from their phone, managers approve in one click. No paper, no chasing, no errors — just automated timesheet software that works.',
    points: ['Mobile-first timesheet app', 'One-click manager approval', 'GPS-verified clock in/out', 'Automated reminders', 'Exportable timesheet data'],
    color: '#D97706', gradient: 'linear-gradient(135deg, #D97706, #F59E0B)', bg: 'rgba(217,119,6,0.09)',
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Compliance',
    tag: 'Audit Ready',
    desc: 'Track right-to-work checks, DBS certificates, and expiring documents automatically. Your agency stays audit-ready without your team lifting a finger.',
    points: ['Right-to-work & DBS tracking', 'Automatic expiry alerts', 'Audit-ready compliance logs', 'GDPR document storage', 'CQC-ready reporting'],
    color: '#059669', gradient: 'linear-gradient(135deg, #059669, #10B981)', bg: 'rgba(5,150,105,0.09)',
  },
  {
    id: 'invoicing',
    icon: Receipt,
    title: 'Invoicing',
    tag: 'Automated',
    desc: 'Generate accurate client invoices automatically the moment timesheets are approved. Get paid faster with zero manual data entry.',
    points: ['Auto-generated on approval', 'Branded invoice templates', 'Integrated payment tracking', 'Multi-rate support', 'Bulk invoice export'],
    color: '#DB2777', gradient: 'linear-gradient(135deg, #DB2777, #EC4899)', bg: 'rgba(219,39,119,0.09)',
  },
  {
    id: 'reports',
    icon: ChartBar,
    title: 'Reports',
    tag: 'Insights',
    desc: 'See exactly how your agency is performing with real-time reports on placements, revenue, compliance, and more. Make smarter decisions backed by data.',
    points: ['Live placement & revenue reports', 'Compliance & payroll analytics', 'Custom dashboards & exports', 'Weekly performance summaries', 'Client billing reports'],
    color: '#0891B2', gradient: 'linear-gradient(135deg, #0891B2, #06B6D4)', bg: 'rgba(8,145,178,0.09)',
  },
  {
    id: 'mobile',
    icon: DeviceMobile,
    title: 'Mobile App',
    tag: 'iOS & Android',
    desc: 'Give your workers everything they need in their pocket. Check shifts, submit timesheets, upload documents, and clock in/out — all from the Logezy mobile app.',
    points: ['Available on iOS & Android', 'Push shift notifications', 'In-app document uploads', 'Availability management', 'Booking & timesheet history'],
    color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', bg: 'rgba(124,58,237,0.09)',
  },
  {
    id: 'gps',
    icon: MapPin,
    title: 'GPS Clock-In',
    tag: 'Live',
    desc: 'Verify where your workers are when they clock in and out. GPS-verified timesheets eliminate buddy punching and give clients confidence in every shift.',
    points: ['Real-time GPS verification', 'Geofenced clock-in/out', 'Location history log', 'Lone worker monitoring', 'Live map dashboard'],
    color: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626, #EF4444)', bg: 'rgba(220,38,38,0.09)',
  },
  {
    id: 'dbs',
    icon: IdentificationCard,
    title: 'DBS Tracking',
    tag: 'Compliance',
    desc: 'Never miss a DBS renewal. Track certificate status across your entire workforce, set automatic reminders, and maintain a full audit trail for every worker.',
    points: ['Centralised DBS register', 'Expiry date tracking', 'Automatic renewal reminders', 'Enhanced & basic DBS support', 'Full audit trail'],
    color: '#2563EB', gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)', bg: 'rgba(37,99,235,0.09)',
  },
  {
    id: 'righttowork',
    icon: FileText,
    title: 'Right to Work',
    tag: 'Legal',
    desc: 'Stay legally compliant with automated right-to-work checks for every worker. Store documents securely and receive alerts before any permit expires.',
    points: ['Automated RTW verification', 'Secure document storage', 'Visa & permit expiry alerts', 'Share code checks', 'UKBA compliance logging'],
    color: '#16A34A', gradient: 'linear-gradient(135deg, #16A34A, #22C55E)', bg: 'rgba(22,163,74,0.09)',
  },
  {
    id: 'alerts',
    icon: Bell,
    title: 'Shift Alerts',
    tag: 'Real-time',
    desc: 'Keep workers and managers informed with instant notifications. From shift offers to timesheet reminders, Logezy handles all workforce communications automatically.',
    points: ['Push & SMS notifications', 'Shift offer broadcasts', 'Last-minute vacancy alerts', 'Approval & rejection alerts', 'Custom notification rules'],
    color: '#EA580C', gradient: 'linear-gradient(135deg, #EA580C, #F97316)', bg: 'rgba(234,88,12,0.09)',
  },
  {
    id: 'documents',
    icon: FolderOpen,
    title: 'Document Management',
    tag: 'Secure',
    desc: 'Store, manage, and retrieve every document — contracts, training certificates, passports and payslips — all in one secure, organised location.',
    points: ['Secure cloud storage', 'Worker document uploads', 'Expiry tracking & alerts', 'Role-based access control', 'One-click document requests'],
    color: '#0D9488', gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)', bg: 'rgba(13,148,136,0.09)',
  },
  {
    id: 'candidates',
    icon: Users,
    title: 'Candidate Management',
    tag: 'Core',
    desc: 'Keep every candidate record in one organised hub. Manage profiles, documents, skills, and placement history — no spreadsheets needed.',
    points: ['Centralised candidate profiles', 'Skills & availability tracking', 'Placement history log', 'Custom candidate tags', 'Bulk candidate import'],
    color: '#1795C7', gradient: 'linear-gradient(135deg, #1795C7, #0EA5E9)', bg: 'rgba(23,149,199,0.09)',
  },
  {
    id: 'clientportal',
    icon: Buildings,
    title: 'Client Portal',
    tag: 'Self-Service',
    desc: 'Give your clients their own portal to view schedules, approve timesheets, and track invoices — reducing back-and-forth and saving your team hours every week.',
    points: ['Branded client login portal', 'Timesheet approval workflow', 'Invoice viewing & download', 'Shift schedule visibility', 'Direct messaging'],
    color: '#183765', gradient: 'linear-gradient(135deg, #183765, #1D4ED8)', bg: 'rgba(24,55,101,0.09)',
  },
  {
    id: 'workerportal',
    icon: UserCircle,
    title: 'Worker Portal',
    tag: 'Self-Service',
    desc: 'Workers can view schedules, submit availability, upload documents, and access payslips from a dedicated self-service portal.',
    points: ['Personal shift calendar', 'Availability submission', 'Document self-upload', 'Payslip access', 'Profile self-management'],
    color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F1, #818CF8)', bg: 'rgba(99,102,241,0.09)',
  },
  {
    id: 'payroll',
    icon: Coins,
    title: 'Payroll',
    tag: 'Automated',
    desc: 'Process payroll in minutes. Logezy calculates pay from approved timesheets, handles multiple pay rates, and exports directly to your payroll provider.',
    points: ['Timesheet-driven payroll', 'Multiple pay rates & uplifts', 'Holiday pay calculation', 'Payroll export (CSV/PDF)', 'PAYE & umbrella support'],
    color: '#B45309', gradient: 'linear-gradient(135deg, #B45309, #D97706)', bg: 'rgba(180,83,9,0.09)',
  },
  {
    id: 'availability',
    icon: ClipboardText,
    title: 'Availability',
    tag: 'Live',
    desc: 'Know exactly who is available and when. Workers submit availability via the app, giving you a live capacity view before you start scheduling.',
    points: ['Worker app availability submission', 'Real-time availability calendar', 'Recurring availability patterns', 'Availability conflict alerts', 'Shift preference management'],
    color: '#4F46E5', gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)', bg: 'rgba(79,70,229,0.09)',
  },
  {
    id: 'autoinvoicing',
    icon: Lightning,
    title: 'Auto-Processing',
    tag: 'New',
    desc: 'Let Logezy handle the entire post-shift process automatically — timesheet approval, invoice generation, and payroll calculation. Set it once and forget it.',
    points: ['End-to-end automation rules', 'Auto-approve trusted workers', 'Scheduled invoice dispatch', 'Automated payroll triggers', 'Rule-based exception handling'],
    color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)', bg: 'rgba(124,58,237,0.09)',
  },
  {
    id: 'analytics',
    icon: TrendUp,
    title: 'Analytics',
    tag: 'Data-Driven',
    desc: 'Revenue trends, fill rates, compliance scores, and worker performance — all visualised in one powerful analytics dashboard for deeper insight.',
    points: ['Revenue & margin tracking', 'Fill rate & vacancy analytics', 'Worker performance scores', 'Client profitability reports', 'Custom KPI dashboards'],
    color: '#0284C7', gradient: 'linear-gradient(135deg, #0284C7, #38BDF8)', bg: 'rgba(2,132,199,0.09)',
  },
];

/* ─────────────────────────────────────────────
   SECTION OVERLAY POPUP PANEL
───────────────────────────────────────────── */
function ExpandPanel({
  feature,
  onClose,
}: {
  feature: typeof features[0];
  onClose: () => void;
}) {
  const Icon = feature.icon;
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const panelVw = useWindowWidth();
  const panelMobile = panelVw < 640;

  return (
    <>
      {/* ── Dark overlay covering the whole section ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          background: 'rgba(8,14,32,0.62)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: panelMobile ? '16px' : '32px 40px',
        }}
      >
        {/* ── Large popup card — wider ── */}
        <motion.div
          key={feature.id}
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 1340,
            height: panelMobile ? '92vh' : '86vh',
            maxHeight: panelMobile ? '100vh' : 780,
            borderRadius: panelMobile ? 20 : 24,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: panelMobile ? 'column' : 'row',
            background: '#FFFFFF',
            boxShadow:
              '0 60px 140px rgba(0,0,0,0.42), ' +
              '0 24px 60px rgba(0,0,0,0.18), ' +
              '0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* ── LEFT PANEL — details ── */}
          <div style={{
            width: panelMobile ? '100%' : 440,
            flexShrink: 0,
            background: '#FFFFFF',
            borderRight: panelMobile ? 'none' : `1px solid ${feature.color}12`,
            borderBottom: panelMobile ? `1px solid ${feature.color}12` : 'none',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: panelMobile ? '28px 24px 20px' : '44px 44px 36px',
          }}>
            {/* Icon + tag row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{
                width: 58, height: 58, borderRadius: 17,
                background: feature.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 20px ${feature.color}22`,
              }}>
                <Icon weight="regular" style={{ width: 28, height: 28, color: feature.color }} />
              </div>
              <span style={{
                fontSize: 9.5, fontWeight: 800,
                letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                color: feature.color,
                background: feature.bg,
                padding: '4px 11px', borderRadius: 20,
                border: `1px solid ${feature.color}22`,
                marginTop: 4,
              }}>
                {feature.tag}
              </span>
            </div>

            <h2 style={{
              fontSize: 28, fontWeight: 900,
              color: '#0F172A', margin: '0 0 10px',
              letterSpacing: '-0.03em', lineHeight: 1.18,
            }}>
              {feature.title}
            </h2>

            <div style={{ height: 1, background: '#F1F5F9', margin: '4px 0 16px' }} />

            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.74, margin: '0 0 22px' }}>
              {feature.desc}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {feature.points.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, ease }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div style={{
                    width: 21, height: 21, borderRadius: '50%', flexShrink: 0,
                    background: feature.bg,
                    border: `1.5px solid ${feature.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle weight="regular" style={{ width: 11, height: 11, color: feature.color }} />
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: '#334155', lineHeight: 1.4 }}>{pt}</span>
                </motion.li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '12px 24px', borderRadius: 12,
                  fontSize: 13.5, fontWeight: 700,
                  color: '#FFFFFF',
                  background: feature.gradient,
                  boxShadow: `0 6px 22px ${feature.color}30`,
                  textDecoration: 'none',
                }}
              >
                Request Demo
                <ArrowRight weight="regular" style={{ width: 13, height: 13 }} />
              </Link>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 16px', borderRadius: 12,
                  fontSize: 13, fontWeight: 600,
                  background: 'transparent', border: 'none',
                  color: '#94A3B8', cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>

          {/* ── RIGHT PANEL — screenshot (hidden on mobile) ── */}
          {!panelMobile && <div style={{
            flex: 1,
            background: `linear-gradient(140deg, ${feature.bg} 0%, rgba(248,250,252,1) 55%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 28px 36px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Glow blob */}
            <div style={{
              position: 'absolute', top: '10%', left: '15%',
              width: '70%', height: '60%',
              background: `radial-gradient(ellipse, ${feature.color}18 0%, transparent 70%)`,
              filter: 'blur(44px)', pointerEvents: 'none',
            }} />

            {/* Close ✕ */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 420 }}
              style={{
                position: 'absolute', top: 18, right: 18, zIndex: 10,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748B',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
            >
              <X weight="regular" style={{ width: 14, height: 14 }} />
            </motion.button>

            {/* Perspective screenshot */}
            <div style={{ perspective: '1200px', perspectiveOrigin: '70% 50%', width: '100%', position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, rotateY: -28, rotateX: 8, x: 22 }}
                animate={{ opacity: 1, rotateY: -12, rotateX: 4, x: 0 }}
                transition={{ duration: 0.70, delay: 0.10, ease }}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.22), 0 14px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
                }}
              >
                {/* Browser chrome */}
                <div style={{
                  background: 'linear-gradient(180deg, #1C2333 0%, #171E2D 100%)',
                  padding: '9px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                      <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}90` }} />
                    ))}
                  </div>
                  <div style={{
                    flex: 1, height: 22, borderRadius: 5,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840', opacity: 0.9 }} />
                  </div>
                </div>
                <FeatureIllustration id={feature.id} color={feature.color} />
              </motion.div>
            </div>
          </div>}
        </motion.div>
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────── */
export default function Features() {
  const [selected, setSelected] = useState<typeof features[0] | null>(null);
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const vw = useWindowWidth();
  const isMobile = vw < 640;
  const isTablet = vw < 1024;

  function toggleFeature(f: typeof features[0]) {
    setSelected(prev => (prev?.id === f.id ? null : f));
  }

  return (
    <section
      id="features"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAFF 100%)',
        paddingTop: isMobile ? 56 : 96,
        paddingBottom: isMobile ? 56 : 88,
        position: 'relative',
      }}
    >
      {/* Top separator */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: '#EEF2F7' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : isTablet ? '0 24px' : '0 40px' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.58, ease }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 14px', borderRadius: 100, marginBottom: 18,
            background: '#F1F5F9', border: '1px solid #E2E8F0',
          }}>
            <Lightning weight="regular" style={{ width: 9, height: 9, color: '#5B6CF9' }} />
            <span style={{
              fontSize: 10.5, fontWeight: 700, color: '#64748B',
              letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>
              Platform Features
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 2.8vw, 3.1rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08,
            color: '#0F172A', margin: '0 0 14px',
          }}>
            Everything your agency needs{' '}
            <span style={{
              background: 'linear-gradient(120deg, #5B6CF9 10%, #2563EB 55%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline'}}>
              in one place.
            </span>
          </h2>

          <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.65, margin: '0 auto', maxWidth: 520 }}>
            18 powerful features built for UK temp staffing. Click any feature to explore.
          </p>
        </motion.div>

        {/* ── Feature grid ── */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.038 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          style={{ display: 'grid', gap: isMobile ? 8 : 10 }}
          className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {features.map(f => {
            const Icon = f.icon;
            const isSelected = selected?.id === f.id;
            return (
              <motion.button
                key={f.id}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease } },
                }}
                onClick={() => toggleFeature(f)}
                whileHover={{
                  y: -4,
                  boxShadow: `0 12px 36px ${f.color}18, 0 4px 14px rgba(0,0,0,0.07)`,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                style={{
                  background: isSelected ? f.bg : '#FFFFFF',
                  border: isSelected ? `1.5px solid ${f.color}48` : '1.5px solid #E8ECF4',
                  borderRadius: isMobile ? 14 : 18,
                  padding: isMobile ? '14px 10px 12px' : '20px 14px 18px',
                  cursor: 'pointer',
                  textAlign: 'left' as const,
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 10,
                  boxShadow: isSelected
                    ? `0 4px 20px ${f.color}18, 0 1px 3px rgba(15,23,42,0.06)`
                    : '0 1px 3px rgba(15,23,42,0.04)',
                  transition: 'background 0.18s, border-color 0.18s, box-shadow 0.18s',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{
                  width: isMobile ? 44 : 60, height: isMobile ? 44 : 60,
                  borderRadius: isMobile ? 12 : 17,
                  background: f.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isSelected ? `0 6px 18px ${f.color}28` : `0 4px 14px ${f.color}20`,
                }}>
                  <Icon weight="regular" style={{ width: isMobile ? 20 : 28, height: isMobile ? 20 : 28, color: f.color }} />
                </div>

                <span style={{
                  fontSize: isMobile ? 10 : 12, fontWeight: 700,
                  color: isSelected ? f.color : '#1E293B',
                  lineHeight: 1.3, letterSpacing: '-0.01em',
                  transition: 'color 0.18s',
                }}>
                  {f.title}
                </span>

                <span style={{
                  fontSize: isMobile ? 8 : 9, fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                }}>
                  {f.tag}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

          {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.50, delay: 0.15, ease }}
          style={{ marginTop: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/features"
              className="btn-primary inline-flex items-center gap-2"
              style={{ fontSize: 13.5, padding: '11px 24px', borderRadius: 12 }}
            >
              Explore all features
              <ArrowRight weight="regular" style={{ width: 13, height: 13 }} />
            </Link>
          </motion.div>
          <span style={{ fontSize: 12.5, color: '#94A3B8', fontWeight: 500 }}>
            Trusted by 600+ UK staffing agencies
          </span>
        </motion.div>
      </div>

      {/* ── Section-level overlay popup — anchored to section ── */}
      <AnimatePresence>
        {selected && (
          <ExpandPanel
            key={selected.id}
            feature={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
