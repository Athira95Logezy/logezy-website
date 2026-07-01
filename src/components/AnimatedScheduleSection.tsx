import React from 'react';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../hooks/useWindowWidth';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   PHONE SHELL — realistic dark titanium iPhone
───────────────────────────────────────────── */
function PhoneShell({
  src, alt = 'App screen', scale = 1, style: outer = {},
}: { src: string; alt?: string; scale?: number; style?: React.CSSProperties }) {
  const W  = Math.round(308 * scale);
  const H  = Math.round(664 * scale);
  const R  = Math.round(58 * scale);
  const Ri = Math.round(52 * scale);

  return (
    <div style={{ position:'relative', userSelect:'none', width:W, height:H, flexShrink:0, ...outer }}>
      {/* Side buttons — left */}
      <div style={{ position:'absolute', left:-3.5, top:Math.round(118*scale), width:3.5, height:Math.round(32*scale), background:'linear-gradient(to left,#5A5A5E,#9A9A9F,#6A6A6E)', borderRadius:'3px 0 0 3px', boxShadow:'-1px 0 4px rgba(0,0,0,0.5)' }} />
      <div style={{ position:'absolute', left:-3.5, top:Math.round(174*scale), width:3.5, height:Math.round(64*scale), background:'linear-gradient(to left,#5A5A5E,#9A9A9F,#6A6A6E)', borderRadius:'3px 0 0 3px', boxShadow:'-1px 0 4px rgba(0,0,0,0.5)' }} />
      <div style={{ position:'absolute', left:-3.5, top:Math.round(254*scale), width:3.5, height:Math.round(64*scale), background:'linear-gradient(to left,#5A5A5E,#9A9A9F,#6A6A6E)', borderRadius:'3px 0 0 3px', boxShadow:'-1px 0 4px rgba(0,0,0,0.5)' }} />
      {/* Right power button */}
      <div style={{ position:'absolute', right:-3.5, top:Math.round(188*scale), width:3.5, height:Math.round(86*scale), background:'linear-gradient(to right,#5A5A5E,#9A9A9F,#6A6A6E)', borderRadius:'0 3px 3px 0', boxShadow:'1px 0 4px rgba(0,0,0,0.5)' }} />

      {/* Outer frame with titanium gradient */}
      <div style={{
        width:W, height:H, borderRadius:R,
        background:'linear-gradient(158deg,#3C3C3E 0%,#2A2A2C 18%,#3E3E40 35%,#242426 52%,#363638 68%,#2E2E30 84%,#3A3A3C 100%)',
        padding:Math.round(3*scale),
        boxShadow:[
          `0 70px 160px rgba(0,0,0,0.60)`,
          `0 32px 72px rgba(0,0,0,0.40)`,
          `0 12px 28px rgba(0,0,0,0.25)`,
          `0 0 0 0.5px rgba(255,255,255,0.12)`,
          `inset 0 1px 0 rgba(255,255,255,0.20)`,
          `inset 0 -1px 0 rgba(0,0,0,0.30)`,
        ].join(','),
        position:'relative',
      }}>
        {/* Thin inner metal ring */}
        <div style={{
          width:'100%', height:'100%', borderRadius:Ri+2,
          background:'linear-gradient(158deg,#1A1A1C,#111113)',
          padding:Math.round(1.5*scale),
        }}>
          <div style={{ width:'100%', height:'100%', borderRadius:Ri, background:'#000', overflow:'hidden', position:'relative' }}>
            <img src={src} alt={alt} loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }} />
            {/* Dynamic Island */}
            <div style={{ position:'absolute', top:Math.round(12*scale), left:'50%', transform:'translateX(-50%)', width:Math.round(120*scale), height:Math.round(34*scale), background:'#000', borderRadius:Math.round(18*scale), zIndex:10, boxShadow:'0 0 0 1px rgba(255,255,255,0.05)' }} />
            {/* Screen reflection / glare */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20, borderRadius:Ri, background:'linear-gradient(148deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.02) 35%,transparent 55%)' }} />
            {/* Bottom glow */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', pointerEvents:'none', zIndex:20, background:'linear-gradient(to top,rgba(35,150,198,0.06),transparent)' }} />
          </div>
        </div>
      </div>

      {/* Ambient glow beneath phone */}
      <div style={{ position:'absolute', bottom:-50, left:'10%', right:'10%', height:60, background:'radial-gradient(ellipse,rgba(35,150,198,0.25) 0%,transparent 70%)', filter:'blur(24px)', zIndex:-1, pointerEvents:'none' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP MOCKUP — macOS chrome (no URL bar)
───────────────────────────────────────────── */
function DesktopChrome({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius:'16px 16px 0 0',
      overflow:'hidden',
      boxShadow:[
        '0 0 0 1px rgba(255,255,255,0.08)',
        '0 0 0 1.5px rgba(35,150,198,0.22)',
        '0 -4px 0 rgba(35,150,198,0.15)',
        '0 50px 130px rgba(35,150,198,0.22)',
        '0 24px 64px rgba(0,0,0,0.20)',
      ].join(', '),
      transform:'perspective(2000px) rotateY(-2deg) rotateX(1deg)',
      transformOrigin:'center top',
    }}>
      {/* macOS title + tab bar — no URL bar */}
      <div style={{
        background:'linear-gradient(180deg,#ECEDEF 0%,#E2E4E7 100%)',
        borderBottom:'1px solid #C2C4C8',
        userSelect:'none',
      }}>
        {/* Title bar row: traffic lights only */}
        <div style={{ display:'flex', alignItems:'center', padding:'10px 14px 6px', gap:10 }}>
          {/* Traffic lights */}
          <div style={{ display:'flex', gap:6 }}>
            {[
              { bg:'#FF5F57', ring:'#D94F46' },
              { bg:'#FEBC2E', ring:'#D4A020' },
              { bg:'#28C840', ring:'#1FA035' },
            ].map(({ bg, ring }) => (
              <div key={bg} style={{
                width:12, height:12, borderRadius:'50%', background:bg,
                boxShadow:`inset 0 -1.5px 2px rgba(0,0,0,0.22), 0 0 0 0.5px ${ring}, 0 1px 3px rgba(0,0,0,0.12)`,
              }} />
            ))}
          </div>
          {/* Centered mock window title */}
          <div style={{ flex:1, textAlign:'center' }}>
            <span style={{ fontSize:10, fontWeight:600, color:'#666', letterSpacing:'0.01em' }}>Logezy</span>
          </div>
          {/* Right side placeholder controls */}
          <div style={{ display:'flex', gap:8, opacity:0.35 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/></svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          </div>
        </div>

        {/* Tab row */}
        <div style={{ display:'flex', alignItems:'flex-end', padding:'0 10px', gap:2 }}>
          {/* Active tab */}
          <div style={{
            display:'flex', alignItems:'center', gap:7,
            padding:'6px 16px 7px 12px',
            borderRadius:'9px 9px 0 0',
            background:'#fff',
            border:'1px solid #C2C4C8',
            borderBottom:'1px solid #fff',
            position:'relative', zIndex:2,
          }}>
            <div style={{ width:13, height:13, borderRadius:4, background:'linear-gradient(135deg,#183963 0%,#2396C6 100%)', flexShrink:0 }} />
            <span style={{ fontSize:10.5, fontWeight:600, color:'#333', whiteSpace:'nowrap' }}>Logezy — Schedule</span>
            <div style={{ fontSize:9, color:'#888', marginLeft:6, lineHeight:1, cursor:'pointer' }}>✕</div>
          </div>
          {/* New tab button */}
          <div style={{ width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, color:'#999', paddingBottom:4, opacity:0.8 }}>+</div>
        </div>
      </div>

      {/* Content / screenshot */}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING NOTIFICATION CARDS
───────────────────────────────────────────── */
function WorkerAcceptedCard() {
  return (
    <motion.div
      initial={{ opacity:0, x:50, y:-10 }}
      whileInView={{ opacity:1, x:0, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.65, delay:0.85, ease:EASE }}
      style={{ position:'relative' }}
    >
      <motion.div
        animate={{ y:[0,-7,0] }}
        transition={{ duration:3.2, repeat:Infinity, ease:'easeInOut', delay:0.2 }}
        style={{
          background:'#fff', borderRadius:16, padding:'14px 18px',
          boxShadow:'0 20px 56px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.05)',
          display:'flex', alignItems:'center', gap:12, minWidth:244,
        }}
      >
        <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#2396C6,#183963)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:14, fontWeight:800, color:'#fff', boxShadow:'0 4px 12px rgba(35,150,198,0.35)' }}>SV</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#183963', letterSpacing:'0.04em' }}>Worker Accepted</span>
            <div style={{ width:20, height:20, borderRadius:'50%', background:'#DCFCE7', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>
          <p style={{ fontSize:12.5, fontWeight:700, color:'#0F172A', margin:'0 0 2px' }}>Serena Veiliams</p>
          <p style={{ fontSize:11, color:'#94A3B8', margin:0 }}>Sun, April 24 · 08:00 – 21:00</p>
        </div>
      </motion.div>
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
      initial={{ opacity:0, x:50, y:10 }}
      whileInView={{ opacity:1, x:0, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.65, delay:1.15, ease:EASE }}
      style={{ position:'relative' }}
    >
      <motion.div
        animate={{ y:[0,-6,0] }}
        transition={{ duration:3.8, repeat:Infinity, ease:'easeInOut', delay:0.8 }}
        style={{
          background:'#fff', borderRadius:16, padding:'14px 18px',
          boxShadow:'0 20px 56px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.05)',
          minWidth:244,
        }}
      >
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <span style={{ fontSize:11, fontWeight:800, color:'#183963', letterSpacing:'0.04em' }}>5 Workers Notified</span>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#10B981' }} />
            <span style={{ fontSize:10, fontWeight:700, color:'#10B981' }}>Sent</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {avatars.map(a => (
            <div key={a.initials} style={{ width:36, height:36, borderRadius:'50%', background:a.bg, border:`2px solid ${a.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:a.color, boxShadow:`0 2px 6px ${a.color}20` }}>
              {a.initials}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ShiftFilledBadge() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.80, y:-24 }}
      whileInView={{ opacity:1, scale:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.60, delay:0.55, ease:EASE }}
      style={{ position:'relative' }}
    >
      <motion.div
        animate={{ y:[0,-5,0] }}
        transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut' }}
        style={{
          background:'linear-gradient(135deg,#183963 0%,#2396C6 100%)',
          borderRadius:14, padding:'11px 18px',
          boxShadow:'0 14px 40px rgba(35,150,198,0.45), 0 4px 12px rgba(0,0,0,0.20)',
          display:'flex', alignItems:'center', gap:10,
        }}
      >
        <div style={{ width:32, height:32, borderRadius:9, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <div>
          <p style={{ margin:0, fontSize:12, fontWeight:800, color:'#fff', lineHeight:1.2 }}>Shift Filled</p>
          <p style={{ margin:0, fontSize:10, color:'rgba(255,255,255,0.70)' }}>in 3 minutes</p>
        </div>
        <div style={{ marginLeft:6, padding:'3px 8px', borderRadius:20, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.30)' }}>
          <span style={{ fontSize:9, fontWeight:700, color:'#fff' }}>LIVE</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   LIVE PILL — fixed visibility on dark bg
───────────────────────────────────────────── */
function LivePillBadge() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.85, y:10 }}
      whileInView={{ opacity:1, scale:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay:0.4, ease:EASE }}
      style={{
        background:'rgba(255,255,255,0.14)',
        border:'1.5px solid rgba(255,255,255,0.35)',
        backdropFilter:'blur(8px)',
        borderRadius:40, padding:'8px 18px',
        display:'inline-flex', alignItems:'center', gap:8,
        boxShadow:'0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <motion.div
        style={{ width:8, height:8, borderRadius:'50%', background:'#34D399', flexShrink:0 }}
        animate={{ opacity:[1,0.3,1], scale:[1,1.5,1] }}
        transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut' }}
      />
      <span style={{ fontSize:12, fontWeight:700, color:'#fff', letterSpacing:'0.05em' }}>Live · Auto-filling shifts</span>
      <div style={{ width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,0.40)' }} />
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
      background:'linear-gradient(135deg,#183765 0%,#1966AA 40%,#2E8FBF 70%,#5AB4D5 100%)',
      padding: isMobile ? '64px 20px 0' : '96px 0 0',
      overflow:'hidden',
      position:'relative',
    }}>
      {/* Dot grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.04, backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
      {/* Top glow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:1000, height:400, background:'radial-gradient(ellipse,rgba(90,180,213,0.22) 0%,transparent 65%)', filter:'blur(60px)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:3, maxWidth:1440, margin:'0 auto', padding: isMobile ? '0' : '0 40px' }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.65, ease:EASE }}
          style={{ textAlign:'center', marginBottom: isMobile ? 40 : 60 }}
        >
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 16px', borderRadius:100, marginBottom:18, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)' }}>
            <motion.div
              style={{ width:6, height:6, borderRadius:'50%', background:'#00D4FF' }}
              animate={{ opacity:[1,0.3,1], scale:[1,1.5,1] }}
              transition={{ duration:1.6, repeat:Infinity }}
            />
            <span style={{ fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'0.10em', textTransform:'uppercase' as const }}>Live Workflow</span>
          </div>

          <h2 style={{ fontSize:'clamp(1.9rem,3.5vw,3rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.1, margin:'0 0 14px', fontFamily:'var(--font-heading)' }}>
            Schedule shifts, manage workers, track{' '}
            <span style={{ color:'#00D4FF' }}>compliance</span>,<br />
            and communicate instantly across desktop and mobile.
          </h2>

          {/* Step pills */}
          <div style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap' as const, marginTop:20 }}>
            {[
              { n:'1', label:'Post shifts instantly', color:'#FF6B6B' },
              { n:'2', label:'Notify workers',        color:'#00D4FF' },
              { n:'3', label:'Track compliance',      color:'#C084FC' },
              { n:'4', label:'Get confirmations',     color:'#34D399' },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.45, delay:0.1 + i * 0.08, ease:EASE }}
                style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 14px', borderRadius:100, background:'rgba(255,255,255,0.12)', border:`1px solid rgba(255,255,255,0.22)` }}
              >
                <div style={{ width:18,height:18,borderRadius:'50%',background:'rgba(255,255,255,0.18)',border:`1px solid ${s.color}80`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:900,color:s.color }}>{s.n}</div>
                <span style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.90)' }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Devices + floating cards ── */}
        {!isMobile && (
          <div style={{ position:'relative', display:'flex', alignItems:'flex-end', justifyContent:'center', gap:0 }}>

            {/* Phone — slides in from left */}
            <motion.div
              initial={{ opacity:0, x:-60, y:30 }}
              whileInView={{ opacity:1, x:0, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.85, delay:0.25, ease:EASE }}
              style={{
                flexShrink:0,
                marginRight: isTablet ? -44 : -68,
                zIndex:10,
                position:'relative',
                filter:'drop-shadow(0 48px 96px rgba(0,0,0,0.35))',
              }}
            >
              <motion.div
                animate={{ y:[0,-10,0] }}
                transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut' }}
              >
                <PhoneShell
                  src="/Avilability.webp"
                  alt="Logezy Availability"
                  scale={isTablet ? 0.78 : 0.90}
                />
              </motion.div>
            </motion.div>

            {/* Desktop mockup */}
            <motion.div
              initial={{ opacity:0, y:50 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.90, delay:0.10, ease:EASE }}
              style={{
                flex:1, minWidth:0, position:'relative', zIndex:5,
                filter:'drop-shadow(0 32px 80px rgba(0,0,0,0.18))',
              }}
            >
              <DesktopChrome>
                <img src="/schedule.webp" alt="Logezy Schedule" loading="lazy" decoding="async" style={{ width:'100%', height:'auto', display:'block' }} />
              </DesktopChrome>

              {/* Floating cards — RIGHT side */}
              <div style={{ position:'absolute', right: isTablet ? -185 : -228, top:16, display:'flex', flexDirection:'column', gap:14, zIndex:20, pointerEvents:'none' }}>
                <ShiftFilledBadge />
                <WorkerAcceptedCard />
                <WorkersNotifiedCard />
              </div>
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
            <PhoneShell src="/Avilability.webp" alt="Logezy App" scale={0.72} />
          </motion.div>
        )}

        {/* Live pill — bottom centre */}
        {!isMobile && (
          <div style={{ display:'flex', justifyContent:'center', marginTop:28, paddingBottom:8, position:'relative', zIndex:6 }}>
            <LivePillBadge />
          </div>
        )}

      </div>

      {/* Bottom wave — hidden on mobile */}
      {!isMobile && (
        <div style={{ position:'relative', zIndex:4, lineHeight:0, marginTop: 16 }}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width:'100%', height:120, display:'block' }}>
            <path d="M0,80 C180,30 360,100 540,65 C720,30 900,95 1080,60 C1260,25 1380,75 1440,70 L1440,120 L0,120 Z" fill="rgba(25,102,170,0.35)" />
            <path d="M0,90 C200,50 400,110 600,75 C800,40 1000,100 1200,68 C1320,48 1400,88 1440,82 L1440,120 L0,120 Z" fill="rgba(35,153,202,0.25)" />
            <path d="M0,100 C240,55 480,115 720,80 C960,45 1200,105 1440,88 L1440,120 L0,120 Z" fill="#F7F6FF" />
          </svg>
        </div>
      )}
    </section>
  );
}
