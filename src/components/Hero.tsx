/**
 * Hero.tsx — Premium SaaS hero with scroll-driven card-merge animation
 *
 * Layout
 * ──────
 * • Gradient bg · dot grid
 * • LEFT  cards (4, 252 px wide, 14 px gaps): TimesheetsHeader · TimesheetsDonut · TimesheetsStats · ShiftMiniAM
 * • RIGHT cards (4, 252 px wide, 14 px gaps): BirthdayCard · ShiftMiniJK · WorkerStatCard · CandidatesCard
 * • LEFT  outer edge  calc(50% - 656px)  ←→  RIGHT outer edge calc(50% + 656px)  [perfect mirror]
 * • CENTER: badge → H1 → subtitle → CTAs → social proof
 * • DASHBOARD: full-width image, no browser chrome — perspective tilt
 * • LOGOS: trusted-by marquee blended directly below dashboard
 *
 * Scroll-merge animation (via useScroll spring):
 *   0.14 → 0.70  Each card flies individually to its dashboard widget position
 *   0.40 → 0.70  Cards fade + scale down
 *   0.22 → 0.76  Dashboard rotateX eases 13° → 5°
 */

import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Star,
  CalendarBlank, Clock, MapPin, Shield, Bell, DeviceMobile, CheckCircle,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;
const I = '#6366F1';

/* ─────────────────────────────────────────────────
   LOGO DATA (for inline trusted-by strip)
───────────────────────────────────────────────── */
const logos = [
  { src: '/medsolve.png',                 alt: 'Medsolve'      },
  { src: '/ansacare_logo.webp',           alt: 'Ansacare'      },
  { src: '/jayco_logo.png',               alt: 'Jayco'         },
  { src: '/primcura_healthcare_logo.png', alt: 'Primcura'      },
  { src: '/Leadcare_logo.png',            alt: 'Leadcare'      },
  { src: '/annicare_uk.png',              alt: 'Annicare UK'   },
  { src: '/ocean_logo.png',               alt: 'Ocean'         },
  { src: '/Staffnursing_logo.png',        alt: 'Staff Nursing' },
];
const LOGO_W   = 140;
const LOGO_GAP = 40;
const TRACK_W  = (LOGO_W + LOGO_GAP) * logos.length;
const tripled  = [...logos, ...logos, ...logos];

/* ─────────────────────────────────────────────────
   SHARED CARD SHELL
───────────────────────────────────────────────── */
const CardWrap = ({
  width, children, style,
}: { width: number; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: '#FFFFFF',
    borderRadius: 16,
    border: '1px solid rgba(226,232,240,0.85)',
    boxShadow: '0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
    width,
    overflow: 'hidden',
    ...style,
  }}>
    {children}
  </div>
);

const IB = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div style={{ width: 32, height: 32, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════
   FEATURE PILL CARD — mobile app features
══════════════════════════════════════════════════ */
interface FeaturePillProps {
  icon: React.ElementType; iconColor: string; iconBg: string;
  label: string; sub: string;
}
function FeaturePill({ icon: Icon, iconColor, iconBg, label, sub }: FeaturePillProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11,
      padding: '10px 14px', borderRadius: 14, background: '#fff',
      border: '1px solid rgba(99,102,241,0.12)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)',
      minWidth: 200, backdropFilter: 'blur(8px)',
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon weight="fill" size={17} color={iconColor} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>{label}</p>
        <p style={{ margin: 0, fontSize: 9.5, color: '#94A3B8', marginTop: 2 }}>{sub}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FLOATING CARD WRAPPER  (entrance + bob)
══════════════════════════════════════════════════ */
interface FP {
  delay: number; fromX: number;
  floatY: number; floatDur: number; floatDelay: number;
  rotate: number; children: React.ReactNode;
}
function FC({ delay, fromX, floatY, floatDur, floatDelay, rotate, children }: FP) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.85, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, floatY, 0], rotate: [0, rotate, 0] }}
        transition={{
          y:      { delay: floatDelay, duration: floatDur,       repeat: Infinity, ease: 'easeInOut' },
          rotate: { delay: floatDelay, duration: floatDur * 1.1, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
export default function Hero() {
  const sRef = useRef<HTMLElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = sRef.current?.getBoundingClientRect();
    if (!r) return;
    setM({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  }, []);
  const onOut = useCallback(() => setM({ x: 0, y: 0 }), []);

  /* ── scroll spring ── */
  const { scrollYProgress } = useScroll({ target: sRef, offset: ['start start', 'end start'] });
  const sp = useSpring(scrollYProgress, { stiffness: 95, damping: 26, restDelta: 0.001 });

  const PHASE: [number, number] = [0.14, 0.70];

  /*
   *  Scroll-merge vectors — each card flies toward its nearest dashboard widget
   *
   *  LEFT  group  (Timesheets + ShiftMiniAM)  → merge right/down into dashboard
   *  RIGHT group  (Birthday + ShiftJK + WorkerStat + Candidates) → merge left/down
   *
   *  sbX/sbY  Timesheets pieces (all 3 share same vector)
   *  coX/coY  ShiftMiniAM
   *  buX/buY  CandidatesCard
   *  bdX/bdY  BirthdayCard
   *  caX/caY  ShiftMiniJK
   *  wsX/wsY  WorkerStatCard
   */
  /* (scroll-merge vectors removed — cards now use entrance-only animation) */

  /* center text parallax */
  const cy  = useTransform(sp, [0.10, 0.65], [0, -50]);
  const cop = useTransform(sp, [0.14, 0.60], [1,  0]);

  /* dashboard un-tilts slightly as cards merge */
  const dashRotX = useTransform(sp, [0.22, 0.76], [13, 5]);

  /* mouse parallax */
  const mp = (sx: number, sy: number): React.CSSProperties => ({
    transform: `translate(${m.x * sx}px, ${m.y * sy}px)`,
    transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
  });

  return (
    <section
      ref={sRef}
      onMouseMove={onMove}
      onMouseLeave={onOut}
      style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(148deg, #EEF2FF 0%, #FAFBFF 46%, #F0F9FF 100%)' }}
    >
      {/* ── Background blobs ── */}
      <div style={{ position: 'absolute', top: '-20%', right: '-14%', width: '58%', height: '70%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, rgba(14,165,233,0.07) 44%, transparent 70%)', filter: 'blur(88px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-12%', left: '-12%', width: '52%', height: '58%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.11) 0%, rgba(16,185,129,0.06) 50%, transparent 70%)', filter: 'blur(84px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '40%', height: '35%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.11) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 10%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 10%, transparent 100%)' }} />

      {/* ════════════════════════════════════════════════════════
          FEATURE PILL CARDS — spread across the full hero width
          LEFT side  → fromX negative (slides in from left)
          RIGHT side → fromX positive (slides in from right)
      ════════════════════════════════════════════════════════ */}

      {/* ── LEFT side cards ── */}
      {[
        { icon: CalendarBlank, iconColor: '#6366F1', iconBg: '#EEF2FF', label: 'Shift Confirmed',     sub: 'NHS Ward B · 07:00–19:00',  top:  80, delay: 0.45, fromX: -55, floatY: -9,  floatDur: 4.8, floatDelay: 0.3 },
        { icon: Shield,        iconColor: '#10B981', iconBg: '#ECFDF5', label: 'DBS Valid ✓',         sub: 'Compliance up to date',      top: 195, delay: 0.62, fromX: -48, floatY: -7,  floatDur: 5.2, floatDelay: 0.8 },
        { icon: Clock,         iconColor: '#06B6D4', iconBg: '#E0F9FF', label: 'Timesheet Approved',  sub: '32h 15m · this week',        top: 310, delay: 0.78, fromX: -40, floatY: -10, floatDur: 4.6, floatDelay: 1.3 },
        { icon: Bell,          iconColor: '#8B5CF6', iconBg: '#F5F3FF', label: 'Push Notification',   sub: 'New shift · Tap to accept',  top: 420, delay: 0.92, fromX: -34, floatY: -6,  floatDur: 5.0, floatDelay: 1.8 },
      ].map((item, i) => (
        <motion.div key={`left-${i}`} className="hidden xl:block"
          style={{ position: 'absolute', left: 'calc(50% - 670px)', top: item.top, zIndex: 8, pointerEvents: 'none' }}>
          <div style={mp(16, 9)}>
            <FC delay={item.delay} fromX={item.fromX} floatY={item.floatY} floatDur={item.floatDur} floatDelay={item.floatDelay} rotate={0.25}>
              <FeaturePill icon={item.icon} iconColor={item.iconColor} iconBg={item.iconBg} label={item.label} sub={item.sub} />
            </FC>
          </div>
        </motion.div>
      ))}

      {/* ── RIGHT side cards ── */}
      {[
        { icon: DeviceMobile,  iconColor: '#6366F1', iconBg: '#EEF2FF', label: 'Mobile App',          sub: 'iOS & Android',              top:  70, delay: 0.52, fromX: 55, floatY: -8,  floatDur: 5.0, floatDelay: 0.5 },
        { icon: MapPin,        iconColor: '#F59E0B', iconBg: '#FFFBEB', label: 'GPS Clock In',        sub: 'Verified · 07:02 AM',        top: 185, delay: 0.68, fromX: 48, floatY: -11, floatDur: 4.6, floatDelay: 1.0 },
        { icon: CheckCircle,   iconColor: '#10B981', iconBg: '#ECFDF5', label: 'Worker Accepted',     sub: 'James O. · just now',        top: 300, delay: 0.82, fromX: 42, floatY: -7,  floatDur: 5.2, floatDelay: 1.5 },
        { icon: CalendarBlank, iconColor: '#F59E0B', iconBg: '#FFFBEB', label: 'Availability Set',    sub: 'Mon–Fri this week',          top: 415, delay: 0.96, fromX: 36, floatY: -9,  floatDur: 4.8, floatDelay: 2.0 },
      ].map((item, i) => (
        <motion.div key={`right-${i}`} className="hidden xl:block"
          style={{ position: 'absolute', left: 'calc(50% + 470px)', top: item.top, zIndex: 8, pointerEvents: 'none' }}>
          <div style={mp(-16, 9)}>
            <FC delay={item.delay} fromX={item.fromX} floatY={item.floatY} floatDur={item.floatDur} floatDelay={item.floatDelay} rotate={-0.25}>
              <FeaturePill icon={item.icon} iconColor={item.iconColor} iconBg={item.iconBg} label={item.label} sub={item.sub} />
            </FC>
          </div>
        </motion.div>
      ))}

      {/* ════════════════════════════════════
          CENTER CONTENT
      ════════════════════════════════════ */}
      <motion.div style={{ y: cy, opacity: cop, position: 'relative', zIndex: 10 }}>
        <div style={{ paddingTop: 108 }}>
          <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto', padding: '0 28px 60px' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.06, duration: 0.65, ease: EASE }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '5px 16px 5px 7px', borderRadius: 100, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.24)', boxShadow: '0 2px 22px rgba(99,102,241,0.12)' }}
            >
              <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 10px', borderRadius: 20, background: `linear-gradient(135deg, ${I} 0%, #818CF8 100%)`, color: '#fff', letterSpacing: '0.08em' }}>NEW</span>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Built for UK temp staffing agencies</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.92, ease: EASE }}
              style={{ fontSize: 'clamp(2.1rem, 5.2vw, 3.85rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.048em', color: '#0F172A', margin: '0 0 18px' }}
            >
              The smarter way to{' '}
              <span style={{ color: '#6366F1', display: 'inline'}}>
                run your agency.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.86, ease: EASE }}
              style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', lineHeight: 1.80, color: '#64748B', maxWidth: 490, margin: '0 auto 32px' }}
            >
              Scheduling, compliance, timesheets &amp; payroll — all in one platform designed for UK staffing agencies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.30, duration: 0.78, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}
            >
              <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', borderRadius: 14, textDecoration: 'none', background: `linear-gradient(135deg, ${I} 0%, #818CF8 100%)`, color: '#fff', fontSize: 14.5, fontWeight: 700, boxShadow: `0 6px 30px rgba(99,102,241,0.42), 0 2px 8px rgba(99,102,241,0.22)` }}>
                  Start Free Trial <ArrowRight weight="regular" style={{ width: 15, height: 15 }} />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, cursor: 'pointer', background: '#FFFFFF', border: '1px solid rgba(99,102,241,0.22)', color: '#374151', fontSize: 14, fontWeight: 600, boxShadow: '0 2px 18px rgba(0,0,0,0.07)', textDecoration: 'none' }}>
                  Book a Demo
                </a>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.60, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[...Array(5)].map((_, i) => <Star key={i} weight="regular" style={{ width: 13, height: 13, color: '#FBBF24' }} />)}
                <span style={{ marginLeft: 5, fontSize: 12.5, color: '#1E293B', fontWeight: 700 }}>4.9 / 5</span>
              </div>
              <div style={{ width: 1, height: 14, background: '#E2E8F0' }} />
              <span style={{ fontSize: 12, color: '#64748B' }}><span style={{ fontWeight: 700, color: '#0F172A' }}>600+</span> UK agencies</span>
              <div style={{ width: 1, height: 14, background: '#E2E8F0' }} />
              <span style={{ fontSize: 12, color: '#64748B' }}><span style={{ fontWeight: 700, color: '#0F172A' }}>98.7%</span> compliance rate</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════
          DASHBOARD — no browser chrome
          Just the screenshot with top rounded corners
          + perspective tilt that eases on scroll
      ════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.50, duration: 1.18, ease: EASE }}
        style={{ position: 'relative', zIndex: 6, padding: '0 32px 0' }}
      >
        {/* Glow halo */}
        <div style={{ position: 'absolute', top: -120, left: '5%', right: '5%', height: 240, background: 'radial-gradient(ellipse, rgba(99,102,241,0.24) 0%, rgba(14,165,233,0.10) 48%, transparent 72%)', filter: 'blur(58px)', pointerEvents: 'none', zIndex: -1 }} />

        <div style={{ maxWidth: 1380, margin: '0 auto', position: 'relative' }}>
          {/* perspective wrapper */}
          <div style={{ perspective: 1800, perspectiveOrigin: 'top center' }}>
            <motion.div style={{ rotateX: dashRotX, transformOrigin: 'top center', willChange: 'transform' }}>
              <div style={{
                borderRadius: '18px 18px 0 0',
                overflow: 'hidden',
                boxShadow: [
                  '0 0 0 1px rgba(99,102,241,0.20)',
                  '0 -4px 0 rgba(99,102,241,0.24)',
                  '0 60px 180px rgba(99,102,241,0.24)',
                  '0 30px 80px rgba(0,0,0,0.18)',
                ].join(', '),
              }}>
                <img
                  src="/dashboard_v2.png"
                  alt="Logezy Dashboard"
                  style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── Floating phone mockup — matches dashboard border style ── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 1.0, ease: EASE }}
            style={{ position: 'absolute', right: -28, top: -100, zIndex: 20, pointerEvents: 'none' }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Phone container — same indigo border/shadow as dashboard */}
              <div style={{
                position: 'relative',
                userSelect: 'none',
                width: 240,
                borderRadius: 44,
                overflow: 'hidden',
                boxShadow: [
                  '0 0 0 1px rgba(99,102,241,0.28)',
                  '0 -4px 0 rgba(99,102,241,0.20)',
                  '0 60px 160px rgba(99,102,241,0.28)',
                  '0 30px 80px rgba(0,0,0,0.22)',
                ].join(', '),
              }}>
                {/* Side buttons — subtle, same colour tone as frame */}
                <div style={{ position:'absolute', left:-3, top:96, width:3, height:28,
                  background:'rgba(99,102,241,0.35)', borderRadius:'3px 0 0 3px' }} />
                <div style={{ position:'absolute', left:-3, top:138, width:3, height:52,
                  background:'rgba(99,102,241,0.35)', borderRadius:'3px 0 0 3px' }} />
                <div style={{ position:'absolute', right:-3, top:154, width:3, height:64,
                  background:'rgba(99,102,241,0.35)', borderRadius:'0 3px 3px 0' }} />

                {/* Thin indigo border frame */}
                <div style={{
                  background: 'linear-gradient(160deg,rgba(99,102,241,0.18) 0%,rgba(129,140,248,0.10) 50%,rgba(14,165,233,0.12) 100%)',
                  padding: 3,
                  borderRadius: 44,
                }}>
                  <div style={{ borderRadius: 42, overflow: 'hidden', position: 'relative', background: '#fff' }}>
                    <img
                      src="/mobile_app_main_screen.jpeg"
                      alt="Logezy Mobile App"
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'top' }}
                    />
                    {/* Dynamic Island */}
                    <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)',
                      width:96, height:28, background:'#000', borderRadius:16, zIndex:10 }} />
                    {/* Screen glare */}
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20, borderRadius:42,
                      background:'linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 40%)' }} />
                  </div>
                </div>
              </div>

              {/* Glow halo matching dashboard */}
              <div style={{ position:'absolute', inset:-40, borderRadius:'50%',
                background:'radial-gradient(ellipse,rgba(99,102,241,0.22) 0%,transparent 65%)',
                filter:'blur(28px)', zIndex:-1, pointerEvents:'none' }} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════
          TRUSTED BY — blended directly below dashboard
          No background change, no border — same hero gradient
      ════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 6, padding: '44px 0 52px', overflow: 'hidden' }}>

        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 100, background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Marquee */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Left fade — matches hero gradient start */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 130, background: 'linear-gradient(90deg, #EEF2FF 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
          {/* Right fade */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 130, background: 'linear-gradient(-90deg, #F0F9FF 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />

          <motion.div
            animate={{ x: [0, -TRACK_W] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', alignItems: 'center', gap: LOGO_GAP, width: 'max-content', padding: '4px 0' }}
          >
            {tripled.map((logo, i) => (
              <div key={`${logo.alt}-${i}`} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: LOGO_W }}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable={false}
                  style={{ maxHeight: 44, width: 'auto', maxWidth: LOGO_W, objectFit: 'contain', opacity: 1, filter: 'none', userSelect: 'none', pointerEvents: 'none', display: 'block' } as React.CSSProperties}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>

    </section>
  );
}
