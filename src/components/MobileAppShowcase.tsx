import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

gsap.registerPlugin(ScrollTrigger);

/* ─── Store badges ─── */
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

/* ─── SMS floating notification on phone ─── */
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
      setTimeout(() => { setIdx(i => (i + 1) % SMS_NOTIFS.length); setShow(true); }, 500);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  const n = SMS_NOTIFS[idx];
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={idx}
          initial={{ x: -240, opacity: 0, scale: 0.88 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -240, opacity: 0, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            position: 'absolute', top: 210, left: -130, zIndex: 70, width: 260,
            background: '#fff', borderRadius: 20,
            boxShadow: '0 18px 56px rgba(0,0,0,0.26), 0 6px 20px rgba(0,0,0,0.14)',
            border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px 9px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: 'linear-gradient(150deg,#4CD964,#2DB84A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(45,184,74,0.45)' }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="white"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>MESSAGES</span>
                <span style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.28)', fontWeight: 500 }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 800, color: '#111', margin: '0 0 2px', lineHeight: 1.15 }}>{n.from}</p>
              <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.46)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, margin: 0 }}>{n.msg}</p>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <button style={{ flex: 1, padding: '9px 0', background: 'rgba(45,184,74,0.08)', border: 'none', borderRight: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: '#16A34A' }}>{n.action}</button>
            <button style={{ flex: 1, padding: '9px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, color: 'rgba(0,0,0,0.34)' }}>Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── iPhone 15 Pro Mockup (larger) ─── */
function IPhoneMockup() {
  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      {/* Side buttons */}
      <div style={{ position: 'absolute', left: -4, top: 118, width: 4, height: 32, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', left: -4, top: 174, width: 4, height: 58, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', left: -4, top: 248, width: 4, height: 58, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', right: -4, top: 188, width: 4, height: 80, background: 'linear-gradient(to right,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '0 3px 3px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.4)' }} />

      {/* Case */}
      <div style={{
        width: 300, height: 648,
        borderRadius: 58,
        background: 'linear-gradient(160deg,#D8D8DA 0%,#BABABE 20%,#9C9CA0 45%,#B2B2B6 70%,#D0D0D2 100%)',
        padding: '3px',
        boxShadow: '0 60px 140px rgba(0,0,0,0.75), 0 0 0 0.5px rgba(255,255,255,0.22), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.22)',
        position: 'relative',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 56, background: '#000', overflow: 'hidden', position: 'relative' }}>
          <img src="/mobile_app_main_screen.jpeg" alt="Logezy App" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          {/* Dynamic Island */}
          <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 140, height: 38, background: '#000', borderRadius: 22, zIndex: 10, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.06)' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#222' }} />
            </div>
          </div>
          {/* Glass reflection */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.06) 0%,transparent 50%)', pointerEvents: 'none', zIndex: 20, borderRadius: 56 }} />
        </div>
      </div>

      {/* Speaker */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
        {[...Array(7)].map((_, i) => <div key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(0,0,0,0.32)' }} />)}
      </div>

      {/* SMS notification */}
      <FloatingNotification />

      {/* Cyan glow */}
      <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.20) 0%,transparent 68%)', filter: 'blur(32px)', zIndex: -1, pointerEvents: 'none' }} />
    </div>
  );
}

/* ─── Notification cards data ─── */
const CARDS = [
  {
    type: 'SHIFT CONFIRMED', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
    title: 'Shift Confirmed ✓', body: 'NHS Ward B · Tomorrow\n07:00 – 19:00',
    action: null, actionColor: '', time: 'now',
  },
  {
    type: 'NEW BOOKING', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>,
    title: 'New Booking Available', body: 'May 26 · HCA · 08:00 – 20:00',
    action: 'Tap to view', actionColor: '#10B981', time: '2m ago',
  },
  {
    type: 'TIMESHEET', typeColor: '#8B5CF6', iconBg: '#F5F3FF',
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    title: 'Timesheet Approved', body: 'Week ending May 19\n32h 15m approved',
    action: null, actionColor: '', time: '1h ago',
  },
  {
    type: 'COMPLIANCE', typeColor: '#F59E0B', iconBg: '#FFFBEB',
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: 'Document Due', body: 'Your DBS certificate\nexpires in 7 days',
    action: 'Tap to upload', actionColor: '#F59E0B', time: '3h ago',
  },
  {
    type: 'AGENCY MESSAGE', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Message from Agency', body: 'Important update about\nyour next shift.',
    action: 'Tap to view', actionColor: '#10B981', time: '5h ago',
  },
  {
    type: 'REMINDER', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Clock In Reminder', body: "Don't forget to clock in\nfor your upcoming shift",
    action: null, actionColor: '', time: '4h ago',
  },
];

/* Staggered absolute positions matching reference (% of right-panel height) */
const POSITIONS = [
  { top: '2%',  left: '0%',  w: 215, delay: 0.10, floatAmp: 7,  floatDur: 3.4 },
  { top: '20%', left: '46%', w: 205, delay: 0.22, floatAmp: 5,  floatDur: 2.9 },
  { top: '39%', left: '2%',  w: 215, delay: 0.34, floatAmp: 6,  floatDur: 3.7 },
  { top: '57%', left: '44%', w: 210, delay: 0.46, floatAmp: 5,  floatDur: 2.7 },
  { top: '76%', left: '0%',  w: 210, delay: 0.58, floatAmp: 6,  floatDur: 3.2 },
  { top: '75%', left: '50%', w: 192, delay: 0.70, floatAmp: 4,  floatDur: 2.5 },
];

type CardType = typeof CARDS[number];

/* ─── Single glassmorphism card ─── */
function NotifCard({ card, pos, pulse }: { card: CardType; pos: typeof POSITIONS[number]; pulse: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.50, delay: pos.delay, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: [0, -pos.floatAmp, 0] }}
      style={{
        position: 'absolute',
        top: pos.top, left: pos.left,
        width: pos.w,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 16,
        padding: '10px 13px 11px',
        boxShadow: pulse
          ? `0 0 0 2px ${card.typeColor}60, 0 10px 36px rgba(0,0,0,0.20)`
          : '0 8px 36px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.09)',
        border: '1px solid rgba(255,255,255,0.95)',
        transition: 'box-shadow 0.45s ease',
        zIndex: 3,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 21, height: 21, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {card.icon}
          </div>
          <span style={{ fontSize: 8, fontWeight: 800, color: card.typeColor, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
            {card.type}
          </span>
        </div>
        <span style={{ fontSize: 8.5, color: '#94A3B8', fontWeight: 500 }}>{card.time}</span>
      </div>
      {/* Title */}
      <p style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', margin: '0 0 3px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
        {card.title}
      </p>
      {/* Body */}
      {card.body.split('\n').map((line: string, i: number) => (
        <p key={i} style={{ fontSize: 10, color: '#64748B', margin: 0, lineHeight: 1.55 }}>{line}</p>
      ))}
      {card.action && (
        <p style={{ fontSize: 10, fontWeight: 700, color: card.actionColor, marginTop: 4 }}>{card.action}</p>
      )}
      {/* Pulse dot */}
      {pulse && (
        <motion.div
          style={{ position: 'absolute', top: 8, right: 9, width: 6, height: 6, borderRadius: '50%', background: card.typeColor }}
          animate={{ scale: [1, 1.9, 1], opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.95, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ─── Glowing connector dots ─── */
function GlowLine({ count = 5, delay = 0 }: { count?: number; delay?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          style={{ width: i === 2 ? 7 : 5, height: i === 2 ? 7 : 5, borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 7px 2px rgba(56,189,248,0.85)', flexShrink: 0 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: delay + i * 0.17, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════ */
export default function MobileAppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const vw         = useWindowWidth();
  const isMobile   = vw < 768;
  const isTablet   = vw < 1100;

  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulseIdx(i => (i + 1) % CARDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -44 }, { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' })
        .fromTo(phoneRef.current, { opacity: 0, y: 60, scale: 0.90 }, { opacity: 1, y: 0, scale: 1, duration: 0.90, ease: 'power3.out' }, '-=0.45');
      gsap.to(phoneRef.current, { y: -8, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#091530',
        padding: isMobile ? '56px 20px 68px' : isTablet ? '72px 32px' : '64px 0 72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background: subtle dot grid + radial glows ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.032, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'absolute', top: '40%', left: '38%', transform: 'translate(-50%,-50%)', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 65%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', top: '30%', left: '15%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* ══════════════════════════════════════════
          3-COLUMN WRAPPER
      ══════════════════════════════════════════ */}
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        padding: isMobile ? 0 : '0 48px',
        display: 'flex',
        flexDirection: isTablet ? 'column' : 'row',
        alignItems: isTablet ? 'center' : 'center',
        gap: isTablet ? 40 : 0,
        position: 'relative', zIndex: 1,
      }}>

        {/* ══ COL 1: Copy (left) ══ */}
        <div
          ref={leftRef}
          style={{ flex: '0 0 auto', width: isTablet ? '100%' : 348, opacity: 0, paddingRight: isTablet ? 0 : 8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 999, background: 'rgba(56,189,248,0.10)', border: '1.5px solid rgba(56,189,248,0.28)', marginBottom: 26 }}
          >
            <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 14, height: 14 }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#93C5FD', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Worker Mobile App</span>
          </motion.div>

          {/* Headline */}
          <h2 style={{ fontSize: 'clamp(2.2rem,3.6vw,3.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.07, marginBottom: 18 }}>
            Your workforce,<br />
            <span style={{ background: 'linear-gradient(125deg,#22D3EE 0%,#818CF8 48%,#C084FC 78%,#EC4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in their pocket.
            </span>
          </h2>

          <p style={{ fontSize: 15.5, lineHeight: 1.76, color: 'rgba(165,210,255,0.68)', marginBottom: 30, maxWidth: 370 }}>
            A branded mobile app your temps actually want to use — for shifts, timesheets, documents and chat. Available on iOS &amp; Android.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 34 }}>
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
                viewport={{ once: true }} transition={{ duration: 0.38, delay: 0.06 * i }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(56,189,248,0.14)', border: '1.5px solid rgba(56,189,248,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle weight="fill" style={{ color: '#38BDF8', width: 11, height: 11 }} />
                </div>
                <span style={{ fontSize: 13.5, color: 'rgba(200,228,255,0.80)' }}>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* App store badges */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 22 }}>
            {[
              { logo: <AppleLogo />, top: 'Download on the', main: 'App Store' },
              { logo: <PlayLogo />,  top: 'Get it on',       main: 'Google Play' },
            ].map(({ logo, top, main }, i) => (
              <a key={i} href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, background: 'rgba(0,0,0,0.42)', border: '1px solid rgba(255,255,255,0.16)', textDecoration: 'none', backdropFilter: 'blur(10px)' }}>
                {logo}
                <div>
                  <p style={{ fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', lineHeight: 1 }}>{top}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginTop: 2 }}>{main}</p>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 14, textDecoration: 'none', background: 'linear-gradient(135deg,#1795C7 0%,#5B6CF9 100%)', color: '#fff', fontWeight: 700, fontSize: 14, boxShadow: '0 8px 28px rgba(56,189,248,0.30), inset 0 1px 0 rgba(255,255,255,0.18)' }}>
            Get your branded app
            <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {/* ══ COL 2: Large iPhone (center) ══ */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isTablet ? '0' : '0 32px', position: 'relative', zIndex: 2 }}>
          <div
            ref={phoneRef}
            style={{
              opacity: 0,
              filter: 'drop-shadow(0 40px 90px rgba(0,0,0,0.65)) drop-shadow(0 0 44px rgba(56,189,248,0.16))',
            }}
          >
            <IPhoneMockup />
          </div>
        </div>

        {/* ══ COL 3: Nurse photo + Absolutely-positioned cards ══ */}
        {!isMobile && (
          <div style={{
            flex: 1,
            position: 'relative',
            minHeight: 660,
            alignSelf: 'stretch',
          }}>
            {/* Nurse image — fills right portion */}
            <img
              src="/nurse.png"
              alt="Healthcare worker"
              style={{
                position: 'absolute', right: 0, top: 0,
                width: '68%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                display: 'block',
                zIndex: 0,
              }}
            />
            {/* Smooth left-to-right gradient blend */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(to right,rgba(9,21,48,1) 0%,rgba(9,21,48,0.85) 20%,rgba(9,21,48,0.50) 40%,rgba(9,21,48,0.18) 58%,rgba(9,21,48,0.04) 72%,transparent 85%)',
            }} />
            {/* Bottom fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, zIndex: 1, background: 'linear-gradient(to top,rgba(9,21,48,0.55) 0%,transparent 100%)' }} />

            {/* Glowing connection line (left edge = phone connection) */}
            <div style={{ position: 'absolute', top: '32%', left: -20, zIndex: 3 }}>
              <GlowLine count={6} delay={0} />
            </div>
            {/* Second line mid */}
            <div style={{ position: 'absolute', top: '58%', left: -14, zIndex: 3 }}>
              <GlowLine count={4} delay={0.4} />
            </div>

            {/* ── 6 notification cards (absolutely positioned) ── */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
              {CARDS.map((card, i) => (
                <NotifCard key={i} card={card} pos={POSITIONS[i]} pulse={pulseIdx === i} />
              ))}
            </div>
          </div>
        )}

        {/* Mobile: 2-col grid */}
        {isMobile && (
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CARDS.slice(0, 4).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 14, padding: '10px 12px 11px', boxShadow: '0 6px 28px rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.9)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.icon}</div>
                  <span style={{ fontSize: 8, fontWeight: 800, color: card.typeColor, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{card.type}</span>
                </div>
                <p style={{ fontSize: 11.5, fontWeight: 800, color: '#0F172A', margin: '0 0 3px' }}>{card.title}</p>
                {card.body.split('\n').slice(0, 1).map((l: string, j: number) => <p key={j} style={{ fontSize: 10, color: '#64748B', margin: 0 }}>{l}</p>)}
                {card.action && <p style={{ fontSize: 10, fontWeight: 700, color: card.actionColor, marginTop: 3 }}>{card.action}</p>}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
