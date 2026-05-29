/**
 * IndustrySolutions.tsx — Animated horizontal rows · Light theme
 *
 * Three full-width industry strips stacked vertically.
 * Each strip: number + floating icon | headline + inline bullets | animated stat | CTA
 * Hover: coloured bg wipes in from left, icon bounces, bullets glow.
 * Entrance: alternating slide-in from left/right.
 * Stat: counts up when row enters the viewport.
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Heartbeat, Briefcase, Users,
  Buildings, ArrowUpRight, CheckCircle,
  Shield, Clock, CalendarBlank, FileText,
  Bell, MapPin, ChartBar,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const industries = [
  {
    id: 'healthcare', slug: '/industries/healthcare',
    num: '01', icon: Heartbeat, label: 'Healthcare',
    color: '#F43F5E', colorBg: 'rgba(244,63,94,0.07)', colorBorder: 'rgba(244,63,94,0.18)',
    stat: 98, suffix: '%', statLabel: 'compliance rate',
    headline: 'The right staff, compliantly placed — every time',
    bullets: ['NMC / HCPC & DBS automation', 'CQC-ready compliance logs', 'GPS clock-in for lone workers'],
    tags: [Shield, Clock, MapPin, FileText],
  },
  {
    id: 'hospitality', slug: '/industries/hospitality',
    num: '02', icon: Briefcase, label: 'Hospitality',
    color: '#F59E0B', colorBg: 'rgba(245,158,11,0.07)', colorBorder: 'rgba(245,158,11,0.20)',
    stat: 3, suffix: '×', statLabel: 'faster shift fill',
    headline: 'Fill every shift in seconds — even last minute',
    bullets: ['Multi-venue scheduling', 'Instant shift fill & alerts', 'Auto invoicing per venue'],
    tags: [CalendarBlank, Bell, FileText, ChartBar],
  },
  {
    id: 'education', slug: '/industries/education',
    num: '03', icon: Users, label: 'Education',
    color: '#8B5CF6', colorBg: 'rgba(139,92,246,0.07)', colorBorder: 'rgba(139,92,246,0.18)',
    stat: 60, suffix: '%', statLabel: 'faster bookings',
    headline: 'Same-day placements without the paperwork headache',
    bullets: ['DBS & safeguarding checks', 'AWR-compliant payroll', 'School portal with live visibility'],
    tags: [Shield, CalendarBlank, Bell, Clock],
  },
];

type Ind = typeof industries[0];


/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ target, suffix, color, inView }: { target: number; suffix: string; color: string; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    setVal(0);
    const duration = 1200;
    const steps = 40;
    const inc = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.round(cur));
    }, duration / steps);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, letterSpacing: '-0.04em' }}>
      {val}{suffix}
    </span>
  );
}


/* ─────────────────────────────────────────────
   DIVIDER
───────────────────────────────────────────── */
function Divider() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(203,213,225,0.6) 20%, rgba(203,213,225,0.6) 80%, transparent)',
    }} />
  );
}


/* ─────────────────────────────────────────────
   INDUSTRY ROW
───────────────────────────────────────────── */
function IndustryRow({ ind, index }: { ind: Ind; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef as React.RefObject<Element>, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.10, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}
    >
      {/* ── hover bg wipe (left → right) ── */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.38, ease: EASE }}
        style={{
          position: 'absolute', inset: 0,
          background: ind.colorBg,
          transformOrigin: 'left center',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── row content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center',
        gap: 0, padding: '36px 40px',
      }}>

        {/* ── LEFT: number + icon + label ── */}
        <div style={{
          flexShrink: 0, width: 130,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          paddingRight: 40,
          borderRight: `1px solid ${ind.colorBorder}`,
        }}>
          <span style={{
            fontSize: 10, fontWeight: 900, letterSpacing: '0.14em',
            color: ind.color, opacity: 0.6,
          }}>{ind.num}</span>

          {/* floating icon */}
          <motion.div
            animate={hovered
              ? { y: [-4, 4, -4], scale: 1.12, rotate: 6 }
              : { y: 0, scale: 1, rotate: 0 }}
            transition={hovered
              ? { y: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.3 }, rotate: { duration: 0.3 } }
              : { duration: 0.35 }}
            style={{
              width: 64, height: 64, borderRadius: 18, flexShrink: 0,
              background: `linear-gradient(135deg, ${ind.color}22, ${ind.color}0D)`,
              border: `2px solid ${ind.colorBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: hovered ? `0 12px 32px ${ind.color}30` : 'none',
              transition: 'box-shadow 0.3s',
            }}
          >
            <ind.icon weight="regular" size={28} style={{ color: ind.color }} />
          </motion.div>

          <span style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', letterSpacing: '0.01em' }}>{ind.label}</span>

          {/* mini feature icons */}
          <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
            {ind.tags.map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ scale: hovered ? 1.15 : 1 }}
                transition={{ delay: i * 0.04, duration: 0.22 }}
                style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: hovered ? `${ind.color}18` : 'rgba(241,245,249,0.8)',
                  border: `1px solid ${hovered ? ind.colorBorder : 'rgba(226,232,240,0.8)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
              >
                <Icon weight="regular" size={12} style={{ color: hovered ? ind.color : '#94A3B8' }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CENTRE: headline + bullets ── */}
        <div style={{ flex: 1, paddingLeft: 40, paddingRight: 40 }}>
          <h3 style={{
            fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            fontWeight: 800, color: '#0F172A',
            letterSpacing: '-0.03em', lineHeight: 1.25,
            marginBottom: 16,
          }}>{ind.headline}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ind.bullets.map((b, i) => (
              <motion.div
                key={b}
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ delay: i * 0.05, duration: 0.22 }}
                style={{ display: 'flex', alignItems: 'center', gap: 9 }}
              >
                <CheckCircle
                  weight="fill" size={15}
                  style={{ color: ind.color, flexShrink: 0, opacity: hovered ? 1 : 0.7, transition: 'opacity 0.2s' }}
                />
                <span style={{ fontSize: 13.5, fontWeight: 500, color: hovered ? '#1E293B' : '#64748B', transition: 'color 0.2s' }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: animated stat + CTA ── */}
        <div style={{
          flexShrink: 0, width: 180,
          paddingLeft: 40,
          borderLeft: `1px solid ${ind.colorBorder}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <Counter target={ind.stat} suffix={ind.suffix} color={ind.color} inView={inView} />
          <span style={{ fontSize: 11.5, color: '#94A3B8', fontWeight: 500, marginBottom: 16 }}>{ind.statLabel}</span>

          <Link
            to={ind.slug}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 20px', borderRadius: 10,
              background: hovered ? ind.color : 'transparent',
              border: `1.5px solid ${ind.color}`,
              color: hovered ? '#fff' : ind.color,
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
          >
            Explore
            <ArrowUpRight weight="bold" size={13} />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function IndustrySolutions() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: '#FFFFFF',
      padding: '100px 0 112px',
    }}>

      {/* ── top + bottom subtle stripe ── */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(203,213,225,0.5),transparent)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(203,213,225,0.5),transparent)' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.60, ease: EASE }}
          style={{ marginBottom: 60 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px 5px 11px', borderRadius: 100,
            background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)',
            marginBottom: 20,
          }}>
            <Buildings weight="regular" size={13} style={{ color: '#6366F1' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#6366F1', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Industry Solutions</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 900, color: '#0F172A',
              letterSpacing: '-0.045em', lineHeight: 1.08, margin: 0,
            }}>
              Built for every sector{' '}
              <span style={{
                background: 'linear-gradient(125deg, #F43F5E 0%, #F59E0B 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>that never slows down</span>
            </h2>
            <p style={{ fontSize: 15.5, color: '#64748B', maxWidth: 340, lineHeight: 1.72, margin: 0 }}>
              Tailored tools for healthcare, hospitality, and education agencies.
            </p>
          </div>
        </motion.div>

      </div>

      {/* ── ROWS — full bleed so hover bg goes edge-to-edge ── */}
      <div style={{ borderTop: '1px solid rgba(226,232,240,0.7)', borderBottom: '1px solid rgba(226,232,240,0.7)' }}>
        {industries.map((ind, i) => (
          <React.Fragment key={ind.id}>
            {i > 0 && <Divider />}
            <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>
              <IndustryRow ind={ind} index={i} />
            </div>
          </React.Fragment>
        ))}
      </div>

    </section>
  );
}
