import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {
  CalendarBlank, Shield, DeviceMobile, FileText, Buildings, ClipboardText,
  Bell, ArrowRight, CheckCircle, Users, Clock, Heartbeat, BookOpen, ForkKnife,
} from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const NAVY = '#0C1835';

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  linkTo?: string;
}

interface IndustryConfig {
  slug: string;
  label: string;
  HeroIcon: React.ElementType;
  accent: string;
  accentBg: string;
  accentMid: string;
  heroBg: string;
  title: string;
  tagline: string;
  heroDesc: string;
  heroStats: { value: string; label: string; color: string }[];
  challengeHeading: string;
  challengeText: string;
  featuresHeading: string;
  features: FeatureItem[];
  quote: string;
}

/* ═══════════════════════════════════════════════════
   PAGE CONFIGS
═══════════════════════════════════════════════════ */
const pages: IndustryConfig[] = [
  {
    slug: 'healthcare',
    label: 'Healthcare & Nursing',
    HeroIcon: Heartbeat,
    accent: '#E11D48',
    accentBg: '#FFF1F2',
    accentMid: '#FB7185',
    heroBg: 'linear-gradient(135deg, #FFF1F2 0%, #FDF2F8 55%, #FFFFFF 100%)',
    title: 'Healthcare & Nursing',
    tagline: 'Compliant workers. Shifts filled faster. Zero admin chaos.',
    heroDesc: 'Nursing recruitment is complex. Your software shouldn\'t make it harder. Right-to-work checks, DBS certificates, NMC pins, shift cover at midnight — nursing agencies carry more compliance weight than almost any other sector. Logezy takes that weight off your team.',
    heroStats: [
      { value: '98.7%', label: 'Avg compliance score', color: '#16A34A' },
      { value: '312', label: 'DBS records tracked', color: '#E11D48' },
      { value: '94%', label: 'Shift fill rate', color: '#7C3AED' },
    ],
    challengeHeading: 'Nursing recruitment is complex. Your software shouldn\'t make it harder.',
    challengeText: 'Right-to-work checks, DBS certificates, NMC pins, shift cover at midnight — nursing agencies carry more compliance weight than almost any other sector. One lapsed document, one missed check, one placement that wasn\'t fully signed off — and your agency is exposed. Logezy gives nursing and healthcare recruitment agencies a single, centralised platform to manage compliance, scheduling, timesheets, and client communication without the risk, the chaos, or the manual effort.',
    featuresHeading: 'Everything your nursing agency needs to stay compliant and keep every shift filled.',
    features: [
      { icon: Shield, title: 'Compliance Tracking', desc: 'Every document. Every expiry. Automatically monitored. Right-to-work checks, DBS certificates, NMC pins, training qualifications — stored, tracked, and flagged before they lapse.', linkTo: '/product/compliance' },
      { icon: CalendarBlank, title: 'Shift Scheduling', desc: 'Fill nursing shifts faster with live availability and role matching. See who\'s qualified, available, and near the location before you pick up the phone.', linkTo: '/product/scheduling' },
      { icon: DeviceMobile, title: 'Candidate App', desc: 'A fully branded app your nurses actually use. Workers manage availability, confirm shifts, submit timesheets, and upload compliance documents — all from their phone.', linkTo: '/product/mobile-app' },
      { icon: FileText, title: 'Digital Timesheets', desc: 'Submitted from their phone. Approved in one click. GPS-verified, e-signed, tamper-proof records that feed straight into payroll and invoicing.', linkTo: '/product/timesheets' },
      { icon: Buildings, title: 'Client Portal', desc: 'Give care homes and NHS trusts live shift visibility. Clients can see who\'s booked, approve timesheets, and access invoices — without calling your team.', linkTo: '/product/client-portal' },
      { icon: ClipboardText, title: 'Fast Onboarding', desc: 'Get nurses placement-ready in hours, not days. A fully digital recruitment portal collects documents, forms, and compliance paperwork before their first shift.', linkTo: '/product/recruitment' },
    ],
    quote: '"Compliance used to be our biggest risk. Now it runs itself."',
  },
  {
    slug: 'education',
    label: 'Education',
    HeroIcon: BookOpen,
    accent: '#7C3AED',
    accentBg: '#F5F3FF',
    accentMid: '#A78BFA',
    heroBg: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 55%, #FFFFFF 100%)',
    title: 'Education',
    tagline: 'The right teachers. The right checks. Ready when schools need them.',
    heroDesc: 'Schools can\'t wait. Your agency can\'t afford gaps. Supplying teaching staff requires fast turnaround, airtight safeguarding compliance, and reliable workers who show up. Managing all of that manually — across multiple schools and a constantly changing candidate pool — puts enormous pressure on your team. Logezy takes that pressure away.',
    heroStats: [
      { value: '100%', label: 'Safeguarding audit-ready', color: '#7C3AED' },
      { value: '3×', label: 'Faster placements', color: '#16A34A' },
      { value: '0', label: 'Compliance gaps', color: '#E11D48' },
    ],
    challengeHeading: 'Schools can\'t wait. Your agency can\'t afford gaps.',
    challengeText: 'Supplying teaching staff requires fast turnaround, airtight safeguarding compliance, and reliable workers who show up. Managing all of that manually — across multiple schools and a constantly changing candidate pool — puts enormous pressure on your team. One safeguarding gap, one unverified qualification, one teacher who doesn\'t show — and the school is calling your competitor next time. Logezy gives education recruitment agencies the tools to move faster, stay fully compliant, and build the kind of reputation that keeps schools coming back.',
    featuresHeading: 'Everything your education agency needs to place faster and protect every school.',
    features: [
      { icon: Shield, title: 'Compliance Tracking', desc: 'DBS certificates, safeguarding checks, and teaching qualifications — all monitored automatically. Every candidate arrives at school with the right checks in place.', linkTo: '/product/compliance' },
      { icon: CalendarBlank, title: 'Shift Scheduling', desc: 'Place teachers and support staff faster with smart scheduling tools. Live availability, role matching, and instant notifications mean cover is confirmed — fast.', linkTo: '/product/scheduling' },
      { icon: DeviceMobile, title: 'Candidate App', desc: 'Teachers manage their own availability, shifts, and documents from their phone. Less chasing for your team. More control for your candidates.', linkTo: '/product/mobile-app' },
      { icon: FileText, title: 'Digital Timesheets', desc: 'No more paper timesheets sent home with teachers at the end of the week. Workers submit digitally with e-signature — ready for payroll the same day.', linkTo: '/product/timesheets' },
      { icon: Buildings, title: 'Client Portal', desc: 'Give schools direct visibility over their bookings, staff profiles, and invoices. Fewer calls. Better relationships. Contracts that renew themselves.', linkTo: '/product/client-portal' },
      { icon: ClipboardText, title: 'Fast Onboarding', desc: 'Get new candidates through compliance and placement-ready before term starts. A structured digital onboarding flow means no candidate falls through the cracks.', linkTo: '/product/recruitment' },
    ],
    quote: '"We used to spend the whole morning finding cover. Now it takes minutes."',
  },
  {
    slug: 'hospitality',
    label: 'Hospitality',
    HeroIcon: ForkKnife,
    accent: '#D97706',
    accentBg: '#FFFBEB',
    accentMid: '#FCD34D',
    heroBg: 'linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 55%, #FFFFFF 100%)',
    title: 'Hospitality',
    tagline: 'Last-minute shifts covered. Workers always ready. Clients always happy.',
    heroDesc: 'Events overrun, bookings spike, and clients need cover with hours to spare. Managing a flexible hospitality workforce manually — across hotels, venues, and catering clients — means your team is always reacting instead of staying ahead. Logezy gives hospitality staffing agencies the tools to move faster, fill shifts with confidence, and keep every client covered no matter what the week throws at you.',
    heroStats: [
      { value: '< 2m', label: 'Avg shift confirmation', color: '#D97706' },
      { value: '85%', label: 'Reduction in no-shows', color: '#16A34A' },
      { value: '100%', label: 'Shift fill rate achieved', color: '#7C3AED' },
    ],
    challengeHeading: 'Hospitality never slows down. Your staffing operation can\'t either.',
    challengeText: 'Events overrun, bookings spike, and clients need cover with hours to spare. Managing a flexible hospitality workforce manually — across hotels, venues, and catering clients — means your team is always reacting instead of staying ahead. Workers cancel last minute, shifts go unfilled, and clients lose confidence in your agency. Logezy gives you the speed, visibility, and communication tools to stay ahead of every situation — and keep every client covered, every time.',
    featuresHeading: 'Everything your hospitality agency needs to fill every shift — fast.',
    features: [
      { icon: CalendarBlank, title: 'Shift Scheduling', desc: 'Build and fill hospitality shifts in minutes with live availability and role matching. See who\'s free, who\'s qualified, and who\'s nearby — before you start calling.', linkTo: '/product/scheduling' },
      { icon: Bell, title: 'Three-Way Notifications', desc: 'Workers get shift updates across push, SMS, and email simultaneously — so no-shows become rare and last-minute cancellations get covered before your client even notices.', linkTo: '/product/mobile-app' },
      { icon: DeviceMobile, title: 'Candidate App', desc: 'Workers manage availability, confirm shifts, and submit timesheets from their phone. Your team spends less time on calls and more time filling shifts that actually matter.', linkTo: '/product/mobile-app' },
      { icon: FileText, title: 'Digital Timesheets', desc: 'End the paper timesheet chaos at the end of every event or shift. Workers submit digitally, managers approve in one click, and payroll is ready the same day.', linkTo: '/product/timesheets' },
      { icon: ClipboardText, title: 'Fast Onboarding', desc: 'Get new hospitality workers registered, compliant, and placement-ready fast. A structured digital onboarding flow means your candidate pool grows without the admin overhead.', linkTo: '/product/recruitment' },
      { icon: Buildings, title: 'Client Portal', desc: 'Give hotels, venues, and catering clients their own live dashboard — shift coverage, worker profiles, timesheets, and invoices — all in one place.', linkTo: '/product/client-portal' },
    ],
    quote: '"We\'re placing more workers in less time and the team isn\'t drowning in calls anymore."',
  },
];

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cfg = pages.find(p => p.slug === slug);
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  if (!cfg) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#E5E7EB' }}>404</div>
        <Link to="/about" style={{ color: '#5B6CF9', fontWeight: 600, textDecoration: 'none' }}>← Back</Link>
      </div>
    );
  }

  const { HeroIcon } = cfg;

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true },
    transition: { duration: 0.55 },
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ background: cfg.heroBg, paddingTop: 80, paddingBottom: 72, overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 56, alignItems: 'center' }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 13, color: '#9CA3AF' }}>
              <Link to="/about" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Industries</Link>
              <span>/</span>
              <span style={{ color: cfg.accent, fontWeight: 600 }}>{cfg.label}</span>
            </div>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: cfg.accentBg, border: `1px solid ${cfg.accent}30`, borderRadius: 30, padding: '6px 14px', marginBottom: 22 }}>
              <HeroIcon weight="regular" style={{ width: 14, height: 14, color: cfg.accent }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{cfg.label}</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 900, color: NAVY, lineHeight: 1.1, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Staffing software built for{' '}
              <span style={{
                background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accentMid})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline',
              }}>{cfg.label}</span>{' '}agencies.
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: 17, fontWeight: 600, color: '#374151', lineHeight: 1.5, marginBottom: 18 }}>
              {cfg.tagline}
            </p>

            {/* Desc */}
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 34, maxWidth: 480 }}>
              {cfg.heroDesc}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 10, background: `linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`, color: 'white', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: `0 8px 24px ${cfg.accent}40` }}>
                Book a Free Demo <ArrowRight weight="regular" style={{ width: 16, height: 16 }} />
              </motion.a>
              <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 10, background: 'white', color: NAVY, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '1.5px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                Start Free Trial
              </motion.a>
            </div>
          </motion.div>

          {/* Right — stats visual */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cfg.heroStats.map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                style={{ background: 'white', borderRadius: 16, padding: '20px 24px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: cfg.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: cfg.accent }}>{stat.value}</span>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHALLENGE ────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg,${NAVY} 0%,#0E2050 100%)`, padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: 'white', lineHeight: 1.25, marginBottom: 20 }}>
              {cfg.challengeHeading}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.70)', lineHeight: 1.85 }}>
              {cfg.challengeText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section style={{ background: '#F8FAFC', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: cfg.accentBg, border: `1px solid ${cfg.accent}30`, borderRadius: 30, padding: '5px 16px', marginBottom: 16 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>What Logezy handles</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: NAVY, lineHeight: 1.25, maxWidth: 680, margin: '0 auto' }}>
              {cfg.featuresHeading}
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
            {cfg.features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)', y: -3 }}
                style={{ background: 'white', borderRadius: 14, padding: '24px 22px', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: cfg.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <f.icon weight="regular" style={{ width: 20, height: 20, color: cfg.accent }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{f.title}</div>
                    <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, marginBottom: f.linkTo ? 12 : 0 }}>{f.desc}</div>
                    {f.linkTo && (
                      <Link to={f.linkTo} style={{ fontSize: 13, fontWeight: 600, color: cfg.accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        Learn more <ArrowRight weight="regular" style={{ width: 12, height: 12 }} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────── */}
      <section style={{ background: 'white', padding: '72px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: cfg.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <span style={{ fontSize: 28, color: cfg.accent, lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</span>
            </div>
            <p style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: NAVY, lineHeight: 1.4, marginBottom: 24, fontStyle: 'italic' }}>
              {cfg.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeroIcon weight="regular" style={{ width: 16, height: 16, color: 'white' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>Agency Director</div>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>{cfg.label} Staffing Agency, UK</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
