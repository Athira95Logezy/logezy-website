import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Newspaper, Clock } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const EASE = [0.22, 1, 0.36, 1] as const;

const categoryColor: Record<string, { bg: string; text: string; dot: string }> = {
  Healthcare:    { bg: '#FEF2F2', text: '#BE123C', dot: '#F43F5E' },
  Technology:    { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  'Agency Tips': { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
};

function CategoryPill({ cat }: { cat: string }) {
  const c = categoryColor[cat] ?? { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 11px', borderRadius:20, background:c.bg, fontSize:11, fontWeight:700, color:c.text, letterSpacing:'0.03em' }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:c.dot, display:'inline-block' }} />
      {cat}
    </span>
  );
}

export default function BlogList() {
  const [featured, ...rest] = blogs;

  return (
    <div style={{ background:'#F8FAFC', minHeight:'100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background:'linear-gradient(135deg,#183765 0%,#1966AA 50%,#2396C6 100%)', padding:'80px 24px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, ease:EASE }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 14px', borderRadius:100, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.28)', marginBottom:20 }}>
              <Newspaper weight="regular" style={{ width:13, height:13, color:'#fff' }} />
              <span style={{ fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'0.10em', textTransform:'uppercase' as const }}>Logezy Blog</span>
            </div>
            <h1 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.08, margin:'0 0 16px', fontFamily:'var(--font-heading)' }}>
              Insights for UK Staffing Agencies
            </h1>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.78)', lineHeight:1.65, maxWidth:560, margin:'0 auto', fontFamily:'var(--font-body)' }}>
              Practical guides, industry trends, and product tips to help your agency work smarter.
            </p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth:1140, margin:'0 auto', padding:'60px 24px 80px' }}>

        {/* ── Featured post ── */}
        <motion.div
          initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.60, ease:EASE }}
        >
          <p style={{ fontSize:11, fontWeight:800, color:'#2396C6', letterSpacing:'0.10em', textTransform:'uppercase' as const, marginBottom:16 }}>Featured</p>
          <Link to={`/resources/blog/${featured.slug}`} style={{ textDecoration:'none', display:'block' }}>
            <div
              style={{
                background:'#fff', borderRadius:20, overflow:'hidden',
                border:'1px solid rgba(35,150,198,0.12)',
                boxShadow:'0 4px 32px rgba(24,57,99,0.08)',
                display:'grid', gridTemplateColumns:'1fr 1fr',
                transition:'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 16px 56px rgba(35,150,198,0.18)'; (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 4px 32px rgba(24,57,99,0.08)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
            >
              {/* Left: content */}
              <div style={{ padding:'44px 48px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' as const, marginBottom:20 }}>
                  <CategoryPill cat={featured.category} />
                  <span style={{ fontSize:11, color:'#94A3B8', display:'flex', alignItems:'center', gap:4 }}>
                    <Clock weight="regular" style={{ width:12, height:12 }} />{featured.readTime}
                  </span>
                  <span style={{ fontSize:11, color:'#CBD5E1' }}>·</span>
                  <span style={{ fontSize:11, color:'#94A3B8' }}>{featured.date}</span>
                </div>
                <h2 style={{ fontSize:'clamp(1.3rem,2vw,1.65rem)', fontWeight:800, color:'#0F172A', lineHeight:1.22, margin:'0 0 16px', fontFamily:'var(--font-heading)', letterSpacing:'-0.02em' }}>{featured.title}</h2>
                <p style={{ fontSize:15, color:'#64748B', lineHeight:1.7, margin:'0 0 28px', fontFamily:'var(--font-body)' }}>{featured.excerpt}</p>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:14, fontWeight:700, color:'#2396C6' }}>
                  Read article <ArrowRight weight="regular" style={{ width:14, height:14 }} />
                </span>
              </div>
              {/* Right: cover image */}
              <div style={{ position:'relative', overflow:'hidden', minHeight:320 }}>
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block', transition:'transform 0.4s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                />
                {/* overlay gradient for polish */}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(255,255,255,0.08),transparent)', pointerEvents:'none' }} />
                {/* category badge overlay */}
                <div style={{ position:'absolute', top:16, right:16 }}>
                  <CategoryPill cat={featured.category} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Rest of posts ── */}
        <div style={{ marginTop:52 }}>
          <p style={{ fontSize:11, fontWeight:800, color:'#94A3B8', letterSpacing:'0.10em', textTransform:'uppercase' as const, marginBottom:24 }}>More articles</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:24 }}>
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.50, delay:i * 0.10, ease:EASE }}
              >
                <Link to={`/resources/blog/${post.slug}`} style={{ textDecoration:'none', display:'block', height:'100%' }}>
                  <div
                    style={{
                      background:'#fff', borderRadius:18, overflow:'hidden',
                      border:'1px solid rgba(0,0,0,0.06)',
                      boxShadow:'0 2px 16px rgba(24,57,99,0.06)',
                      height:'100%', display:'flex', flexDirection:'column',
                      transition:'box-shadow 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 12px 40px rgba(35,150,198,0.16)'; (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 2px 16px rgba(24,57,99,0.06)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
                  >
                    {/* Cover image */}
                    <div style={{ height:200, overflow:'hidden', position:'relative', flexShrink:0 }}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block', transition:'transform 0.4s ease' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)'; }}
                      />
                      {/* Gradient overlay */}
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.35) 0%,transparent 60%)', pointerEvents:'none' }} />
                      {/* Category badge */}
                      <div style={{ position:'absolute', top:12, left:14 }}>
                        <CategoryPill cat={post.category} />
                      </div>
                    </div>
                    {/* Card body */}
                    <div style={{ padding:'22px 24px 26px', flex:1, display:'flex', flexDirection:'column' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                        <span style={{ fontSize:11, color:'#94A3B8', display:'flex', alignItems:'center', gap:4 }}>
                          <Clock weight="regular" style={{ width:11, height:11 }} />{post.readTime}
                        </span>
                        <span style={{ fontSize:11, color:'#E2E8F0' }}>·</span>
                        <span style={{ fontSize:11, color:'#94A3B8' }}>{post.date}</span>
                      </div>
                      <h3 style={{ fontSize:17, fontWeight:800, color:'#0F172A', lineHeight:1.3, margin:'0 0 10px', fontFamily:'var(--font-heading)', letterSpacing:'-0.01em' }}>{post.title}</h3>
                      <p style={{ fontSize:13.5, color:'#64748B', lineHeight:1.65, margin:'0 0 20px', flex:1, fontFamily:'var(--font-body)' }}>{post.excerpt}</p>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:13, fontWeight:700, color:'#2396C6' }}>
                        Read article <ArrowRight weight="regular" style={{ width:13, height:13 }} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.55, ease:EASE }}
          style={{ marginTop:72, background:'linear-gradient(135deg,#183765 0%,#1966AA 50%,#2396C6 100%)', borderRadius:20, padding:'48px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}
        >
          <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'22px 22px', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <h2 style={{ fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', margin:'0 0 12px', fontFamily:'var(--font-heading)' }}>Ready to see Logezy in action?</h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:28, fontFamily:'var(--font-body)' }}>Book a free demo and see how Logezy helps your agency work smarter.</p>
            <a
              href="https://calendly.com/logezy/demo"
              target="_blank" rel="noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:12, background:'#fff', color:'#183963', fontSize:15, fontWeight:800, textDecoration:'none', boxShadow:'0 4px 14px rgba(0,0,0,0.12)' }}
            >
              Book a Free Demo <ArrowRight weight="regular" style={{ width:16, height:16 }} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
