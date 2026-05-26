import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, CalendarBlank, Clock, Bell, Shield, MapPin, ChartBar, Receipt, Users } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   BRAND COLOURS
───────────────────────────────────────────── */
const BG      = '#EFF8F3';          // Thalamus-style light sage
const NAVY    = '#0C2138';          // Logezy dark navy
const BLUE    = '#1795C7';          // Logezy brand blue
const MUTED   = 'rgba(12,33,56,0.50)';

/* ─────────────────────────────────────────────
   CLIENT LOGOS — scrolling marquee
───────────────────────────────────────────── */
const clients = [
  { abbr: 'BH', name: 'Barchester Healthcare' },
  { abbr: 'HC', name: 'HC-One'                },
  { abbr: 'CU', name: 'Care UK'               },
  { abbr: 'BP', name: 'Bupa Care Homes'       },
  { abbr: 'AH', name: 'Anchor Hanover'        },
  { abbr: 'PG', name: 'Priory Group'          },
  { abbr: 'FS', name: 'Four Seasons Health'   },
  { abbr: 'MC', name: 'Minster Care'          },
  { abbr: 'VC', name: 'Voyage Care'           },
  { abbr: 'MM', name: 'Maria Mallaband'       },
];

function ClientLogoStrip() {
  const doubled = [...clients, ...clients];
  return (
    <div style={{
      borderTop: '1px solid rgba(12,33,56,0.08)',
      padding: '14px 0',
      overflow: 'hidden',
      position: 'relative',
      background: BG,
    }}>
      {/* Left fade */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 10, pointerEvents: 'none', background: `linear-gradient(to right, ${BG}, transparent)` }} />
      {/* Right fade */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 10, pointerEvents: 'none', background: `linear-gradient(to left, ${BG}, transparent)` }} />

      {/* Scrolling row */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: 44, whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((c, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            {/* Mini logo mark */}
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: '0.05em',
              flexShrink: 0,
            }}>
              {c.abbr}
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(12,33,56,0.45)', letterSpacing: '0.01em' }}>
              {c.name}
            </span>
            {/* Separator dot */}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(12,33,56,0.15)', display: 'inline-block', marginLeft: 8, flexShrink: 0 }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────────── */
function PhoneMock() {
  return (
    <div style={{ position: 'relative', width: 172, height: 356 }}>

      {/* Gradient ring border — outermost */}
      <div style={{
        position: 'absolute', inset: -3, borderRadius: 46,
        background: 'linear-gradient(145deg, #5B6CF9, #1795C7, #8B5CF6)',
        zIndex: 0,
      }} />

      {/* White separation gap */}
      <div style={{
        position: 'absolute', inset: -1, borderRadius: 44,
        background: 'white',
        zIndex: 1,
      }} />

      {/* Ambient glow behind phone */}
      <div style={{
        position: 'absolute', inset: -20,
        borderRadius: 60,
        background: 'radial-gradient(ellipse, rgba(91,108,249,0.20) 0%, rgba(23,149,199,0.12) 50%, transparent 75%)',
        filter: 'blur(18px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Phone body */}
      <div style={{
        position: 'absolute', inset: 2,
        borderRadius: 42,
        border: '5px solid #19253C',
        overflow: 'hidden',
        background: '#0D1829',
        zIndex: 2,
        boxShadow: '0 32px 64px rgba(12,33,56,0.28), inset 0 0 0 1px rgba(255,255,255,0.07)',
      }}>
        {/* Left side buttons */}
        <div style={{ position: 'absolute', left: -7, top: 72,  width: 4, height: 26, borderRadius: '3px 0 0 3px', background: '#151F30' }} />
        <div style={{ position: 'absolute', left: -7, top: 106, width: 4, height: 42, borderRadius: '3px 0 0 3px', background: '#151F30' }} />
        <div style={{ position: 'absolute', left: -7, top: 156, width: 4, height: 42, borderRadius: '3px 0 0 3px', background: '#151F30' }} />
        {/* Right power button */}
        <div style={{ position: 'absolute', right: -7, top: 94,  width: 4, height: 54, borderRadius: '0 3px 3px 0', background: '#151F30' }} />

        {/* Notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 58, height: 20, borderRadius: '0 0 16px 16px',
          background: '#19253C', zIndex: 10,
        }} />

        {/* Screen — real screenshot */}
        <img
          src="/mobile_app_main_screen.jpeg"
          alt="Logezy Mobile App"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const it = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      style={{ background: BG, minHeight: '100vh', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Decorative concentric rings (behind dashboard) ── */}
      {[780, 1020, 1260].map((sz, i) => (
        <div key={sz} style={{
          position: 'absolute',
          right: `${-8 - i * 7}%`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: sz, height: sz,
          borderRadius: '50%',
          border: `${i === 0 ? 1.5 : 1}px ${i === 2 ? 'dashed' : 'solid'} rgba(23,149,199,${0.18 - i * 0.05})`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      ))}

      {/* ── Subtle radial light behind dashboard ── */}
      <div style={{
        position: 'absolute',
        right: '-5%', top: '10%',
        width: 900, height: 700,
        background: 'radial-gradient(ellipse at 70% 40%, rgba(23,149,199,0.09) 0%, transparent 65%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── MAIN LAYOUT ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 60px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', alignItems: 'center', gap: 48 }}>

            {/* ════════════════════
                LEFT — copy
            ════════════════════ */}
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Badge */}
              <motion.div variants={it} style={{ marginBottom: 28 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '6px 14px', borderRadius: 100,
                  background: 'rgba(23,149,199,0.09)',
                  border: '1px solid rgba(23,149,199,0.22)',
                }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: BLUE, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 600, color: BLUE, letterSpacing: '0.02em' }}>
                    Trusted by 500+ UK Staffing Agencies
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={it} style={{ margin: '0 0 22px', padding: 0, fontSize: 'clamp(2.6rem, 4.2vw, 5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.08 }}>
                <span style={{ display: 'block', color: NAVY }}>The Engine Behind</span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(125deg, #1795C7 0%, #5B6CF9 55%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 16px rgba(91,108,249,0.22))',
                }}>
                  Every Great Temp Agency.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={it} style={{ fontSize: 17, lineHeight: 1.68, color: MUTED, maxWidth: 430, margin: '0 0 36px' }}>
                The all-in-one staffing agency software that top temp recruitment agencies
                rely on to manage workers, shifts, and compliance — effortlessly.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={it} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
                {/* Primary — gradient pill */}
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  style={{ display: 'inline-flex' }}
                >
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '15px 32px', borderRadius: 100,
                      fontSize: 15, fontWeight: 700, color: '#fff',
                      background: 'linear-gradient(135deg, #5B6CF9 0%, #1795C7 100%)',
                      boxShadow: '0 4px 24px rgba(91,108,249,0.38)',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Start 10-day free trial
                  </Link>
                </motion.span>

                {/* Secondary — outline pill */}
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  style={{ display: 'inline-flex' }}
                >
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '15px 32px', borderRadius: 100,
                      fontSize: 15, fontWeight: 600,
                      color: NAVY,
                      background: 'transparent',
                      border: `2px solid rgba(12,33,56,0.22)`,
                      textDecoration: 'none',
                    }}
                  >
                    Book a demo
                  </Link>
                </motion.span>
              </motion.div>

              {/* Mini stats row */}
              <motion.div variants={it} style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                {[
                  { val: '500+', lbl: 'UK Agencies' },
                  { val: '60%',  lbl: 'Less Admin'  },
                  { val: '3×',   lbl: 'Faster Fills' },
                ].map(({ val, lbl }, i) => (
                  <div key={lbl} style={{
                    paddingRight: i < 2 ? 22 : 0,
                    marginRight: i < 2 ? 22 : 0,
                    borderRight: i < 2 ? '1px solid rgba(12,33,56,0.12)' : 'none',
                  }}>
                    <p style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: 0, letterSpacing: '-0.025em' }}>{val}</p>
                    <p style={{ fontSize: 11, color: MUTED, margin: '3px 0 0', fontWeight: 500 }}>{lbl}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ════════════════════
                RIGHT — angled dashboard + phone
            ════════════════════ */}
            <div style={{ position: 'relative', height: 600, overflow: 'visible' }} className="hidden lg:block">

              {/* ── Rich ambient glow bloom behind composition ── */}
              <div style={{
                position: 'absolute', top: '5%', left: '10%', right: '-25%', bottom: '5%',
                background: 'radial-gradient(ellipse at 60% 45%, rgba(91,108,249,0.13) 0%, rgba(23,149,199,0.10) 40%, transparent 70%)',
                filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
              }} />
              {/* Purple accent glow — top-right */}
              <div style={{
                position: 'absolute', top: '-5%', right: '-10%',
                width: 380, height: 380,
                background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)',
                filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
              }} />

              {/* ── FLOATING STAT CHIP — top right ── */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: 8, right: 24, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    padding: '9px 14px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.88)',
                    border: '1px solid rgba(91,108,249,0.22)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 28px rgba(91,108,249,0.14), 0 2px 8px rgba(12,33,56,0.08)',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M3 3h18v4H3zm0 7h18v4H3zm0 7h18v4H3z"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.1 }}>1,247</p>
                      <p style={{ fontSize: 10, color: MUTED, margin: '2px 0 0', lineHeight: 1 }}>Shifts today</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── FLOATING STAT CHIP — bottom left of dashboard ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', bottom: 80, right: 10, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    padding: '9px 14px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.88)',
                    border: '1px solid rgba(23,149,199,0.22)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 28px rgba(23,149,199,0.14), 0 2px 8px rgba(12,33,56,0.08)',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#1795C7,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.1 }}>98.4%</p>
                      <p style={{ fontSize: 10, color: MUTED, margin: '2px 0 0', lineHeight: 1 }}>Compliance rate</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── FLOATING FEATURE ICON BADGES ── */}

              {/* Scheduling — top left of right column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: 52, left: 10, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(91,108,249,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(91,108,249,0.12)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#5B6CF9,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CalendarBlank weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    Scheduling
                  </div>
                </motion.div>
              </motion.div>

              {/* Timesheets — below phone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', bottom: 130, left: 20, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(217,119,6,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(217,119,6,0.10)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#D97706,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    Timesheets
                  </div>
                </motion.div>
              </motion.div>

              {/* Notifications — middle-right area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: '38%', right: -8, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(239,68,68,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(239,68,68,0.10)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#EF4444,#F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bell weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    Notifications
                  </div>
                </motion.div>
              </motion.div>

              {/* GPS Clock-In — bottom-center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', bottom: 40, left: '30%', zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(5,150,105,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(5,150,105,0.10)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    GPS Clock-In
                  </div>
                </motion.div>
              </motion.div>

              {/* Reports — top centre-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: '14%', left: '42%', zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(8,145,178,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(8,145,178,0.10)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#0891B2,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ChartBar weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    Reports
                  </div>
                </motion.div>
              </motion.div>

              {/* Invoicing — near bottom-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', bottom: 140, right: 20, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(219,39,119,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(219,39,119,0.10)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#DB2777,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Receipt weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    Invoicing
                  </div>
                </motion.div>
              </motion.div>

              {/* Compliance — left mid-high */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: '26%', left: 6, zIndex: 20 }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 30,
                    background: 'rgba(255,255,255,0.90)',
                    border: '1px solid rgba(124,58,237,0.18)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 4px 18px rgba(124,58,237,0.10)',
                    fontSize: 11, fontWeight: 700, color: NAVY,
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(135deg,#7C3AED,#A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Shield weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                    </div>
                    Compliance
                  </div>
                </motion.div>
              </motion.div>

              {/* ── DASHBOARD — back layer, extends right ── */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: 20, left: 80, right: -180, zIndex: 2 }}
              >
                <motion.div
                  style={{ y: dashboardY }}
                  animate={{ translateY: [0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* 3-D tilt */}
                  <div style={{
                    transform: 'perspective(1400px) rotateX(5deg) rotateY(-20deg) rotateZ(1.5deg)',
                    transformOrigin: 'center center',
                    transformStyle: 'preserve-3d',
                  }}>
                    {/* Gradient glow ring around dashboard */}
                    <div style={{
                      position: 'absolute', inset: -3, borderRadius: 24,
                      background: 'linear-gradient(135deg, rgba(91,108,249,0.5), rgba(23,149,199,0.4), rgba(139,92,246,0.3))',
                      filter: 'blur(6px)',
                      zIndex: -1,
                    }} />
                    {/* Outer white "tablet" border */}
                    <div style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      border: '8px solid rgba(255,255,255,0.96)',
                      boxShadow: '0 0 0 1.5px rgba(91,108,249,0.25), 0 0 50px rgba(91,108,249,0.15), 0 30px 80px rgba(12,33,56,0.22), 0 8px 24px rgba(12,33,56,0.10)',
                    }}>
                      {/* Light browser chrome */}
                      <div style={{
                        background: '#F2F2F2',
                        borderBottom: '1px solid #E0E0E0',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                          ))}
                        </div>
                        <div style={{
                          flex: 1,
                          background: '#fff',
                          border: '1px solid #E0E0E0',
                          borderRadius: 7,
                          padding: '4px 12px',
                          fontSize: 11,
                          color: '#999',
                          fontFamily: 'ui-monospace, monospace',
                          letterSpacing: '0.01em',
                        }}>
                          app.logezy.co.uk/dashboard
                        </div>
                      </div>

                      {/* Dashboard screenshot */}
                      <img
                        src="/DASHBAORD_NEW.png"
                        alt="Logezy Dashboard"
                        style={{ width: '100%', display: 'block' }}
                      />
                    </div>

                    {/* Screen glow reflection underneath */}
                    <div style={{
                      position: 'absolute',
                      bottom: -40, left: '10%', right: '10%',
                      height: 40,
                      background: 'rgba(23,149,199,0.12)',
                      filter: 'blur(24px)',
                      borderRadius: '50%',
                      zIndex: -1,
                    }} />
                  </div>
                </motion.div>
              </motion.div>

              {/* ── PHONE — foreground, left side, vertically centred ── */}
              <motion.div
                initial={{ opacity: 0, x: -28, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: '50%', left: -10, transform: 'translateY(-50%)', zIndex: 12 }}
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  style={{
                    transform: 'perspective(1000px) rotateY(-10deg) rotateX(4deg)',
                    transformStyle: 'preserve-3d',
                    filter: 'drop-shadow(0 32px 48px rgba(91,108,249,0.20)) drop-shadow(0 8px 20px rgba(12,33,56,0.18))',
                  }}
                >
                  <PhoneMock />
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* ── CLIENT LOGOS STRIP ── */}
      <ClientLogoStrip />
    </section>
  );
}
