import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { useWindowWidth } from '../hooks/useWindowWidth';

gsap.registerPlugin(ScrollTrigger);

/* ─── iOS banner — drops from TOP of phone, no left overlap ─── */
const SMS_NOTIFS = [
  { id: 0, from: 'Sarah · Agency', msg: 'Your shift docs are ready...', time: 'now', action: 'Reply' },
  { id: 1, from: 'Tom · Ward B',   msg: 'Can you cover Thursday?...',  time: '1m',  action: 'Reply' },
  { id: 2, from: 'Agency Chat',    msg: 'New vacancy: Band 6...',      time: '2m',  action: 'View'  },
];
function FloatingNotification() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % SMS_NOTIFS.length); setShow(true); }, 380);
    }, 3200);
    return () => clearInterval(t);
  }, []);
  const n = SMS_NOTIFS[idx];
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={idx}
          initial={{ y: -48, opacity: 0, scale: 0.92 }}
          animate={{ y: 0,   opacity: 1, scale: 1 }}
          exit={{   y: -48, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            /* sits just above the phone, centred on it */
            position: 'absolute',
            top: -72,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 70,
            width: 270,
            background: 'rgba(20,28,48,0.90)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 18,
            boxShadow: '0 16px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.10)',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px 9px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(150deg,#4CD964,#2DB84A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(45,184,74,0.38)' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="white"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>MESSAGES</span>
                <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.30)', fontWeight: 500 }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 12.5, fontWeight: 800, color: '#FFF', margin: '0 0 2px', lineHeight: 1.15 }}>{n.from}</p>
              <p style={{ fontSize: 11, color: 'rgba(186,210,255,0.60)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, margin: 0 }}>{n.msg}</p>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button style={{ flex: 1, padding: '8px 0', background: 'rgba(45,184,74,0.12)', border: 'none', borderRight: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', fontSize: 11.5, fontWeight: 700, color: '#4CD964' }}>{n.action}</button>
            <button style={{ flex: 1, padding: '8px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.28)' }}>Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Apple Watch mockup ─── */
function SmartWatch() {
  const [step, setStep] = useState(0);
  const watchMsgs = [
    { label: 'SHIFT TODAY', text: 'Ward B · 07:00', color: '#38BDF8' },
    { label: 'CLOCK IN', text: 'Tap to start', color: '#34D399' },
    { label: 'NEW BOOKING', text: 'May 26 · HCA', color: '#A78BFA' },
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % watchMsgs.length), 3000);
    return () => clearInterval(t);
  }, []);
  const m = watchMsgs[step];
  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      {/* Crown button */}
      <div style={{ position: 'absolute', right: -5, top: '28%', width: 5, height: 22, background: 'linear-gradient(to right,#5A5A5F,#8E8E93)', borderRadius: '0 3px 3px 0', boxShadow: '2px 0 4px rgba(0,0,0,0.40)' }} />
      <div style={{ position: 'absolute', right: -5, top: '48%', width: 5, height: 14, background: 'linear-gradient(to right,#5A5A5F,#8E8E93)', borderRadius: '0 2px 2px 0', boxShadow: '2px 0 4px rgba(0,0,0,0.40)' }} />

      {/* Watch body */}
      <div style={{
        width: 82, height: 94,
        borderRadius: 26,
        background: 'linear-gradient(160deg,#2C2C2E,#1C1C1E)',
        padding: 3,
        boxShadow: '0 24px 60px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.14)',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 24,
          background: '#000', overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 4, padding: '8px 8px',
        }}>
          {/* Ambient glow */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${m.color}18 0%, transparent 70%)`, transition: 'background 0.4s' }} />

          {/* Time */}
          <p style={{ fontSize: 18, fontWeight: 800, color: '#FFF', margin: 0, letterSpacing: '-0.03em', lineHeight: 1, position: 'relative', zIndex: 1 }}>
            {new Date().getHours().toString().padStart(2,'0')}:{new Date().getMinutes().toString().padStart(2,'0')}
          </p>

          {/* Animated notification */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{ width: '100%', position: 'relative', zIndex: 1 }}
            >
              <div style={{ background: `${m.color}1A`, border: `1px solid ${m.color}44`, borderRadius: 8, padding: '4px 6px', textAlign: 'center' }}>
                <p style={{ fontSize: 6.5, fontWeight: 800, color: m.color, margin: '0 0 2px', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{m.label}</p>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#FFF', margin: 0, letterSpacing: '-0.01em' }}>{m.text}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom health ring arc */}
          <svg width={40} height={10} viewBox="0 0 40 10" style={{ position: 'relative', zIndex: 1 }}>
            <path d="M4 8 Q20 0 36 8" stroke={m.color} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.6}/>
            <motion.circle r={2.5} fill={m.color} style={{ filter: `drop-shadow(0 0 4px ${m.color})` }}
              animate={{ opacity: [0.4,1,0.4] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M4 8 Q20 0 36 8" />
            </motion.circle>
          </svg>
        </div>
      </div>

      {/* Watch band stubs */}
      <div style={{ width: 68, height: 12, background: 'linear-gradient(to bottom,#1C1C1E,#111)', borderRadius: '0 0 6px 6px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.50)' }} />
    </div>
  );
}

/* ─── iPhone 15 Pro ─── */
function IPhoneMockup({ scale = 1 }: { scale?: number }) {
  const W = Math.round(308 * scale);
  const H = Math.round(664 * scale);
  const R = Math.round(58 * scale);
  const Ri = Math.round(56 * scale);
  return (
    <div style={{ position: 'relative', userSelect: 'none', width: W, height: H }}>
      {[
        { left: true,  top: Math.round(122*scale), h: Math.round(34*scale) },
        { left: true,  top: Math.round(178*scale), h: Math.round(62*scale) },
        { left: true,  top: Math.round(256*scale), h: Math.round(62*scale) },
        { left: false, top: Math.round(192*scale), h: Math.round(84*scale) },
      ].map((btn, i) => (
        <div key={i} style={{
          position: 'absolute',
          [btn.left ? 'left' : 'right']: -4,
          top: btn.top, width: 4, height: btn.h,
          background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)',
          borderRadius: btn.left ? '3px 0 0 3px' : '0 3px 3px 0',
          boxShadow: `${btn.left ? '-' : ''}2px 0 5px rgba(0,0,0,0.36)`,
        }} />
      ))}
      <div style={{
        width: W, height: H, borderRadius: R,
        background: 'linear-gradient(160deg,#D8D8DA 0%,#BABABE 22%,#9C9CA0 46%,#B2B2B6 72%,#D0D0D2 100%)',
        padding: 3,
        boxShadow: '0 64px 150px rgba(0,0,0,0.72),0 24px 60px rgba(0,0,0,0.42),0 0 0 0.5px rgba(255,255,255,0.20),inset 0 1px 0 rgba(255,255,255,0.40)',
        position: 'relative',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: Ri, background: '#000', overflow: 'hidden', position: 'relative' }}>
          <img src="/mobile_app_main_screen.jpeg" alt="Logezy App" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          <div style={{ position: 'absolute', top: Math.round(14*scale), left: '50%', transform: 'translateX(-50%)', width: Math.round(140*scale), height: Math.round(38*scale), background: '#000', borderRadius: 22, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: Math.round(10*scale), height: Math.round(10*scale), borderRadius: '50%', background: '#1a1a1a' }} />
            <div style={{ width: Math.round(6*scale), height: Math.round(6*scale), borderRadius: '50%', background: '#222' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.055) 0%,transparent 48%)', pointerEvents: 'none', zIndex: 20, borderRadius: Ri }} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: -44, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.18) 0%,transparent 68%)', filter: 'blur(32px)', zIndex: -1, pointerEvents: 'none' }} />
      {scale === 1 && <FloatingNotification />}
    </div>
  );
}

/* ─── Notification stream cards ─── */
const STREAM_CARDS = [
  { id: 0, type: 'SHIFT CONFIRMED', typeColor: '#38BDF8', iconBg: 'rgba(56,189,248,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
    title: 'Shift Confirmed ✓', snippet: 'NHS Ward B · 07:00–19:00' },
  { id: 1, type: 'NEW BOOKING', typeColor: '#34D399', iconBg: 'rgba(52,211,153,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>,
    title: 'New Booking Available', snippet: 'May 26 · HCA · Tap to view' },
  { id: 2, type: 'TIMESHEET', typeColor: '#A78BFA', iconBg: 'rgba(167,139,250,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    title: 'Timesheet Approved', snippet: '32h 15m · Week May 19' },
  { id: 3, type: 'COMPLIANCE', typeColor: '#FBBF24', iconBg: 'rgba(251,191,36,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: 'Document Due', snippet: 'DBS expires in 7 days...' },
  { id: 4, type: 'AGENCY MESSAGE', typeColor: '#34D399', iconBg: 'rgba(52,211,153,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Message from Agency', snippet: 'Important update about...' },
  { id: 5, type: 'REMINDER', typeColor: '#38BDF8', iconBg: 'rgba(56,189,248,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Clock In Reminder', snippet: "Don't forget to clock in..." },
];
type StreamCard = typeof STREAM_CARDS[number] & { uid: number };

function NotifStream({ compact = false }: { compact?: boolean }) {
  const [cards, setCards] = useState<StreamCard[]>([]);
  const idxRef = useRef(0);
  const uidRef = useRef(0);
  const W = compact ? 200 : 228;

  useEffect(() => {
    const add = () => {
      const card = { ...STREAM_CARDS[idxRef.current % STREAM_CARDS.length], uid: uidRef.current++ };
      idxRef.current++;
      setCards(prev => [...prev.slice(-2), card]);
    };
    add();
    const t = setInterval(add, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: W }}>
      <AnimatePresence mode="popLayout">
        {cards.map(card => (
          <motion.div key={card.uid} layout
            initial={{ opacity: 0, x: 40, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            style={{
              background: 'rgba(10,25,60,0.80)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: compact ? 12 : 16,
              padding: compact ? '8px 10px 9px' : '10px 13px 11px',
              boxShadow: `0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.09), 0 0 18px ${card.typeColor}20`,
              border: '1px solid rgba(255,255,255,0.10)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${card.typeColor}55, transparent)` }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: compact ? 4 : 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: compact ? 18 : 22, height: compact ? 18 : 22, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 8px ${card.typeColor}44` }}>
                  {card.icon}
                </div>
                <span style={{ fontSize: compact ? 7 : 8, fontWeight: 800, color: card.typeColor, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>{card.type}</span>
              </div>
              <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: card.typeColor, boxShadow: `0 0 6px ${card.typeColor}` }}
                animate={{ opacity: [1,0.2,1], scale: [1,1.5,1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            </div>
            <p style={{ fontSize: compact ? 11 : 12, fontWeight: 700, color: '#FFFFFF', margin: '0 0 2px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{card.title}</p>
            <p style={{ fontSize: compact ? 9 : 10, color: 'rgba(186,210,255,0.60)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{card.snippet}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Travelling-dot connector ─── */
function GlowConnector({ length = 56, vertical = false }: { length?: number; vertical?: boolean }) {
  const W = vertical ? 2 : length;
  const H = vertical ? length : 2;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', flexShrink: 0 }}>
      <line x1={vertical?1:0} y1={vertical?0:1} x2={vertical?1:W} y2={vertical?H:1}
        stroke="rgba(56,189,248,0.20)" strokeWidth={1.5} strokeDasharray="4 5" />
      <motion.circle r={3} fill="#38BDF8" style={{ filter: 'drop-shadow(0 0 5px #38BDF8)' }}
        animate={vertical ? { cy:[0,H,0], cx:1, opacity:[0,1,1,0] } : { cx:[0,W,0], cy:1, opacity:[0,1,1,0] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: 'linear' }} />
    </svg>
  );
}

function GlowNode({ color = '#38BDF8', size = 9 }: { color?: string; size?: number }) {
  return (
    <motion.div style={{ width: size, height: size, borderRadius: '50%', background: color, boxShadow: `0 0 10px 3px ${color}88`, flexShrink: 0 }}
      animate={{ scale: [1,1.4,1], opacity: [0.75,1,0.75] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
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
  const isMobile   = vw < 640;
  const isTablet   = vw >= 640 && vw < 1120;
  const isDesktop  = vw >= 1120;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' })
        .fromTo(phoneRef.current, { opacity: 0, y: 56, scale: 0.91 }, { opacity: 1, y: 0, scale: 1, duration: 0.88, ease: 'power3.out' }, '-=0.44');
      gsap.to(phoneRef.current, { y: -10, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── shared left content ── */
  const LeftContent = (
    <div ref={leftRef} style={{
      flex: '0 0 auto',
      width: isMobile ? '100%' : isTablet ? '100%' : 460,
      opacity: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      paddingRight: isDesktop ? 20 : 0,
      textAlign: isMobile ? 'center' : 'left',
    }}>
      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 999, background: 'rgba(56,189,248,0.10)', border: '1.5px solid rgba(56,189,248,0.28)', marginBottom: 22, alignSelf: isMobile ? 'center' : 'flex-start' }}>
        <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 13, height: 13 }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: '#7DD3FC', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Worker Mobile App</span>
      </div>

      {/* Headline */}
      <h2 style={{ fontSize: 'clamp(1.9rem,3.2vw,3.2rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.07, marginBottom: 16, textAlign: isMobile ? 'center' : 'left' }}>
        Your workforce,{' '}
        <span style={{ display: 'inline', background: 'linear-gradient(90deg,#38BDF8 0%,#818CF8 55%,#C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          always connected.
        </span>
        <br />
        <span style={{ fontSize: '0.68em', fontWeight: 700, color: 'rgba(255,255,255,0.52)', letterSpacing: '-0.02em' }}>
          Shifts · Timesheets · Compliance · Chat
        </span>
      </h2>

      <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(255,255,255,0.70)', marginBottom: 24, maxWidth: isMobile ? '100%' : 420 }}>
        A branded mobile app your temps actually want to use — shifts, timesheets, documents and chat. iOS &amp; Android.
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
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(56,189,248,0.12)', border: '1.5px solid rgba(56,189,248,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, boxShadow: '0 0 8px rgba(56,189,248,0.18)' }}>
              <CheckCircle weight="fill" style={{ color: '#38BDF8', width: 11, height: 11 }} />
            </div>
            <span style={{ fontSize: 13.5, color: '#FFFFFF', lineHeight: 1.55 }}>{item}</span>
          </div>
        ))}
      </div>

      <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 14, textDecoration: 'none', background: 'linear-gradient(135deg,#1795C7 0%,#5B6CF9 100%)', color: '#fff', fontWeight: 700, fontSize: 14, boxShadow: '0 10px 32px rgba(56,189,248,0.28), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.16)', alignSelf: isMobile ? 'center' : 'flex-start', letterSpacing: '-0.01em' }}>
        Get your branded app
        <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
      </a>
    </div>
  );

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(160deg,#060F28 0%,#091530 40%,#0A1A38 100%)',
      padding: isMobile ? '56px 20px 64px' : isTablet ? '64px 28px 72px' : '72px 0 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.022, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', top: '50%', left: '42%', transform: 'translate(-50%,-50%)', width: 900, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.06) 0%,transparent 65%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* ── Nurse image — full right, show wrist/mid-body ── */}
      {!isMobile && (
        <>
          <img src="/nurse.png" alt="Healthcare worker" style={{
            position: 'absolute', right: -20, top: 0, bottom: 0,
            height: '100%',
            width: isTablet ? '42%' : '50%',
            objectFit: 'cover',
            /* shifted down so wrist / watch area is visible */
            objectPosition: 'center 30%',
            zIndex: 1, userSelect: 'none', pointerEvents: 'none',
          }} />
          {/* fade left edge of nurse */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right,rgba(9,21,48,1) 0%,rgba(9,21,48,0.97) 28%,rgba(9,21,48,0.78) 46%,rgba(9,21,48,0.38) 62%,rgba(9,21,48,0.06) 76%,transparent 90%)' }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to bottom,rgba(6,15,40,0.28) 0%,transparent 14%,transparent 84%,rgba(6,15,40,0.34) 100%)' }} />
        </>
      )}

      {/* ════════════════ DESKTOP (≥1120px) ════════════════ */}
      {isDesktop && (
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 52px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0, position: 'relative', zIndex: 3, minHeight: 700 }}>

          {/* Col 1: Text */}
          {LeftContent}

          {/* Col 2: Phone + connector + notif cards */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 4, marginLeft: 32 }}>
            {/* Phone */}
            <div ref={phoneRef} style={{ opacity: 0, filter: 'drop-shadow(0 44px 100px rgba(0,0,0,0.72)) drop-shadow(0 0 48px rgba(56,189,248,0.14))', flexShrink: 0 }}>
              <IPhoneMockup scale={1} />
            </div>

            {/* Connector: phone → notif cards */}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
              <GlowNode color="#38BDF8" size={8} />
              <GlowConnector length={40} />
              <GlowNode color="#818CF8" size={8} />
              <div style={{ width: 10 }} />
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                <NotifStream />
              </motion.div>
            </div>

            {/* Smartwatch — floats lower-right, connected by vertical line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }}
              style={{ position: 'absolute', bottom: -30, right: -100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
            >
              {/* Vertical glow line from card area down to watch */}
              <GlowConnector length={40} vertical />
              <GlowNode color="#C084FC" size={7} />
              <div style={{ height: 8 }} />
              <SmartWatch />
            </motion.div>
          </div>
        </div>
      )}

      {/* ════════════════ TABLET (640–1119px) ════════════════ */}
      {isTablet && (
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, position: 'relative', zIndex: 3 }}>
          {LeftContent}

          {/* Phone + notif side by side */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0, flexWrap: 'nowrap' }}>
            <div ref={phoneRef} style={{ opacity: 0, filter: 'drop-shadow(0 40px 90px rgba(0,0,0,0.68)) drop-shadow(0 0 36px rgba(56,189,248,0.14))', flexShrink: 0 }}>
              <IPhoneMockup scale={0.85} />
            </div>

            {/* Connector */}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 6 }}>
              <GlowNode color="#38BDF8" size={7} />
              <GlowConnector length={28} />
              <GlowNode color="#818CF8" size={7} />
              <div style={{ width: 8 }} />
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.35 }}>
                <NotifStream compact />
              </motion.div>
            </div>

            {/* Watch beside notif stack */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 18, gap: 6 }}>
              <GlowNode color="#C084FC" size={7} />
              <GlowConnector length={28} vertical />
              <SmartWatch />
            </div>
          </div>
        </div>
      )}

      {/* ════════════════ MOBILE (<640px) ════════════════ */}
      {isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, position: 'relative', zIndex: 3 }}>
          {LeftContent}

          {/* Phone (scaled) */}
          <div ref={phoneRef} style={{ opacity: 0, filter: 'drop-shadow(0 32px 72px rgba(0,0,0,0.68))', flexShrink: 0 }}>
            <IPhoneMockup scale={0.70} />
          </div>

          {/* Connector → notif grid */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <GlowNode color="#38BDF8" size={6} />
            <GlowConnector length={20} />
            <GlowNode color="#818CF8" size={6} />
          </div>

          {/* 2-col notif grid */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            {STREAM_CARDS.slice(0, 4).map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.38, delay: i * 0.09 }}
                style={{ background: 'rgba(10,25,60,0.80)', backdropFilter: 'blur(16px)', borderRadius: 13, padding: '10px 11px', boxShadow: '0 6px 26px rgba(0,0,0,0.38)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.icon}</div>
                  <span style={{ fontSize: 7, fontWeight: 800, color: card.typeColor, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{card.type}</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', margin: '0 0 2px', lineHeight: 1.2 }}>{card.title}</p>
                <p style={{ fontSize: 9.5, color: 'rgba(186,210,255,0.58)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{card.snippet}</p>
              </motion.div>
            ))}
          </div>

          {/* Watch at bottom for mobile */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <GlowConnector length={24} vertical />
            <GlowNode color="#C084FC" size={6} />
            <SmartWatch />
          </div>
        </div>
      )}

    </section>
  );
}
