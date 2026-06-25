import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, CalendarBlank, Tag } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';
import SEO from '../components/SEO';

const EASE = [0.22, 1, 0.36, 1] as const;

const categoryColor: Record<string, { bg: string; text: string }> = {
  Healthcare:    { bg: '#FEF2F2', text: '#BE123C' },
  Technology:    { bg: '#EFF6FF', text: '#1D4ED8' },
  'Agency Tips': { bg: '#F0FDF4', text: '#15803D' },
};

const allCategories = ['Healthcare', 'Technology', 'Agency Tips', 'Compliance', 'Timesheets', 'Workforce', 'Scheduling', 'Recruitment'];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogs.find(b => b.slug === slug);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#183963' }}>Post not found</h1>
        <Link to="/resources/blog" style={{ color: '#2396C6', fontWeight: 700, textDecoration: 'none' }}>Back to Blog</Link>
      </div>
    );
  }

  const catStyle = categoryColor[post.category] ?? { bg: '#F1F5F9', text: '#475569' };
  const relatedPosts = blogs.filter(b => b.slug !== slug);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <SEO
        title={`${post.title} | Logezy Blog`}
        description={post.excerpt ?? post.title}
        keywords={`${post.category}, staffing blog, workforce management, Logezy`}
        canonical={`/resources/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.coverImage,
          "author": { "@type": "Organization", "name": "Logezy" },
          "publisher": { "@type": "Organization", "name": "Logezy", "url": "https://logezy.co.uk" },
          "url": `https://logezy.co.uk/resources/blog/${post.slug}`
        }}
      />

      {/* ── Cover image hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 320 : 420 }}>
        <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(24,57,99,0.88) 0%,rgba(25,102,170,0.80) 55%,rgba(35,150,198,0.70) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 44 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <Link to="/resources/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.68)', textDecoration: 'none', marginBottom: 18 }}>
              <ArrowLeft weight="regular" style={{ width: 14, height: 14 }} /> Back to Blog
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                <Tag weight="fill" style={{ width: 10, height: 10 }} /> {post.category}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock weight="regular" style={{ width: 12, height: 12 }} />{post.readTime}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CalendarBlank weight="regular" style={{ width: 12, height: 12 }} />{post.date}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.12, margin: 0, fontFamily: 'var(--font-heading)', maxWidth: 820 }}>{post.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '48px 24px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: isMobile ? 24 : 32, alignItems: 'start' }}>

        {/* ── Main article ── */}
        <motion.article
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          style={{ background: '#fff', borderRadius: 20, padding: isMobile ? '24px 20px' : '44px 52px', boxShadow: '0 2px 24px rgba(24,57,99,0.07)', border: '1px solid rgba(35,150,198,0.08)' }}
        >
          {/* Excerpt lead */}
          <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.75, margin: '0 0 32px', fontFamily: 'var(--font-body)', fontWeight: 500, borderLeft: '4px solid #2396C6', paddingLeft: 18 }}>
            {post.excerpt}
          </p>

          {post.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              {section.heading && (
                <h2 style={{
                  fontSize: 'clamp(1.1rem,1.8vw,1.3rem)', fontWeight: 800, color: '#183963',
                  margin: i === 0 ? '0 0 12px' : '36px 0 12px',
                  fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em', lineHeight: 1.3,
                  paddingLeft: 14, borderLeft: '3px solid #2396C6',
                }}>
                  {section.heading}
                </h2>
              )}
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontSize: 15.5, color: '#334155', lineHeight: 1.82, margin: '0 0 18px', fontFamily: 'var(--font-body)' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* CTA block */}
          {post.cta && (
            <div style={{ marginTop: 44, background: 'linear-gradient(135deg,#EFF6FF 0%,#E8F5FB 100%)', borderRadius: 16, padding: '28px 32px', border: '1px solid rgba(35,150,198,0.15)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#183963', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>{post.cta.heading}</h3>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.70, margin: '0 0 20px', fontFamily: 'var(--font-body)' }}>{post.cta.body}</p>
              <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, background: 'linear-gradient(135deg,#183963,#2396C6)', color: '#fff', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 14px rgba(35,150,198,0.30)' }}>
                Book a Free Demo <ArrowRight weight="regular" style={{ width: 14, height: 14 }} />
              </a>
            </div>
          )}
        </motion.article>

        {/* ── Right sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20, position: isMobile ? 'static' : 'sticky', top: 24 }}
        >

          {/* Categories */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(24,57,99,0.06)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 16px', fontFamily: 'var(--font-heading)' }}>Categories</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {allCategories.map((cat, i) => (
                <span key={cat} style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'default',
                  background: cat === post.category ? '#183963' : i % 2 === 0 ? '#EFF6FF' : '#F0FDF4',
                  color: cat === post.category ? '#fff' : i % 2 === 0 ? '#1D4ED8' : '#15803D',
                  border: cat === post.category ? 'none' : '1.5px solid transparent',
                }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Other posts */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(24,57,99,0.06)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 18px', fontFamily: 'var(--font-heading)' }}>More Articles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {relatedPosts.map((rel) => (
                <Link key={rel.slug} to={`/resources/blog/${rel.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: '10px', borderRadius: 12,
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    {/* Thumbnail */}
                    <div style={{ width: 72, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={rel.coverImage} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 10, marginBottom: 6,
                        fontSize: 10, fontWeight: 700,
                        background: categoryColor[rel.category]?.bg ?? '#F1F5F9',
                        color: categoryColor[rel.category]?.text ?? '#475569',
                      }}>
                        {rel.category}
                      </span>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', lineHeight: 1.35, margin: 0, fontFamily: 'var(--font-heading)' }}>
                        {rel.title.slice(0, 70)}{rel.title.length > 70 ? '...' : ''}
                      </p>
                      <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, display: 'block' }}>{rel.readTime} · {rel.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mini CTA */}
          <div style={{ background: 'linear-gradient(135deg,#183765 0%,#2396C6 100%)', borderRadius: 18, padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 8px', fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>See Logezy in action</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', margin: '0 0 16px', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>Free demo, no credit card needed.</p>
              <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, background: '#fff', color: '#183963', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
                Book Demo <ArrowRight weight="regular" style={{ width: 13, height: 13 }} />
              </a>
            </div>
          </div>

        </motion.aside>
      </div>
    </div>
  );
}
