import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChartBar, Shield, CalendarBlank, Coins } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────
   FLOATING STAT WIDGETS
───────────────────────────────────────────── */
function StatWidget({ delay, style, children }: { delay: number; style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease }}
      style={{
        position: 'absolute',
        background: 'rgba(8, 14, 32, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: 16,
        boxShadow: '0 8px 40px rgba(0,0,0,0.55)',
        zIndex: 10,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD REVEAL SECTION
───────────────────────────────────────────── */
export default function DashboardReveal() {
  return (
    <section style={{
      background: '#020817',
      overflow: 'hidden',
      position: 'relative',
      padding: '72px 0 112px',
    }}>

      {/* ── Neon glow layers ── */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, rgba(6,182,212,0.08) 50%, transparent 75%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', width: '45%', height: '40%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: '10%', width: '45%', height: '40%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.70, ease }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 14px', borderRadius: 100, marginBottom: 20,
            background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.24)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#06B6D4', boxShadow: '0 0 6px #06B6D4' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#06B6D4', letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>
              Live Dashboard
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.10,
            color: 'rgba(255,255,255,0.95)', margin: '0 0 16px',
          }}>
            Your entire agency,{' '}
            <span style={{
              background: 'linear-gradient(120deg, #06B6D4 0%, #818CF8 50%, #C4B5FD 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              beautifully visualised.
            </span>
          </h2>

          <p style={{
            fontSize: 16, lineHeight: 1.72, color: 'rgba(255,255,255,0.40)',
            maxWidth: 520, margin: '0 auto 28px',
          }}>
            One real-time command centre for shifts, compliance, timesheets, and payroll — everything your agency needs, always up to date.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.20, duration: 0.55, ease }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 20 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', borderRadius: 12, textDecoration: 'none',
                background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
                color: '#fff', fontSize: 13.5, fontWeight: 700,
                boxShadow: '0 0 24px rgba(99,102,241,0.38)',
              }}>
                Get Started Free <ArrowRight weight="regular" style={{ width: 13, height: 13 }} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -1 }} transition={{ type: 'spring', stiffness: 380, damping: 20 }}>
              <Link to="/features" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 20px', borderRadius: 12, textDecoration: 'none',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.60)', fontSize: 13.5, fontWeight: 600,
              }}>
                Explore features
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Dashboard image block ── */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease }}
          style={{ position: 'relative' }}
        >
          {/* Glow rings behind image */}
          <div style={{
            position: 'absolute', inset: -60,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.10) 40%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Browser chrome + image container */}
          <div style={{
            position: 'relative', zIndex: 1,
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: [
              '0 0 0 1px rgba(99,102,241,0.18)',
              '0 40px 100px rgba(0,0,0,0.70)',
              '0 0 80px rgba(99,102,241,0.14)',
              '0 0 140px rgba(6,182,212,0.07)',
            ].join(', '),
          }}>

            {/* ── Chrome bar ── */}
            <div style={{
              background: 'rgba(4, 9, 24, 0.98)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {['#EF4444', '#FBBF24', '#22C55E'].map((c, i) => (
                  <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.85, boxShadow: `0 0 5px ${c}88` }} />
                ))}
              </div>
              {/* URL bar */}
              <div style={{
                flex: 1, height: 26, borderRadius: 6, maxWidth: 340,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', paddingLeft: 10, gap: 6,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', opacity: 0.8 }} />
              </div>
              {/* Tab strip hint */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, flexShrink: 0 }}>
                {['Schedule', 'Timesheets', 'Reports'].map(t => (
                  <span key={t} style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.22)', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* ── Dashboard screenshot ── */}
            <div style={{ position: 'relative' }}>
              {/* Subtle bottom fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
                background: 'linear-gradient(180deg, transparent 0%, rgba(2,8,23,0.75) 100%)',
                zIndex: 2, pointerEvents: 'none',
              }} />
              <img
                src="/dashboard.png"
                alt="Logezy Dashboard — full agency overview"
                style={{ width: '100%', display: 'block', maxHeight: '65vh', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>

          {/* ── Floating stat widget — top-left ── */}
          <StatWidget delay={0.55} style={{
            top: 56, left: -18,
            padding: '12px 16px',
            border: '1px solid rgba(99,102,241,0.28)',
            boxShadow: '0 8px 36px rgba(99,102,241,0.22), 0 0 0 1px rgba(99,102,241,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366F1, #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(99,102,241,0.40)' }}>
                <CalendarBlank weight="regular" style={{ width: 17, height: 17, color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: 'rgba(148,163,184,0.60)', letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 3 }}>Shifts This Week</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#F1F5F9', lineHeight: 1 }}>312</div>
              </div>
            </div>
            <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.06)', marginTop: 10, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: '0%' }} whileInView={{ width: '78%' }}
                viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #6366F1, #818CF8)', boxShadow: '0 0 8px rgba(99,102,241,0.55)' }}
              />
            </div>
          </StatWidget>

          {/* ── Floating stat widget — top-right ── */}
          <StatWidget delay={0.65} style={{
            top: 56, right: -18,
            padding: '12px 16px',
            border: '1px solid rgba(5,150,105,0.28)',
            boxShadow: '0 8px 36px rgba(5,150,105,0.18), 0 0 0 1px rgba(5,150,105,0.06)',
            minWidth: 160,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #059669, #34D399)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(52,211,153,0.35)' }}>
                <Shield weight="regular" style={{ width: 17, height: 17, color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: 'rgba(148,163,184,0.60)', letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 3 }}>Compliance</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#F1F5F9', lineHeight: 1 }}>98.4<span style={{ fontSize: 13, color: 'rgba(148,163,184,0.50)' }}>%</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D399' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#34D399' }}>Audit Ready</span>
            </div>
          </StatWidget>

          {/* ── Floating stat widget — bottom-left ── */}
          <StatWidget delay={0.75} style={{
            bottom: 48, left: -18,
            padding: '10px 16px',
            border: '1px solid rgba(6,182,212,0.25)',
            boxShadow: '0 6px 32px rgba(6,182,212,0.16)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #0891B2, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(6,182,212,0.35)' }}>
              <ChartBar weight="regular" style={{ width: 16, height: 16, color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.2 }}>£124,800</div>
              <div style={{ fontSize: 9.5, color: 'rgba(6,182,212,0.75)', fontWeight: 600, marginTop: 2 }}>Revenue This Month ↑12%</div>
            </div>
          </StatWidget>

          {/* ── Floating stat widget — bottom-right ── */}
          <StatWidget delay={0.80} style={{
            bottom: 48, right: -18,
            padding: '10px 16px',
            border: '1px solid rgba(217,119,6,0.25)',
            boxShadow: '0 6px 32px rgba(217,119,6,0.14)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #D97706, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(217,119,6,0.35)' }}>
              <Coins weight="regular" style={{ width: 16, height: 16, color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.2 }}>47 / 52</div>
              <div style={{ fontSize: 9.5, color: 'rgba(251,191,36,0.75)', fontWeight: 600, marginTop: 2 }}>Shifts Filled · 94% Rate</div>
            </div>
          </StatWidget>
        </motion.div>
      </div>

      {/* ── Bottom gradient transition to TrustedBy ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.20) 30%, rgba(6,182,212,0.16) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
