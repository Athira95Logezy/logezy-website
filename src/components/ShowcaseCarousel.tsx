import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowWidth } from '../hooks/useWindowWidth';
import {
  ArrowLeft, ArrowRight, Play, Pause,
  CalendarBlank, Bell, CheckCircle, Buildings,
  Confetti, Sparkle, ArrowUpRight,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_DELAY = 4500; // ms per slide

/* ─────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────── */
const slides = [
  {
    id: 0,
    time: null,
    tag: 'The scenario',
    tagColor: '#F87171',
    headline: 'A worker just called in sick.',
    sub: 'Here\'s what happens next.',
    body: 'With Logezy, the gap is filled in under 60 seconds. Swipe to see how.',
    cta: 'See how →',
    icon: CalendarBlank,
    accent: '#F87171',
    accentBg: 'rgba(248,113,113,0.12)',
    mockup: 'alert',
  },
  {
    id: 1,
    time: '0 – 10s',
    tag: 'Step 1',
    tagColor: '#38BDF8',
    headline: 'Post the open shift',
    sub: 'One tap in Logezy.',
    body: 'Add the shift details, location, time and rate. Done in seconds.',
    cta: null,
    icon: CalendarBlank,
    accent: '#38BDF8',
    accentBg: 'rgba(56,189,248,0.12)',
    mockup: 'post',
  },
  {
    id: 2,
    time: '10 – 20s',
    tag: 'Step 2',
    tagColor: '#A78BFA',
    headline: 'Workers get notified instantly',
    sub: 'No WhatsApp. No phone calls.',
    body: 'Every available, compliant worker on your books gets a push notification.',
    cta: null,
    icon: Bell,
    accent: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.12)',
    mockup: 'notify',
  },
  {
    id: 3,
    time: '20 – 35s',
    tag: 'Step 3',
    tagColor: '#34D399',
    headline: 'Worker accepts the shift',
    sub: 'Confirmed straight from the app.',
    body: 'They confirm in one tap. You see it in real time on your dashboard.',
    cta: null,
    icon: CheckCircle,
    accent: '#34D399',
    accentBg: 'rgba(52,211,153,0.12)',
    mockup: 'accept',
  },
  {
    id: 4,
    time: '35 – 50s',
    tag: 'Step 4',
    tagColor: '#FBBF24',
    headline: 'Client sees it live',
    sub: 'No call needed. No email thread.',
    body: 'The shift updates automatically in the client portal. They already know.',
    cta: null,
    icon: Buildings,
    accent: '#FBBF24',
    accentBg: 'rgba(251,191,36,0.12)',
    mockup: 'client',
  },
  {
    id: 5,
    time: 'Under 60s ✓',
    tag: 'Done',
    tagColor: '#34D399',
    headline: 'Shift filled. Done.',
    sub: 'No stress. No back-and-forth.',
    body: 'Your client is covered and your morning is still yours.',
    cta: null,
    icon: Confetti,
    accent: '#34D399',
    accentBg: 'rgba(52,211,153,0.12)',
    mockup: 'done',
  },
  {
    id: 6,
    time: null,
    tag: 'See it live',
    tagColor: '#38BDF8',
    headline: 'This is what modern staffing looks like.',
    sub: 'See it live for your agency.',
    body: 'Book a free demo today and watch your next vacancy fill itself.',
    cta: 'Book a free demo',
    icon: Sparkle,
    accent: '#38BDF8',
    accentBg: 'rgba(56,189,248,0.12)',
    mockup: 'demo',
  },
];

/* ─────────────────────────────────────────────
   PHONE MOCKUP SCREENS
───────────────────────────────────────────── */
function MockupAlert() {
  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(186,230,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Today</div>
      {/* Sick call notification */}
      <motion.div
        initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        style={{
          background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.35)',
          borderRadius: 14, padding: '14px 14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(248,113,113,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18 }}>🤒</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Sarah J. called in sick</div>
            <div style={{ fontSize: 10, color: 'rgba(186,230,255,0.45)', marginTop: 1 }}>NHS Ward B · Morning shift · 07:30</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(248,113,113,0.85)', fontWeight: 600 }}>⚠ Open vacancy — needs filling</div>
      </motion.div>
      {/* Panic state */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ display: 'flex', gap: 8 }}
      >
        {['Call workers?', 'WhatsApp group?', 'Agency?'].map((t, i) => (
          <div key={t} style={{ flex: 1, padding: '8px 6px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', textAlign: 'center', fontSize: 10, color: 'rgba(186,230,255,0.45)', fontWeight: 600, textDecoration: 'line-through' }}>
            {t}
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: EASE }}
        style={{ background: 'linear-gradient(135deg, #2399CA, #1966AA)', borderRadius: 12, padding: '12px 14px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}
      >
        ✦ Use Logezy instead
      </motion.div>
    </div>
  );
}

function MockupPost() {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Post a Shift</div>
      {[
        { label: 'Location', val: 'NHS Ward B, London' },
        { label: 'Date', val: 'Today · 07:30 – 19:30' },
        { label: 'Role', val: 'Healthcare Assistant (HCA)' },
        { label: 'Rate', val: '£14.50 / hr' },
      ].map((row, i) => (
        <motion.div key={row.label}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, ease: EASE }}
          style={{ borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', padding: '9px 12px' }}
        >
          <div style={{ fontSize: 9, color: 'rgba(186,230,255,0.40)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{row.label}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{row.val}</div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, ease: EASE }}
        style={{ background: 'linear-gradient(135deg, #38BDF8, #2399CA)', borderRadius: 12, padding: '13px', textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#fff', marginTop: 4, boxShadow: '0 6px 20px rgba(56,189,248,0.35)' }}
      >
        Post Shift →
      </motion.div>
    </div>
  );
}

function MockupNotify() {
  const workers = [
    { name: 'James O.', badge: '✓ DBS', sent: true },
    { name: 'Priya S.', badge: '✓ RTW', sent: true },
    { name: 'Marcus L.', badge: '✓ Compliant', sent: true },
    { name: 'Aisha K.', badge: '✓ DBS', sent: true },
  ];
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Notifications sent</div>
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
          style={{ fontSize: 10, fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }} /> Live
        </motion.div>
      </div>
      {workers.map((w, i) => (
        <motion.div key={w.name}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.12, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.25)' }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(167,139,250,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{w.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(167,139,250,0.70)', marginTop: 1 }}>{w.badge}</div>
          </div>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 400 }}
            style={{ fontSize: 10, fontWeight: 700, color: '#A78BFA', background: 'rgba(167,139,250,0.15)', padding: '3px 8px', borderRadius: 20 }}
          >
            Notified
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function MockupAccept() {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2 }}>Shift Confirmation</div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, ease: EASE }}
        style={{ borderRadius: 14, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.30)', padding: '14px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(52,211,153,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>James O.</div>
            <div style={{ fontSize: 10, color: 'rgba(52,211,153,0.70)' }}>HCA · Compliant · Available</div>
          </div>
        </div>
        {[['Shift', 'NHS Ward B'], ['Time', '07:30 – 19:30'], ['Rate', '£14.50/hr']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: 'rgba(186,230,255,0.40)' }}>{k}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{v}</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, ease: EASE }}
        style={{ background: 'linear-gradient(135deg, #34D399, #059669)', borderRadius: 12, padding: '13px', textAlign: 'center', boxShadow: '0 6px 22px rgba(52,211,153,0.35)' }}
      >
        <div style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>✓ Shift Accepted</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.70)', marginTop: 3 }}>James confirmed at 06:54</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }} />
        <span style={{ fontSize: 10, color: 'rgba(186,230,255,0.60)', fontWeight: 600 }}>Dashboard updated in real time</span>
      </motion.div>
    </div>
  );
}

function MockupClient() {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(186,230,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Client Portal</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>NHS Trust — Ward Schedule</div>
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease: EASE }}
        style={{ borderRadius: 12, background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.30)', padding: '12px 14px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#FBBF24' }}>Morning Shift · Ward B</div>
          <div style={{ fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 20, background: 'rgba(52,211,153,0.20)', color: '#34D399' }}>FILLED</div>
        </div>
        {[['Time', '07:30 – 19:30'], ['Assigned', 'James O. (HCA)'], ['Updated', 'Just now']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: 'rgba(186,230,255,0.40)' }}>{k}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#fff' }}>{v}</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, ease: EASE }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.20)' }}
      >
        <span style={{ fontSize: 16 }}>🔔</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Client notified automatically</div>
          <div style={{ fontSize: 10, color: 'rgba(186,230,255,0.45)' }}>No call. No email. Already done.</div>
        </div>
      </motion.div>
    </div>
  );
}

function MockupDone() {
  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
        style={{ fontSize: 52, lineHeight: 1 }}
      >
        🎉
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, ease: EASE }}
      >
        <div style={{ fontSize: 20, fontWeight: 900, color: '#34D399', letterSpacing: '-0.03em', marginBottom: 4 }}>Shift Filled</div>
        <div style={{ fontSize: 11, color: 'rgba(186,230,255,0.55)' }}>Total time: 54 seconds</div>
      </motion.div>
      {[
        { icon: '📋', label: 'Shift posted', time: '0s' },
        { icon: '🔔', label: 'Workers notified', time: '12s' },
        { icon: '✅', label: 'Accepted by James', time: '31s' },
        { icon: '🏥', label: 'Client updated', time: '54s' },
      ].map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 12px', borderRadius: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)' }}
        >
          <span style={{ fontSize: 14 }}>{s.icon}</span>
          <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: '#fff', textAlign: 'left' }}>{s.label}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#34D399' }}>{s.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

function MockupDemo() {
  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 280 }}
        style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #2399CA, #1966AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 8px 28px rgba(35,153,202,0.45)' }}
      >
        ✦
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease: EASE }}>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 4 }}>Logezy</div>
        <div style={{ fontSize: 10, color: 'rgba(186,230,255,0.50)' }}>Workforce Management for UK Agencies</div>
      </motion.div>
      {['Smart Scheduling', 'Compliance Tracking', 'Digital Timesheets', 'Auto Invoicing', 'Client Portal'].map((f, i) => (
        <motion.div key={f}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.07, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}
        >
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(56,189,248,0.20)', border: '1.5px solid rgba(56,189,248,0.50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 8, color: '#38BDF8' }}>✓</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(186,230,255,0.75)' }}>{f}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, ease: EASE }}
        style={{ width: '100%', background: 'linear-gradient(135deg, #2399CA, #1966AA)', borderRadius: 12, padding: '13px', textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#fff', marginTop: 4, boxShadow: '0 6px 22px rgba(35,153,202,0.40)' }}
      >
        Book a Free Demo →
      </motion.div>
    </div>
  );
}

const MOCKUP_MAP: Record<string, React.FC> = {
  alert: MockupAlert,
  post: MockupPost,
  notify: MockupNotify,
  accept: MockupAccept,
  client: MockupClient,
  done: MockupDone,
  demo: MockupDemo,
};

/* ─────────────────────────────────────────────
   PHONE SHELL
───────────────────────────────────────────── */
function PhoneShell({ mockupKey, accent }: { mockupKey: string; accent: string }) {
  const MockupContent = MOCKUP_MAP[mockupKey] ?? MockupAlert;
  return (
    <div style={{
      width: 280, flexShrink: 0,
      background: 'linear-gradient(160deg, #0F1E38 0%, #0A1628 100%)',
      borderRadius: 38,
      border: `2px solid ${accent}55`,
      boxShadow: [
        `0 0 0 5px ${accent}12`,
        `0 0 60px ${accent}30`,
        '0 40px 80px rgba(0,0,0,0.55)',
        '0 12px 32px rgba(0,0,0,0.35)',
      ].join(', '),
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dynamic island */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14, paddingBottom: 8 }}>
        <div style={{ width: 90, height: 26, borderRadius: 13, background: '#000' }} />
      </div>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px 8px', fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
        <span>9:41</span>
        <span>●●● 5G 🔋</span>
      </div>
      {/* Screen content */}
      <div style={{ minHeight: 380, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={mockupKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <MockupContent />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Home bar */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 18px' }}>
        <div style={{ width: 100, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.25)' }} />
      </div>
      {/* Accent glow inside */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
        background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function ProgressBar({ current, total, isPlaying, accent }: { current: number; total: number; isPlaying: boolean; accent: string }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.15)', overflow: 'hidden', position: 'relative' }}>
          {i < current && (
            <div style={{ position: 'absolute', inset: 0, background: accent, borderRadius: 99 }} />
          )}
          {i === current && isPlaying && (
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTO_DELAY / 1000, ease: 'linear' }}
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: accent, borderRadius: 99 }}
            />
          )}
          {i === current && !isPlaying && (
            <div style={{ position: 'absolute', inset: 0, background: accent, opacity: 0.6, borderRadius: 99 }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function ShowcaseCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  const slide = slides[current];

  const go = useCallback((next: number, d: number) => {
    setDir(d);
    setCurrent(next);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const prev = () => go((current - 1 + slides.length) % slides.length, -1);
  const next = () => go((current + 1) % slides.length, 1);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setTimeout(() => {
      setDir(1);
      setCurrent(c => (c + 1) % slides.length);
    }, AUTO_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPlaying]);

  return (
    <section style={{
      background: 'linear-gradient(160deg, #080E2A 0%, #0C1640 50%, #080E2A 100%)',
      padding: isMobile ? '60px 16px 72px' : '100px 48px 120px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '30%', width: 600, height: 500, background: `radial-gradient(ellipse, ${slide.accent}18 0%, transparent 68%)`, filter: 'blur(80px)', pointerEvents: 'none', transition: 'background 0.5s' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px', borderRadius: 100, marginBottom: 18,
            background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.28)',
          }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#38BDF8' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#7DD3FC', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>
              Platform Showcase
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 14px' }}>
            60 seconds to fill a shift.{' '}
            <span style={{ color: '#7DD3FC', display: 'inline'}}>
              Watch it happen.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(186,230,255,0.55)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            A real-world scenario — from sick call to shift covered — all inside Logezy.
          </p>
        </motion.div>

        {/* ── Main carousel ── */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 48, alignItems: isMobile ? 'stretch' : 'center' }}>

          {/* LEFT — copy */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Progress bar */}
            <div style={{ marginBottom: 28 }}>
              <ProgressBar current={current} total={slides.length} isPlaying={isPlaying} accent={slide.accent} />
            </div>

            {/* Slide tag + time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 100,
                background: `${slide.accent}18`, border: `1px solid ${slide.accent}35`,
              }}>
                <slide.icon weight="fill" size={11} style={{ color: slide.accent }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: slide.accent, letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>
                  {slide.tag}
                </span>
              </div>
              {slide.time && (
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(186,230,255,0.38)', padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  {slide.time}
                </div>
              )}
            </div>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, x: dir * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 10px' }}>
                  {slide.headline}
                </h3>
                <p style={{ fontSize: 16, fontWeight: 700, color: slide.accent, margin: '0 0 14px' }}>
                  {slide.sub}
                </p>
                <p style={{ fontSize: 15, color: 'rgba(186,230,255,0.62)', lineHeight: 1.72, margin: '0 0 32px', maxWidth: 460 }}>
                  {slide.body}
                </p>
                {slide.cta && slide.id === 6 && (
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', borderRadius: 100, textDecoration: 'none',
                    background: 'linear-gradient(135deg, #2399CA 0%, #1966AA 100%)',
                    color: '#fff', fontSize: 15, fontWeight: 700,
                    boxShadow: '0 8px 28px rgba(35,153,202,0.50)',
                    border: '1px solid rgba(255,255,255,0.20)',
                  }}>
                    {slide.cta}
                    <ArrowUpRight weight="bold" size={16} />
                  </Link>
                )}
                {slide.cta && slide.id === 0 && (
                  <button onClick={next} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 26px', borderRadius: 100,
                    background: `${slide.accent}18`, border: `1.5px solid ${slide.accent}40`,
                    color: slide.accent, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}>
                    {slide.cta}
                    <ArrowRight weight="bold" size={14} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slide counter + controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <button onClick={prev} style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
              }}>
                <ArrowLeft size={16} />
              </button>
              <button onClick={next} style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff',
              }}>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => setIsPlaying(p => !p)} style={{
                width: 40, height: 40, borderRadius: '50%',
                background: `${slide.accent}18`, border: `1px solid ${slide.accent}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: slide.accent,
              }}>
                {isPlaying ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
              </button>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(186,230,255,0.35)' }}>
                {current + 1} / {slides.length}
              </span>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  style={{
                    width: i === current ? 22 : 7,
                    height: 7, borderRadius: 99,
                    background: i === current ? slide.accent : 'rgba(255,255,255,0.20)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s',
                    boxShadow: i === current ? `0 0 8px ${slide.accent}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ flexShrink: 0, position: 'relative' }}
          >
            {/* Ambient glow */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -40,
                background: `radial-gradient(ellipse, ${slide.accent}22 0%, transparent 68%)`,
                filter: 'blur(40px)', pointerEvents: 'none',
                transition: 'background 0.5s',
              }}
            />
            <PhoneShell mockupKey={slide.mockup} accent={slide.accent} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
