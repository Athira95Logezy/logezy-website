import React, { useEffect, useRef } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import {
  CalendarBlank, Clock, Shield, FileText, Bell, ChatCircle,
  CheckCircle, ArrowRight, DeviceMobile,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   PHONE SCREEN CONTENT — one per scene
───────────────────────────────────────────── */

function ShiftScreen() {
  const shifts = [
    { role: 'Band 5 RN', ward: 'NHS Ward B', time: '07:00–19:00', status: 'Confirmed', color: '#10B981' },
    { role: 'HCA', ward: 'Primcura Care', time: '19:00–07:00', status: 'Pending', color: '#F59E0B' },
    { role: 'Senior Carer', ward: 'Leadcare', time: '09:00–17:00', status: 'Confirmed', color: '#10B981' },
  ];
  return (
    <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Upcoming Shifts</p>
      {shifts.map((s, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.09)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{s.role}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{s.ward} · {s.time}</p>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: s.color + '22', color: s.color, border: `1px solid ${s.color}44` }}>{s.status}</span>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button style={{ flex: 1, background: 'linear-gradient(135deg, #38BDF8, #818CF8)', border: 'none', borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'default' }}>Accept All</button>
        <button style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 0', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', cursor: 'default' }}>View Calendar</button>
      </div>
    </div>
  );
}

function AvailabilityScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const availability = [1, 0, 1, 1, 0, 1, 0]; // 1 = available
  return (
    <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Availability</p>
      <div style={{ display: 'flex', gap: 6 }}>
        {days.map((d, i) => (
          <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{d}</span>
            <div style={{
              width: '100%', aspectRatio: '1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: availability[i] ? 'linear-gradient(135deg, #10B981, #059669)' : 'rgba(255,255,255,0.06)',
              border: availability[i] ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}>
              {availability[i] ? <CheckCircle weight="regular" style={{ color: '#fff', width: 12, height: 12 }} /> : null}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: '10px 12px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#34D399', marginBottom: 2 }}>4 days available this week</p>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>Agency notified of your availability</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['Morning (06:00–14:00)', 'Day (09:00–17:00)', 'Night (19:00–07:00)'].map((slot, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{slot}</span>
            <div style={{ width: 36, height: 20, borderRadius: 10, background: i === 1 ? 'linear-gradient(90deg, #38BDF8, #818CF8)' : 'rgba(255,255,255,0.1)', position: 'relative', cursor: 'default' }}>
              <div style={{ position: 'absolute', top: 2, left: i === 1 ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', transition: 'left 0.3s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceScreen() {
  const docs = [
    { name: 'DBS Certificate', status: 'Valid', expiry: 'Dec 2025', color: '#10B981' },
    { name: 'NMC Pin', status: 'Valid', expiry: 'Mar 2026', color: '#10B981' },
    { name: 'Moving & Handling', status: 'Expires Soon', expiry: '14 days', color: '#F59E0B' },
    { name: 'Hepatitis B', status: 'Upload needed', expiry: '—', color: '#EF4444' },
  ];
  return (
    <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Compliance</p>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#34D399', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(16,185,129,0.25)' }}>98.7%</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.07)' }}>
          <div style={{ height: '100%', width: '98.7%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: 3 }} />
        </div>
      </div>
      {docs.map((d, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', marginBottom: 1 }}>{d.name}</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Expires: {d.expiry}</p>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: d.color + '22', color: d.color, border: `1px solid ${d.color}33`, whiteSpace: 'nowrap' }}>{d.status}</span>
        </div>
      ))}
    </div>
  );
}

function TimesheetScreen() {
  return (
    <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Digital Timesheet</p>
      <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 14, padding: '14px' }}>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Shift: NHS Ward B · Today</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>START</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#38BDF8' }}>07:02</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>→</div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>END</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#818CF8' }}>19:04</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Total hours</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>12h 02m</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Gross earnings</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#34D399' }}>£204.34</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>THIS WEEK</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>36h</p>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>INVOICED</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#34D399' }}>£612</p>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>PENDING</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#F59E0B' }}>£204</p>
        </div>
      </div>
      <button style={{ width: '100%', background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', borderRadius: 10, padding: '10px 0', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'default' }}>Sign &amp; Submit Timesheet</button>
    </div>
  );
}

function NotificationsScreen() {
  const notifs = [
    { icon: '📋', title: 'New shift available', body: 'Band 5 RN · Wed 28 May · NHS Trusts', time: '2m ago', dot: '#38BDF8' },
    { icon: '✅', title: 'Timesheet approved', body: 'Week ending 24 May · £612.00 paid', time: '1h ago', dot: '#10B981' },
    { icon: '⚠️', title: 'Document expiring', body: 'Moving & Handling — 14 days left', time: '3h ago', dot: '#F59E0B' },
    { icon: '💬', title: 'Message from Agency', body: '"Can you cover Saturday night?"', time: 'Yesterday', dot: '#818CF8' },
    { icon: '🏥', title: 'Shift reminder', body: 'Tomorrow 07:00 · Primcura Care, London', time: 'Yesterday', dot: '#C084FC' },
  ];
  return (
    <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Notifications</p>
      {notifs.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: n.dot + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>{n.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{n.title}</p>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginLeft: 6 }}>{n.time}</span>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{n.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatScreen() {
  const messages = [
    { from: 'agency', text: "Hi Sarah! Can you cover Saturday's night shift at Primcura?", time: '10:32' },
    { from: 'me', text: "Yes, I can do that! What time does it start?", time: '10:34' },
    { from: 'agency', text: "19:00–07:00. I'll confirm the booking now 👍", time: '10:35' },
    { from: 'me', text: "Perfect, see you then!", time: '10:36' },
    { from: 'system', text: 'Shift confirmed · Sat 31 May · 19:00–07:00', time: '10:36' },
  ];
  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 8px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 4 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #38BDF8, #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🏥</div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Logezy Agency</p>
          <p style={{ fontSize: 9, color: '#34D399', marginTop: 1 }}>● Online</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'hidden', flex: 1 }}>
        {messages.map((m, i) => m.from === 'system' ? (
          <div key={i} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#34D399', background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(16,185,129,0.2)' }}>{m.text}</span>
          </div>
        ) : (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '7px 10px', borderRadius: m.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.from === 'me' ? 'linear-gradient(135deg, #38BDF8, #818CF8)' : 'rgba(255,255,255,0.09)',
              border: m.from === 'me' ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}>
              <p style={{ fontSize: 10, color: '#fff', lineHeight: 1.4 }}>{m.text}</p>
              <p style={{ fontSize: 8, color: m.from === 'me' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', marginTop: 3, textAlign: 'right' }}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCENE DATA
───────────────────────────────────────────── */

const SCENES = [
  {
    id: 'shifts',
    icon: CalendarBlank,
    color: '#38BDF8',
    badge: 'Shift Management',
    headline: 'Every shift,\nconfirmed instantly.',
    body: 'Workers see their schedule, confirm in seconds, and get automatic reminders. No WhatsApp chains, no missed calls, no last-minute confusion.',
    stat: { value: '3×', label: 'faster confirmation' },
    screen: ShiftScreen,
  },
  {
    id: 'availability',
    icon: Clock,
    color: '#10B981',
    badge: 'Availability',
    headline: 'Know who\'s free\nbefore you ask.',
    body: 'Workers set their availability in real time. You fill shifts with people who actually want to work — no guessing, no awkward calls.',
    stat: { value: '94%', label: 'fill rate achieved' },
    screen: AvailabilityScreen,
  },
  {
    id: 'compliance',
    icon: Shield,
    color: '#A78BFA',
    badge: 'Compliance',
    headline: 'Always audit-ready.\nZero surprises.',
    body: "Workers upload documents at their own pace. Expiry alerts fire automatically. Your team sees who's CQC-ready at a glance.",
    stat: { value: '98.7%', label: 'compliance rate' },
    screen: ComplianceScreen,
  },
  {
    id: 'timesheets',
    icon: FileText,
    color: '#34D399',
    badge: 'Digital Timesheets',
    headline: 'Clocking off should\nbe the easy part.',
    body: 'Digital clock-in/out, auto-calculated hours, one-tap submission. Invoices generate themselves. Your payroll team will thank you.',
    stat: { value: '80%', label: 'less admin time' },
    screen: TimesheetScreen,
  },
  {
    id: 'notifications',
    icon: Bell,
    color: '#FB923C',
    badge: '3-Way Notifications',
    headline: 'Everyone stays\nin the loop.',
    body: 'Agency, worker, and client all get exactly the right update at the right time. No one chases, no one misses out.',
    stat: { value: '100%', label: 'delivery rate' },
    screen: NotificationsScreen,
  },
  {
    id: 'chat',
    icon: ChatCircle,
    color: '#818CF8',
    badge: 'In-App Chat',
    headline: 'One message,\nshift sorted.',
    body: "Direct, compliant messaging between agency and worker — right inside the app. Everything logged, nothing lost in personal inboxes.",
    stat: { value: '< 2 min', label: 'avg response time' },
    screen: ChatScreen,
  },
];

/* ─────────────────────────────────────────────
   PHONE FRAME COMPONENT
───────────────────────────────────────────── */

function PhoneFrame({ screenComponent: ScreenComponent, glowColor }: { screenComponent: React.FC; glowColor: string }) {
  return (
    <div style={{ position: 'relative', width: 220, flexShrink: 0 }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: -30, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${glowColor}33 0%, transparent 70%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      {/* Phone shell */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: 220, minHeight: 440,
        borderRadius: 36,
        background: 'linear-gradient(160deg, #1a2744 0%, #0f1a30 100%)',
        border: '1.5px solid rgba(255,255,255,0.12)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Status bar */}
        <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>9:41</span>
          <div style={{ width: 80, height: 22, background: 'rgba(0,0,0,0.6)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            <div style={{ width: 20, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <div style={{ width: 12, height: 8, borderRadius: 2, border: '1.5px solid rgba(255,255,255,0.4)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '75%', background: '#10B981' }} />
            </div>
          </div>
        </div>
        {/* App header */}
        <div style={{ padding: '10px 14px 6px', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.15)', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #38BDF8, #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DeviceMobile weight="regular" style={{ color: '#fff', width: 14, height: 14 }} />
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#fff', lineHeight: 1 }}>Logezy</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Worker App</p>
          </div>
        </div>
        {/* Screen content */}
        <div style={{ flex: 1, overflowY: 'hidden' }}>
          <ScreenComponent />
        </div>
        {/* Bottom nav */}
        <div style={{ height: 52, background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', flexShrink: 0 }}>
          {['🏠', '📅', '🔔', '💬', '👤'].map((icon, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px' }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              {i === 0 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#38BDF8' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function CinematicMobileShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScene, setActiveScene] = React.useState(0);
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      // Animate phone in on load
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Animate scenes
      SCENES.forEach((_, idx) => {
        const el = sceneRefs.current[idx];
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 60%',
              end: 'bottom 40%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => setActiveScene(idx),
              onEnterBack: () => setActiveScene(idx),
            },
          }
        );
      });

      // Phone float animation
      gsap.to(phoneRef.current, {
        y: -12, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scene = SCENES[activeScene];
  const ScreenComp = scene.screen;

  return (
    <section
      ref={sectionRef}
      style={{ background: 'linear-gradient(180deg, #080E2A 0%, #0B1535 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          background: `radial-gradient(circle, ${scene.color}18 0%, transparent 65%)`,
          filter: 'blur(60px)', transition: 'background 0.8s ease',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.02,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
      </div>

      {/* Section header */}
      <div style={{ textAlign: 'center', padding: '80px 20px 0', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 999,
          background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', marginBottom: 20,
        }}>
          <DeviceMobile weight="regular" style={{ color: '#38BDF8', width: 14, height: 14 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mobile App</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, color: '#fff',
          letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
        }}>
          Your workers. <span style={{ background: 'linear-gradient(125deg, #38BDF8 0%, #818CF8 55%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Always connected.</span>
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: 'rgba(165,210,255,0.75)', maxWidth: 520, margin: '0 auto 60px', lineHeight: 1.7 }}>
          Give your temps a mobile experience that carries your brand and keeps them engaged from first shift to last.
        </p>
      </div>

      {/* Main layout: scenes left, phone right (sticky) */}
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 0, maxWidth: 1200, margin: '0 auto',
        padding: isMobile ? '0 16px 60px' : '0 24px 100px', position: 'relative', zIndex: 2, alignItems: 'flex-start',
      }}>

        {/* ── LEFT: Scene list ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, paddingRight: isMobile ? 0 : 40 }}>
          {SCENES.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeScene === idx;
            return (
              <div
                key={s.id}
                ref={el => { sceneRefs.current[idx] = el; }}
                style={{
                  padding: '48px 0',
                  borderBottom: idx < SCENES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'opacity 0.5s ease',
                  opacity: isActive ? 1 : 0.35,
                }}
              >
                {/* Badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 999,
                  background: isActive ? s.color + '18' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? s.color + '40' : 'rgba(255,255,255,0.08)'}`,
                  marginBottom: 20, transition: 'all 0.5s ease',
                }}>
                  <Icon weight="regular" style={{ color: isActive ? s.color : 'rgba(255,255,255,0.3)', width: 14, height: 14 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? s.color : 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.badge}</span>
                </div>

                {/* Headline */}
                <h3 style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)', fontWeight: 900, lineHeight: 1.15,
                  color: '#fff', letterSpacing: '-0.025em', marginBottom: 16,
                  whiteSpace: 'pre-line',
                }}>
                  {s.headline}
                </h3>

                {/* Body */}
                <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(165,210,255,0.75)', maxWidth: 440, marginBottom: 28 }}>
                  {s.body}
                </p>

                {/* Stat pill */}
                <div style={{
                  display: 'inline-flex', alignItems: 'baseline', gap: 8, padding: '8px 18px', borderRadius: 12,
                  background: isActive ? s.color + '12' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? s.color + '30' : 'rgba(255,255,255,0.07)'}`,
                  transition: 'all 0.5s ease',
                }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: isActive ? s.color : 'rgba(255,255,255,0.25)', transition: 'color 0.5s' }}>{s.stat.value}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{s.stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT: Sticky Phone ── */}
        <div
          ref={stickyRef}
          style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : '50%', transform: isMobile ? 'none' : 'translateY(-50%)', flexShrink: 0, display: isMobile ? 'flex' : 'block', justifyContent: isMobile ? 'center' : undefined }}
        >
          <div ref={phoneRef} style={{ opacity: 0 }}>
            <PhoneFrame screenComponent={ScreenComp} glowColor={scene.color} key={scene.id} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 24px 100px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 14, textDecoration: 'none',
              background: 'linear-gradient(135deg, #38BDF8, #818CF8)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              boxShadow: '0 8px 32px rgba(56,189,248,0.35)',
            }}
          >
            Get the app for your workers
            <ArrowRight weight="regular" style={{ width: 16, height: 16 }} />
          </Link>
          <Link
            to="/features"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 14, textDecoration: 'none',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 15,
            }}
          >
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
}
