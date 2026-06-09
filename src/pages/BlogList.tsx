import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Shared image dimensions ── */
const IMG = {
  heroH:    540,   // left hero card height
  rightTopH: 180,  // image strip on right-top card
  rightBotH: 248,  // right-bottom image card height
  thumbW:   120,   // thumbnail width in bottom row
  thumbH:   120,   // thumbnail height in bottom row
};

function CatPill({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 11px', borderRadius: 30,
      background: dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.92)',
      border: dark ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(0,0,0,0.10)',
      fontSize: 11.5, fontWeight: 700,
      color: dark ? '#374151' : '#1E293B',
      backdropFilter: 'blur(4px)', letterSpacing: '0.01em',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: dark ? '#374151' : '#2396C6', display: 'inline-block' }} />
      {label}
    </span>
  );
}

function DatePill({ date }: { date: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 11px', borderRadius: 30,
      background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.10)',
      fontSize: 11, fontWeight: 600, color: '#374151', backdropFilter: 'blur(4px)',
    }}>
      {date}
    </span>
  );
}

export default function BlogList() {
  const [post1, post2, post3] = blogs;

  return (
    <div style={{ background: '#F2F2F0', minHeight: '100vh', padding: '48px 32px 80px' }}>

      {/* ── Page title row ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.h1
          initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.045em', lineHeight: 1, fontFamily: 'var(--font-heading)', margin: 0 }}
        >
          BLOG
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15, ease: EASE }}>
          <Link to="/resources/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 30, background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 12.5, fontWeight: 700, color: '#0F172A', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            Read Our Blog <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
          </Link>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          MAIN EDITORIAL GRID
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 14 }}>

        {/* ── LEFT: Large hero image card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.60, ease: EASE }}
        >
          <Link to={`/resources/blog/${post1.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              borderRadius: 20, overflow: 'hidden', position: 'relative',
              height: IMG.heroH,
              boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
              transition: 'box-shadow 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.008)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.20)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(0,0,0,0.12)'; }}
            >
              <img src={post1.coverImage} alt={post1.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.22) 100%)', pointerEvents: 'none' }} />

              {/* Top-left date */}
              <div style={{ position: 'absolute', top: 18, left: 18 }}><DatePill date={post1.date} /></div>
              {/* Top-right arrow */}
              <div style={{ position: 'absolute', top: 18, right: 18, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowUpRight weight="bold" style={{ width: 16, height: 16, color: '#0F172A' }} />
              </div>
              {/* Mid-left category */}
              <div style={{ position: 'absolute', top: '46%', left: 18, transform: 'translateY(-50%)' }}>
                <CatPill label={post1.category} />
              </div>
              {/* Bottom floating white title box */}
              <div style={{ position: 'absolute', bottom: 20, left: 18, background: '#fff', borderRadius: 14, padding: '14px 18px', maxWidth: '62%', boxShadow: '0 4px 20px rgba(0,0,0,0.13)' }}>
                <p style={{ fontSize: 'clamp(1.05rem,1.8vw,1.45rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.22, margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>
                  {post1.title}
                </p>
              </div>
              {/* Bottom-right read time */}
              <div style={{ position: 'absolute', bottom: 26, right: 18 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', fontWeight: 600, background: 'rgba(0,0,0,0.32)', padding: '3px 10px', borderRadius: 20 }}>{post1.readTime}</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── RIGHT column: 2 stacked cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: IMG.heroH }}>

          {/* Card 2 — image strip + content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            style={{ flex: 1, minHeight: 0 }}
          >
            <Link to={`/resources/blog/${post2.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{
                background: '#fff', borderRadius: 20, overflow: 'hidden',
                height: '100%', display: 'flex', flexDirection: 'column',
                boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.14)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(0,0,0,0.08)'; }}
              >
                {/* Image strip — fixed height */}
                <div style={{ height: IMG.rightTopH, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                  <img src={post2.coverImage} alt={post2.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 60%)', pointerEvents: 'none' }} />
                  {/* Date on image */}
                  <div style={{ position: 'absolute', top: 12, left: 12 }}><DatePill date={post2.date} /></div>
                  {/* Arrow */}
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight weight="bold" style={{ width: 13, height: 13, color: '#0F172A' }} />
                  </div>
                </div>
                {/* Content */}
                <div style={{ flex: 1, padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#C8D8D4' }}>
                  <div>
                    <CatPill label={post2.category} dark />
                    <h2 style={{ fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.25, margin: '10px 0 6px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.018em' }}>
                      {post2.title}
                    </h2>
                    <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.60, margin: 0, fontFamily: 'var(--font-body)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                      {post2.excerpt}
                    </p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
                    Learn more <ArrowRight weight="bold" style={{ width: 11, height: 11 }} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 3 — full image with overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
            style={{ flexShrink: 0 }}
          >
            <Link to={`/resources/blog/${post3.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                borderRadius: 20, overflow: 'hidden', position: 'relative',
                height: IMG.rightBotH,
                boxShadow: '0 2px 14px rgba(0,0,0,0.10)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(0,0,0,0.10)'; }}
              >
                <img src={post3.coverImage} alt={post3.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.58) 0%,rgba(0,0,0,0.08) 60%)', pointerEvents: 'none' }} />

                {/* Top-left date */}
                <div style={{ position: 'absolute', top: 14, left: 14 }}><DatePill date={post3.date} /></div>
                {/* Top-right badge */}
                <div style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.90)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#0F172A' }}>3</div>
                {/* Bottom title */}
                <div style={{ position: 'absolute', bottom: 46, left: 14, right: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.3, fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                    {post3.title.slice(0, 60)}{post3.title.length > 60 ? '…' : ''}
                  </p>
                </div>
                {/* Bottom CTA */}
                <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: '#fff', borderRadius: 30, padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.20)', fontSize: 12.5, fontWeight: 800, color: '#0F172A' }}>
                    See all posts <ArrowRight weight="bold" style={{ width: 12, height: 12 }} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          THUMBNAIL ROW — all 3 posts
          Same image size: 120×120px
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: '14px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {blogs.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.48, delay: i * 0.09, ease: EASE }}
            >
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: '#fff', borderRadius: 18, overflow: 'hidden',
                  display: 'flex', height: IMG.thumbH,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'transform 0.22s, box-shadow 0.22s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(35,150,198,0.16)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}
                >
                  {/* Thumbnail — fixed W×H */}
                  <div style={{ width: IMG.thumbW, height: IMG.thumbH, flexShrink: 0, overflow: 'hidden' }}>
                    <img src={post.coverImage} alt={post.title}
                      style={{ width: IMG.thumbW, height: IMG.thumbH, objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, borderLeft: '1px solid #F1F5F9' }}>
                    <div>
                      <p style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 700, margin: '0 0 6px', letterSpacing: '0.03em', textTransform: 'uppercase' as const }}>{post.category}</p>
                      <p style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', lineHeight: 1.30, margin: '0 0 4px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.title}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 600 }}>{post.date}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: '#2396C6', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        Read <ArrowRight weight="bold" style={{ width: 11, height: 11 }} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
        style={{ maxWidth: 1280, margin: '36px auto 0' }}
      >
        <div style={{ background: 'linear-gradient(135deg,#183765 0%,#1966AA 50%,#2396C6 100%)', borderRadius: 20, padding: '44px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' as const, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>Ready to see Logezy in action?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', margin: 0, fontFamily: 'var(--font-body)' }}>Book a free demo and see how Logezy helps your agency work smarter.</p>
          </div>
          <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 50, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}>
            Book a Free Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
          </a>
        </div>
      </motion.div>

    </div>
  );
}
