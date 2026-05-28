import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Buildings, Clock, Tag, Heartbeat, ForkKnife, GraduationCap } from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════ */
const NAVY = '#0C1835';
const INDIGO = '#5B6CF9';

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const blogPosts = [
  {
    id: 1,
    title: 'How to reduce admin time by 60% in your temp agency',
    excerpt: 'Discover the key systems and automations that fast-growing temp agencies are using to cut admin overhead — without adding headcount.',
    category: 'Agency Growth',
    categoryColor: '#5B6CF9',
    categoryBg: '#EEF2FF',
    readTime: '5 min read',
    date: 'May 2025',
    featured: true,
  },
  {
    id: 2,
    title: 'CQC compliance: what nursing agencies need to know in 2025',
    excerpt: 'A practical guide to the compliance requirements facing nursing and healthcare staffing agencies — and how to stay audit-ready at all times.',
    category: 'Compliance',
    categoryColor: '#E11D48',
    categoryBg: '#FFF1F2',
    readTime: '7 min read',
    date: 'Apr 2025',
    featured: false,
  },
  {
    id: 3,
    title: 'The hidden cost of paper timesheets for temp agencies',
    excerpt: 'Paper timesheets cost UK temp agencies thousands of hours in admin every year. Here\'s the full breakdown — and how to fix it.',
    category: 'Operations',
    categoryColor: '#D97706',
    categoryBg: '#FFFBEB',
    readTime: '4 min read',
    date: 'Apr 2025',
    featured: false,
  },
  {
    id: 4,
    title: '5 signs your staffing agency has outgrown its current software',
    excerpt: 'If your team is managing rotas in spreadsheets and chasing timesheets by text, it might be time for an upgrade. Here\'s what to look for.',
    category: 'Technology',
    categoryColor: '#0891B2',
    categoryBg: '#ECFEFF',
    readTime: '6 min read',
    date: 'Mar 2025',
    featured: false,
  },
  {
    id: 5,
    title: 'How digital onboarding cuts time-to-placement for temp agencies',
    excerpt: 'Every day a candidate waits to be onboarded is a day your agency isn\'t billing. Digital onboarding fixes that — here\'s how.',
    category: 'Recruitment',
    categoryColor: '#16A34A',
    categoryBg: '#DCFCE7',
    readTime: '4 min read',
    date: 'Mar 2025',
    featured: false,
  },
  {
    id: 6,
    title: 'Building client loyalty in temp recruitment: the transparency advantage',
    excerpt: 'Clients who can see shift coverage, compliance data, and invoices in real time are clients who stay. Here\'s how to give them that visibility.',
    category: 'Client Management',
    categoryColor: '#7C3AED',
    categoryBg: '#F5F3FF',
    readTime: '5 min read',
    date: 'Feb 2025',
    featured: false,
  },
];

const caseStudies = [
  {
    id: 1,
    company: 'Midlands Healthcare Staffing',
    industry: 'Healthcare & Nursing',
    IndustryIcon: Heartbeat,
    accentColor: '#E11D48',
    accentBg: '#FFF1F2',
    result: '60% reduction in admin time',
    story: 'From manual spreadsheets to fully automated compliance tracking and shift scheduling — in under two weeks. Every nurse\'s documents are tracked, every shift is filled faster, and the team has cut their admin workload by more than half.',
    stats: [
      { value: '60%', label: 'Less admin' },
      { value: '312', label: 'Nurses managed' },
      { value: '98.7%', label: 'Compliance score' },
    ],
    to: '/industries/healthcare',
  },
  {
    id: 2,
    company: 'Bright Futures Education',
    industry: 'Education',
    IndustryIcon: GraduationCap,
    accentColor: '#7C3AED',
    accentBg: '#F5F3FF',
    result: '200+ teachers placed per term',
    story: 'Replaced phone-heavy cover matching with live availability scheduling and a branded candidate app. Teachers manage their own availability, schools get real-time coverage visibility, and placements happen in minutes — not mornings.',
    stats: [
      { value: '200+', label: 'Teachers placed' },
      { value: '3×', label: 'Faster placements' },
      { value: '0', label: 'Safeguarding gaps' },
    ],
    to: '/industries/education',
  },
  {
    id: 3,
    company: 'Premier Events Staffing',
    industry: 'Hospitality',
    IndustryIcon: ForkKnife,
    accentColor: '#D97706',
    accentBg: '#FFFBEB',
    result: 'Zero missed shifts in 6 months',
    story: 'Three-way notifications across push, SMS, and email, combined with instant shift reassignment tools, means clients are always covered — even when workers cancel last minute. The team went from constant firefighting to staying ahead.',
    stats: [
      { value: '0', label: 'Missed shifts' },
      { value: '85%', label: 'Fewer no-shows' },
      { value: '100%', label: 'Shift fill rate' },
    ],
    to: '/industries/hospitality',
  },
];

/* ═══════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════ */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.55 },
};

/* ═══════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════ */
function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
      style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      {/* Coloured top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg,${post.categoryColor},${post.categoryColor}88)` }} />
      <div style={{ padding: '22px 22px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: post.categoryColor, background: post.categoryBg, padding: '3px 10px', borderRadius: 20 }}>{post.category}</span>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>·</span>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>{post.readTime}</span>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>{post.date}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: INDIGO, display: 'flex', alignItems: 'center', gap: 4 }}>
            Read more <ArrowRight weight="regular" style={{ width: 12, height: 12 }} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function Resources() {
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'case-studies'>('all');

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 55%,#FFFFFF 100%)', paddingTop: 80, paddingBottom: 64 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 30, padding: '5px 16px', marginBottom: 24 }}>
              <BookOpen weight="regular" style={{ width: 13, height: 13, color: INDIGO }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: INDIGO, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Resources</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, color: NAVY, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Stay ahead in{' '}
              <span style={{ background: 'linear-gradient(135deg,#5B6CF9,#8B5CF6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline' }}>
                temp recruitment.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: '#4B5563', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 36px' }}>
              Practical guides, industry insights, and real-world case studies for UK temp recruitment agencies.
            </p>

            {/* Tabs */}
            <div style={{ display: 'inline-flex', background: 'white', borderRadius: 12, padding: 4, border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', gap: 2 }}>
              {([['all', 'All Resources'], ['blog', 'Blog'], ['case-studies', 'Case Studies']] as const).map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ padding: '8px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s', background: activeTab === id ? INDIGO : 'transparent', color: activeTab === id ? 'white' : '#6B7280' }}>
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED POST ─────────────────────────── */}
      {(activeTab === 'all' || activeTab === 'blog') && (
        <section style={{ background: 'white', padding: '56px 24px 40px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div {...fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ height: 2, width: 32, background: INDIGO, borderRadius: 2 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: INDIGO, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Featured Article</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              whileHover={{ boxShadow: '0 16px 56px rgba(91,108,249,0.12)' }}
              style={{ background: 'linear-gradient(135deg,#EEF2FF 0%,#F5F3FF 100%)', borderRadius: 20, padding: '40px 44px', border: '1px solid #C7D2FE', cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: INDIGO, background: '#EEF2FF', border: '1px solid #C7D2FE', padding: '3px 10px', borderRadius: 20 }}>Agency Growth</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>5 min read · May 2025</span>
                </div>
                <h2 style={{ fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, color: NAVY, lineHeight: 1.3, marginBottom: 12 }}>
                  How to reduce admin time by 60% in your temp agency
                </h2>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, maxWidth: 600, marginBottom: 20 }}>
                  Discover the key systems and automations that fast-growing temp agencies are using to cut admin overhead — without adding headcount. From digital timesheets to automated compliance tracking, here's what actually moves the needle.
                </p>
                <span style={{ fontSize: 14, fontWeight: 700, color: INDIGO, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Read the full article <ArrowRight weight="regular" style={{ width: 14, height: 14 }} />
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 80, lineHeight: 1, opacity: 0.15 }}>📊</div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── BLOG POSTS ───────────────────────────── */}
      {(activeTab === 'all' || activeTab === 'blog') && (
        <section style={{ background: 'white', padding: '16px 24px 56px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div {...fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{ height: 2, width: 32, background: '#E5E7EB', borderRadius: 2 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Latest Articles</span>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {blogPosts.slice(1).map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CASE STUDIES ─────────────────────────── */}
      {(activeTab === 'all' || activeTab === 'case-studies') && (
        <section style={{ background: '#F8FAFC', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div {...fadeUp} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ height: 2, width: 32, background: INDIGO, borderRadius: 2 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: INDIGO, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Case Studies</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, maxWidth: 560 }}>
                Real agencies. Real results.
              </h2>
              <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginTop: 10, maxWidth: 520 }}>
                How UK temp recruitment agencies are using Logezy to grow faster and work smarter.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
              {caseStudies.map((cs, i) => (
                <motion.div key={cs.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
                  style={{ background: 'white', borderRadius: 18, overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  {/* Header */}
                  <div style={{ background: `linear-gradient(135deg,${cs.accentColor}15,${cs.accentColor}05)`, padding: '24px 24px 20px', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: cs.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <cs.IndustryIcon weight="regular" style={{ width: 20, height: 20, color: cs.accentColor }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{cs.company}</div>
                        <div style={{ fontSize: 12, color: '#9CA3AF' }}>{cs.industry}</div>
                      </div>
                    </div>
                    <div style={{ background: cs.accentBg, border: `1px solid ${cs.accentColor}30`, borderRadius: 10, padding: '10px 14px', display: 'inline-block' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: cs.accentColor }}>Result: {cs.result}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '20px 24px 24px' }}>
                    <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 20 }}>{cs.story}</p>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
                      {cs.stats.map(s => (
                        <div key={s.label} style={{ textAlign: 'center', background: '#F8FAFC', borderRadius: 10, padding: '10px 6px' }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: cs.accentColor }}>{s.value}</div>
                          <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <Link to={cs.to}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: cs.accentColor, textDecoration: 'none' }}>
                      See {cs.industry} features <ArrowRight weight="regular" style={{ width: 13, height: 13 }} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER CTA ────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg,${NAVY} 0%,#0E2050 100%)`, padding: '72px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(91,108,249,0.2)', border: '1px solid rgba(91,108,249,0.35)', borderRadius: 30, padding: '5px 16px', marginBottom: 24 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: INDIGO }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#818CF8', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Stay Updated</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 14 }}>
              Get the latest guides<br />delivered to your inbox.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, marginBottom: 32 }}>
              Practical insights for UK temp recruitment agencies — no fluff, no spam.
            </p>
            <div style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' as const }}>
              <input
                type="email"
                placeholder="Your work email"
                style={{ flex: 1, minWidth: 200, padding: '13px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 15, outline: 'none' }}
              />
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '13px 22px', borderRadius: 10, background: `linear-gradient(135deg,${INDIGO},#7C3AED)`, color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const, boxShadow: '0 6px 20px rgba(91,108,249,0.40)' }}>
                Subscribe
              </motion.button>
            </div>
            <p style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              Unsubscribe anytime. We respect your inbox.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
