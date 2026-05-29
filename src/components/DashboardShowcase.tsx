/**
 * DashboardShowcase.tsx — Product Tour (v2)
 *
 * Layout
 * ──────
 * Left  : Trustpilot badge · headline · description · CTA buttons · feature pills
 * Right : Main schedule screen (large, floating) + 3 smaller overlapping screens
 *
 * Background: linear-gradient(135deg, #183765 → #2399CA)
 * Reference-inspired split-hero with overlapping dashboard mockups.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarBlank, Clock, ChartBar, FileText,
  ArrowRight, Star, CheckCircle,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   MINI CHROME BAR
───────────────────────────────────────────── */
function ChromeBar({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const h = size === 'lg' ? 36 : 22;
  const d = size === 'lg' ? 9  : 6;
  const gap = size === 'lg' ? 6 : 4;
  const px  = size === 'lg' ? 14 : 9;
  return (
    <div style={{
      height: h,
      background: 'rgba(10,20,50,0.55)',
      display: 'flex', alignItems: 'center',
      padding: `0 ${px}px`, gap,
      flexShrink: 0,
    }}>
      {['#F87171', '#FBBF24', '#34D399'].map((c, i) => (
        <div key={i} style={{ width: d, height: d, borderRadius: '50%', background: c }} />
      ))}
      {size === 'lg' && (
        <div style={{
          flex: 1, marginLeft: 10, height: 20,
          background: 'rgba(255,255,255,0.08)', borderRadius: 6,
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING SCREEN
───────────────────────────────────────────── */
interface FloatProps {
  src: string; label: string; labelColor: string; labelBg: string;
  width: number; posStyle: React.CSSProperties;
  rotate: number; delay: number;
  floatY: number; floatDur: number; floatDelay?: number;
}

function FloatingScreen({
  src, label, labelColor, labelBg,
  width, posStyle, rotate, delay,
  floatY, floatDur, floatDelay = 0,
}: FloatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.70, delay, ease: EASE }}
      style={{
        position: 'absolute', ...posStyle,
        width, rotate, zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      {/* label chip */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 7 }}>
        <div style={{
          fontSize: 9, fontWeight: 800, padding: '3px 11px',
          borderRadius: 20, background: labelBg,
          color: labelColor, border: `1px solid ${labelColor}40`,
          letterSpacing: '0.09em', textTransform: 'uppercase' as const,
        }}>{label}</div>
      </div>

      {/* float animation */}
      <motion.div
        animate={{ y: [0, floatY, 0] }}
        transition={{ delay: floatDelay, duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          borderRadius: 13, overflow: 'hidden',
          boxShadow: [
            '0 28px 64px rgba(0,0,0,0.55)',
            '0 8px 24px rgba(0,0,0,0.40)',
            '0 0 0 1px rgba(255,255,255,0.10)',
          ].join(', '),
        }}>
          <ChromeBar size="sm" />
          <img src={src} alt={label} style={{ width: '100%', display: 'block' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function DashboardShowcase() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #183765 0%, #1966AA 48%, #2399CA 100%)',
      padding: '112px 48px 128px',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── dot grid (right-side fade) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 70% 50%, black 30%, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 70% 50%, black 30%, transparent)',
      }} />

      {/* ── ambient glow blobs ── */}
      <div style={{ position: 'absolute', top: '-5%', left: '38%', width: 700, height: 600, background: 'radial-gradient(ellipse, rgba(35,153,202,0.22) 0%, transparent 68%)', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: 480, height: 380, background: 'radial-gradient(ellipse, rgba(24,55,101,0.50) 0%, transparent 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1300, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }}>

          {/* ════ LEFT: text content ════ */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{ flex: '0 0 46%', maxWidth: 510 }}
          >

            {/* Trustpilot badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px 6px 10px', borderRadius: 100,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.20)',
              marginBottom: 30,
            }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} weight="fill" size={11} style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.88)' }}>
                4.5 Excellent · Trustpilot
              </span>
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '4px 14px 4px 10px', borderRadius: 100,
              background: 'rgba(35,153,202,0.18)', border: '1px solid rgba(35,153,202,0.35)',
              marginBottom: 22,
            }}>
              <CalendarBlank weight="regular" size={12} style={{ color: '#7DD3FC' }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: '#7DD3FC', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Product Tour</span>
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(2.2rem, 3.6vw, 3.4rem)',
              fontWeight: 900, color: '#FFFFFF',
              letterSpacing: '-0.046em', lineHeight: 1.07,
              marginBottom: 20,
            }}>
              The complete staffing platform{' '}
              <span style={{
                background: 'linear-gradient(125deg, #7DD3FC 0%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>for your agency</span>
            </h2>

            {/* Description */}
            <p style={{
              fontSize: 16.5, color: 'rgba(186,230,255,0.72)',
              lineHeight: 1.78, marginBottom: 36,
            }}>
              Fill shifts instantly, stay compliant, and manage your entire workforce — from scheduling to invoicing — in one powerful platform.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 32px', borderRadius: 100, textDecoration: 'none',
                  background: '#2399CA', color: '#fff',
                  fontSize: 14.5, fontWeight: 700,
                  boxShadow: '0 8px 28px rgba(35,153,202,0.45)',
                }}
              >
                Book a Demo
                <ArrowRight weight="bold" size={15} />
              </Link>
              <Link
                to="/features"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 30px', borderRadius: 100, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.09)',
                  border: '1.5px solid rgba(255,255,255,0.22)',
                  color: '#fff', fontSize: 14.5, fontWeight: 700,
                }}
              >
                Explore Features
              </Link>
            </div>

            {/* feature check-list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Shift scheduling & instant fill', color: '#38BDF8' },
                { label: 'Digital timesheets & payroll export', color: '#34D399' },
                { label: 'Compliance tracking & DBS alerts', color: '#A78BFA' },
                { label: 'Automated invoicing per client', color: '#FBBF24' },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle weight="fill" size={16} style={{ color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: 'rgba(186,230,255,0.80)' }}>{label}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* ════ RIGHT: floating screens ════ */}
          <div style={{ flex: 1, position: 'relative', height: 540, minWidth: 0 }}>

            {/* Timesheets — top left */}
            <FloatingScreen
              src="/image_01.png" label="Timesheets"
              labelColor="#34D399" labelBg="rgba(52,211,153,0.15)"
              width={210} posStyle={{ top: 10, left: 0 }}
              rotate={-6} delay={0.55}
              floatY={-10} floatDur={5.4} floatDelay={0.8}
            />

            {/* Reports — top right */}
            <FloatingScreen
              src="/reports.png" label="Reports"
              labelColor="#A78BFA" labelBg="rgba(167,139,250,0.15)"
              width={230} posStyle={{ top: 0, right: 0 }}
              rotate={5} delay={0.45}
              floatY={-9} floatDur={5.8} floatDelay={1.2}
            />

            {/* Main: Schedule — centre */}
            <motion.div
              initial={{ opacity: 0, y: 44, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.88, delay: 0.12, ease: EASE }}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 390, zIndex: 3,
              }}
            >
              {/* top halo */}
              <div style={{ position: 'absolute', top: -60, left: '5%', right: '5%', height: 120, background: 'radial-gradient(ellipse, rgba(35,153,202,0.35) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: -1 }} />

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  borderRadius: '16px 16px 0 0',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderBottom: 'none',
                }}
              >
                <ChromeBar size="lg" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  borderRadius: '0 0 16px 16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderTop: 'none',
                  boxShadow: [
                    '0 44px 110px rgba(0,0,0,0.60)',
                    '0 16px 48px rgba(0,0,0,0.45)',
                    '0 0 0 1px rgba(35,153,202,0.22)',
                    '0 0 60px rgba(35,153,202,0.12)',
                  ].join(', '),
                }}
              >
                <img
                  src="/schedule.png"
                  alt="Logezy Scheduling"
                  style={{ width: '100%', display: 'block' }}
                />
              </motion.div>

              {/* caption tag */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 18px', borderRadius: 100,
                  background: 'rgba(35,153,202,0.18)',
                  border: '1px solid rgba(35,153,202,0.30)',
                }}>
                  <CalendarBlank weight="regular" size={13} style={{ color: '#7DD3FC' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#7DD3FC' }}>Scheduling</span>
                  <span style={{ width: 1, height: 11, background: 'rgba(125,211,252,0.25)' }} />
                  <span style={{ fontSize: 11.5, color: 'rgba(186,230,255,0.50)', fontWeight: 400 }}>Fill every shift in minutes</span>
                </div>
              </div>
            </motion.div>

            {/* Invoices — bottom right */}
            <FloatingScreen
              src="/image_00.png" label="Invoices"
              labelColor="#FBBF24" labelBg="rgba(251,191,36,0.15)"
              width={215} posStyle={{ bottom: 10, right: 20 }}
              rotate={-4} delay={0.68}
              floatY={-8} floatDur={4.9} floatDelay={0.4}
            />

          </div>
          {/* end right */}

        </div>
      </div>
    </section>
  );
}
