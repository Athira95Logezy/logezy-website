import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, CalendarBlank, Clock, Bell, Shield,
  CheckCircle, Users, FileText, ChartBar, Envelope,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   BRAND
───────────────────────────────────────────── */
const NAVY = '#0C1835';
const BLUE = '#1795C7';

/* ─────────────────────────────────────────────
   CLIENT STRIP
───────────────────────────────────────────── */
const clients = [
  { src: '/medsolve.png',                  alt: 'Medsolve'              },
  { src: '/ansacare_logo.webp',            alt: 'Ansacare'              },
  { src: '/jayco_logo.png',               alt: 'Jayco'                 },
  { src: '/primcura_healthcare_logo.png',  alt: 'Primcura Healthcare'   },
  { src: '/Leadcare_logo.png',            alt: 'Leadcare'              },
  { src: '/annicare_uk.png',              alt: 'Annicare UK'           },
  { src: '/ocean_logo.png',               alt: 'Ocean'                 },
  { src: '/Staffnursing_logo.png',        alt: 'Staff Nursing'         },
];

function ClientLogoStrip() {
  const doubled = [...clients, ...clients];
  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '18px 0',
      overflow: 'hidden',
      position: 'relative',
      background: 'rgba(255,255,255,0.015)',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #07111F, transparent)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #07111F, transparent)' }} />
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: 48, whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((c, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            padding: '8px 18px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}>
            <img
              src={c.src}
              alt={c.alt}
              style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.65 }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RIGHT SIDE — LIVE OPERATIONS MOCKUP
───────────────────────────────────────────── */
const shifts = [
  { name: 'S. Mitchell', role: 'Registered Nurse',  time: '07:00 – 15:00', status: 'live',      statusColor: '#10B981', dot: '#10B981' },
  { name: 'J. Okafor',   role: 'Healthcare Asst',   time: '07:00 – 19:00', status: 'confirmed', statusColor: '#818CF8', dot: '#5B6CF9' },
  { name: 'P. Sharma',   role: 'Senior Nurse',       time: '15:00 – 23:00', status: 'confirmed', statusColor: '#818CF8', dot: '#5B6CF9' },
  { name: 'T. Edwards',  role: 'Support Worker',     time: '19:00 – 07:00', status: 'pending',   statusColor: '#F59E0B', dot: '#D97706' },
  { name: 'A. Collins',  role: 'Team Lead',          time: '08:00 – 16:00', status: 'live',      statusColor: '#10B981', dot: '#10B981' },
];

const metrics = [
  { label: 'Fill Rate',   value: '94%',  color: '#10B981', bg: '#10B98118' },
  { label: 'Compliance',  value: '98.7%', color: '#818CF8', bg: '#5B6CF918' },
  { label: 'Active Now',  value: '312',   color: '#38BDF8', bg: '#0EA5E918' },
];

function LiveOpsMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* ── Ambient glow ── */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', right: '-10%', bottom: '5%', background: 'radial-gradient(ellipse at 60% 40%, rgba(91,108,249,0.18) 0%, rgba(23,149,199,0.10) 40%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── MAIN CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Gradient border glow */}
        <div style={{ position: 'absolute', inset: -1.5, borderRadius: 22, background: 'linear-gradient(135deg,rgba(91,108,249,0.5),rgba(23,149,199,0.35),rgba(139,92,246,0.25))', filter: 'blur(3px)', zIndex: 0 }} />

        <div style={{
          position: 'relative', zIndex: 1,
          background: 'linear-gradient(160deg, rgba(15,23,48,0.96) 0%, rgba(10,18,40,0.98) 100%)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.30)',
        }}>

          {/* Card header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: 5 }}>
                {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }}
                />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Live Operations</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.30)', fontFamily: 'ui-monospace,monospace' }}>app.logezy.co.uk</span>
            </div>
          </div>

          {/* Week header */}
          <div style={{ padding: '12px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.85)' }}>Week 20 — Active Shifts</p>
              <p style={{ margin: '2px 0 0', fontSize: 10.5, color: 'rgba(255,255,255,0.30)' }}>Refreshed 2 minutes ago</p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['All','Live','Pending'].map((t, i) => (
                <div key={t} style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                  background: i === 0 ? 'rgba(91,108,249,0.25)' : 'rgba(255,255,255,0.05)',
                  color: i === 0 ? '#818CF8' : 'rgba(255,255,255,0.35)',
                  border: i === 0 ? '1px solid rgba(91,108,249,0.35)' : '1px solid rgba(255,255,255,0.07)',
                  cursor: 'default',
                }}>{t}</div>
              ))}
            </div>
          </div>

          {/* Shift rows */}
          <div style={{ padding: '0 12px 12px' }}>
            {shifts.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 10px', borderRadius: 12, marginBottom: 4,
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                  border: '1px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: `linear-gradient(135deg, ${s.dot}40, ${s.dot}20)`,
                  border: `1px solid ${s.dot}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: s.dot,
                }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Name + role */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.role}</p>
                </div>

                {/* Time */}
                <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.45)', flexShrink: 0, fontFamily: 'ui-monospace,monospace' }}>{s.time}</div>

                {/* Status badge */}
                <div style={{
                  padding: '3px 9px', borderRadius: 20, flexShrink: 0,
                  fontSize: 9.5, fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase' as const,
                  color: s.statusColor,
                  background: `${s.statusColor}18`,
                  border: `1px solid ${s.statusColor}35`,
                }}>{s.status}</div>
              </motion.div>
            ))}
          </div>

          {/* Bottom metrics bar */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 0 }}>
            {metrics.map(({ label, value, color, bg }, i) => (
              <div key={label} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                padding: '0 8px',
              }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 900, color, letterSpacing: '-0.02em' }}>{value}</p>
                <p style={{ margin: '3px 0 0', fontSize: 9.5, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── FLOATING: Notification card (top-right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: -18, right: -20, zIndex: 10 }}
      >
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 14,
            background: 'rgba(15,23,48,0.92)',
            border: '1px solid rgba(16,185,129,0.30)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 28px rgba(16,185,129,0.18), 0 2px 8px rgba(0,0,0,0.30)',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle weight="fill" style={{ width: 15, height: 15, color: '#fff' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.90)' }}>Shift Filled</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.40)' }}>ICU Night — 23:00 start</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── FLOATING: Invoice sent (bottom-left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', bottom: -18, left: -24, zIndex: 10 }}
      >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 14,
            background: 'rgba(15,23,48,0.92)',
            border: '1px solid rgba(91,108,249,0.30)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 28px rgba(91,108,249,0.18), 0 2px 8px rgba(0,0,0,0.30)',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#5B6CF9,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText weight="fill" style={{ width: 15, height: 15, color: '#fff' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.90)' }}>Invoice Auto-Sent</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.40)' }}>NHS Trust A · £4,280.00</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── FLOATING: Compliance alert (right-middle) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: '42%', right: -28, zIndex: 10 }}
      >
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 14,
            background: 'rgba(15,23,48,0.92)',
            border: '1px solid rgba(23,149,199,0.30)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 28px rgba(23,149,199,0.18), 0 2px 8px rgba(0,0,0,0.30)',
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#1795C7,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield weight="fill" style={{ width: 15, height: 15, color: '#fff' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.90)' }}>CQC Compliant</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.40)' }}>98.7% · All docs valid</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
  const it = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #07111F 0%, #0C1835 45%, #0B1528 100%)',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,108,249,0.14) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,149,199,0.12) 0%, transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
      }} />

      {/* Main layout */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 48px 56px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', alignItems: 'center', gap: 64 }}>

            {/* ══════════════ LEFT — COPY ══════════════ */}
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Badge */}
              <motion.div variants={it} style={{ marginBottom: 26 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '7px 14px 7px 8px', borderRadius: 100,
                  background: 'rgba(91,108,249,0.12)', border: '1px solid rgba(91,108,249,0.28)',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.01em' }}>
                    Trusted by <strong style={{ color: '#818CF8' }}>500+</strong> UK Staffing Agencies
                  </span>
                </div>
              </motion.div>

              {/* Headline — "The Engine Behind" locked to one line */}
              <motion.h1 variants={it} style={{
                margin: '0 0 20px', padding: 0,
                fontSize: 'clamp(1.75rem, 2.8vw, 3.2rem)',
                fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
              }}>
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)', whiteSpace: 'nowrap', marginBottom: 4 }}>
                  The Engine Behind
                </span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 55%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Every Great Temp Agency.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={it} style={{
                fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.46)',
                maxWidth: 400, margin: '0 0 32px', fontWeight: 400,
              }}>
                The all-in-one staffing platform top UK temp agencies rely on to manage workers, shifts, and compliance — effortlessly.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={it} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }} style={{ display: 'inline-flex' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 100,
                    fontSize: 14, fontWeight: 700, color: '#fff',
                    background: 'linear-gradient(135deg,#5B6CF9 0%,#1795C7 100%)',
                    boxShadow: '0 4px 22px rgba(91,108,249,0.42), 0 1px 0 rgba(255,255,255,0.12) inset',
                    textDecoration: 'none', letterSpacing: '-0.01em',
                  }}>
                    Start 10-day free trial
                    <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
                  </Link>
                </motion.span>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }} style={{ display: 'inline-flex' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 100,
                    fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.68)',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.13)',
                    textDecoration: 'none', backdropFilter: 'blur(8px)',
                  }}>
                    Book a demo
                  </Link>
                </motion.span>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={it} style={{ display: 'flex', gap: 0 }}>
                {[
                  { val: '500+', lbl: 'UK Agencies'  },
                  { val: '60%',  lbl: 'Less Admin'   },
                  { val: '3×',   lbl: 'Faster Fills' },
                ].map(({ val, lbl }, i) => (
                  <div key={lbl} style={{
                    paddingRight: i < 2 ? 24 : 0, marginRight: i < 2 ? 24 : 0,
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.09)' : 'none',
                  }}>
                    <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>{val}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.36)', margin: '3px 0 0', fontWeight: 500, letterSpacing: '0.02em' }}>{lbl}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ══════════════ RIGHT — LIVE OPS MOCKUP ══════════════ */}
            <div style={{ position: 'relative', height: 440, overflow: 'visible', padding: '28px 40px 28px 16px' }} className="hidden lg:block">
              <LiveOpsMockup />
            </div>

          </div>
        </div>
      </div>

      {/* Client strip */}
      <ClientLogoStrip />
    </section>
  );
}
