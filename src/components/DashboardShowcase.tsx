/**
 * DashboardShowcase.tsx — Product Tour
 *
 * Layout
 * ──────
 * • Dark navy section
 * • Header: badge · H2 · subtitle
 * • Showcase: Schedule screen (BIG, centred, browser chrome)
 *             + 3 small floating screens around it:
 *               Timesheets (top-left) · Reports (top-right) · Invoices (bottom-right)
 * • Feature chips + CTA below
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarBlank, Clock, ChartBar, FileText, ArrowRight, Desktop } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   MINI CHROME BAR  (used on both big + small)
───────────────────────────────────────────── */
function ChromeBar({ url, size = 'sm' }: { url?: string; size?: 'sm' | 'lg' }) {
  const h  = size === 'lg' ? 38 : 24;
  const d  = size === 'lg' ? 10  : 6;
  const fs = size === 'lg' ? 10  : 8.5;
  const r  = size === 'lg' ? 8   : 5;
  return (
    <div style={{
      height: h, background: '#0D1526',
      display: 'flex', alignItems: 'center',
      padding: `0 ${size === 'lg' ? 14 : 9}px`, gap: size === 'lg' ? 6 : 4,
      flexShrink: 0,
    }}>
      {['#F87171', '#FBBF24', '#34D399'].map((c, i) => (
        <div key={i} style={{ width: d, height: d, borderRadius: '50%', background: c, flexShrink: 0 }} />
      ))}
      <div style={{
        flex: 1, marginLeft: size === 'lg' ? 10 : 6,
        height: size === 'lg' ? 22 : 14,
        background: '#1A2540', borderRadius: r,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {url && <span style={{ fontSize: fs, color: 'rgba(255,255,255,0.30)', fontWeight: 500 }}>{url}</span>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SMALL FLOATING SCREEN
───────────────────────────────────────────── */
interface FloatProps {
  src: string; label: string; labelColor: string; labelBg: string; labelBorder: string;
  width: number;
  posStyle: React.CSSProperties;   // top/bottom/left/right for the absolute wrapper
  rotate: number;
  delay: number;
  floatY: number; floatDur: number; floatDelay: number;
}

function FloatingScreen({
  src, label, labelColor, labelBg, labelBorder,
  width, posStyle, rotate, delay,
  floatY, floatDur, floatDelay,
}: FloatProps) {
  return (
    /* entrance wrapper */
    <motion.div
      initial={{ opacity: 0, scale: 0.80, y: 32 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className="hidden xl:block"
      style={{
        position: 'absolute',
        ...posStyle,
        width,
        rotate,
        zIndex: 6,
        pointerEvents: 'none',
      }}
    >
      {/* label chip */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <div style={{
          fontSize: 9.5, fontWeight: 800, padding: '4px 13px',
          borderRadius: 20, background: labelBg,
          color: labelColor, border: `1px solid ${labelBorder}`,
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          boxShadow: `0 2px 12px ${labelBg}`,
        }}>{label}</div>
      </div>

      {/* float wrapper */}
      <motion.div
        animate={{ y: [0, floatY, 0] }}
        transition={{ delay: floatDelay, duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* screen frame */}
        <div style={{
          borderRadius: 12, overflow: 'hidden',
          boxShadow: [
            '0 28px 64px rgba(0,0,0,0.65)',
            '0 8px 24px rgba(0,0,0,0.45)',
            '0 0 0 1px rgba(255,255,255,0.09)',
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
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #060C1C 0%, #0B1530 45%, #060C1C 100%)',
      padding: '116px 48px 128px',
    }}>

      {/* ── background glow blobs ── */}
      <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 700, background: 'radial-gradient(ellipse, rgba(23,149,199,0.11) 0%, rgba(99,102,241,0.06) 48%, transparent 70%)', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '15%', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '55%', left: '5%', width: 480, height: 400, background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* ── dot grid ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 85% 65% at 50% 30%, black, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 30%, black, transparent)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1340, margin: '0 auto' }}>

        {/* ════ HEADER ════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          {/* badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px 5px 11px', borderRadius: 100, background: 'rgba(23,149,199,0.11)', border: '1px solid rgba(23,149,199,0.26)', marginBottom: 22 }}>
            <Desktop weight="regular" size={13} style={{ color: '#38BDF8' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#38BDF8', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Product Tour</span>
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
            fontWeight: 900, color: '#F1F5F9',
            letterSpacing: '-0.046em', lineHeight: 1.07, marginBottom: 18,
          }}>
            See Logezy{' '}
            <span style={{
              background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 50%, #34D399 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>in action</span>
          </h2>

          {/* subtitle */}
          <p style={{ fontSize: 17, color: 'rgba(165,210,255,0.60)', maxWidth: 500, margin: '0 auto', lineHeight: 1.80 }}>
            Your complete scheduling hub — timesheets, reports and invoices always within reach.
          </p>
        </motion.div>


        {/* ════ SHOWCASE AREA ════
            Container is relative. Schedule centred (big).
            3 small screens positioned absolutely around it.
            paddingTop/Bottom create space for floaters that extend beyond schedule.
        */}
        <div style={{ position: 'relative', paddingTop: 72, paddingBottom: 80 }}>

          {/* ── Floating: Timesheets (top-left) ── */}
          <FloatingScreen
            src="/image_01.png"
            label="Timesheets"
            labelColor="#10B981"
            labelBg="rgba(16,185,129,0.14)"
            labelBorder="rgba(16,185,129,0.30)"
            width={272}
            posStyle={{ top: 0, left: 0 }}
            rotate={-7}
            delay={0.50}
            floatY={-11} floatDur={4.9} floatDelay={0.8}
          />

          {/* ── Floating: Reports (top-right) ── */}
          <FloatingScreen
            src="/reports.png"
            label="Reports"
            labelColor="#818CF8"
            labelBg="rgba(129,140,248,0.14)"
            labelBorder="rgba(129,140,248,0.30)"
            width={258}
            posStyle={{ top: 0, right: 0 }}
            rotate={6}
            delay={0.65}
            floatY={-9} floatDur={5.3} floatDelay={1.2}
          />

          {/* ── Floating: Invoices (bottom-right) ── */}
          <FloatingScreen
            src="/image_00.png"
            label="Invoices"
            labelColor="#F59E0B"
            labelBg="rgba(245,158,11,0.14)"
            labelBorder="rgba(245,158,11,0.30)"
            width={264}
            posStyle={{ bottom: 0, right: 60 }}
            rotate={-5}
            delay={0.80}
            floatY={-10} floatDur={4.6} floatDelay={0.5}
          />

          {/* ── Main: Schedule (BIG) ── */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.90, delay: 0.10, ease: EASE }}
            style={{ position: 'relative', maxWidth: 860, margin: '0 auto', zIndex: 3 }}
          >
            {/* top glow halo */}
            <div style={{ position: 'absolute', top: -80, left: '8%', right: '8%', height: 160, background: 'radial-gradient(ellipse, rgba(23,149,199,0.30) 0%, rgba(99,102,241,0.12) 50%, transparent 72%)', filter: 'blur(48px)', pointerEvents: 'none', zIndex: -1 }} />

            {/* browser frame */}
            <div style={{
              borderRadius: '18px 18px 0 0',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.09)',
              borderBottom: 'none',
            }}>
              <ChromeBar size="lg" />
            </div>

            {/* screenshot */}
            <div style={{
              borderRadius: '0 0 18px 18px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.09)',
              borderTop: 'none',
              boxShadow: [
                '0 48px 130px rgba(0,0,0,0.70)',
                '0 20px 56px rgba(0,0,0,0.50)',
                '0 0 0 1px rgba(23,149,199,0.18)',
                '0 0 80px rgba(23,149,199,0.08)',
              ].join(', '),
            }}>
              <img
                src="/schedule.png"
                alt="Logezy Scheduling"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            {/* caption tag below screen */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '8px 20px', borderRadius: 100,
                background: 'rgba(23,149,199,0.10)',
                border: '1px solid rgba(23,149,199,0.22)',
              }}>
                <CalendarBlank weight="regular" size={14} style={{ color: '#38BDF8' }} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: '#38BDF8' }}>Scheduling</span>
                <span style={{ width: 1, height: 12, background: 'rgba(56,189,248,0.25)' }} />
                <span style={{ fontSize: 12, color: 'rgba(165,210,255,0.52)', fontWeight: 400 }}>Fill every shift in minutes</span>
              </div>
            </div>
          </motion.div>

        </div>
        {/* end showcase */}


        {/* ════ FEATURE CHIPS ════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.60, delay: 0.25, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}
        >
          {[
            {
              icon: Clock, label: 'Timesheets',
              desc: 'Track hours & automate payroll',
              color: '#10B981', bg: 'rgba(16,185,129,0.09)', border: 'rgba(16,185,129,0.22)',
            },
            {
              icon: ChartBar, label: 'Reports',
              desc: 'Insights that drive decisions',
              color: '#818CF8', bg: 'rgba(129,140,248,0.09)', border: 'rgba(129,140,248,0.22)',
            },
            {
              icon: FileText, label: 'Invoices',
              desc: 'Get paid faster, every time',
              color: '#F59E0B', bg: 'rgba(245,158,11,0.09)', border: 'rgba(245,158,11,0.22)',
            },
          ].map(({ icon: Icon, label, desc, color, bg, border }) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '11px 20px', borderRadius: 16,
                background: bg, border: `1px solid ${border}`,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${color}16`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon weight="regular" size={17} style={{ color }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#F1F5F9' }}>{label}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(165,210,255,0.50)', marginTop: 1 }}>{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>


        {/* ════ CTA ════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
          style={{ textAlign: 'center' }}
        >
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 32px', borderRadius: 14, textDecoration: 'none',
              background: 'linear-gradient(135deg, #1795C7 0%, #6366F1 100%)',
              color: '#fff', fontSize: 14.5, fontWeight: 700,
              boxShadow: '0 8px 32px rgba(23,149,199,0.38), 0 2px 10px rgba(0,0,0,0.25)',
            }}
          >
            Explore all features
            <ArrowRight weight="regular" size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
