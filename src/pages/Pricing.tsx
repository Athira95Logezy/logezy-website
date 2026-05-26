import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, UserCircle } from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const plans = [
  {
    name: 'Entry Level',
    price: 50,
    admins: '1 Admin User',
    staff: 'Up to 25 Staff',
    featured: false,
    gradient: 'linear-gradient(135deg,#38BDF8 0%,#0EA5E9 100%)',
    accent: '#0EA5E9',
    accentBg: '#F0F9FF',
    accentLight: '#BAE6FD',
  },
  {
    name: 'Startup',
    price: 100,
    admins: '3 Admin Users',
    staff: 'Up to 200 Staff',
    featured: false,
    gradient: 'linear-gradient(135deg,#34D399 0%,#059669 100%)',
    accent: '#059669',
    accentBg: '#F0FDF4',
    accentLight: '#A7F3D0',
  },
  {
    name: 'Established',
    price: 200,
    admins: '6 Admin Users',
    staff: 'Up to 400 Staff',
    featured: true,
    gradient: 'linear-gradient(135deg,#5B6CF9 0%,#7C3AED 100%)',
    accent: '#5B6CF9',
    accentBg: '#EEF2FF',
    accentLight: '#C7D2FE',
  },
  {
    name: 'Large',
    price: 300,
    admins: '9 Admin Users',
    staff: 'Up to 600 Staff',
    featured: false,
    gradient: 'linear-gradient(135deg,#475569 0%,#0F172A 100%)',
    accent: '#334155',
    accentBg: '#F8FAFC',
    accentLight: '#CBD5E1',
  },
];

const features = [
  'Vacancy',
  'Bookings',
  'Scheduler',
  'Report',
  'Invoice',
  'Recruitment',
  'Timesheet',
  'Chat',
  'Mobile App',
];

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function Pricing() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#F8FAFF 0%,#FFFFFF 50%)' }}>

      {/* ── HEADER ──────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 48, textAlign: 'center', padding: '72px 24px 48px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#EEF2FF', border: '1px solid #C7D2FE',
            borderRadius: 30, padding: '5px 16px', marginBottom: 22,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#5B6CF9' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#5B6CF9', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Pricing</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, color: '#0C1835', lineHeight: 1.1, marginBottom: 14, letterSpacing: '-0.02em' }}>
            Choose Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#5B6CF9,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Subscription
            </span>
          </h1>
          <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.65, maxWidth: 480, margin: '0 auto' }}>
            Simple, transparent pricing. All features included in every plan — just pick the size that fits your agency.
          </p>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 10 }}>Per month · Plus VAT</p>
        </motion.div>
      </section>

      {/* ── CARDS ───────────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, alignItems: 'start' }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={plan.featured ? {} : { y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: plan.featured ? 'none' : '1px solid #E5E7EB',
              boxShadow: plan.featured
                ? '0 24px 80px rgba(91,108,249,0.30), 0 0 0 1px rgba(91,108,249,0.15)'
                : '0 4px 20px rgba(0,0,0,0.06)',
              transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
              position: 'relative' as const,
              background: plan.featured
                ? 'linear-gradient(160deg,#0C1835 0%,#0E2050 100%)'
                : 'white',
            }}
          >
            {/* Most Popular badge */}
            {plan.featured && (
              <div style={{
                position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg,#5B6CF9,#7C3AED)',
                color: 'white', fontSize: 11, fontWeight: 800,
                padding: '5px 18px', borderRadius: '0 0 12px 12px',
                letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                boxShadow: '0 4px 12px rgba(91,108,249,0.40)',
              }}>
                Most Popular
              </div>
            )}

            {/* Header band */}
            <div style={{
              background: plan.gradient,
              padding: plan.featured ? '40px 28px 28px' : '28px 28px 24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'white', letterSpacing: '0.02em', marginBottom: 16, opacity: 0.95 }}>
                {plan.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>£</span>
                <span style={{ fontSize: 56, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.03em' }}>{plan.price}</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.70)', marginTop: 6, fontWeight: 500 }}>per month, plus VAT</div>
            </div>

            {/* Body */}
            <div style={{ padding: '24px 24px 28px' }}>

              {/* Admin + Staff highlights */}
              <div style={{
                background: plan.featured ? 'rgba(255,255,255,0.07)' : plan.accentBg,
                borderRadius: 12,
                padding: '14px 16px',
                marginBottom: 20,
                border: plan.featured ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${plan.accentLight}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <UserCircle weight="fill" style={{ width: 18, height: 18, color: plan.featured ? 'rgba(255,255,255,0.7)' : plan.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: plan.featured ? 'white' : '#0C1835' }}>{plan.admins}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users weight="fill" style={{ width: 18, height: 18, color: plan.featured ? 'rgba(255,255,255,0.7)' : plan.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: plan.featured ? 'white' : '#0C1835' }}>{plan.staff}</span>
                </div>
              </div>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28 }}>
                {features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle
                      weight="fill"
                      style={{ width: 18, height: 18, color: plan.featured ? '#818CF8' : plan.accent, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 14, color: plan.featured ? 'rgba(255,255,255,0.80)' : '#374151', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 24px', borderRadius: 12, textDecoration: 'none',
                    fontSize: 15, fontWeight: 700,
                    background: plan.featured
                      ? 'linear-gradient(135deg,#5B6CF9,#7C3AED)'
                      : plan.gradient,
                    color: 'white',
                    boxShadow: plan.featured
                      ? '0 6px 20px rgba(91,108,249,0.45)'
                      : `0 4px 14px ${plan.accent}35`,
                  }}
                >
                  Register <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── FOOTER NOTE ─────────────────────────── */}
      <div style={{ textAlign: 'center', paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
        <p style={{ fontSize: 14, color: '#9CA3AF' }}>
          All plans include full onboarding support · Cancel anytime · No setup fees
        </p>
      </div>

    </div>
  );
}
