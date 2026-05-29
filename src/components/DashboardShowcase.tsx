/**
 * DashboardShowcase.tsx — Product Tour (v3)
 *
 * Layout
 * ──────
 * Left  : Trustpilot badge · headline · description · CTA buttons · checklist
 * Right : Schedule screen BIG (dominant centre) + 4 small floating screens
 *         (Timesheets top-left, Reports top-right, Invoices bottom-right,
 *          Availability mobile phone bottom-left)
 *
 * Bottom: white SVG wave curve transitioning to next section
 * Background: linear-gradient #183765 → #2399CA
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
   CHROME BAR
───────────────────────────────────────────── */
function ChromeBar({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const h   = size === 'lg' ? 36 : 20;
  const d   = size === 'lg' ? 9  : 6;
  const gap = size === 'lg' ? 6  : 4;
  const px  = size === 'lg' ? 14 : 8;
  return (
    <div style={{
      height: h, background: 'rgba(10,20,50,0.60)',
      display: 'flex', alignItems: 'center',
      padding: `0 ${px}px`, gap, flexShrink: 0,
    }}>
      {['#F87171','#FBBF24','#34D399'].map((c, i) => (
        <div key={i} style={{ width: d, height: d, borderRadius: '50%', background: c }} />
      ))}
      {size === 'lg' && (
        <div style={{ flex:1, marginLeft:10, height:20,
          background:'rgba(255,255,255,0.08)', borderRadius:6 }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SMALL FLOATING BROWSER SCREEN
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
      initial={{ opacity: 0, scale: 0.80, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.68, delay, ease: EASE }}
      style={{ position:'absolute', ...posStyle, width, rotate, zIndex:5, pointerEvents:'none' }}
    >
      {/* label chip */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:6 }}>
        <div style={{
          fontSize:9, fontWeight:800, padding:'3px 10px', borderRadius:20,
          background: labelBg, color: labelColor,
          border:`1px solid ${labelColor}40`,
          letterSpacing:'0.09em', textTransform:'uppercase' as const,
        }}>{label}</div>
      </div>
      {/* screen — no chrome bar, realistic floating card */}
      <motion.div
        animate={{ y:[0, floatY, 0] }}
        transition={{ delay:floatDelay, duration:floatDur, repeat:Infinity, ease:'easeInOut' }}
        style={{
          borderRadius:14, overflow:'hidden',
          border:'1px solid rgba(255,255,255,0.14)',
          boxShadow:'0 24px 56px rgba(0,0,0,0.50), 0 6px 18px rgba(0,0,0,0.30)',
        }}
      >
        <img src={src} alt={label} style={{ width:'100%', display:'block' }} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE PHONE SCREEN (Availability)
───────────────────────────────────────────── */
interface PhoneProps {
  src: string; label: string; labelColor: string; labelBg: string;
  width: number; posStyle: React.CSSProperties;
  rotate: number; delay: number;
  floatY: number; floatDur: number; floatDelay?: number;
  highlight?: boolean;
}
function PhoneScreen({
  src, label, labelColor, labelBg,
  width, posStyle, rotate, delay,
  floatY, floatDur, floatDelay = 0,
  highlight = false,
}: PhoneProps) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.80, y:28 }}
      whileInView={{ opacity:1, scale:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.68, delay, ease:EASE }}
      style={{ position:'absolute', ...posStyle, width, rotate, zIndex: highlight ? 6 : 5, pointerEvents:'none' }}
    >
      {/* label chip */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:7 }}>
        <div style={{
          fontSize:9.5, fontWeight:800, padding:'4px 12px', borderRadius:20,
          background: labelBg, color: labelColor,
          border:`1px solid ${labelColor}55`,
          letterSpacing:'0.09em', textTransform:'uppercase' as const,
          boxShadow: highlight ? `0 0 14px ${labelColor}50` : 'none',
        }}>{label}</div>
      </div>
      {/* phone — thin realistic bezel */}
      <motion.div
        animate={{ y:[0, floatY, 0] }}
        transition={{ delay:floatDelay, duration:floatDur, repeat:Infinity, ease:'easeInOut' }}
        style={{
          borderRadius:32,
          overflow:'hidden',
          border: highlight ? `2px solid ${labelColor}80` : '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: highlight ? [
            `0 0 0 4px ${labelColor}25`,
            `0 0 48px ${labelColor}50`,
            '0 32px 72px rgba(0,0,0,0.60)',
            '0 8px 24px rgba(0,0,0,0.40)',
          ].join(', ') : [
            '0 28px 64px rgba(0,0,0,0.55)',
            '0 6px 20px rgba(0,0,0,0.35)',
          ].join(', '),
        }}
      >
        <img src={src} alt={label} style={{ width:'100%', display:'block' }} />
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
      background:'linear-gradient(135deg, #183765 0%, #1966AA 48%, #2399CA 100%)',
      padding:'112px 48px 160px',   /* extra bottom for wave */
      overflow:'hidden',
      position:'relative',
    }}>

      {/* ── dot grid ── */}
      <div style={{
        position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize:'30px 30px',
        maskImage:'radial-gradient(ellipse 85% 85% at 68% 50%, black 30%, transparent)',
        WebkitMaskImage:'radial-gradient(ellipse 85% 85% at 68% 50%, black 30%, transparent)',
      }} />

      {/* ── glow blobs ── */}
      <div style={{ position:'absolute', top:'-5%', left:'36%', width:700, height:600,
        background:'radial-gradient(ellipse, rgba(35,153,202,0.22) 0%, transparent 68%)',
        filter:'blur(90px)', zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'5%', width:480, height:380,
        background:'radial-gradient(ellipse, rgba(24,55,101,0.50) 0%, transparent 70%)',
        filter:'blur(70px)', zIndex:0, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth:1300, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:56 }}>

          {/* ════ LEFT: text ════ */}
          <motion.div
            initial={{ opacity:0, x:-44 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.72, ease:EASE }}
            style={{ flex:'0 0 44%', maxWidth:500 }}
          >
            {/* Trustpilot badge */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'6px 16px 6px 10px', borderRadius:100,
              background:'rgba(255,255,255,0.10)',
              border:'1px solid rgba(255,255,255,0.20)',
              marginBottom:24,
            }}>
              <div style={{ display:'flex', gap:2 }}>
                {[1,2,3,4,5].map(i=>(
                  <Star key={i} weight="fill" size={11} style={{ color:'#F59E0B' }} />
                ))}
              </div>
              <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.88)' }}>
                4.5 Excellent · Trustpilot
              </span>
            </div>

            {/* Product Tour chip */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:7,
              padding:'4px 14px 4px 10px', borderRadius:100,
              background:'rgba(35,153,202,0.18)', border:'1px solid rgba(35,153,202,0.35)',
              marginBottom:20,
            }}>
              <CalendarBlank weight="regular" size={12} style={{ color:'#7DD3FC' }} />
              <span style={{ fontSize:10, fontWeight:800, color:'#7DD3FC',
                letterSpacing:'0.11em', textTransform:'uppercase' as const }}>Product Tour</span>
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize:'clamp(2.2rem, 3.6vw, 3.4rem)',
              fontWeight:900, color:'#FFFFFF',
              letterSpacing:'-0.046em', lineHeight:1.07,
              marginBottom:18,
            }}>
              The complete staffing platform{' '}
              <span style={{
                background:'linear-gradient(125deg, #7DD3FC 0%, #38BDF8 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>for your agency</span>
            </h2>

            {/* Description */}
            <p style={{ fontSize:16.5, color:'rgba(186,230,255,0.72)', lineHeight:1.78, marginBottom:34 }}>
              Fill shifts instantly, stay compliant, and manage your entire workforce —
              from scheduling to invoicing — in one powerful platform.
            </p>

            {/* CTA buttons */}
            <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:36 }}>
              <Link to="/contact" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 32px', borderRadius:100, textDecoration:'none',
                background:'#2399CA', color:'#fff', fontSize:14.5, fontWeight:700,
                boxShadow:'0 8px 28px rgba(35,153,202,0.45)',
              }}>
                Book a Demo
                <ArrowRight weight="bold" size={15} />
              </Link>
              <Link to="/features" style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 30px', borderRadius:100, textDecoration:'none',
                background:'rgba(255,255,255,0.09)',
                border:'1.5px solid rgba(255,255,255,0.22)',
                color:'#fff', fontSize:14.5, fontWeight:700,
              }}>
                Explore Features
              </Link>
            </div>

            {/* Checklist */}
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { label:'Shift scheduling & instant fill',      color:'#38BDF8' },
                { label:'Digital timesheets & payroll export',  color:'#34D399' },
                { label:'Compliance tracking & DBS alerts',     color:'#A78BFA' },
                { label:'Automated invoicing per client',       color:'#FBBF24' },
              ].map(({ label, color }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <CheckCircle weight="fill" size={16} style={{ color, flexShrink:0 }} />
                  <span style={{ fontSize:13.5, fontWeight:500, color:'rgba(186,230,255,0.80)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════ RIGHT: floating screens ════ */}
          <div style={{ flex:1, position:'relative', height:640, minWidth:0 }}>

            {/* ── Timesheets — top-left, orbiting ── */}
            <FloatingScreen
              src="/image_01.png" label="Timesheets"
              labelColor="#34D399" labelBg="rgba(52,211,153,0.15)"
              width={162} posStyle={{ top:10, left:4 }}
              rotate={-8} delay={0.55}
              floatY={-10} floatDur={5.4} floatDelay={0.9}
            />

            {/* ── Reports — top-right, orbiting ── */}
            <FloatingScreen
              src="/reports.png" label="Reports"
              labelColor="#A78BFA" labelBg="rgba(167,139,250,0.15)"
              width={168} posStyle={{ top:10, right:0 }}
              rotate={7} delay={0.45}
              floatY={-9} floatDur={5.8} floatDelay={1.3}
            />

            {/* ── MAIN: Schedule — BIG, centred, highlighted ── */}
            <motion.div
              initial={{ opacity:0, y:50, scale:0.93 }}
              whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.90, delay:0.12, ease:EASE }}
              style={{
                position:'absolute',
                left:'50%', top:'48%',
                transform:'translate(-50%, -50%)',
                width:610, zIndex:3,
              }}
            >
              {/* broad halo glow */}
              <div style={{
                position:'absolute', top:-80, left:'-5%', right:'-5%', height:160,
                background:'radial-gradient(ellipse, rgba(35,153,202,0.50) 0%, transparent 70%)',
                filter:'blur(50px)', pointerEvents:'none', zIndex:-1,
              }} />

              <motion.div
                animate={{ y:[0,-10,0] }}
                transition={{ duration:6.5, repeat:Infinity, ease:'easeInOut' }}
                style={{
                  borderRadius:20, overflow:'hidden',
                  /* highlighted ring + glow */
                  border:'2px solid rgba(35,153,202,0.60)',
                  boxShadow:[
                    '0 0 0 4px rgba(35,153,202,0.20)',
                    '0 0 60px rgba(35,153,202,0.45)',
                    '0 48px 110px rgba(0,0,0,0.65)',
                    '0 16px 48px rgba(0,0,0,0.40)',
                  ].join(', '),
                }}
              >
                <img src="/schedule.png" alt="Logezy Scheduling" style={{ width:'100%', display:'block' }} />
              </motion.div>

              {/* caption */}
              <div style={{ display:'flex', justifyContent:'center', marginTop:16 }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'6px 18px', borderRadius:100,
                  background:'rgba(35,153,202,0.18)', border:'1px solid rgba(35,153,202,0.30)',
                }}>
                  <CalendarBlank weight="regular" size={13} style={{ color:'#7DD3FC' }} />
                  <span style={{ fontSize:12, fontWeight:700, color:'#7DD3FC' }}>Scheduling</span>
                  <span style={{ width:1, height:11, background:'rgba(125,211,252,0.25)' }} />
                  <span style={{ fontSize:11.5, color:'rgba(186,230,255,0.50)', fontWeight:400 }}>Fill every shift in minutes</span>
                </div>
              </div>
            </motion.div>

            {/* ── Invoices — bottom-right, orbiting ── */}
            <FloatingScreen
              src="/image_00.png" label="Invoices"
              labelColor="#FBBF24" labelBg="rgba(251,191,36,0.15)"
              width={165} posStyle={{ bottom:28, right:4 }}
              rotate={-6} delay={0.68}
              floatY={-8} floatDur={4.9} floatDelay={0.5}
            />

            {/* ── Availability — mobile, bottom-left, HIGHLIGHTED ── */}
            <PhoneScreen
              src="/Avilability.jpeg" label="Availability"
              labelColor="#38BDF8" labelBg="rgba(56,189,248,0.18)"
              width={205} posStyle={{ bottom:18, left:0 }}
              rotate={5} delay={0.60}
              floatY={-11} floatDur={5.2} floatDelay={0.8}
              highlight
            />

          </div>
          {/* end right */}

        </div>
      </div>

      {/* ── bottom concave arch curve ── */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:2, lineHeight:0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
          style={{ width:'100%', height:80, display:'block' }}>
          <path
            d="M0,68 C360,0 1080,0 1440,68 L1440,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

    </section>
  );
}
