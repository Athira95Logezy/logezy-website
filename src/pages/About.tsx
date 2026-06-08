import React from 'react';
import {
  Target, Lightning, Heart, ArrowRight, CheckCircle,
  Users, Shield, TrendUp, Pulse, CalendarBlank, Heartbeat, Briefcase,
  GraduationCap, Quotes, Star, RocketLaunch, Globe, Trophy,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── data ─── */
const pillars = [
  { icon: Target,    title: 'Built for temp, not adapted for it',   description: 'Most staffing software was built for permanent recruitment and patched to handle temp. Logezy is purpose-built for temporary staffing from day one — every feature, every workflow designed around how temp agencies actually operate.', gradient: 'linear-gradient(135deg,#5B6CF9,#1795C7)', glow: 'rgba(91,108,249,0.22)' },
  { icon: Lightning, title: 'Simple enough for your whole team',     description: "You shouldn't need a training course to use your own recruitment software. Logezy is intuitive enough for a new resourcer on their first day and powerful enough for a director managing hundreds of temporary workers.",       gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', glow: 'rgba(139,92,246,0.22)' },
  { icon: Heart,     title: 'We grow when you grow',                 description: "We don't just sell you software and disappear. Your success is our success. That's why Logezy customers get dedicated onboarding, real human support, and a product team that listens and keeps building.",                              gradient: 'linear-gradient(135deg,#059669,#10B981)', glow: 'rgba(5,150,105,0.22)' },
];

const handleRows = [
  { task: 'Building weekly shift schedules',  result: 'Done in minutes'       },
  { task: 'Chasing timesheet approvals',       result: 'Automated'             },
  { task: 'Tracking compliance documents',     result: 'Always up to date'     },
  { task: 'Generating client invoices',        result: 'One click'             },
  { task: 'Reporting on agency performance',   result: 'Real-time dashboard'   },
];

const timelineSteps = [
  { year: '2021', label: 'The Problem', text: 'We saw agencies held back by outdated software never built for temp staffing. Spreadsheets breaking under pressure. Recruiters drowning in admin.' },
  { year: '2022', label: 'The Build',   text: 'We designed Logezy from scratch — every screen built around the specific demands of temporary recruitment.' },
  { year: '2023', label: 'The Launch',  text: 'First UK agencies went live. 98.7% compliance scores. Shifts filled in under 2 minutes. Zero spreadsheets.' },
  { year: '2024', label: 'The Growth',  text: 'Over 600 UK agencies running on Logezy across healthcare, education, and hospitality.' },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Mini Dashboard ─── */
function MiniDashboard() {
  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.12)' }}>
      {/* Chrome */}
      <div style={{ background: 'linear-gradient(180deg,#EBEBEB,#E0E0E0)', padding: '9px 14px 0', borderBottom: '1px solid #C8C8C8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.88)', border: '1px solid #C0C0C0', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
            <span style={{ fontSize: 8, color: '#666' }}>app.logezy.co/dashboard</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ padding: '4px 12px 4px 8px', borderRadius: '6px 6px 0 0', background: '#fff', border: '1px solid #C8C8C8', borderBottom: '1px solid #fff', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: 'linear-gradient(135deg,#1966AA,#2399CA)' }} />
            <span style={{ fontSize: 8, fontWeight: 600, color: '#444' }}>Logezy — Dashboard</span>
          </div>
        </div>
      </div>
      {/* App */}
      <div style={{ background: '#fff', display: 'flex', minHeight: 260 }}>
        {/* Sidebar */}
        <div style={{ width: 44, background: '#0C1835', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 10 }}>
          {[true,false,false,false,false].map((a,i) => (
            <div key={i} style={{ width: 26, height: 26, borderRadius: 8, background: a ? 'rgba(23,149,199,0.25)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: a ? '#1795C7' : '#475569' }} />
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[
              { label:'Staff Scheduled', value:'1,284', color:'#3B82F6', bg:'#EFF6FF' },
              { label:'Compliance',      value:'98.7%', color:'#10B981', bg:'#ECFDF5' },
              { label:'Open Shifts',     value:'12',    color:'#F59E0B', bg:'#FFFBEB' },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '10px 10px', border: `1px solid ${s.color}22` }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 8, color: '#9CA3AF', marginTop: 3 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 10, border: '1px solid #F1F5F9', overflow: 'hidden' }}>
            {[
              { name:'Sarah Mitchell', role:'NHS Ward B',     status:'live'     },
              { name:'James Okafor',   role:'Royal Hospital', status:'upcoming' },
              { name:'Priya Sharma',   role:'Sunrise Care',   status:'live'     },
            ].map(({ name, role, status }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: '#1E293B', margin: 0 }}>{name}</p>
                  <p style={{ fontSize: 8, color: '#94A3B8', margin: '1px 0 0' }}>{role}</p>
                </div>
                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: status === 'live' ? '#ECFDF5' : '#EFF6FF', color: status === 'live' ? '#10B981' : '#3B82F6' }}>
                  {status === 'live' ? '● Live' : 'Soon'}
                </span>
              </div>
            ))}
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 10, border: '1px solid #F1F5F9', padding: '8px 10px' }}>
            <p style={{ fontSize: 8, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>Compliance</p>
            <div style={{ display: 'flex', gap: 4 }}>
              {[80,95,70,100,88,92,75].map((h,i) => (
                <div key={i} style={{ flex: 1, height: 28, borderRadius: 4, background: '#EFF6FF', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${h}%`, background: 'linear-gradient(to top,#3B82F6,#60A5FA)', borderRadius: 4 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ background: '#fff', overflow: 'hidden', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: 96, paddingBottom: 0, overflow: 'hidden', background: 'linear-gradient(160deg,#EAF4FF 0%,#F0F7FF 50%,#F8FAFF 100%)' }}>
        {/* Grid dots */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.40, backgroundImage: 'radial-gradient(rgba(23,149,199,0.20) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,149,199,0.10) 0%,transparent 65%)', filter: 'blur(72px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,108,249,0.07) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(460px,100%),1fr))', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: 'rgba(23,149,199,0.10)', border: '1px solid rgba(23,149,199,0.24)', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1795C7', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#1795C7', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>About Logezy</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.6rem,4.5vw,4rem)', fontWeight: 900, color: '#0C1835', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: 20 }}>
              We built what temp{' '}
              <br />
              <span style={{ background: 'linear-gradient(90deg,#1795C7,#5B6CF9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                agencies actually needed.
              </span>
            </h1>

            <p style={{ fontSize: 17, color: 'rgba(12,33,56,0.58)', lineHeight: 1.82, marginBottom: 36, maxWidth: 500 }}>
              Behind every temp recruitment agency is a team working incredibly hard to get the right people into the right roles every single day. We built Logezy because that team deserves software that works just as hard as they do.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginBottom: 48 }}>
              <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 50, fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', boxShadow: '0 8px 28px rgba(91,108,249,0.38)', textDecoration: 'none' }}>
                Book a Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
              </motion.a>
              <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 50, fontSize: 14, fontWeight: 600, color: '#0C1835', background: '#fff', border: '2px solid rgba(12,33,56,0.14)', textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.07)' }}>
                Start Free Trial
              </motion.a>
            </div>

            {/* Stat row */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, paddingTop: 24, borderTop: '1px solid rgba(12,33,56,0.10)' }}>
              {[
                { value: '600+', label: 'UK Agencies' },
                { value: '98.7%', label: 'Compliance Score' },
                { value: '80%', label: 'Less Admin' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#0C1835', letterSpacing: '-0.03em' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 32, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22,1,0.36,1] }}
            style={{ position: 'relative', paddingBottom: 64 }}>
            <MiniDashboard />
            {/* Floating chips */}
            <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', left: -16, bottom: 28, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 40px rgba(91,108,249,0.16)', border: '1px solid rgba(91,108,249,0.14)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users weight="fill" style={{ width: 15, height: 15, color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#0C1835', margin: 0, lineHeight: 1.1 }}>600+</p>
                <p style={{ fontSize: 9, color: '#94A3B8', margin: '2px 0 0' }}>Active Agencies</p>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0,-6,0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              style={{ position: 'absolute', right: -12, top: 20, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 40px rgba(5,150,105,0.16)', border: '1px solid rgba(5,150,105,0.14)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield weight="fill" style={{ width: 15, height: 15, color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#0C1835', margin: 0, lineHeight: 1.1 }}>100%</p>
                <p style={{ fontSize: 9, color: '#94A3B8', margin: '2px 0 0' }}>CQC Compliance</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: 80, display: 'block' }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR STORY — Timeline
      ══════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '96px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap: 64, alignItems: 'start' }}>

            {/* Left */}
            <motion.div {...fade(0)} style={{ position: 'sticky', top: 112 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: '#EEF2FF', border: '1px solid #C7D2FE', marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6CF9', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>Our Story</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 900, color: '#0C1835', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
                Built by people who understand{' '}
                <span style={{ color: '#5B6CF9' }}>recruitment.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.82, marginBottom: 28 }}>
                Temp recruitment is fast, complex, and unforgiving. Shifts change by the hour, compliance can't slip, and clients expect results yesterday.
              </p>
              <blockquote style={{ background: 'linear-gradient(135deg,rgba(91,108,249,0.06),rgba(23,149,199,0.06))', border: '1px solid rgba(91,108,249,0.16)', borderRadius: 16, padding: '20px 22px' }}>
                <Quotes weight="fill" style={{ width: 22, height: 22, color: 'rgba(91,108,249,0.35)', marginBottom: 8 }} />
                <p style={{ fontSize: 15, fontWeight: 600, color: '#374151', lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 10px' }}>
                  "Good recruiters were spending more time on paperwork than on people. That had to change."
                </p>
                <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0, fontWeight: 600 }}>— Logezy Founders</p>
              </blockquote>
            </motion.div>

            {/* Right — timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timelineSteps.map((step, i) => (
                <motion.div key={i} {...fade(i * 0.1 + 0.1)}
                  style={{ display: 'flex', gap: 24, paddingBottom: i < timelineSteps.length - 1 ? 36 : 0 }}>
                  {/* Line + dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 48 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: i % 2 === 0 ? 'linear-gradient(135deg,#5B6CF9,#1795C7)' : 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 6px 20px ${i % 2 === 0 ? 'rgba(91,108,249,0.28)' : 'rgba(5,150,105,0.28)'}` }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>{step.year}</span>
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'linear-gradient(to bottom,#E5E7EB,transparent)', minHeight: 28, marginTop: 8 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingTop: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: i % 2 === 0 ? '#5B6CF9' : '#059669', letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 6 }}>{step.label}</div>
                    <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, margin: 0 }}>{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION — dark
      ══════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#0C1835 0%,#0E2050 100%)', padding: '96px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(23,149,199,0.16) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div {...fade(0)}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: 'rgba(23,149,199,0.15)', border: '1px solid rgba(23,149,199,0.30)', marginBottom: 24 }}>
              <RocketLaunch weight="fill" style={{ width: 13, height: 13, color: '#38BDF8' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#7DD3FC', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>Our Mission</span>
            </div>
          </motion.div>
          <motion.h2 {...fade(0.08)} style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Our mission is{' '}
            <span style={{ color: '#38BDF8' }}>simple.</span>
          </motion.h2>
          <motion.p {...fade(0.16)} style={{ fontSize: 18, color: 'rgba(165,210,255,0.70)', lineHeight: 1.85, maxWidth: 680, margin: '0 auto 56px' }}>
            To give every temp recruitment agency — regardless of size — the tools that were once only available to the biggest players. Powerful enough to handle complex staffing operations. Simple enough that your whole team can use it from day one.
          </motion.p>

          {/* Stats row */}
          <motion.div {...fade(0.24)} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', maxWidth: 560, margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.09)', overflow: 'hidden' }}>
            {[
              { val: '600+', lbl: 'UK Agencies',    icon: Globe },
              { val: '80%',  lbl: 'Less Admin',      icon: TrendUp },
              { val: '3×',   lbl: 'Faster Fills',    icon: Trophy },
            ].map(({ val, lbl, icon: Icon }, i) => (
              <div key={lbl} style={{ padding: '28px 16px', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <Icon weight="fill" style={{ width: 20, height: 20, color: '#38BDF8', margin: '0 auto 10px', display: 'block' }} />
                <p style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>{val}</p>
                <p style={{ fontSize: 11, color: 'rgba(165,210,255,0.50)', marginTop: 4, fontWeight: 500 }}>{lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY LOGEZY — 3 PILLARS
      ══════════════════════════════════════ */}
      <section style={{ background: '#F8FAFC', padding: '96px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div {...fade(0)}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: '#EEF2FF', border: '1px solid #C7D2FE', marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#5B6CF9', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>Why Logezy</span>
              </div>
            </motion.div>
            <motion.h2 {...fade(0.08)} style={{ fontSize: 'clamp(1.9rem,3.5vw,3rem)', fontWeight: 900, color: '#0C1835', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              Why agencies choose Logezy{' '}
              <span style={{ background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                over everything else.
              </span>
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 24 }}>
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fade(i * 0.1 + 0.05)}
                  whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.10)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  style={{ background: '#fff', borderRadius: 24, padding: '32px 28px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
                  {/* Bg glow */}
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: p.glow, filter: 'blur(30px)', pointerEvents: 'none' }} />
                  {/* Number */}
                  <div style={{ position: 'absolute', top: 20, right: 22, fontSize: 48, fontWeight: 900, color: 'rgba(12,33,56,0.04)', lineHeight: 1, userSelect: 'none' }}>{`0${i+1}`}</div>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}
                    style={{ width: 54, height: 54, borderRadius: 16, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22, boxShadow: `0 10px 28px ${p.glow}` }}>
                    <Icon weight="fill" style={{ width: 24, height: 24, color: '#fff' }} />
                  </motion.div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0C1835', marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.75, position: 'relative' }}>{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT WE HANDLE
      ══════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '96px 28px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.div {...fade(0)}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: '#ECFDF5', border: '1px solid #A7F3D0', marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#059669', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>What We Handle</span>
              </div>
            </motion.div>
            <motion.h2 {...fade(0.08)} style={{ fontSize: 'clamp(1.9rem,3.5vw,3rem)', fontWeight: 900, color: '#0C1835', letterSpacing: '-0.025em' }}>
              The hard stuff.{' '}
              <span style={{ background: 'linear-gradient(135deg,#059669,#10B981)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sorted.</span>
            </motion.h2>
          </div>

          <motion.div {...fade(0.12)} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 12px 48px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'linear-gradient(135deg,#0C1835,#0E2050)' }}>
              <div style={{ padding: '16px 24px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase' as const, letterSpacing: '0.07em', borderRight: '1px solid rgba(255,255,255,0.08)' }}>Without Logezy</div>
              <div style={{ padding: '16px 24px', fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.07em' }}>With Logezy ✓</div>
            </div>
            {handleRows.map(({ task, result }, i) => (
              <motion.div key={task}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                <div style={{ padding: '16px 24px', fontSize: 14, color: '#94A3B8', borderRight: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E5E7EB', flexShrink: 0 }} />
                  {task}
                </div>
                <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle weight="fill" style={{ width: 12, height: 12, color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#059669' }}>{result}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHO WE SERVE
      ══════════════════════════════════════ */}
      <section style={{ background: '#F8FAFC', padding: '96px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '-5%', top: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,149,199,0.06) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(400px,100%),1fr))', gap: 64, alignItems: 'center' }}>

          <div>
            <motion.div {...fade(0)}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: '#FEF3C7', border: '1px solid #FCD34D', marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#D97706', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>Who We Serve</span>
              </div>
            </motion.div>
            <motion.h2 {...fade(0.08)} style={{ fontSize: 'clamp(1.9rem,3.5vw,3rem)', fontWeight: 900, color: '#0C1835', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Made for agencies of every size.
            </motion.h2>
            <motion.p {...fade(0.12)} style={{ fontSize: 17, color: '#4B5563', lineHeight: 1.82, marginBottom: 14 }}>
              Whether you're a two-person agency placing your first 20 workers, or an established operation managing thousands of shifts a week — Logezy scales with you.
            </motion.p>
            <motion.p {...fade(0.16)} style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.82 }}>
              We work with temp recruitment agencies across healthcare, hospitality, and education — industries where getting the right person in the right place at the right time isn't just important. It's everything.
            </motion.p>
          </div>

          <motion.div {...fade(0.16)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: Heartbeat,   label: 'Healthcare & Nursing', desc: 'NMC / HCPC compliance, DBS tracking, CQC-ready audits — all automated.', color: 'linear-gradient(135deg,#EF4444,#EC4899)', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.16)', to: '/industries/healthcare' },
              { icon: GraduationCap, label: 'Education',          desc: 'Supply teachers, TAs, same-day placements, AWR-compliant payroll.',      color: 'linear-gradient(135deg,#8B5CF6,#6366F1)', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.16)', to: '/industries/education' },
              { icon: Briefcase,   label: 'Hospitality',          desc: 'Multi-venue scheduling, last-minute fill, seasonal demand spikes.',       color: 'linear-gradient(135deg,#D97706,#F59E0B)', bg: 'rgba(217,119,6,0.06)',   border: 'rgba(217,119,6,0.16)',   to: '/industries/hospitality' },
            ].map(({ icon: Icon, label, desc, color, bg, border, to }) => (
              <motion.div key={label} whileHover={{ x: 6, boxShadow: '0 12px 36px rgba(0,0,0,0.09)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', borderRadius: 18, background: '#fff', border: `1px solid ${border}`, cursor: 'default' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 8px 20px ${bg}` }}>
                  <Icon weight="fill" style={{ width: 22, height: 22, color: '#fff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#0C1835', margin: '0 0 4px' }}>{label}</p>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{desc}</p>
                </div>
                <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#5B6CF9', textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
                  Learn more <ArrowRight weight="bold" style={{ width: 12, height: 12 }} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA — redesigned
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '0 0' }}>
        {/* Top gradient band */}
        <div style={{ background: 'linear-gradient(160deg,#0C1835 0%,#1E1B4B 100%)', padding: '88px 28px 96px', position: 'relative', overflow: 'hidden' }}>
          {/* Glows */}
          <div style={{ position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 500, background: 'radial-gradient(ellipse at 50% 0%,rgba(91,108,249,0.18) 0%,transparent 60%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0%', left: '0%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,149,199,0.10) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Heading centred */}
            <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 40, background: 'rgba(91,108,249,0.18)', border: '1px solid rgba(91,108,249,0.32)', marginBottom: 24 }}>
                <Star weight="fill" style={{ width: 12, height: 12, color: '#818CF8' }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#A5B4FC', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>Get Started Today</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 18 }}>
                Ready to transform<br />
                <span style={{ background: 'linear-gradient(90deg,#38BDF8,#818CF8,#C084FC)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  your agency?
                </span>
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(165,210,255,0.65)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
                Join hundreds of UK temp recruitment agencies already running smoother, faster, and smarter with Logezy.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 50, fontSize: 15, fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg,#5B6CF9,#1795C7)', boxShadow: '0 12px 36px rgba(91,108,249,0.44)', textDecoration: 'none' }}>
                  Start Free Trial <ArrowRight weight="bold" style={{ width: 16, height: 16 }} />
                </motion.a>
                <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 50, fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.88)', background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.18)', textDecoration: 'none' }}>
                  Book a Demo
                </motion.a>
              </div>
            </motion.div>

            {/* 4 stats cards */}
            <motion.div {...fade(0.2)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              {[
                { icon: Users,   label: 'UK Agencies',    value: '600+',  g: 'linear-gradient(135deg,#5B6CF9,#1795C7)', glow: 'rgba(91,108,249,0.25)'  },
                { icon: TrendUp, label: 'Admin Reduced',  value: '80%',   g: 'linear-gradient(135deg,#8B5CF6,#A855F7)', glow: 'rgba(139,92,246,0.25)' },
                { icon: Shield,  label: 'CQC Compliance', value: '100%',  g: 'linear-gradient(135deg,#059669,#10B981)', glow: 'rgba(5,150,105,0.25)'  },
                { icon: Pulse,   label: 'App Uptime',     value: '99.9%', g: 'linear-gradient(135deg,#D97706,#F59E0B)', glow: 'rgba(217,119,6,0.25)'  },
              ].map(({ icon: Icon, label, value, g, glow }) => (
                <motion.div key={label} whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ padding: '28px 22px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', textAlign: 'center', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: glow, filter: 'blur(20px)', pointerEvents: 'none' }} />
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: g, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: `0 8px 24px ${glow}` }}>
                    <Icon weight="fill" style={{ width: 21, height: 21, color: '#fff' }} />
                  </div>
                  <p style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
                  <p style={{ fontSize: 11, color: 'rgba(165,210,255,0.55)', marginTop: 6, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust strip */}
            <motion.div {...fade(0.3)} style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' as const }}>
              {[
                { icon: Shield,   text: 'CQC & GDPR compliant' },
                { icon: Globe,    text: 'UK-based support' },
                { icon: Star,     text: '4.9/5 customer rating' },
                { icon: RocketLaunch, text: 'Live in under 48h' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon weight="fill" style={{ width: 14, height: 14, color: '#38BDF8' }} />
                  <span style={{ fontSize: 13, color: 'rgba(165,210,255,0.60)', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
