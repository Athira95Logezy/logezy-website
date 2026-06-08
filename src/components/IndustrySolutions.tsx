/**
 * IndustrySolutions.tsx — Service cards grid + sticky description panel
 *
 * Layout
 * ──────
 * Left : 2-col card grid (6 industry verticals)
 * Right: sticky panel — heading · description · CTA (watermark behind)
 *
 * Style reference: white shadow cards on light bg, coloured icon containers,
 * decorative blob on each card, SVG underline accent on heading, pill CTA.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../hooks/useWindowWidth';
import {
  Heartbeat, Shield, Briefcase, Bell,
  Users, ChartBar, Buildings, ArrowRight,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const cards = [
  {
    id: 'healthcare',
    icon: Heartbeat,
    label: 'Healthcare Staffing',
    desc: 'NMC & HCPC compliant placements for hospitals, clinics and NHS trusts.',
    color: '#F43F5E',
    light: '#FFF1F3',
    blob: 'rgba(244,63,94,0.08)',
  },
  {
    id: 'care',
    icon: Shield,
    label: 'Nursing & Care',
    desc: 'End-to-end rostering for care homes and lone workers with GPS clock-in.',
    color: '#10B981',
    light: '#ECFDF5',
    blob: 'rgba(16,185,129,0.08)',
  },
  {
    id: 'hotels',
    icon: Briefcase,
    label: 'Hotels & Resorts',
    desc: 'Multi-venue shift scheduling that fills every rota in seconds.',
    color: '#F59E0B',
    light: '#FFFBEB',
    blob: 'rgba(245,158,11,0.08)',
  },
  {
    id: 'events',
    icon: Bell,
    label: 'Events & Catering',
    desc: 'Last-minute shift alerts and auto-invoicing per client or event.',
    color: '#F97316',
    light: '#FFF7ED',
    blob: 'rgba(249,115,22,0.08)',
  },
  {
    id: 'schools',
    icon: Users,
    label: 'Schools & Academies',
    desc: 'Same-day cover teachers with DBS and safeguarding automation built in.',
    color: '#8B5CF6',
    light: '#F5F3FF',
    blob: 'rgba(139,92,246,0.08)',
  },
  {
    id: 'tutoring',
    icon: ChartBar,
    label: 'Tutoring & SEN',
    desc: 'AWR-compliant payroll and a school portal with live booking visibility.',
    color: '#3B82F6',
    light: '#EFF6FF',
    blob: 'rgba(59,130,246,0.08)',
  },
] as const;

type Card = typeof cards[number];


/* ─────────────────────────────────────────────
   INDUSTRY CARD
───────────────────────────────────────────── */
function IndustryCard({ card, index }: { card: Card; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -7, transition: { duration: 0.28, ease: EASE } }}
      style={{
        background: '#FFFFFF',
        borderRadius: 22,
        padding: '32px 28px 30px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 6px rgba(0,0,0,0.04)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        /* hover shadow handled by CSS transition below */
        transition: 'box-shadow 0.28s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 20px 52px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1.5px ${card.color}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 4px 24px rgba(0,0,0,0.06), 0 1px 6px rgba(0,0,0,0.04)';
      }}
    >
      {/* ── decorative blob (top-right) ── */}
      <div style={{
        position: 'absolute', top: -28, right: -28,
        width: 110, height: 110, borderRadius: '50%',
        background: card.blob,
        pointerEvents: 'none',
      }} />

      {/* ── icon container ── */}
      <div style={{
        width: 70, height: 70, borderRadius: 20,
        background: card.light,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 22,
        position: 'relative',
      }}>
        <card.icon weight="regular" size={36} style={{ color: card.color }} />
      </div>

      {/* ── label ── */}
      <h3 style={{
        fontSize: 16.5, fontWeight: 800, color: '#183963',
        letterSpacing: '-0.025em', lineHeight: 1.25,
        marginBottom: 10,
      }}>
        {card.label}
      </h3>

      {/* ── description ── */}
      <p style={{
        fontSize: 13.5, color: '#64748B',
        lineHeight: 1.65, margin: 0,
      }}>
        {card.desc}
      </p>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function IndustrySolutions() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;
  return (
    <section style={{
      background: '#F7F6FF',
      padding: isMobile ? '64px 0 72px' : '108px 0 120px',
      overflow: 'hidden',
      position: 'relative',
    }}>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* ── flex row: cards | panel ── */}
        <div style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          gap: isTablet ? 40 : 72,
          alignItems: 'flex-start',
        }}>

          {/* ════ LEFT: 2-col card grid ════ */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 16,
          }}>
            {cards.map((card, i) => (
              <IndustryCard key={card.id} card={card} index={i} />
            ))}
          </div>

          {/* ════ RIGHT: description panel (sticky) ════ */}
          <div style={{
            width: isTablet ? '100%' : 380, flexShrink: 0,
            position: isTablet ? 'relative' : 'sticky', top: 100,
            paddingTop: 8,
          }}>

            {/* watermark */}
            <div style={{
              position: 'absolute',
              top: -30, left: -50,
              fontSize: 130, fontWeight: 900,
              color: 'rgba(99,102,241,0.055)',
              letterSpacing: '-0.06em',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}>
              Industries
            </div>

            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.70, delay: 0.18, ease: EASE }}
              style={{ position: 'relative', zIndex: 1 }}
            >

              {/* badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 16px 5px 11px', borderRadius: 100,
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.18)',
                marginBottom: 22,
              }}>
                <Buildings weight="regular" size={13} style={{ color: '#2396C6' }} />
                <span style={{
                  fontSize: 10.5, fontWeight: 800,
                  color: '#2396C6', letterSpacing: '0.11em',
                  textTransform: 'uppercase' as const,
                }}>Industry Solutions</span>
              </div>

              {/* heading + underline accent */}
              <h2 style={{
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                fontWeight: 900, color: '#183963',
                letterSpacing: '-0.045em', lineHeight: 1.1,
                marginBottom: 22,
              }}>
                Industries{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  We Serve
                  <svg
                    viewBox="0 0 130 14"
                    style={{
                      position: 'absolute', bottom: -8, left: 0,
                      width: '100%', height: 12,
                      overflow: 'visible',
                    }}
                  >
                    <path
                      d="M3 9 Q65 2 127 9"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              {/* description */}
              <p style={{
                fontSize: 15.5, color: '#64748B',
                lineHeight: 1.78, marginBottom: 24,
              }}>
                We've built Logezy to handle the complexity of UK staffing agencies, helping teams reduce admin, stay compliant, and fill shifts faster across every sector.
              </p>

              {/* interest link */}
              <p style={{
                fontSize: 14, color: '#2396C6',
                fontWeight: 600, marginBottom: 36,
              }}>
                Interested? Let's explore your sector →
              </p>

              {/* CTA button */}
              <a
                href="https://booking.logezy.co/#/67044000000025008"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 34px', borderRadius: 100,
                  background: 'linear-gradient(135deg, #F43F5E 0%, #F97316 100%)',
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(244,63,94,0.28)',
                  transition: 'transform 0.22s, box-shadow 0.22s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 36px rgba(244,63,94,0.38)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(244,63,94,0.28)';
                }}
              >
                Book a Demo
                <ArrowRight weight="bold" size={16} />
              </a>

            </motion.div>
          </div>
          {/* end right panel */}

        </div>
      </div>
    </section>
  );
}
