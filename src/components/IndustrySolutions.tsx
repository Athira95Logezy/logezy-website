/**
 * IndustrySolutions.tsx — Industry teaser cards · Light SaaS
 *
 * Three compact cards, each teasing an industry detail page.
 * Image at top fades into card body. Short headline + 3 bullets + stat + CTA.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Heartbeat, Briefcase, Users,
  Buildings, ArrowUpRight,
  CheckCircle,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const industries = [
  {
    id: 'healthcare',
    slug: '/industries/healthcare',
    icon: Heartbeat,
    label: 'Healthcare',
    color:      '#F43F5E',
    colorLight: 'rgba(244,63,94,0.10)',
    colorBorder:'rgba(244,63,94,0.22)',
    colorText:  '#BE123C',
    stat: '98%', statLabel: 'compliance rate',
    headline: 'The right staff, compliantly placed',
    bullets: [
      'NMC / HCPC & DBS automation',
      'CQC-ready compliance logs',
      'GPS clock-in for lone workers',
    ],
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80',
    imgAlt: 'Healthcare staffing',
  },
  {
    id: 'hospitality',
    slug: '/industries/hospitality',
    icon: Briefcase,
    label: 'Hospitality',
    color:      '#F59E0B',
    colorLight: 'rgba(245,158,11,0.10)',
    colorBorder:'rgba(245,158,11,0.24)',
    colorText:  '#B45309',
    stat: '3×', statLabel: 'faster shift fill',
    headline: 'Fill every shift — even last minute',
    bullets: [
      'Multi-venue scheduling',
      'Instant shift fill & alerts',
      'Auto invoicing per venue',
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    imgAlt: 'Hospitality staffing',
  },
  {
    id: 'education',
    slug: '/industries/education',
    icon: Users,
    label: 'Education',
    color:      '#8B5CF6',
    colorLight: 'rgba(139,92,246,0.10)',
    colorBorder:'rgba(139,92,246,0.22)',
    colorText:  '#6D28D9',
    stat: '60%', statLabel: 'faster bookings',
    headline: 'Same-day placements, zero paperwork',
    bullets: [
      'DBS & safeguarding checks',
      'AWR-compliant payroll',
      'School portal with live visibility',
    ],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    imgAlt: 'Education staffing',
  },
];

type Ind = typeof industries[0];


/* ─────────────────────────────────────────────
   INDUSTRY CARD
───────────────────────────────────────────── */
function IndustryCard({ ind, index }: { ind: Ind; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.60, delay: index * 0.11, ease: EASE }}
      style={{ position: 'relative' }}
    >
      <motion.div
        whileHover={{ y: -7 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        style={{
          background: '#fff',
          borderRadius: 20,
          border: `1px solid ${ind.colorBorder}`,
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* ── image section ── */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={ind.image}
            alt={ind.imgAlt}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* coloured overlay — subtle tint */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(160deg, ${ind.color}28 0%, transparent 55%)`,
          }} />

          {/* fade to white at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 80,
            background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)',
          }} />

          {/* floating industry badge — bottom-left of image */}
          <div style={{
            position: 'absolute', bottom: 16, left: 20,
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 14px 6px 10px', borderRadius: 100,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${ind.colorBorder}`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          }}>
            <ind.icon weight="regular" size={14} style={{ color: ind.color }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: ind.colorText, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>{ind.label}</span>
          </div>
        </div>

        {/* ── card body ── */}
        <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* headline */}
          <h3 style={{
            fontSize: '1.18rem',
            fontWeight: 800, color: '#0F172A',
            letterSpacing: '-0.03em', lineHeight: 1.28,
            marginBottom: 16,
          }}>{ind.headline}</h3>

          {/* bullets — concise */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22, flex: 1 }}>
            {ind.bullets.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <CheckCircle weight="fill" size={14} style={{ color: ind.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: '#475569', fontWeight: 500 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* footer: stat left, CTA right */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 18,
            borderTop: `1px solid ${ind.colorBorder}`,
          }}>
            <div>
              <span style={{ fontSize: 24, fontWeight: 900, color: ind.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{ind.stat} </span>
              <span style={{ fontSize: 11.5, color: '#94A3B8', fontWeight: 500 }}>{ind.statLabel}</span>
            </div>

            <Link
              to={ind.slug}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 10,
                background: ind.colorLight,
                border: `1px solid ${ind.colorBorder}`,
                color: ind.colorText,
                fontSize: 13, fontWeight: 700,
                textDecoration: 'none',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              Explore
              <ArrowUpRight weight="bold" size={13} />
            </Link>
          </div>
        </div>
      </motion.div>
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
      background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 40%, #F8FAFF 100%)',
      padding: '100px 48px 112px',
    }}>

      {/* ── dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.05) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        maskImage:       'radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.60, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          {/* badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px 5px 11px', borderRadius: 100,
            background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)',
            marginBottom: 20,
          }}>
            <Buildings weight="regular" size={13} style={{ color: '#6366F1' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#6366F1', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Industry Solutions</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
            fontWeight: 900, color: '#0F172A',
            letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: 16,
          }}>
            Built for every sector{' '}
            <span style={{
              background: 'linear-gradient(125deg, #F43F5E 0%, #F59E0B 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>that never slows down</span>
          </h2>

          <p style={{ fontSize: 16.5, color: '#64748B', maxWidth: 460, margin: '0 auto', lineHeight: 1.78 }}>
            Tailored tools for healthcare, hospitality and education agencies. Pick your sector to see how Logezy fits.
          </p>
        </motion.div>

        {/* ── CARDS ── */}
        <div
          className="industry-cards"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {industries.map((ind, i) => (
            <IndustryCard key={ind.id} ind={ind} index={i} />
          ))}
        </div>

      </div>

      {/* responsive */}
      <style>{`
        @media (max-width: 960px) {
          .industry-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .industry-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
