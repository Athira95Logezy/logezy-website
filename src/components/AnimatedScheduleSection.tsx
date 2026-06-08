import React from 'react';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../hooks/useWindowWidth';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   PHONE SHELL — realistic iPhone 15 Pro (dark titanium)
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

      {/* Left side buttons */}
      <div style={{ position:'absolute', left:-4, top:Math.round(122*scale), width:4, height:Math.round(34*scale),
        background:'linear-gradient(to left,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'3px 0 0 3px',
        boxShadow:'-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position:'absolute', left:-4, top:Math.round(178*scale), width:4, height:Math.round(62*scale),
        background:'linear-gradient(to left,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'3px 0 0 3px',
        boxShadow:'-2px 0 5px rgba(0,0,0,0.45)' }} />
      <div style={{ position:'absolute', left:-4, top:Math.round(256*scale), width:4, height:Math.round(62*scale),
        background:'linear-gradient(to left,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'3px 0 0 3px',
        boxShadow:'-2px 0 5px rgba(0,0,0,0.45)' }} />
      {/* Right power button */}
      <div style={{ position:'absolute', right:-4, top:Math.round(192*scale), width:4, height:Math.round(84*scale),
        background:'linear-gradient(to right,#6E6E73,#9E9EA3,#6E6E73)', borderRadius:'0 3px 3px 0',
        boxShadow:'2px 0 5px rgba(0,0,0,0.45)' }} />

      {/* Titanium frame */}
      <div style={{
        width: W, height: H, borderRadius: R,
        background: 'linear-gradient(160deg,#2C2C2E 0%,#3A3A3C 22%,#2A2A2C 46%,#323234 72%,#2C2C2E 100%)',
        padding: Math.round(3*scale),
        boxShadow: [
          '0 64px 150px rgba(0,0,0,0.80)',
          '0 24px 60px rgba(0,0,0,0.50)',
          '0 8px 20px rgba(0,0,0,0.30)',
          '0 0 0 0.5px rgba(255,255,255,0.15)',
          'inset 0 1px 0 rgba(255,255,255,0.20)',
          'inset 0 -1px 0 rgba(0,0,0,0.30)',
        ].join(','),
        position: 'relative',
      }}>
        {/* Inner screen */}
        <div style={{ width:'100%', height:'100%', borderRadius:Ri, background:'#000', overflow:'hidden', position:'relative' }}>
          <img src={src} alt={alt}
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }} />
          {/* Dynamic Island */}
          <div style={{ position:'absolute', top:Math.round(14*scale), left:'50%', transform:'translateX(-50%)',
            width:Math.round(126*scale), height:Math.round(36*scale),
            background:'#000', borderRadius:Math.round(20*scale), zIndex:10 }} />
          {/* Specular glare top-left */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20, borderRadius:Ri,
            background:'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,transparent 40%)' }} />
        </div>
      </div>

      {/* Cyan ambient glow */}
      <div style={{ position:'absolute', inset:-44, borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(56,189,248,0.18) 0%,transparent 68%)',
        filter:'blur(32px)', zIndex:-1, pointerEvents:'none' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SINGLE PHONE — Avilability.jpeg
───────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <PhoneShell
      src="/Avilability.jpeg"
      alt="Availability screen"
      scale={1}
      style={{
        transform: 'perspective(1200px) rotateX(1.5deg)',
        filter: 'drop-shadow(0 44px 100px rgba(0,0,0,0.60)) drop-shadow(0 0 40px rgba(0,212,255,0.16))',
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   SHIFT BLOCK
───────────────────────────────────────────── */
function ShiftBlock({ name, role, time, color, textColor, borderColor }: {
  name: string; role: string; time: string;
  color: string; textColor: string; borderColor: string;
}) {
  return (
    <div style={{
      background: color, border: `1px solid ${borderColor}`,
      borderRadius: 6, padding: '4px 6px', minWidth: 0, overflow:'hidden', position:'relative',
    }}>
      <div style={{ position:'absolute', top:0, left:0, bottom:0, width:3, background: borderColor, borderRadius:'3px 0 0 3px' }} />
      <div style={{ paddingLeft:6 }}>
        <div style={{ fontSize:8.5, fontWeight:800, color: textColor, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:3, marginTop:1 }}>
          <span style={{ fontSize:7.5, fontWeight:700, color: textColor, opacity:0.8 }}>{role}</span>
        </div>
        <div style={{ fontSize:7.5, color: textColor, opacity:0.7, marginTop:1 }}>{time}</div>
      </div>
      <div style={{ position:'absolute', top:3, right:3, width:12, height:12, borderRadius:'50%', background:'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize:6, color:'#EF4444', fontWeight:900 }}>✕</span>
      </div>
    </div>
  );
}

function PlusCell() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:44 }}>
      <div style={{ width:20, height:20, borderRadius:'50%', border:'1.5px solid #D1D5DB', display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF', fontSize:14, cursor:'pointer' }}>+</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP MOCKUP — static Job Schedule
───────────────────────────────────────────── */
function DesktopMockup() {
  return (
    <div style={{
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.14), 0 28px 80px rgba(0,0,0,0.60), 0 0 80px rgba(90,180,213,0.20)',
      transform: 'perspective(1600px) rotateY(-3deg) rotateX(1.5deg)',
      transformOrigin: 'center top',
    }}>
      <img
        src="/schedule.png"
        alt="Logezy Schedule"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   GEOMETRIC DECORATIONS
───────────────────────────────────────────── */
function GeometricShapes() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
      {/* Dot grid top-left */}
      {Array.from({length:6}).map((_,r) => Array.from({length:8}).map((_2,c) => (
        <div key={`${r}-${c}`} style={{ position:'absolute', left: 24+c*18, top: 24+r*18, width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.18)' }} />
      )))}
      {/* Dot grid top-right */}
      {Array.from({length:4}).map((_,r) => Array.from({length:5}).map((_2,c) => (
        <div key={`tr-${r}-${c}`} style={{ position:'absolute', right: 20+c*18, top: 16+r*18, width:3, height:3, borderRadius:'50%', background:'rgba(255,255,255,0.15)' }} />
      )))}
      {/* Hollow circle top-right */}
      <svg style={{ position:'absolute', top:'6%', right:'8%', opacity:0.55 }} width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
      {/* Hollow circle bottom-right */}
      <svg style={{ position:'absolute', bottom:'20%', right:'4%', opacity:0.45 }} width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="13" stroke="#5AB4D5" strokeWidth="1.6" fill="none" />
      </svg>
      {/* Diamond top-center */}
      <svg style={{ position:'absolute', top:'4%', left:'46%', opacity:0.55 }} width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="11" y="1.5" width="13" height="13" rx="1" transform="rotate(45 11 11)" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
      {/* Triangle bottom-left */}
      <svg style={{ position:'absolute', bottom:'22%', left:'3%', opacity:0.55 }} width="28" height="25" viewBox="0 0 28 25" fill="none">
        <path d="M14 2L26 23H2L14 2Z" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION EXPORT
───────────────────────────────────────────── */
export default function AnimatedScheduleSection() {
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  return (
    <section style={{
      background: 'linear-gradient(135deg,#183765 0%,#1966AA 40%,#2E8FBF 70%,#5AB4D5 100%)',
      padding: isMobile ? '60px 16px 0' : '100px 0 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative shapes */}
      <GeometricShapes />

      {/* Center glow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:900, height:500, background:'radial-gradient(ellipse,rgba(90,180,213,0.22) 0%,transparent 68%)', filter:'blur(80px)', pointerEvents:'none' }} />

      {/* Dot grid overlay */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />

      <div style={{ position:'relative', zIndex:3, maxWidth:1440, margin:'0 auto', padding: isMobile ? '0' : '0 32px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.65, ease:EASE }}
          style={{ textAlign:'center', marginBottom:52 }}
        >
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 16px', borderRadius:100, marginBottom:20, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)' }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:'#00D4FF' }} />
            <span style={{ fontSize:10.5, fontWeight:800, color:'#fff', letterSpacing:'0.10em', textTransform:'uppercase' as const }}>Live Workflow</span>
          </div>
          <h2 style={{ fontSize:'clamp(2rem,3.5vw,3.2rem)', fontWeight:900, color:'#fff', letterSpacing:'-0.045em', lineHeight:1.08, margin:'0 0 16px' }}>
            All smart work tools{' '}
            <span style={{ color:'#00D4FF' }}>in one place.</span>
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.65)', lineHeight:1.72, maxWidth:500, margin:'0 auto 24px' }}>
            Manage schedules, workers, compliance and bookings — all from a single connected platform.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:6, flexWrap:'wrap' as const }}>
            {[
              { n:'1', label:'Post shifts instantly', color:'#FF6B6B' },
              { n:'2', label:'Notify workers',        color:'#00D4FF' },
              { n:'3', label:'Track compliance',      color:'#C084FC' },
              { n:'4', label:'Get confirmations',     color:'#34D399' },
            ].map(s => (
              <div key={s.n} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 14px', borderRadius:100, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)' }}>
                <div style={{ width:18,height:18,borderRadius:'50%',background:'rgba(255,255,255,0.18)',border:`1px solid ${s.color}80`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:800,color:s.color }}>{s.n}</div>
                <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.90)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phone + Desktop */}
        {!isMobile && (
          <div style={{ display:'flex', alignItems:'flex-start', gap:0, position:'relative' }}>

            {/* Phone */}
            <motion.div
              initial={{ opacity:0, x:-28, y:20 }} whileInView={{ opacity:1, x:0, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.72, delay:0.30, ease:EASE }}
              style={{ flexShrink:0, marginTop:40, marginRight:-56, zIndex:8, position:'relative',
                filter:'drop-shadow(0 24px 60px rgba(0,0,0,0.45)) drop-shadow(0 0 40px rgba(0,212,255,0.18))',
              }}
            >
              <PhoneMockup />
            </motion.div>

            {/* Desktop */}
            <motion.div
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.85, delay:0.10, ease:EASE }}
              style={{ flex:1, minWidth:0, position:'relative', zIndex:5 }}
            >
              <DesktopMockup />
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
            <div style={{ transform:'scale(0.88)', transformOrigin:'top center' }}>
              <PhoneMockup />
            </div>
          </motion.div>
        )}

      </div>

      {/* Bottom wave */}
      <div style={{ position:'relative', zIndex:4, lineHeight:0, marginTop: isMobile ? 8 : 12 }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width:'100%', height:120, display:'block' }}>
          <path d="M0,80 C180,30 360,100 540,65 C720,30 900,95 1080,60 C1260,25 1380,75 1440,70 L1440,120 L0,120 Z" fill="rgba(25,102,170,0.35)" />
          <path d="M0,90 C200,50 400,110 600,75 C800,40 1000,100 1200,68 C1320,48 1400,88 1440,82 L1440,120 L0,120 Z" fill="rgba(35,153,202,0.25)" />
          <path d="M0,100 C240,55 480,115 720,80 C960,45 1200,105 1440,88 L1440,120 L0,120 Z" fill="#F7F6FF" />
        </svg>
      </div>
    </section>
  );
}
