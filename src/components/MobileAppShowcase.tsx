import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

gsap.registerPlugin(ScrollTrigger);

/* ─── Store Logos ─── */
function AppleLogo() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="white">
      <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.91 11.94 4.24 17.35 6 20.11c.89 1.35 1.95 2.88 3.35 2.82s1.87-.89 3.51-.89 2.1.89 3.52.86 2.35-1.35 3.24-2.7a11 11 0 0 0 1.44-3.15 4.37 4.37 0 0 1-2.6-3.42z"/>
    </svg>
  );
}
function PlayLogo() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24">
      <path d="M3.18 23.76a2 2 0 0 0 2.17-.22l12.3-7.1-2.92-2.92-11.55 10.24z" fill="#EA4335"/>
      <path d="M22.16 10.42l-3.5-2.02-3.27 3.27 3.27 3.27 3.54-2.04a1.42 1.42 0 0 0 0-2.48z" fill="#FBBC04"/>
      <path d="M3.18.24A2 2 0 0 0 2 2.06v19.88l11.55-11.55L3.18.24z" fill="#4285F4"/>
      <path d="M15.39 12L3.18 23.76l12.21-7.07-2.92-2.92 2.92-2.92-12.21-7.08L15.39 12z" fill="#34A853"/>
    </svg>
  );
}

/* ─── Animated floating SMS notifications (phone screen overlay) ─── */
const SMS_NOTIFS = [
  { id: 0, from: 'Sarah · Agency',  msg: 'Your shift docs are ready 📄',    time: 'now', action: 'Reply'  },
  { id: 1, from: 'Tom · Ward B',    msg: 'Can you cover Thursday? 🙏',       time: '1m',  action: 'Reply'  },
  { id: 2, from: 'Agency Chat',     msg: 'New vacancy: Band 6 · London 🏥',  time: '2m',  action: 'View'   },
];

function FloatingNotification() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % SMS_NOTIFS.length); setShow(true); }, 560);
    }, 3600);
    return () => clearInterval(t);
  }, []);

  const n = SMS_NOTIFS[idx];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={idx}
          initial={{ x: -220, opacity: 0, scale: 0.86 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -220, opacity: 0, scale: 0.86 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            position: 'absolute', top: 205, left: -122, zIndex: 70, width: 252,
            background: '#FFFFFF', borderRadius: 20,
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow: '0 16px 50px rgba(0,0,0,0.24), 0 5px 18px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px 10px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: 'linear-gradient(150deg,#4CD964,#2DB84A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 16px rgba(45,184,74,0.48)', position: 'relative' }}>
              <svg width={23} height={23} viewBox="0 0 24 24" fill="white"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.36)', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>MESSAGES</p>
                <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.30)', fontWeight: 500 }}>{n.time}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#111', marginBottom: 2, lineHeight: 1.1 }}>{n.from}</p>
              <p style={{ fontSize: 12.5, color: 'rgba(0,0,0,0.48)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{n.msg}</p>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <button style={{ flex: 1, padding: '9px 0', background: 'rgba(48,209,88,0.09)', border: 'none', borderRight: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: '#1DB954' }}>{n.action}</button>
            <button style={{ flex: 1, padding: '9px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, color: 'rgba(0,0,0,0.36)' }}>Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Realistic iPhone 15 Pro Mockup ─── */
function IPhoneMockup() {
  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <div style={{ position: 'absolute', left: -4, top: 108, width: 4, height: 30, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'absolute', left: -4, top: 162, width: 4, height: 52, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'absolute', left: -4, top: 228, width: 4, height: 52, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'absolute', right: -4, top: 172, width: 4, height: 72, background: 'linear-gradient(to right,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '0 3px 3px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.45)' }} />

      <div style={{ width: 270, height: 582, borderRadius: 54, background: 'linear-gradient(160deg,#D6D6D8 0%,#B8B8BC 20%,#9A9A9E 45%,#B0B0B4 70%,#CECECE 100%)', padding: '3px', boxShadow: '0 50px 130px rgba(0,0,0,0.75),0 0 0 0.5px rgba(255,255,255,0.25),inset 0 1px 0 rgba(255,255,255,0.5),inset 0 -1px 0 rgba(0,0,0,0.25)', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 52, background: '#000', overflow: 'hidden', position: 'relative' }}>
          <img src="/mobile_app_main_screen.jpeg" alt="Logezy Worker App" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 128, height: 36, background: '#000', borderRadius: 20, zIndex: 10, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.06),0 2px 8px rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1px solid rgba(255,255,255,0.08)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,transparent 55%)', pointerEvents: 'none', zIndex: 20, borderRadius: 52 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5, alignItems: 'center' }}>
        {[...Array(6)].map((_, i) => <div key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(0,0,0,0.35)' }} />)}
      </div>

      <FloatingNotification />

      <div style={{ position: 'absolute', inset: -50, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.22) 0%,transparent 70%)', filter: 'blur(35px)', zIndex: -1, pointerEvents: 'none' }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NOTIFICATION CARDS DATA
═══════════════════════════════════════════════════════ */
const NOTIF_CARDS = [
  {
    type: 'SHIFT CONFIRMED', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: (<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>),
    title: 'Shift Confirmed ✓',
    lines: ['NHS Ward B · Tomorrow', '07:00 – 19:00'],
    action: null, actionColor: '', time: 'now',
  },
  {
    type: 'NEW BOOKING', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: (<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>),
    title: 'New Booking Available',
    lines: ['May 26 · HCA · 08:00 – 20:00'],
    action: 'Tap to view', actionColor: '#10B981', time: '2m ago',
  },
  {
    type: 'TIMESHEET', typeColor: '#8B5CF6', iconBg: '#F5F3FF',
    icon: (<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>),
    title: 'Timesheet Approved',
    lines: ['Week ending May 19', '32h 15m approved'],
    action: null, actionColor: '', time: '1h ago',
  },
  {
    type: 'COMPLIANCE', typeColor: '#F59E0B', iconBg: '#FFFBEB',
    icon: (<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),
    title: 'Document Due',
    lines: ['Your DBS certificate', 'expires in 7 days'],
    action: 'Tap to upload', actionColor: '#F59E0B', time: '3h ago',
  },
  {
    type: 'AGENCY MESSAGE', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: (<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>),
    title: 'Message from Agency',
    lines: ['Important update about', 'your next shift.'],
    action: 'Tap to view', actionColor: '#10B981', time: '5h ago',
  },
  {
    type: 'REMINDER', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: (<svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
    title: 'Clock In Reminder',
    lines: ["Don't forget to clock in", 'for your upcoming shift'],
    action: null, actionColor: '', time: '4h ago',
  },
];

type NotifCard = typeof NOTIF_CARDS[number];

/* Float params per card */
const FLOAT = [
  { amp: 8,  dur: 3.4 },
  { amp: 6,  dur: 2.9 },
  { amp: 7,  dur: 3.8 },
  { amp: 5,  dur: 2.6 },
  { amp: 6,  dur: 3.1 },
  { amp: 4,  dur: 2.4 },
];

/* ═══════════════════════════════════════════════════════
   PREMIUM GLASSMORPHISM NOTIFICATION CARD
═══════════════════════════════════════════════════════ */
function PremiumNotifCard({ card, index, pulse }: { card: NotifCard; index: number; pulse: boolean }) {
  const f = FLOAT[index] ?? FLOAT[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.52, delay: 0.12 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: [0, -f.amp, 0] }}
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 16,
        padding: '11px 13px 12px',
        boxShadow: pulse
          ? `0 0 0 2px ${card.typeColor}70, 0 12px 40px rgba(0,0,0,0.22), 0 3px 10px rgba(0,0,0,0.10)`
          : '0 8px 36px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.10)',
        border: '1px solid rgba(255,255,255,0.95)',
        position: 'relative',
        transition: 'box-shadow 0.5s ease',
        width: index === 5 ? 190 : 210,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {card.icon}
          </div>
          <span style={{ fontSize: 8.5, fontWeight: 800, color: card.typeColor, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>
            {card.type}
          </span>
        </div>
        <span style={{ fontSize: 8.5, color: '#94A3B8', fontWeight: 500 }}>{card.time}</span>
      </div>
      <p style={{ fontSize: 12.5, fontWeight: 800, color: '#0F172A', margin: '0 0 3px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
        {card.title}
      </p>
      {card.lines.map((line: string, i: number) => (
        <p key={i} style={{ fontSize: 10.5, color: '#64748B', margin: 0, lineHeight: 1.55 }}>{line}</p>
      ))}
      {card.action && (
        <p style={{ fontSize: 10.5, fontWeight: 700, color: card.actionColor, marginTop: 5 }}>{card.action}</p>
      )}
      {pulse && (
        <motion.div
          style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%', background: card.typeColor }}
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.0, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   GLOWING CONNECTION DOTS
═══════════════════════════════════════════════════════ */
function GlowDots({ count = 5, delay = 0 }: { count?: number; delay?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            width: i === Math.floor(count / 2) ? 7 : 5,
            height: i === Math.floor(count / 2) ? 7 : 5,
            borderRadius: '50%',
            background: '#38BDF8',
            boxShadow: '0 0 8px 2px rgba(56,189,248,0.85)',
            flexShrink: 0,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: delay + i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function MobileAppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const vw         = useWindowWidth();
  const isMobile   = vw < 768;
  const isTablet   = vw < 1100;

  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulseIdx(i => (i + 1) % NOTIF_CARDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' })
        .fromTo(phoneRef.current, { opacity: 0, y: 56, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' }, '-=0.45');
      gsap.to(phoneRef.current, { y: -10, duration: 3.0, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '60px 20px 72px' : isTablet ? '80px 32px' : '72px 0 80px',
      }}
    >
      {/* ── Full-section nurse background ── */}
      <img
        src="/nurse.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          display: 'block',
          zIndex: 0,
        }}
      />

      {/* Dark overlay — keeps text readable, blends image into deep blue */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(105deg, rgba(6,14,42,0.97) 0%, rgba(6,14,42,0.90) 28%, rgba(6,14,42,0.70) 52%, rgba(6,14,42,0.40) 72%, rgba(6,14,42,0.18) 88%, rgba(6,14,42,0.05) 100%)',
      }} />

      {/* Dot grid overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.03, backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

      {/* Centre glow */}
      <div style={{ position: 'absolute', top: '50%', left: '42%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 65%)', filter: 'blur(80px)', zIndex: 1, pointerEvents: 'none' }} />

      {/* ── 3-column layout ── */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: isMobile ? 0 : '0 40px', display: 'flex', flexDirection: isTablet ? 'column' : 'row', alignItems: 'center', gap: isTablet ? 44 : 0, position: 'relative', zIndex: 2 }}>

        {/* COL 1 — Copy */}
        <div ref={leftRef} style={{ flex: '0 0 auto', width: isTablet ? '100%' : 360, opacity: 0 }}>

          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 999, background: 'rgba(56,189,248,0.10)', border: '1.5px solid rgba(56,189,248,0.30)', marginBottom: 28 }}
          >
            <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 14, height: 14 }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#93C5FD', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Worker Mobile App</span>
          </motion.div>

          <h2 style={{ fontSize: 'clamp(2.2rem,3.8vw,3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.06, marginBottom: 20 }}>
            Your workforce,<br />
            <span style={{ background: 'linear-gradient(125deg,#22D3EE 0%,#818CF8 45%,#C084FC 75%,#EC4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in their pocket.
            </span>
          </h2>

          <p style={{ fontSize: 15.5, lineHeight: 1.78, color: 'rgba(165,210,255,0.70)', marginBottom: 32, maxWidth: 380 }}>
            A branded mobile app your temps actually want to use — for shifts, timesheets, documents and chat. Available on iOS &amp; Android.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 36 }}>
            {[
              'Branded with your agency identity',
              'Real-time shift confirmations & reminders',
              'GPS-verified clock in/out',
              'Document upload & compliance tracking',
              'Three-way notifications — agency, worker, client',
            ].map((item, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 * i }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(56,189,248,0.15)', border: '1.5px solid rgba(56,189,248,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle weight="fill" style={{ color: '#38BDF8', width: 11, height: 11 }} />
                </div>
                <span style={{ fontSize: 13.5, color: 'rgba(200,228,255,0.82)' }}>{item}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 24 }}>
            {[
              { logo: <AppleLogo />, top: 'Download on the', main: 'App Store' },
              { logo: <PlayLogo />,  top: 'Get it on',       main: 'Google Play' },
            ].map(({ logo, top, main }, i) => (
              <a key={i} href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, background: 'rgba(0,0,0,0.40)', border: '1px solid rgba(255,255,255,0.18)', textDecoration: 'none', backdropFilter: 'blur(12px)' }}>
                {logo}
                <div>
                  <p style={{ fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', lineHeight: 1 }}>{top}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginTop: 2 }}>{main}</p>
                </div>
              </a>
            ))}
          </div>

          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 14, textDecoration: 'none', background: 'linear-gradient(135deg,#1795C7 0%,#5B6CF9 100%)', color: '#fff', fontWeight: 700, fontSize: 14, boxShadow: '0 8px 28px rgba(56,189,248,0.32),inset 0 1px 0 rgba(255,255,255,0.2)' }}>
            Get your branded app
            <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {/* COL 2+3 — iPhone + Nurse bg + Floating cards */}
        <div style={{ flex: 1, position: 'relative', minHeight: isTablet ? 'auto' : 660, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

          {/* Nurse already in full section bg — no duplicate here */}

          {/* iPhone mockup */}
          <div
            ref={phoneRef}
            style={{
              opacity: 0, position: 'relative', zIndex: 4, flexShrink: 0,
              marginLeft: isTablet ? 'auto' : 24,
              marginRight: isTablet ? 'auto' : 0,
              filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(56,189,248,0.18))',
            }}
          >
            <IPhoneMockup />
          </div>

          {/* Notification cards panel */}
          {!isMobile && (
            <div style={{ position: 'relative', zIndex: 5, marginLeft: 20, flexShrink: 0, alignSelf: 'center' }}>

              {/* Connector glow dots */}
              <div style={{ marginBottom: 10, marginLeft: 4 }}>
                <GlowDots count={6} delay={0} />
              </div>

              {/* 2-col zigzag: even index = left col, odd = right col with marginTop offset */}
              <div style={{ display: 'grid', gridTemplateColumns: '210px 210px', columnGap: 14, rowGap: 12, alignItems: 'start' }}>
                {NOTIF_CARDS.map((card, i) => (
                  <div key={i} style={{ marginTop: i % 2 === 1 ? 32 : 0, position: 'relative' }}>
                    {/* Connector dot on left-column cards */}
                    {i % 2 === 0 && (
                      <motion.div
                        style={{ position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 8px 2px rgba(56,189,248,0.9)' }}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }}
                      />
                    )}
                    <PremiumNotifCard card={card} index={i} pulse={pulseIdx === i} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile: 2-col grid, first 4 cards */}
          {isMobile && (
            <div style={{ width: '100%', marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {NOTIF_CARDS.slice(0, 4).map((card, i) => (
                <PremiumNotifCard key={i} card={card} index={i} pulse={pulseIdx === i} />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
