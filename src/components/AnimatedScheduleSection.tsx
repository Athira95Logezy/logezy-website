import React, { useState, useEffect } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATES = ['2/6', '3/6', '4/6', '5/6', '6/6', '7/6'];

const ROLES = [
  { label: 'HCA',            color: '#3B82F6', lightBg: '#EFF6FF', chipBg: '#DBEAFE' },
  { label: 'Support Worker', color: '#8B5CF6', lightBg: '#F5F3FF', chipBg: '#EDE9FE' },
  { label: 'Senior Carer',   color: '#10B981', lightBg: '#ECFDF5', chipBg: '#D1FAE5' },
];

const WORKERS = [
  { name: 'Sarah J.',  initials: 'SJ', color: '#3B82F6' },
  { name: 'James O.',  initials: 'JO', color: '#10B981' },
  { name: 'Priya S.',  initials: 'PS', color: '#8B5CF6' },
  { name: 'Marcus L.', initials: 'ML', color: '#F59E0B' },
  { name: 'Aisha K.',  initials: 'AK', color: '#EF4444' },
  { name: 'Tom W.',    initials: 'TW', color: '#06B6D4' },
];

const GRID = [
  [0, 1, -1, 2, 0, 1],
  [2, 3, 4,  3, 2, 3],
  [1, 0, 2,  0, 4, 2],
];

/* ── Worker chip (light theme) ── */
function WorkerChip({ wIdx, role, open = false, accepted = false }:
  { wIdx: number; role: typeof ROLES[0]; open?: boolean; accepted?: boolean }) {

  if (open && !accepted) return (
    <motion.div
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
      style={{
        borderRadius: 8, padding: '6px 8px', minWidth: 80,
        background: '#FEF2F2', border: '1.5px dashed #FCA5A5',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
      }}
    >
      <span style={{ fontSize: 14 }}>⚠️</span>
      <span style={{ fontSize: 9, fontWeight: 800, color: '#EF4444', letterSpacing: '0.04em' }}>OPEN SHIFT</span>
      <span style={{ fontSize: 8, color: '#FCA5A5' }}>07:30–19:30</span>
    </motion.div>
  );

  if (accepted) return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      style={{
        borderRadius: 8, padding: '6px 8px', minWidth: 80,
        background: '#ECFDF5', border: '1.5px solid #6EE7B7',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
      }}
    >
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: WORKERS[1].color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9, fontWeight: 800, color: '#fff',
      }}>{WORKERS[1].initials}</div>
      <span style={{ fontSize: 9, fontWeight: 700, color: '#059669' }}>✓ {WORKERS[1].name}</span>
      <span style={{ fontSize: 8, color: '#6EE7B7' }}>07:30–19:30</span>
    </motion.div>
  );

  const w = WORKERS[wIdx];
  return (
    <div style={{
      borderRadius: 8, padding: '6px 8px', minWidth: 80,
      background: role.chipBg, border: `1px solid ${role.color}30`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: w.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9.5, fontWeight: 800, color: '#fff',
      }}>{w.initials}</div>
      <span style={{ fontSize: 9, fontWeight: 600, color: '#374151' }}>{w.name}</span>
      <span style={{ fontSize: 8, color: '#9CA3AF' }}>07:30</span>
    </div>
  );
}

/* ── Post shift panel (light) ── */
function PostPanel({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const fields = [
    { label: 'Role', val: 'Healthcare Assistant (HCA)' },
    { label: 'Location', val: 'NHS Ward B, London' },
    { label: 'Date', val: 'Wednesday, 4 June 2025' },
    { label: 'Time', val: '07:30 – 19:30' },
    { label: 'Pay Rate', val: '£14.50 / hr' },
  ];
  useEffect(() => {
    const t = setTimeout(() => {
      if (step < fields.length) setStep(s => s + 1);
      else onDone();
    }, step < fields.length ? 400 : 700);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.38, ease: EASE }}
      style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 230, zIndex: 20,
        background: '#fff',
        borderLeft: '1px solid #E5E7EB',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.10)',
        padding: '18px 16px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 4 }}>📋 Post Open Shift</div>
      {fields.slice(0, step).map(f => (
        <motion.div key={f.label}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ borderRadius: 8, padding: '8px 10px', background: '#F0F9FF', border: '1px solid #BAE6FD' }}
        >
          <div style={{ fontSize: 8, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{f.label}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{f.val}</div>
        </motion.div>
      ))}
      {step >= fields.length && (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', borderRadius: 10, padding: '10px', textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#fff', boxShadow: '0 4px 16px rgba(59,130,246,0.40)' }}>
          ✦ Posting shift...
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── Notification toasts (light) ── */
function Notifs({ onDone }: { onDone: () => void }) {
  const list = ['James O.', 'Priya S.', 'Marcus L.', 'Aisha K.'];
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
      {list.map((name, i) => (
        <motion.div key={name}
          initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ delay: i * 0.28, duration: 0.32, ease: EASE }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 12,
            background: '#fff', border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', minWidth: 175,
          }}
        >
          <span style={{ fontSize: 14 }}>🔔</span>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#111827' }}>Shift alert sent</div>
            <div style={{ fontSize: 9, color: '#6B7280' }}>{name} · HCA available</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Accept toast (light) ── */
function AcceptToast({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return (
    <motion.div
      initial={{ y: -40, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -30, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 25,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 18px', borderRadius: 14, whiteSpace: 'nowrap',
        background: '#fff', border: '1.5px solid #6EE7B7',
        boxShadow: '0 8px 28px rgba(16,185,129,0.20)',
      }}
    >
      <div style={{ width: 30, height: 30, borderRadius: 9, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>✅</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#065F46' }}>James O. accepted the shift</div>
        <div style={{ fontSize: 10, color: '#059669', marginTop: 1 }}>NHS Ward B · Wed 4/6 · 07:30–19:30 · confirmed in 28s</div>
      </div>
    </motion.div>
  );
}

/* DesktopMockup driven by external phase */
function DesktopMockupWithPhase({ phase, setPhase }: { phase: number; setPhase: (p: number) => void }) {
  return (
    <div style={{ background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', position: 'relative' }}>
      {/* Top nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #F1F5F9', background: '#FAFBFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#1966AA,#2399CA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff' }}>L</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>Job Schedule</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {['List view', 'Activity', 'Jobs', 'Options'].map((v, i) => (
              <div key={v} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 9.5, fontWeight: 600, background: i === 0 ? '#EFF6FF' : 'transparent', color: i === 0 ? '#3B82F6' : '#6B7280', border: i === 0 ? '1px solid #BFDBFE' : '1px solid transparent' }}>{v}{v === 'Options' ? ' ▾' : ''}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#6B7280' }}>View by jobs ▾</span>
          <div style={{ padding: '5px 12px', borderRadius: 8, background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', fontSize: 10, fontWeight: 700, color: '#fff', boxShadow: '0 3px 12px rgba(59,130,246,0.35)' }}>+ Post Shift</div>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(6,1fr)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFF' }}>
        <div style={{ padding: '8px 10px' }} />
        {DAYS.map((d, i) => (
          <div key={d} style={{ padding: '7px 8px', textAlign: 'center', borderLeft: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: i === 2 ? '#3B82F6' : '#9CA3AF', textTransform: 'uppercase' }}>{d}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: i === 2 ? '#1D4ED8' : '#374151' }}>{DATES[i]}</div>
          </div>
        ))}
      </div>

      {/* Shift group header */}
      <div style={{ padding: '7px 16px', background: '#F8FAFF', borderBottom: '1px solid #F1F5F9' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: '#374151' }}>☀ Morning shift</span>
      </div>

      {/* Grid rows */}
      {ROLES.map((role, ri) => (
        <div key={role.label} style={{ display: 'grid', gridTemplateColumns: '100px repeat(6,1fr)', borderBottom: '1px solid #F8FAFF', padding: '14px 0', background: ri % 2 === 0 ? '#fff' : '#FAFBFF' }}>
          <div style={{ padding: '0 10px', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <div style={{ width: 3, height: 24, borderRadius: 99, background: role.color, flexShrink: 0, marginTop: 4 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#374151', lineHeight: 1.3 }}>{role.label}</span>
          </div>
          {DAYS.map((_, di) => {
            const wIdx = GRID[ri][di];
            const isOpen = ri === 0 && di === 2;
            return (
              <div key={di} style={{ padding: '0 5px', borderLeft: '1px solid #F1F5F9', display: 'flex', justifyContent: 'center' }}>
                {isOpen
                  ? (phase >= 3 ? <WorkerChip wIdx={1} role={role} accepted /> : <WorkerChip wIdx={0} role={role} open />)
                  : <WorkerChip wIdx={wIdx} role={role} />}
              </div>
            );
          })}
        </div>
      ))}

      {/* Status bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderTop: '1px solid #F1F5F9', background: '#FAFBFF' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'Filled', val: phase >= 3 ? '18/18' : '17/18', color: '#10B981' },
            { label: 'Open',   val: phase >= 3 ? '0' : '1',         color: '#EF4444' },
            { label: 'Compliance', val: '98.4%',                     color: '#3B82F6' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: 9.5, color: '#9CA3AF' }}>{s.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>{s.val}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 9, color: '#9CA3AF' }}>
          {phase === 0 && '● 1 open shift'}{phase === 1 && '● Posting shift...'}{phase === 2 && '● Notifying workers...'}{phase === 3 && '✓ Shift filled in 28s'}{phase === 4 && '✓ All shifts covered'}
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {phase === 1 && <PostPanel key="post" onDone={() => { }} />}
      </AnimatePresence>
      <AnimatePresence>
        {phase === 2 && <Notifs key="notifs" onDone={() => { }} />}
      </AnimatePresence>
      <AnimatePresence>
        {phase === 3 && <AcceptToast key="accept" onDone={() => { }} />}
      </AnimatePresence>
    </div>
  );
}

/* ── Phone mockup ── */
function PhoneMockup({ phase }: { phase: number }) {
  return (
    <div style={{
      width: 300, flexShrink: 0,
      background: '#fff',
      borderRadius: 36,
      border: '2px solid #E5E7EB',
      boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {/* Dynamic island */}
      <div style={{ background: '#fff', display: 'flex', justifyContent: 'center', padding: '14px 0 8px' }}>
        <div style={{ width: 100, height: 26, borderRadius: 13, background: '#000' }} />
      </div>

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 6px', fontSize: 9, color: '#374151', fontWeight: 600 }}>
        <span>9:41</span><span>●●● 5G 🔋</span>
      </div>

      {/* App header */}
      <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #F1F5F9', background: '#FAFBFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, background: 'linear-gradient(135deg,#1966AA,#2399CA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#fff' }}>L</div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>My Shifts</span>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: 16 }}>🔔</span>
            {phase === 2 && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ position: 'absolute', top: -3, right: -3, width: 12, height: 12, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#fff' }}
              >4</motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px', minHeight: 420, background: '#fff' }}>
        <AnimatePresence mode="wait">
          {(phase === 0 || phase === 1) && (
            <motion.div key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', marginBottom: 4 }}>Today · 2 Jun</div>
              {['07:30–19:30', '19:30–07:30'].map((t, i) => (
                <div key={t} style={{
                  padding: '10px', borderRadius: 10, background: i === 0 ? '#DBEAFE' : '#F3F4F6',
                  border: `1px solid ${i === 0 ? '#93C5FD' : '#E5E7EB'}`,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: i === 0 ? '#1D4ED8' : '#6B7280' }}>NHS Ward B</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#111827', margin: '2px 0' }}>{t}</div>
                  <div style={{ fontSize: 9, color: i === 0 ? '#3B82F6' : '#9CA3AF' }}>HCA · £14.50/hr</div>
                </div>
              ))}
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="notif"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6B7280' }}>New shift available</div>
              <div style={{
                padding: '12px', borderRadius: 12,
                background: '#FFFBEB', border: '1.5px solid #FCD34D',
                boxShadow: '0 4px 14px rgba(251,191,36,0.18)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>🔔</span>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: '#92400E' }}>Open Shift Alert</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#78350F', marginBottom: 4 }}>NHS Ward B, London</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#111827' }}>Wed 4/6 · 07:30–19:30</div>
                <div style={{ fontSize: 10, color: '#92400E', marginTop: 2 }}>HCA · £14.50/hr</div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <div style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#10B981', textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#fff', boxShadow: '0 3px 12px rgba(16,185,129,0.35)' }}>
                  ✓ Accept
                </div>
                <div style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#F3F4F6', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#6B7280', border: '1px solid #E5E7EB' }}>
                  Decline
                </div>
              </div>
            </motion.div>
          )}

          {(phase === 3 || phase === 4) && (
            <motion.div key="confirmed"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ fontSize: 40, marginBottom: 8 }}
                >✅</motion.div>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#065F46' }}>Shift Confirmed!</div>
                <div style={{ fontSize: 10, color: '#059669', marginTop: 4 }}>James O. · confirmed at 06:54</div>
              </div>
              <div style={{
                padding: '12px', borderRadius: 12,
                background: '#ECFDF5', border: '1px solid #6EE7B7',
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Shift Details</div>
                {[['Location', 'NHS Ward B'], ['Date', 'Wed 4 June'], ['Time', '07:30 – 19:30'], ['Rate', '£14.50 / hr']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 9.5, color: '#6B7280' }}>{k}</span>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: '#111827' }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', padding: '8px 0 14px',
        borderTop: '1px solid #F1F5F9', background: '#FAFBFF',
      }}>
        {['🏠', '📅', '⏱', '📄', '👤'].map((icon, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            {i === 1 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3B82F6' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Floating Analytics Card (mini bar chart) ── */
function AnalyticsCard() {
  const bars = [40, 65, 50, 85, 70, 90, 75];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.6, ease: EASE }}
      style={{
        position: 'absolute',
        top: -18,
        right: -12,
        zIndex: 18,
        background: 'rgba(10,18,40,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(90,180,213,0.25)',
        borderRadius: 16,
        padding: '14px 16px',
        minWidth: 160,
        boxShadow: '0 8px 32px rgba(0,0,0,0.40), 0 0 0 1px rgba(90,180,213,0.10)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Weekly Fill Rate</span>
        <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>94.2%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 36 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{
              width: 8,
              height: `${(h / 100) * 36}px`,
              background: i === 5 ? '#38BDF8' : `rgba(56,189,248,${0.45 + h / 200})`,
              borderRadius: 3,
              transition: 'height 0.3s ease',
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        {days.map((d, i) => (
          <span key={i} style={{ width: 8, fontSize: 7, color: 'rgba(255,255,255,0.30)', textAlign: 'center', display: 'block' }}>{d}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Floating Notification Widget (bottom-right of phone) ── */
function AcceptedNotifWidget({ phase }: { phase: number }) {
  if (phase < 3) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      style={{
        position: 'absolute',
        bottom: -16,
        left: -10,
        zIndex: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 12,
        background: 'rgba(10,18,40,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(52,211,153,0.35)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.40), 0 0 0 1px rgba(52,211,153,0.10)',
        whiteSpace: 'nowrap',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{
          width: 22, height: 22, borderRadius: 7,
          background: 'rgba(52,211,153,0.20)',
          border: '1px solid rgba(52,211,153,0.50)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11,
        }}
      >✓</motion.div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>Worker accepted</div>
        <div style={{ fontSize: 9, color: 'rgba(52,211,153,0.85)', marginTop: 1 }}>James O. · just now</div>
      </div>
    </motion.div>
  );
}

/* ── Shared phase controller ── */
function ShowcasePair() {
  const [phase, setPhase] = useState(0);
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  useEffect(() => {
    if (phase === 0) { const t = setTimeout(() => setPhase(1), 2800); return () => clearTimeout(t); }
    if (phase === 1) { const t = setTimeout(() => setPhase(2), 3200); return () => clearTimeout(t); }
    if (phase === 2) { const t = setTimeout(() => setPhase(3), 2800); return () => clearTimeout(t); }
    if (phase === 3) { const t = setTimeout(() => setPhase(4), 2400); return () => clearTimeout(t); }
    if (phase === 4) { const t = setTimeout(() => setPhase(0), 3200); return () => clearTimeout(t); }
  }, [phase]);

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 0, alignItems: isMobile ? 'center' : 'flex-start', position: 'relative' }}>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, x: -28, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.72, delay: 0.30, ease: EASE }}
        style={{
          flexShrink: 0,
          marginTop: isMobile ? 0 : 80,
          marginRight: isMobile ? 0 : -60,
          zIndex: 8,
          position: 'relative',
          transform: isMobile ? 'scale(0.85)' : undefined,
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.45)) drop-shadow(0 0 40px rgba(0,212,255,0.18))',
            transform: 'rotate(-2deg)',
          }}
        >
          <PhoneMockup phase={phase} />
        </motion.div>
        {/* Notification widget attached to phone */}
        <AnimatePresence>
          {phase >= 3 && <AcceptedNotifWidget phase={phase} />}
        </AnimatePresence>
      </motion.div>

      {/* Desktop browser — hidden on mobile */}
      {!isMobile && <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.10, ease: EASE }}
        style={{
          flex: 1,
          minWidth: 0,
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Analytics card floating top-right */}
        <AnalyticsCard />

        {/* macOS chrome */}
        <div style={{
          borderRadius: '14px 14px 0 0',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.12), 0 24px 80px rgba(0,0,0,0.60), 0 0 120px rgba(90,180,213,0.20), 0 48px 120px rgba(0,0,0,0.40)',
          transform: 'perspective(1800px) rotateY(-4deg) rotateX(2deg)',
          transformOrigin: 'center top',
          filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.40)) drop-shadow(0 0 60px rgba(0,212,255,0.12))',
        }}>
          {/* Chrome bar */}
          <div style={{ background: 'linear-gradient(180deg,#EAEAEA 0%,#DEDEDE 100%)', padding: '9px 14px 0', borderBottom: '1px solid #C8C8C8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                  <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.15)' }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                {['‹', '›'].map((ch, i) => (
                  <div key={i} style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: i === 0 ? '#999' : '#CCC' }}>{ch}</div>
                ))}
              </div>
              <div style={{ flex: 1, height: 25, borderRadius: 7, background: 'rgba(255,255,255,0.90)', border: '1px solid #C0C0C0', display: 'flex', alignItems: 'center', paddingLeft: 10, gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#28C840' }} />
                <div style={{ flex: 1 }} />
                <div style={{ display: 'flex', gap: 3, paddingRight: 8 }}>
                  {[0, 1].map(i => (
                    <div key={i} style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i === 0
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                        : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 14px 5px 10px', borderRadius: '8px 8px 0 0', background: '#fff', border: '1px solid #C8C8C8', borderBottom: '1px solid #fff', minWidth: 150 }}>
                <div style={{ width: 12, height: 12, borderRadius: 4, background: 'linear-gradient(135deg,#1966AA,#2399CA)' }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: '#333', flex: 1 }}>Logezy — Schedule</span>
                <div style={{ fontSize: 9, color: '#777' }}>✕</div>
              </div>
              <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#aaa', paddingBottom: 2 }}>+</div>
            </div>
          </div>
          {/* Schedule content with phase passed in */}
          <DesktopMockupWithPhase phase={phase} setPhase={setPhase} />
        </div>

        {/* Reflection / fade beneath desktop */}
        <div style={{
          height: 48,
          background: 'linear-gradient(to bottom, rgba(25,102,170,0.18) 0%, transparent 100%)',
          marginTop: -2,
          borderRadius: '0 0 14px 14px',
          transform: 'perspective(1800px) rotateY(-4deg) rotateX(2deg)',
          transformOrigin: 'center top',
          opacity: 0.6,
          filter: 'blur(4px)',
          pointerEvents: 'none',
        }} />
      </motion.div>}
    </div>
  );
}

/* ── Flowing SVG curve line decoration ── */
function FlowingCurve() {
  return (
    <svg
      style={{ position: 'absolute', top: '30%', left: 0, width: '100%', pointerEvents: 'none', zIndex: 2, opacity: 0.35 }}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0,100 C200,30 400,170 600,100 C800,30 1000,160 1200,80 C1320,40 1400,120 1440,100"
        stroke="rgba(90,180,213,0.6)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        fill="none"
      />
    </svg>
  );
}

/* ── Organic blob background shape ── */
function OrganicBlob() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {/* Primary large blob */}
      <svg
        style={{ position: 'absolute', top: '15%', left: '30%', width: '70%', opacity: 1 }}
        viewBox="0 0 800 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(90,180,213,0.15)" />
            <stop offset="100%" stopColor="rgba(25,102,170,0.08)" stopOpacity="0" />
          </radialGradient>
          <filter id="blobBlur">
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </defs>
        <ellipse cx="400" cy="300" rx="380" ry="260" fill="url(#blobGrad)" filter="url(#blobBlur)" />
      </svg>

      {/* Glassmorphism floating rect */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '18%',
        width: 280,
        height: 140,
        borderRadius: 28,
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ── Floating geometric decorative shapes ── */
function GeometricShapes() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Hollow triangles */}
      <svg style={{ position: 'absolute', top: '8%', left: '4%', opacity: 0.7 }} width="32" height="28" viewBox="0 0 32 28" fill="none">
        <path d="M16 2L30 26H2L16 2Z" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '22%', right: '6%', opacity: 0.7 }} width="24" height="21" viewBox="0 0 24 21" fill="none">
        <path d="M12 2L22 19H2L12 2Z" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '60%', left: '2%', opacity: 0.55 }} width="28" height="25" viewBox="0 0 28 25" fill="none">
        <path d="M14 2L26 23H2L14 2Z" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', bottom: '18%', right: '3%', opacity: 0.65 }} width="36" height="31" viewBox="0 0 36 31" fill="none">
        <path d="M18 2L34 29H2L18 2Z" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '45%', right: '8%', opacity: 0.5 }} width="22" height="19" viewBox="0 0 22 19" fill="none">
        <path d="M11 2L20 17H2L11 2Z" stroke="#5AB4D5" strokeWidth="1.6" fill="none" />
      </svg>

      {/* Hollow circles */}
      <svg style={{ position: 'absolute', top: '12%', right: '12%', opacity: 0.7 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '55%', left: '7%', opacity: 0.6 }} width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="13" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', bottom: '25%', left: '12%', opacity: 0.5 }} width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '35%', right: '2%', opacity: 0.65 }} width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>

      {/* Hollow diamonds (rotated squares) */}
      <svg style={{ position: 'absolute', top: '5%', left: '18%', opacity: 0.7 }} width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="11" y="1.5" width="13" height="13" rx="1" transform="rotate(45 11 11)" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '70%', right: '10%', opacity: 0.65 }} width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="13" y="1.5" width="16" height="16" rx="1" transform="rotate(45 13 13)" stroke="#5AB4D5" strokeWidth="2" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', bottom: '12%', left: '22%', opacity: 0.55 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="10" y="1.5" width="12" height="12" rx="1" transform="rotate(45 10 10)" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '30%', left: '1%', opacity: 0.6 }} width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="9" y="1.5" width="10" height="10" rx="1" transform="rotate(45 9 9)" stroke="#5AB4D5" strokeWidth="1.8" fill="none" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────
   SECTION
───────────────────────────────── */
export default function AnimatedScheduleSection() {
  const vw = useWindowWidth();
  const isMobileSection = vw < 768;
  return (
    <section style={{
      background: 'linear-gradient(135deg, #183765 0%, #1966AA 40%, #2E8FBF 70%, #5AB4D5 100%)',
      padding: isMobileSection ? '60px 0 0' : '100px 0 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Organic blob behind devices */}
      <OrganicBlob />

      {/* Flowing curve line decoration */}
      <FlowingCurve />

      {/* Floating geometric shapes */}
      <GeometricShapes />

      {/* Subtle dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '30px 30px, 60px 60px, 60px 60px',
      }} />

      {/* Center glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse,rgba(90,180,213,0.22) 0%,transparent 68%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Center-right accent glow */}
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: 600, height: 600, background: 'radial-gradient(ellipse,rgba(90,180,213,0.25) 0%,transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1440, margin: '0 auto', padding: isMobileSection ? '0 16px' : '0 28px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: EASE }} style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 100, marginBottom: 20, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.30)' }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#00D4FF' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Live Workflow</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.08, margin: '0 0 16px' }}>
            All smart work tools{' '}
            <span style={{ backgroundImage: 'linear-gradient(125deg,#00D4FF 0%,#7DD3FC 50%,#34D399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>in one place.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.72, maxWidth: 500, margin: '0 auto 24px' }}>
            Watch Logezy fill an open shift in real time — from sick call to confirmed worker in under 60 seconds.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            {[
              { n: '1', label: 'Shift opens',      color: '#FF6B6B' },
              { n: '2', label: 'Posted instantly',  color: '#00D4FF' },
              { n: '3', label: 'Workers notified',  color: '#C084FC' },
              { n: '4', label: 'Shift accepted',    color: '#34D399' },
            ].map(s => (
              <div key={s.n} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: `1px solid ${s.color}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: s.color }}>{s.n}</div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.90)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phone + Desktop pair */}
        <ShowcasePair />

      </div>

      {/* Bottom curve — desktop only, hidden on mobile */}
      <div className="hidden md:block" style={{ position: 'relative', zIndex: 4, lineHeight: 0, marginTop: 60 }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: 120, display: 'block' }}>
          {/* Deep teal accent layer */}
          <path
            d="M0,80 C180,30 360,100 540,65 C720,30 900,95 1080,60 C1260,25 1380,75 1440,70 L1440,120 L0,120 Z"
            fill="rgba(25,102,170,0.35)"
          />
          {/* Mid blue layer */}
          <path
            d="M0,90 C200,50 400,110 600,75 C800,40 1000,100 1200,68 C1320,48 1400,88 1440,82 L1440,120 L0,120 Z"
            fill="rgba(35,153,202,0.25)"
          />
          {/* Bottom fill — next section colour */}
          <path
            d="M0,100 C240,55 480,115 720,80 C960,45 1200,105 1440,88 L1440,120 L0,120 Z"
            fill="#F7F6FF"
          />
        </svg>
      </div>
    </section>
  );
}
