import React from 'react';
import { motion } from 'framer-motion';

const E: [number, number, number, number] = [0.22, 1, 0.36, 1];

const shell: React.CSSProperties = {
  background: '#F4F7FC',
  height: '100%',
  minHeight: 290,
  padding: '14px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 9,
  fontFamily: 'var(--font-body)',
};
const wCard: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 10,
  border: '1px solid #E8ECF4',
  overflow: 'hidden',
};
const pill = (color: string): React.CSSProperties => ({
  fontSize: 8.5, fontWeight: 700, color,
  background: color + '14', border: `1px solid ${color}28`,
  padding: '2px 8px', borderRadius: 20, whiteSpace: 'nowrap',
});
const Chip = ({ label, color }: { label: string; color: string }) => (
  <span style={pill(color)}>{label}</span>
);

/* ── 1. SCHEDULING ─────────────────────────────────────────────────────── */
export function SchedulingIll({ c }: { c: string }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const rows = [
    { n: 'J. Davies', col: c,        s: [1,0,1,0,1] },
    { n: 'S. Ahmed',  col: '#10B981', s: [0,1,1,0,0] },
    { n: 'M. Brown',  col: '#F59E0B', s: [1,1,0,1,0] },
    { n: 'E. Khan',   col: '#EC4899', s: [0,0,1,1,1] },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Weekly Schedule</span>
        <div style={{ display:'flex', gap:5 }}>
          <div style={{ fontSize:8.5, color:'#64748B', background:'#F1F5F9', border:'1px solid #E2E8F0', padding:'3px 8px', borderRadius:5 }}>3–9 Feb 2025</div>
          <div style={{ fontSize:8.5, fontWeight:700, color:'#fff', background:c, padding:'3px 10px', borderRadius:5 }}>Publish</div>
        </div>
      </div>
      <div style={{ ...wCard, flex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'66px repeat(5,1fr)', borderBottom:'1px solid #F1F5F9', background:'#FAFBFD' }}>
          <div style={{ padding:'6px 8px', fontSize:8, color:'#94A3B8', fontWeight:700 }}>WORKER</div>
          {days.map(d => <div key={d} style={{ padding:'6px 0', fontSize:8.5, fontWeight:700, color:'#475569', textAlign:'center', borderLeft:'1px solid #F1F5F9' }}>{d}</div>)}
        </div>
        {rows.map((row, ri) => (
          <div key={row.n} style={{ display:'grid', gridTemplateColumns:'66px repeat(5,1fr)', borderBottom: ri<rows.length-1 ? '1px solid #F8FAFC':'none', minHeight:46 }}>
            <div style={{ padding:'0 8px', fontSize:9, fontWeight:600, color:'#475569', display:'flex', alignItems:'center', borderRight:'1px solid #F1F5F9' }}>{row.n}</div>
            {row.s.map((s,ci) => (
              <div key={ci} style={{ borderLeft:'1px solid #F8FAFC', padding:'4px 3px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {s===1 && (
                  <motion.div initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} transition={{ delay:ri*0.10+ci*0.05, duration:0.28, ease:E }}
                    style={{ width:'100%', padding:'4px 2px', borderRadius:5, background:row.col+'18', border:`1.5px solid ${row.col}40`, textAlign:'center' }}>
                    <div style={{ fontSize:7.5, fontWeight:700, color:row.col }}>09–17</div>
                    <div style={{ fontSize:7, color:row.col, opacity:0.7 }}>8 hrs</div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }} style={{ display:'flex', gap:8 }}>
        <Chip label="47 / 52 shifts filled" color={c} />
        <Chip label="94% fill rate ↑" color="#059669" />
      </motion.div>
    </div>
  );
}

/* ── 2. TIMESHEETS ──────────────────────────────────────────────────────── */
export function TimesheetsIll({ c }: { c: string }) {
  const workers = [
    { n:'Lisa Patel',    hrs:'37.5', status:'Approved' },
    { n:'Tom Harris',   hrs:'40.0', status:'Approved' },
    { n:'Amy Chen',     hrs:'35.5', status:'Pending'  },
    { n:'Jack Moore',   hrs:'42.0', status:'Approved' },
    { n:'Priya Singh',  hrs:'38.0', status:'Pending'  },
  ];
  const statColor = (s: string) => s === 'Approved' ? '#059669' : '#D97706';
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Timesheet Approvals</span>
        <Chip label="Week 6, Feb 2025" color={c} />
      </div>
      <div style={{ ...wCard, flex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 60px 80px', borderBottom:'1px solid #F1F5F9', background:'#FAFBFD', padding:'6px 12px' }}>
          {['Worker','Hours','Status'].map(h => <div key={h} style={{ fontSize:8, fontWeight:700, color:'#94A3B8' }}>{h}</div>)}
        </div>
        {workers.map((w, i) => (
          <motion.div key={w.n} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.09, duration:0.3, ease:E }}
            style={{ display:'grid', gridTemplateColumns:'1fr 60px 80px', padding:'8px 12px', borderBottom:i<workers.length-1?'1px solid #F8FAFC':'none', alignItems:'center' }}>
            <div style={{ fontSize:10, fontWeight:600, color:'#1E293B' }}>{w.n}</div>
            <div style={{ fontSize:10, fontWeight:700, color:'#183963' }}>{w.hrs}</div>
            <Chip label={w.status} color={statColor(w.status)} />
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        style={{ display:'flex', gap:8 }}>
        <Chip label="Total: 193 hrs" color={c} />
        <Chip label="3 Approved · 2 Pending" color="#475569" />
      </motion.div>
    </div>
  );
}

/* ── 3. COMPLIANCE ──────────────────────────────────────────────────────── */
export function ComplianceIll({ c }: { c: string }) {
  const items = ['DBS Certificate valid', 'Right-to-Work checked', 'Mandatory training complete', 'CQC registration active'];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Compliance Dashboard</span>
        <Chip label="Audit Ready" color={c} />
      </div>
      {/* Circular score */}
      <div style={{ ...wCard, padding:'18px 16px', display:'flex', alignItems:'center', gap:18 }}>
        <div style={{ position:'relative', width:72, height:72, flexShrink:0 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#F1F5F9" strokeWidth="7" />
            <motion.circle cx="36" cy="36" r="28" fill="none" stroke={c} strokeWidth="7"
              strokeLinecap="round" strokeDasharray={175.9} strokeDashoffset={175.9}
              initial={{ strokeDashoffset: 175.9 }}
              animate={{ strokeDashoffset: 175.9 * 0.016 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
              style={{ transform:'rotate(-90deg)', transformOrigin:'center' }} />
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:14, fontWeight:900, color:'#183963', lineHeight:1 }}>98%</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:800, color:'#183963', marginBottom:3 }}>98.4% Compliant</div>
          <div style={{ fontSize:10, color:'#64748B' }}>All workers checked · 0 overdue</div>
        </div>
      </div>
      {/* Checklist */}
      <div style={{ ...wCard, padding:'12px 14px', display:'flex', flexDirection:'column', gap:8 }}>
        {items.map((item, i) => (
          <motion.div key={item} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4+i*0.12, duration:0.3, ease:E }}
            style={{ display:'flex', alignItems:'center', gap:9 }}>
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.55+i*0.12, type:'spring', stiffness:400 }}
              style={{ width:18, height:18, borderRadius:'50%', background:c+'14', border:`1.5px solid ${c}35`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </motion.div>
            <span style={{ fontSize:10, fontWeight:500, color:'#334155' }}>{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 4. INVOICING ───────────────────────────────────────────────────────── */
export function InvoicingIll({ c }: { c: string }) {
  const lines = [
    { desc:'Nursing Staff, Week 5 (12 shifts)', amt:'£2,880' },
    { desc:'Healthcare Support, Week 5 (8 shifts)', amt:'£1,440' },
    { desc:'Emergency Cover, 3 nights', amt:'£840' },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Invoice Preview</span>
        <Chip label="Auto-Generated" color={c} />
      </div>
      <div style={{ ...wCard, flex:1, padding:'14px 16px', position:'relative' }}>
        {/* Invoice header */}
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, paddingBottom:10, borderBottom:'1px solid #F1F5F9' }}>
          <div>
            <div style={{ fontSize:10.5, fontWeight:800, color:'#183963' }}>INV-2025-0142</div>
            <div style={{ fontSize:9, color:'#64748B', marginTop:2 }}>NHS Trust North London</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:9, color:'#64748B' }}>Date: 3 Feb 2025</div>
            <div style={{ fontSize:9, color:'#64748B' }}>Due: 17 Feb 2025</div>
          </div>
        </div>
        {/* Line items */}
        {lines.map((l, i) => (
          <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.14, duration:0.3, ease:E }}
            style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid #F8FAFC' }}>
            <span style={{ fontSize:9.5, color:'#475569', flex:1, paddingRight:12 }}>{l.desc}</span>
            <span style={{ fontSize:10, fontWeight:700, color:'#183963', flexShrink:0 }}>{l.amt}</span>
          </motion.div>
        ))}
        {/* Total */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
          style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10, padding:'8px 10px', borderRadius:8, background:c+'0D', border:`1px solid ${c}25` }}>
          <span style={{ fontSize:10.5, fontWeight:700, color:'#183963' }}>Total</span>
          <span style={{ fontSize:14, fontWeight:900, color:c }}>£5,160</span>
        </motion.div>
        {/* PAID stamp */}
        <motion.div initial={{ opacity:0, scale:1.4, rotate:15 }} animate={{ opacity:1, scale:1, rotate:-8 }} transition={{ delay:1.0, type:'spring', stiffness:240, damping:18 }}
          style={{ position:'absolute', top:12, right:14, padding:'5px 10px', border:`2.5px solid #059669`, borderRadius:6, color:'#059669', fontSize:13, fontWeight:900, letterSpacing:'0.06em', opacity:0.85 }}>
          PAID
        </motion.div>
      </div>
    </div>
  );
}

/* ── 5. REPORTS ─────────────────────────────────────────────────────────── */
export function ReportsIll({ c }: { c: string }) {
  const bars = [62, 78, 55, 90, 84, 72];
  const months = ['Sep','Oct','Nov','Dec','Jan','Feb'];
  const kpis = [{ label:'Revenue', val:'£124.8k', delta:'+12%' }, { label:'Fill Rate', val:'94%', delta:'+3%' }, { label:'Workers', val:'312', delta:'+18' }];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Agency Performance</span>
        <div style={{ display:'flex', gap:4 }}>
          {['Week','Month','Year'].map((p, i) => (
            <div key={p} style={{ fontSize:8.5, padding:'2px 8px', borderRadius:5, background:i===1?c:'#F1F5F9', color:i===1?'#fff':'#64748B', fontWeight:i===1?700:500 }}>{p}</div>
          ))}
        </div>
      </div>
      {/* KPI row */}
      <div style={{ display:'flex', gap:6 }}>
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1, duration:0.3, ease:E }}
            style={{ flex:1, ...wCard, padding:'8px 10px' }}>
            <div style={{ fontSize:8, color:'#94A3B8', fontWeight:600 }}>{k.label}</div>
            <div style={{ fontSize:13, fontWeight:900, color:'#183963', margin:'2px 0' }}>{k.val}</div>
            <div style={{ fontSize:8.5, fontWeight:700, color:'#059669' }}>{k.delta}</div>
          </motion.div>
        ))}
      </div>
      {/* Bar chart */}
      <div style={{ ...wCard, flex:1, padding:'12px 14px 8px', display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:9, fontWeight:600, color:'#94A3B8', marginBottom:8 }}>Monthly Revenue (£k)</div>
        <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:6 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <div style={{ width:'100%', position:'relative', display:'flex', alignItems:'flex-end', height:90 }}>
                <motion.div
                  initial={{ height:0 }} animate={{ height:`${b}%` }}
                  transition={{ delay:0.3+i*0.08, duration:0.55, ease:'easeOut' }}
                  style={{ width:'100%', borderRadius:'4px 4px 0 0', background:`linear-gradient(180deg, ${c}CC 0%, ${c} 100%)` }}
                />
              </div>
              <span style={{ fontSize:7.5, color:'#94A3B8', fontWeight:600 }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 6. MOBILE APP ──────────────────────────────────────────────────────── */
export function MobileAppIll({ c }: { c: string }) {
  const shifts = [
    { title:'Day Shift, NHS North', time:'09:00–17:00', date:'Mon 3 Feb', status:'Confirmed' },
    { title:'Night Cover, Care Home', time:'20:00–08:00', date:'Tue 4 Feb', status:'Pending'  },
    { title:'Weekend Support', time:'08:00–16:00', date:'Sat 8 Feb', status:'Confirmed' },
  ];
  return (
    <div style={{ ...shell, alignItems:'center', justifyContent:'center', background:'linear-gradient(160deg, #F0F4FF 0%, #F8FAFC 100%)' }}>
      {/* Phone frame */}
      <div style={{ width:190, background:'#1C2333', borderRadius:28, padding:'10px 8px', boxShadow:'0 20px 50px rgba(0,0,0,0.22)', position:'relative' }}>
        {/* Notch */}
        <div style={{ width:60, height:8, background:'#183963', borderRadius:20, margin:'0 auto 8px' }} />
        {/* Screen */}
        <div style={{ background:'#FFFFFF', borderRadius:20, overflow:'hidden' }}>
          {/* App header */}
          <div style={{ background:c, padding:'10px 12px 12px' }}>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>Good morning,</div>
            <div style={{ fontSize:12, color:'white', fontWeight:800 }}>Sarah Ahmed 👋</div>
          </div>
          {/* Shift cards */}
          <div style={{ padding:'10px 8px', display:'flex', flexDirection:'column', gap:6 }}>
            {shifts.map((s, i) => (
              <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3+i*0.12, duration:0.3, ease:E }}
                style={{ background:'#F8FAFC', borderRadius:8, padding:'7px 9px', borderLeft:`3px solid ${s.status==='Confirmed'?c:'#F59E0B'}` }}>
                <div style={{ fontSize:8.5, fontWeight:700, color:'#183963' }}>{s.title}</div>
                <div style={{ fontSize:7.5, color:'#64748B', marginTop:2 }}>{s.time} · {s.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Push notification */}
      <motion.div
        initial={{ opacity:0, y:-30, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }}
        transition={{ delay:1.1, duration:0.45, ease:E }}
        style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', background:'white', borderRadius:12, padding:'8px 12px', boxShadow:'0 8px 32px rgba(0,0,0,0.14)', border:'1px solid #E8ECF4', display:'flex', alignItems:'center', gap:8, minWidth:200 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:c, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:14 }}>📅</span>
        </div>
        <div>
          <div style={{ fontSize:9.5, fontWeight:700, color:'#183963' }}>New shift available</div>
          <div style={{ fontSize:8.5, color:'#64748B' }}>Tomorrow 08:00 · NHS Trust</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── 7. GPS CLOCK-IN ────────────────────────────────────────────────────── */
export function GpsIll({ c }: { c: string }) {
  return (
    <div style={{ ...shell, position:'relative', overflow:'hidden', background:'linear-gradient(160deg, #E8F5FB 0%, #F8FAFC 100%)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>GPS Clock-In</span>
        <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ duration:2, repeat:Infinity }}
          style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:20, background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.25)' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#EF4444' }} />
          <span style={{ fontSize:8.5, fontWeight:700, color:'#DC2626' }}>LIVE</span>
        </motion.div>
      </div>
      {/* Map grid */}
      <div style={{ ...wCard, flex:1, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {/* Dot grid */}
        <div style={{ position:'absolute', inset:0, opacity:0.35 }}>
          {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 12 }).map((_, col) => (
            <div key={`${r}-${col}`} style={{ position:'absolute', width:3, height:3, borderRadius:'50%', background:'#94A3B8', left:`${(col+1)*8}%`, top:`${(r+1)*12}%` }} />
          )))}
        </div>
        {/* Grid lines */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(#E8ECF4 1px,transparent 1px),linear-gradient(90deg,#E8ECF4 1px,transparent 1px)', backgroundSize:'40px 40px', opacity:0.3 }} />
        {/* Pulse rings */}
        {[1,2,3].map(i => (
          <motion.div key={i}
            animate={{ scale:[1, 2.8+i*0.4], opacity:[0.5, 0] }}
            transition={{ duration:2, repeat:Infinity, delay:i*0.5, ease:'easeOut' }}
            style={{ position:'absolute', width:18, height:18, borderRadius:'50%', border:`2px solid ${c}`, background:'transparent' }}
          />
        ))}
        {/* Pin */}
        <motion.div initial={{ y:-60, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.55, delay:0.3, type:'spring', stiffness:200, damping:16 }}
          style={{ position:'relative', zIndex:10 }}>
          <div style={{ width:32, height:32, borderRadius:'50% 50% 50% 0', transform:'rotate(-45deg)', background:c, boxShadow:`0 6px 20px ${c}50`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ transform:'rotate(45deg)', fontSize:14 }}>📍</div>
          </div>
        </motion.div>
      </div>
      {/* Verified chip */}
      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
        style={{ display:'flex', gap:8 }}>
        <Chip label="✓ Clock-In Verified at 09:02am" color={c} />
        <Chip label="51.5074° N, 0.1278° W" color="#64748B" />
      </motion.div>
    </div>
  );
}

/* ── 8. DBS TRACKING ────────────────────────────────────────────────────── */
export function DbsIll({ c }: { c: string }) {
  const workers = [
    { n:'Lisa Patel',    dbs:'Enhanced', exp:'Mar 2027', status:'Valid' },
    { n:'Tom Harris',   dbs:'Standard', exp:'Apr 2025', status:'Expiring' },
    { n:'Amy Chen',     dbs:'Enhanced', exp:'Jan 2027', status:'Valid' },
    { n:'Jack Moore',   dbs:'Enhanced', exp:'Jun 2026', status:'Valid' },
  ];
  const sColor = (s: string) => s === 'Valid' ? '#059669' : '#D97706';
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>DBS Register</span>
        <Chip label="4 Active · 1 Expiring" color="#D97706" />
      </div>
      <div style={{ ...wCard, flex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 80px 70px 72px', background:'#FAFBFD', borderBottom:'1px solid #F1F5F9', padding:'6px 12px' }}>
          {['Worker','Type','Expires','Status'].map(h => <div key={h} style={{ fontSize:8, fontWeight:700, color:'#94A3B8' }}>{h}</div>)}
        </div>
        {workers.map((w, i) => (
          <motion.div key={w.n} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.1, duration:0.28, ease:E }}
            style={{ display:'grid', gridTemplateColumns:'1fr 80px 70px 72px', padding:'8px 12px', borderBottom:i<workers.length-1?'1px solid #F8FAFC':'none', alignItems:'center' }}>
            <div style={{ fontSize:9.5, fontWeight:600, color:'#1E293B' }}>{w.n}</div>
            <div style={{ fontSize:9, color:'#64748B' }}>{w.dbs}</div>
            <div style={{ fontSize:9, color:'#64748B' }}>{w.exp}</div>
            <Chip label={w.status} color={sColor(w.status)} />
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }} style={{ display:'flex', gap:8 }}>
        <Chip label="4 Active · 1 renewal due" color={c} />
        <Chip label="Auto-reminders on" color="#059669" />
      </motion.div>
    </div>
  );
}

/* ── 9. RIGHT TO WORK ───────────────────────────────────────────────────── */
export function RightToWorkIll({ c }: { c: string }) {
  const docs = [
    { name:'Passport', worker:'L. Patel',  exp:'2031', ok:true  },
    { name:'BRP Card', worker:'A. Ahmed',  exp:'2026', ok:true  },
    { name:'Share Code', worker:'M. Khan', exp:'2025', ok:false },
    { name:'Passport', worker:'E. Brown',  exp:'2028', ok:true  },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Right to Work</span>
        <Chip label="UKBA Compliant" color={c} />
      </div>
      <div style={{ ...wCard, flex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'80px 1fr 55px 56px', background:'#FAFBFD', borderBottom:'1px solid #F1F5F9', padding:'6px 12px' }}>
          {['Document','Worker','Expires','Status'].map(h => <div key={h} style={{ fontSize:8, fontWeight:700, color:'#94A3B8' }}>{h}</div>)}
        </div>
        {docs.map((d, i) => (
          <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1, duration:0.28, ease:E }}
            style={{ display:'grid', gridTemplateColumns:'80px 1fr 55px 56px', padding:'8px 12px', borderBottom:i<docs.length-1?'1px solid #F8FAFC':'none', alignItems:'center' }}>
            <div style={{ fontSize:9, color:'#475569', fontWeight:600 }}>{d.name}</div>
            <div style={{ fontSize:9.5, fontWeight:600, color:'#1E293B' }}>{d.worker}</div>
            <div style={{ fontSize:9, color:'#64748B' }}>{d.exp}</div>
            <Chip label={d.ok ? 'Verified' : 'Expiring'} color={d.ok ? c : '#D97706'} />
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }} style={{ display:'flex', gap:8 }}>
        <Chip label="3 Verified · 1 Expiring soon" color={c} />
        <Chip label="Alerts enabled" color="#059669" />
      </motion.div>
    </div>
  );
}

/* ── 10. SHIFT ALERTS ───────────────────────────────────────────────────── */
export function ShiftAlertsIll({ c }: { c: string }) {
  const notifs = [
    { text:'New shift available: Mon 3 Feb, 09:00–17:00', type:'offer',    time:'Just now' },
    { text:'Reminder: Submit timesheet for last week',     type:'reminder', time:'1h ago'  },
    { text:'Your shift on Fri has been confirmed',         type:'confirm',  time:'3h ago'  },
  ];
  const ncol = (t: string) => t==='offer' ? c : t==='confirm' ? '#059669' : '#D97706';
  return (
    <div style={{ ...shell, alignItems:'center' }}>
      {/* Bell */}
      <motion.div
        animate={{ rotate:[0,-12,12,-8,8,-4,4,0] }}
        transition={{ duration:1.2, repeat:Infinity, repeatDelay:2.5 }}
        style={{ fontSize:48, lineHeight:1, marginTop:4 }}
      >
        🔔
      </motion.div>
      <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>3 new alerts</span>
      {/* Notification cards */}
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:7 }}>
        {notifs.map((n, i) => (
          <motion.div key={i} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.15, duration:0.35, ease:E }}
            style={{ ...wCard, padding:'9px 12px', display:'flex', alignItems:'flex-start', gap:9, borderLeft:`3px solid ${ncol(n.type)}` }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:9.5, fontWeight:600, color:'#1E293B' }}>{n.text}</div>
              <div style={{ fontSize:8.5, color:'#94A3B8', marginTop:3 }}>{n.time}</div>
            </div>
            <Chip label={n.type==='offer'?'New':n.type==='confirm'?'Confirmed':'Reminder'} color={ncol(n.type)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 11. DOCUMENT MANAGEMENT ────────────────────────────────────────────── */
export function DocumentsIll({ c }: { c: string }) {
  const files = [
    { name:'DBS_Certificate_LPatel.pdf',     size:'124 KB', type:'PDF', done:true  },
    { name:'Passport_Copy_TAhmed.jpg',       size:'2.1 MB', type:'IMG', done:true  },
    { name:'Contract_NMiller_2025.docx',     size:'48 KB',  type:'DOC', done:true  },
    { name:'Training_Record_EKhan.pdf',      size:'340 KB', type:'PDF', done:false },
  ];
  const tColor: Record<string, string> = { PDF:'#DB2777', IMG:'#D97706', DOC:'#2563EB' };
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Document Vault</span>
        <Chip label="128 files stored" color={c} />
      </div>
      <div style={{ ...wCard, flex:1 }}>
        {files.map((f, i) => (
          <motion.div key={i} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.11, duration:0.28, ease:E }}
            style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderBottom:i<files.length-1?'1px solid #F8FAFC':'none' }}>
            <div style={{ width:28, height:28, borderRadius:6, background:tColor[f.type]+'14', border:`1px solid ${tColor[f.type]}28`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontSize:9, fontWeight:800, color:tColor[f.type] }}>{f.type}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:9.5, fontWeight:600, color:'#1E293B', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</div>
              <div style={{ fontSize:8.5, color:'#94A3B8', marginTop:1 }}>{f.size}</div>
            </div>
            {/* Upload bar */}
            <div style={{ width:60 }}>
              {f.done ? (
                <span style={{ fontSize:8.5, fontWeight:700, color:c }}>✓ Stored</span>
              ) : (
                <div style={{ height:4, borderRadius:99, background:'#F1F5F9', overflow:'hidden' }}>
                  <motion.div initial={{ width:'0%' }} animate={{ width:'72%' }} transition={{ delay:0.7, duration:0.9, ease:'easeOut' }}
                    style={{ height:'100%', borderRadius:99, background:c }} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }} style={{ display:'flex', gap:8 }}>
        <Chip label="Secure · Encrypted · GDPR" color={c} />
        <Chip label="Expiry alerts active" color="#059669" />
      </motion.div>
    </div>
  );
}

/* ── 12. CANDIDATE MANAGEMENT ───────────────────────────────────────────── */
export function CandidatesIll({ c }: { c: string }) {
  const bgs = ['#2396C6','#10B981','#EC4899','#D97706'];
  const candidates = [
    { init:'LP', name:'Lisa Patel',   role:'Registered Nurse',     rate:'£22/hr', avail:'Available',    tags:['NMC Reg','DBS'] },
    { init:'TA', name:'Tom Ahmed',    role:'Healthcare Support',   rate:'£14/hr', avail:'Part-time',    tags:['DBS','RTW'] },
    { init:'AC', name:'Amy Chen',     role:'Senior Carer',         rate:'£18/hr', avail:'Available',    tags:['NVQ 3','DBS'] },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Candidate Pool</span>
        <Chip label="312 active workers" color={c} />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:7, flex:1 }}>
        {candidates.map((cand, i) => (
          <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.12, duration:0.32, ease:E }}
            style={{ ...wCard, padding:'11px 13px', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:bgs[i%4], display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'white', flexShrink:0 }}>
              {cand.init}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:3 }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:'#183963' }}>{cand.name}</span>
                <Chip label={cand.avail} color={cand.avail==='Available' ? '#059669' : '#D97706'} />
              </div>
              <div style={{ fontSize:9, color:'#64748B', marginBottom:4 }}>{cand.role} · {cand.rate}</div>
              <div style={{ display:'flex', gap:4 }}>
                {cand.tags.map(t => <Chip key={t} label={t} color={c} />)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 13. CLIENT PORTAL ──────────────────────────────────────────────────── */
export function ClientPortalIll({ c }: { c: string }) {
  const tiles = [
    { label:'Active Shifts', val:'47', delta:'+12%', icon:'📅' },
    { label:'Pending Invoices', val:'3', delta:'£8.2k', icon:'📄' },
    { label:'Workers On-Site', val:'23', delta:'Live', icon:'👥' },
    { label:'Compliance', val:'98%', delta:'✓ Ready', icon:'🛡' },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:28, height:28, borderRadius:7, background:c, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🏥</div>
        <div>
          <div style={{ fontSize:11, fontWeight:800, color:'#183963' }}>NHS Trust North London</div>
          <div style={{ fontSize:9, color:'#64748B' }}>Client Portal · Feb 2025</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7, flex:1 }}>
        {tiles.map((t, i) => (
          <motion.div key={t.label} initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.1, duration:0.32, ease:E }}
            style={{ ...wCard, padding:'12px 12px', display:'flex', flexDirection:'column', gap:4 }}>
            <div style={{ fontSize:18 }}>{t.icon}</div>
            <div style={{ fontSize:9, color:'#94A3B8', fontWeight:600 }}>{t.label}</div>
            <div style={{ fontSize:18, fontWeight:900, color:'#183963', lineHeight:1 }}>{t.val}</div>
            <div style={{ fontSize:8.5, fontWeight:700, color:c }}>{t.delta}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 14. WORKER PORTAL ──────────────────────────────────────────────────── */
export function WorkerPortalIll({ c }: { c: string }) {
  const upcoming = [
    { title:'Day Shift', loc:'NHS Trust North', date:'Mon 3 Feb', hrs:'09:00–17:00', status:'Confirmed' },
    { title:'Night Cover', loc:'Sunrise Care Home', date:'Wed 5 Feb', hrs:'20:00–08:00', status:'Confirmed' },
    { title:'Weekend', loc:'NHS Trust South', date:'Sat 8 Feb', hrs:'08:00–16:00', status:'Pending' },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>My Schedule</span>
        <Chip label="Feb 2025" color={c} />
      </div>
      {/* Mini calendar row */}
      <div style={{ display:'flex', gap:5 }}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <div key={i} style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:8, color:'#94A3B8', fontWeight:600, marginBottom:3 }}>{d}</div>
            <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:i*0.04, duration:0.2, ease:E }}
              style={{ width:'100%', aspectRatio:'1', borderRadius:6, background:i<5?c+'12':'transparent', border:`1px solid ${i<5?c+'30':'#F1F5F9'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:8.5, fontWeight:i===0||i===2||i===4?800:500, color:i===0||i===2||i===4?c:'#94A3B8' }}>{i+3}</span>
            </motion.div>
          </div>
        ))}
      </div>
      {/* Upcoming shifts */}
      <div style={{ display:'flex', flexDirection:'column', gap:7, flex:1 }}>
        {upcoming.map((s, i) => (
          <motion.div key={i} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.12, duration:0.3, ease:E }}
            style={{ ...wCard, padding:'9px 12px', display:'flex', alignItems:'center', gap:10, borderLeft:`3px solid ${s.status==='Confirmed'?c:'#F59E0B'}` }}>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                <span style={{ fontSize:10, fontWeight:700, color:'#183963' }}>{s.title}</span>
                <Chip label={s.status} color={s.status==='Confirmed' ? '#059669' : '#D97706'} />
              </div>
              <div style={{ fontSize:8.5, color:'#64748B' }}>{s.loc} · {s.date}</div>
              <div style={{ fontSize:8.5, color:c, fontWeight:700, marginTop:2 }}>{s.hrs}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 15. PAYROLL ────────────────────────────────────────────────────────── */
export function PayrollIll({ c }: { c: string }) {
  const workers = [
    { n:'Lisa Patel',   hrs:37.5, rate:22, gross:'£825.00' },
    { n:'Tom Harris',   hrs:40,   rate:14, gross:'£560.00' },
    { n:'Amy Chen',     hrs:35.5, rate:18, gross:'£639.00' },
    { n:'Jack Moore',   hrs:42,   rate:16, gross:'£672.00' },
    { n:'Priya Singh',  hrs:38,   rate:22, gross:'£836.00' },
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Payroll Run, Feb 2025</span>
        <Chip label="Ready to Export" color={c} />
      </div>
      <div style={{ ...wCard, flex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 45px 50px 70px', background:'#FAFBFD', borderBottom:'1px solid #F1F5F9', padding:'6px 12px' }}>
          {['Worker','Hrs','Rate','Gross'].map(h => <div key={h} style={{ fontSize:8, fontWeight:700, color:'#94A3B8' }}>{h}</div>)}
        </div>
        {workers.map((w, i) => (
          <motion.div key={w.n} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08, duration:0.28, ease:E }}
            style={{ display:'grid', gridTemplateColumns:'1fr 45px 50px 70px', padding:'7px 12px', borderBottom:i<workers.length-1?'1px solid #F8FAFC':'none', alignItems:'center' }}>
            <div style={{ fontSize:9.5, fontWeight:600, color:'#1E293B' }}>{w.n}</div>
            <div style={{ fontSize:9, color:'#64748B' }}>{w.hrs}</div>
            <div style={{ fontSize:9, color:'#64748B' }}>£{w.rate}/h</div>
            <div style={{ fontSize:10, fontWeight:700, color:'#183963' }}>{w.gross}</div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        style={{ ...wCard, padding:'8px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:10, fontWeight:700, color:'#183963' }}>Total Payroll</span>
        <span style={{ fontSize:16, fontWeight:900, color:c }}>£3,532.00</span>
      </motion.div>
    </div>
  );
}

/* ── 16. AVAILABILITY ───────────────────────────────────────────────────── */
export function AvailabilityIll({ c }: { c: string }) {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const workers = ['J. Davies','S. Ahmed','M. Brown','E. Khan'];
  const grid = [
    [1,0,1,0,1,0,0],
    [0,1,1,0,0,1,0],
    [1,1,0,1,0,0,1],
    [0,0,1,1,1,0,0],
  ];
  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Availability, Week 6</span>
        <Chip label="15 slots open" color={c} />
      </div>
      <div style={{ ...wCard, flex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'68px repeat(7,1fr)', borderBottom:'1px solid #F1F5F9', background:'#FAFBFD' }}>
          <div style={{ padding:'5px 8px', fontSize:8, color:'#94A3B8', fontWeight:700 }}>WORKER</div>
          {days.map(d => <div key={d} style={{ padding:'5px 2px', fontSize:8, fontWeight:700, color:'#475569', textAlign:'center', borderLeft:'1px solid #F1F5F9' }}>{d}</div>)}
        </div>
        {workers.map((w, ri) => (
          <div key={w} style={{ display:'grid', gridTemplateColumns:'68px repeat(7,1fr)', borderBottom:ri<workers.length-1?'1px solid #F8FAFC':'none', minHeight:40 }}>
            <div style={{ padding:'0 8px', fontSize:8.5, fontWeight:600, color:'#475569', display:'flex', alignItems:'center', borderRight:'1px solid #F1F5F9' }}>{w}</div>
            {grid[ri].map((a, ci) => (
              <motion.div key={ci} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:ri*0.08+ci*0.04, duration:0.25 }}
                style={{ borderLeft:'1px solid #F8FAFC', display:'flex', alignItems:'center', justifyContent:'center', padding:3 }}>
                <div style={{ width:'100%', height:22, borderRadius:4, background:a===1?c+'18':'#F8FAFC', border:`1px solid ${a===1?c+'35':'#E8ECF4'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:8.5, fontWeight:700, color:a===1?c:'#D1D5DB' }}>{a===1?'✓':'–'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }} style={{ display:'flex', gap:8 }}>
        <Chip label="15 available · 13 unavailable" color={c} />
        <Chip label="Workers updated via app" color="#059669" />
      </motion.div>
    </div>
  );
}

/* ── 17. AUTO-PROCESSING ────────────────────────────────────────────────── */
export function AutoProcessingIll({ c }: { c: string }) {
  const steps = [
    { icon:'📋', label:'Timesheet Submitted', sub:'Worker submits hours' },
    { icon:'✅', label:'Auto-Approved',        sub:'Trusted worker verified' },
    { icon:'📄', label:'Invoice Generated',   sub:'Sent to client instantly' },
    { icon:'💰', label:'Payroll Triggered',   sub:'Pay calculated & queued' },
  ];
  return (
    <div style={{ ...shell, justifyContent:'center' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Automation Flow</span>
        <motion.div animate={{ opacity:[1,0.5,1] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:20, background:c+'12', border:`1px solid ${c}28` }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:c }} />
          <span style={{ fontSize:8.5, fontWeight:700, color:c }}>Running</span>
        </motion.div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6, flex:1 }}>
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.18, duration:0.35, ease:E }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {/* Step circle */}
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2+i*0.18, type:'spring', stiffness:380 }}
                style={{ width:38, height:38, borderRadius:'50%', background:c+'12', border:`2px solid ${c}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>
                {s.icon}
              </motion.div>
              <div style={{ flex:1, ...wCard, padding:'8px 12px' }}>
                <div style={{ fontSize:10, fontWeight:700, color:'#183963' }}>{s.label}</div>
                <div style={{ fontSize:8.5, color:'#64748B', marginTop:1 }}>{s.sub}</div>
              </div>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <motion.div initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ delay:0.3+i*0.18, duration:0.25, ease:E }}
                style={{ width:2, height:14, background:`linear-gradient(180deg, ${c}60, ${c}20)`, margin:'0 18px', borderRadius:2, transformOrigin:'top' }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 18. ANALYTICS ──────────────────────────────────────────────────────── */
export function AnalyticsIll({ c }: { c: string }) {
  const kpis = [
    { label:'Revenue', val:'£124.8k', delta:'+12%', up:true },
    { label:'Fill Rate', val:'94.2%', delta:'+3.1%', up:true },
    { label:'Avg. Margin', val:'22.4%', delta:'+1.8%', up:true },
  ];
  // SVG line chart points
  const points = [[0,80],[60,65],[120,70],[180,50],[240,42],[300,35],[360,20],[420,28]];
  const d = points.map((p, i) => `${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
  const fill = `${d} L420,100 L0,100 Z`;

  return (
    <div style={shell}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:11, fontWeight:800, color:'#183963' }}>Agency Analytics</span>
        <div style={{ display:'flex', gap:4 }}>
          {['7D','30D','3M'].map((p, i) => <div key={p} style={{ fontSize:8.5, padding:'2px 7px', borderRadius:5, background:i===1?c:'#F1F5F9', color:i===1?'#fff':'#64748B', fontWeight:i===1?700:500 }}>{p}</div>)}
        </div>
      </div>
      {/* KPI tiles */}
      <div style={{ display:'flex', gap:6 }}>
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1, duration:0.28, ease:E }}
            style={{ flex:1, ...wCard, padding:'9px 10px' }}>
            <div style={{ fontSize:8, color:'#94A3B8', fontWeight:600 }}>{k.label}</div>
            <div style={{ fontSize:13, fontWeight:900, color:'#183963', margin:'2px 0' }}>{k.val}</div>
            <div style={{ fontSize:8.5, fontWeight:700, color:'#059669' }}>↑ {k.delta}</div>
          </motion.div>
        ))}
      </div>
      {/* Line chart */}
      <div style={{ ...wCard, flex:1, padding:'12px 14px', display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:9, fontWeight:600, color:'#94A3B8', marginBottom:6 }}>Revenue Trend</div>
        <svg width="100%" height="100" viewBox="-10 0 440 105" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c} stopOpacity="0.18" />
              <stop offset="100%" stopColor={c} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <motion.path d={fill} fill="url(#grad)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }} />
          <motion.path d={d} fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }} />
          {points.map((p, i) => (
            <motion.circle key={i} cx={p[0]} cy={p[1]} r="4" fill={c}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 400 }} />
          ))}
        </svg>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
          {['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'].map(m => (
            <span key={m} style={{ fontSize:7.5, color:'#CBD5E1', fontWeight:600 }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── MAIN SWITCHER ──────────────────────────────────────────────────────── */
export function FeatureIllustration({ id, color }: { id: string; color: string }) {
  const map: Record<string, React.ReactElement> = {
    scheduling:    <SchedulingIll    c={color} />,
    timesheets:    <TimesheetsIll    c={color} />,
    compliance:    <ComplianceIll    c={color} />,
    invoicing:     <InvoicingIll     c={color} />,
    reports:       <ReportsIll       c={color} />,
    mobile:        <MobileAppIll     c={color} />,
    gps:           <GpsIll           c={color} />,
    dbs:           <DbsIll           c={color} />,
    righttowork:   <RightToWorkIll   c={color} />,
    alerts:        <ShiftAlertsIll   c={color} />,
    documents:     <DocumentsIll     c={color} />,
    candidates:    <CandidatesIll    c={color} />,
    clientportal:  <ClientPortalIll  c={color} />,
    workerportal:  <WorkerPortalIll  c={color} />,
    payroll:       <PayrollIll       c={color} />,
    availability:  <AvailabilityIll  c={color} />,
    autoinvoicing: <AutoProcessingIll c={color} />,
    analytics:     <AnalyticsIll     c={color} />,
  };
  return map[id] ?? <SchedulingIll c={color} />;
}
