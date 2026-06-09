import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CalendarBlank } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease },
  };
}

/* category colour map */
const catColor: Record<string, string> = {
  Healthcare:    '#10B981',
  Technology:    '#6366F1',
  'Agency Tips': '#F59E0B',
};
function catBg(cat: string) {
  return catColor[cat] ?? '#2396C6';
}

export default function BlogList() {
  const [hero, ...rest] = blogs;          // first post = hero, rest = side cards

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>

      {/* ══════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(140deg, #0B1E3D 0%, #183765 60%, #1A5EA0 100%)',
        padding: '72px 48px 60px',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 24 }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>
                Logezy · Resources
              </p>
              <h1 style={{ fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.055em', lineHeight: 0.9, margin: 0, fontFamily: 'var(--font-heading)' }}>
                Blog
              </h1>
              <p style={{ marginTop: 20, fontSize: 15.5, color: 'rgba(255,255,255,0.55)', maxWidth: 460, lineHeight: 1.6 }}>
                Insights on staffing, compliance, scheduling and the tools that help UK agencies grow.
              </p>
            </div>
            <a
              href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 50, background: '#2396C6', color: '#fff', fontSize: 13.5, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 24px rgba(35,150,198,0.45)', flexShrink: 0 }}
            >
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENT AREA
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '48px 48px 96px' }}>

        {/* ── FEATURED HERO POST ── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 28 }}>
          <Link to={`/resources/blog/${hero.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                borderRadius: 24, overflow: 'hidden', position: 'relative',
                height: 'clamp(340px, 45vw, 520px)',
                boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.012)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 72px rgba(0,0,0,0.26)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 48px rgba(0,0,0,0.18)';
              }}
            >
              {/* Full-bleed image */}
              <img
                src={hero.coverImage} alt={hero.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              {/* Gradient overlay — strong at bottom for readability */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,12,30,0.90) 0%, rgba(5,12,30,0.45) 45%, rgba(0,0,0,0.04) 100%)' }} />

              {/* Featured label — top left */}
              <div style={{ position: 'absolute', top: 24, left: 24 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 13px', borderRadius: 20, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#fff' }}>
                  ★ Featured
                </span>
              </div>

              {/* Category — top right */}
              <div style={{ position: 'absolute', top: 24, right: 24 }}>
                <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 20, background: catBg(hero.category), fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                  {hero.category}
                </span>
              </div>

              {/* Bottom content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
                    <CalendarBlank style={{ width: 12, height: 12 }} />{hero.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
                    <Clock style={{ width: 12, height: 12 }} />{hero.readTime}
                  </span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.18, margin: '0 0 16px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.035em', maxWidth: 700 }}>
                  {hero.title}
                </h2>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.68)', lineHeight: 1.65, margin: '0 0 22px', maxWidth: 580 }}>
                  {hero.excerpt}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 50, background: '#fff', color: '#0B1E3D', fontSize: 13.5, fontWeight: 800 }}>
                  Read Article <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── SECONDARY CARDS ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 56 }}>
          {rest.map((post, i) => (
            <motion.div key={post.slug} {...fadeUp(0.1 + i * 0.1)}>
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div
                  style={{
                    background: '#fff', borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 2px 18px rgba(0,0,0,0.08)',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.14)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 18px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Image — fixed 260px, overflow hidden */}
                  <div style={{ height: 260, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img
                      src={post.coverImage} alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                    {/* Subtle bottom fade */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)', pointerEvents: 'none' }} />
                    {/* Category pill on image */}
                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                      <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 20, background: catBg(post.category), fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px 26px 26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
                          <CalendarBlank style={{ width: 12, height: 12 }} />{post.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
                          <Clock style={{ width: 12, height: 12 }} />{post.readTime}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0B1E3D', lineHeight: 1.24, margin: '0 0 12px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>
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

        {/* ── ALL POSTS — thumbnail list ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B1E3D', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' as const }}>
            All Posts
          </h2>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 56 }}>
          {blogs.map((post, i) => (
            <motion.div key={`thumb-${post.slug}`} {...fadeUp(i * 0.09)}>
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    background: '#fff', borderRadius: 16, overflow: 'hidden',
                    display: 'flex', height: 112,
                    boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
                    border: '1px solid #EEF2F7',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(35,150,198,0.16)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.07)';
                  }}
                >
                  {/* Thumbnail — 112×112 square */}
                  <div style={{ width: 112, height: 112, flexShrink: 0, overflow: 'hidden' }}>
                    <img
                      src={post.coverImage} alt={post.title}
                      style={{ width: 112, height: 112, objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                    <div>
                      <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 10, background: catBg(post.category), fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: '0.04em', marginBottom: 7 }}>
                        {post.category}
                      </span>
                      <p style={{ fontSize: 12.5, fontWeight: 800, color: '#0B1E3D', lineHeight: 1.28, margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.title}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 600 }}>{post.date}</span>
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

        {/* ══ CTA BANNER ══ */}
        <motion.div {...fadeUp(0.1)}>
          <div style={{
            borderRadius: 22,
            background: 'linear-gradient(135deg, #0B1E3D 0%, #183765 55%, #2396C6 100%)',
            padding: '52px 60px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap' as const,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 48px rgba(11,30,61,0.30)',
          }}>
            {/* Dot grid texture */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
            {/* Glow orb */}
            <div style={{ position: 'absolute', right: -80, top: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(35,150,198,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Get Started Today</p>
              <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>
                Ready to see Logezy in action?
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', margin: 0, maxWidth: 440 }}>
                Book a free demo and discover how Logezy helps UK staffing agencies work smarter and grow faster.
              </p>
            </div>
            <a
              href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 30px', borderRadius: 50, background: '#fff', color: '#0B1E3D', fontSize: 14.5, fontWeight: 800, textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.22)' }}
            >
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
