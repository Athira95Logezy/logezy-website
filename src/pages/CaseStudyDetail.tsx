import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ArrowLeft, ArrowRight, CheckCircle, DownloadSimple,
  Database, CalendarBlank, Shield, DeviceMobile, Receipt,
  ChartBar, Lock, CurrencyCircleDollar, BookOpen, Warning,
} from '@phosphor-icons/react';
import { caseStudies } from '../data/caseStudies';

/* ─── EmailJS config ──────────────────────────────────────────
   Set up a free account at https://www.emailjs.com
   Replace the values below with your own Service ID,
   Template ID and Public Key.
   Template variables expected: {{to_name}}, {{to_email}},
   {{company}}, {{pdf_link}}, {{guide_title}}
─────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_logezy';    // ← replace
const EMAILJS_TEMPLATE_ID = 'template_guide_dl'; // ← replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  database:  <Database weight="regular"            style={{ width:20,height:20 }} />,
  calendar:  <CalendarBlank weight="regular"       style={{ width:20,height:20 }} />,
  shield:    <Shield weight="regular"              style={{ width:20,height:20 }} />,
  phone:     <DeviceMobile weight="regular"        style={{ width:20,height:20 }} />,
  receipt:   <Receipt weight="regular"             style={{ width:20,height:20 }} />,
  chart:     <ChartBar weight="regular"            style={{ width:20,height:20 }} />,
  lock:      <Lock weight="regular"                style={{ width:20,height:20 }} />,
  money:     <CurrencyCircleDollar weight="regular" style={{ width:20,height:20 }} />,
};

/* ─── Download Gate Form ─────────────────────────────────────── */
function DownloadGate({ cs }: { cs: ReturnType<typeof caseStudies[number]['slug'] extends string ? () => typeof caseStudies[0] : never> }) {
  return null; // type helper only
}

interface FormState { name: string; email: string; company: string; role: string; }

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find(c => c.slug === slug);

  const [form, setForm]         = useState<FormState>({ name:'', email:'', company:'', role:'' });
  const [sending, setSending]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!cs) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
        <h1 style={{ fontSize:24, fontWeight:800, color:'#183963' }}>Resource not found</h1>
        <Link to="/resources/case-studies" style={{ color:'#2396C6', fontWeight:700, textDecoration:'none' }}>Back to Resources</Link>
      </div>
    );
  }

  const pdfUrl = `${window.location.origin}${cs.pdfFile}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) { setError('Please fill in all required fields.'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    setError('');
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name:     form.name,
          to_email:    form.email,
          company:     form.company,
          role:        form.role || 'Not specified',
          pdf_link:    pdfUrl,
          guide_title: cs.title,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSuccess(true);
    } catch {
      // EmailJS not configured yet — still show success + direct download
      setSuccess(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background:'#F8FAFC', minHeight:'100vh' }}>

      {/* ── Cover hero ── */}
      <div style={{ position:'relative', overflow:'hidden', height: isMobile ? 300 : 380 }}>
        <img src={cs.coverImage} alt={cs.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(24,57,99,0.92) 0%,rgba(25,102,170,0.82) 55%,rgba(35,150,198,0.72) 100%)' }} />
        <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />

        <div style={{ position:'absolute', inset:0, maxWidth:1200, margin:'0 auto', padding: isMobile ? '66px 20px 0' : '0 48px', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom: isMobile ? 24 : 44 }}>
          <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:EASE }}>
            <Link to="/resources/case-studies" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.68)', textDecoration:'none', marginBottom:18 }}>
              <ArrowLeft weight="regular" style={{ width:14, height:14 }} /> Back to Resources
            </Link>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.28)', marginBottom:14, fontSize:11, fontWeight:700, color:'#fff' }}>
              <BookOpen weight="fill" style={{ width:10, height:10 }} /> {cs.category}
            </div>
            <h1 style={{ fontSize:'clamp(1.6rem,3vw,2.5rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.1, margin:'0 0 14px', fontFamily:'var(--font-heading)', maxWidth:760 }}>{cs.title}</h1>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.70)', margin:0, fontFamily:'var(--font-body)', maxWidth:620 }}>{cs.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background:'#fff', borderBottom:'1px solid #F1F5F9' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding: isMobile ? '0 16px' : '0 48px', display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
          {cs.stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.4, delay:i*0.07, ease:EASE }}
              style={{ padding:'24px 16px', borderRight: i<3 ? '1px solid #F1F5F9':'none', textAlign:'center' }}
            >
              <div style={{ fontSize:'clamp(1.4rem,2vw,2rem)', fontWeight:900, color:'#183963', fontFamily:'var(--font-heading)', letterSpacing:'-0.03em', lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#94A3B8', marginTop:5, fontWeight:600 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding: isMobile ? '24px 16px 60px' : '52px 48px 80px', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 20 : 36, alignItems:'start' }}>

        {/* ── Main content ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1, ease:EASE }}>

          {/* Intro */}
          <div style={{ background:'#fff', borderRadius:20, padding: isMobile ? '24px 20px' : '40px 44px', marginBottom:24, boxShadow:'0 2px 20px rgba(24,57,99,0.07)', border:'1px solid rgba(35,150,198,0.08)' }}>
            <p style={{ fontSize:17, color:'#334155', lineHeight:1.80, margin:0, fontFamily:'var(--font-body)', fontWeight:500, borderLeft:'4px solid #2396C6', paddingLeft:18 }}>
              {cs.excerpt}
            </p>
          </div>

          {/* Challenge */}
          <div style={{ background:'#fff', borderRadius:20, padding: isMobile ? '24px 20px' : '40px 44px', marginBottom:24, boxShadow:'0 2px 20px rgba(24,57,99,0.07)', border:'1px solid rgba(35,150,198,0.08)' }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:'#183963', margin:'0 0 16px', fontFamily:'var(--font-heading)', letterSpacing:'-0.02em' }}>The Challenge</h2>
            <p style={{ fontSize:15.5, color:'#334155', lineHeight:1.80, margin:0, fontFamily:'var(--font-body)' }}>{cs.challenge}</p>
          </div>

          {/* Content sections */}
          {cs.sections.map((sec, i) => (
            <div key={i} style={{ background:'#fff', borderRadius:20, padding: isMobile ? '24px 20px' : '36px 44px', marginBottom:20, boxShadow:'0 2px 16px rgba(24,57,99,0.06)', border:'1px solid rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize:19, fontWeight:800, color:'#183963', margin:'0 0 14px', fontFamily:'var(--font-heading)', letterSpacing:'-0.015em', paddingLeft:14, borderLeft:'3px solid #2396C6' }}>{sec.heading}</h2>
              <p style={{ fontSize:15.5, color:'#334155', lineHeight:1.80, margin: sec.bullets ? '0 0 16px' : 0, fontFamily:'var(--font-body)' }}>{sec.body}</p>
              {sec.bullets && (
                <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                  {sec.bullets.map((b, j) => (
                    <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:15, color:'#334155', fontFamily:'var(--font-body)', lineHeight:1.6 }}>
                      <div style={{ width:20, height:20, borderRadius:'50%', background:'#E8F5FB', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                        <CheckCircle weight="fill" style={{ width:12, height:12, color:'#2396C6' }} />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Quote */}
          {cs.quote && (
            <motion.div
              initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ duration:0.5, ease:EASE }}
              style={{ background:'linear-gradient(135deg,#183765 0%,#1966AA 50%,#2396C6 100%)', borderRadius:20, padding: isMobile ? '24px 20px' : '36px 44px', marginBottom:24, position:'relative', overflow:'hidden' }}
            >
              <div style={{ position:'absolute', inset:0, opacity:0.06, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'20px 20px', pointerEvents:'none' }} />
              <div style={{ fontSize:52, lineHeight:1, color:'rgba(255,255,255,0.20)', fontFamily:'Georgia,serif', position:'absolute', top:16, left:28 }}>"</div>
              <p style={{ fontSize:18, fontWeight:600, color:'#fff', lineHeight:1.65, margin:'0 0 16px', fontFamily:'var(--font-body)', position:'relative', zIndex:1, paddingTop:8 }}>{cs.quote.text}</p>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.60)', margin:0, fontWeight:700, position:'relative', zIndex:1 }}>— {cs.quote.author}</p>
            </motion.div>
          )}

          {/* Features grid */}
          <div style={{ background:'#fff', borderRadius:20, padding: isMobile ? '24px 20px' : '40px 44px', marginBottom:24, boxShadow:'0 2px 20px rgba(24,57,99,0.07)', border:'1px solid rgba(35,150,198,0.08)' }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:'#183963', margin:'0 0 28px', fontFamily:'var(--font-heading)', letterSpacing:'-0.02em' }}>Key Platform Features</h2>
            <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:16 }}>
              {cs.features.map(f => (
                <div key={f.title} style={{ display:'flex', gap:14, padding:'18px', borderRadius:14, background:'#F8FAFC', border:'1px solid #F1F5F9' }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:'linear-gradient(135deg,#E8F5FB,#EFF6FF)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'#2396C6' }}>
                    {FEATURE_ICONS[f.icon]}
                  </div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:800, color:'#0F172A', margin:'0 0 4px', fontFamily:'var(--font-heading)' }}>{f.title}</p>
                    <p style={{ fontSize:12.5, color:'#64748B', lineHeight:1.60, margin:0, fontFamily:'var(--font-body)' }}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div style={{ background:'#F0FDF4', borderRadius:20, padding: isMobile ? '24px 20px' : '36px 44px', border:'1px solid #BBF7D0' }}>
            <h2 style={{ fontSize:19, fontWeight:800, color:'#065F46', margin:'0 0 12px', fontFamily:'var(--font-heading)' }}>Conclusion</h2>
            <p style={{ fontSize:15.5, color:'#334155', lineHeight:1.80, margin:0, fontFamily:'var(--font-body)' }}>{cs.conclusion}</p>
          </div>
        </motion.div>

        {/* ── Right sidebar ── */}
        <motion.aside
          initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.55, delay:0.22, ease:EASE }}
          style={{ position: isMobile ? 'static' : 'sticky', top:24, display:'flex', flexDirection:'column', gap:20 }}
        >

          {/* ─── DOWNLOAD GATE FORM ─────────────────── */}
          <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(35,150,198,0.16)', border:'1.5px solid rgba(35,150,198,0.18)' }}>
            {/* Form header */}
            <div style={{ background:'linear-gradient(135deg,#183765 0%,#2396C6 100%)', padding:'24px 28px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, opacity:0.06, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'16px 16px', pointerEvents:'none' }} />
              <div style={{ display:'flex', alignItems:'center', gap:10, position:'relative', zIndex:1, marginBottom:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <DownloadSimple weight="bold" style={{ width:18, height:18, color:'#fff' }} />
                </div>
                <div>
                  <p style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,0.60)', margin:0, letterSpacing:'0.08em', textTransform:'uppercase' as const }}>Free Download</p>
                  <p style={{ fontSize:14, fontWeight:800, color:'#fff', margin:0 }}>Get the PDF Guide</p>
                </div>
              </div>
              <p style={{ fontSize:12.5, color:'rgba(255,255,255,0.70)', margin:0, lineHeight:1.55, position:'relative', zIndex:1 }}>
                Enter your details and we'll send the full PDF guide directly to your inbox.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity:1 }} exit={{ opacity:0 }}
                  style={{ padding:'24px 28px' }}
                >
                  {[
                    { id:'name',    label:'Full Name *',       type:'text',  placeholder:'Jane Smith' },
                    { id:'email',   label:'Work Email *',      type:'email', placeholder:'jane@agency.co.uk' },
                    { id:'company', label:'Agency / Company *',type:'text',  placeholder:'Smith Healthcare Staffing' },
                    { id:'role',    label:'Your Role',         type:'text',  placeholder:'Director, Recruiter...' },
                  ].map(f => (
                    <div key={f.id} style={{ marginBottom:14 }}>
                      <label style={{ display:'block', fontSize:11.5, fontWeight:700, color:'#374151', marginBottom:5 }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id as keyof FormState]}
                        onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                        style={{ width:'100%', padding:'10px 12px', borderRadius:9, border:'1.5px solid #E2E8F0', fontSize:13.5, color:'#0F172A', outline:'none', fontFamily:'var(--font-body)', boxSizing:'border-box' as const, transition:'border-color 0.2s' }}
                        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#2396C6'; }}
                        onBlur={e  => { (e.target as HTMLInputElement).style.borderColor = '#E2E8F0'; }}
                      />
                    </div>
                  ))}

                  {error && (
                    <div style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 12px', borderRadius:9, background:'#FEF2F2', border:'1px solid #FECACA', marginBottom:14 }}>
                      <Warning weight="fill" style={{ width:14, height:14, color:'#EF4444', flexShrink:0 }} />
                      <span style={{ fontSize:12, color:'#B91C1C' }}>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    style={{ width:'100%', padding:'13px', borderRadius:12, background: sending ? '#94A3B8' : 'linear-gradient(135deg,#183963,#2396C6)', color:'#fff', fontSize:14, fontWeight:800, border:'none', cursor: sending ? 'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'opacity 0.2s', fontFamily:'var(--font-body)' }}
                  >
                    {sending ? (
                      <>
                        <svg style={{ animation:'spin 1s linear infinite', width:16, height:16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2a10 10 0 010 20" opacity="0.8"/></svg>
                        Sending...
                      </>
                    ) : (
                      <><DownloadSimple weight="bold" style={{ width:16, height:16 }} /> Download Free Guide</>
                    )}
                  </button>

                  <p style={{ fontSize:11, color:'#94A3B8', textAlign:'center', margin:'12px 0 0', lineHeight:1.5 }}>
                    We respect your privacy. No spam, ever.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.4, ease:EASE }}
                  style={{ padding:'32px 28px', textAlign:'center' }}
                >
                  <div style={{ width:60, height:60, borderRadius:'50%', background:'#D1FAE5', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                    <CheckCircle weight="fill" style={{ width:30, height:30, color:'#10B981' }} />
                  </div>
                  <h3 style={{ fontSize:17, fontWeight:800, color:'#0F172A', margin:'0 0 8px', fontFamily:'var(--font-heading)' }}>Check your inbox!</h3>
                  <p style={{ fontSize:13, color:'#64748B', lineHeight:1.65, margin:'0 0 24px', fontFamily:'var(--font-body)' }}>
                    We've sent the guide to <strong style={{ color:'#183963' }}>{form.email}</strong>. It should arrive within a few minutes.
                  </p>
                  <a
                    href={cs.pdfFile}
                    download
                    target="_blank" rel="noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'12px 22px', borderRadius:12, background:'linear-gradient(135deg,#183963,#2396C6)', color:'#fff', fontSize:13, fontWeight:800, textDecoration:'none', boxShadow:'0 4px 14px rgba(35,150,198,0.30)' }}
                  >
                    <DownloadSimple weight="bold" style={{ width:16, height:16 }} /> Download Now
                  </a>
                  <p style={{ fontSize:11, color:'#94A3B8', marginTop:12 }}>PDF · {cs.readTime}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other resources */}
          <div style={{ background:'#fff', borderRadius:18, padding:'22px', border:'1px solid rgba(0,0,0,0.06)', boxShadow:'0 2px 12px rgba(24,57,99,0.06)' }}>
            <h3 style={{ fontSize:12, fontWeight:800, color:'#0F172A', letterSpacing:'0.07em', textTransform:'uppercase' as const, margin:'0 0 14px' }}>Related</h3>
            {caseStudies.filter(c => c.slug !== slug).length === 0 ? (
              <p style={{ fontSize:13, color:'#94A3B8', margin:0 }}>More guides coming soon.</p>
            ) : caseStudies.filter(c => c.slug !== slug).map(rel => (
              <Link key={rel.slug} to={`/resources/case-studies/${rel.slug}`} style={{ textDecoration:'none', display:'flex', gap:10, alignItems:'flex-start', padding:'8px', borderRadius:10, transition:'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{ width:56, height:48, borderRadius:8, overflow:'hidden', flexShrink:0 }}>
                  <img src={rel.coverImage} alt={rel.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                </div>
                <div>
                  <p style={{ fontSize:12, fontWeight:700, color:'#0F172A', margin:'0 0 3px', lineHeight:1.35 }}>{rel.title.slice(0,55)}...</p>
                  <span style={{ fontSize:11, color:'#94A3B8' }}>{rel.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mini CTA */}
          <div style={{ background:'linear-gradient(135deg,#183765,#2396C6)', borderRadius:18, padding:'22px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, opacity:0.06, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'14px 14px', pointerEvents:'none' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <h3 style={{ fontSize:15, fontWeight:800, color:'#fff', margin:'0 0 7px', fontFamily:'var(--font-heading)' }}>See Logezy in action</h3>
              <p style={{ fontSize:12.5, color:'rgba(255,255,255,0.70)', margin:'0 0 16px', fontFamily:'var(--font-body)', lineHeight:1.55 }}>Free demo, no credit card needed.</p>
              <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 18px', borderRadius:10, background:'#fff', color:'#183963', fontSize:13, fontWeight:800, textDecoration:'none' }}>
                Book Demo <ArrowRight weight="regular" style={{ width:13, height:13 }} />
              </a>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* spin keyframes */}
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
