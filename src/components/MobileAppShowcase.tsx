import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceMobile, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

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
  { id: 0, from: 'Sarah · Agency',  msg: 'Your shift docs are ready 📄',    time: 'now', initials: 'SA', action: 'Reply'  },
  { id: 1, from: 'Tom · Ward B',    msg: 'Can you cover Thursday? 🙏',       time: '1m',  initials: 'TW', action: 'Reply'  },
  { id: 2, from: 'Agency Chat',     msg: 'New vacancy: Band 6 · London 🏥',  time: '2m',  initials: 'AC', action: 'View'   },
];

function FloatingNotification() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % SMS_NOTIFS.length);
        setShow(true);
      }, 560);
    }, 3600);
    return () => clearInterval(t);
  }, []);

  const n = SMS_NOTIFS[idx];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={idx}
          /* slides in from the left */
          initial={{ x: -220, opacity: 0, scale: 0.86 }}
          animate={{ x: 0,    opacity: 1, scale: 1    }}
          exit={{   x: -220,  opacity: 0, scale: 0.86 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            /* ── Left-middle: half outside left edge of phone ── */
            position: 'absolute',
            top: 205,          /* vertical middle of phone (phone = 582px tall) */
            left: -122,        /* half the card width sticks out left */
            zIndex: 70,
            width: 252,        /* fixed width — 122px outside, 130px inside */

            /* ── Clean white card ── */
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow:
              '0 16px 50px rgba(0,0,0,0.24), ' +
              '0 5px 18px rgba(0,0,0,0.12), ' +
              '0 1px 0 rgba(255,255,255,0.9) inset',
            overflow: 'hidden',
          }}
        >
          {/* ── Top content row ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px 10px' }}>

            {/* iOS Messages app icon */}
            <div style={{
              width: 44, height: 44,
              borderRadius: 13,
              flexShrink: 0,
              background: 'linear-gradient(150deg, #4CD964 0%, #2DB84A 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 5px 16px rgba(45,184,74,0.48), 0 2px 6px rgba(0,0,0,0.18)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', borderRadius: '13px 13px 0 0', background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)', pointerEvents: 'none' }} />
              <svg width={23} height={23} viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* App label + timestamp */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <p style={{
                  fontSize: 10, fontWeight: 700,
                  color: 'rgba(0,0,0,0.36)',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase' as const,
                }}>MESSAGES</p>
                <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.30)', fontWeight: 500 }}>{n.time}</p>
              </div>

              {/* Sender name */}
              <p style={{
                fontSize: 14, fontWeight: 800,
                color: '#111111',
                marginBottom: 2, lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>{n.from}</p>

              {/* Message preview */}
              <p style={{
                fontSize: 12.5,
                color: 'rgba(0,0,0,0.48)',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{n.msg}</p>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div style={{
            display: 'flex',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}>
            <button style={{
              flex: 1, padding: '9px 0',
              background: 'rgba(48,209,88,0.09)',
              border: 'none',
              borderRight: '1px solid rgba(0,0,0,0.06)',
              cursor: 'pointer',
              fontSize: 12.5, fontWeight: 700,
              color: '#1DB954',
              letterSpacing: '-0.01em',
            }}>
              {n.action}
            </button>
            <button style={{
              flex: 1, padding: '9px 0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12.5, fontWeight: 600,
              color: 'rgba(0,0,0,0.36)',
            }}>
              Close
            </button>
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

      {/* ── Left side buttons ── */}
      {/* Action button */}
      <div style={{
        position: 'absolute', left: -4, top: 108,
        width: 4, height: 30,
        background: 'linear-gradient(to left, #8E8E93, #C7C7CC, #8E8E93)',
        borderRadius: '3px 0 0 3px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.45)',
      }} />
      {/* Volume up */}
      <div style={{
        position: 'absolute', left: -4, top: 162,
        width: 4, height: 52,
        background: 'linear-gradient(to left, #8E8E93, #C7C7CC, #8E8E93)',
        borderRadius: '3px 0 0 3px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.45)',
      }} />
      {/* Volume down */}
      <div style={{
        position: 'absolute', left: -4, top: 228,
        width: 4, height: 52,
        background: 'linear-gradient(to left, #8E8E93, #C7C7CC, #8E8E93)',
        borderRadius: '3px 0 0 3px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.45)',
      }} />

      {/* ── Right side button (power) ── */}
      <div style={{
        position: 'absolute', right: -4, top: 172,
        width: 4, height: 72,
        background: 'linear-gradient(to right, #8E8E93, #C7C7CC, #8E8E93)',
        borderRadius: '0 3px 3px 0',
        boxShadow: '2px 0 5px rgba(0,0,0,0.45)',
      }} />

      {/* ── Outer titanium case ── */}
      <div style={{
        width: 270,
        height: 582,
        borderRadius: 54,
        /* Natural Titanium finish */
        background: 'linear-gradient(160deg, #D6D6D8 0%, #B8B8BC 20%, #9A9A9E 45%, #B0B0B4 70%, #CECECE 100%)',
        padding: '3px',
        boxShadow:
          '0 50px 130px rgba(0,0,0,0.75), ' +
          '0 0 0 0.5px rgba(255,255,255,0.25), ' +
          'inset 0 1px 0 rgba(255,255,255,0.5), ' +
          'inset 0 -1px 0 rgba(0,0,0,0.25)',
        position: 'relative',
      }}>

        {/* ── Inner screen bezel ── */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: 52,
          background: '#000',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Full-bleed screenshot — no drawn UI on top */}
          <img
            src="/mobile_app_main_screen.jpeg"
            alt="Logezy Worker App"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 14, left: '50%',
            transform: 'translateX(-50%)',
            width: 128, height: 36,
            background: '#000',
            borderRadius: 20,
            zIndex: 10,
            boxShadow: '0 0 0 1.5px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {/* Front camera dot */}
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', border: '1px solid rgba(255,255,255,0.08)' }} />
            {/* Face ID sensor */}
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }} />
          </div>

          {/* Screen glass reflection */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 55%)',
            pointerEvents: 'none',
            zIndex: 20,
            borderRadius: 52,
          }} />
        </div>
      </div>

      {/* ── Bottom speaker grilles (on case) ── */}
      <div style={{
        position: 'absolute', bottom: 18, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            width: 3.5, height: 3.5, borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }} />
        ))}
      </div>

      {/* ── Floating SMS notification — half outside phone top edge ── */}
      <FloatingNotification />

      {/* ── Glow halo behind the phone ── */}
      <div style={{
        position: 'absolute', inset: -50,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(56,189,248,0.22) 0%, transparent 70%)',
        filter: 'blur(35px)',
        zIndex: -1,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ─── Apple Watch notification card (reusable) ─── */
function WatchNotifCard({
  icon, iconBg, appName, title, body, time, isFirst,
}: {
  icon: React.ReactNode; iconBg: string; appName: string;
  title: string; body: string; time: string; isFirst: boolean;
}) {
  return (
    <div style={{
      background: 'rgba(28,28,30,0.96)',
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,0.13)',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.55)',
      marginBottom: isFirst ? 5 : 0,
    }}>
      {/* Card header row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 10px 5px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: 5,
          background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <p style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.03em', textTransform: 'uppercase' as const }}>
          {appName}
        </p>
        <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.22)', marginLeft: 'auto' }}>{time}</p>
      </div>

      {/* Card body */}
      <div style={{ padding: '7px 10px 8px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 3 }}>{title}</p>
        <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.45 }}>{body}</p>
      </div>

      {/* Action row (first card only) */}
      {isFirst && (
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{
            flex: 1, padding: '7px 0', textAlign: 'center',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(56,189,248,0.12)',
          }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: '#38BDF8' }}>Open</p>
          </div>
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>Dismiss</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Realistic Apple Watch Series 9 ─── */
function AppleWatch() {
  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>


      {/* Received pill */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <motion.div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 13px', borderRadius: 999,
            background: 'rgba(52,211,153,0.12)',
            border: '1px solid rgba(52,211,153,0.3)',
          }}
          animate={{ boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 16px rgba(52,211,153,0.45)', '0 0 0px rgba(52,211,153,0)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <p style={{ fontSize: 9.5, fontWeight: 700, color: '#34D399', letterSpacing: '0.05em' }}>2 Notifications</p>
        </motion.div>
      </div>

      {/* ── Top band ── */}
      <div style={{
        width: 62, height: 34,
        margin: '0 auto',
        borderRadius: '8px 8px 0 0',
        background: 'linear-gradient(to bottom, #1A1A1E 0%, #28282C 50%, #1E1E22 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        borderBottom: 'none',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), -2px 0 8px rgba(0,0,0,0.5), 2px 0 8px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {[7, 14, 21, 28].map(t => (
          <div key={t} style={{ position: 'absolute', top: t, left: 8, right: 8, height: 1, background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>

      {/* ── Watch body ── */}
      <div style={{ position: 'relative' }}>
        {/* Case rim (space gray aluminium) */}
        <div style={{
          width: 168, height: 200,
          borderRadius: 50,
          background: 'linear-gradient(150deg, #4A4A4E 0%, #303034 25%, #1C1C20 55%, #2A2A2E 80%, #3E3E42 100%)',
          padding: '4px',
          boxShadow:
            '0 36px 90px rgba(0,0,0,0.9), ' +
            '0 0 0 1px rgba(255,255,255,0.07), ' +
            'inset 0 2px 0 rgba(255,255,255,0.18), ' +
            'inset 0 -2px 0 rgba(0,0,0,0.5), ' +
            'inset 2px 0 0 rgba(255,255,255,0.05), ' +
            'inset -2px 0 0 rgba(0,0,0,0.3)',
          position: 'relative',
        }}>
          {/* Screen glass */}
          <div style={{
            width: '100%', height: '100%',
            borderRadius: 47,
            background: '#000',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
            {/* Subtle ambient glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 55%)', pointerEvents: 'none', zIndex: 1 }} />

            {/* ── Status bar ── */}
            <div style={{ padding: '9px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2, flexShrink: 0 }}>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>9:41</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {/* Live pulse dot */}
                <motion.div
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                {/* Battery */}
                <div style={{ width: 13, height: 6, borderRadius: 2, border: '1px solid rgba(255,255,255,0.22)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: '1px', width: '78%', background: '#34D399', borderRadius: 1 }} />
                </div>
              </div>
            </div>

            {/* ── Notification cards ── */}
            <div style={{ flex: 1, padding: '3px 8px 8px', overflowY: 'hidden', position: 'relative', zIndex: 2 }}>

              {/* Card 1 — Logezy shift */}
              <WatchNotifCard
                iconBg="linear-gradient(135deg, #38BDF8, #818CF8)"
                icon={<span style={{ fontSize: 8, color: '#fff', fontWeight: 900, lineHeight: 1 }}>L</span>}
                appName="Logezy"
                title="Shift Confirmed ✓"
                body="NHS Ward B · Tomorrow 07:00–19:00"
                time="now"
                isFirst={true}
              />

              {/* Card 2 — SMS / Messages */}
              <WatchNotifCard
                iconBg="#34C759"
                icon={
                  <svg width={9} height={9} viewBox="0 0 20 20" fill="white">
                    <path d="M10 2C5.03 2 1 5.58 1 10c0 1.85.67 3.56 1.8 4.93L2 18l3.28-.82A9.3 9.3 0 0 0 10 18c4.97 0 9-3.58 9-8s-4.03-8-9-8z"/>
                  </svg>
                }
                appName="Messages"
                title="Sarah (Agency)"
                body="Your shift docs are ready 📄"
                time="1m"
                isFirst={false}
              />
            </div>

            {/* Glass reflection */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 45%)', pointerEvents: 'none', zIndex: 3, borderRadius: 47 }} />
          </div>
        </div>

        {/* ── Digital Crown ── */}
        <div style={{
          position: 'absolute', right: -11, top: '28%',
          width: 10, height: 38,
          background: 'linear-gradient(to right, #38383A, #5A5A5C, #48484A, #5C5C5E)',
          borderRadius: '0 5px 5px 0',
          boxShadow: '4px 0 10px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.14)',
        }}>
          {[5, 9, 13, 17, 21, 25, 29, 33].map(t => (
            <div key={t} style={{ position: 'absolute', top: t, left: 1, right: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          ))}
        </div>

        {/* ── Side button ── */}
        <div style={{
          position: 'absolute', right: -9, top: '60%',
          width: 8, height: 24,
          background: 'linear-gradient(to right, #38383A, #545456)',
          borderRadius: '0 4px 4px 0',
          boxShadow: '3px 0 7px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
        }} />
      </div>

      {/* ── Bottom band ── */}
      <div style={{
        width: 62, height: 34,
        margin: '0 auto',
        borderRadius: '0 0 8px 8px',
        background: 'linear-gradient(to top, #1A1A1E 0%, #28282C 50%, #1E1E22 100%)',
        borderTop: 'none',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.05), -2px 0 8px rgba(0,0,0,0.5), 2px 0 8px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {[7, 14, 21, 28].map(t => (
          <div key={t} style={{ position: 'absolute', top: t, left: 8, right: 8, height: 1, background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>

      {/* ── Pulse rings ── */}
      {[1, 2, 3].map(n => (
        <motion.div
          key={n}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 168, height: 200,
            borderRadius: 50,
            border: '1.5px solid rgba(52,211,153,0.28)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1 + n * 0.14], opacity: [0.4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: (n - 1) * 0.65, ease: 'easeOut' }}
        />
      ))}

    </div>
  );
}

/* ─── Notification connection dots ─── */
function ConnectionDots() {
  return (
    <div style={{ flexShrink: 0, alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(56,189,248,0.8)' }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
        />
      ))}
      <p style={{ fontSize: 7, color: 'rgba(56,189,248,0.4)', fontWeight: 700, letterSpacing: '0.05em', marginTop: 3, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>push</p>
    </div>
  );
}

/* ─── MAIN ─── */
export default function MobileAppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef   = useRef<HTMLDivElement>(null);
  const watchRef   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });

      tl.fromTo(leftRef.current,  { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(phoneRef.current, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .fromTo(watchRef.current, { opacity: 0, x: 40, scale: 0.85 }, { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: 'back.out(1.5)' }, '-=0.35');

      // Floating loop
      gsap.to(phoneRef.current, { y: -10, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(watchRef.current, { y: -7,  duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: 'linear-gradient(135deg, #183765 0%, #1966AA 48%, #2399CA 100%)',
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs + grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', top: '50%', left: '55%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', bottom: '-10%', left: '10%', background: 'radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 60, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>

        {/* ── LEFT: Copy ── */}
        <div ref={leftRef} style={{ flex: '1 1 360px', opacity: 0 }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 999, background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', marginBottom: 24 }}>
            <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 14, height: 14 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Worker Mobile App</span>
          </div>

          {/* Headline */}
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            Your workforce,<br />
            <span style={{ background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 55%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in their pocket.
            </span>
          </h2>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(165,210,255,0.75)', marginBottom: 36, maxWidth: 440 }}>
            A branded mobile app your temps actually want to use — for shifts, timesheets, documents and chat. Available on iOS &amp; Android.
          </p>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {[
              'Branded with your agency identity',
              'Real-time shift confirmations & reminders',
              'GPS-verified clock in/out',
              'Document upload & compliance tracking',
              'Three-way notifications — agency, worker, client',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle weight="regular" style={{ color: '#38BDF8', width: 11, height: 11 }} />
                </div>
                <span style={{ fontSize: 14, color: 'rgba(200,225,255,0.80)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* App store badges */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            {[
              { logo: <AppleLogo />, top: 'Download on the', main: 'App Store' },
              { logo: <PlayLogo />,  top: 'Get it on',       main: 'Google Play' },
            ].map(({ logo, top, main }, i) => (
              <a key={i} href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '11px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                {logo}
                <div>
                  <p style={{ fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1 }}>{top}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginTop: 2 }}>{main}</p>
                </div>
              </a>
            ))}
          </div>

          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 14, textDecoration: 'none', background: 'linear-gradient(135deg, #38BDF8, #818CF8)', color: '#fff', fontWeight: 700, fontSize: 14, boxShadow: '0 8px 28px rgba(56,189,248,0.3)' }}>
            Get your branded app
            <ArrowRight weight="regular" style={{ width: 15, height: 15 }} />
          </Link>
        </div>

        {/* ── RIGHT: iPhone + dots + Apple Watch ── */}
        <div style={{ flex: '1 1 500px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>

          {/* iPhone */}
          <div ref={phoneRef} style={{ opacity: 0, position: 'relative', zIndex: 2, flexShrink: 0 }}>
            <IPhoneMockup />
          </div>

          {/* Animated notification dots (phone → watch) */}
          <ConnectionDots />

          {/* Apple Watch */}
          <div ref={watchRef} style={{ opacity: 0, flexShrink: 0 }}>
            <AppleWatch />
          </div>

        </div>
      </div>
    </section>
  );
}
