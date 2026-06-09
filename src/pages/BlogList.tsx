import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CalendarBlank } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease },
});

/* category colour */
const CAT_COLOR: Record<string, { bg: string; text: string }> = {
  Healthcare:    { bg: '#D1FAE5', text: '#065F46' },
  Technology:    { bg: '#EEF2FF', text: '#3730A3' },
  'Agency Tips': { bg: '#FEF3C7', text: '#92400E' },
};
function catStyle(cat: string) {
  return CAT_COLOR[cat] ?? { bg: '#E0F2FE', text: '#0369A1' };
}

export default function BlogList() {
  const [hero, ...rest] = blogs;

  return (
    <div style={{ background: '#F0F2F5', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>

      {/* ════════════════════════════════
          PAGE HEADER
      ════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(140deg,#0B1E3D 0%,#173462 60%,#1A5EA0 100%)',
        padding: '68px 48px 56px',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 24 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>
              Logezy · Resources
            </p>
            <h1 style={{ fontSize: 'clamp(3.2rem,7vw,6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.055em', lineHeight: 0.9, margin: '0 0 18px', fontFamily: 'var(--font-heading)' }}>
              Blog
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', maxWidth: 440, lineHeight: 1.6, margin: 0 }}>
              Staffing insights, compliance guides and product updates for UK recruitment agencies.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15, ease }}>
            <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 50, background: '#2396C6', color: '#fff', fontSize: 13.5, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 24px rgba(35,150,198,0.42)', flexShrink: 0 }}>
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════ */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '44px 48px 96px' }}>

        {/* ── HERO CARD: split — text left | image right ── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 28 }}>
          <Link to={`/resources/blog/${hero.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                borderRadius: 24, overflow: 'hidden',
                display: 'grid', gridTemplateColumns: '42% 58%',
                minHeight: 420,
                boxShadow: '0 8px 48px rgba(0,0,0,0.15)',
                transition: 'transform 0.32s ease, box-shadow 0.32s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 24px 64px rgba(0,0,0,0.20)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 48px rgba(0,0,0,0.15)'; }}
            >
              {/* LEFT — dark content panel */}
              <div style={{
                background: 'linear-gradient(160deg,#0B1E3D 0%,#173462 100%)',
                padding: '44px 40px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  {/* Top meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 20, background: catStyle(hero.category).bg, color: catStyle(hero.category).text, fontSize: 11, fontWeight: 700, letterSpacing: '0.03em' }}>
                      {hero.category}
                    </span>
                    <span style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)' }}>
                      ★ Featured
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{ fontSize: 'clamp(1.45rem,2.4vw,2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.20, margin: '0 0 18px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.035em' }}>
                    {hero.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.60)', lineHeight: 1.70, margin: 0 }}>
                    {hero.excerpt}
                  </p>
                </div>

                {/* Bottom — meta + CTA */}
                <div style={{ marginTop: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.50)', fontWeight: 600 }}>
                      <CalendarBlank style={{ width: 13, height: 13 }} />{hero.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.50)', fontWeight: 600 }}>
                      <Clock style={{ width: 13, height: 13 }} />{hero.readTime}
                    </span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 50, background: '#2396C6', color: '#fff', fontSize: 13.5, fontWeight: 800, boxShadow: '0 4px 16px rgba(35,150,198,0.40)' }}>
                    Read Article <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
                  </div>
                </div>
              </div>

              {/* RIGHT — blog image, displayed clean, no overlay */}
              <div style={{ overflow: 'hidden', background: '#fff' }}>
                <img
                  src={hero.coverImage} alt={hero.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── SECONDARY CARDS — 2 columns ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24, marginBottom: 52 }}>
          {rest.map((post, i) => (
            <motion.div key={post.slug} {...fadeUp(0.1 + i * 0.1)}>
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div
                  style={{
                    background: '#fff', borderRadius: 20, overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', height: '100%',
                    boxShadow: '0 2px 18px rgba(0,0,0,0.08)',
                    transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 20px 56px rgba(0,0,0,0.14)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 18px rgba(0,0,0,0.08)'; }}
                >
                  {/* Image — clean, no overlay text on top */}
                  <div style={{ height: 260, overflow: 'hidden', flexShrink: 0, background: '#F0F2F5' }}>
                    <img
                      src={post.coverImage} alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                    />
                  </div>

                  {/* Content below image */}
                  <div style={{ padding: '24px 26px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Category + meta row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <span style={{ padding: '4px 11px', borderRadius: 20, background: catStyle(post.category).bg, color: catStyle(post.category).text, fontSize: 11, fontWeight: 700 }}>
                          {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
                          <CalendarBlank style={{ width: 11, height: 11 }} />{post.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
                          <Clock style={{ width: 11, height: 11 }} />{post.readTime}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0B1E3D', lineHeight: 1.25, margin: '0 0 12px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.65, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 13.5, fontWeight: 800, color: '#2396C6' }}>
                      Read Article <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── ALL POSTS HEADING ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B1E3D', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' as const }}>
            All Posts
          </h2>
          <div style={{ flex: 1, height: 1, background: '#D1D5DB' }} />
        </div>

        {/* ── THUMBNAIL ROW — 3 horizontal cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 56 }}>
          {blogs.map((post, i) => (
            <motion.div key={`th-${post.slug}`} {...fadeUp(i * 0.09)}>
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    background: '#fff', borderRadius: 16, overflow: 'hidden',
                    display: 'flex', height: 116,
                    boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
                    border: '1px solid #E9EDF2',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 30px rgba(35,150,198,0.14)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 1px 8px rgba(0,0,0,0.07)'; }}
                >
                  {/* Square thumbnail — hard px on both wrapper + img */}
                  <div style={{ width: 116, height: 116, flexShrink: 0, overflow: 'hidden' }}>
                    <img
                      src={post.coverImage} alt={post.title}
                      style={{ width: 116, height: 116, objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                    />
                  </div>

                  {/* Text content */}
                  <div style={{ flex: 1, padding: '13px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, borderLeft: '1px solid #F3F4F6' }}>
                    <div>
                      <span style={{
                        display: 'inline-block', padding: '2px 9px', borderRadius: 10, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 7,
                        background: catStyle(post.category).bg, color: catStyle(post.category).text,
                      }}>
                        {post.category}
                      </span>
                      <p style={{ fontSize: 12.5, fontWeight: 800, color: '#0B1E3D', lineHeight: 1.28, margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.title}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600 }}>{post.date}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#2396C6', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        Read <ArrowRight weight="bold" style={{ width: 9, height: 9 }} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div {...fadeUp(0.1)}>
          <div style={{
            borderRadius: 22,
            background: 'linear-gradient(135deg,#0B1E3D 0%,#173462 50%,#2396C6 100%)',
            padding: '52px 60px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap' as const,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 48px rgba(11,30,61,0.28)',
          }}>
            {/* dot grid texture */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
            {/* glow orb */}
            <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(35,150,198,0.40) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Get Started</p>
              <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>
                Ready to see Logezy in action?
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.60)', margin: 0, maxWidth: 440 }}>
                Book a free demo and discover how Logezy helps UK staffing agencies work smarter.
              </p>
            </div>
            <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 30px', borderRadius: 50, background: '#fff', color: '#0B1E3D', fontSize: 14.5, fontWeight: 800, textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.22)' }}>
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
