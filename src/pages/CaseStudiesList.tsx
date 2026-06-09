import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChartBar, BookOpen, ArrowUpRight } from '@phosphor-icons/react';
import { caseStudies } from '../data/caseStudies';

const EASE = [0.22, 1, 0.36, 1] as const;

const CAT_STYLE: Record<string, { bg: string; text: string }> = {
  'Agency Guide': { bg: '#EDE9FE', text: '#5B21B6' },
  'Case Study':   { bg: '#D1FAE5', text: '#065F46' },
  'Healthcare':   { bg: '#FEE2E2', text: '#991B1B' },
};

export default function CaseStudiesList() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg,#183765 0%,#1966AA 45%,#2396C6 100%)', padding: '80px 48px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        {/* Glow orb */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(35,150,198,0.28) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.28)', marginBottom: 22 }}>
              <ChartBar weight="regular" style={{ width: 13, height: 13, color: '#fff' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Resources</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0 0 18px', fontFamily: 'var(--font-heading)' }}>
              Guides &amp; Case Studies
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, maxWidth: 580, margin: 0, fontFamily: 'var(--font-body)' }}>
              In-depth guides, agency playbooks and real-world case studies to help you get the most out of Logezy and run a smarter staffing operation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { n: '60%',  label: 'Admin time saved on average' },
            { n: '24/7', label: 'Real-time workforce visibility' },
            { n: '100%', label: 'Compliance tracking built-in' },
            { n: '3×',   label: 'Faster shift filling reported' },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
              style={{ padding: '28px 20px', borderRight: i < 3 ? '1px solid #F1F5F9' : 'none', textAlign: 'center' }}
            >
              <div style={{ fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 900, color: '#183963', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6, fontWeight: 600, fontFamily: 'var(--font-body)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Case study cards ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 48px 80px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <div style={{ width: 4, height: 28, borderRadius: 4, background: 'linear-gradient(to bottom,#183963,#2396C6)' }} />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>Available Resources</h2>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>{caseStudies.length} resource{caseStudies.length !== 1 ? 's' : ''}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: 24 }}>
          {caseStudies.map((cs, i) => {
            const cat = CAT_STYLE[cs.category] ?? { bg: '#F1F5F9', text: '#475569' };
            return (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.10, ease: EASE }}
              >
                <Link to={`/resources/case-studies/${cs.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{
                    background: '#fff', borderRadius: 22, overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 2px 16px rgba(24,57,99,0.07)',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(35,150,198,0.18)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(24,57,99,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    {/* Cover image */}
                    <div style={{ height: 220, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <img src={cs.coverImage} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,23,42,0.55) 0%,transparent 55%)', pointerEvents: 'none' }} />
                      {/* Category */}
                      <div style={{ position: 'absolute', top: 14, left: 14 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 20, background: cat.bg, fontSize: 11, fontWeight: 800, color: cat.text }}>
                          <BookOpen weight="fill" style={{ width: 10, height: 10 }} />{cs.category}
                        </span>
                      </div>
                      {/* PDF badge */}
                      <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.90)' }}>PDF</span>
                      </div>
                      {/* Stats strip */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px', display: 'flex', gap: 14 }}>
                        {cs.stats.slice(0, 3).map(s => (
                          <div key={s.label} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 13, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', marginTop: 2, lineHeight: 1.2 }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '22px 24px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', lineHeight: 1.28, margin: '0 0 10px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}>{cs.title}</h3>
                      <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.70, margin: '0 0 20px', flex: 1, fontFamily: 'var(--font-body)' }}>{cs.excerpt.slice(0, 130)}...</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #F1F5F9' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#2396C6', display: 'flex', alignItems: 'center', gap: 5 }}>
                          Download Guide <ArrowRight weight="bold" style={{ width: 13, height: 13 }} />
                        </span>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#183963,#2396C6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(35,150,198,0.30)' }}>
                          <ArrowUpRight weight="bold" style={{ width: 14, height: 14, color: '#fff' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          >
            <div style={{ background: '#fff', borderRadius: 22, border: '2px dashed #E2E8F0', height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen weight="regular" style={{ width: 22, height: 22, color: '#94A3B8' }} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', margin: 0, textAlign: 'center' }}>More guides coming soon</p>
              <p style={{ fontSize: 12, color: '#CBD5E1', margin: 0, textAlign: 'center' }}>Healthcare, Education &amp; Hospitality</p>
            </div>
          </motion.div>
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
          style={{ marginTop: 64, background: 'linear-gradient(135deg,#183765 0%,#1966AA 50%,#2396C6 100%)', borderRadius: 24, padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' as const, position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>Ready to see Logezy in action?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', margin: 0, fontFamily: 'var(--font-body)' }}>Book a free demo and see why agencies across the UK choose Logezy.</p>
          </div>
          <a href="https://calendly.com/logezy/demo" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 28px', borderRadius: 50, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}>
            Book a Free Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
