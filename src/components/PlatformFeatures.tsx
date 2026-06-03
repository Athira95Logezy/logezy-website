import React, { useState } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ShieldCheck, BarChart3, Smartphone,
  ChevronRight, Clock, Users, FileCheck, TrendingUp,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const features = [
  {
    id: 'scheduling',
    icon: Zap,
    title: 'Instant Scheduling',
    tagline: '3× faster shift fill',
    color: '#7C3AED',
    colorLight: 'rgba(124,58,237,0.10)',
    colorBorder: 'rgba(124,58,237,0.20)',
    grad: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    desc: 'Auto-match workers to shifts by skills, availability, and location. Fill your rota in minutes, not hours — with smart conflict detection built in.',
    bullets: [
      { icon: Clock, text: 'Real-time availability matching' },
      { icon: Users, text: 'Skills-based worker suggestions' },
      { icon: FileCheck, text: 'Instant shift confirmation' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
      accentBg: 'rgba(124,58,237,0.12)',
      rows: [
        { label: 'Morning Shift', workers: 6, filled: 6, color: '#7C3AED' },
        { label: 'Afternoon Shift', workers: 8, filled: 7, color: '#7C3AED' },
        { label: 'Night Shift', workers: 4, filled: 4, color: '#7C3AED' },
      ],
    },
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: 'Compliance Tracking',
    tagline: '98.4% compliance rate',
    color: '#059669',
    colorLight: 'rgba(5,150,105,0.10)',
    colorBorder: 'rgba(5,150,105,0.20)',
    grad: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    desc: 'Automatic alerts for expiring DBS checks, training, and certifications. Stay audit-ready at all times, with zero manual chasing.',
    bullets: [
      { icon: ShieldCheck, text: 'DBS & right-to-work checks' },
      { icon: FileCheck, text: 'Expiry alerts before deadlines' },
      { icon: TrendingUp, text: 'Full audit trail & reports' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
      accentBg: 'rgba(5,150,105,0.12)',
      rows: [
        { label: 'DBS Checks', workers: 45, filled: 44, color: '#059669' },
        { label: 'Training Certs', workers: 30, filled: 29, color: '#059669' },
        { label: 'RTW Documents', workers: 20, filled: 20, color: '#059669' },
      ],
    },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Live Analytics',
    tagline: '60% less admin time',
    color: '#D97706',
    colorLight: 'rgba(217,119,6,0.10)',
    colorBorder: 'rgba(217,119,6,0.20)',
    grad: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    desc: 'Real-time dashboards across vacancies, timesheets, and invoices — every metric in one view, with exportable reports at a click.',
    bullets: [
      { icon: BarChart3, text: 'Live revenue & placement stats' },
      { icon: FileCheck, text: 'Timesheet approval tracking' },
      { icon: TrendingUp, text: 'Custom report builder' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      accentBg: 'rgba(217,119,6,0.12)',
      rows: [
        { label: 'Revenue MTD', workers: 10, filled: 7, color: '#D97706' },
        { label: 'Timesheets Due', workers: 15, filled: 14, color: '#D97706' },
        { label: 'Invoices Sent', workers: 12, filled: 12, color: '#D97706' },
      ],
    },
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App',
    tagline: 'iOS & Android',
    color: '#0369A1',
    colorLight: 'rgba(3,105,161,0.10)',
    colorBorder: 'rgba(3,105,161,0.20)',
    grad: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
    desc: 'Workers clock in via GPS, submit timesheets, and update their availability from anywhere. Managers approve on the go — no desktop needed.',
    bullets: [
      { icon: Smartphone, text: 'GPS clock-in & clock-out' },
      { icon: FileCheck, text: 'Mobile timesheet submission' },
      { icon: Users, text: 'Push notifications for shifts' },
    ],
    preview: {
      bg: 'linear-gradient(135deg, #DBEAFE 0%, #BAE6FD 100%)',
      accentBg: 'rgba(3,105,161,0.12)',
      rows: [
        { label: 'Active Workers', workers: 22, filled: 18, color: '#0369A1' },
        { label: 'Pending Approvals', workers: 8, filled: 5, color: '#0369A1' },
        { label: 'GPS Check-ins', workers: 20, filled: 20, color: '#0369A1' },
      ],
    },
  },
];

/* ─────────────────────────────────────────────
   MINI PREVIEW CARD
───────────────────────────────────────────── */
function PreviewCard({ feature }: { feature: typeof features[0] }) {
  return (
    <motion.div
      key={feature.id}
      initial={{ opacity: 0, x: 20, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: feature.preview.bg,
        borderRadius: 20,
        padding: 28,
        height: '100%',
        minHeight: 320,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blob */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 160, height: 160,
        borderRadius: '50%', background: feature.preview.accentBg,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: feature.grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 16px ${feature.color}30`,
        }}>
          <feature.icon size={20} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{feature.title}</div>
          <div style={{ fontSize: 11, color: feature.color, fontWeight: 600 }}>{feature.tagline}</div>
        </div>
      </div>

      {/* Stats rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {feature.preview.rows.map((row) => {
          const pct = Math.round((row.filled / row.workers) * 100);
          return (
            <div key={row.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{row.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: row.color }}>{row.filled}/{row.workers}</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.6)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: '100%', borderRadius: 99,
                    background: `linear-gradient(90deg, ${row.color} 0%, ${row.color}99 100%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live badge */}
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 99,
        background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: feature.color }}
        />
        <span style={{ fontSize: 10.5, fontWeight: 700, color: feature.color }}>Live</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function PlatformFeatures() {
  const [activeId, setActiveId] = useState(features[0].id);
  const active = features.find((f) => f.id === activeId)!;
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <section style={{
      background: 'linear-gradient(180deg, #06090E 0px, #0E1525 60px, #F8F9FF 160px, #FFFFFF 280px)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: 200,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '60px 20px 72px' : '80px 40px 96px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADLINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
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
              color: '#7C3AED', display: 'inline'}}>
              that mean business.
            </span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.72, color: '#64748B', margin: '0 auto', maxWidth: 560 }}>
            Every feature in Logezy is purpose-built for temp staffing — from first booking to final invoice.
          </p>
        </motion.div>

        {/* ── EXPAND LAYOUT ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 420px',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* LEFT: accordion list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map((feat, i) => {
              const isOpen = activeId === feat.id;
              return (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActiveId(feat.id)}
                  style={{
                    borderRadius: 18,
                    border: isOpen
                      ? `1.5px solid ${feat.colorBorder}`
                      : '1.5px solid #E8ECF4',
                    background: isOpen ? '#fff' : '#FAFBFF',
                    boxShadow: isOpen
                      ? `0 8px 32px ${feat.color}12, 0 2px 8px rgba(0,0,0,0.04)`
                      : '0 1px 4px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
                  }}
                >
                  {/* Header row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '20px 24px',
                  }}>
                    {/* Icon */}
                    <div style={{
                      width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                      background: isOpen ? feat.grad : '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isOpen ? `0 4px 14px ${feat.color}30` : 'none',
                      transition: 'all 0.3s',
                    }}>
                      <feat.icon
                        size={20}
                        color={isOpen ? '#fff' : '#94A3B8'}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Title + tagline */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 15, fontWeight: 800,
                        color: isOpen ? '#0F172A' : '#334155',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.2s',
                      }}>
                        {feat.title}
                      </div>
                      {!isOpen && (
                        <div style={{ fontSize: 12.5, color: '#94A3B8', fontWeight: 500, marginTop: 2 }}>
                          {feat.tagline}
                        </div>
                      )}
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: isOpen ? feat.colorLight : '#F1F5F9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ChevronRight size={14} color={isOpen ? feat.color : '#94A3B8'} strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 24px 24px',
                          borderTop: `1px solid ${feat.colorBorder}`,
                          marginTop: 0,
                        }}>
                          <p style={{
                            fontSize: 14, lineHeight: 1.72, color: '#475569',
                            margin: '16px 0 20px',
                          }}>
                            {feat.desc}
                          </p>

                          {/* Bullet points */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {feat.bullets.map((b) => (
                              <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                  background: feat.colorLight,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  <b.icon size={13} color={feat.color} strokeWidth={2.5} />
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{b.text}</span>
                              </div>
                            ))}
                          </div>

                          {/* Stat badge */}
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            marginTop: 20,
                            padding: '6px 14px', borderRadius: 99,
                            background: feat.colorLight,
                            border: `1px solid ${feat.colorBorder}`,
                          }}>
                            <motion.div
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ repeat: Infinity, duration: 1.4 }}
                              style={{ width: 6, height: 6, borderRadius: '50%', background: feat.color }}
                            />
                            <span style={{ fontSize: 12, fontWeight: 700, color: feat.color }}>{feat.tagline}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: animated preview card — hidden on mobile */}
          {!isMobile && <div style={{ position: 'sticky', top: 24 }}>
            <AnimatePresence mode="wait">
              <PreviewCard key={active.id} feature={active} />
            </AnimatePresence>
          </div>}
        </motion.div>

      </div>
    </section>
  );
}
