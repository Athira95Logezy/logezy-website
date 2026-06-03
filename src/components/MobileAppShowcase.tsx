import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating SMS on phone (1 by 1, truncated) ─── */
const SMS_NOTIFS = [
  { id: 0, from: 'Sarah · Agency', msg: 'Your shift docs are ready...', time: 'now', action: 'Reply' },
  { id: 1, from: 'Tom · Ward B',   msg: 'Can you cover Thursday?...',   time: '1m',  action: 'Reply' },
  { id: 2, from: 'Agency Chat',    msg: 'New vacancy: Band 6...',       time: '2m',  action: 'View'  },
];
function FloatingNotification() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % SMS_NOTIFS.length); setShow(true); }, 420);
    }, 3200);
    return () => clearInterval(t);
  }, []);
  const n = SMS_NOTIFS[idx];
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div key={idx}
          initial={{ x: -260, opacity: 0, scale: 0.88 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -260, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{
            position: 'absolute', top: 215, left: -145, zIndex: 70, width: 275,
            background: '#fff', borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.28), 0 6px 18px rgba(0,0,0,0.14)',
            border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px 9px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(150deg,#4CD964,#2DB84A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(45,184,74,0.38)' }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,0,0,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>MESSAGES</span>
                <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.26)', fontWeight: 500 }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#111', margin: '0 0 2px', lineHeight: 1.15 }}>{n.from}</p>
              <p style={{ fontSize: 11.5, color: 'rgba(0,0,0,0.42)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, margin: 0 }}>{n.msg}</p>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <button style={{ flex: 1, padding: '8px 0', background: 'rgba(45,184,74,0.07)', border: 'none', borderRight: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#16A34A' }}>{n.action}</button>
            <button style={{ flex: 1, padding: '8px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.30)' }}>Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── iPhone 15 Pro ─── */
function IPhoneMockup() {
  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <div style={{ position: 'absolute', left: -4, top: 122, width: 4, height: 34, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.36)' }} />
      <div style={{ position: 'absolute', left: -4, top: 178, width: 4, height: 62, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.36)' }} />
      <div style={{ position: 'absolute', left: -4, top: 256, width: 4, height: 62, background: 'linear-gradient(to left,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '3px 0 0 3px', boxShadow: '-2px 0 5px rgba(0,0,0,0.36)' }} />
      <div style={{ position: 'absolute', right: -4, top: 192, width: 4, height: 84, background: 'linear-gradient(to right,#8E8E93,#C7C7CC,#8E8E93)', borderRadius: '0 3px 3px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.36)' }} />

      <div style={{
        width: 308, height: 664, borderRadius: 58,
        background: 'linear-gradient(160deg,#D8D8DA 0%,#BABABE 22%,#9C9CA0 46%,#B2B2B6 72%,#D0D0D2 100%)',
        padding: '3px',
        boxShadow: '0 64px 150px rgba(0,0,0,0.72),0 24px 60px rgba(0,0,0,0.42),0 0 0 0.5px rgba(255,255,255,0.20),inset 0 1px 0 rgba(255,255,255,0.40)',
        position: 'relative',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 56, background: '#000', overflow: 'hidden', position: 'relative' }}>
          <img src="/mobile_app_main_screen.jpeg" alt="Logezy App" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 140, height: 38, background: '#000', borderRadius: 22, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#222' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.055) 0%,transparent 48%)', pointerEvents: 'none', zIndex: 20, borderRadius: 56 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
        {[...Array(7)].map((_, i) => <div key={i} style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: 'rgba(0,0,0,0.28)' }} />)}
      </div>

      <FloatingNotification />

      <div style={{ position: 'absolute', inset: -44, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.18) 0%,transparent 68%)', filter: 'blur(30px)', zIndex: -1, pointerEvents: 'none' }} />
    </div>
  );
}

/* ─── Notification stream data ─── */
const STREAM_CARDS = [
  { id: 0, type: 'SHIFT CONFIRMED', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
    title: 'Shift Confirmed ✓', snippet: 'NHS Ward B · 07:00–19:00' },
  { id: 1, type: 'NEW BOOKING', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>,
    title: 'New Booking Available', snippet: 'May 26 · HCA · Tap to view' },
  { id: 2, type: 'TIMESHEET', typeColor: '#8B5CF6', iconBg: '#F5F3FF',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    title: 'Timesheet Approved', snippet: '32h 15m · Week May 19' },
  { id: 3, type: 'COMPLIANCE', typeColor: '#F59E0B', iconBg: '#FFFBEB',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    title: 'Document Due', snippet: 'DBS expires in 7 days...' },
  { id: 4, type: 'AGENCY MESSAGE', typeColor: '#10B981', iconBg: '#ECFDF5',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: 'Message from Agency', snippet: 'Important update about...' },
  { id: 5, type: 'REMINDER', typeColor: '#3B82F6', iconBg: '#EFF6FF',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Clock In Reminder', snippet: "Don't forget to clock in..." },
];

type StreamCard = typeof STREAM_CARDS[number] & { uid: number };

/* ─── 1-by-1 animated notification stream ─── */
function NotifStream() {
  const [cards, setCards] = useState<StreamCard[]>([]);
  const idxRef = useRef(0);
  const uidRef = useRef(0);

  useEffect(() => {
    const add = () => {
      const card = { ...STREAM_CARDS[idxRef.current % STREAM_CARDS.length], uid: uidRef.current++ };
      idxRef.current++;
      setCards(prev => [...prev.slice(-2), card]); // keep max 3 visible
    };
    add();
    const t = setInterval(add, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 230 }}>
      <AnimatePresence mode="popLayout">
        {cards.map(card => (
          <motion.div
            key={card.uid}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.90 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.94, x: -10 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderRadius: 14,
              padding: '9px 12px 10px',
              boxShadow: '0 8px 36px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.09)',
              border: '1px solid rgba(255,255,255,0.94)',
            }}
          >
            {/* Type + time */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {card.icon}
                </div>
                <span style={{ fontSize: 7.5, fontWeight: 800, color: card.typeColor, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
                  {card.type}
                </span>
              </div>
              <motion.div
                style={{ width: 6, height: 6, borderRadius: '50%', background: card.typeColor, flexShrink: 0 }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
            </div>
            {/* Title */}
            <p style={{ fontSize: 11.5, fontWeight: 800, color: '#0F172A', margin: '0 0 3px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              {card.title}
            </p>
            {/* Truncated snippet — 1 line only */}
            <p style={{ fontSize: 10, color: '#64748B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
              {card.snippet}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Glowing connection dots ─── */
function GlowStrip({ dots = 5, delay = 0, vertical = false }: { dots?: number; delay?: number; vertical?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'center', gap: 4 }}>
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' })
        .fromTo(phoneRef.current, { opacity: 0, y: 56, scale: 0.91 }, { opacity: 1, y: 0, scale: 1, duration: 0.88, ease: 'power3.out' }, '-=0.44');
      gsap.to(phoneRef.current, { y: -8, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
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
      {/* Ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'absolute', top: '40%', left: '38%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 65%)', filter: 'blur(72px)' }} />
        <div style={{ position: 'absolute', top: '25%', left: '10%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      <div style={{
        maxWidth: 1360, margin: '0 auto',
        padding: isMobile ? 0 : '0 48px',
        display: 'flex',
        flexDirection: isTablet ? 'column' : 'row',
        alignItems: isTablet ? 'center' : 'stretch',
        gap: isTablet ? 40 : 0,
        position: 'relative', zIndex: 1,
        minHeight: isTablet ? 'auto' : 660,
      }}>

        {/* ═══ COL 1: LEFT CONTENT ═══ */}
        <div
          ref={leftRef}
          style={{
            flex: '0 0 auto',
            width: isTablet ? '100%' : 318,
            opacity: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: isTablet ? 0 : 12,
          }}
        >
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(56,189,248,0.12)', border: '1.5px solid rgba(56,189,248,0.32)', marginBottom: 20, alignSelf: 'flex-start' }}>
            <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 13, height: 13 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#7DD3FC', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Worker Mobile App</span>
          </div>

          {/* Headline — left-aligned, constrained */}
          <h2 style={{
            fontSize: 'clamp(2rem,3vw,2.9rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            marginBottom: 16,
            maxWidth: 290,
            textAlign: 'left',
          }}>
            Your workforce,<br />
            <span style={{
              background: 'linear-gradient(125deg,#22D3EE 0%,#818CF8 46%,#C084FC 76%,#EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              in their pocket.
            </span>
          </h2>

          <p style={{ fontSize: 14.5, lineHeight: 1.74, color: 'rgba(186,220,255,0.80)', marginBottom: 24, maxWidth: 290 }}>
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
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(56,189,248,0.16)', border: '1.5px solid rgba(56,189,248,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <CheckCircle weight="fill" style={{ color: '#38BDF8', width: 10, height: 10 }} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(210,232,255,0.88)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA — no app store badges */}
          <a
            href="https://booking.logezy.co/#/67044000000025008"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '12px 24px', borderRadius: 13,
              textDecoration: 'none',
              background: 'linear-gradient(135deg,#1795C7 0%,#5B6CF9 100%)',
              color: '#fff', fontWeight: 700, fontSize: 13.5,
              boxShadow: '0 8px 28px rgba(56,189,248,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
              alignSelf: 'flex-start',
            }}
          >
            Get your branded app
            <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
          </a>
        </div>

        {/* ═══ COL 2: iPhone (center) ═══ */}
        <div style={{
          flex: '0 0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: isTablet ? 0 : '0 24px',
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

          {/* Horizontal connector → notification stream */}
          {!isTablet && (
            <div style={{ position: 'absolute', right: -10, top: '36%', zIndex: 5 }}>
              <GlowStrip dots={5} delay={0} />
            </div>
          )}
        </div>

        {/* ═══ COL 3: Notification stream + Nurse ═══ */}
        {!isMobile && (
          <div style={{
            flex: 1, position: 'relative',
            minHeight: 660,
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Nurse image — far right, face clear */}
            <img
              src="/nurse.png"
              alt="Healthcare worker"
              style={{
                position: 'absolute', right: 0, top: 0,
                width: '55%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                display: 'block', zIndex: 0,
              }}
            />
            {/* Gradient fade — left half dark, transitions to transparent */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'linear-gradient(to right,rgba(9,21,48,1) 0%,rgba(9,21,48,0.92) 16%,rgba(9,21,48,0.62) 35%,rgba(9,21,48,0.22) 52%,rgba(9,21,48,0.06) 65%,transparent 80%)',
            }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom,rgba(9,21,48,0.22) 0%,transparent 14%,transparent 84%,rgba(9,21,48,0.30) 100%)' }} />

            {/* ── 1-by-1 notification stream LEFT of nurse ── */}
            <div style={{ position: 'relative', zIndex: 3, paddingLeft: 12, paddingRight: 8, alignSelf: 'center' }}>
              <NotifStream />

              {/* Connector from stream → nurse watch area */}
              <div style={{ marginTop: 14, marginLeft: 8 }}>
                <GlowStrip dots={4} delay={0.4} />
              </div>
            </div>
          </div>
        )}

        {/* Mobile: small 2-col grid */}
        {isMobile && (
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {STREAM_CARDS.slice(0, 4).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.40, delay: i * 0.09 }}
                style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 13, padding: '9px 11px 10px', boxShadow: '0 6px 26px rgba(0,0,0,0.17)', border: '1px solid rgba(255,255,255,0.9)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 19, height: 19, borderRadius: 6, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.icon}</div>
                  <span style={{ fontSize: 7.5, fontWeight: 800, color: card.typeColor, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{card.type}</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#0F172A', margin: '0 0 2px', lineHeight: 1.2 }}>{card.title}</p>
                <p style={{ fontSize: 9.5, color: '#64748B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{card.snippet}</p>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
