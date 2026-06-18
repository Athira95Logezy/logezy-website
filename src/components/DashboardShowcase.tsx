import React from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { motion } from 'framer-motion';
import {
  CalendarBlank, Shield, Clock, FileText,
  ArrowRight, CheckCircle, TrendUp,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: '600+',  label: 'UK Agencies'     },
  { value: '98.7%', label: 'Shift Fill Rate' },
  { value: '99.9%', label: 'Uptime'          },
  { value: '60s',   label: 'Avg. Fill Time'  },
] as const;

const FEATURES = [
  { icon: CalendarBlank, label: 'Smart Scheduling', color: '#38BDF8' },
  { icon: Shield,        label: 'Auto Compliance',  color: '#34D399' },
  { icon: Clock,         label: 'Timesheets',        color: '#A78BFA' },
  { icon: FileText,      label: 'Auto Invoicing',    color: '#FBBF24' },
] as const;

/* ── Floating metric card ── */
function MetricCard({
  icon: Icon, label, value, sub, color, posStyle, delay, floatY = 8, floatDur = 5,
}: {
  icon: React.ElementType; label: string; value: string; sub: string;
  color: string; posStyle: React.CSSProperties; delay: number;
  floatY?: number; floatDur?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{ position: 'absolute', ...posStyle, zIndex: 10 }}
    >
      <motion.div
        animate={{ y: [0, -floatY, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 }}
        style={{
          background: 'rgba(10,18,40,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${color}30`,
          borderRadius: 16,
          padding: '12px 16px',
          minWidth: 160,
          boxShadow: `0 8px 32px rgba(0,0,0,0.40), 0 0 0 1px ${color}18`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `${color}18`, border: `1px solid ${color}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon weight="fill" size={13} style={{ color }} />
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(186,230,255,0.50)' }}>{label}</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 10, fontWeight: 600, color }}>
          <TrendUp weight="bold" size={10} />{sub}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Approved badge ── */
function ApprovedBadge({ posStyle, delay }: { posStyle: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{ position: 'absolute', ...posStyle, zIndex: 10 }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 14,
          background: 'rgba(10,18,40,0.82)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(52,211,153,0.28)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.36)',
        }}
      >
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: 'rgba(52,211,153,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckCircle weight="fill" size={14} style={{ color: '#34D399' }} />
        </div>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Shift approved</div>
          <div style={{ fontSize: 9.5, color: 'rgba(186,230,255,0.40)', marginTop: 2 }}>NHS Ward B · 07:30</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Live pill ── */
function LivePill({ label, color, posStyle, delay }: {
  label: string; color: string; posStyle: React.CSSProperties; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      style={{ position: 'absolute', ...posStyle, zIndex: 10 }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '7px 14px', borderRadius: 100,
        background: 'rgba(10,18,40,0.82)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${color}28`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.30)',
      }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{label}</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   macOS BROWSER CHROME
───────────────────────────────────────────── */
function MacBrowser({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      borderRadius: '14px 14px 0 0',
      overflow: 'hidden',
      boxShadow: [
        '0 -6px 40px rgba(35,153,202,0.22)',
        '0 0 0 1.5px rgba(255,255,255,0.12)',
        '0 40px 100px rgba(0,0,0,0.60)',
      ].join(', '),
    }}>
      {/* Chrome bar */}
      <div style={{
        background: 'linear-gradient(180deg, #EAEAEA 0%, #DEDEDE 100%)',
        padding: '9px 14px 0',
        borderBottom: '1px solid #C8C8C8',
      }}>
        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {[{ c: '#FF5F57' }, { c: '#FEBC2E' }, { c: '#28C840' }].map(({ c }) => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, boxShadow: `inset 0 -1px 1px rgba(0,0,0,0.18)` }} />
            ))}
          </div>
          {/* Arrows */}
          <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
            {['â€¹', 'â€º'].map((ch, i) => (
              <div key={i} style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: i === 0 ? '#999' : '#CCC', fontWeight: 500 }}>{ch}</div>
            ))}
          </div>
          {/* URL bar */}
          <div style={{
            flex: 1, height: 26, borderRadius: 7,
            background: 'rgba(255,255,255,0.90)',
            border: '1px solid #C0C0C0',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
              <path d="M4 0C2.34 0 1 1.34 1 3C1 5.33 4 10 4 10C4 10 7 5.33 7 3C7 1.34 5.66 0 4 0Z" fill="#999"/>
            </svg>
            <span style={{ fontSize: 10, color: '#555', fontFamily: 'var(--font-body)' }}>app.logezy.com/schedule</span>
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {[
              <svg key="s" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
              <svg key="p" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
            ].map((icon, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
            ))}
          </div>
        </div>
        {/* Tab */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 14px 5px 10px',
            borderRadius: '8px 8px 0 0',
            background: '#fff',
            border: '1px solid #C8C8C8',
            borderBottom: '1px solid #fff',
            minWidth: 140,
          }}>
            <div style={{ width: 13, height: 13, borderRadius: 4, background: 'linear-gradient(135deg, #1966AA, #2399CA)', flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: '#333', whiteSpace: 'nowrap', flex: 1 }}>Logezy Schedule</span>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#777' }}>âœ•</div>
          </div>
          <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#aaa', paddingBottom: 2 }}>+</div>
        </div>
      </div>
      {/* Screenshot */}
      <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHONE FRAME
───────────────────────────────────────────── */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      borderRadius: 34,
      overflow: 'hidden',
      background: '#0A1228',
      border: '2px solid rgba(56,189,248,0.45)',
      boxShadow: [
        '0 0 0 5px rgba(56,189,248,0.10)',
        '0 0 52px rgba(56,189,248,0.28)',
        '0 32px 64px rgba(0,0,0,0.60)',
      ].join(', '),
      position: 'relative',
    }}>
      {/* Dynamic island */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, background: '#0A1228' }}>
        <div style={{ width: 88, height: 24, borderRadius: 12, background: '#000' }} />
      </div>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      {/* Live dot */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{
          position: 'absolute', top: 14, right: 14,
          width: 9, height: 9, borderRadius: '50%',
          background: '#34D399', boxShadow: '0 0 10px #34D399, 0 0 22px #34D39960', zIndex: 3,
        }}
      />
      {/* Home bar */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 14px', background: '#0A1228' }}>
        <div style={{ width: 100, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.22)' }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function DashboardShowcase() {
  const vw = useWindowWidth();
  const isMobile = vw < 768;
  return (
    <section style={{
      background: 'linear-gradient(160deg, #0A1228 0%, #0F1E45 45%, #1A3A6B 100%)',
      paddingTop: isMobile ? 56 : 100,
      paddingBottom: 0,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Radial glow top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 500,
        background: 'radial-gradient(ellipse, rgba(35,153,202,0.22) 0%, transparent 68%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 48px' }}>

        {/* ── CENTERED HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 100, marginBottom: 24,
            background: 'linear-gradient(135deg, rgba(35,153,202,0.22) 0%, rgba(99,102,241,0.22) 100%)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(10px)',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#38BDF8' }}
            />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#7DD3FC', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>
              Platform Showcase
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.048em', lineHeight: 1.06,
            margin: '0 0 18px',
          }}>
            The complete staffing platform
            <br />
            <span style={{
              color: '#7DD3FC', display: 'inline'}}>
              built for UK agencies.
            </span>
          </h2>

          <p style={{ fontSize: 16, color: 'rgba(186,230,255,0.62)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 32px' }}>
            Fill shifts instantly, stay compliant, and manage your entire workforce from scheduling to invoicing, in one platform.
          </p>

          {/* Stats strip */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 16, overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            maxWidth: '100%',
          }}>
            {STATS.map(({ value, label }, i) => (
              <div key={label} style={{
                padding: '16px 28px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>{value}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(186,230,255,0.45)', fontWeight: 500, marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── FEATURE PILLS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 52, flexWrap: 'wrap' }}
        >
          {FEATURES.map(({ icon: Icon, label, color }) => (
            <div key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 100,
              background: `${color}12`, border: `1px solid ${color}28`,
              backdropFilter: 'blur(8px)',
            }}>
              <Icon weight="fill" size={12} style={{ color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.80)' }}>{label}</span>
            </div>
          ))}
          {/* CTA buttons inline */}
          <a href="https://logezy.co/get-started" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '8px 20px', borderRadius: 100, textDecoration: 'none',
            background: 'linear-gradient(135deg, #2399CA 0%, #1966AA 100%)',
            color: '#fff', fontSize: 12.5, fontWeight: 700,
            boxShadow: '0 6px 22px rgba(35,153,202,0.45)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}>
            Book a Demo <ArrowRight weight="bold" size={12} />
          </a>
          <Link to="/features" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '8px 18px', borderRadius: 100, textDecoration: 'none',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            color: '#fff', fontSize: 12.5, fontWeight: 700,
          }}>
            Explore Features
          </Link>
        </motion.div>

        {/* ── PRODUCT VISUAL ── */}
        <motion.div
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.90, delay: 0.12, ease: EASE }}
          style={{ position: 'relative' }}
        >
          {/* Glow behind screens */}
          <div style={{
            position: 'absolute', top: -40, left: '10%', right: '10%', height: '50%',
            background: 'radial-gradient(ellipse, rgba(35,153,202,0.30) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          {/* ── Main browser frame ── */}
          <div style={{ position: 'relative' }}>
            <MacBrowser src="/schedule.png" alt="Logezy Schedule" />

            {/* ── Phone — overlaps left side ── */}
            <motion.div
              initial={{ opacity: 0, x: -32, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
              style={{
                position: 'absolute',
                left: -60, bottom: 0,
                width: 190,
                zIndex: 8,
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <PhoneFrame src="/Avilability.jpeg" alt="Availability" />
              </motion.div>
            </motion.div>

            {/* ── Floating cards ── */}

            {/* Shifts filled — top left */}
            <MetricCard
              icon={CalendarBlank}
              label="Shifts Filled Today"
              value="142"
              sub="+18% vs last week"
              color="#38BDF8"
              delay={0.55} floatY={7} floatDur={4.8}
              posStyle={{ top: -20, left: 140 }}
            />

            {/* Approved badge — top right */}
            <ApprovedBadge delay={0.65} posStyle={{ top: -18, right: 120 }} />

            {/* Compliance — right side mid */}
            <MetricCard
              icon={Shield}
              label="Compliance Score"
              value="98.4%"
              sub="All docs current"
              color="#34D399"
              delay={0.72} floatY={9} floatDur={5.4}
              posStyle={{ top: '38%', right: -20 }}
            />

            {/* Live pill — bottom right */}
            <LivePill
              label="600+ agencies live"
              color="#34D399"
              delay={0.80}
              posStyle={{ bottom: 40, right: 24 }}
            />
          </div>
        </motion.div>

      </div>

      {/* ── Bottom arch wave — hidden on mobile ── */}
      {!isMobile && (
        <div style={{ position: 'relative', zIndex: 2, lineHeight: 0, marginTop: -2 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: 80, display: 'block' }}>
            <path d="M0,68 C360,0 1080,0 1440,68 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      )}
    </section>
  );
}
