import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarBlank, Clock, Bell, Shield, MapPin, ChartBar, Receipt, CheckCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   BRAND
───────────────────────────────────────────── */
const NAVY  = '#0C1835';
const BLUE  = '#1795C7';

/* ─────────────────────────────────────────────
   CLIENT STRIP
───────────────────────────────────────────── */
const clients = [
  { abbr: 'BH', name: 'Barchester Healthcare', color: '#1795C7' },
  { abbr: 'HC', name: 'HC-One',                color: '#5B6CF9' },
  { abbr: 'CU', name: 'Care UK',               color: '#059669' },
  { abbr: 'BP', name: 'Bupa Care Homes',        color: '#DB2777' },
  { abbr: 'AH', name: 'Anchor Hanover',         color: '#D97706' },
  { abbr: 'PG', name: 'Priory Group',           color: '#7C3AED' },
  { abbr: 'FS', name: 'Four Seasons Health',    color: '#0891B2' },
  { abbr: 'MC', name: 'Minster Care',           color: '#BE185D' },
  { abbr: 'VC', name: 'Voyage Care',            color: '#0D9488' },
  { abbr: 'MM', name: 'Maria Mallaband',        color: '#B45309' },
];

function ClientLogoStrip() {
  const doubled = [...clients, ...clients];
  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '18px 0',
      overflow: 'hidden',
      position: 'relative',
      background: 'rgba(255,255,255,0.02)',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #07111F, transparent)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #07111F, transparent)' }} />
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: 40, whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((c, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: `${c.color}22`,
              border: `1px solid ${c.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontWeight: 800, color: c.color, letterSpacing: '0.04em', flexShrink: 0,
            }}>
              {c.abbr}
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.01em' }}>
              {c.name}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block', marginLeft: 6, flexShrink: 0 }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────────── */
function PhoneMock() {
  return (
    <div style={{ position: 'relative', width: 162, height: 336 }}>
      <div style={{ position: 'absolute', inset: -2, borderRadius: 44, background: 'linear-gradient(145deg,#5B6CF9,#1795C7,#8B5CF6)', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 42, background: '#07111F', zIndex: 1 }} />
      <div style={{
        position: 'absolute', inset: 3, borderRadius: 40,
        border: '5px solid #1A2640',
        overflow: 'hidden', background: '#0D1829', zIndex: 2,
        boxShadow: '0 24px 56px rgba(12,33,56,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
      }}>
        <div style={{ position: 'absolute', left: -6, top: 70,  width: 3, height: 24, borderRadius: '2px 0 0 2px', background: '#1A2640' }} />
        <div style={{ position: 'absolute', left: -6, top: 100, width: 3, height: 38, borderRadius: '2px 0 0 2px', background: '#1A2640' }} />
        <div style={{ position: 'absolute', right: -6, top: 90, width: 3, height: 50, borderRadius: '0 2px 2px 0', background: '#1A2640' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 52, height: 18, borderRadius: '0 0 14px 14px', background: '#1A2640', zIndex: 10 }} />
        <img src="/mobile_app_main_screen.jpeg" alt="Logezy Mobile App" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING CHIP
───────────────────────────────────────────── */
function Chip({ icon: Icon, label, color, border, delay, floatDelay }: {
  icon: any; label: string; color: string; border: string; delay: number; floatDelay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5 + floatDelay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 11px', borderRadius: 30,
          background: 'rgba(255,255,255,0.07)',
          border: `1px solid ${border}`,
          backdropFilter: 'blur(16px)',
          boxShadow: `0 4px 18px ${color}18`,
          fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.80)',
          whiteSpace: 'nowrap' as const,
          letterSpacing: '0.01em',
        }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon weight="fill" style={{ width: 11, height: 11, color: '#fff' }} />
          </div>
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
  const it = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #07111F 0%, #0C1835 45%, #0B1528 100%)',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Background gradient orbs ── */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,108,249,0.14) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,149,199,0.13) 0%, transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* ── Subtle grid pattern ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
      }} />

      {/* ── MAIN LAYOUT ── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 40px 56px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.45fr', alignItems: 'center', gap: 56 }}>

            {/* ══════════════
                LEFT — COPY
            ══════════════ */}
            <motion.div variants={stagger} initial="hidden" animate="visible">

              {/* Badge */}
              <motion.div variants={it} style={{ marginBottom: 24 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '7px 14px 7px 8px', borderRadius: 100,
                  background: 'rgba(91,108,249,0.12)',
                  border: '1px solid rgba(91,108,249,0.30)',
                }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #5B6CF9, #1795C7)',
                  }}>
                    <CheckCircle weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>
                    Trusted by <strong style={{ color: '#818CF8' }}>500+</strong> UK Staffing Agencies
                  </span>
                </div>
              </motion.div>

              {/* Headline — reduced, tight */}
              <motion.h1 variants={it} style={{
                margin: '0 0 20px', padding: 0,
                fontSize: 'clamp(1.75rem, 2.8vw, 3.25rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}>
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.95)', marginBottom: 4 }}>The Engine Behind</span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Every Great Temp Agency.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={it} style={{
                fontSize: 15.5, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.48)',
                maxWidth: 400, margin: '0 0 32px',
                fontWeight: 400,
              }}>
                The all-in-one staffing platform top UK temp agencies rely on to manage workers, shifts, and compliance — effortlessly.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={it} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }} style={{ display: 'inline-flex' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 100,
                    fontSize: 14, fontWeight: 700, color: '#fff',
                    background: 'linear-gradient(135deg, #5B6CF9 0%, #1795C7 100%)',
                    boxShadow: '0 4px 22px rgba(91,108,249,0.42), 0 1px 0 rgba(255,255,255,0.12) inset',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}>
                    Start 10-day free trial
                    <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
                  </Link>
                </motion.span>
                <motion.span whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }} style={{ display: 'inline-flex' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 100,
                    fontSize: 14, fontWeight: 600,
                    color: 'rgba(255,255,255,0.70)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    textDecoration: 'none',
                    backdropFilter: 'blur(8px)',
                  }}>
                    Book a demo
                  </Link>
                </motion.span>
              </motion.div>

              {/* Stats */}
              <motion.div variants={it} style={{ display: 'flex', gap: 0 }}>
                {[
                  { val: '500+', lbl: 'UK Agencies' },
                  { val: '60%',  lbl: 'Less Admin'  },
                  { val: '3×',   lbl: 'Faster Fills' },
                ].map(({ val, lbl }, i) => (
                  <div key={lbl} style={{
                    paddingRight: i < 2 ? 24 : 0,
                    marginRight: i < 2 ? 24 : 0,
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                  }}>
                    <p style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>{val}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: '3px 0 0', fontWeight: 500, letterSpacing: '0.02em' }}>{lbl}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ══════════════
                RIGHT — VISUAL
            ══════════════ */}
            <div style={{ position: 'relative', height: 580, overflow: 'visible' }} className="hidden lg:block">

              {/* Floating chips */}
              <div style={{ position: 'absolute', top: 44, left: 4, zIndex: 20 }}>
                <Chip icon={CalendarBlank} label="Scheduling"   color="linear-gradient(135deg,#5B6CF9,#8B5CF6)" border="rgba(91,108,249,0.30)"  delay={1.5} floatDelay={0.2} />
              </div>
              <div style={{ position: 'absolute', top: '24%', left: 0, zIndex: 20 }}>
                <Chip icon={Shield}        label="Compliance"   color="linear-gradient(135deg,#7C3AED,#A855F7)" border="rgba(124,58,237,0.30)"  delay={1.7} floatDelay={0.8} />
              </div>
              <div style={{ position: 'absolute', bottom: 128, left: 14, zIndex: 20 }}>
                <Chip icon={Clock}         label="Timesheets"   color="linear-gradient(135deg,#D97706,#F59E0B)" border="rgba(217,119,6,0.30)"   delay={1.9} floatDelay={1.4} />
              </div>
              <div style={{ position: 'absolute', top: '13%', left: '42%', zIndex: 20 }}>
                <Chip icon={ChartBar}      label="Reports"      color="linear-gradient(135deg,#0891B2,#06B6D4)" border="rgba(8,145,178,0.30)"   delay={2.1} floatDelay={0.5} />
              </div>
              <div style={{ position: 'absolute', top: '38%', right: -6, zIndex: 20 }}>
                <Chip icon={Bell}          label="Notifications" color="linear-gradient(135deg,#EF4444,#F97316)" border="rgba(239,68,68,0.30)"  delay={2.3} floatDelay={1.0} />
              </div>
              <div style={{ position: 'absolute', bottom: 44, left: '30%', zIndex: 20 }}>
                <Chip icon={MapPin}        label="GPS Clock-In" color="linear-gradient(135deg,#059669,#10B981)" border="rgba(5,150,105,0.30)"   delay={2.5} floatDelay={1.8} />
              </div>
              <div style={{ position: 'absolute', bottom: 138, right: 16, zIndex: 20 }}>
                <Chip icon={Receipt}       label="Invoicing"    color="linear-gradient(135deg,#DB2777,#EC4899)" border="rgba(219,39,119,0.30)"  delay={2.7} floatDelay={2.2} />
              </div>

              {/* Stat chips */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}
                style={{ position: 'absolute', top: 6, right: 20, zIndex: 20 }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    padding: '9px 13px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(91,108,249,0.28)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 28px rgba(91,108,249,0.18)',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M3 3h18v4H3zm0 7h18v4H3zm0 7h18v4H3z"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1 }}>1,247</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '2px 0 0', lineHeight: 1 }}>Shifts today</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}
                style={{ position: 'absolute', bottom: 80, right: 8, zIndex: 20 }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    padding: '9px 13px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(23,149,199,0.28)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 28px rgba(23,149,199,0.18)',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#1795C7,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1 }}>98.4%</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '2px 0 0', lineHeight: 1 }}>Compliance rate</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: 18, left: 75, right: -160, zIndex: 2 }}
              >
                <motion.div style={{ y: dashboardY }} animate={{ translateY: [0, -7, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
                  <div style={{ transform: 'perspective(1400px) rotateX(5deg) rotateY(-18deg) rotateZ(1.5deg)', transformOrigin: 'center center', transformStyle: 'preserve-3d' }}>
                    {/* Glow ring */}
                    <div style={{ position: 'absolute', inset: -4, borderRadius: 24, background: 'linear-gradient(135deg, rgba(91,108,249,0.6), rgba(23,149,199,0.4), rgba(139,92,246,0.3))', filter: 'blur(8px)', zIndex: -1 }} />
                    <div style={{ borderRadius: 18, overflow: 'hidden', border: '6px solid rgba(255,255,255,0.08)', boxShadow: '0 0 0 1px rgba(91,108,249,0.20), 0 30px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.30)' }}>
                      {/* Browser chrome */}
                      <div style={{ background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 5 }}>
                          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.9 }} />)}
                        </div>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 10px', fontSize: 10, color: 'rgba(255,255,255,0.30)', fontFamily: 'ui-monospace, monospace' }}>
                          app.logezy.co.uk/dashboard
                        </div>
                      </div>
                      <img src="/DASHBAORD_NEW.png" alt="Logezy Dashboard" style={{ width: '100%', display: 'block' }} />
                    </div>
                    {/* Reflection glow */}
                    <div style={{ position: 'absolute', bottom: -36, left: '10%', right: '10%', height: 36, background: 'rgba(91,108,249,0.14)', filter: 'blur(22px)', borderRadius: '50%', zIndex: -1 }} />
                  </div>
                </motion.div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -24, y: 14 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', top: '50%', left: -8, transform: 'translateY(-50%)', zIndex: 12 }}
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  style={{ transform: 'perspective(1000px) rotateY(-8deg) rotateX(3deg)', transformStyle: 'preserve-3d', filter: 'drop-shadow(0 28px 44px rgba(91,108,249,0.28)) drop-shadow(0 8px 18px rgba(0,0,0,0.40))' }}
                >
                  <PhoneMock />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ── CLIENT STRIP ── */}
      <ClientLogoStrip />
    </section>
  );
}
