import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const EASE = [0.22, 1, 0.36, 1] as const;

const categoryColor: Record<string, { bg: string; text: string }> = {
  Healthcare:    { bg: '#FEF2F2', text: '#BE123C' },
  Technology:    { bg: '#EFF6FF', text: '#1D4ED8' },
  'Agency Tips': { bg: '#F0FDF4', text: '#15803D' },
};

const allCategories = ['Healthcare', 'Technology', 'Agency Tips', 'Compliance', 'Timesheets', 'Workforce', 'Scheduling', 'Recruitment'];

export default function BlogList() {
  const [post1, post2, post3] = blogs;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: 80 }}>

      {/* ── Page header ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '52px 24px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'var(--font-heading)', margin: 0 }}
        >
          BLOG
        </motion.h1>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <Link to="/resources/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: '#fff', border: '1.5px solid #E2E8F0', fontSize: 13, fontWeight: 700, color: '#0F172A', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            Read Our Blog <ArrowRight weight="regular" style={{ width: 14, height: 14 }} />
          </Link>
        </motion.div>
      </div>

      {/* ── Bento grid ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2.2fr 1.6fr', gridTemplateRows: 'auto auto', gap: 14 }}>

          {/* ── CELL 1: Large left hero card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
            style={{ gridRow: '1 / 3' }}
          >
            <Link to={`/resources/blog/${post1.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{
                borderRadius: 20, overflow: 'hidden', position: 'relative', height: '100%', minHeight: 540,
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.012)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)'; }}
              >
                <img src={post1.coverImage} alt={post1.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', position: 'absolute', inset: 0 }} />
                {/* gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 50%, transparent 80%)' }} />
                {/* top meta */}
                <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Category . {post1.category}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)' }}>|</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.60)' }}>{post1.date}</span>
                </div>
                {/* bottom content */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 28px' }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem,2.2vw,2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: 0, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                    {post1.title}
                  </h2>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── CELL 2: Centre featured article ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          >
            <Link to={`/resources/blog/${post2.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{
                background: '#E8F5D0', borderRadius: 20, padding: '28px 30px 32px', height: '100%', position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                {/* top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#4B5563' }}>Category . {post2.category}</span>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight weight="bold" style={{ width: 14, height: 14, color: '#fff' }} />
                  </div>
                </div>
                <h2 style={{ fontSize: 'clamp(1.5rem,2.2vw,2.1rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.1, margin: '0 0 16px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                  {post2.title}
                </h2>
                <p style={{ fontSize: 13.5, color: '#4B5563', lineHeight: 1.70, margin: '0 0 24px', fontFamily: 'var(--font-body)' }}>
                  {post2.excerpt.slice(0, 160)}... <span style={{ fontWeight: 700, color: '#0F172A' }}>More</span>
                </p>
                {/* related links */}
                {blogs.filter(b => b.slug !== post2.slug).slice(0, 2).map((rel) => (
                  <div key={rel.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1.5px solid rgba(0,0,0,0.10)' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.3 }}>{rel.title.slice(0, 52)}{rel.title.length > 52 ? '...' : ''}</span>
                    <ArrowRight weight="bold" style={{ width: 14, height: 14, color: '#0F172A', flexShrink: 0, marginLeft: 8 }} />
                  </div>
                ))}
              </div>
            </Link>
          </motion.div>

          {/* ── CELL 3: Top-right small card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
          >
            <Link to={`/resources/blog/${post3.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{
                background: '#C5BFED', borderRadius: 20, overflow: 'hidden', height: '100%', minHeight: 260, position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.14)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                <img src={post3.coverImage} alt={post3.title} style={{ width: '100%', height: '60%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                <div style={{ padding: '14px 18px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4B5563' }}>Hot . {post3.date}</span>
                  <h3 style={{ fontSize: 'clamp(0.95rem,1.4vw,1.15rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1.2, margin: '6px 0 0', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                    {post3.title.slice(0, 60)}{post3.title.length > 60 ? '...' : ''}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── CELL 4: Bottom-right categories ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.20, ease: EASE }}
          >
            <div style={{ background: '#EDE9FE', borderRadius: 20, padding: '22px 22px 20px', height: '100%' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {allCategories.map((cat, i) => (
                  <span key={cat} style={{
                    padding: '6px 13px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'default',
                    background: i % 3 === 0 ? '#183963' : i % 3 === 1 ? '#2396C6' : '#fff',
                    color: i % 3 === 2 ? '#0F172A' : '#fff',
                    border: i % 3 === 2 ? '1.5px solid #E2E8F0' : 'none',
                  }}>
                    {cat}
                  </span>
                ))}
              </div>
              <Link to="/resources/blog" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textDecoration: 'none' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>View All Categories</span>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight weight="bold" style={{ width: 14, height: 14, color: '#fff' }} />
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
        style={{ maxWidth: 1240, margin: '40px auto 0', padding: '0 24px' }}
      >
        <div style={{ background: 'linear-gradient(135deg,#183765 0%,#1966AA 50%,#2396C6 100%)', borderRadius: 20, padding: '44px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>Ready to see Logezy in action?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 24, fontFamily: 'var(--font-body)' }}>Book a free demo and see how Logezy helps your agency work smarter.</p>
            <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 12, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
              Book a Free Demo <ArrowRight weight="regular" style={{ width: 15, height: 15 }} />
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
