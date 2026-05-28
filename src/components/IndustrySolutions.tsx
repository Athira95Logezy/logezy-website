/**
 * IndustrySolutions.tsx — Industry Showcase
 *
 * Design
 * ──────
 * • Dark navy section
 * • 3 vertical tab pills (left) — icon + label + stat, coloured left-border when active
 * • Animated background glow blob that morphs colour on tab switch
 * • Content panel (right): headline → desc → staggered bullets → CTA
 * • Browser mockup with floating stat badge + soft glow halo
 * • All transitions via AnimatePresence / framer-motion
 */

import React, { useState } from 'react';
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion';
import {
  Heartbeat, Briefcase, Users,
  CheckCircle, ArrowRight, Buildings,
  ArrowUpRight,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const industries = [
  {
    id: 'healthcare', icon: Heartbeat, label: 'Healthcare',
    color:    '#F43F5E',
    colorBg:  'rgba(244,63,94,0.13)',
    colorRing:'rgba(244,63,94,0.28)',
    colorGlow:'rgba(244,63,94,0.16)',
    stat: '98%', statLabel: 'compliance rate',
    headline: 'Place the right healthcare staff exactly when needed',
    desc: "From nurses to support workers, Logezy gives healthcare staffing agencies the scheduling, compliance, and workforce management tools to place the right people exactly when they're needed.",
    points: [
      'NMC / HCPC registration tracking',
      'DBS & right-to-work automation',
      'Mandatory training reminders',
      'CQC-ready compliance logs',
      'GPS clock-in for lone workers',
    ],
    image: '/DASHBAORD_NEW.png',
  },
  {
    id: 'hospitality', icon: Briefcase, label: 'Hospitality',
    color:    '#F59E0B',
    colorBg:  'rgba(245,158,11,0.12)',
    colorRing:'rgba(245,158,11,0.28)',
    colorGlow:'rgba(245,158,11,0.15)',
    stat: '3×', statLabel: 'faster shift fill',
    headline: 'Keep every shift covered — even at the last minute',
    desc: 'Keep every shift covered during busy seasons, peak events, and last-minute rushes. Logezy makes temporary staffing in hospitality faster, cleaner, and far less stressful.',
    points: [
      'Last-minute shift fill & alerts',
      'Multi-venue scheduling',
      'Digital timesheets on mobile',
      'Auto invoicing per client venue',
      'Seasonal demand forecasting',
    ],
    image: '/schedule.png',
  },
  {
    id: 'education', icon: Users, label: 'Education',
    color:    '#8B5CF6',
    colorBg:  'rgba(139,92,246,0.12)',
    colorRing:'rgba(139,92,246,0.28)',
    colorGlow:'rgba(139,92,246,0.16)',
    stat: '60%', statLabel: 'faster bookings',
    headline: 'Supply the right staff without the paperwork headache',
    desc: 'Place the right teachers and support staff without the paperwork headache. Logezy handles compliance tracking and shift management so your consultants can focus on what they do best.',
    points: [
      'Same-day teacher placements',
      'DBS & safeguarding checks',
      'School portal with live visibility',
      'AWR-compliant payroll',
      'Holiday & absence tracking',
    ],
    image: '/reports.png',
  },
];

type Industry = typeof industries[0];


/* ─────────────────────────────────────────────
   TAB PILL  (left column)
───────────────────────────────────────────── */
function TabPill({ ind, active, onClick }: { ind: Industry; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: active ? 0 : 4 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '15px 18px', borderRadius: 14,
        background: active ? ind.colorBg : 'rgba(255,255,255,0.03)',
        border: `1px solid ${active ? ind.colorRing : 'rgba(255,255,255,0.07)'}`,
        borderLeft: `${active ? 3 : 1}px solid ${active ? ind.color : 'rgba(255,255,255,0.07)'}`,
        cursor: 'pointer', textAlign: 'left', width: '100%',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* shimmer on active */}
      {active && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 0.06, 0] }}
          transition={{ duration: 1.4, delay: 0.1, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(90deg, transparent, ${ind.color}, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: active ? `${ind.color}1C` : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${active ? ind.colorRing : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.25s',
      }}>
        <ind.icon
          weight="regular" size={20}
          style={{ color: active ? ind.color : 'rgba(148,163,184,0.55)', transition: 'color 0.25s' }}
        />
      </div>

      {/* label + stat */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0, fontSize: 14, fontWeight: 700,
          color: active ? '#F1F5F9' : 'rgba(148,163,184,0.55)',
          transition: 'color 0.25s',
        }}>{ind.label}</p>
        <p style={{
          margin: '3px 0 0', fontSize: 11, fontWeight: 700,
          color: active ? ind.color : 'rgba(100,116,139,0.5)',
          transition: 'color 0.25s',
        }}>{ind.stat} {ind.statLabel}</p>
      </div>

      {/* arrow */}
      <motion.div
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : -6 }}
        transition={{ duration: 0.22 }}
        style={{ flexShrink: 0 }}
      >
        <ArrowRight weight="bold" size={14} style={{ color: ind.color }} />
      </motion.div>
    </motion.button>
  );
}


/* ─────────────────────────────────────────────
   CONTENT PANEL  (right column, animated)
───────────────────────────────────────────── */
function ContentPanel({ ind }: { ind: Industry }) {
  return (
    <motion.div
      key={ind.id}
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      {/* industry pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '5px 14px 5px 10px', borderRadius: 100, marginBottom: 22,
        background: ind.colorBg, border: `1px solid ${ind.colorRing}`,
        width: 'fit-content',
      }}>
        <ind.icon weight="regular" size={13} style={{ color: ind.color }} />
        <span style={{ fontSize: 10.5, fontWeight: 800, color: ind.color, letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>
          {ind.label}
        </span>
      </div>

      {/* headline */}
      <h3 style={{
        fontSize: 'clamp(1.6rem, 2.8vw, 2.35rem)',
        fontWeight: 900, color: '#F1F5F9',
        letterSpacing: '-0.04em', lineHeight: 1.10,
        marginBottom: 18,
      }}>{ind.headline}</h3>

      {/* desc */}
      <p style={{
        fontSize: 16, lineHeight: 1.80,
        color: 'rgba(165,210,255,0.58)',
        marginBottom: 32, maxWidth: 480,
      }}>{ind.desc}</p>

      {/* bullets — staggered */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 36 }}
      >
        {ind.points.map(pt => (
          <motion.div
            key={pt}
            variants={{
              hidden: { opacity: 0, x: -14 },
              show:  { opacity: 1, x: 0, transition: { duration: 0.38, ease: EASE } },
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 11 }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: `${ind.color}18`,
              border: `1.5px solid ${ind.colorRing}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircle weight="fill" size={12} style={{ color: ind.color }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(226,232,240,0.78)' }}>{pt}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <Link
          to="/contact"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 26px', borderRadius: 12, textDecoration: 'none',
            background: `linear-gradient(135deg, ${ind.color} 0%, ${ind.color}CC 100%)`,
            color: '#fff', fontSize: 14, fontWeight: 700,
            boxShadow: `0 8px 28px ${ind.color}38, 0 2px 8px rgba(0,0,0,0.20)`,
          }}
        >
          See {ind.label} demo
          <ArrowUpRight weight="bold" size={14} />
        </Link>

        {/* stat badge */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          paddingLeft: 20,
          borderLeft: `2px solid ${ind.colorRing}`,
        }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: ind.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{ind.stat}</span>
          <span style={{ fontSize: 11.5, color: 'rgba(148,163,184,0.60)', fontWeight: 500, marginTop: 3 }}>{ind.statLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   SCREENSHOT PANEL  (right, below grid)
───────────────────────────────────────────── */
function ScreenPanel({ ind }: { ind: Industry }) {
  return (
    <motion.div
      key={ind.id}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.52, ease: EASE }}
      style={{ position: 'relative' }}
    >
      {/* glow halo behind screen */}
      <div style={{
        position: 'absolute', top: -40, left: '10%', right: '10%',
        height: 100,
        background: `radial-gradient(ellipse, ${ind.colorGlow} 0%, transparent 70%)`,
        filter: 'blur(32px)',
        pointerEvents: 'none', zIndex: 0,
        transition: 'background 0.5s',
      }} />

      {/* browser frame */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${ind.colorRing}`,
        boxShadow: [
          `0 40px 100px rgba(0,0,0,0.55)`,
          `0 12px 36px rgba(0,0,0,0.35)`,
          `0 0 0 1px rgba(255,255,255,0.06)`,
          `0 0 60px ${ind.colorGlow}`,
        ].join(', '),
      }}>
        {/* chrome bar */}
        <div style={{
          background: '#0D1526',
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 7,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}>
          {['#F87171','#FBBF24','#34D399'].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0 }} />
          ))}
          <div style={{
            flex: 1, marginLeft: 8, height: 20,
            background: '#1A2540', borderRadius: 6,
          }} />
        </div>

        {/* screenshot */}
        <img
          src={ind.image}
          alt={`Logezy ${ind.label}`}
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* floating stat chip — top-right overlap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 380, damping: 22 }}
        style={{
          position: 'absolute', top: 28, right: -18, zIndex: 4,
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '10px 16px', borderRadius: 12,
          background: 'rgba(8,14,28,0.90)',
          border: `1px solid ${ind.colorRing}`,
          backdropFilter: 'blur(12px)',
          boxShadow: `0 8px 24px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: ind.colorBg,
          border: `1px solid ${ind.colorRing}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <ind.icon weight="regular" size={16} style={{ color: ind.color }} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: ind.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{ind.stat}</p>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(148,163,184,0.65)', fontWeight: 500 }}>{ind.statLabel}</p>
        </div>
      </motion.div>

      {/* floating LIVE pill — bottom-left overlap */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.4, ease: EASE }}
        style={{
          position: 'absolute', bottom: 28, left: -16, zIndex: 4,
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '8px 14px', borderRadius: 100,
          background: 'rgba(8,14,28,0.90)',
          border: '1px solid rgba(52,211,153,0.30)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.2, 1], scale: [1, 0.7, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', flexShrink: 0 }}
        />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#34D399' }}>Live platform</span>
      </motion.div>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function IndustrySolutions() {
  const [active, setActive] = useState('healthcare');
  const current = industries.find(i => i.id === active)!;

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #060C1C 0%, #0B1530 50%, #060C1C 100%)',
      padding: '116px 48px 128px',
    }}>

      {/* ── dynamic colour glow (changes with tab) ── */}
      <AnimatePresence>
        <motion.div
          key={active + '-glow'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            position: 'absolute', top: '15%', right: '-8%',
            width: 800, height: 800,
            background: `radial-gradient(circle, ${current.colorGlow} 0%, transparent 62%)`,
            filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none',
          }}
        />
      </AnimatePresence>

      {/* ── dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage:       'radial-gradient(ellipse 85% 65% at 50% 35%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black, transparent)',
      }} />

      {/* ── ambient left blob ── */}
      <div style={{ position:'absolute', bottom:'10%', left:'-5%', width:560, height:480, background:'radial-gradient(ellipse, rgba(23,149,199,0.07) 0%, transparent 70%)', filter:'blur(80px)', zIndex:0, pointerEvents:'none' }} />

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px 5px 11px', borderRadius: 100,
            background: 'rgba(23,149,199,0.10)', border: '1px solid rgba(23,149,199,0.24)',
            marginBottom: 22,
          }}>
            <Buildings weight="regular" size={13} style={{ color: '#38BDF8' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#38BDF8', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Industry Solutions</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
            fontWeight: 900, color: '#F1F5F9',
            letterSpacing: '-0.046em', lineHeight: 1.07, marginBottom: 18,
          }}>
            Built for the industries{' '}
            <span style={{
              background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 55%, #34D399 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>that never slow down</span>
          </h2>

          <p style={{ fontSize: 17, color: 'rgba(165,210,255,0.58)', maxWidth: 500, margin: '0 auto', lineHeight: 1.80 }}>
            Whether you staff hospitals, hotels, or schools — Logezy adapts to the speed and compliance demands of your sector.
          </p>
        </motion.div>

        {/* ── MAIN GRID: tabs (left) + content+screen (right) ── */}
        <div className="industry-grid" style={{ display: 'grid', gridTemplateColumns: '272px 1fr', gap: 56, alignItems: 'start' }}>

          {/* LEFT: tab pills */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'sticky', top: 120 }}
          >
            {industries.map(ind => (
              <TabPill key={ind.id} ind={ind} active={active === ind.id} onClick={() => setActive(ind.id)} />
            ))}

            {/* subtle divider + all-industries link */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <Link
                to="/contact"
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontSize: 12.5, fontWeight: 600,
                  color: 'rgba(148,163,184,0.50)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                <ArrowUpRight size={13} />
                View all industries
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: content panel + screenshot stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* content text */}
            <AnimatePresence mode="wait">
              <ContentPanel key={active + '-content'} ind={current} />
            </AnimatePresence>

            {/* screenshot */}
            <AnimatePresence mode="wait">
              <ScreenPanel key={active + '-screen'} ind={current} />
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* ── responsive ── */}
      <style>{`
        @media (max-width: 960px) {
          .industry-grid {
            grid-template-columns: 1fr !important;
          }
          .industry-grid > div:first-child {
            position: static !important;
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 8px !important;
          }
        }
        @media (max-width: 600px) {
          .industry-grid > div:first-child button {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>

    </section>
  );
}
