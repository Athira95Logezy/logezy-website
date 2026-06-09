import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Tag, CalendarBlank } from '@phosphor-icons/react';
import { blogs } from '../data/blogs';

const EASE = [0.22, 1, 0.36, 1] as const;

const categoryColor: Record<string, { bg: string; text: string; border: string }> = {
  Healthcare:    { bg: '#FEF2F2', text: '#BE123C', border: '#FECDD3' },
  Technology:    { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  'Agency Tips': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
        <h1 style={{ fontSize:24, fontWeight:800, color:'#183963' }}>Post not found</h1>
        <Link to="/resources/blog" style={{ color:'#2396C6', fontWeight:700, textDecoration:'none' }}>Back to Blog</Link>
      </div>
    );
  }

  const catStyle = categoryColor[post.category] ?? { bg:'#F1F5F9', text:'#475569', border:'#E2E8F0' };
  const otherPosts = blogs.filter(b => b.slug !== slug).slice(0, 2);

  return (
    <div style={{ background:'#F8FAFC', minHeight:'100vh' }}>

      {/* ── Hero with cover image ── */}
      <div style={{ position:'relative', overflow:'hidden', minHeight:380 }}>
        {/* Cover image */}
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }}
        />
        {/* Dark gradient overlay so text is readable */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(24,57,99,0.90) 0%,rgba(25,102,170,0.85) 50%,rgba(35,150,198,0.78) 100%)' }} />
        <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ maxWidth:780, margin:'0 auto', position:'relative', zIndex:1, padding:'72px 24px 60px' }}>
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.50, ease:EASE }}>
            <Link
              to="/resources/blog"
              style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.70)', textDecoration:'none', marginBottom:20 }}
            >
              <ArrowLeft weight="regular" style={{ width:14, height:14 }} /> Back to Blog
            </Link>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', borderRadius:20, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.28)', fontSize:11, fontWeight:700, color:'#fff', letterSpacing:'0.04em' }}>
                <Tag weight="fill" style={{ width:10, height:10 }} /> {post.category}
              </span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.55)', display:'flex', alignItems:'center', gap:4 }}>
                <Clock weight="regular" style={{ width:12, height:12 }} />{post.readTime}
              </span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', gap:4 }}>
                <CalendarBlank weight="regular" style={{ width:12, height:12 }} />{post.date}
              </span>
            </div>
            <h1 style={{ fontSize:'clamp(1.7rem,3.5vw,2.6rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.12, margin:'0 0 20px', fontFamily:'var(--font-heading)' }}>{post.title}</h1>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.72)', lineHeight:1.65, fontFamily:'var(--font-body)' }}>{post.excerpt}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth:780, margin:'0 auto', padding:'52px 24px 72px' }}>
        <motion.article
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, delay:0.15, ease:EASE }}
          style={{ background:'#fff', borderRadius:20, padding:'48px 52px', boxShadow:'0 2px 24px rgba(24,57,99,0.07)', border:'1px solid rgba(35,150,198,0.08)' }}
        >
          {post.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: section.heading ? 36 : 0 }}>
              {section.heading && (
                <h2 style={{
                  fontSize:'clamp(1.15rem,2vw,1.35rem)', fontWeight:800, color:'#183963',
                  margin: i === 0 ? '0 0 12px' : '32px 0 12px',
                  fontFamily:'var(--font-heading)', letterSpacing:'-0.015em', lineHeight:1.3,
                  paddingLeft:14,
                  borderLeft:'3px solid #2396C6',
                }}>
                  {section.heading}
                </h2>
              )}
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} style={{
                  fontSize:16, color:'#334155', lineHeight:1.80,
                  margin:'0 0 18px', fontFamily:'var(--font-body)',
                }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* CTA block */}
          {post.cta && (
            <div style={{ marginTop:44, background:'linear-gradient(135deg,#EFF6FF 0%,#E8F5FB 100%)', borderRadius:16, padding:'28px 32px', border:'1px solid rgba(35,150,198,0.15)' }}>
              <h3 style={{ fontSize:18, fontWeight:800, color:'#183963', margin:'0 0 10px', fontFamily:'var(--font-heading)' }}>{post.cta.heading}</h3>
              <p style={{ fontSize:15, color:'#475569', lineHeight:1.70, margin:'0 0 20px', fontFamily:'var(--font-body)' }}>{post.cta.body}</p>
              <a
                href="https://calendly.com/logezy/demo"
                target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'11px 22px', borderRadius:10, background:'linear-gradient(135deg,#183963,#2396C6)', color:'#fff', fontSize:14, fontWeight:800, textDecoration:'none', boxShadow:'0 4px 14px rgba(35,150,198,0.30)' }}
              >
                Book a Free Demo <ArrowRight weight="regular" style={{ width:14, height:14 }} />
              </a>
            </div>
          )}
        </motion.article>

        {/* ── More articles ── */}
        {otherPosts.length > 0 && (
          <div style={{ marginTop:60 }}>
            <p style={{ fontSize:11, fontWeight:800, color:'#94A3B8', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:24 }}>More articles</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
              {otherPosts.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.08, ease:EASE }}
                >
                  <Link to={`/resources/blog/${p.slug}`} style={{ textDecoration:'none', display:'block' }}>
                    <div style={{
                      background:'#fff', borderRadius:16, padding:'24px', border:'1px solid rgba(0,0,0,0.06)',
                      boxShadow:'0 2px 14px rgba(24,57,99,0.05)',
                      transition:'box-shadow 0.2s, transform 0.2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 8px 32px rgba(35,150,198,0.14)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow='0 2px 14px rgba(24,57,99,0.05)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
                    >
                      <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, background:categoryColor[p.category]?.bg ?? '#F1F5F9', fontSize:10.5, fontWeight:700, color:categoryColor[p.category]?.text ?? '#475569', marginBottom:12 }}>
                        {p.category}
                      </div>
                      <h3 style={{ fontSize:15, fontWeight:800, color:'#0F172A', lineHeight:1.35, margin:'0 0 10px', fontFamily:'var(--font-heading)' }}>{p.title}</h3>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:13, fontWeight:700, color:'#2396C6' }}>
                        Read <ArrowRight weight="regular" style={{ width:13, height:13 }} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
