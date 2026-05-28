/**
 * IndustrySolutions.tsx — All Industries · Light Theme
 *
 * Layout
 * ──────
 * • Light background
 * • Section header
 * • 3-column cards — one per industry, all visible at once
 *   Each card has: coloured icon panel (large icon + small feature icons),
 *   headline, description, staggered bullet points, stat badge
 * • No screens / mockups
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Heartbeat, Briefcase, Users,
  Shield, Clock, CalendarBlank, FileText,
  Bell, CheckCircle, Buildings,
  MapPin, ChartBar, ArrowRight,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const industries = [
  {
    id: 'healthcare',
    icon: Heartbeat,
    label: 'Healthcare',
    color:      '#F43F5E',
    colorLight: '#FFF1F3',
    colorMid:   'rgba(244,63,94,0.12)',
    colorBorder:'rgba(244,63,94,0.20)',
    stat: '98%', statLabel: 'compliance rate',
    headline: 'Place the right healthcare staff exactly when needed',
    desc: "From nurses to support workers, Logezy gives healthcare agencies the scheduling, compliance, and workforce tools to place the right people at the right time.",
    points: [
      'NMC / HCPC registration tracking',
      'DBS & right-to-work automation',
      'Mandatory training reminders',
      'CQC-ready compliance logs',
      'GPS clock-in for lone workers',
    ],
    /* small feature icons around the central icon */
    featureIcons: [
      { icon: Shield,       label: 'Compliance' },
      { icon: Clock,        label: 'Scheduling' },
      { icon: FileText,     label: 'Timesheets' },
      { icon: MapPin,       label: 'GPS Clock-in' },
    ],
  },
  {
    id: 'hospitality',
    icon: Briefcase,
    label: 'Hospitality',
    color:      '#F59E0B',
    colorLight: '#FFFBEB',
    colorMid:   'rgba(245,158,11,0.11)',
    colorBorder:'rgba(245,158,11,0.22)',
    stat: '3×', statLabel: 'faster shift fill',
    headline: 'Keep every shift covered — even at the last minute',
    desc: 'Fill shifts during busy seasons, peak events, and last-minute rushes. Logezy makes temporary hospitality staffing faster, cleaner, and far less stressful.',
    points: [
      'Last-minute shift fill & alerts',
      'Multi-venue scheduling',
      'Digital timesheets on mobile',
      'Auto invoicing per client venue',
      'Seasonal demand forecasting',
    ],
    featureIcons: [
      { icon: CalendarBlank, label: 'Scheduling' },
      { icon: Bell,          label: 'Alerts' },
      { icon: FileText,      label: 'Invoices' },
      { icon: ChartBar,      label: 'Reports' },
    ],
  },
  {
    id: 'education',
    icon: Users,
    label: 'Education',
    color:      '#8B5CF6',
    colorLight: '#F5F3FF',
    colorMid:   'rgba(139,92,246,0.11)',
    colorBorder:'rgba(139,92,246,0.22)',
    stat: '60%', statLabel: 'faster bookings',
    headline: 'Supply the right staff without the paperwork headache',
    desc: 'Place teachers and support staff without the paperwork overhead. Logezy handles compliance tracking and shift management so your consultants can focus on placements.',
    points: [
      'Same-day teacher placements',
      'DBS & safeguarding checks',
      'School portal with live visibility',
      'AWR-compliant payroll',
      'Holiday & absence tracking',
    ],
    featureIcons: [
      { icon: Shield,        label: 'Safeguarding' },
      { icon: Clock,         label: 'Availability' },
      { icon: Bell,          label: 'Notifications' },
      { icon: CalendarBlank, label: 'Placements' },
    ],
  },
];

type Ind = typeof industries[0];


/* ─────────────────────────────────────────────
   ICON PANEL  — top of each card
───────────────────────────────────────────── */
function IconPanel({ ind }: { ind: Ind }) {
  return (
    <div style={{
      position: 'relative',
      background: `linear-gradient(145deg, ${ind.colorLight}, #ffffff)`,
      borderBottom: `1px solid ${ind.colorBorder}`,
      padding: '36px 28px 32px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      overflow: 'hidden',
    }}>

      {/* soft radial glow behind icon */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 200, height: 200,
        background: `radial-gradient(circle, ${ind.colorMid} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* central large icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={{
          width: 80, height: 80, borderRadius: 22,
          background: `linear-gradient(135deg, ${ind.color}22, ${ind.color}10)`,
          border: `2px solid ${ind.colorBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 28px ${ind.color}22`,
          position: 'relative', zIndex: 1, marginBottom: 20,
        }}
      >
        <ind.icon weight="regular" size={36} style={{ color: ind.color }} />
      </motion.div>

      {/* 4 small feature icon pills */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 8, width: '100%', position: 'relative', zIndex: 1,
      }}>
        {ind.featureIcons.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.38, ease: EASE }}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 10px', borderRadius: 9,
              background: '#ffffff',
              border: `1px solid ${ind.colorBorder}`,
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <Icon weight="regular" size={14} style={{ color: ind.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   INDUSTRY CARD
───────────────────────────────────────────── */
function IndustryCard({ ind, index }: { ind: Ind; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -6, boxShadow: `0 24px 64px ${ind.color}14, 0 8px 24px rgba(0,0,0,0.07)` }}
      style={{
        background: '#ffffff',
        borderRadius: 20,
        border: `1px solid ${ind.colorBorder}`,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* coloured top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${ind.color}, ${ind.color}80)` }} />

      {/* icon panel */}
      <IconPanel ind={ind} />

      {/* card body */}
      <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* industry badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px 4px 8px', borderRadius: 100, marginBottom: 16,
          background: ind.colorMid, border: `1px solid ${ind.colorBorder}`,
          width: 'fit-content',
        }}>
          <ind.icon weight="regular" size={12} style={{ color: ind.color }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: ind.color, letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>{ind.label}</span>
        </div>

        {/* headline */}
        <h3 style={{
          fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
          fontWeight: 800, color: '#0F172A',
          letterSpacing: '-0.03em', lineHeight: 1.25,
          marginBottom: 12,
        }}>{ind.headline}</h3>

        {/* description */}
        <p style={{
          fontSize: 14.5, lineHeight: 1.78, color: '#64748B',
          marginBottom: 22, flex: 1,
        }}>{ind.desc}</p>

        {/* bullets */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}
        >
          {ind.points.map(pt => (
            <motion.div
              key={pt}
              variants={{
                hidden: { opacity: 0, x: -10 },
                show:  { opacity: 1, x: 0, transition: { duration: 0.34, ease: EASE } },
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 9 }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: ind.colorMid,
                border: `1.5px solid ${ind.colorBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle weight="fill" size={11} style={{ color: ind.color }} />
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: '#475569' }}>{pt}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* footer: stat + CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 20, borderTop: `1px solid ${ind.colorBorder}`,
          gap: 12,
        }}>
          {/* stat */}
          <div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 900, color: ind.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{ind.stat}</p>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{ind.statLabel}</p>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 10,
              background: ind.colorMid,
              border: `1px solid ${ind.colorBorder}`,
              textDecoration: 'none',
              fontSize: 13, fontWeight: 700, color: ind.color,
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
          >
            Learn more
            <ArrowRight weight="bold" size={13} />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function IndustrySolutions() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 30%, #F8FAFF 70%, #FFFFFF 100%)',
      padding: '112px 48px 124px',
    }}>

      {/* ── subtle dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.05) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        maskImage:       'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)',
      }} />

      {/* ── ambient glow ── */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:900, height:600, background:'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 68%)', filter:'blur(80px)', zIndex:0, pointerEvents:'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1220, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          {/* badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px 5px 11px', borderRadius: 100,
            background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)',
            marginBottom: 22,
          }}>
            <Buildings weight="regular" size={13} style={{ color: '#6366F1' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#6366F1', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Industry Solutions</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.6rem)',
            fontWeight: 900, color: '#0F172A',
            letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: 18,
          }}>
            Built for the industries{' '}
            <span style={{
              background: 'linear-gradient(125deg, #F43F5E 0%, #F59E0B 48%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>that never slow down</span>
          </h2>

          <p style={{ fontSize: 17, color: '#64748B', maxWidth: 510, margin: '0 auto', lineHeight: 1.80 }}>
            Whether you staff hospitals, hotels, or schools — Logezy adapts to the speed and compliance demands of your sector.
          </p>
        </motion.div>

        {/* ── CARD GRID ── */}
        <div className="industry-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {industries.map((ind, i) => (
            <IndustryCard key={ind.id} ind={ind} index={i} />
          ))}
        </div>

      </div>

      {/* ── responsive ── */}
      <style>{`
        @media (max-width: 1024px) {
          .industry-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .industry-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </section>
  );
}
