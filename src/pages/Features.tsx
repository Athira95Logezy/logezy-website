import React from 'react';
import {
  CalendarBlank, Clock, Users, Shield, FileText, Receipt,
  DeviceMobile, Briefcase, Buildings, ArrowRight, CheckCircle,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════
   SCREEN MOCKUPS
═══════════════════════════════════════════ */

function SchedulingScreen() {
  const days = ['Mon','Tue','Wed','Thu','Fri'];
  const workers = ['S. Mitchell','J. Okafor','P. Sharma','T. Edwards'];
  const shifts = [
    ['7–3pm','3–11pm','Off','7–3pm','3–11pm'],
    ['Off','7–3pm','7–3pm','Off','7–3pm'],
    ['3–11pm','Off','3–11pm','7–3pm','Off'],
    ['7–3pm','7–3pm','Off','3–11pm','7–3pm'],
  ];
  const colors = ['bg-indigo-100 text-indigo-700','bg-violet-100 text-violet-700','bg-blue-100 text-blue-700','bg-cyan-100 text-cyan-700'];
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Week 20 Rota</p>
        <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">Auto-generated</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns:'80px repeat(5,1fr)', gap:3 }}>
        <div className="text-[8px] text-slate-400 py-1 font-semibold">Worker</div>
        {days.map(d => <div key={d} className="text-[8px] text-slate-500 font-semibold text-center py-1">{d}</div>)}
        {workers.map((w, wi) => (
          <React.Fragment key={w}>
            <div className="text-[8px] font-semibold text-slate-700 py-2 flex items-center">{w}</div>
            {shifts[wi].map((s,si) => (
              <div key={si} className={`text-[7px] font-semibold rounded py-1.5 text-center ${s==='Off'?'bg-slate-50 text-slate-300 border border-dashed border-slate-200':colors[wi]}`}>{s}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function AvailabilityScreen() {
  const days = ['M','T','W','T','F','S','S'];
  const workers = [
    { name:'Sarah M.', avail:[1,0,1,1,0,1,0] },
    { name:'James O.',  avail:[1,1,0,1,1,0,0] },
    { name:'Priya S.',  avail:[0,1,1,0,1,1,1] },
    { name:'Tom E.',    avail:[1,1,1,0,0,1,0] },
  ];
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Availability Calendar</p>
        <span className="text-[10px] bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded-full">Week 20</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns:'72px repeat(7,1fr)', gap:3 }}>
        <div className="text-[8px] text-slate-400 py-1"/>
        {days.map((d,i) => <div key={i} className="text-[8px] text-slate-500 font-bold text-center py-1">{d}</div>)}
        {workers.map(({ name, avail }) => (
          <React.Fragment key={name}>
            <div className="text-[8px] font-semibold text-slate-700 py-1.5 flex items-center">{name}</div>
            {avail.map((a,i) => (
              <div key={i} className={`h-6 rounded flex items-center justify-center text-[7px] font-bold ${a?'bg-teal-100 text-teal-700':'bg-slate-50 text-slate-300'}`}>{a?'✓':'—'}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <span className="text-[9px] text-slate-500">Available workers this week</span>
        <span className="text-[10px] font-black text-teal-600">18 / 22</span>
      </div>
    </div>
  );
}

function CandidateClientScreen() {
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Candidate Profiles</p>
        <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">312 workers</span>
      </div>
      <div className="space-y-2">
        {[
          { name:'Sarah Mitchell', role:'Healthcare Assistant', dbs:'Valid', rtw:'Valid', score:96, status:'Active' },
          { name:'James Okafor',   role:'Support Worker',       dbs:'Valid', rtw:'Valid', score:91, status:'Active' },
          { name:'Priya Sharma',   role:'Ward Manager',         dbs:'Expiring', rtw:'Valid', score:88, status:'Review' },
        ].map(({ name, role, dbs, rtw, score, status }) => (
          <div key={name} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-[8px] font-black text-white flex-shrink-0">
                {name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-800">{name}</p>
                <p className="text-[8px] text-slate-400">{role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${dbs==='Valid'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>DBS</span>
              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">RTW</span>
              <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${status==='Active'?'bg-blue-100 text-blue-700':'bg-amber-100 text-amber-700'}`}>{score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceScreen() {
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Compliance Dashboard</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label:'Overall Score', value:'98.7%', color:'text-emerald-600' },
          { label:'DBS Current',   value:'312/312',color:'text-blue-600'   },
          { label:'Training Done', value:'96.2%', color:'text-violet-600'  },
          { label:'Audits Passed', value:'47/47', color:'text-amber-600'   },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
            <p className={`text-sm font-black ${color}`}>{value}</p>
            <p className="text-[8px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <p className="text-[9px] font-semibold text-slate-500">Recent Audits</p>
        {[
          { item:'Safeguarding Training', date:'May 2026', status:'pass' },
          { item:'Right to Work Checks',  date:'May 2026', status:'pass' },
          { item:'GPS Verification',      date:'Ongoing',  status:'live' },
        ].map(({ item, date, status }) => (
          <div key={item} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
            <div>
              <p className="text-[9px] font-semibold text-slate-700">{item}</p>
              <p className="text-[8px] text-slate-400">{date}</p>
            </div>
            <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${status==='pass'?'bg-emerald-100 text-emerald-700':'bg-blue-100 text-blue-700'}`}>
              {status==='pass'?'✓ Pass':'● Live'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimesheetsScreen() {
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Timesheets — Week 20</p>
        <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">3 pending</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-1">
        {[
          { label:'Total Hours', value:'4,820', color:'text-slate-900' },
          { label:'Approved',    value:'4,612', color:'text-emerald-600' },
          { label:'Pending',     value:'208',   color:'text-amber-600'   },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
            <p className={`text-sm font-black ${color}`}>{value}</p>
            <p className="text-[8px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      {[
        { name:'Sarah Mitchell', hours:'37.5h', clocked:'07:00–15:30', gps:'✓ GPS', status:'Approved' },
        { name:'James Okafor',   hours:'42h',   clocked:'15:00–23:00', gps:'✓ GPS', status:'Approved' },
        { name:'Priya Sharma',   hours:'35h',   clocked:'07:00–15:00', gps:'Pending',status:'Pending'  },
      ].map(({ name, hours, clocked, gps, status }) => (
        <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
          <div>
            <p className="text-[9px] font-semibold text-slate-700">{name}</p>
            <p className="text-[8px] text-slate-400">{clocked} · {hours}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${gps==='✓ GPS'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{gps}</span>
            <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${status==='Approved'?'bg-blue-100 text-blue-700':'bg-amber-100 text-amber-700'}`}>{status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoicingScreen() {
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Invoices — May 2026</p>
        <span className="text-[10px] bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">£186k total</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label:'Paid',    value:'£142k', color:'text-emerald-600' },
          { label:'Sent',    value:'£31k',  color:'text-blue-600'    },
          { label:'Overdue', value:'£13k',  color:'text-red-500'     },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
            <p className={`text-sm font-black ${color}`}>{value}</p>
            <p className="text-[8px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      {[
        { client:'NHS Trust A',   inv:'INV-2406', amount:'£28,400', status:'Paid'    },
        { client:'Care UK Ltd',   inv:'INV-2407', amount:'£14,200', status:'Sent'    },
        { client:'Bupa Homes',    inv:'INV-2408', amount:'£9,600',  status:'Overdue' },
        { client:'HC-One Group',  inv:'INV-2409', amount:'£11,800', status:'Paid'    },
      ].map(({ client, inv, amount, status }) => (
        <div key={inv} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
          <div>
            <p className="text-[9px] font-semibold text-slate-700">{client}</p>
            <p className="text-[8px] text-slate-400">{inv}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-800">{amount}</span>
            <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${status==='Paid'?'bg-emerald-100 text-emerald-700':status==='Sent'?'bg-blue-100 text-blue-700':'bg-red-100 text-red-600'}`}>{status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileAppScreen() {
  return (
    <div style={{ background:'#0D1829', borderRadius:'0 0 20px 20px', padding:'16px 12px', minHeight:220 }}>
      <div style={{ textAlign:'center', marginBottom:16 }}>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:9, marginBottom:4 }}>LOGEZY</p>
        <p style={{ color:'#fff', fontWeight:800, fontSize:12 }}>Good morning, Sarah 👋</p>
        <p style={{ color:'rgba(165,210,255,0.65)', fontSize:9, marginTop:2 }}>3 shifts this week</p>
      </div>
      {[
        { label:'NHS Ward B',     time:'Today · 7:00–15:00',   status:'Confirmed', c:'#10B981' },
        { label:'Royal Hospital', time:'Tomorrow · 7:00–15:00', status:'Upcoming',  c:'#1795C7' },
      ].map(({ label, time, status, c }) => (
        <div key={label} style={{ background:'rgba(255,255,255,0.07)', borderRadius:10, padding:'8px 10px', marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <p style={{ color:'#fff', fontWeight:700, fontSize:10 }}>{label}</p>
            <p style={{ color:'rgba(165,210,255,0.55)', fontSize:8, marginTop:2 }}>{time}</p>
          </div>
          <span style={{ background:`${c}20`, color:c, fontWeight:700, fontSize:8, padding:'3px 8px', borderRadius:20 }}>{status}</span>
        </div>
      ))}
      <div style={{ background:'linear-gradient(135deg,#5B6CF9,#1795C7)', borderRadius:10, padding:'9px', textAlign:'center', marginTop:4 }}>
        <p style={{ color:'#fff', fontWeight:800, fontSize:10 }}>📍 Clock In</p>
      </div>
    </div>
  );
}

function RecruitmentScreen() {
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Recruitment Pipeline</p>
        <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">24 active</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { stage:'Applied',  count:12, color:'from-slate-400 to-slate-500' },
          { stage:'Screened', count:8,  color:'from-blue-500 to-blue-700'   },
          { stage:'Interview',count:4,  color:'from-violet-500 to-violet-700'},
          { stage:'Offer',    count:2,  color:'from-emerald-500 to-emerald-700'},
        ].map(({ stage, count, color }) => (
          <div key={stage} className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
            <p className={`text-base font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{count}</p>
            <p className="text-[7px] text-slate-400">{stage}</p>
          </div>
        ))}
      </div>
      {[
        { name:'Emma Clarke', role:'Healthcare Assistant', score:92 },
        { name:'David Park',  role:'Support Worker',       score:87 },
        { name:'Aisha Khan',  role:'Ward Manager',         score:95 },
      ].map(({ name, role, score }) => (
        <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
          <div>
            <p className="text-[9px] font-semibold text-slate-700">{name}</p>
            <p className="text-[8px] text-slate-400">{role}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width:`${score}%` }}/>
            </div>
            <span className="text-[8px] font-bold text-slate-700">{score}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClientPortalScreen() {
  return (
    <div className="bg-white rounded-b-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-800">Client Portal — NHS Trust A</p>
        <span className="text-[10px] bg-cyan-100 text-cyan-700 font-bold px-2 py-0.5 rounded-full">Live</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label:'Booked Today',    value:'47',    color:'text-slate-900'  },
          { label:'Shifts This Week',value:'182',   color:'text-cyan-600'   },
          { label:'Timesheets Due',  value:'3',     color:'text-amber-600'  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
            <p className={`text-sm font-black ${color}`}>{value}</p>
            <p className="text-[8px] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <p className="text-[9px] font-semibold text-slate-500">Today's Workforce</p>
        {[
          { name:'Sarah Mitchell', ward:'Ward B — Nurse',         time:'07:00–15:00', live:true  },
          { name:'James Okafor',   ward:'ICU — Support Worker',   time:'15:00–23:00', live:false },
          { name:'Priya Sharma',   ward:'A&E — Healthcare Asst',  time:'07:00–15:00', live:true  },
        ].map(({ name, ward, time, live }) => (
          <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
            <div>
              <p className="text-[9px] font-semibold text-slate-700">{name}</p>
              <p className="text-[8px] text-slate-400">{ward} · {time}</p>
            </div>
            <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${live?'bg-emerald-100 text-emerald-700':'bg-slate-100 text-slate-500'}`}>
              {live?'● Live':'Soon'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE DATA
═══════════════════════════════════════════ */

const categories = [
  {
    id: 'workforce',
    num: '01',
    label: 'Workforce',
    desc: 'Schedule your team, track availability, and manage every candidate and client — from one screen.',
    accentColor: '#5B6CF9',
    accentBg: 'rgba(91,108,249,0.06)',
    borderColor: '#5B6CF9',
    features: [
      {
        icon: CalendarBlank,
        title: 'Scheduling',
        subtitle: 'Drag-and-drop rota builder',
        gradient: 'linear-gradient(135deg,#5B6CF9,#8B5CF6)',
        glow: 'rgba(91,108,249,0.18)',
        tagBg: 'rgba(91,108,249,0.08)', tagColor: '#5B6CF9',
        desc: 'Stop spending hours building rotas manually. Build, edit and publish your full weekly rota in minutes — with real-time visibility of who is scheduled, where, and when.',
        points: [
          'Drag-and-drop rota builder with live conflict detection',
          'Auto-fill shifts by skills, availability & location',
          'Instant push notifications to workers on shift changes',
          'Multi-site & multi-client scheduling from one view',
          'Copy rotas week-to-week with a single click',
        ],
        Screen: SchedulingScreen,
        reverse: false,
      },
      {
        icon: Clock,
        title: 'Availability',
        subtitle: 'Know who\'s free before you ask',
        gradient: 'linear-gradient(135deg,#0891B2,#06B6D4)',
        glow: 'rgba(8,145,178,0.18)',
        tagBg: 'rgba(8,145,178,0.08)', tagColor: '#0891B2',
        desc: 'Know exactly who is free before you start scheduling. Workers submit their availability through the app — giving your team a live view of workforce capacity at all times.',
        points: [
          'Workers set recurring or one-off availability via mobile app',
          'Live availability calendar across your entire workforce',
          'Automatically exclude unavailable workers from scheduling',
          'Availability conflict alerts before you confirm a booking',
          'Shift preference management per worker profile',
        ],
        Screen: AvailabilityScreen,
        reverse: true,
      },
      {
        icon: Users,
        title: 'Candidate & Client Management',
        subtitle: 'All your people in one place',
        gradient: 'linear-gradient(135deg,#DB2777,#F43F5E)',
        glow: 'rgba(219,39,119,0.18)',
        tagBg: 'rgba(219,39,119,0.08)', tagColor: '#DB2777',
        desc: 'Manage your entire workforce and client base from one unified platform. Full candidate profiles, client accounts, placement history — all connected and always up to date.',
        points: [
          'Complete candidate profiles with live compliance status',
          'Client accounts with contacts, sites and preferences',
          'Automated placement matching by skills & location',
          'Full booking and placement history per worker and client',
          'Worker ratings and performance tracking over time',
        ],
        Screen: CandidateClientScreen,
        reverse: false,
      },
    ],
  },
  {
    id: 'compliance',
    num: '02',
    label: 'Compliance & Payroll',
    desc: 'Stay audit-ready, pay your workers accurately, and invoice clients automatically — without the admin.',
    accentColor: '#059669',
    accentBg: 'rgba(5,150,105,0.06)',
    borderColor: '#059669',
    features: [
      {
        icon: Shield,
        title: 'Compliance',
        subtitle: 'CQC & GDPR ready',
        gradient: 'linear-gradient(135deg,#D97706,#F59E0B)',
        glow: 'rgba(217,119,6,0.18)',
        tagBg: 'rgba(217,119,6,0.08)', tagColor: '#D97706',
        desc: 'Built with CQC standards at its core. Automated DBS tracking, right-to-work checks, training expiry alerts, and comprehensive audit trails mean you\'re always ready for inspection — without extra admin.',
        points: [
          'Automated DBS and right-to-work document tracking',
          'Training expiry alerts sent automatically to workers & managers',
          'Full audit trails for every system action taken',
          'GDPR-compliant document storage with encryption',
          'CQC-ready compliance reports generated automatically',
        ],
        Screen: ComplianceScreen,
        reverse: true,
      },
      {
        icon: FileText,
        title: 'Digital Timesheets',
        subtitle: 'GPS-verified, one-click approved',
        gradient: 'linear-gradient(135deg,#2563EB,#1795C7)',
        glow: 'rgba(37,99,235,0.18)',
        tagBg: 'rgba(37,99,235,0.08)', tagColor: '#2563EB',
        desc: 'Workers clock in and out via the mobile app with GPS verification — you always know who was where and when. No paper, no chasing, no errors.',
        points: [
          'GPS-locked clock in/out on the mobile app',
          'Workers and clients both sign off shifts digitally',
          'Automatic timesheet generation from GPS clock-in data',
          'One-click manager approval from any device',
          'Full location history per shift for audit & dispute resolution',
        ],
        Screen: TimesheetsScreen,
        reverse: false,
      },
      {
        icon: Receipt,
        title: 'Invoicing',
        subtitle: 'Auto-generated on timesheet approval',
        gradient: 'linear-gradient(135deg,#7C3AED,#A855F7)',
        glow: 'rgba(124,58,237,0.18)',
        tagBg: 'rgba(124,58,237,0.08)', tagColor: '#7C3AED',
        desc: 'Generate accurate client invoices automatically the moment timesheets are approved. No manual data entry, no delays — just faster payments for your agency.',
        points: [
          'Invoices auto-generated when timesheets are approved',
          'Branded invoice templates per client account',
          'Multi-rate support — charge rates, pay rates and margins',
          'Real-time invoice status: sent, viewed, paid or overdue',
          'Bulk invoice export for your accounts team',
        ],
        Screen: InvoicingScreen,
        reverse: true,
      },
    ],
  },
  {
    id: 'portals',
    num: '03',
    label: 'Portals & Communication',
    desc: 'Keep workers, clients and your team connected — with purpose-built portals and a branded mobile app.',
    accentColor: '#1795C7',
    accentBg: 'rgba(23,149,199,0.06)',
    borderColor: '#1795C7',
    features: [
      {
        icon: DeviceMobile,
        title: 'Candidate Mobile App',
        subtitle: 'iOS & Android',
        gradient: 'linear-gradient(135deg,#4F46E5,#1795C7)',
        glow: 'rgba(79,70,229,0.18)',
        tagBg: 'rgba(79,70,229,0.08)', tagColor: '#4F46E5',
        desc: 'Give your temps a mobile experience that carries your brand. Workers see their shifts, confirm bookings, submit timesheets, upload documents, and clock in — all from the Logezy app.',
        points: [
          'Available on iOS and Android — free to download',
          'Push notifications for new shifts, changes and approvals',
          'In-app document upload for compliance documents',
          'Digital timesheet submission and e-signatures',
          'In-app messaging between workers and your team',
        ],
        Screen: MobileAppScreen,
        reverse: false,
        isMobile: true,
      },
      {
        icon: Briefcase,
        title: 'Recruitment Portal',
        subtitle: 'Hire faster, onboard smarter',
        gradient: 'linear-gradient(135deg,#EA580C,#F97316)',
        glow: 'rgba(234,88,12,0.18)',
        tagBg: 'rgba(234,88,12,0.08)', tagColor: '#EA580C',
        desc: 'Manage your entire hiring pipeline from application to first shift in one place. Score candidates, automate document collection, and get new workers verified and ready in hours, not days.',
        points: [
          'Integrated job board and candidate application portal',
          'Automated candidate scoring and screening workflows',
          'Digital document collection with e-signature support',
          'Right-to-work and DBS check automation',
          'One-click onboarding — app download to first shift',
        ],
        Screen: RecruitmentScreen,
        reverse: true,
        isMobile: false,
      },
      {
        icon: Buildings,
        title: 'Client Portal',
        subtitle: 'Self-serve for your clients',
        gradient: 'linear-gradient(135deg,#0891B2,#06B6D4)',
        glow: 'rgba(8,145,178,0.18)',
        tagBg: 'rgba(8,145,178,0.08)', tagColor: '#0891B2',
        desc: 'Give your clients real-time visibility into their workforce without flooding your inbox. A branded self-serve portal where clients can view rotas, approve timesheets, and raise requirements.',
        points: [
          'Branded client-facing portal with your agency logo',
          'Live rota visibility — clients see who is booked and when',
          'Digital timesheet approval directly from the client side',
          'Clients can raise new shift requirements directly in the portal',
          'Automated weekly reports sent to client contacts',
        ],
        Screen: ClientPortalScreen,
        reverse: false,
        isMobile: false,
      },
    ],
  },
];

/* ═══════════════════════════════════════════
   SCREEN MOCKUP WRAPPER
═══════════════════════════════════════════ */
function FeatureMockup({ feature }: { feature: typeof categories[0]['features'][0] }) {
  const isMobile = (feature as typeof categories[2]['features'][0]).isMobile;
  const Screen = feature.Screen;

  if (isMobile) {
    return (
      <div className="relative flex justify-center items-center">
        <div style={{
          position:'absolute', inset:-40,
          background:`radial-gradient(ellipse at 50% 50%, ${feature.glow} 0%, transparent 65%)`,
          filter:'blur(24px)', pointerEvents:'none',
        }}/>
        <div className="relative z-10" style={{ width:200 }}>
          <div style={{
            borderRadius:38, border:'6px solid #1A2540',
            background:'#0D1829', overflow:'hidden',
            boxShadow:'0 32px 80px rgba(12,33,56,0.35), 0 0 0 2px rgba(91,108,249,0.20)',
          }}>
            {/* Notch */}
            <div style={{ height:24, background:'#0D1829', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:54, height:16, background:'#1A2540', borderRadius:'0 0 12px 12px' }}/>
            </div>
            <Screen />
          </div>
          {/* Glow ring */}
          <div style={{
            position:'absolute', inset:-2, borderRadius:42,
            background:`linear-gradient(145deg, ${feature.glow.replace('0.18','0.6')}, transparent 60%)`,
            zIndex:-1,
          }}/>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div style={{
        position:'absolute', inset:-30,
        background:`radial-gradient(ellipse at 50% 50%, ${feature.glow} 0%, transparent 65%)`,
        filter:'blur(20px)', pointerEvents:'none', zIndex:0,
      }}/>
      <div className="relative z-10 rounded-2xl overflow-hidden" style={{
        border:'1px solid rgba(226,232,240,0.8)',
        boxShadow:'0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
      }}>
        {/* Browser chrome */}
        <div style={{ background:'#F1F5F9', borderBottom:'1px solid #E2E8F0', padding:'8px 12px', display:'flex', alignItems:'center', gap:8 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>
          ))}
          <div style={{ flex:1, background:'#fff', border:'1px solid #E2E8F0', borderRadius:6, padding:'3px 10px' }} />
        </div>
        {/* Gradient accent bar */}
        <div style={{ height:3, background:feature.gradient }}/>
        <Screen />
      </div>
      {/* Live badge */}
      <div style={{
        position:'absolute', bottom:-14, right:16, zIndex:20,
        display:'inline-flex', alignItems:'center', gap:6,
        padding:'5px 12px', borderRadius:20,
        background:'rgba(255,255,255,0.92)', border:'1px solid rgba(0,0,0,0.06)',
        boxShadow:'0 4px 16px rgba(0,0,0,0.10)',
        fontSize:10, fontWeight:700, color:'#334155',
      }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:'#10B981', display:'inline-block', boxShadow:'0 0 0 3px rgba(16,185,129,0.20)' }}/>
        Live · syncing
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function FeaturesPage() {
  return (
    <div className="bg-white">

      {/* ══════════════════════
          HERO
      ══════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#F8FAFC]">
        <div style={{ position:'absolute', top:0, right:0, width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(91,108,249,0.08) 0%,transparent 65%)', transform:'translate(20%,-30%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(23,149,199,0.07) 1px,transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none', opacity:0.5 }}/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-bold"
              style={{ background:'rgba(91,108,249,0.10)', border:'1px solid rgba(91,108,249,0.22)', color:'#5B6CF9' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#5B6CF9', display:'inline-block' }}/>
              Platform Features
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)}
            className="font-black leading-[1.06] mb-6"
            style={{ fontSize:'clamp(2.4rem,5vw,4rem)', letterSpacing:'-0.03em', color:'#0C2138' }}>
            Everything your agency needs.{' '}
            <span style={{ background:'linear-gradient(125deg,#1795C7 0%,#5B6CF9 50%,#8B5CF6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display: 'inline'}}>
              Nothing it doesn't.
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.14)}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
            9 features across 3 categories — built specifically for temp recruitment agencies.
          </motion.p>

          {/* 3 category overview cards */}
          <motion.div {...fadeUp(0.20)} className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-2xl p-5 text-left"
                style={{ border:`1.5px solid ${cat.accentColor}28`, boxShadow:`0 4px 20px ${cat.accentColor}10` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width:8, height:8, borderRadius:'50%', background:cat.accentColor }}/>
                  <span style={{ fontSize:11, fontWeight:800, color:cat.accentColor, letterSpacing:'0.04em' }}>
                    {cat.num} — {cat.label.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.features.map(f => {
                    const Icon = f.icon;
                    return (
                      <div key={f.title} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{ background:f.tagBg, border:`1px solid ${f.tagColor}28` }}>
                        <Icon weight="regular" style={{ width:10, height:10, color:f.tagColor }}/>
                        <span style={{ fontSize:10, fontWeight:700, color:f.tagColor }}>{f.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          FEATURE CATEGORIES
      ══════════════════════ */}
      {categories.map((cat) => (
        <div key={cat.id}>

          {/* Category divider */}
          <div style={{ background:cat.accentBg, borderTop:`3px solid ${cat.accentColor}`, borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span style={{ fontSize:'clamp(2.5rem,8vw,4.5rem)', fontWeight:900, color:`${cat.accentColor}18`, lineHeight:1, letterSpacing:'-0.05em', userSelect:'none', flexShrink:0 }}>
                  {cat.num}
                </span>
                <div>
                  <p style={{ fontSize:11, fontWeight:800, color:cat.accentColor, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>
                    Category {cat.num}
                  </p>
                  <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:900, letterSpacing:'-0.025em', color:'#0C2138', margin:'0 0 6px' }}>
                    {cat.label}
                  </h2>
                  <p style={{ color:'rgba(12,33,56,0.52)', fontSize:16, lineHeight:1.55, maxWidth:540 }}>
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature sections within this category */}
          {cat.features.map((f, fi) => {
            const Icon = f.icon;
            return (
              <section key={f.title} className={fi % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                  <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${f.reverse ? '' : ''}`}>

                    {/* Copy */}
                    <motion.div {...fadeUp(0)} style={{ order: f.reverse ? 2 : 1 }}>
                      {/* Tag */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-bold"
                        style={{ background:f.tagBg, border:`1px solid ${f.tagColor}30`, color:f.tagColor }}>
                        <Icon weight="regular" style={{ width:12, height:12 }}/>
                        {f.subtitle}
                      </div>

                      <h3 style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', fontWeight:900, letterSpacing:'-0.025em', color:'#0C2138', marginBottom:16, lineHeight:1.1 }}>
                        {f.title}
                      </h3>
                      <p style={{ color:'rgba(12,33,56,0.52)', fontSize:17, lineHeight:1.68, marginBottom:28 }}>
                        {f.desc}
                      </p>

                      {/* Points */}
                      <ul style={{ listStyle:'none', padding:0, margin:'0 0 32px', display:'flex', flexDirection:'column', gap:12 }}>
                        {f.points.map((pt, pi) => (
                          <motion.li key={pt}
                            initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }}
                            viewport={{ once:true }} transition={{ duration:0.4, delay:pi*0.07 }}
                            style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                            <div style={{ width:22, height:22, borderRadius:'50%', background:f.gradient, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, boxShadow:`0 4px 12px ${f.glow}` }}>
                              <CheckCircle weight="regular" style={{ width:12, height:12, color:'#fff' }}/>
                            </div>
                            <span style={{ fontSize:14, color:'rgba(12,33,56,0.70)', lineHeight:1.6, fontWeight:500 }}>{pt}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.97 }} transition={{ type:'spring', stiffness:400 }}>
                        <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{
                          display:'inline-flex', alignItems:'center', gap:8,
                          padding:'13px 24px', borderRadius:100,
                          fontSize:14, fontWeight:700, color:'#fff',
                          background:f.gradient, boxShadow:`0 4px 20px ${f.glow}`,
                          textDecoration:'none',
                        }}>
                          See {f.title} in action
                          <ArrowRight weight="regular" style={{ width:15, height:15 }}/>
                        </a>
                      </motion.div>
                    </motion.div>

                    {/* Mockup */}
                    <motion.div {...fadeUp(0.1)} style={{ order: f.reverse ? 1 : 2, paddingBottom:20 }}>
                      <FeatureMockup feature={f as typeof categories[0]['features'][0]}/>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ))}

      {/* ══════════════════════
          HOW IT WORKS
      ══════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div {...fadeUp(0)}>
              <div className="section-tag inline-flex mb-4">How It Works</div>
            </motion.div>
            <motion.h2 {...fadeUp(0.08)}
              className="text-4xl sm:text-5xl font-black text-slate-900"
              style={{ letterSpacing:'-0.025em' }}>
              Simple to start,{' '}
              <span style={{ background:'linear-gradient(125deg,#1795C7 0%,#5B6CF9 55%,#8B5CF6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display: 'inline'}}>
                powerful to scale.
              </span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num:'01', title:'Quick setup',          desc:'Import your team and clients in minutes using our guided onboarding wizard — no technical knowledge needed.' },
              { num:'02', title:'Configure & customise', desc:'Tailor workflows, shift templates, and permission levels to match exactly how your agency operates.' },
              { num:'03', title:'Launch & grow',         desc:'Go live with confidence. Our UK-based support team is with you every step of the way as you scale.' },
            ].map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.1)}
                whileHover={{ y:-6, boxShadow:'0 20px 60px rgba(0,0,0,0.10)' }}
                transition={{ type:'spring', stiffness:280, damping:22 }}
                className="bg-white rounded-3xl p-8"
                style={{ border:'1px solid #E2E8F0', boxShadow:'0 4px 16px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize:48, fontWeight:900, background:'linear-gradient(135deg,#5B6CF9,#1795C7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1, marginBottom:16 }}>
                  {step.num}
                </p>
                <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          FINAL CTA
      ══════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(23,149,199,0.16) 0%,transparent 60%)', pointerEvents:'none' }}/>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-black text-white mb-5"
              style={{ fontSize:'clamp(2rem,4vw,3rem)', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              See every feature in action
            </h2>
            <p style={{ color:'rgba(165,210,255,0.65)', fontSize:18, lineHeight:1.65, marginBottom:36 }}>
              Book a personalised demo and we'll walk you through everything your agency needs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.div whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }} transition={{ type:'spring', stiffness:400 }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'14px 28px', borderRadius:100, fontSize:15, fontWeight:700,
                  color:'#fff', background:'linear-gradient(135deg,#5B6CF9,#1795C7)',
                  boxShadow:'0 4px 24px rgba(91,108,249,0.40)', textDecoration:'none',
                }}>
                  Book a Demo <ArrowRight weight="regular" style={{ width:16, height:16 }}/>
                </a>
              </motion.div>
              <motion.div whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }} transition={{ type:'spring', stiffness:400 }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'14px 28px', borderRadius:100, fontSize:15, fontWeight:600,
                  color:'rgba(255,255,255,0.80)', background:'rgba(255,255,255,0.08)',
                  border:'1.5px solid rgba(255,255,255,0.16)', textDecoration:'none',
                }}>
                  Start Free Trial
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
