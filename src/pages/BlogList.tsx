import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

/* ── Category tag ── */
function CategoryTag({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 20,
      background: light ? 'rgba(255,255,255,0.92)' : '#EEF2FF',
      border: `1px solid ${light ? 'rgba(255,255,255,0.5)' : '#C7D2FE'}`,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
      color: light ? '#0F172A' : '#3730A3',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: light ? '#2396C6' : '#4F46E5', flexShrink: 0 }} />
      {label}
    </span>
  );
}

export default function BlogList() {
  const [p1, p2, p3] = blogs;

  return (
    <div style={{ background: '#F4F6F8', minHeight: '100vh' }}>

      {/* ══ HERO BANNER ══ */}
      <div style={{ background: 'linear-gradient(135deg,#0F2040 0%,#183765 55%,#1E5799 100%)', padding: '64px 40px 52px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' as const }}>
          <div>
            <motion.p {...fadeUp(0)} style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, margin: '0 0 10px', fontFamily: 'var(--font-body)' }}>
              Logezy Resources
            </motion.p>
            <motion.h1 {...fadeUp(0.06)} style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 0.95, margin: 0, fontFamily: 'var(--font-heading)' }}>
              Our Blog
            </motion.h1>
            <motion.p {...fadeUp(0.12)} style={{ marginTop: 16, fontSize: 15, color: 'rgba(255,255,255,0.60)', fontFamily: 'var(--font-body)', maxWidth: 440 }}>
              Staffing insights, product updates and agency growth guides — all in one place.
            </motion.p>
          </div>
          <motion.div {...fadeUp(0.16)}>
            <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 50, background: '#2396C6', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(35,150,198,0.4)' }}>
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* ── TOP GRID: 1 featured + 2 secondary ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>

          {/* ── LEFT: Featured large card ── */}
          <motion.div {...fadeUp(0)}>
            <Link to={`/resources/blog/${p1.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.14)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)'; }}
              >
                {/* Image container — explicit height + overflow */}
                <div style={{ height: 340, position: 'relative', overflow: 'hidden' }}>
                  <img src={p1.coverImage} alt={p1.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 55%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16 }}><CategoryTag label={p1.category} light /></div>
                  <div style={{ position: 'absolute', top: 16, right: 16, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.90)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight weight="bold" style={{ width: 15, height: 15, color: '#0F172A' }} />
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '24px 28px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                    <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{p1.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                      <Clock style={{ width: 12, height: 12 }} /> {p1.readTime}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.2rem,2vw,1.55rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.22, margin: '0 0 12px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                    {p1.title}
                  </h2>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: '0 0 20px', fontFamily: 'var(--font-body)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                    {p1.excerpt}
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 800, color: '#2396C6' }}>
                    Read article <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── RIGHT: 2 stacked cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[p2, p3].map((post, i) => (
              <motion.div key={post.slug} {...fadeUp(0.10 + i * 0.08)}>
                <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', transition: 'transform 0.25s,box-shadow 0.25s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.13)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)'; }}
                  >
                    {/* Image — fixed 200px height */}
                    <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                      <img src={post.coverImage} alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.3) 0%,transparent 60%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: 12, left: 12 }}><CategoryTag label={post.category} light /></div>
                      <div style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowUpRight weight="bold" style={{ width: 12, height: 12, color: '#0F172A' }} />
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: '18px 20px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                        <span style={{ fontSize: 11.5, color: '#94A3B8', fontWeight: 600 }}>{post.date}</span>
                        <span style={{ fontSize: 11.5, color: '#94A3B8', fontWeight: 600 }}>{post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.28, margin: '0 0 12px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.title}
                      </h3>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 700, color: '#2396C6' }}>
                        Read article <ArrowRight weight="bold" style={{ width: 11, height: 11 }} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SECTION DIVIDER + HEADING ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0 28px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' as const }}>All Posts</h2>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        </div>

        {/* ── THUMBNAIL CARDS — 3 horizontal cards, all same size ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {blogs.map((post, i) => (
            <motion.div key={post.slug} {...fadeUp(i * 0.08)}>
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    background: '#fff', borderRadius: 16, overflow: 'hidden',
                    display: 'flex', height: 120,
                    boxShadow: '0 1px 10px rgba(0,0,0,0.07)',
                    border: '1px solid #F1F5F9',
                    transition: 'transform 0.22s,box-shadow 0.22s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 28px rgba(35,150,198,0.14)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 1px 10px rgba(0,0,0,0.07)'; }}
                >
                  {/* Square thumbnail — 120×120, hard-coded dimensions */}
                  <div style={{ width: 120, height: 120, flexShrink: 0, overflow: 'hidden' }}>
                    <img src={post.coverImage} alt={post.title}
                      style={{ width: 120, height: 120, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, borderLeft: '1px solid #F1F5F9' }}>
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 800, color: '#6366F1', letterSpacing: '0.07em', textTransform: 'uppercase' as const, margin: '0 0 5px', fontFamily: 'var(--font-body)' }}>
                        {post.category}
                      </p>
                      <p style={{ fontSize: 12.5, fontWeight: 800, color: '#0F172A', lineHeight: 1.30, margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.title}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 600 }}>{post.date}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#2396C6', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        Read <ArrowRight weight="bold" style={{ width: 10, height: 10 }} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div {...fadeUp(0.1)} style={{ marginTop: 48 }}>
          <div style={{
            background: 'linear-gradient(135deg,#183765 0%,#1966AA 60%,#2396C6 100%)',
            borderRadius: 20, padding: '44px 52px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap' as const,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>
                Ready to see Logezy in action?
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.68)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Book a free demo and see how Logezy helps your agency work smarter.
              </p>
            </div>
            <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 50, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}>
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
