import React from 'react';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../hooks/useWindowWidth';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   PHONE SHELL — realistic dark titanium
───────────────────────────────────────────── */
function PhoneShell({
  src, alt = 'App screen', scale = 1, style: outer = {},
}: { src: string; alt?: string; scale?: number; style?: React.CSSProperties }) {
  const W  = Math.round(308 * scale);
  const H  = Math.round(664 * scale);
  const R  = Math.round(58 * scale);
  const Ri = Math.round(54 * scale);

  return (
    <div style={{ position: 'relative', userSelect: 'none', width: W, height: H, flexShrink: 0, ...outer }}>
      {/* Left buttons */}
      <div style={{ position:'absolute', left:-4, top:Math.round(122*scale), width:4, height:Math.round(34*scale), background:'linear-gradient(to left,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'3px 0 0 3px', boxShadow:'-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position:'absolute', left:-4, top:Math.round(178*scale), width:4, height:Math.round(62*scale), background:'linear-gradient(to left,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'3px 0 0 3px', boxShadow:'-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position:'absolute', left:-4, top:Math.round(256*scale), width:4, height:Math.round(62*scale), background:'linear-gradient(to left,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'3px 0 0 3px', boxShadow:'-2px 0 5px rgba(0,0,0,0.45)' }} />
      {/* Right power */}
      <div style={{ position:'absolute', right:-4, top:Math.round(192*scale), width:4, height:Math.round(84*scale), background:'linear-gradient(to right,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'0 3px 3px 0', boxShadow:'2px 0 5px rgba(0,0,0,0.45)' }} />

      {/* Frame */}
      <div style={{
        width: W, height: H, borderRadius: R,
        background: 'linear-gradient(160deg,#2C2C2E 0%,#3A3A3C 22%,#2A2A2C 46%,#323234 72%,#2C2C2E 100%)',
        padding: Math.round(3*scale),
        boxShadow: [
          '0 64px 150px rgba(0,0,0,0.55)',
          '0 24px 60px rgba(0,0,0,0.32)',
          '0 8px 20px rgba(0,0,0,0.20)',
          '0 0 0 0.5px rgba(255,255,255,0.15)',
          'inset 0 1px 0 rgba(255,255,255,0.18)',
        ].join(','),
        position: 'relative',
      }}>
        <div style={{ width:'100%', height:'100%', borderRadius:Ri, background:'#000', overflow:'hidden', position:'relative' }}>
          <img src={src} alt={alt} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }} />
          {/* Dynamic Island */}
          <div style={{ position:'absolute', top:Math.round(14*scale), left:'50%', transform:'translateX(-50%)', width:Math.round(126*scale), height:Math.round(36*scale), background:'#000', borderRadius:Math.round(20*scale), zIndex:10 }} />
          {/* Glare */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20, borderRadius:Ri, background:'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,transparent 40%)' }} />
        </div>
      </div>

      {/* Ambient glow */}
      <div style={{ position:'absolute', inset:-40, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(35,150,198,0.18) 0%,transparent 68%)', filter:'blur(30px)', zIndex:-1, pointerEvents:'none' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING NOTIFICATION CARDS
───────────────────────────────────────────── */
function WorkerAcceptedCard() {
  return (
    <motion.div
      initial={{ opacity:0, x:40, y:-10 }} whileInView={{ opacity:1, x:0, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.6, delay:0.8, ease:EASE }}
      animate={{ y:[0,-6,0] }}
      style={{ background:'#fff', borderRadius:16, padding:'14px 18px', boxShadow:'0 16px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)', display:'flex', alignItems:'center', gap:12, minWidth:240 }}
    >
      {/* Avatar */}
      <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,#2396C6,#183963)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:14, fontWeight:800, color:'#fff' }}>SV</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
          <span style={{ fontSize:11, fontWeight:800, color:'#183963', letterSpacing:'0.04em' }}>Worker Accepted</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <p style={{ fontSize:12.5, fontWeight:700, color:'#0F172A', margin:'0 0 2px' }}>Serena Veiliams</p>
        <p style={{ fontSize:11, color:'#94A3B8', margin:0 }}>Sun, April 24 · 24:00 – 21:00</p>
      </div>
    </motion.div>
  );
}

function WorkersNotifiedCard() {
  const avatars = [
    { initials:'AM', color:'#EF4444', bg:'#FEE2E2' },
    { initials:'JH', color:'#F97316', bg:'#FED7AA' },
    { initials:'AR', color:'#8B5CF6', bg:'#EDE9FE' },
    { initials:'SO', color:'#10B981', bg:'#D1FAE5' },
    { initials:'TP', color:'#2396C6', bg:'#E8F5FB' },
  ];
  return (
    <motion.div
      initial={{ opacity:0, x:40, y:10 }} whileInView={{ opacity:1, x:0, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.6, delay:1.1, ease:EASE }}
      animate={{ y:[0,-5,0] }}
      style={{ background:'#fff', borderRadius:16, padding:'14px 18px', boxShadow:'0 16px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)', minWidth:240 }}
    >
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963', letterSpacing:'0.04em' }}>5 Workers Notified</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div style={{ display:'flex', gap:6 }}>
        {avatars.map(a => (
          <div key={a.initials} style={{ width:36, height:36, borderRadius:'50%', background:a.bg, border:`2px solid ${a.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:a.color }}>
            {a.initials}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ShiftFilledBadge() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.85, y:-20 }} whileInView={{ opacity:1, scale:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.55, delay:0.6, ease:EASE }}
      animate={{ y:[0,-5,0] }}
      style={{ background:'linear-gradient(135deg,#183963,#2396C6)', borderRadius:12, padding:'10px 16px', boxShadow:'0 12px 32px rgba(35,150,198,0.40)', display:'flex', alignItems:'center', gap:9 }}
    >
      <div style={{ width:28, height:28, borderRadius:8, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div>
        <p style={{ margin:0, fontSize:11, fontWeight:800, color:'#fff', lineHeight:1.2 }}>Shift Filled</p>
        <p style={{ margin:0, fontSize:9.5, color:'rgba(255,255,255,0.65)' }}>in 3 minutes</p>
      </div>
    </motion.div>
  );
}

function LivePillBadge() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }} transition={{ duration:0.4, delay:0.4, ease:EASE }}
      style={{ background:'rgba(16,185,129,0.10)', border:'1.5px solid rgba(16,185,129,0.30)', borderRadius:40, padding:'6px 14px', display:'inline-flex', alignItems:'center', gap:7 }}
    >
      <motion.div
        style={{ width:7, height:7, borderRadius:'50%', background:'#10B981' }}
        animate={{ opacity:[1,0.3,1], scale:[1,1.4,1] }}
        transition={{ duration:1.5, repeat:Infinity }}
      />
      <span style={{ fontSize:11.5, fontWeight:700, color:'#065F46', letterSpacing:'0.04em' }}>Live • Auto-filling shifts</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION EXPORT
───────────────────────────────────────────── */
export default function AnimatedScheduleSection() {
  const vw = useWindowWidth();
  const isMobile = vw < 768;
  const isTablet = vw < 1100;

  return (
    <section style={{
      background: 'linear-gradient(180deg,#EEF6FF 0%,#F5F9FF 40%,#FFFFFF 100%)',
      padding: isMobile ? '64px 20px 0' : '96px 0 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Subtle dot grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.5, backgroundImage:'radial-gradient(circle,rgba(35,150,198,0.12) 1px,transparent 1px)', backgroundSize:'32px 32px' }} />

      {/* Top-center glow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:1000, height:400, background:'radial-gradient(ellipse,rgba(35,150,198,0.10) 0%,transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:3, maxWidth:1440, margin:'0 auto', padding: isMobile ? '0' : '0 40px' }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.65, ease:EASE }}
          style={{ textAlign:'center', marginBottom: isMobile ? 40 : 60 }}
        >
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 16px', borderRadius:100, marginBottom:18, background:'rgba(35,150,198,0.08)', border:'1px solid rgba(35,150,198,0.22)' }}>
            <motion.div
              style={{ width:6, height:6, borderRadius:'50%', background:'#2396C6' }}
              animate={{ opacity:[1,0.3,1], scale:[1,1.5,1] }}
              transition={{ duration:1.6, repeat:Infinity }}
            />
            <span style={{ fontSize:11, fontWeight:800, color:'#2396C6', letterSpacing:'0.10em', textTransform:'uppercase' as const }}>Live Workflow</span>
          </div>

          <h2 style={{ fontSize:'clamp(1.9rem,3.5vw,3rem)', fontWeight:900, color:'#183963', letterSpacing:'-0.03em', lineHeight:1.1, margin:'0 0 14px', fontFamily:'var(--font-heading)' }}>
            Schedule thicts, manage workers, track{' '}
            <span style={{ color:'#2396C6' }}>compliance</span>,<br />
            and communicate instantly across desktop and mobile.
          </h2>

          {/* Step pills */}
          <div style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap' as const, marginTop:20 }}>
            {[
              { n:'1', label:'Post shifts instantly', color:'#EF4444', bg:'#FEE2E2' },
              { n:'2', label:'Notify workers',        color:'#2396C6', bg:'#E8F5FB' },
              { n:'3', label:'Track compliance',      color:'#8B5CF6', bg:'#EDE9FE' },
              { n:'4', label:'Get confirmations',     color:'#10B981', bg:'#D1FAE5' },
            ].map(s => (
              <div key={s.n} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 14px', borderRadius:100, background:s.bg, border:`1px solid ${s.color}30` }}>
                <div style={{ width:18,height:18,borderRadius:'50%',background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:900,color:'#fff' }}>{s.n}</div>
                <span style={{ fontSize:12, fontWeight:600, color:s.color }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Devices + floating cards ── */}
        {!isMobile && (
          <div style={{ position:'relative', display:'flex', alignItems:'flex-end', justifyContent:'center', gap:0 }}>

            {/* Phone — slides in from left, overlaps desktop */}
            <motion.div
              initial={{ opacity:0, x:-60, y:30 }} whileInView={{ opacity:1, x:0, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.80, delay:0.25, ease:EASE }}
              animate={{ y:[0,-8,0] }}
              style={{
                flexShrink:0,
                marginRight: isTablet ? -40 : -64,
                zIndex:10,
                position:'relative',
                filter:'drop-shadow(0 40px 80px rgba(0,0,0,0.30))',
              }}
            >
              <PhoneShell
                src="/Avilability.jpeg"
                alt="Logezy Availability"
                scale={isTablet ? 0.78 : 0.90}
              />
            </motion.div>

            {/* Desktop mockup */}
            <motion.div
              initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.90, delay:0.10, ease:EASE }}
              style={{
                flex:1, minWidth:0, position:'relative', zIndex:5,
                filter:'drop-shadow(0 32px 80px rgba(0,0,0,0.18))',
              }}
            >
              {/* macOS chrome */}
              <div style={{
                borderRadius:'18px 18px 0 0',
                overflow:'hidden',
                boxShadow:[
                  '0 0 0 1px rgba(35,150,198,0.18)',
                  '0 -3px 0 rgba(35,150,198,0.20)',
                  '0 40px 120px rgba(35,150,198,0.18)',
                  '0 20px 60px rgba(0,0,0,0.14)',
                ].join(', '),
                transform: 'perspective(1800px) rotateY(-2deg) rotateX(1deg)',
                transformOrigin:'center top',
              }}>
                {/* Chrome bar */}
                <div style={{ background:'linear-gradient(180deg,#E8EAED 0%,#DCDFE3 100%)', padding:'9px 14px 0', borderBottom:'1px solid #C8CBD0' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:8 }}>
                    <div style={{ display:'flex', gap:5 }}>
                      {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, boxShadow:'inset 0 -1px 1px rgba(0,0,0,0.15)' }} />)}
                    </div>
                    <div style={{ display:'flex', gap:2 }}>
                      {['‹','›'].map((ch,i) => <div key={i} style={{ width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:i===0?'#888':'#ccc' }}>{ch}</div>)}
                    </div>
                    <div style={{ flex:1,height:22,borderRadius:6,background:'rgba(255,255,255,0.92)',border:'1px solid #C4C6CA',display:'flex',alignItems:'center',paddingLeft:8,gap:5 }}>
                      <div style={{ width:4,height:4,borderRadius:'50%',background:'#28C840' }} />
                      <span style={{ fontSize:8.5,color:'#888' }}>app.logezy.co/schedule</span>
                    </div>
                  </div>
                  {/* Tab */}
                  <div style={{ display:'flex',gap:2 }}>
                    <div style={{ display:'flex',alignItems:'center',gap:6,padding:'5px 14px 5px 10px',borderRadius:'7px 7px 0 0',background:'#fff',border:'1px solid #C8CBD0',borderBottom:'1px solid #fff' }}>
                      <div style={{ width:10,height:10,borderRadius:3,background:'linear-gradient(135deg,#183963,#2396C6)' }} />
                      <span style={{ fontSize:9.5,fontWeight:600,color:'#444' }}>Logezy Schedule</span>
                      <div style={{ fontSize:8,color:'#777',marginLeft:4 }}>✕</div>
                    </div>
                    <div style={{ width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:'#aaa',paddingBottom:2 }}>+</div>
                  </div>
                </div>

                {/* Screenshot */}
                <img src="/schedule.png" alt="Logezy Schedule" style={{ width:'100%', height:'auto', display:'block' }} />
              </div>

              {/* Floating cards — RIGHT side */}
              <motion.div
                style={{ position:'absolute', right: isTablet ? -180 : -220, top:20, display:'flex', flexDirection:'column', gap:14, zIndex:20, pointerEvents:'none' }}
              >
                <ShiftFilledBadge />
                <WorkerAcceptedCard />
                <WorkersNotifiedCard />
              </motion.div>
            </motion.div>

          </div>
        )}

        {/* Mobile: phone only */}
        {isMobile && (
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.65, ease:EASE }}
            style={{ display:'flex', justifyContent:'center' }}
          >
            <PhoneShell src="/Avilability.jpeg" alt="Logezy App" scale={0.72} />
          </motion.div>
        )}

        {/* Live pill — bottom centre */}
        {!isMobile && (
          <div style={{ display:'flex', justifyContent:'center', marginTop:24, paddingBottom:8, position:'relative', zIndex:6 }}>
            <LivePillBadge />
          </div>
        )}

      </div>

      {/* Bottom wave */}
      <div style={{ position:'relative', zIndex:4, lineHeight:0, marginTop: isMobile ? 40 : 16 }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width:'100%', height:100, display:'block' }}>
          <path d="M0,60 C360,100 1080,20 1440,60 L1440,100 L0,100 Z" fill="rgba(35,150,198,0.08)" />
          <path d="M0,72 C480,100 960,40 1440,72 L1440,100 L0,100 Z" fill="rgba(35,150,198,0.06)" />
          <path d="M0,84 C240,100 720,60 1440,84 L1440,100 L0,100 Z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}
