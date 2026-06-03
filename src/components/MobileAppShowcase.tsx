import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

gsap.registerPlugin(ScrollTrigger);

/* ─── App store badges ─── */
function AppleLogo() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="white">
      <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.91 11.94 4.24 17.35 6 20.11c.89 1.35 1.95 2.88 3.35 2.82s1.87-.89 3.51-.89 2.1.89 3.52.86 2.35-1.35 3.24-2.7a11 11 0 0 0 1.44-3.15 4.37 4.37 0 0 1-2.6-3.42z"/>
    </svg>
  );
}
function PlayLogo() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <path d="M3.18 23.76a2 2 0 0 0 2.17-.22l12.3-7.1-2.92-2.92-11.55 10.24z" fill="#EA4335"/>
      <path d="M22.16 10.42l-3.5-2.02-3.27 3.27 3.27 3.27 3.54-2.04a1.42 1.42 0 0 0 0-2.48z" fill="#FBBC04"/>
      <path d="M3.18.24A2 2 0 0 0 2 2.06v19.88l11.55-11.55L3.18.24z" fill="#4285F4"/>
      <path d="M15.39 12L3.18 23.76l12.21-7.07-2.92-2.92 2.92-2.92-12.21-7.08L15.39 12z" fill="#34A853"/>
    </svg>
  );
}

/* ─── Floating SMS notification ─── */
const SMS_NOTIFS = [
  { id: 0, from: 'Sarah · Agency', msg: 'Your shift docs are ready 📄', time: 'NOW', action: 'Reply' },
  { id: 1, from: 'Tom · Ward B',   msg: 'Can you cover Thursday? 🙏',    time: '1m',  action: 'Reply' },
  { id: 2, from: 'Agency Chat',    msg: 'New vacancy: Band 6 · London 🏥', time: '2m', action: 'View' },
];
function FloatingNotification() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % SMS_NOTIFS.length); setShow(true); }, 480);
    }, 3400);
    return () => clearInterval(t);
  }, []);
  const n = SMS_NOTIFS[idx];
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div key={idx}
          initial={{ x: -250, opacity: 0, scale: 0.88 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -250, opacity: 0, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 270, damping: 25 }}
          style={{
            position: 'absolute', top: 220, left: -138, zIndex: 70, width: 270,
            background: '#fff', borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.28), 0 6px 20px rgba(0,0,0,0.14)',
            border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px 9px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: 'linear-gradient(150deg,#4CD964,#2DB84A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(45,184,74,0.4)' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="white"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(0,0,0,0.33)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>MESSAGES</span>
                <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.28)', fontWeight: 500 }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 800, color: '#111', margin: '0 0 2px', lineHeight: 1.15 }}>{n.from}</p>
              <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.44)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, margin: 0 }}>{n.msg}</p>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <button style={{ flex: 1, padding: '9px 0', background: 'rgba(45,184,74,0.08)', border: 'none', borderRight: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: '#16A34A' }}>{n.action}</button>
            <button style={{ flex: 1, padding: '9px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, color: 'rgba(0,0,0,0.32)' }}>Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── iPhone 15 Pro Mockup ─── */
function IPhoneMockup() {
  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      {/* Buttons */}
      <div style={{ position: 'absolute', left: -4, top: 122, width: 4, height: 34, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.38)' }} />
      <div style={{ position: 'absolute', left: -4, top: 178, width: 4, height: 62, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.38)' }} />
      <div style={{ position: 'absolute', left: -4, top: 256, width: 4, height: 62, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.38)' }} />
      <div style={{ position: 'absolute', right: -4, top: 192, width: 4, height: 84, background: 'linear-gradient(to right,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '0 3px 3px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.38)' }} />

      {/* Case */}
      <div style={{
        width: 308, height: 664,
        borderRadius: 58,
        background: 'linear-gradient(160deg,#D8D8DA 0%,#BABABE 22%,#9C9CA0 46%,#B2B2B6 72%,#D0D0D2 100%)',
        padding: '3px',
        boxShadow:
          '0 64px 150px rgba(0,0,0,0.72), ' +
          '0 24px 60px rgba(0,0,0,0.45), ' +
          '0 0 0 0.5px rgba(255,255,255,0.22), ' +
          'inset 0 1px 0 rgba(255,255,255,0.42), ' +
          'inset 0 -1px 0 rgba(0,0,0,0.22)',
        position: 'relative',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 56, background: '#000', overflow: 'hidden', position: 'relative' }}>
          <img
            src="/mobile_app_main_screen.jpeg"
            alt="Logezy App"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 140, height: 38, background: '#000', borderRadius: 22, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#222' }} />
          </div>
          {/* Glare */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.055) 0%,transparent 48%)', pointerEvents: 'none', zIndex: 20, borderRadius: 56 }} />
        </div>
      </div>

      {/* Speaker */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
        {[...Array(7)].map((_, i) => <div key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(0,0,0,0.30)' }} />)}
      </div>

      <FloatingNotification />

      {/* Cyan glow halo */}
      <div style={{ position: 'absolute', inset: -44, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.18) 0%,transparent 68%)', filter: 'blur(30px)', zIndex: -1, pointerEvents: 'none' }} />
    </div>
  );
}

/* ─── Notification cards data ─── */
const CARDS = [
  {
    type: 'SHIFT CONFIRMED', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
    title: 'Shift Confirmed ✓', lines: ['NHS Ward B · Tomorrow', '07:00 – 19:00'],
    action: null, actionColor: '', time: 'now',
  },
  {
    type: 'NEW BOOKING', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>,
    title: 'New Booking Available', lines: ['May 26 · HCA · 08:00 – 20:00'],
    action: 'Tap to view', actionColor: '#10B981', time: '2m ago',
  },
  {
    type: 'TIMESHEET', typeColor: '#8B5CF6', iconBg: '#F5F3FF',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    title: 'Timesheet Approved', lines: ['Week ending May 19', '32h 15m approved'],
    action: null, actionColor: '', time: '1h ago',
  },
  {
    type: 'COMPLIANCE', typeColor: '#F59E0B', iconBg: '#FFFBEB',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: 'Document Due', lines: ['Your DBS certificate', 'expires in 7 days'],
    action: 'Tap to upload', actionColor: '#F59E0B', time: '3h ago',
  },
  {
    type: 'AGENCY MESSAGE', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Message from Agency', lines: ['Important update about', 'your next shift.'],
    action: 'Tap to view', actionColor: '#10B981', time: '5h ago',
  },
  {
    type: 'REMINDER', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Clock In Reminder', lines: ["Don't forget to clock in", 'for your upcoming shift'],
    action: null, actionColor: '', time: '4h ago',
  },
];

type CardData = typeof CARDS[number];

/* Float config — varied per card so no two bob in sync */
const FLOAT = [
  { amp: 7, dur: 3.5 }, { amp: 5, dur: 2.8 },
  { amp: 6, dur: 3.9 }, { amp: 5, dur: 2.7 },
  { amp: 7, dur: 3.2 }, { amp: 4, dur: 2.5 },
];

/* ─── Single glassmorphism notification card ─── */
function NotifCard({ card, index, pulse }: { card: CardData; index: number; pulse: boolean }) {
  const f = FLOAT[index] ?? FLOAT[0];
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ duration: 0.48, delay: 0.10 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: [0, -f.amp, 0] }}
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: 15,
        padding: '10px 13px 11px',
        boxShadow: pulse
          ? `0 0 0 2px ${card.typeColor}55, 0 10px 40px rgba(0,0,0,0.20), 0 3px 10px rgba(0,0,0,0.10)`
          : '0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.09)',
        border: '1px solid rgba(255,255,255,0.94)',
        position: 'relative',
        transition: 'box-shadow 0.45s',
      }}
    >
      {/* Type + time row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {card.icon}
          </div>
          <span style={{ fontSize: 8, fontWeight: 800, color: card.typeColor, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
            {card.type}
          </span>
        </div>
        <span style={{ fontSize: 8, color: '#94A3B8', fontWeight: 500, whiteSpace: 'nowrap' as const, marginLeft: 4 }}>{card.time}</span>
      </div>
      {/* Title */}
      <p style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', margin: '0 0 3px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
        {card.title}
      </p>
      {/* Body */}
      {card.lines.map((line: string, i: number) => (
        <p key={i} style={{ fontSize: 10, color: '#64748B', margin: 0, lineHeight: 1.55 }}>{line}</p>
      ))}
      {card.action && (
        <p style={{ fontSize: 10, fontWeight: 700, color: card.actionColor, marginTop: 4 }}>{card.action}</p>
      )}
      {/* Live pulse dot */}
      {pulse && (
        <motion.div
          style={{ position: 'absolute', top: 8, right: 10, width: 6, height: 6, borderRadius: '50%', background: card.typeColor }}
          animate={{ scale: [1, 1.9, 1], opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ─── Glowing connection dot strip ─── */
function GlowStrip({ dots = 5, delay = 0 }: { dots?: number; delay?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      {Array.from({ length: dots }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: i === Math.floor(dots / 2) ? 7 : 5,
            height: i === Math.floor(dots / 2) ? 7 : 5,
            borderRadius: '50%',
            background: '#38BDF8',
            boxShadow: '0 0 7px 2px rgba(56,189,248,0.80)',
            flexShrink: 0,
          }}
          animate={{ opacity: [0.18, 1, 0.18], scale: [0.7, 1.35, 0.7] }}
          transition={{ duration: 1.55, repeat: Infinity, delay: delay + i * 0.17, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════ */
export default function MobileAppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const vw         = useWindowWidth();
  const isMobile   = vw < 768;
  const isTablet   = vw < 1100;

  /* cycling pulse */
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulseIdx(i => (i + 1) % CARDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' })
        .fromTo(phoneRef.current, { opacity: 0, y: 56, scale: 0.91 }, { opacity: 1, y: 0, scale: 1, duration: 0.88, ease: 'power3.out' }, '-=0.44');
      gsap.to(phoneRef.current, { y: -9, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#091530',
        padding: isMobile ? '56px 20px 68px' : isTablet ? '72px 28px' : '64px 0 72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'absolute', top: '40%', left: '40%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 65%)', filter: 'blur(72px)' }} />
        <div style={{ position: 'absolute', top: '25%', left: '12%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* ════════════════════════════
          MAIN 3-COLUMN WRAPPER
      ════════════════════════════ */}
      <div style={{
        maxWidth: 1380, margin: '0 auto',
        padding: isMobile ? 0 : '0 48px',
        display: 'flex',
        flexDirection: isTablet ? 'column' : 'row',
        alignItems: isTablet ? 'center' : 'stretch',
        gap: isTablet ? 40 : 0,
        position: 'relative', zIndex: 1,
        minHeight: isTablet ? 'auto' : 660,
      }}>

        {/* ═══ COL 1: Copy ═══ */}
        <div
          ref={leftRef}
          style={{
            flex: '0 0 auto',
            width: isTablet ? '100%' : 320,
            opacity: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: isTablet ? 0 : 16,
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(56,189,248,0.10)', border: '1.5px solid rgba(56,189,248,0.26)', marginBottom: 22 }}
          >
            <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 13, height: 13 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#93C5FD', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Worker Mobile App</span>
          </motion.div>

          {/* Headline — constrained width */}
          <h2 style={{ fontSize: 'clamp(2rem,3.2vw,3.1rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.07, marginBottom: 16, maxWidth: 300 }}>
            Your workforce,<br />
            <span style={{ background: 'linear-gradient(125deg,#22D3EE 0%,#818CF8 48%,#C084FC 78%,#EC4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in their pocket.
            </span>
          </h2>

          <p style={{ fontSize: 14.5, lineHeight: 1.76, color: 'rgba(165,210,255,0.66)', marginBottom: 26, maxWidth: 295 }}>
            A branded mobile app your temps actually want to use — for shifts, timesheets, documents and chat. Available on iOS &amp; Android.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {[
              'Branded with your agency identity',
              'Real-time shift confirmations & reminders',
              'GPS-verified clock in/out',
              'Document upload & compliance tracking',
              'Three-way notifications — agency, worker, client',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.36, delay: 0.05 * i }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}
              >
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(56,189,248,0.13)', border: '1.5px solid rgba(56,189,248,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <CheckCircle weight="fill" style={{ color: '#38BDF8', width: 10, height: 10 }} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(200,228,255,0.78)', lineHeight: 1.5 }}>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* App badges */}
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' as const, marginBottom: 20 }}>
            {[
              { logo: <AppleLogo />, top: 'Download on the', main: 'App Store' },
              { logo: <PlayLogo />,  top: 'Get it on',       main: 'Google Play' },
            ].map(({ logo, top, main }, i) => (
              <a key={i} href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px', borderRadius: 11, background: 'rgba(0,0,0,0.42)', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', backdropFilter: 'blur(10px)' }}>
                {logo}
                <div>
                  <p style={{ fontSize: 8.5, fontWeight: 500, color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', lineHeight: 1 }}>{top}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginTop: 2 }}>{main}</p>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 24px', borderRadius: 13, textDecoration: 'none', background: 'linear-gradient(135deg,#1795C7 0%,#5B6CF9 100%)', color: '#fff', fontWeight: 700, fontSize: 13.5, boxShadow: '0 8px 28px rgba(56,189,248,0.28), inset 0 1px 0 rgba(255,255,255,0.18)', alignSelf: 'flex-start' }}>
            Get your branded app
            <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
          </Link>
        </div>

        {/* ═══ COL 2: iPhone (center, vertically centred) ═══ */}
        <div style={{
          flex: '0 0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: isTablet ? 0 : '0 28px',
          position: 'relative', zIndex: 2,
        }}>
          <div
            ref={phoneRef}
            style={{
              opacity: 0,
              filter: 'drop-shadow(0 44px 100px rgba(0,0,0,0.68)) drop-shadow(0 0 44px rgba(56,189,248,0.14))',
            }}
          >
            <IPhoneMockup />
          </div>

          {/* Horizontal connector from phone → cards */}
          {!isTablet && (
            <div style={{ position: 'absolute', right: -14, top: '34%', zIndex: 5 }}>
              <GlowStrip dots={5} delay={0} />
            </div>
          )}
        </div>

        {/* ═══ COL 3: Cards zone + Nurse (clearly separated) ═══ */}
        {!isMobile && (
          <div style={{
            flex: 1,
            position: 'relative',
            minHeight: 660,
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* ── Nurse image — far RIGHT, won't be covered by cards ── */}
            <img
              src="/nurse.png"
              alt="Healthcare worker using Logezy"
              style={{
                position: 'absolute',
                right: 0, top: 0,
                width: '52%',    /* nurse occupies only right 52% */
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                zIndex: 0,
              }}
            />

            {/* Smooth gradient: dark-left → transparent-right */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(to right, rgba(9,21,48,1) 0%, rgba(9,21,48,0.95) 12%, rgba(9,21,48,0.75) 30%, rgba(9,21,48,0.38) 50%, rgba(9,21,48,0.10) 64%, transparent 78%)',
            }} />
            {/* Top + bottom vignette */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom,rgba(9,21,48,0.25) 0%,transparent 16%,transparent 82%,rgba(9,21,48,0.35) 100%)' }} />

            {/* ── Notification cards — LEFT zone only (no overlap with nurse face) ── */}
            <div style={{
              position: 'relative', zIndex: 2,
              width: '52%',   /* cards stay in left 52% — nurse is safe on right */
              padding: '8px 0 8px 8px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 12,
              rowGap: 0,
              alignContent: 'center',
              alignSelf: 'stretch',
            }}>
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  style={{
                    marginTop: i % 2 === 1 ? 28 : 0,   /* right-col cards offset down */
                    marginBottom: i % 2 === 0 && i < 4 ? 12 : 0,
                  }}
                >
                  <NotifCard card={card} index={i} pulse={pulseIdx === i} />
                </div>
              ))}
            </div>

            {/* Second connector from cards → nurse watch area */}
            <div style={{ position: 'absolute', right: '48%', top: '55%', zIndex: 3, transform: 'rotate(0deg)' }}>
              <GlowStrip dots={4} delay={0.35} />
            </div>
          </div>
        )}

        {/* Mobile: simple 2-col card grid */}
        {isMobile && (
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CARDS.slice(0, 4).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.42, delay: i * 0.09 }}
                style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 13, padding: '9px 11px 10px', boxShadow: '0 6px 28px rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.9)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 19, height: 19, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.icon}</div>
                  <span style={{ fontSize: 7.5, fontWeight: 800, color: card.typeColor, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{card.type}</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', margin: '0 0 2px', lineHeight: 1.2 }}>{card.title}</p>
                {card.lines.slice(0, 1).map((l: string, j: number) => <p key={j} style={{ fontSize: 9.5, color: '#64748B', margin: 0 }}>{l}</p>)}
                {card.action && <p style={{ fontSize: 9.5, fontWeight: 700, color: card.actionColor, marginTop: 3 }}>{card.action}</p>}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
