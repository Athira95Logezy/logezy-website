/**
 * MobileAppFeatures.tsx — Alternating editorial feature rows · Light theme
 *
 * No card boxes. Six features laid out as clean horizontal rows that
 * alternate text-left / animation-right and vice-versa.
 * Animations float freely on the light background — no wrapping shells.
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CalendarBlank, Clock, Shield, FileText, Bell, ChatCircle,
  CheckCircle, MapPin,
} from '@phosphor-icons/react';

const EASE = [0.22, 1, 0.36, 1] as const;


/* ════════════════════════════════════════════════
   ANIMATION 1 — SHIFT MANAGEMENT
════════════════════════════════════════════════ */
function ShiftAnim() {
  const shifts = [
    { init: 'SK', color: '#6366F1', bg: '#EEF2FF', name: 'Sarah Kent',   time: '08:00 – 16:00', unit: 'Ward 4A' },
    { init: 'JM', color: '#10B981', bg: '#ECFDF5', name: 'James Murray', time: '14:00 – 22:00', unit: 'A&E'    },
    { init: 'EP', color: '#F59E0B', bg: '#FFFBEB', name: 'Emma Pearson', time: '22:00 – 08:00', unit: 'ICU'    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {shifts.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-30px' }}
          transition={{ delay: i * 0.18 + 0.2, duration: 0.5, ease: EASE }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 11px', borderRadius: 11,
            background: '#FFFFFF', border: '1px solid #EEF2FF',
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.init}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{s.name}</p>
            <p style={{ margin: 0, fontSize: 9.5, color: '#94A3B8' }}>{s.time} · {s.unit}</p>
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.18 + 0.65, type: 'spring', stiffness: 480, damping: 20 }}
            style={{ fontSize: 8.5, fontWeight: 800, padding: '2px 8px', borderRadius: 6, background: '#DCFCE7', color: '#16A34A' }}
          >✓ Confirmed</motion.div>
        </motion.div>
      ))}
    </div>
  );
}


/* ════════════════════════════════════════════════
   ANIMATION 2 — AVAILABILITY
════════════════════════════════════════════════ */
function AvailabilityAnim() {
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' });
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick(t => t + 1), 900);
    return () => clearInterval(id);
  }, [inView]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const patterns = [
    [true, false, true, true, false, true, false],
    [true, true, true, false, true, false, true],
    [false, true, true, true, true, false, true],
  ];
  const current = patterns[tick % 3];
  const count = current.filter(Boolean).length;
  return (
    <div ref={ref}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5, marginBottom: 12 }}>
        {days.map((d, i) => (
          <div key={d} style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: 9, fontWeight: 600, color: '#94A3B8' }}>{d}</p>
            <motion.div
              animate={{ background: current[i] ? '#6366F1' : '#F1F5F9', scale: current[i] ? 1.08 : 1 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              style={{ height: 26, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {current[i] && (
                <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} style={{ fontSize: 9.5, color: '#fff', fontWeight: 800 }}>✓</motion.span>
              )}
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 9, background: '#ECFDF5', border: '1px solid #A7F3D0' }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B98180' }} />
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#065F46' }}>
          <motion.span key={count} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>{count} days</motion.span>{' '}available — staff matched
        </span>
      </motion.div>
    </div>
  );
}


/* ════════════════════════════════════════════════
   ANIMATION 3 — COMPLIANCE
════════════════════════════════════════════════ */
function ComplianceAnim() {
  const docs = [
    { label: 'DBS Check',      exp: '12 Mar 2026' },
    { label: 'NMC Pin',        exp: '08 Nov 2025' },
    { label: 'Right to Work',  exp: '—'           },
    { label: 'Hep B Immunity', exp: '22 Jun 2026' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {docs.map((d, i) => (
        <motion.div
          key={d.label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ delay: i * 0.14 + 0.1, duration: 0.42, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 11px', borderRadius: 9, background: '#FFFFFF', border: '1px solid #EDE9FE' }}
        >
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: i * 0.14 + 0.38, type: 'spring', stiffness: 500, damping: 22 }}>
            <CheckCircle weight="regular" size={15} style={{ color: '#8B5CF6', flexShrink: 0 }} />
          </motion.div>
          <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: '#1E293B' }}>{d.label}</span>
          <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: '#F5F3FF', color: '#8B5CF6' }}>Valid</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.80, type: 'spring', stiffness: 300, damping: 24 }}
        style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4, padding: '7px 12px', borderRadius: 9, background: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)', border: '1px solid #DDD6FE' }}
      >
        <Shield weight="regular" size={13} style={{ color: '#7C3AED' }} />
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#5B21B6' }}>100% compliant · Audit-ready</span>
      </motion.div>
    </div>
  );
}


/* ════════════════════════════════════════════════
   ANIMATION 4 — DIGITAL TIMESHEETS
════════════════════════════════════════════════ */
function TimesheetAnim() {
  const [phase, setPhase] = useState<'idle' | 'clocked' | 'done'>('idle');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' });
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!inView) { setPhase('idle'); setSecs(0); return; }
    const t1 = setTimeout(() => setPhase('clocked'), 600);
    let id: ReturnType<typeof setInterval>;
    const t2 = setTimeout(() => {
      id = setInterval(() => setSecs(s => { if (s >= 28) { clearInterval(id); setPhase('done'); return s; } return s + 1; }), 120);
    }, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(id); };
  }, [inView]);
  const hh = '08';
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <div ref={ref}>
      <motion.div animate={{ opacity: phase !== 'idle' ? 1 : 0.35, y: phase !== 'idle' ? 0 : 4 }} transition={{ duration: 0.4, ease: EASE }}
        style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 12px', borderRadius: 10, background: '#FFFBEB', border: '1px solid #FDE68A', marginBottom: 8 }}>
        <MapPin weight="regular" size={14} style={{ color: '#D97706', flexShrink: 0 }} />
        <div>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#92400E' }}>GPS Verified · Mora Care, London</p>
          <p style={{ margin: 0, fontSize: 9, color: '#B45309' }}>Accurate to 12m</p>
        </div>
      </motion.div>
      <motion.div animate={{ opacity: phase !== 'idle' ? 1 : 0.3 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: phase === 'done' ? '#ECFDF5' : '#F8FAFF', border: `1px solid ${phase === 'done' ? '#A7F3D0' : '#E2E8F0'}`, marginBottom: 8, transition: 'background 0.4s, border-color 0.4s' }}>
        <div>
          <p style={{ margin: 0, fontSize: 9.5, color: '#94A3B8', fontWeight: 600 }}>CLOCKED IN</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.04em', fontFamily: 'monospace' }}>{hh}:{mm}:{ss}</p>
        </div>
        <AnimatePresence mode="wait">
          {phase === 'done' ? (
            <motion.div key="done" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              style={{ padding: '5px 12px', borderRadius: 8, background: '#16A34A', color: '#fff', fontSize: 11, fontWeight: 800 }}>✓ Signed off</motion.div>
          ) : (
            <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 7, background: 'rgba(99,102,241,0.09)', border: '1px solid rgba(99,102,241,0.22)' }}>
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#6366F1' }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#6366F1' }}>LIVE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div animate={{ opacity: phase === 'done' ? 1 : 0.3, y: phase === 'done' ? 0 : 3 }} transition={{ duration: 0.4, ease: EASE }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 9, background: '#F8FAFF', border: '1px solid #E2E8F0' }}>
        <FileText weight="regular" size={13} style={{ color: '#F59E0B' }} />
        <span style={{ fontSize: 10.5, fontWeight: 600, color: '#374151' }}>Timesheet exported to payroll</span>
        {phase === 'done' && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginLeft: 'auto', fontSize: 9.5, fontWeight: 700, color: '#10B981' }}>→ Auto</motion.span>}
      </motion.div>
    </div>
  );
}


/* ════════════════════════════════════════════════
   ANIMATION 5 — 3-WAY NOTIFICATIONS
════════════════════════════════════════════════ */
function NotificationsAnim() {
  const notifs = [
    { who: 'Agency', icon: '🏢', msg: 'Shift covered — Sarah K. confirmed',      color: '#F97316', bg: '#FFF7ED', border: '#FED7AA' },
    { who: 'Worker', icon: '📱', msg: 'Your shift at Ward 4A is confirmed ✓',     color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE' },
    { who: 'Client', icon: '🏥', msg: 'Staff arriving 08:00 — 1 worker placed',  color: '#0EA5E9', bg: '#F0F9FF', border: '#BAE6FD' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {notifs.map((n, i) => (
        <motion.div key={n.who}
          initial={{ opacity: 0, x: 18, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ delay: i * 0.22 + 0.15, duration: 0.48, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 11px', borderRadius: 11, background: n.bg, border: `1px solid ${n.border}` }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 9.5, fontWeight: 800, color: n.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{n.who}</p>
            <p style={{ margin: 0, fontSize: 10.5, color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>{n.msg}</p>
          </div>
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }} transition={{ delay: i * 0.22 + 0.6, type: 'spring', stiffness: 500, damping: 20 }}>
            <Bell weight="regular" size={14} style={{ color: n.color, flexShrink: 0 }} />
          </motion.div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.0, duration: 0.4 }}
        style={{ display: 'flex', gap: 6, marginTop: 3 }}>
        {['Push', 'SMS', 'Email'].map(ch => (
          <div key={ch} style={{ flex: 1, textAlign: 'center', padding: '5px 0', borderRadius: 7, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)', fontSize: 9.5, fontWeight: 700, color: '#F97316' }}>{ch}</div>
        ))}
      </motion.div>
    </div>
  );
}


/* ════════════════════════════════════════════════
   ANIMATION 6 — IN-APP CHAT
════════════════════════════════════════════════ */
function ChatAnim() {
  const msgs = [
    { text: "Hi, can I swap my Thursday shift? 🙏", from: 'worker', d: 0.4 },
    { text: "Sure! Let me check availability…",      from: 'agency', d: 1.0 },
    { text: "✅ Swap confirmed with Jake. All sorted!", from: 'agency', d: 1.8 },
  ];
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ background: '#F8FAFF', borderRadius: 18, border: '1px solid rgba(226,232,240,0.7)', overflow: 'hidden', boxShadow: '0 16px 48px rgba(14,165,233,0.18), 0 4px 16px rgba(0,0,0,0.10)', width: '100%', maxWidth: 380 }}
    >
      <div style={{ background: 'linear-gradient(135deg,#0EA5E9 0%,#38BDF8 100%)', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>👥</div>
        <div>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: '#fff' }}>Agency Chat</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
            <div style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: '#86EFAC' }} />
            <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.80)' }}>3 participants</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 165 }}>
        {msgs.map((msg, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: msg.d, duration: 0.42, ease: EASE }}
            style={{ display: 'flex', justifyContent: msg.from === 'worker' ? 'flex-start' : 'flex-end' }}>
            <div style={{
              maxWidth: '82%', padding: '8px 12px',
              borderRadius: msg.from === 'worker' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
              background: msg.from === 'worker' ? '#FFFFFF' : 'linear-gradient(135deg,#0EA5E9,#38BDF8)',
              border: msg.from === 'worker' ? '1px solid #E8EDF6' : 'none',
              color: msg.from === 'worker' ? '#1E293B' : '#fff',
              fontSize: 12, lineHeight: 1.5, fontWeight: msg.from === 'worker' ? 400 : 500,
              boxShadow: msg.from === 'worker' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 4px 14px rgba(14,165,233,0.28)',
            }}>{msg.text}</div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ display: 'flex', gap: 3, padding: '7px 10px', borderRadius: '4px 12px 12px 12px', background: '#FFFFFF', border: '1px solid #E8EDF6', alignItems: 'center' }}>
            {[0, 0.2, 0.4].map((d, j) => (
              <motion.div key={j} animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ delay: d, duration: 0.78, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#94A3B8' }} />
            ))}
          </div>
          <span style={{ fontSize: 9.5, color: '#94A3B8' }}>Agency is typing…</span>
        </motion.div>
      </div>
    </motion.div>
  );
}


/* ════════════════════════════════════════════════
   FEATURE ROW  — one row per feature, alternating
════════════════════════════════════════════════ */
interface FRProps {
  idx:     number;
  color:   string;
  icon:    React.ComponentType<any>;
  tag:     string;
  live?:   boolean;
  title:   string;
  desc:    string;
  bullets: string[];
  anim:    React.ReactNode;
  reverse: boolean;
}

function FeatureRow({ idx, color, icon: Icon, tag, live, title, desc, bullets, anim, reverse }: FRProps) {
  const num = String(idx + 1).padStart(2, '0');

  /* ── text block ── */
  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 36 : -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.68, ease: EASE }}
      style={{ flex: 1, position: 'relative' }}
    >
      {/* decorative large number watermark */}
      <div style={{
        position: 'absolute',
        top: -48, [reverse ? 'right' : 'left']: -20,
        fontSize: 152, fontWeight: 900,
        color: `${color}18`,
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '-0.04em', zIndex: 0,
      }}>{num}</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* icon + tag row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: `${color}12`, border: `1.5px solid ${color}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon weight="regular" size={22} style={{ color }} />
          </div>

          <span style={{
            fontSize: 9.5, fontWeight: 700, padding: '4px 13px', borderRadius: 20,
            background: `${color}0D`, color, border: `1px solid ${color}24`,
            letterSpacing: '0.09em', textTransform: 'uppercase' as const,
          }}>{tag}</span>

          {live && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 20, background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.20)' }}>
              <motion.div
                animate={{ opacity: [1, 0.15, 1], scale: [1, 0.6, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#F97316' }}
              />
              <span style={{ fontSize: 8.5, fontWeight: 800, color: '#F97316', letterSpacing: '0.06em' }}>LIVE</span>
            </div>
          )}
        </div>

        {/* headline */}
        <h3 style={{
          fontSize: 'clamp(1.55rem, 2.4vw, 2.15rem)',
          fontWeight: 900, color: '#0F172A',
          letterSpacing: '-0.04em', lineHeight: 1.12,
          marginBottom: 14,
        }}>{title}</h3>

        {/* description */}
        <p style={{
          fontSize: 15.5, lineHeight: 1.84, color: '#64748B',
          marginBottom: 32, maxWidth: 430,
        }}>{desc}</p>

        {/* feature bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: reverse ? 14 : -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 + i * 0.09, duration: 0.44, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: 11 }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: `${color}10`, border: `1.5px solid ${color}2C`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 9.5, fontWeight: 900, color }}>✓</span>
              </div>
              <span style={{ fontSize: 14.5, color: '#475569', fontWeight: 500, lineHeight: 1.5 }}>{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  /* ── animation block ── */
  const animBlock = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.68, delay: 0.10, ease: EASE }}
      style={{ flex: 1.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: 640, zoom: 1.35 }}>
        {anim}
      </div>
    </motion.div>
  );

  return (
    <div className="maf-row" style={{ display: 'flex', alignItems: 'center', gap: 52 }}>
      {reverse ? <>{animBlock}{textBlock}</> : <>{textBlock}{animBlock}</>}
    </div>
  );
}


/* ════════════════════════════════════════════════
   DIVIDER
════════════════════════════════════════════════ */
function Divider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent 0%, rgba(203,213,225,0.7) 15%, rgba(203,213,225,0.7) 85%, transparent 100%)',
    }} />
  );
}


/* ════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════ */
export default function MobileAppFeatures() {

  const features: Omit<FRProps, 'idx'>[] = [
    {
      color: '#6366F1', icon: CalendarBlank, tag: 'Most Used',
      title: 'Shift Management',
      desc:  'Workers see their shifts, confirm in seconds, and get reminders — all from their phone. No more missed messages or last-minute confusion.',
      bullets: ['One-tap shift confirmation', 'Automated shift reminders', 'Shift swap requests'],
      anim:    <ShiftAnim />,
      reverse: false,
    },
    {
      color: '#10B981', icon: Clock, tag: 'Time Saver',
      title: 'Availability',
      desc:  "Workers share when they're free so you fill shifts with people who actually want to work — every time.",
      bullets: ['Weekly availability picker', 'Smart staff matching', 'Auto-fill open shifts'],
      anim:    <AvailabilityAnim />,
      reverse: true,
    },
    {
      color: '#8B5CF6', icon: Shield, tag: 'CQC Ready',
      title: 'Compliance',
      desc:  'Workers upload documents, your team tracks everything. CQC-ready from day one — no chasing, no guesswork.',
      bullets: ['Document expiry alerts', 'Auto-renewal reminders', 'Audit-ready records'],
      anim:    <ComplianceAnim />,
      reverse: false,
    },
    {
      color: '#F59E0B', icon: FileText, tag: 'Auto-Payroll',
      title: 'Digital Timesheets',
      desc:  'GPS clock-in, digital sign-off, instant payroll export. The easy way to ensure every worker gets paid right, every time.',
      bullets: ['GPS clock-in / out', 'Digital client sign-off', 'Auto payroll export'],
      anim:    <TimesheetAnim />,
      reverse: true,
    },
    {
      color: '#F97316', icon: Bell, tag: 'Real-Time', live: true,
      title: '3-Way Notifications',
      desc:  'Agency, workers and clients all get the right updates instantly — push, SMS or email. Everyone stays in the loop, automatically.',
      bullets: ['Push + SMS + email alerts', 'Read receipts built-in', 'No-show auto-alerts'],
      anim:    <NotificationsAnim />,
      reverse: false,
    },
    {
      color: '#0EA5E9', icon: ChatCircle, tag: 'Built-In',
      title: 'In-App Chat',
      desc:  'Workers reach your team and your team reaches them — all in one place, right inside the app. Every message is logged, searchable, and nothing ever gets lost.',
      bullets: ['Group & direct messaging', 'Full searchable history', 'Works within Logezy'],
      anim:    <ChatAnim />,
      reverse: true,
    },
  ];

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 28%, #F8FAFF 60%, #FFFFFF 100%)',
      padding: '120px 56px 140px',
    }}>

      {/* ── subtle dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.055) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
        maskImage: 'radial-gradient(ellipse 85% 65% at 50% 40%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 40%, black 20%, transparent 100%)',
      }} />

      {/* ── ambient centre glow ── */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 900, height: 700, background: 'radial-gradient(ellipse, rgba(99,102,241,0.045) 0%, transparent 68%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* ─── CONTENT ─── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

        {/* ════ SECTION HEADER ════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 96 }}
        >
          {/* badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 18px 5px 12px', borderRadius: 100, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)', marginBottom: 24 }}>
            <div style={{ width: 6.5, height: 6.5, borderRadius: '50%', background: '#6366F1' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6366F1', letterSpacing: '0.10em', textTransform: 'uppercase' }}>App Features</span>
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.5rem)',
            fontWeight: 900, color: '#0F172A',
            letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: 20,
          }}>
            Everything your workforce needs,{' '}
            <span style={{
              background: 'linear-gradient(125deg, #6366F1 0%, #0EA5E9 50%, #10B981 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>in one app.</span>
          </h2>

          {/* subtitle */}
          <p style={{ fontSize: 17, color: '#64748B', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.8 }}>
            Six powerful features that keep your workforce engaged, compliant and earning — with zero friction.
          </p>

          {/* stats dots */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: '98.7% compliance rate',      color: '#6366F1' },
              { label: '< 2 min shift confirmation',  color: '#10B981' },
              { label: 'Push · SMS · Email alerts',   color: '#0EA5E9' },
              { label: '99.9% uptime',                color: '#F97316' },
            ].map(({ label, color }, i, arr) => (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{label}</span>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, height: 14, background: 'rgba(203,213,225,0.8)', flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ════ FEATURE ROWS ════ */}
        <div>
          {features.map((f, i) => (
            <React.Fragment key={f.title}>
              {i > 0 && <Divider />}
              <div style={{ padding: '84px 0' }}>
                <FeatureRow idx={i} {...f} />
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>

      {/* ── responsive ── */}
      <style>{`
        @media (max-width: 900px) {
          .maf-row {
            flex-direction: column !important;
            gap: 48px !important;
          }
          .maf-row > * {
            flex: none !important;
            width: 100% !important;
          }
        }
        @media (max-width: 640px) {
          .maf-row { gap: 36px !important; }
        }
      `}</style>

    </section>
  );
}
