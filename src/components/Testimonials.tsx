/**
 * Testimonials.tsx — Customer Stories
 *
 * Design
 * ──────
 * • Dark navy section
 * • Cursor-following radial spotlight (useMotionTemplate)
 * • 3 testimonial cards with per-card 3D tilt + glowing border that tracks cursor
 * • Auto-scroll logo marquee
 * • 4-stat animated counter strip
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue, useTransform, useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { Star, Users, TrendUp, Clock, Shield } from '@phosphor-icons/react';
import AnimatedCounter from './AnimatedCounter';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const testimonials = [
  {
    quote: "Compliance used to be our biggest headache. Now every document, every certificate, every expiry date is tracked automatically. It's transformed how we run our healthcare staffing operation.",
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'CareFirst Group',
    rating: 5,
    tag: 'Compliance',
    color: '#38BDF8',
    initials: 'SM',
  },
  {
    quote: 'The digital timesheets alone saved us hours every week. Timesheets approved, invoices out, payroll done — it all just flows now. The team has never been more on top of things.',
    name: 'James Okafor',
    role: 'Director',
    company: 'MedStaff UK',
    rating: 5,
    tag: 'Timesheets',
    color: '#34D399',
    initials: 'JO',
  },
  {
    quote: "The shift management alone was worth it. We're placing more temps in less time and the team is less stressed than they've ever been. Logezy just works.",
    name: 'Priya Sharma',
    role: 'Founder',
    company: 'NurseSync',
    rating: 5,
    tag: 'Scheduling',
    color: '#818CF8',
    initials: 'PS',
  },
];

const stats = [
  { value: 600, suffix: '+', label: 'UK agencies',       icon: Users,    color: '#38BDF8' },
  { value: 98,  suffix: '%', label: 'client retention',  icon: TrendUp,  color: '#34D399' },
  { value: 80,  suffix: '%', label: 'less admin time',   icon: Clock,    color: '#818CF8' },
  { value: 99,  suffix: '%', label: 'compliance rate',   icon: Shield,   color: '#F59E0B' },
];

const brands = [
  'NHS', 'CareFirst Group', 'MedStaff UK', 'NurseSync',
  'HealthForce', 'BrightCare', 'StaffHub', 'MedLink',
];


/* ─────────────────────────────────────────────
   3D TILT CARD  (cursor-reactive border + tilt)
───────────────────────────────────────────── */
type TData = typeof testimonials[0];

function TiltCard({ t, index }: { t: TData; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  /* normalised -0.5 → +0.5 cursor position relative to card */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sp = { stiffness: 300, damping: 28 };
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [ 7, -7]), sp);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7,  7]), sp);

  /* glow border position: 0-100% */
  const gx = useSpring(useTransform(mx, [-0.5, 0.5], [0, 100]), sp);
  const gy = useSpring(useTransform(my, [-0.5, 0.5], [0, 100]), sp);

  /* animated border gradient that follows cursor */
  const borderBg = useMotionTemplate`radial-gradient(200px circle at ${gx}% ${gy}%, ${t.color}70, rgba(255,255,255,0.06) 100%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - left) / width  - 0.5);
    my.set((e.clientY - top)  / height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); setActive(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.68, delay: index * 0.13, ease: EASE }}
      style={{ perspective: 900 }}
    >
      {/* 1-px border wrapper — gradient follows cursor */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={onLeave}
        style={{
          background: active ? borderBg : 'rgba(255,255,255,0.07)',
          padding: 1,
          borderRadius: 18,
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          cursor: 'default',
          height: '100%',
        }}
      >
        {/* card body */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(13,21,38,0.95), rgba(8,14,28,0.98))',
          borderRadius: 17,
          padding: '28px 28px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}>

          {/* inner colour splash (top-left) */}
          <motion.div
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', top: -70, left: -50,
              width: 240, height: 240,
              background: `radial-gradient(circle, ${t.color}18 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* ── top row: stars + tag ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} weight="fill" size={14} style={{ color: '#FBBF24' }} />
              ))}
            </div>
            <span style={{
              fontSize: 9.5, fontWeight: 800, padding: '3px 12px', borderRadius: 20,
              background: `${t.color}14`, color: t.color,
              border: `1px solid ${t.color}30`,
              letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            }}>{t.tag}</span>
          </div>

          {/* ── quote icon ── */}
          <div style={{
            fontSize: 52, lineHeight: 1, fontWeight: 900, fontFamily: 'Georgia, serif',
            color: t.color, opacity: 0.22, marginBottom: 8,
            position: 'relative', zIndex: 1,
          }}>"</div>

          {/* ── quote text ── */}
          <p style={{
            fontSize: 14.5, lineHeight: 1.78,
            color: 'rgba(226,232,240,0.80)',
            fontStyle: 'italic',
            flex: 1,
            position: 'relative', zIndex: 1,
            marginBottom: 24,
          }}>{t.quote}</p>

          {/* ── author ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 13,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            position: 'relative', zIndex: 1,
          }}>
            <motion.div
              animate={{ boxShadow: active ? `0 0 18px ${t.color}50` : '0 0 0px transparent' }}
              transition={{ duration: 0.4 }}
              style={{
                width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                background: `${t.color}1E`,
                border: `2px solid ${t.color}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: t.color,
              }}
            >{t.initials}</motion.div>
            <div>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: '#F1F5F9' }}>{t.name}</p>
              <p style={{ margin: 0, fontSize: 11.5, color: 'rgba(148,163,184,0.60)', marginTop: 2 }}>
                {t.role} ·{' '}
                <span style={{ color: 'rgba(148,163,184,0.85)', fontWeight: 600 }}>{t.company}</span>
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   AUTO-SCROLL MARQUEE
───────────────────────────────────────────── */
function Marquee() {
  const doubled = [...brands, ...brands];
  return (
    <div style={{
      overflow: 'hidden',
      maskImage:       'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 14, width: 'max-content' }}
      >
        {doubled.map((name, i) => (
          <div key={i} style={{
            padding: '8px 22px', borderRadius: 100,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 12, fontWeight: 700,
            color: 'rgba(148,163,184,0.55)',
            whiteSpace: 'nowrap', letterSpacing: '0.04em',
            flexShrink: 0,
          }}>{name}</div>
        ))}
      </motion.div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorIn, setCursorIn] = useState(false);

  /* ── raw cursor position (relative to section) ── */
  const mX = useMotionValue(-600);
  const mY = useMotionValue(-600);

  /* ── spotlight follows cursor slowly ── */
  const spX = useSpring(mX, { stiffness: 55, damping: 18 });
  const spY = useSpring(mY, { stiffness: 55, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(750px circle at ${spX}px ${spY}px, rgba(23,149,199,0.13), transparent 55%)`;

  /* ── cursor dot: snappy ── */
  const dotX = useSpring(mX, { stiffness: 700, damping: 40 });
  const dotY = useSpring(mY, { stiffness: 700, damping: 40 });
  /* offset by half-size so dot is centred on cursor */
  const dotXC = useTransform(dotX, v => v - 5);
  const dotYC = useTransform(dotY, v => v - 5);

  /* ── cursor ring: laggy ── */
  const ringX = useSpring(mX, { stiffness: 100, damping: 22 });
  const ringY = useSpring(mY, { stiffness: 100, damping: 22 });
  const ringXC = useTransform(ringX, v => v - 22);
  const ringYC = useTransform(ringY, v => v - 22);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mX.set(e.clientX - rect.left);
    mY.set(e.clientY - rect.top);
    if (!cursorIn) setCursorIn(true);
  };
  const onLeave = () => {
    mX.set(-600); mY.set(-600);
    setCursorIn(false);
  };

  return (
    <motion.section
      ref={sectionRef as React.RefObject<HTMLElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #060C1C 0%, #0B1530 50%, #060C1C 100%)',
        padding: '116px 48px 128px',
        cursor: cursorIn ? 'none' : 'auto',
      }}
    >

      {/* ── cursor spotlight ── */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: spotlight,
      }} />

      {/* ── custom cursor dot ── */}
      <motion.div
        animate={{ opacity: cursorIn ? 1 : 0, scale: cursorIn ? 1 : 0.3 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', left: 0, top: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: '#38BDF8',
          boxShadow: '0 0 12px rgba(56,189,248,0.9), 0 0 24px rgba(56,189,248,0.4)',
          x: dotXC, y: dotYC,
          pointerEvents: 'none', zIndex: 20,
        }}
      />

      {/* ── cursor ring (lagging) ── */}
      <motion.div
        animate={{ opacity: cursorIn ? 1 : 0, scale: cursorIn ? 1 : 0.3 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', left: 0, top: 0,
          width: 44, height: 44, borderRadius: '50%',
          border: '1.5px solid rgba(56,189,248,0.45)',
          x: ringXC, y: ringYC,
          pointerEvents: 'none', zIndex: 20,
        }}
      />

      {/* ── dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage:       'radial-gradient(ellipse 88% 70% at 50% 30%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 70% at 50% 30%, black, transparent)',
      }} />

      {/* ── ambient blobs ── */}
      <div style={{ position:'absolute', top:'4%',  left:'18%',  width:700, height:600, background:'radial-gradient(ellipse, rgba(23,149,199,0.07) 0%, transparent 70%)', filter:'blur(90px)', zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'8%', right:'8%', width:500, height:400, background:'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter:'blur(80px)', zIndex:0, pointerEvents:'none' }} />

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1220, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          {/* badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px 5px 11px', borderRadius: 100,
            background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.24)',
            marginBottom: 22,
          }}>
            <Star weight="fill" size={12} style={{ color: '#FBBF24' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#FCD34D', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Customer Stories</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
            fontWeight: 900, color: '#F1F5F9',
            letterSpacing: '-0.046em', lineHeight: 1.07, marginBottom: 18,
          }}>
            Loved by UK{' '}
            <span style={{
              background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 50%, #34D399 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>agencies</span>
          </h2>

          <p style={{ fontSize: 17, color: 'rgba(165,210,255,0.58)', maxWidth: 490, margin: '0 auto', lineHeight: 1.80 }}>
            See how workforce leaders across the UK transformed their operations with Logezy.
          </p>
        </motion.div>

        {/* ── TESTIMONIAL CARDS ── */}
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 64 }}>
          {testimonials.map((t, i) => (
            <TiltCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* ── MARQUEE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 72 }}
        >
          <p style={{
            textAlign: 'center', fontSize: 10, fontWeight: 700,
            color: 'rgba(148,163,184,0.35)', letterSpacing: '0.14em',
            textTransform: 'uppercase', marginBottom: 20,
          }}>Trusted by leading UK agencies</p>
          <Marquee />
        </motion.div>

        {/* ── STATS ── */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {stats.map(({ value, suffix, label, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -5 }}
              style={{
                padding: '28px 20px', borderRadius: 16, textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 13, margin: '0 auto 14px',
                background: `${color}14`, border: `1px solid ${color}2A`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon weight="regular" size={20} style={{ color }} />
              </div>
              <p style={{ margin: '0 0 5px', fontSize: 38, fontWeight: 900, color, letterSpacing: '-0.04em', lineHeight: 1 }}>
                <AnimatedCounter to={value} suffix={suffix} />
              </p>
              <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(148,163,184,0.55)', fontWeight: 500 }}>{label}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── responsive ── */}
      <style>{`
        @media (max-width: 960px) {
          .testimonials-grid { grid-template-columns: 1fr !important; max-width: 520px; margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

    </motion.section>
  );
}
