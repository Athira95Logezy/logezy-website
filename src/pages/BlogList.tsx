import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, CalendarBlank, FunnelSimple, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const ease = [0.22, 1, 0.36, 1] as const;

/* ── category colour map ── */
const CAT_COLOR: Record<string, { bg: string; text: string; dot: string }> = {
  Healthcare:    { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
  Technology:    { bg: '#EEF2FF', text: '#3730A3', dot: '#6366F1' },
  'Agency Tips': { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
};
function catStyle(cat: string) {
  return CAT_COLOR[cat] ?? { bg: '#E0F2FE', text: '#0369A1', dot: '#2396C6' };
}

const POSTS_PER_PAGE = 6; // show 6 per page (3×2 grid)

export default function BlogList() {
  const allCategories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  /* filter + paginate */
  const filtered = useMemo(() =>
    activeCategory === 'All' ? blogs : blogs.filter(b => b.category === activeCategory),
    [activeCategory]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function selectCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <div style={{ background: '#F4F6F9', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>

      {/* ════════════════════════════════
          HEADER
      ════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(140deg,#0B1E3D 0%,#173462 60%,#1A5EA0 100%)',
        padding: '72px 48px 60px',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>
              Logezy · Resources
            </p>
            <h1 style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.055em', lineHeight: 0.9, margin: '0 0 20px', fontFamily: 'var(--font-heading)' }}>
              Blog
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
              Staffing insights, compliance guides and product updates for UK recruitment agencies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════
          CONTENT
      ════════════════════════════════ */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '44px 48px 80px' }}>

        {/* ── Active filter label (if filtered) ── */}
        {activeCategory !== 'All' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>
              Showing <strong style={{ color: '#0B1E3D' }}>{filtered.length}</strong> post{filtered.length !== 1 ? 's' : ''} in
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 20,
              background: catStyle(activeCategory).bg,
              color: catStyle(activeCategory).text,
              fontSize: 12, fontWeight: 700,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: catStyle(activeCategory).dot }} />
              {activeCategory}
            </span>
            <button
              onClick={() => selectCategory('All')}
              style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Clear
            </button>
          </motion.div>
        )}

        {/* ── 3-COLUMN CARD GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}
          >
            {paginated.map((post, i) => {
              const cs = catStyle(post.category);
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease }}
                >
                  <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div
                      style={{
                        background: '#fff', borderRadius: 18, overflow: 'hidden',
                        display: 'flex', flexDirection: 'column', height: '100%',
                        boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
                        border: '1px solid #EAEdf1',
                        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 20px 52px rgba(0,0,0,0.13)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 14px rgba(0,0,0,0.07)'; }}
                    >
                      {/* ── Thumbnail image — fixed 220px ── */}
                      <div style={{ height: 220, overflow: 'hidden', flexShrink: 0, background: '#F0F2F5', position: 'relative' }}>
                        <img
                          src={post.coverImage} alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                        />
                        {/* Category pill floating on image bottom-left */}
                        <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '4px 11px', borderRadius: 20,
                            background: cs.bg, color: cs.text,
                            fontSize: 10.5, fontWeight: 700, letterSpacing: '0.02em',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cs.dot, flexShrink: 0 }} />
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* ── Card content ── */}
                      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          {/* Meta row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: '#94A3B8', fontWeight: 600 }}>
                              <CalendarBlank style={{ width: 12, height: 12 }} />{post.date}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: '#94A3B8', fontWeight: 600 }}>
                              <Clock style={{ width: 12, height: 12 }} />{post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontSize: '1.05rem', fontWeight: 900, color: '#0B1E3D',
                            lineHeight: 1.28, margin: '0 0 10px',
                            fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em',
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                          }}>
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p style={{
                            fontSize: 13, color: '#4B5563', lineHeight: 1.65, margin: 0,
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                          }}>
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Read link */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: 13, fontWeight: 800, color: '#2396C6' }}>
                          Read Article <ArrowRight weight="bold" style={{ width: 12, height: 12 }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Empty state */}
            {paginated.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center' as const, padding: '80px 0', color: '#94A3B8' }}>
                <p style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>No posts found</p>
                <p style={{ fontSize: 14, margin: 0 }}>Try a different category filter.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ════════════════════════════════
            BOTTOM BAR: pagination left | filters right
        ════════════════════════════════ */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap' as const, gap: 16,
          paddingTop: 28, borderTop: '1px solid #E2E8F0',
        }}>

          {/* LEFT — Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Prev */}
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                width: 38, height: 38, borderRadius: 10, border: '1.5px solid #E2E8F0',
                background: page === 1 ? '#F8FAFC' : '#fff',
                color: page === 1 ? '#CBD5E1' : '#0B1E3D',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s ease', fontSize: 0,
              }}
            >
              <CaretLeft weight="bold" style={{ width: 14, height: 14 }} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: n === page ? '1.5px solid #2396C6' : '1.5px solid #E2E8F0',
                  background: n === page ? '#2396C6' : '#fff',
                  color: n === page ? '#fff' : '#374151',
                  fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.18s ease',
                }}
              >
                {n}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                width: 38, height: 38, borderRadius: 10, border: '1.5px solid #E2E8F0',
                background: page === totalPages ? '#F8FAFC' : '#fff',
                color: page === totalPages ? '#CBD5E1' : '#0B1E3D',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s ease', fontSize: 0,
              }}
            >
              <CaretRight weight="bold" style={{ width: 14, height: 14 }} />
            </button>

            {/* Count label */}
            <span style={{ marginLeft: 10, fontSize: 12.5, color: '#94A3B8', fontWeight: 600 }}>
              {filtered.length} post{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* RIGHT — Category filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FunnelSimple style={{ width: 15, height: 15, color: '#94A3B8', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, marginRight: 4 }}>Filter:</span>
            {allCategories.map(cat => {
              const isActive = cat === activeCategory;
              const cs = cat === 'All' ? null : catStyle(cat);
              return (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '7px 15px', borderRadius: 20, border: 'none',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isActive
                      ? (cs ? cs.bg : '#0B1E3D')
                      : '#fff',
                    color: isActive
                      ? (cs ? cs.text : '#fff')
                      : '#6B7280',
                    boxShadow: isActive
                      ? '0 2px 10px rgba(0,0,0,0.10)'
                      : '0 1px 4px rgba(0,0,0,0.06)',
                    outline: isActive && cs ? `1.5px solid ${cs.dot}` : '1.5px solid #E2E8F0',
                  }}
                >
                  {cs && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive ? cs.dot : '#CBD5E1', flexShrink: 0 }} />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── CTA BANNER ── */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 48px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
        >
          <div style={{
            borderRadius: 22,
            background: 'linear-gradient(135deg,#0B1E3D 0%,#173462 50%,#2396C6 100%)',
            padding: '52px 60px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap' as const,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 48px rgba(11,30,61,0.28)',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(35,150,198,0.40) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase' as const, margin: '0 0 10px' }}>Get Started</p>
              <h2 style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>
                Ready to see Logezy in action?
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', margin: 0, maxWidth: 440 }}>
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
