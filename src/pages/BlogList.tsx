import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Newspaper } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const EASE = [0.22, 1, 0.36, 1] as const;

const CAT_STYLES: Record<string, { bg: string; text: string }> = {
  Healthcare:    { bg: '#FEE2E2', text: '#991B1B' },
  Technology:    { bg: '#DBEAFE', text: '#1E40AF' },
  'Agency Tips': { bg: '#D1FAE5', text: '#065F46' },
};

function CatBadge({ cat }: { cat: string }) {
  const s = CAT_STYLES[cat] ?? { bg: '#F1F5F9', text: '#475569' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 30, background: s.bg, fontSize: 11, fontWeight: 800, color: s.text, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.text, opacity: 0.7, display: 'inline-block', flexShrink: 0 }} />
      {cat}
    </span>
  );
}

export default function BlogList() {
  const [featured, ...rest] = blogs;

  return (
    <div style={{ background: '#0F172A', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════
          FULL-WIDTH HERO — Featured Post
      ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(520px,72vh,780px)', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src={featured.coverImage}
          alt={featured.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Multi-layer overlay for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.70) 55%, rgba(10,15,30,0.20) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 50%)' }} />

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Newspaper weight="regular" style={{ width: 17, height: 17, color: '#fff' }} />
            </div>
            <span style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', fontFamily: 'var(--font-heading)' }}>BLOG</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)', fontFamily: 'var(--font-body)' }}
          >
            Insights for UK Staffing Agencies
          </motion.p>
        </div>

        {/* Featured content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 48px 52px', zIndex: 2, maxWidth: 760 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <CatBadge cat={featured.category} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Clock weight="regular" style={{ width: 12, height: 12 }} />{featured.readTime}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>{featured.date}</span>
            </div>
            <Link to={`/resources/blog/${featured.slug}`} style={{ textDecoration: 'none' }}>
              <h1 style={{
                fontSize: 'clamp(1.8rem,3.6vw,3rem)', fontWeight: 900, color: '#fff',
                letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 18px',
                fontFamily: 'var(--font-heading)',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.82'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                {featured.title}
              </h1>
            </Link>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.70, margin: '0 0 28px', fontFamily: 'var(--font-body)', maxWidth: 620 }}>
              {featured.excerpt.slice(0, 180)}...
            </p>
            <Link to={`/resources/blog/${featured.slug}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 50, background: '#fff', color: '#0F172A', fontSize: 13, fontWeight: 800, textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8F5FB'; (e.currentTarget as HTMLElement).style.transform = 'translateX(3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}
            >
              Read Article <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)' }} />
      </div>

      {/* ══════════════════════════════════════════
          REST OF POSTS — Full width magazine grid
      ══════════════════════════════════════════ */}
      <div style={{ background: '#F8FAFC' }}>

        {/* Section label */}
        <div style={{ padding: '48px 48px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <div style={{ width: 4, height: 28, borderRadius: 4, background: 'linear-gradient(to bottom,#183963,#2396C6)' }} />
            <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>More Articles</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}
          >
            {rest.length} articles
          </motion.span>
        </div>

        {/* Cards grid — full bleed */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 0, padding: '0 48px 60px' }}>
          {rest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
              style={{ padding: '12px' }}
            >
              <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div
                  style={{
                    borderRadius: 22, overflow: 'hidden', background: '#fff',
                    boxShadow: '0 2px 16px rgba(15,23,42,0.07)',
                    border: '1px solid rgba(15,23,42,0.06)',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(35,150,198,0.20)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(15,23,42,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 240, overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    {/* Bottom fade */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.50) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    {/* Category badge */}
                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                      <CatBadge cat={post.category} />
                    </div>
                    {/* Arrow button */}
                    <div style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight weight="bold" style={{ width: 14, height: 14, color: '#fff' }} />
                    </div>
                    {/* Read time overlay */}
                    <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.80)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                        <Clock weight="regular" style={{ width: 11, height: 11 }} />{post.readTime}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)' }}>·</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.60)', fontWeight: 600 }}>{post.date}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '24px 26px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', lineHeight: 1.28, margin: '0 0 12px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.72, margin: '0 0 22px', flex: 1, fontFamily: 'var(--font-body)' }}>
                      {post.excerpt.slice(0, 140)}...
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#2396C6', display: 'flex', alignItems: 'center', gap: 5 }}>
                        Read article <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
                      </span>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#183963,#2396C6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(35,150,198,0.30)' }}>
                        <ArrowUpRight weight="bold" style={{ width: 14, height: 14, color: '#fff' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Categories strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
          style={{ margin: '0 48px 64px', background: '#0F172A', borderRadius: 24, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' as const }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.10em', textTransform: 'uppercase' as const, margin: '0 0 6px' }}>Browse by topic</p>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>All Categories</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
            {['Healthcare', 'Technology', 'Agency Tips', 'Compliance', 'Timesheets', 'Scheduling', 'Workforce', 'Recruitment'].map((cat, i) => (
              <span key={cat} style={{
                padding: '7px 16px', borderRadius: 30, fontSize: 12, fontWeight: 700,
                background: i === 0 ? '#2396C6' : i === 1 ? '#183963' : 'rgba(255,255,255,0.08)',
                color: i < 2 ? '#fff' : 'rgba(255,255,255,0.70)',
                border: i < 2 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                cursor: 'default',
              }}>
                {cat}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
          style={{ margin: '0 48px 72px', borderRadius: 24, overflow: 'hidden', position: 'relative' }}
        >
          <div style={{ background: 'linear-gradient(135deg,#183765 0%,#1966AA 45%,#2396C6 100%)', padding: '52px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' as const, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>Ready to see Logezy in action?</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', margin: 0, fontFamily: 'var(--font-body)' }}>Book a free demo — no credit card needed.</p>
            </div>
            <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 28px', borderRadius: 50, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.18)', transition: 'transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
