/**
 * Hero.tsx — Premium SaaS hero with scroll-driven card-merge animation
 *
 * Layout
 * ──────
 * • Gradient bg · dot grid
 * • LEFT  cards (4, 252 px wide, 14 px gaps): TimesheetsHeader · TimesheetsDonut · TimesheetsStats · ShiftMiniAM
 * • RIGHT cards (4, 252 px wide, 14 px gaps): BirthdayCard · ShiftMiniJK · WorkerStatCard · CandidatesCard
 * • LEFT  outer edge  calc(50% - 656px)  ←→  RIGHT outer edge calc(50% + 656px)  [perfect mirror]
 * • CENTER: badge → H1 → subtitle → CTAs → social proof
 * • DASHBOARD: full-width image, no browser chrome — perspective tilt
 * • LOGOS: trusted-by marquee blended directly below dashboard
 *
 * Scroll-merge animation (via useScroll spring):
 *   0.14 → 0.70  Each card flies individually to its dashboard widget position
 *   0.40 → 0.70  Cards fade + scale down
 *   0.22 → 0.76  Dashboard rotateX eases 13° → 5°
 */

import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, Star,
  CalendarBlank, Clock, MapPin, Gift, Users,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;
const I = '#6366F1';

/* ─────────────────────────────────────────────────
   LOGO DATA (for inline trusted-by strip)
───────────────────────────────────────────────── */
const logos = [
  { src: '/medsolve.png',                 alt: 'Medsolve'      },
  { src: '/ansacare_logo.webp',           alt: 'Ansacare'      },
  { src: '/jayco_logo.png',               alt: 'Jayco'         },
  { src: '/primcura_healthcare_logo.png', alt: 'Primcura'      },
  { src: '/Leadcare_logo.png',            alt: 'Leadcare'      },
  { src: '/annicare_uk.png',              alt: 'Annicare UK'   },
  { src: '/ocean_logo.png',               alt: 'Ocean'         },
  { src: '/Staffnursing_logo.png',        alt: 'Staff Nursing' },
];
const LOGO_W   = 140;
const LOGO_GAP = 40;
const TRACK_W  = (LOGO_W + LOGO_GAP) * logos.length;
const tripled  = [...logos, ...logos, ...logos];

/* ─────────────────────────────────────────────────
   SHARED CARD SHELL
───────────────────────────────────────────────── */
const CardWrap = ({
  width, children, style,
}: { width: number; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: '#FFFFFF',
    borderRadius: 16,
    border: '1px solid rgba(226,232,240,0.85)',
    boxShadow: '0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
    width,
    overflow: 'hidden',
    ...style,
  }}>
    {children}
  </div>
);

const IB = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <div style={{ width: 32, height: 32, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════
   TIMESHEETS — SPLIT INTO 3 FLOATING PIECES
   Piece 1: Header (icon + title + date badge)
   Piece 2: Donut  (circle chart + legend)
   Piece 3: Stats  (4 colored tiles)
══════════════════════════════════════════════════ */

/** Piece 1 — compact header pill */
function TimesheetsHeaderCard() {
  return (
    <CardWrap width={252}>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: '#E0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock weight="regular" size={17} color="#06B6D4" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>Timesheets</p>
            <p style={{ margin: 0, fontSize: 9.5, color: '#94A3B8', marginTop: 2, lineHeight: 1.3 }}>Your Time, Your Transparency.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#EEF2FF', padding: '5px 9px', borderRadius: 8, flexShrink: 0 }}>
          <CalendarBlank weight="regular" size={10} color="#6366F1" />
          <span style={{ fontSize: 9.5, color: '#6366F1', fontWeight: 700, whiteSpace: 'nowrap' as const }}>May 18th</span>
        </div>
      </div>
    </CardWrap>
  );
}

/** Piece 2 — donut chart card */
function TimesheetsDonutCard() {
  const r = 37, sw = 14;
  const circ = 2 * Math.PI * r;
  const segs = [
    { pct: 0.12, color: '#06B6D4', startAngle: -90                   },  // teal  (top)
    { pct: 0.51, color: '#818CF8', startAngle: -90 + 43.2            },  // purple
    { pct: 0.37, color: '#FB923C', startAngle: -90 + 43.2 + 183.6   },  // orange
  ];
  const legend = [
    { color: '#06B6D4', label: 'Invoiced' },
    { color: '#818CF8', label: 'Pending'  },
    { color: '#FB923C', label: 'Approved' },
  ];
  return (
    <CardWrap width={210}>
      {/* donut */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0 10px' }}>
        <div style={{ position: 'relative', width: 148, height: 148 }}>
          <svg viewBox="0 0 100 100" width={148} height={148}>
            <circle cx="50" cy="50" r={r} fill="none" stroke="#F1F5F9" strokeWidth={sw} />
            {segs.map((s, i) => (
              <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={s.color}
                strokeWidth={sw}
                strokeDasharray={`${circ * s.pct} ${circ * (1 - s.pct)}`}
                strokeDashoffset={0} strokeLinecap="butt"
                transform={`rotate(${s.startAngle} 50 50)`} />
            ))}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 21, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1 }}>100%</span>
            <span style={{ fontSize: 8, color: '#94A3B8', marginTop: 2, fontWeight: 600 }}>utilised</span>
          </div>
        </div>
      </div>
      {/* colour legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '0 10px 12px' }}>
        {legend.map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 8, color: '#94A3B8', fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>
    </CardWrap>
  );
}

/** Piece 3 — stats row card */
function TimesheetsStatsCard() {
  const stats = [
    { val: '95.5', label: 'Total',    bg: '#EEF2FF', color: '#6366F1' },
    { val: '71.5', label: 'Pending',  bg: '#FFF7ED', color: '#F97316' },
    { val: '0',    label: 'Approved', bg: '#F0FDF4', color: '#16A34A' },
    { val: '24',   label: 'Invoiced', bg: '#E0F9FF', color: '#06B6D4' },
  ];
  return (
    <CardWrap width={252}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: '10px 10px 10px' }}>
        {stats.map(({ val, label, bg, color }) => (
          <div key={label} style={{ background: bg, borderRadius: 10, padding: '9px 3px', textAlign: 'center' as const }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color, lineHeight: 1 }}>{val}</p>
            <p style={{ margin: 0, fontSize: 8.5, color: '#94A3B8', marginTop: 3 }}>{label}</p>
          </div>
        ))}
      </div>
    </CardWrap>
  );
}

/* ══════════════════════════════════════════════════
   UPCOMING BIRTHDAYS CARD  (right · top)
══════════════════════════════════════════════════ */
function BirthdayCard() {
  return (
    <CardWrap width={252}>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 9 }}>
        <IB bg="#EEF2FF"><Gift weight="regular" size={16} color="#6366F1" /></IB>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Upcoming Birthdays</span>
      </div>
      <div style={{ height: 1, background: '#F1F5F9' }} />
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
        {/* Avatar — photo-style with gradient fallback */}
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #FBBF24 0%, #F87171 60%, #F472B6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 800, color: '#FFFFFF',
          border: '2px solid rgba(251,191,36,0.35)',
          boxShadow: '0 2px 8px rgba(248,113,113,0.28)',
        }}>AM</div>
        <div>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Amy Mitchell</p>
          <p style={{ margin: 0, fontSize: 10.5, color: '#94A3B8', marginTop: 2 }}>VIV1CA83</p>
        </div>
      </div>
      <div style={{ height: 1, background: '#F8FAFC', margin: '0 14px' }} />
      <div style={{ padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 600 }}>View all</span>
        <span style={{ color: '#6366F1', fontSize: 14, fontWeight: 700 }}>→</span>
      </div>
    </CardWrap>
  );
}

/* ══════════════════════════════════════════════════
   SHIFT MINI CARDS  (left · mid + lower)
══════════════════════════════════════════════════ */
interface ShiftMiniProps {
  initials: string; avatarBg: string; avatarColor: string;
  name: string; role: string;
  status: string; statusBg: string; statusColor: string;
  date: string; time: string; location: string;
}
function ShiftMiniCard({ initials, avatarBg, avatarColor, name, role, status, statusBg, statusColor, date, time, location }: ShiftMiniProps) {
  return (
    <CardWrap width={252}>
      <div style={{ padding: '10px 12px 11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: avatarBg, border: `1.5px solid ${avatarColor}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9.5, fontWeight: 800, color: avatarColor, flexShrink: 0,
            }}>{initials}</div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{name}</p>
              <p style={{ margin: 0, fontSize: 9.5, color: '#94A3B8' }}>{role}</p>
            </div>
          </div>
          <span style={{
            fontSize: 8.5, fontWeight: 700, padding: '2.5px 8px', borderRadius: 6,
            background: statusBg, color: statusColor, flexShrink: 0,
          }}>{status}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 38 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <CalendarBlank weight="regular" size={10} color="#94A3B8" />
            <span style={{ fontSize: 9.5, color: '#64748B' }}>{date}, {time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <MapPin weight="regular" size={10} color="#94A3B8" />
            <span style={{ fontSize: 9.5, color: '#64748B' }}>{location}</span>
          </div>
        </div>
      </div>
    </CardWrap>
  );
}
function ShiftMiniAM() {
  return <ShiftMiniCard
    initials="AM" avatarBg="rgba(253,230,138,0.65)" avatarColor="#B45309"
    name="Amy Mitchell" role="HCA"
    status="Pending" statusBg="#FEF3C7" statusColor="#D97706"
    date="Tue, May 19th" time="08:00 AM -08:00 PM" location="Test Unit"
  />;
}
function ShiftMiniJK() {
  return <ShiftMiniCard
    initials="JK" avatarBg="rgba(153,246,228,0.60)" avatarColor="#0D9488"
    name="Jake Kennedy" role="HCA"
    status="Invoiced" statusBg="#CCFBF1" statusColor="#0D9488"
    date="Tue, May 19th" time="08:00 AM -08:00 PM" location="Mora care"
  />;
}

/* ══════════════════════════════════════════════════
   CANDIDATES CARD  (right · lower-mid)  252px full card
══════════════════════════════════════════════════ */
function CandidatesCard() {
  return (
    <CardWrap width={252} style={{ padding: '13px 15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users weight="regular" size={18} color="#0D9488" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 9.5, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Candidates</p>
            <p style={{ margin: '2px 0 0', fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1 }}>71</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' as const }}>
          <span style={{ display: 'block', fontSize: 9.5, fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '3px 8px', borderRadius: 9, marginBottom: 4 }}>↑ 4.1%</span>
          <span style={{ fontSize: 9, color: '#94A3B8', fontWeight: 500 }}>this month</span>
        </div>
      </div>
    </CardWrap>
  );
}

/* ══════════════════════════════════════════════════
   SCHEDULE MINI CARD  (right · top)  252px
══════════════════════════════════════════════════ */
function ScheduleMiniCard() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const dates = [18,19,20,21,22,23,24];
  const shifts = [
    { initials:'JK', color:'#0D9488', bg:'rgba(153,246,228,0.55)', name:'Jake Kennedy', role:'HCA', time:'07:30–19:30', dot:'#10B981' },
    { initials:'AM', color:'#B45309', bg:'rgba(253,230,138,0.55)', name:'Amy Mitchell', role:'HCA', time:'08:00–20:00', dot:'#F59E0B' },
  ];
  return (
    <CardWrap width={252}>
      {/* Header */}
      <div style={{ padding:'11px 13px 9px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:'#EEF2FF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <CalendarBlank weight="regular" size={15} color="#6366F1" />
          </div>
          <div>
            <p style={{ margin:0, fontSize:12.5, fontWeight:700, color:'#0F172A', lineHeight:1.2 }}>Schedule</p>
            <p style={{ margin:0, fontSize:9, color:'#94A3B8', marginTop:1 }}>May 2026</p>
          </div>
        </div>
        <span style={{ fontSize:8.5, fontWeight:700, color:'#6366F1', background:'#EEF2FF', padding:'3px 8px', borderRadius:7 }}>Week</span>
      </div>
      <div style={{ height:1, background:'#F1F5F9' }} />
      {/* Mini calendar strip */}
      <div style={{ padding:'8px 10px 6px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
          {days.map(d => (
            <div key={d} style={{ textAlign:'center' as const, fontSize:7.5, fontWeight:700, color:'#94A3B8', paddingBottom:3 }}>{d}</div>
          ))}
          {dates.map((d,i) => {
            const active = d === 21;
            return (
              <div key={d} style={{
                textAlign:'center' as const, fontSize:10, fontWeight: active?800:600,
                padding:'4px 0', borderRadius:7,
                background: active ? '#6366F1' : 'transparent',
                color: active ? '#fff' : i>=5 ? '#F97316' : '#374151',
              }}>{d}</div>
            );
          })}
        </div>
        {/* Shift dots under selected day */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, marginTop:3 }}>
          {dates.map((d) => (
            <div key={d} style={{ display:'flex', justifyContent:'center', gap:2 }}>
              {d===21 && <div style={{ width:4, height:4, borderRadius:'50%', background:'#6366F1' }} />}
              {(d===19||d===23) && <div style={{ width:4, height:4, borderRadius:'50%', background:'#10B981' }} />}
            </div>
          ))}
        </div>
      </div>
      <div style={{ height:1, background:'#F1F5F9' }} />
      {/* Shift entries */}
      <div style={{ padding:'8px 12px 10px', display:'flex', flexDirection:'column' as const, gap:6 }}>
        {shifts.map(s => (
          <div key={s.initials} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:24, height:24, borderRadius:'50%', background:s.bg, border:`1.5px solid ${s.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:800, color:s.color, flexShrink:0 }}>{s.initials}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ margin:0, fontSize:10.5, fontWeight:700, color:'#0F172A', lineHeight:1.2 }}>{s.name}</p>
              <p style={{ margin:0, fontSize:8.5, color:'#94A3B8' }}>{s.role}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:s.dot, flexShrink:0 }} />
              <span style={{ fontSize:8.5, color:'#64748B', fontWeight:600, whiteSpace:'nowrap' as const }}>{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    </CardWrap>
  );
}

/* ══════════════════════════════════════════════════
   SHIFT FILL RATE CARD  (right · lower)  252px
══════════════════════════════════════════════════ */
function WorkerStatCard() {
  return (
    <CardWrap width={252} style={{ padding: '13px 15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Fill Rate</span>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '2px 7px', borderRadius: 9 }}>↑ 3.2%</span>
      </div>
      <p style={{ margin: '0 0 9px', fontSize: 27, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1 }}>94%</p>
      <div style={{ height: 5.5, borderRadius: 3, background: '#F1F5F9', marginBottom: 9 }}>
        <div style={{ width: '94%', height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #6366F1, #818CF8)' }} />
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[{ n: '347', l: 'Workers' }, { n: '89', l: 'Active' }].map(({ n, l }) => (
          <div key={l}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{n}</p>
            <p style={{ margin: 0, fontSize: 9.5, color: '#94A3B8' }}>{l}</p>
          </div>
        ))}
      </div>
    </CardWrap>
  );
}

/* ══════════════════════════════════════════════════
   FLOATING CARD WRAPPER  (entrance + bob)
══════════════════════════════════════════════════ */
interface FP {
  delay: number; fromX: number;
  floatY: number; floatDur: number; floatDelay: number;
  rotate: number; children: React.ReactNode;
}
function FC({ delay, fromX, floatY, floatDur, floatDelay, rotate, children }: FP) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.85, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, floatY, 0], rotate: [0, rotate, 0] }}
        transition={{
          y:      { delay: floatDelay, duration: floatDur,       repeat: Infinity, ease: 'easeInOut' },
          rotate: { delay: floatDelay, duration: floatDur * 1.1, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
export default function Hero() {
  const sRef = useRef<HTMLElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = sRef.current?.getBoundingClientRect();
    if (!r) return;
    setM({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  }, []);
  const onOut = useCallback(() => setM({ x: 0, y: 0 }), []);

  /* ── scroll spring ── */
  const { scrollYProgress } = useScroll({ target: sRef, offset: ['start start', 'end start'] });
  const sp = useSpring(scrollYProgress, { stiffness: 95, damping: 26, restDelta: 0.001 });

  const PHASE: [number, number] = [0.14, 0.70];

  /*
   *  Scroll-merge vectors — each card flies toward its nearest dashboard widget
   *
   *  LEFT  group  (Timesheets + ShiftMiniAM)  → merge right/down into dashboard
   *  RIGHT group  (Birthday + ShiftJK + WorkerStat + Candidates) → merge left/down
   *
   *  sbX/sbY  Timesheets pieces (all 3 share same vector)
   *  coX/coY  ShiftMiniAM
   *  buX/buY  CandidatesCard
   *  bdX/bdY  BirthdayCard
   *  caX/caY  ShiftMiniJK
   *  wsX/wsY  WorkerStatCard
   */
  const sbX = useTransform(sp, PHASE, [0,  880]);
  const sbY = useTransform(sp, PHASE, [0,  540]);
  const coX = useTransform(sp, PHASE, [0,  700]);
  const coY = useTransform(sp, PHASE, [0,  210]);
  const buX = useTransform(sp, PHASE, [0,  460]);
  const buY = useTransform(sp, PHASE, [0,  150]);
  const bdX = useTransform(sp, PHASE, [0, -180]);
  const bdY = useTransform(sp, PHASE, [0,  440]);
  const caX = useTransform(sp, PHASE, [0, -800]);
  const caY = useTransform(sp, PHASE, [0,  250]);
  const wsX = useTransform(sp, PHASE, [0, -820]);
  const wsY = useTransform(sp, PHASE, [0,  240]);

  /* shared fade + shrink */
  const cardOp = useTransform(sp, [0.40, 0.70], [1, 0]);
  const cardSc = useTransform(sp, PHASE, [1, 0.60]);

  /* center text parallax */
  const cy  = useTransform(sp, [0.10, 0.65], [0, -50]);
  const cop = useTransform(sp, [0.14, 0.60], [1,  0]);

  /* dashboard un-tilts slightly as cards merge */
  const dashRotX = useTransform(sp, [0.22, 0.76], [13, 5]);

  /* mouse parallax */
  const mp = (sx: number, sy: number): React.CSSProperties => ({
    transform: `translate(${m.x * sx}px, ${m.y * sy}px)`,
    transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
  });

  return (
    <section
      ref={sRef}
      onMouseMove={onMove}
      onMouseLeave={onOut}
      style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(148deg, #EEF2FF 0%, #FAFBFF 46%, #F0F9FF 100%)' }}
    >
      {/* ── Background blobs ── */}
      <div style={{ position: 'absolute', top: '-20%', right: '-14%', width: '58%', height: '70%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, rgba(14,165,233,0.07) 44%, transparent 70%)', filter: 'blur(88px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-12%', left: '-12%', width: '52%', height: '58%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.11) 0%, rgba(16,185,129,0.06) 50%, transparent 70%)', filter: 'blur(84px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '40%', height: '35%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.11) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 10%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 10%, transparent 100%)' }} />

      {/* ════════════════════════════════════════════════════════
          FLOATING CARDS — balanced 4 + 4 layout
          ─────────────────────────────────────────────────────
          All cards: 252 px wide  (DonutCard: 210 px, same left edge)
          LEFT  outer edge → calc(50% - 656px)
          RIGHT outer edge → calc(50% + 656px)   ← perfect mirror
          Vertical gap between every card: 14 px (consistent)

          LEFT stack (Timesheets group):                  h    ends
            TimesheetsHeaderCard  top  85               58    143
            TimesheetsDonutCard   top 157               196   353
            TimesheetsStatsCard   top 367                68   435
            ShiftMiniAM           top 449                88   537

          RIGHT stack (Workforce group):                  h    ends
            BirthdayCard          top  85               158   243
            ShiftMiniJK           top 257                88   345
            WorkerStatCard        top 359               120   479
            CandidatesCard        top 493                62   555
      ════════════════════════════════════════════════════════ */}

      {/* ── LEFT · Piece 1 — Timesheets Header ── */}
      <motion.div className="hidden xl:block" style={{ position: 'absolute', left: 'calc(50% - 656px)', top: 70, zIndex: 8, x: sbX, y: sbY, scale: cardSc, opacity: cardOp, pointerEvents: 'none' }}>
        <div style={mp(18, 10)}>
          <FC delay={0.50} fromX={-52} floatY={-8} floatDur={4.8} floatDelay={0.6} rotate={0.30}>
            <TimesheetsHeaderCard />
          </FC>
        </div>
      </motion.div>


      {/* ── LEFT · Piece 3 — Stats tiles ── */}
      <motion.div className="hidden xl:block" style={{ position: 'absolute', left: 'calc(50% - 656px)', top: 220, zIndex: 8, x: sbX, y: sbY, scale: cardSc, opacity: cardOp, pointerEvents: 'none' }}>
        <div style={mp(16, 9)}>
          <FC delay={0.70} fromX={-44} floatY={-7} floatDur={5.2} floatDelay={1.0} rotate={0.20}>
            <TimesheetsStatsCard />
          </FC>
        </div>
      </motion.div>

      {/* ── LEFT · Shift Mini AM ── */}
      <motion.div className="hidden xl:block" style={{ position: 'absolute', left: 'calc(50% - 656px)', top: 300, zIndex: 8, x: coX, y: coY, scale: cardSc, opacity: cardOp, pointerEvents: 'none' }}>
        <div style={mp(14, 8)}>
          <FC delay={0.80} fromX={-36} floatY={-8} floatDur={5.0} floatDelay={1.4} rotate={-0.30}>
            <ShiftMiniAM />
          </FC>
        </div>
      </motion.div>

      {/* ── RIGHT · Schedule mini card ── */}
      <motion.div className="hidden xl:block" style={{ position: 'absolute', left: 'calc(50% + 404px)', top: 70, zIndex: 8, x: wsX, y: wsY, scale: cardSc, opacity: cardOp, pointerEvents: 'none' }}>
        <div style={mp(-18, 11)}>
          <FC delay={0.55} fromX={56} floatY={-10} floatDur={4.8} floatDelay={0.5} rotate={-0.35}>
            <ScheduleMiniCard />
          </FC>
        </div>
      </motion.div>

      {/* ── RIGHT · Shift Mini JK ── */}
      <motion.div className="hidden xl:block" style={{ position: 'absolute', left: 'calc(50% + 404px)', top: 220, zIndex: 8, x: caX, y: caY, scale: cardSc, opacity: cardOp, pointerEvents: 'none' }}>
        <div style={mp(-14, 8)}>
          <FC delay={0.65} fromX={44} floatY={-9} floatDur={4.6} floatDelay={1.0} rotate={0.30}>
            <ShiftMiniJK />
          </FC>
        </div>
      </motion.div>

      {/* ── RIGHT · Candidates ── */}
      <motion.div className="hidden xl:block" style={{ position: 'absolute', left: 'calc(50% + 404px)', top: 330, zIndex: 8, x: buX, y: buY, scale: cardSc, opacity: cardOp, pointerEvents: 'none' }}>
        <div style={mp(-9, 6)}>
          <FC delay={0.85} fromX={28} floatY={-6} floatDur={4.4} floatDelay={1.6} rotate={0.20}>
            <CandidatesCard />
          </FC>
        </div>
      </motion.div>

      {/* ════════════════════════════════════
          CENTER CONTENT
      ════════════════════════════════════ */}
      <motion.div style={{ y: cy, opacity: cop, position: 'relative', zIndex: 10 }}>
        <div style={{ paddingTop: 108 }}>
          <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto', padding: '0 28px 60px' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.06, duration: 0.65, ease: EASE }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '5px 16px 5px 7px', borderRadius: 100, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.24)', boxShadow: '0 2px 22px rgba(99,102,241,0.12)' }}
            >
              <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 10px', borderRadius: 20, background: `linear-gradient(135deg, ${I} 0%, #818CF8 100%)`, color: '#fff', letterSpacing: '0.08em' }}>NEW</span>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Built for UK temp staffing agencies</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.92, ease: EASE }}
              style={{ fontSize: 'clamp(2.1rem, 5.2vw, 3.85rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.048em', color: '#0F172A', margin: '0 0 18px' }}
            >
              The smarter way to{' '}
              <span style={{ color: '#6366F1', display: 'inline'}}>
                run your agency.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.86, ease: EASE }}
              style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', lineHeight: 1.80, color: '#64748B', maxWidth: 490, margin: '0 auto 32px' }}
            >
              Scheduling, compliance, timesheets &amp; payroll — all in one platform designed for UK staffing agencies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.30, duration: 0.78, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}
            >
              <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', borderRadius: 14, textDecoration: 'none', background: `linear-gradient(135deg, ${I} 0%, #818CF8 100%)`, color: '#fff', fontSize: 14.5, fontWeight: 700, boxShadow: `0 6px 30px rgba(99,102,241,0.42), 0 2px 8px rgba(99,102,241,0.22)` }}>
                  Start Free Trial <ArrowRight weight="regular" style={{ width: 15, height: 15 }} />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, cursor: 'pointer', background: '#FFFFFF', border: '1px solid rgba(99,102,241,0.22)', color: '#374151', fontSize: 14, fontWeight: 600, boxShadow: '0 2px 18px rgba(0,0,0,0.07)', textDecoration: 'none' }}>
                  Book a Demo
                </a>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.60, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[...Array(5)].map((_, i) => <Star key={i} weight="regular" style={{ width: 13, height: 13, color: '#FBBF24' }} />)}
                <span style={{ marginLeft: 5, fontSize: 12.5, color: '#1E293B', fontWeight: 700 }}>4.9 / 5</span>
              </div>
              <div style={{ width: 1, height: 14, background: '#E2E8F0' }} />
              <span style={{ fontSize: 12, color: '#64748B' }}><span style={{ fontWeight: 700, color: '#0F172A' }}>600+</span> UK agencies</span>
              <div style={{ width: 1, height: 14, background: '#E2E8F0' }} />
              <span style={{ fontSize: 12, color: '#64748B' }}><span style={{ fontWeight: 700, color: '#0F172A' }}>98.7%</span> compliance rate</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════
          DASHBOARD — no browser chrome
          Just the screenshot with top rounded corners
          + perspective tilt that eases on scroll
      ════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.50, duration: 1.18, ease: EASE }}
        style={{ position: 'relative', zIndex: 6, padding: '0 32px 0' }}
      >
        {/* Glow halo */}
        <div style={{ position: 'absolute', top: -120, left: '5%', right: '5%', height: 240, background: 'radial-gradient(ellipse, rgba(99,102,241,0.24) 0%, rgba(14,165,233,0.10) 48%, transparent 72%)', filter: 'blur(58px)', pointerEvents: 'none', zIndex: -1 }} />

        <div style={{ maxWidth: 1380, margin: '0 auto', position: 'relative' }}>
          {/* perspective wrapper */}
          <div style={{ perspective: 1800, perspectiveOrigin: 'top center' }}>
            <motion.div style={{ rotateX: dashRotX, transformOrigin: 'top center', willChange: 'transform' }}>
              <div style={{
                borderRadius: '18px 18px 0 0',
                overflow: 'hidden',
                boxShadow: [
                  '0 0 0 1px rgba(99,102,241,0.20)',
                  '0 -4px 0 rgba(99,102,241,0.24)',
                  '0 60px 180px rgba(99,102,241,0.24)',
                  '0 30px 80px rgba(0,0,0,0.18)',
                ].join(', '),
              }}>
                <img
                  src="/dashboard_v2.png"
                  alt="Logezy Dashboard"
                  style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── Floating phone mockup — matches dashboard border style ── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 1.0, ease: EASE }}
            style={{ position: 'absolute', right: -28, top: -100, zIndex: 20, pointerEvents: 'none' }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Phone container — same indigo border/shadow as dashboard */}
              <div style={{
                position: 'relative',
                userSelect: 'none',
                width: 240,
                borderRadius: 44,
                overflow: 'hidden',
                boxShadow: [
                  '0 0 0 1px rgba(99,102,241,0.28)',
                  '0 -4px 0 rgba(99,102,241,0.20)',
                  '0 60px 160px rgba(99,102,241,0.28)',
                  '0 30px 80px rgba(0,0,0,0.22)',
                ].join(', '),
              }}>
                {/* Side buttons — subtle, same colour tone as frame */}
                <div style={{ position:'absolute', left:-3, top:96, width:3, height:28,
                  background:'rgba(99,102,241,0.35)', borderRadius:'3px 0 0 3px' }} />
                <div style={{ position:'absolute', left:-3, top:138, width:3, height:52,
                  background:'rgba(99,102,241,0.35)', borderRadius:'3px 0 0 3px' }} />
                <div style={{ position:'absolute', right:-3, top:154, width:3, height:64,
                  background:'rgba(99,102,241,0.35)', borderRadius:'0 3px 3px 0' }} />

                {/* Thin indigo border frame */}
                <div style={{
                  background: 'linear-gradient(160deg,rgba(99,102,241,0.18) 0%,rgba(129,140,248,0.10) 50%,rgba(14,165,233,0.12) 100%)',
                  padding: 3,
                  borderRadius: 44,
                }}>
                  <div style={{ borderRadius: 42, overflow: 'hidden', position: 'relative', background: '#fff' }}>
                    <img
                      src="/mobile_app_main_screen.jpeg"
                      alt="Logezy Mobile App"
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'top' }}
                    />
                    {/* Dynamic Island */}
                    <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)',
                      width:96, height:28, background:'#000', borderRadius:16, zIndex:10 }} />
                    {/* Screen glare */}
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20, borderRadius:42,
                      background:'linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 40%)' }} />
                  </div>
                </div>
              </div>

              {/* Glow halo matching dashboard */}
              <div style={{ position:'absolute', inset:-40, borderRadius:'50%',
                background:'radial-gradient(ellipse,rgba(99,102,241,0.22) 0%,transparent 65%)',
                filter:'blur(28px)', zIndex:-1, pointerEvents:'none' }} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════
          TRUSTED BY — blended directly below dashboard
          No background change, no border — same hero gradient
      ════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 6, padding: '44px 0 52px', overflow: 'hidden' }}>

        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 100, background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Marquee */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Left fade — matches hero gradient start */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 130, background: 'linear-gradient(90deg, #EEF2FF 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
          {/* Right fade */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 130, background: 'linear-gradient(-90deg, #F0F9FF 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />

          <motion.div
            animate={{ x: [0, -TRACK_W] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', alignItems: 'center', gap: LOGO_GAP, width: 'max-content', padding: '4px 0' }}
          >
            {tripled.map((logo, i) => (
              <div key={`${logo.alt}-${i}`} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: LOGO_W }}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable={false}
                  style={{ maxHeight: 44, width: 'auto', maxWidth: LOGO_W, objectFit: 'contain', opacity: 1, filter: 'none', userSelect: 'none', pointerEvents: 'none', display: 'block' } as React.CSSProperties}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>

    </section>
  );
}
