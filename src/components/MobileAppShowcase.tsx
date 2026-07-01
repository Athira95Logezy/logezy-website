import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { useWindowWidth } from '../hooks/useWindowWidth';

gsap.registerPlugin(ScrollTrigger);

/* â"€â"€â"€ iOS banner â€" drops from TOP of phone, no left overlap â"€â"€â"€ */
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

/* ─── Realistic Apple Watch Series 9 ─── */
function SmartWatch() {
  const [step, setStep] = useState(0);
  const [now, setNow] = useState(() => { const d = new Date(); return { h: d.getHours(), m: d.getMinutes() }; });
  const watchMsgs = [
    { label: 'SHIFT TODAY', line1: 'Ward B · 07:00', line2: 'NHS Trust · London', color: '#38BDF8' },
    { label: 'CLOCK IN',    line1: 'Tap to start',   line2: 'Location verified ✓', color: '#34D399' },
    { label: 'NEW BOOKING', line1: 'May 26 · HCA',   line2: 'Primcura Care',       color: '#A78BFA' },
  ];
  useEffect(() => {
    const t1 = setInterval(() => setStep(s => (s + 1) % watchMsgs.length), 3000);
    const t2 = setInterval(() => { const d = new Date(); setNow({ h: d.getHours(), m: d.getMinutes() }); }, 10000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);
  const m = watchMsgs[step];
  const timeStr = `${now.h.toString().padStart(2,'0')}:${now.m.toString().padStart(2,'0')}`;
  const W = 94, H = 108;

  return (
    <div style={{ position: 'relative', userSelect: 'none', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.75)) drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}>

      {/* Top band stub */}
      <div style={{ width: 74, height: 18, margin: '0 auto',
        background: 'linear-gradient(to bottom, #1A1A1C 0%, #2A2A2D 40%, #1E1E20 100%)',
        borderRadius: '5px 5px 0 0',
        boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(255,255,255,0.04)',
      }} />

      {/* Main watch body */}
      <div style={{ position: 'relative', width: W, height: H }}>

        {/* Digital Crown (right side, top) */}
        <div style={{ position: 'absolute', right: -6, top: '22%', width: 7, height: 26,
          background: 'linear-gradient(to right, #3A3A3C, #6E6E73, #48484A, #8E8E93)',
          borderRadius: '0 4px 4px 0',
          boxShadow: '3px 0 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.20)',
        }}>
          {/* Crown ridges */}
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ position: 'absolute', top: 4 + i*4, left: 0, right: 0, height: 1,
              background: 'rgba(255,255,255,0.12)', borderRadius: 1 }} />
          ))}
        </div>

        {/* Side button (right side, bottom) */}
        <div style={{ position: 'absolute', right: -5, top: '54%', width: 5, height: 17,
          background: 'linear-gradient(to right, #3A3A3C, #6E6E73, #48484A)',
          borderRadius: '0 3px 3px 0',
          boxShadow: '2px 0 5px rgba(0,0,0,0.45)',
        }} />

        {/* Outer case — titanium-style frame */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 28,
          background: 'linear-gradient(145deg, #4A4A4F 0%, #2C2C2E 20%, #1C1C1E 50%, #2A2A2C 80%, #3C3C3E 100%)',
          boxShadow: [
            '0 0 0 0.5px rgba(255,255,255,0.22)',
            'inset 0 2px 0 rgba(255,255,255,0.18)',
            'inset 0 -1px 0 rgba(255,255,255,0.06)',
            'inset 1px 0 0 rgba(255,255,255,0.10)',
            'inset -1px 0 0 rgba(0,0,0,0.28)',
          ].join(', '),
        }} />

        {/* Inner bezel */}
        <div style={{
          position: 'absolute', inset: 4,
          borderRadius: 24,
          background: '#0A0A0A',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.80)',
          overflow: 'hidden',
        }}>
          {/* Screen content */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 30%, ${m.color}22 0%, #000 60%)`,
            transition: 'background 0.6s ease',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '10px 8px 8px',
            gap: 0,
          }}>
            {/* Top status bar */}
            <div style={{ position: 'absolute', top: 6, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: m.color, boxShadow: `0 0 5px ${m.color}` }} />
              <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', fontWeight: 600 }}>LOGEZY</span>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: m.color, boxShadow: `0 0 5px ${m.color}` }} />
            </div>

            {/* Time — large */}
            <p style={{ fontSize: 24, fontWeight: 300, color: '#FFFFFF', margin: 0, letterSpacing: '-0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {timeStr}
            </p>

            {/* Day / date */}
            <p style={{ fontSize: 7.5, fontWeight: 500, color: 'rgba(255,255,255,0.38)', margin: '2px 0 5px', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
              {['SUN','MON','TUE','WED','THU','FRI','SAT'][new Date().getDay()]}
            </p>

            {/* Notification card */}
            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <div style={{
                  background: `linear-gradient(135deg, ${m.color}28, ${m.color}14)`,
                  border: `1px solid ${m.color}50`,
                  borderRadius: 10,
                  padding: '5px 7px',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 0 12px ${m.color}18`,
                }}>
                  <p style={{ fontSize: 7, fontWeight: 800, color: m.color, margin: '0 0 2px', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{m.label}</p>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF', margin: '0 0 1px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{m.line1}</p>
                  <p style={{ fontSize: 7.5, fontWeight: 500, color: 'rgba(255,255,255,0.50)', margin: 0 }}>{m.line2}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Activity rings (bottom) */}
            <div style={{ marginTop: 6, position: 'relative', width: 28, height: 28 }}>
              <svg width={28} height={28} viewBox="0 0 28 28">
                {/* Outer ring track */}
                <circle cx={14} cy={14} r={12} fill="none" stroke="rgba(255,59,48,0.20)" strokeWidth={2.5} />
                <circle cx={14} cy={14} r={12} fill="none" stroke="#FF3B30" strokeWidth={2.5}
                  strokeDasharray={`${0.72 * 2 * Math.PI * 12} ${2 * Math.PI * 12}`}
                  strokeLinecap="round" transform="rotate(-90 14 14)" style={{ filter: 'drop-shadow(0 0 3px #FF3B30)' }}/>
                {/* Middle ring */}
                <circle cx={14} cy={14} r={8.5} fill="none" stroke="rgba(52,211,153,0.20)" strokeWidth={2.2} />
                <circle cx={14} cy={14} r={8.5} fill="none" stroke="#34D399" strokeWidth={2.2}
                  strokeDasharray={`${0.85 * 2 * Math.PI * 8.5} ${2 * Math.PI * 8.5}`}
                  strokeLinecap="round" transform="rotate(-90 14 14)" style={{ filter: 'drop-shadow(0 0 3px #34D399)' }}/>
                {/* Inner ring */}
                <circle cx={14} cy={14} r={5} fill="none" stroke="rgba(56,189,248,0.20)" strokeWidth={2} />
                <circle cx={14} cy={14} r={5} fill="none" stroke="#38BDF8" strokeWidth={2}
                  strokeDasharray={`${0.60 * 2 * Math.PI * 5} ${2 * Math.PI * 5}`}
                  strokeLinecap="round" transform="rotate(-90 14 14)" style={{ filter: 'drop-shadow(0 0 3px #38BDF8)' }}/>
              </svg>
            </div>
          </div>

          {/* Screen glare / reflection */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%, transparent 55%, rgba(255,255,255,0.02) 100%)',
          }} />
        </div>
      </div>

      {/* Bottom band stub */}
      <div style={{ width: 74, height: 22, margin: '0 auto',
        background: 'linear-gradient(to bottom, #2A2A2D 0%, #1E1E20 60%, #141416 100%)',
        borderRadius: '0 0 8px 8px',
        boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(255,255,255,0.03), 0 4px 14px rgba(0,0,0,0.55)',
      }} />
    </div>
  );
}

/* ─── Realistic Worker ID Card ─── */
function WorkerIDCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22,1,0.36,1] }}
      style={{ userSelect: 'none', rotate: '2deg' as any }}
    >
      {/* Plastic clip housing */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
        <div style={{
          width: 32, height: 14,
          background: 'linear-gradient(180deg,#D1D5DB 0%,#9CA3AF 50%,#6B7280 100%)',
          borderRadius: '3px 3px 0 0',
          boxShadow: '0 -1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.45)',
          position: 'relative',
        }}>
          {/* Clip slot cutout */}
          <div style={{
            position: 'absolute', left: '50%', top: 3, transform: 'translateX(-50%)',
            width: 16, height: 8, background: 'rgba(0,0,0,0.28)',
            borderRadius: 2,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.50)',
          }} />
        </div>
      </div>

      {/* Card in clear plastic sleeve */}
      <div style={{
        position: 'relative',
        width: 112,
        borderRadius: '2px 2px 5px 5px',
        /* Outer plastic sleeve */
        background: 'rgba(220,230,245,0.18)',
        padding: '3px 3px 4px',
        boxShadow: [
          '0 14px 40px rgba(0,0,0,0.55)',
          '0 4px 10px rgba(0,0,0,0.35)',
          'inset 0 0 0 1px rgba(255,255,255,0.20)',
        ].join(','),
        backdropFilter: 'blur(2px)',
      }}>

        {/* Plastic sleeve glare */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '2px 2px 5px 5px', zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.06) 30%,transparent 60%)',
        }} />

        {/* Actual card */}
        <div style={{
          width: '100%',
          borderRadius: 3,
          background: '#FFFFFF',
          overflow: 'hidden',
          position: 'relative',
        }}>

          {/* Top colour bar — NHS blue */}
          <div style={{
            height: 8,
            background: 'linear-gradient(90deg,#003087 0%,#005EB8 60%,#0072CE 100%)',
          }} />

          {/* Organisation row */}
          <div style={{
            background: '#F8FAFF',
            padding: '5px 8px 4px',
            display: 'flex', alignItems: 'center', gap: 5,
            borderBottom: '0.5px solid #E2E8F0',
          }}>
            {/* NHS cross icon */}
            <svg width={14} height={14} viewBox="0 0 20 20">
              <rect width={20} height={20} rx={2} fill="#005EB8"/>
              <rect x={7} y={2} width={6} height={16} fill="white"/>
              <rect x={2} y={7} width={16} height={6} fill="white"/>
            </svg>
            <div>
              <p style={{ fontSize: 6, fontWeight: 800, color: '#005EB8', margin: 0, letterSpacing: '0.04em' }}>NHS TRUST</p>
              <p style={{ fontSize: 5.5, color: '#64748B', margin: 0 }}>Powered by Logezy</p>
            </div>
          </div>

          {/* Photo + details row */}
          <div style={{ display: 'flex', gap: 7, padding: '7px 8px 6px' }}>

            {/* Photo box */}
            <div style={{
              width: 38, height: 46, flexShrink: 0,
              borderRadius: 2,
              background: 'linear-gradient(160deg,#C8D8E8 0%,#A8BDD0 100%)',
              border: '1px solid #CBD5E1',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)',
            }}>
              {/* Realistic silhouette */}
              <svg width={38} height={46} viewBox="0 0 38 46" style={{ display: 'block' }}>
                <rect width={38} height={46} fill="#B8CCDE"/>
                {/* Head */}
                <ellipse cx={19} cy={15} rx={8} ry={9} fill="#D4A574"/>
                {/* Hair */}
                <ellipse cx={19} cy={9} rx={8.5} ry={6} fill="#5C3D2E"/>
                <ellipse cx={11} cy={12} rx={3} ry={5} fill="#5C3D2E"/>
                <ellipse cx={27} cy={12} rx={3} ry={5} fill="#5C3D2E"/>
                {/* Neck */}
                <rect x={16} y={22} width={6} height={5} fill="#D4A574"/>
                {/* Scrubs body */}
                <path d="M5 46 Q5 30 19 28 Q33 30 33 46Z" fill="#1E3A5F"/>
                {/* White collar */}
                <path d="M15 27 L19 32 L23 27 L19 29Z" fill="#E8EEF4"/>
              </svg>
            </div>

            {/* Text details */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 9, fontWeight: 800, color: '#0F172A', margin: '0 0 2px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>Sarah<br/>Mitchell</p>
                <p style={{ fontSize: 7, fontWeight: 700, color: '#005EB8', margin: '0 0 4px', lineHeight: 1.2 }}>Registered Nurse</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 5px', borderRadius: 3, background: '#EFF6FF', border: '0.5px solid #BFDBFE' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 4px #22C55E' }} />
                  <span style={{ fontSize: 5.5, fontWeight: 700, color: '#1D4ED8', letterSpacing: '0.04em' }}>ACTIVE</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 5.5, color: '#94A3B8', margin: '0 0 1px', letterSpacing: '0.02em' }}>Staff ID</p>
                <p style={{ fontSize: 7, fontWeight: 700, color: '#334155', margin: 0, letterSpacing: '0.04em', fontFamily: 'monospace' }}>SM-4821</p>
              </div>
            </div>
          </div>

          {/* Barcode strip */}
          <div style={{ padding: '0 8px 6px' }}>
            <svg width="100%" height={18} viewBox="0 0 96 18" preserveAspectRatio="none">
              {[2,1,1,2,1,3,1,1,2,1,1,3,1,2,1,1,2,1,3,1,1,2,1,1,2,1,3,1,2,1,1,1].map((w,i,arr) => {
                const total = arr.reduce((a,b)=>a+b,0);
                const x = arr.slice(0,i).reduce((a,b)=>a+b,0) * (96/total);
                const fw = w * (96/total);
                return i%2===0 ? <rect key={i} x={x} y={1} width={fw} height={14} rx={0.3} fill="#1E293B"/> : null;
              })}
            </svg>
            <p style={{ fontSize: 5, color: '#94A3B8', textAlign: 'center', margin: '1px 0 0', letterSpacing: '0.15em', fontFamily: 'monospace' }}>NHS·LGZ·0004821·B</p>
          </div>

          {/* Bottom accent */}
          <div style={{ height: 5, background: 'linear-gradient(90deg,#003087 0%,#005EB8 50%,#0072CE 100%)' }} />
        </div>
      </div>
    </motion.div>
  );
}

/* â"€â"€â"€ iPhone 15 Pro â"€â"€â"€ */
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
          <img src="/mobile_app_main_screen.webp" alt="Logezy App" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
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

/* â"€â"€â"€ Notification stream cards â"€â"€â"€ */
const STREAM_CARDS = [
  { id: 0, type: 'SHIFT CONFIRMED', typeColor: '#38BDF8', iconBg: 'rgba(56,189,248,0.15)',
    icon: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
    title: 'Shift Confirmed âœ"', snippet: 'NHS Ward B · 07:00â€"19:00' },
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

/* Watch icon SVG */
const WatchIcon = ({ color }: { color: string }) => (
  <svg width={9} height={11} viewBox="0 0 9 11" fill="none">
    <rect x={1} y={2} width={7} height={7} rx={2} stroke={color} strokeWidth={1.2}/>
    <rect x={3} y={0} width={3} height={2.5} rx={0.6} fill={color} opacity={0.7}/>
    <rect x={3} y={8.5} width={3} height={2.5} rx={0.6} fill={color} opacity={0.7}/>
    <line x1={4.5} y1={4} x2={4.5} y2={5.8} stroke={color} strokeWidth={1} strokeLinecap="round"/>
    <line x1={4.5} y1={5.8} x2={6} y2={5.8} stroke={color} strokeWidth={1} strokeLinecap="round"/>
  </svg>
);

function NotifStream({ compact = false }: { compact?: boolean }) {
  const [cards, setCards] = useState<StreamCard[]>([]);
  const idxRef = useRef(0);
  const uidRef = useRef(0);
  const W = compact ? 210 : 240;

  useEffect(() => {
    const add = () => {
      const card = { ...STREAM_CARDS[idxRef.current % STREAM_CARDS.length], uid: uidRef.current++ };
      idxRef.current++;
      setCards(prev => [...prev.slice(-2), card]);
    };
    add();
    const t = setInterval(add, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 7 : 9, width: W }}>
      <AnimatePresence mode="popLayout">
        {cards.map(card => (
          <motion.div key={card.uid} layout
            initial={{ opacity: 0, x: 36, scale: 0.90 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ position: 'relative' }}
          >
            {/* Haptic ripple on entry */}
            <motion.div
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 0, scale: 1.12 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: -3, borderRadius: compact ? 15 : 19,
                border: `1.5px solid ${card.typeColor}`,
                pointerEvents: 'none',
              }}
            />

            {/* Card */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(12,24,58,0.92) 0%, rgba(8,18,44,0.96) 100%)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: compact ? 14 : 18,
              overflow: 'hidden',
              boxShadow: [
                `0 10px 44px rgba(0,0,0,0.52)`,
                `0 0 0 1px rgba(255,255,255,0.10)`,
                `0 0 22px ${card.typeColor}18`,
              ].join(', '),
            }}>
              {/* Top accent line */}
              <div style={{ height: 2, background: `linear-gradient(to right, transparent 0%, ${card.typeColor}80 30%, ${card.typeColor} 50%, ${card.typeColor}80 70%, transparent 100%)` }} />

              {/* "From Watch" source pill */}
              <div style={{ padding: compact ? '5px 10px 0' : '6px 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 7px 2px 5px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <WatchIcon color={card.typeColor} />
                  <span style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>from Watch</span>
                </div>
                <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>now</span>
              </div>

              {/* Main content */}
              <div style={{ padding: compact ? '5px 10px 8px' : '6px 12px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: compact ? 4 : 5 }}>
                  {/* App icon */}
                  <div style={{
                    width: compact ? 24 : 28, height: compact ? 24 : 28, borderRadius: compact ? 7 : 8, flexShrink: 0,
                    background: `linear-gradient(135deg, ${card.iconBg}, ${card.typeColor}22)`,
                    border: `1px solid ${card.typeColor}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 2px 10px ${card.typeColor}30, inset 0 1px 0 rgba(255,255,255,0.12)`,
                  }}>
                    {card.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: compact ? 7.5 : 8.5, fontWeight: 800, color: card.typeColor, letterSpacing: '0.06em', textTransform: 'uppercase' as const, display: 'block' }}>{card.type}</span>
                  </div>
                  {/* Live dot */}
                  <motion.div
                    style={{ width: 7, height: 7, borderRadius: '50%', background: card.typeColor, flexShrink: 0, boxShadow: `0 0 8px ${card.typeColor}` }}
                    animate={{ opacity: [1, 0.25, 1], scale: [1, 1.45, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                <p style={{ fontSize: compact ? 11.5 : 12.5, fontWeight: 700, color: '#FFFFFF', margin: '0 0 3px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{card.title}</p>
                <p style={{ fontSize: compact ? 9.5 : 10.5, color: 'rgba(186,210,255,0.55)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, lineHeight: 1.3 }}>{card.snippet}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* â"€â"€â"€ Travelling-dot connector â"€â"€â"€ */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN SECTION
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

  /* â"€â"€ shared left content â"€â"€ */
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
        <span style={{ display: 'inline', background: 'linear-gradient(90deg,#38BDF8 0%,#5AB4D5 55%,#C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          always connected.
        </span>
        <br />
        <span style={{ fontSize: '0.68em', fontWeight: 700, color: 'rgba(255,255,255,0.52)', letterSpacing: '-0.02em' }}>
          Shifts · Timesheets · Compliance · Chat
        </span>
      </h2>

      <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(255,255,255,0.70)', marginBottom: 24, maxWidth: isMobile ? '100%' : 420 }}>
        A branded mobile app designed to keep your workforce connected and productive. Available on iOS and Android.
      </p>

      {/* Feature list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {[
          'Branded with your agency identity',
          'Real-time shift confirmations & reminders',
          'GPS-verified clock in/out',
          'Document upload & compliance tracking',
          'Three-way notifications: agency, worker and client',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(56,189,248,0.12)', border: '1.5px solid rgba(56,189,248,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, boxShadow: '0 0 8px rgba(56,189,248,0.18)' }}>
              <CheckCircle weight="fill" style={{ color: '#38BDF8', width: 11, height: 11 }} />
            </div>
            <span style={{ fontSize: 13.5, color: '#FFFFFF', lineHeight: 1.55 }}>{item}</span>
          </div>
        ))}
      </div>

      <a href="https://logezy.co/get-started" target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 14, textDecoration: 'none', background: 'linear-gradient(135deg,#2396C6 0%,#2396C6 100%)', color: '#fff', fontWeight: 700, fontSize: 14, boxShadow: '0 10px 32px rgba(56,189,248,0.28), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.16)', alignSelf: isMobile ? 'center' : 'flex-start', letterSpacing: '-0.01em' }}>
        Get your branded app
        <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
      </a>
    </div>
  );

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(160deg,#183963 0%,#091530 40%,#0A1A38 100%)',
      padding: isMobile ? '56px 20px 64px' : isTablet ? '64px 28px 72px' : '72px 0 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.022, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', top: '50%', left: '42%', transform: 'translate(-50%,-50%)', width: 900, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(56,189,248,0.06) 0%,transparent 65%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      </div>


      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• DESKTOP (â‰¥1120px) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

            {/* Connector: phone â†' notif cards */}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
              <GlowNode color="#38BDF8" size={8} />
              <GlowConnector length={40} />
              <GlowNode color="#5AB4D5" size={8} />
              <div style={{ width: 10 }} />
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                <NotifStream />
              </motion.div>
            </div>

          </div>
        </div>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TABLET (640â€"1119px) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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
              <GlowNode color="#5AB4D5" size={7} />
              <div style={{ width: 8 }} />
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.35 }}>
                <NotifStream compact />
              </motion.div>
            </div>

          </div>
        </div>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MOBILE (<640px) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, position: 'relative', zIndex: 3 }}>
          {LeftContent}

          {/* Phone (scaled) */}
          <div ref={phoneRef} style={{ opacity: 0, filter: 'drop-shadow(0 32px 72px rgba(0,0,0,0.68))', flexShrink: 0 }}>
            <IPhoneMockup scale={0.70} />
          </div>

          {/* Connector â†' notif grid */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <GlowNode color="#38BDF8" size={6} />
            <GlowConnector length={20} />
            <GlowNode color="#5AB4D5" size={6} />
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

        </div>
      )}

      {/* ── Nurse image at bottom-right end of section ── */}
      <motion.img
        src="/nurse.webp"
        alt="Healthcare worker"
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: isMobile ? '95%' : isTablet ? '55%' : '38%',
          height: isMobile ? 500 : isTablet ? 620 : 720,
          objectFit: 'cover',
          objectPosition: 'center 15%',
          borderRadius: '20px 0 0 0',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 62%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 62%, transparent 100%), linear-gradient(to left, black 60%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}
      />

    </section>
  );
}
