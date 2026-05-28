import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, BarChart3, Smartphone, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   FEATURE CARD DATA
───────────────────────────────────────────── */
const items = [
  {
    icon: Zap,
    title: 'Instant Scheduling',
    desc: 'Auto-match workers to shifts by skills, availability, and location. Fill your rota in minutes, not hours.',
    color: '#7C3AED',
    grad: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    lightBg: 'rgba(124,58,237,0.07)',
    stat: '3× faster shift fill',
    statColor: '#7C3AED',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Tracking',
    desc: 'Automatic alerts for expiring DBS checks, training, and certifications — stay audit-ready, always.',
    color: '#059669',
    grad: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    lightBg: 'rgba(5,150,105,0.07)',
    stat: '98.4% compliance rate',
    statColor: '#059669',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics',
    desc: 'Real-time dashboards across vacancies, timesheets, and invoices — every metric, in one view.',
    color: '#D97706',
    grad: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    lightBg: 'rgba(217,119,6,0.07)',
    stat: '60% less admin time',
    statColor: '#D97706',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    desc: 'Workers clock in via GPS, submit timesheets and update their availability — from anywhere.',
    color: '#0369A1',
    grad: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
    lightBg: 'rgba(3,105,161,0.07)',
    stat: 'iOS & Android',
    statColor: '#0369A1',
  },
];

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function PlatformFeatures() {
  return (
    <section style={{
      /* Smooth gradient transition: dark hero → white section */
      background: 'linear-gradient(180deg, #06090E 0px, #0E1525 60px, #F8F9FF 160px, #FFFFFF 280px)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Subtle top glow carry-over from dark section */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: 200,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px 96px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADLINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 640, marginBottom: 56 }}
        >
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 13px', borderRadius: 100,
            background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.25)',
            marginBottom: 20,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
              Platform Features
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08,
            color: '#0F172A', margin: '0 0 18px',
          }}>
            Built for UK staffing agencies{' '}
            <span style={{
              background: 'linear-gradient(120deg, #7C3AED 0%, #2563EB 55%, #0EA5E9 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              that mean business.
            </span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.72, color: '#64748B', margin: 0 }}>
            Every feature in Logezy is purpose-built for temp staffing — from first booking to final invoice, with compliance baked in at every step.
          </p>
        </motion.div>

        {/* ── FULL-WIDTH 3D IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 72 }}
        >
          {/* Glow ring behind image */}
          <div style={{
            position: 'absolute', left: '5%', right: '5%', height: '50%', top: '5%',
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, rgba(14,165,233,0.07) 50%, transparent 70%)',
            filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none',
          }} />

          <div
            style={{
              perspective: '1000px',
              position: 'relative', zIndex: 1,
            }}
          >
            <div style={{ transform: 'rotateX(4deg) skewX(-0.5deg)', transformOrigin: 'center top' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 7', borderRadius: 20, overflow: 'hidden' }}>

                {/* Bottom vignette → fades to white */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                  background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.85) 88%, #FFFFFF 100%)',
                }} />
                {/* Left & right edge fades */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, transparent 8%, transparent 92%, rgba(255,255,255,0.6) 100%)',
                }} />

                {/* Image */}
                <img
                  src="/schedule.png"
                  alt="Logezy Schedule"
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top',
                    borderRadius: 20,
                    boxShadow: '0 24px 80px rgba(124,58,237,0.14), 0 4px 20px rgba(0,0,0,0.09)',
                    border: '1px solid rgba(124,58,237,0.10)',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── FEATURE CARDS ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }}
        >
          {items.map(({ icon: Icon, title, desc, color, grad, lightBg, stat, statColor }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -6, boxShadow: `0 20px 48px ${color}18` }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                borderRadius: 20, overflow: 'hidden',
                background: '#fff',
                border: '1px solid #E8ECF4',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                cursor: 'default',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Gradient header band with icon */}
              <div style={{
                padding: '28px 24px 22px',
                background: grad,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Decorative blob inside header */}
                <div style={{
                  position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.10)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: -30, left: -10, width: 100, height: 100,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                  pointerEvents: 'none',
                }} />
                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 15,
                  background: 'rgba(255,255,255,0.20)',
                  border: '1px solid rgba(255,255,255,0.30)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}>
                  <Icon size={24} color="#fff" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: 15.5, fontWeight: 800, color: '#0F172A',
                  margin: '0 0 10px', letterSpacing: '-0.02em',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: 13.5, lineHeight: 1.68, color: '#64748B',
                  margin: '0 0 20px', flex: 1,
                }}>
                  {desc}
                </p>

                {/* Bottom row: stat badge + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 20,
                    background: lightBg,
                    border: `1px solid ${color}22`,
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: statColor }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: statColor }}>{stat}</span>
                  </div>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: lightBg,
                    border: `1px solid ${color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ArrowRight size={13} style={{ color }} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
