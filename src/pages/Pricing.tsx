import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, UserCircle, Phone, Sparkle, Star } from '@phosphor-icons/react';

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
    enterprise: false,
    gradient: 'linear-gradient(135deg,#38BDF8 0%,#0EA5E9 100%)',
    accent: '#0EA5E9',
    accentBg: '#F0F9FF',
    accentLight: '#BAE6FD',
    tagline: 'Perfect for small agencies just starting out.',
  },
  {
    name: 'Startup',
    price: 100,
    admins: '3 Admin Users',
    staff: 'Up to 200 Staff',
    featured: false,
    enterprise: false,
    gradient: 'linear-gradient(135deg,#34D399 0%,#059669 100%)',
    accent: '#059669',
    accentBg: '#F0FDF4',
    accentLight: '#A7F3D0',
    tagline: 'Ideal for growing teams scaling fast.',
  },
  {
    name: 'Established',
    price: 200,
    admins: '6 Admin Users',
    staff: 'Up to 400 Staff',
    featured: true,
    enterprise: false,
    gradient: 'linear-gradient(135deg,#2396C6 0%,#183963 100%)',
    accent: '#2396C6',
    accentBg: '#E8F5FB',
    accentLight: '#A8D9EF',
    tagline: 'Our most popular plan for established agencies.',
  },
  {
    name: 'Enterprise',
    price: null,
    admins: 'Unlimited Admins',
    staff: 'Unlimited Staff',
    featured: false,
    enterprise: true,
    gradient: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
    accent: '#2396C6',
    accentBg: '#E8F5FB',
    accentLight: '#A8D9EF',
    tagline: 'Bespoke solution for large-scale operations.',
  },
];

const features = [
  'Vacancy Management',
  'Bookings',
  'Scheduler',
  'Reports & Analytics',
  'Invoice Generation',
  'Recruitment Portal',
  'Digital Timesheets',
  'In-App Chat',
  'Candidate Mobile App',
];

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function openSalesIQ() {
  try {
    // @ts-ignore
    if (window.$zoho && window.$zoho.salesiq && window.$zoho.salesiq.floatwindow) {
      // @ts-ignore
      window.$zoho.salesiq.floatwindow.visible('show');
    }
  } catch (e) { /* fallback: do nothing */ }
}

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function Pricing() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-body)' }}>

      {/* ── HERO HEADER ─────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg,#183963 0%,#1d4a7a 50%,#2396C6 100%)',
        padding: '96px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse,rgba(35,150,198,0.30) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <motion.div {...FADE(0)} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 40, padding: '6px 18px', marginBottom: 24 }}>
            <Sparkle weight="fill" style={{ width: 12, height: 12, color: '#7DD3FC' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#BAE6FD', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Transparent Pricing</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: 16, letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)' }}>
            Plans built for every{' '}
            <span style={{ color: '#7DD3FC' }}>agency size.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(186,230,255,0.75)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto 10px' }}>
            Simple, transparent pricing. All features included in every plan. Pick the size that fits your agency.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(186,230,255,0.50)', fontWeight: 500 }}>Per month · Plus VAT · Cancel anytime</p>
        </motion.div>

        {/* Bottom wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ── CARDS ───────────────────────────────── */}
      <section style={{ maxWidth: 1220, margin: '-20px auto 0', padding: '0 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 22, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 22,
                overflow: 'hidden',
                border: plan.featured ? 'none' : plan.enterprise ? '1px solid rgba(35,150,198,0.30)' : '1px solid #E5E7EB',
                boxShadow: plan.featured
                  ? '0 28px 80px rgba(35,150,198,0.32), 0 0 0 1px rgba(35,150,198,0.18)'
                  : plan.enterprise
                    ? '0 20px 60px rgba(15,52,96,0.28), 0 0 0 1px rgba(35,150,198,0.12)'
                    : '0 4px 24px rgba(0,0,0,0.06)',
                transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
                position: 'relative' as const,
                background: plan.featured ? 'linear-gradient(160deg,#183963 0%,#1a3a5c 100%)' : '#fff',
              }}
            >
              {/* Most Popular badge */}
              {plan.featured && (
                <div style={{
                  position: 'absolute' as const, top: 0, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg,#2396C6,#183963)',
                  color: 'white', fontSize: 10.5, fontWeight: 800,
                  padding: '5px 18px', borderRadius: '0 0 12px 12px',
                  letterSpacing: '0.07em', textTransform: 'uppercase' as const,
                  boxShadow: '0 4px 14px rgba(35,150,198,0.45)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <Star weight="fill" style={{ width: 9, height: 9 }} /> Most Popular
                </div>
              )}

              {/* Gradient header band */}
              <div style={{
                background: plan.gradient,
                padding: plan.featured ? '44px 28px 28px' : '28px 28px 24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Subtle pattern */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.10em', textTransform: 'uppercase' as const, marginBottom: 10 }}>
                    {plan.name}
                  </div>

                  {plan.enterprise ? (
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 36, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>Custom</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)', marginTop: 6, fontWeight: 500 }}>Tailored to your needs</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.80)' }}>£</span>
                      <span style={{ fontSize: 54, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.03em' }}>{plan.price}</span>
                    </div>
                  )}
                  {!plan.enterprise && (
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.62)', fontWeight: 500 }}>per month, plus VAT</div>
                  )}
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 1.4, fontStyle: 'italic' }}>{plan.tagline}</p>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '22px 24px 26px', background: plan.featured ? 'linear-gradient(180deg,#183963,#1a3a5c)' : plan.enterprise ? 'linear-gradient(180deg,#0d1b2a,#0f3460)' : '#fff' }}>

                {/* Admin + Staff highlights */}
                <div style={{
                  background: plan.featured ? 'rgba(255,255,255,0.07)' : plan.enterprise ? 'rgba(35,150,198,0.12)' : plan.accentBg,
                  borderRadius: 12,
                  padding: '12px 16px',
                  marginBottom: 20,
                  border: plan.featured
                    ? '1px solid rgba(255,255,255,0.10)'
                    : plan.enterprise
                      ? '1px solid rgba(35,150,198,0.25)'
                      : `1px solid ${plan.accentLight}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
                    <UserCircle weight="fill" style={{ width: 16, height: 16, color: plan.featured || plan.enterprise ? '#7DD3FC' : plan.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: plan.featured || plan.enterprise ? 'white' : '#183963' }}>{plan.admins}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <Users weight="fill" style={{ width: 16, height: 16, color: plan.featured || plan.enterprise ? '#7DD3FC' : plan.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: plan.featured || plan.enterprise ? 'white' : '#183963' }}>{plan.staff}</span>
                  </div>
                </div>

                {/* Feature list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: plan.enterprise ? 24 : 26, position: 'relative' }}>
                  {features.map(f => (
                    <div key={f} style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      filter: plan.enterprise ? 'blur(4px)' : 'none',
                      userSelect: plan.enterprise ? 'none' : 'auto',
                      pointerEvents: plan.enterprise ? 'none' : 'auto',
                    }}>
                      <CheckCircle
                        weight="fill"
                        style={{ width: 16, height: 16, color: plan.featured ? '#5AB4D5' : plan.enterprise ? '#5AB4D5' : plan.accent, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13.5, color: plan.featured || plan.enterprise ? 'rgba(255,255,255,0.78)' : '#374151', fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}

                  {/* Enterprise blur overlay */}
                  {plan.enterprise && (
                    <div style={{
                      position: 'absolute', inset: -4, borderRadius: 8,
                      background: 'linear-gradient(to bottom, rgba(13,27,42,0.10) 0%, rgba(15,52,96,0.85) 60%, rgba(15,52,96,1) 100%)',
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                      paddingBottom: 8,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(125,211,252,0.70)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Custom features included</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {plan.enterprise ? (
                  /* Enterprise: Talk with Sales */
                  <div>
                    <p style={{ fontSize: 12.5, color: 'rgba(186,230,255,0.60)', textAlign: 'center', marginBottom: 14, lineHeight: 1.55 }}>
                      Need a custom solution?<br />Contact our sales team.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={openSalesIQ}
                      style={{
                        width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                        padding: '14px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: 14.5, fontWeight: 800,
                        background: 'linear-gradient(135deg,#2396C6 0%,#1d6fa8 100%)',
                        color: 'white',
                        boxShadow: '0 8px 28px rgba(35,150,198,0.50), inset 0 1px 0 rgba(255,255,255,0.16)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      <Phone weight="fill" style={{ width: 16, height: 16 }} />
                      Talk with Sales
                    </motion.button>
                  </div>
                ) : (
                  /* Regular plans: Register */
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <a
                      href="https://booking.logezy.co/#/67044000000025008"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '13px 24px', borderRadius: 12, textDecoration: 'none',
                        fontSize: 14.5, fontWeight: 700,
                        background: plan.featured ? 'linear-gradient(135deg,#2396C6,#38BDF8)' : plan.gradient,
                        color: 'white',
                        boxShadow: plan.featured
                          ? '0 6px 22px rgba(35,150,198,0.48)'
                          : `0 4px 16px ${plan.accent}40`,
                      }}
                    >
                      Get Started <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TRUST STRIP ─────────────────────────── */}
      <section style={{ background: '#F8FAFF', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', padding: '28px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap' as const, gap: 24, justifyContent: 'center', alignItems: 'center' }}>
          {[
            { icon: '✓', text: 'Full onboarding support included' },
            { icon: '✓', text: 'Cancel anytime, no lock-in' },
            { icon: '✓', text: 'No setup fees' },
            { icon: '✓', text: 'All features in every plan' },
          ].map(item => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E8F5FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#2396C6' }}>{item.icon}</span>
              </div>
              <span style={{ fontSize: 13.5, color: '#4B5563', fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENTERPRISE BANNER ───────────────────── */}
      <section style={{ maxWidth: 900, margin: '64px auto', padding: '0 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg,#0d1b2a 0%,#0f3460 50%,#183963 100%)',
            borderRadius: 24, padding: '48px 40px',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
            boxShadow: '0 24px 64px rgba(15,52,96,0.30)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div style={{ position: 'absolute', top: '-20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(35,150,198,0.18) 0%,transparent 65%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(35,150,198,0.15)', border: '1px solid rgba(35,150,198,0.30)', borderRadius: 40, padding: '5px 14px', marginBottom: 16 }}>
              <Phone weight="fill" style={{ width: 11, height: 11, color: '#7DD3FC' }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#7DD3FC', letterSpacing: '0.09em', textTransform: 'uppercase' as const }}>Enterprise</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 12, letterSpacing: '-0.025em', fontFamily: 'var(--font-heading)' }}>
              Need a custom solution<br />
              <span style={{ color: '#7DD3FC' }}>built for your agency?</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(186,230,255,0.65)', lineHeight: 1.72, maxWidth: 480 }}>
              Our enterprise plan is fully tailored. Custom integrations, dedicated support, bespoke onboarding, and pricing that scales with your operation. Contact our sales team and we will build the right package for you.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={openSalesIQ}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12, border: 'none', cursor: 'pointer',
                fontSize: 14.5, fontWeight: 800,
                background: 'linear-gradient(135deg,#2396C6,#38BDF8)',
                color: 'white',
                boxShadow: '0 10px 32px rgba(35,150,198,0.48)',
                whiteSpace: 'nowrap' as const,
              }}
            >
              <Phone weight="fill" style={{ width: 15, height: 15 }} />
              Talk with Sales
            </motion.button>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px 28px', borderRadius: 12, textDecoration: 'none',
                fontSize: 14, fontWeight: 600,
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              Send a message
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
