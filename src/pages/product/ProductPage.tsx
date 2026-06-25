import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {
  CalendarBlank, Clock, Bell, Shield, MapPin, ChartBar, ChartLine, Receipt,
  Users, DeviceMobile, Buildings, Briefcase, FileText, ArrowRight, CheckCircle,
  Eye, Lightning, Warning, FolderSimple, LockSimple, ArrowsClockwise, ChatCircle,
  Star, Handshake, Trophy, ClipboardText, Timer, PenNib, UserCircle,
  ClockCounterClockwise, List, Percent, Phone,
} from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const NAVY = '#183963';
const INDIGO = '#2396C6';

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
interface FeatureCard {
  icon: React.ElementType;
  title: string;
  desc: string;
}
interface FeatureGroup {
  heading: string;
  items: FeatureCard[];
}
interface PageConfig {
  slug: string;
  category: string;
  accent: string;
  accentBg: string;
  heroBg: string;
  title: string;
  tagline: string;
  heroDesc: string;
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIntro: string;
  ctaLine: string;
  groups: FeatureGroup[];
  Mockup: React.FC;
}

/* ═══════════════════════════════════════════════════
   CHROME WRAPPERS
═══════════════════════════════════════════════════ */
function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.13)', border: '1px solid rgba(0,0,0,0.07)' }}>
      <div style={{ background: '#F1F3F5', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: 5, padding: '3px 10px' }} />
      </div>
      {children}
    </div>
  );
}

function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: 230, margin: '0 auto' }}>
      <div style={{
        borderRadius: 36, overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 0 10px #1A1A2E, 0 0 0 12px rgba(255,255,255,0.12)',
      }}>
        <div style={{ background: '#1A1A2E', height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 56, height: 6, background: '#2D2D3A', borderRadius: 3 }} />
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MOCKUP COMPONENTS
═══════════════════════════════════════════════════ */
function SchedulingMockup() {
  return (
    <BrowserChrome>
      <img
        src="/schedule.png"
        alt="Logezy Schedule Dashboard"
        style={{ width: '100%', display: 'block', borderRadius: '0 0 10px 10px' }}
      />
    </BrowserChrome>
  );
}

function AvailabilityMockup() {
  const workers = [
    { name: 'Sarah M.', role: 'HCA', days: [true, true, false, true, true, false, false] },
    { name: 'James O.', role: 'Nurse', days: [false, true, true, true, false, true, false] },
    { name: 'Priya S.', role: 'Support', days: [true, false, true, false, true, true, true] },
    { name: 'Tom E.', role: 'HCA', days: [true, true, true, false, true, false, true] },
  ];
  return (
    <BrowserChrome>
      <div style={{ background: 'white', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Live Availability</span>
          <span style={{ fontSize: 9, background: '#DCFCE7', color: '#16A34A', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>This Week</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '68px repeat(7,1fr)', gap: 3, fontSize: 8 }}>
          <div />
          {['M','T','W','T','F','S','S'].map((d, i) => <div key={i} style={{ color: '#9CA3AF', fontWeight: 700, textAlign: 'center' }}>{d}</div>)}
          {workers.map(w => (
            <React.Fragment key={w.name}>
              <div><div style={{ color: NAVY, fontWeight: 600, fontSize: 9 }}>{w.name}</div><div style={{ color: '#9CA3AF', fontSize: 8 }}>{w.role}</div></div>
              {w.days.map((avail, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 15, height: 15, borderRadius: 4, background: avail ? '#DCFCE7' : '#F3F4F6', border: `1px solid ${avail ? '#86EFAC' : '#E5E7EB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {avail && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 14, fontSize: 9 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: '#DCFCE7', border: '1px solid #86EFAC' }} />Available</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: '#F3F4F6', border: '1px solid #E5E7EB' }} />Unavailable</span>
        </div>
      </div>
    </BrowserChrome>
  );
}

function CandidateClientMockup() {
  return (
    <BrowserChrome>
      <div style={{ background: '#F8FAFC', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: 'white', borderRadius: 10, padding: 12, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2396C6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>SM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>Sarah Mitchell</div>
              <div style={{ fontSize: 9, color: '#6B7280' }}>Healthcare Assistant · Band 3</div>
            </div>
            <span style={{ fontSize: 8, background: '#DCFCE7', color: '#16A34A', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>Active</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5 }}>
            {[['DBS','Valid ✓'],['RTW','Valid ✓'],['Shifts','47']].map(([l, v]) => (
              <div key={l} style={{ background: '#F8FAFC', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 8, color: '#9CA3AF' }}>{l}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: NAVY }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 10, padding: 12, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0891B2,#06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 700 }}>NHS</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>NHS Trust A</div>
              <div style={{ fontSize: 9, color: '#6B7280' }}>3 active bookings · £48,200 YTD</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {['CQC Ready','12 Invoices','98% Coverage'].map(t => (
              <span key={t} style={{ fontSize: 8, background: '#EFF6FF', color: '#2563EB', padding: '2px 7px', borderRadius: 20, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function ComplianceMockup() {
  return (
    <BrowserChrome>
      <div style={{ background: 'white', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Compliance Dashboard</span>
          <span style={{ fontSize: 9, background: '#DCFCE7', color: '#16A34A', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>98.7%</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
          {[['312/312','DBS Current'],['96.2%','Training Done'],['47/47','Audits Passed'],['0','Expired Docs']].map(([v, l]) => (
            <div key={l} style={{ background: '#F8FAFC', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{v}</div>
              <div style={{ fontSize: 9, color: '#6B7280' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Recent Documents</div>
        {[
          { name: 'DBS Certificate', worker: 'S. Mitchell · Aug 2026', s: 'Pass', sc: '#16A34A', sb: '#DCFCE7' },
          { name: 'Right to Work', worker: 'J. Okafor · Mar 2027', s: 'Pass', sc: '#16A34A', sb: '#DCFCE7' },
          { name: 'Training Cert.', worker: 'P. Sharma · Jun 2025', s: 'Expiring', sc: '#D97706', sb: '#FEF3C7' },
          { name: 'GPS Verification', worker: 'T. Edwards · Ongoing', s: 'Live', sc: '#0891B2', sb: '#ECFEFF' },
        ].map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 600, color: NAVY }}>{d.name}</div>
              <div style={{ fontSize: 8, color: '#9CA3AF' }}>{d.worker}</div>
            </div>
            <span style={{ fontSize: 8, background: d.sb, color: d.sc, padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>{d.s}</span>
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

function TimesheetsMockup() {
  return (
    <BrowserChrome>
      <div style={{ background: 'white', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Timesheet Inbox</span>
          <span style={{ fontSize: 9, background: '#FEF3C7', color: '#D97706', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>6 Pending</span>
        </div>
        {[
          { name: 'Sarah M.', shift: 'NHS Ward B · 07:00–15:00', hrs: '8 hrs', signed: true },
          { name: 'James O.', shift: 'HC-One · 15:00–23:00', hrs: '8 hrs', signed: true },
          { name: 'Priya S.', shift: 'Royal Hospital · 07:00–19:00', hrs: '12 hrs', signed: false },
        ].map(t => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: NAVY }}>{t.name}</div>
              <div style={{ fontSize: 8, color: '#6B7280' }}>{t.shift}</div>
              <div style={{ fontSize: 8, color: '#9CA3AF', marginTop: 1 }}>{t.hrs} · {t.signed ? '✓ e-signed' : 'Awaiting signature'}</div>
            </div>
            <div style={{ fontSize: 8, background: t.signed ? '#E8F5FB' : '#F3F4F6', color: t.signed ? INDIGO : '#9CA3AF', padding: '4px 10px', borderRadius: 6, fontWeight: 700 }}>
              {t.signed ? 'Approve' : 'Pending'}
            </div>
          </div>
        ))}
        <button style={{ marginTop: 10, width: '100%', padding: '8px 0', background: `linear-gradient(135deg,${INDIGO},#7C3AED)`, color: 'white', border: 'none', borderRadius: 8, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>
          Approve All Signed (5)
        </button>
      </div>
    </BrowserChrome>
  );
}

function InvoicingMockup() {
  return (
    <BrowserChrome>
      <div style={{ background: 'white', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>Invoice #INV-3415</div>
            <div style={{ fontSize: 9, color: '#6B7280' }}>NHS Trust A · Week 20</div>
          </div>
          <span style={{ fontSize: 9, background: '#FEF3C7', color: '#D97706', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>Pending</span>
        </div>
        <div style={{ borderTop: '1px solid #F3F4F6', marginTop: 10, paddingTop: 10 }}>
          {[
            { w: 'S. Mitchell', r: 'HCA', h: '40h', rate: '£14.50', t: '£580' },
            { w: 'J. Okafor', r: 'Nurse', h: '36h', rate: '£22.00', t: '£792' },
            { w: 'P. Sharma', r: 'Support', h: '32h', rate: '£13.00', t: '£416' },
          ].map(row => (
            <div key={row.w} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, padding: '4px 0', borderBottom: '1px solid #F9FAFB', fontSize: 9, alignItems: 'center' }}>
              <div><div style={{ fontWeight: 600, color: NAVY }}>{row.w}</div><div style={{ color: '#9CA3AF' }}>{row.r}</div></div>
              <div style={{ color: '#6B7280' }}>{row.h}</div>
              <div style={{ color: '#6B7280' }}>{row.rate}/h</div>
              <div style={{ fontWeight: 700, color: NAVY }}>{row.t}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '2px solid #E5E7EB' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: INDIGO }}>£1,788</span>
          </div>
        </div>
        <button style={{ marginTop: 10, width: '100%', padding: '8px 0', background: 'linear-gradient(135deg,#16A34A,#22C55E)', color: 'white', border: 'none', borderRadius: 8, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>
          Send Invoice →
        </button>
      </div>
    </BrowserChrome>
  );
}

function MobileAppMockup() {
  return (
    <PhoneChrome>
      <div style={{ background: 'linear-gradient(160deg,#183963,#183963)', padding: '16px 14px', minHeight: 290 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginBottom: 1 }}>Good morning,</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Sarah 👋</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>3 shifts this week</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2396C6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700 }}>S</div>
        </div>
        {[
          { title: 'NHS Ward B', time: 'Today · 7:00–15:00', status: 'Confirmed', sc: '#22C55E', sb: 'rgba(34,197,94,0.15)' },
          { title: 'Royal Hospital', time: 'Tomorrow · 7:00–19:00', status: 'Upcoming', sc: '#F59E0B', sb: 'rgba(245,158,11,0.15)' },
          { title: 'HC-One Group', time: 'Fri · 15:00–23:00', status: 'Upcoming', sc: '#F59E0B', sb: 'rgba(245,158,11,0.15)' },
        ].map((shift, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px', marginBottom: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{shift.title}</div>
              <span style={{ fontSize: 8, background: shift.sb, color: shift.sc, padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>{shift.status}</span>
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{shift.time}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {['Shifts','Availability','Timesheets','Chat'].map(tab => (
            <div key={tab} style={{ fontSize: 8, color: tab === 'Shifts' ? '#2396C6' : 'rgba(255,255,255,0.35)', fontWeight: tab === 'Shifts' ? 700 : 400, textAlign: 'center' }}>{tab}</div>
          ))}
        </div>
      </div>
    </PhoneChrome>
  );
}

function RecruitmentMockup() {
  const steps = [
    { n: '01', title: 'Personal Details', s: 'done' },
    { n: '02', title: 'ID & Right to Work', s: 'done' },
    { n: '03', title: 'DBS Check', s: 'active' },
    { n: '04', title: 'Training Certificates', s: 'pending' },
    { n: '05', title: 'References', s: 'pending' },
  ];
  return (
    <BrowserChrome>
      <div style={{ background: 'white', padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Candidate Onboarding</div>
          <div style={{ fontSize: 9, color: '#6B7280' }}>Emma Clarke — Healthcare Assistant</div>
        </div>
        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '8px 10px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#6B7280', marginBottom: 4 }}>
            <span>Onboarding Progress</span>
            <span style={{ fontWeight: 700, color: INDIGO }}>40% complete</span>
          </div>
          <div style={{ height: 6, background: '#E5E7EB', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: `linear-gradient(90deg,${INDIGO},#7C3AED)`, borderRadius: 3 }} />
          </div>
        </div>
        {steps.map(s => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: s.s === 'done' ? '#DCFCE7' : s.s === 'active' ? '#E8F5FB' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {s.s === 'done' ? <span style={{ fontSize: 10, color: '#16A34A' }}>✓</span> : <span style={{ fontSize: 8, fontWeight: 700, color: s.s === 'active' ? INDIGO : '#9CA3AF' }}>{s.n}</span>}
            </div>
            <span style={{ fontSize: 10, fontWeight: s.s === 'active' ? 700 : 500, color: s.s === 'pending' ? '#9CA3AF' : NAVY }}>{s.title}</span>
            {s.s === 'active' && <span style={{ marginLeft: 'auto', fontSize: 8, color: INDIGO, fontWeight: 700 }}>In progress</span>}
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

function ClientPortalMockup() {
  return (
    <BrowserChrome>
      <div style={{ background: '#F8FAFC', padding: 12 }}>
        <div style={{ background: 'white', borderRadius: 10, padding: 12, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>Client Portal — NHS Trust A</div>
            <span style={{ fontSize: 8, background: '#DCFCE7', color: '#16A34A', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>Live</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5, marginBottom: 10 }}>
            {[['47','Booked Today'],['182','Shifts This Week'],['3','Timesheets Due']].map(([v, l]) => (
              <div key={l} style={{ background: '#F8FAFC', borderRadius: 7, padding: '7px 6px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{v}</div>
                <div style={{ fontSize: 8, color: '#6B7280' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, color: NAVY, marginBottom: 6 }}>Today's Workforce</div>
          {[
            { name: 'Sarah Mitchell', role: 'Ward B · Nurse · 07:00–15:00', s: 'Live', sc: '#22C55E', sb: 'rgba(34,197,94,0.1)' },
            { name: 'James Okafor', role: 'ICU · Support Worker · 15:00–23:00', s: 'Seen', sc: '#F59E0B', sb: 'rgba(245,158,11,0.1)' },
            { name: 'Priya Sharma', role: 'A&E · Healthcare Asst · 07:00–19:00', s: 'Live', sc: '#22C55E', sb: 'rgba(34,197,94,0.1)' },
          ].map(w => (
            <div key={w.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #F3F4F6' }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: NAVY }}>{w.name}</div>
                <div style={{ fontSize: 8, color: '#9CA3AF' }}>{w.role}</div>
              </div>
              <span style={{ fontSize: 8, background: w.sb, color: w.sc, padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>● {w.s}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE CONFIGS
═══════════════════════════════════════════════════ */
const pages: PageConfig[] = [
  {
    slug: 'scheduling',
    category: 'Workforce',
    accent: '#2396C6',
    accentBg: '#E8F5FB',
    heroBg: 'linear-gradient(135deg,#E8F5FB 0%,#F5F3FF 60%,#FFFFFF 100%)',
    title: 'Scheduling',
    tagline: 'Fill every shift. In minutes, not hours.',
    heroDesc: "Temp recruitment doesn't wait. Shifts change, workers cancel, and clients need cover now, not tomorrow. Logezy's intelligent scheduling engine gives your team the speed and visibility to stay ahead of every change, without the back-and-forth that eats up your day.",
    sectionTitle: 'Smart Scheduling Built for Temp Agencies',
    sectionSubtitle: 'The right information, right when you need it.',
    sectionIntro: "When creating a shift, Logezy shows your team which workers are available, in the right location, and qualified for the role, all at a glance. No more cross-referencing spreadsheets or calling workers to check if they're free. Your admins make faster, more informed decisions and get shifts filled with the right people, every time.",
    ctaLine: 'See smarter scheduling in action.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: Eye, title: 'Availability at a glance', desc: "See exactly who's free before you assign a shift. Logezy surfaces live worker availability so your team always schedules from accurate, up-to-date information." },
        { icon: MapPin, title: 'Role and location matching', desc: 'Filter workers by job role and location when filling a shift, so you\'re always placing someone who\'s qualified and able to get there.' },
        { icon: Bell, title: 'Instant shift notifications', desc: 'The moment a shift is assigned and published, workers are notified directly on their phone. No delays, no missed messages.' },
        { icon: ChartBar, title: 'Real-time schedule visibility', desc: "Your whole team works from the same live view. No conflicting spreadsheets, no double bookings, no confusion over who is placed where." },
        { icon: Clock, title: 'Automated shift reminders', desc: 'Workers receive automatic reminders ahead of every shift, reducing no-shows and keeping your clients covered without manual follow-up.' },
        { icon: Lightning, title: 'Last-minute cover made easier', desc: 'When someone drops out, your team can quickly identify available, qualified workers and get the shift reassigned in minutes.' },
      ],
    }],
    Mockup: SchedulingMockup,
  },
  {
    slug: 'availability',
    category: 'Workforce',
    accent: '#2396C6',
    accentBg: '#E8F5FB',
    heroBg: 'linear-gradient(135deg,#E8F5FB 0%,#ECFEFF 60%,#FFFFFF 100%)',
    title: 'Availability',
    tagline: "Know who's free before you pick up the phone.",
    heroDesc: "Chasing workers to check availability is one of the most time-consuming parts of running a temp agency. Calling down a list, waiting for replies, sending follow-up messages, all to find out who can cover a shift that needs filling today. Logezy puts an end to that.",
    sectionTitle: 'Real-Time Availability, Always Up to Date',
    sectionSubtitle: 'No more guessing. No more unnecessary calls.',
    sectionIntro: "With Logezy, workers update their own availability directly through the candidate mobile app whenever it changes. Your team gets a live, accurate view of who's free, when they're free, and where they're available to work. By the time you're ready to fill a shift, the information you need is already there.",
    ctaLine: 'Stop guessing. Start knowing.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: DeviceMobile, title: 'Worker-managed availability', desc: 'Temps update their own availability through the app at any time. Your team always works from current, accurate information, not what someone told you last week.' },
        { icon: Users, title: 'Live visibility across your workforce', desc: 'See availability across your entire temp workforce in one place. No spreadsheets, no availability forms, no chasing. Just a clear, real-time picture of who\'s ready to work.' },
        { icon: Lightning, title: 'Fewer calls, faster placements', desc: 'When availability is always up to date, your consultants spend less time on the phone and more time placing workers. Shifts get filled faster and with the right people.' },
        { icon: CalendarBlank, title: 'Better scheduling decisions', desc: "Availability feeds directly into Logezy's scheduling tools, so when your team is filling a shift, they're already working from an accurate picture of who can take it." },
      ],
    }],
    Mockup: AvailabilityMockup,
  },
  {
    slug: 'candidate-client',
    category: 'Workforce',
    accent: '#2396C6',
    accentBg: '#E8F5FB',
    heroBg: 'linear-gradient(135deg,#F5F3FF 0%,#EFF6FF 60%,#FFFFFF 100%)',
    title: 'Candidate & Client Management',
    tagline: 'Every worker. Every client. One place.',
    heroDesc: "Running a temp agency means managing a lot of moving parts: candidate records, client accounts, compliance documents, shift histories, and billing information. When that data is spread across spreadsheets, email threads, and shared drives, things get missed. Logezy brings it all into one clean, organised platform so nothing falls through the cracks.",
    sectionTitle: 'A Complete View of Every Candidate and Every Client',
    sectionSubtitle: 'From first registration to final shift.',
    sectionIntro: "Every candidate on your books has their own profile in Logezy, covering personal details, compliance documents, job roles, availability, shift history, and timesheet records. Every client account gives your team full visibility over active shifts, coverage status, compliance documentation, and invoice history, without switching between systems.",
    ctaLine: 'See it for yourself.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: Users, title: 'Centralised candidate records', desc: 'Every worker profile in one place. Documents, availability, shift history, timesheets, and compliance status all connected and always current.' },
        { icon: Buildings, title: 'Centralised client accounts', desc: 'A complete view of every client including active bookings, coverage levels, billing history, and compliance reporting, without manually compiling data from multiple sources.' },
        { icon: Shield, title: 'Automated compliance flagging', desc: "Logezy automatically flags expiring documents and incomplete records across your candidate base, so your team stays on top of compliance without manual checking." },
        { icon: FileText, title: 'Shift and timesheet history', desc: 'Every shift worked and every timesheet submitted is linked to the relevant candidate and client record, giving your team a full, accurate history at any point.' },
        { icon: ChartLine, title: 'Proactive client reporting', desc: 'Share live compliance and coverage data with clients directly from Logezy, positioning your agency as a transparent, professional operation that clients want to keep.' },
      ],
    }],
    Mockup: CandidateClientMockup,
  },
  {
    slug: 'compliance',
    category: 'Compliance & Payroll',
    accent: '#F59E0B',
    accentBg: '#FEF3C7',
    heroBg: 'linear-gradient(135deg,#FFFBEB 0%,#F0FDF4 60%,#FFFFFF 100%)',
    title: 'Compliance',
    tagline: 'Stay audit-ready. Without the stress.',
    heroDesc: "Compliance is one of the highest-risk areas of running a temp recruitment agency. One expired document, one missed right-to-work check, one lapsed DBS certificate and your agency is exposed. Logezy gives your agency a centralised, automated compliance management system that keeps every worker's documentation tracked, current, and audit-ready at all times.",
    sectionTitle: 'Compliance Management Built for Temp Agencies',
    sectionSubtitle: 'Every document. Every worker. Always on top of it.',
    sectionIntro: "Logezy stores and tracks all worker compliance documents in one centralised place: right-to-work documents, DBS certificates, visas, training qualifications, professional licences, and any other documentation your agency or clients require. When something is approaching expiry, Logezy sends automated reminders to your team and to the worker, so nothing lapses unnoticed.",
    ctaLine: 'Compliance sorted. Every worker. Every shift.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: FolderSimple, title: 'Centralised document storage', desc: "Every compliance document for every worker, stored, organised, and accessible in one place. No more searching through email attachments or chasing physical paperwork." },
        { icon: Clock, title: 'Automated expiry tracking', desc: 'Logezy tracks expiry dates across your entire workforce and sends automated alerts before documents lapse, so your team stays ahead of compliance without manual monitoring.' },
        { icon: DeviceMobile, title: 'Worker self-upload via mobile app', desc: "Workers upload their own compliance documents directly through the Logezy candidate app. Records stay current in real time and your team spends less time chasing." },
        { icon: FileText, title: 'Covers all document types', desc: 'Right-to-work checks, DBS certificates, visas, training qualifications, professional licences. Logezy handles every document type your agency requires, fully configurable to your needs.' },
        { icon: Shield, title: 'Audit-ready at all times', desc: 'Every document is stored, timestamped, and accessible at any point. When a client requests compliance evidence, your agency has everything it needs immediately.' },
        { icon: CheckCircle, title: 'Placement protection', desc: "Logezy flags incomplete or expired compliance records before a shift is assigned, protecting your agency from the risk of placing a worker who isn't fully compliant." },
      ],
    }],
    Mockup: ComplianceMockup,
  },
  {
    slug: 'timesheets',
    category: 'Compliance & Payroll',
    accent: '#F59E0B',
    accentBg: '#FEF3C7',
    heroBg: 'linear-gradient(135deg,#FFFBEB 0%,#EFF6FF 60%,#FFFFFF 100%)',
    title: 'Digital Timesheets',
    tagline: 'No paper. No chasing. No end-of-week scramble.',
    heroDesc: "If your agency is still collecting timesheets via WhatsApp photos, email attachments, or paper forms, you already know the problem. Chasing workers, correcting errors, and manually entering data into payroll. It happens every single week, and it costs your team hours they don't have. Logezy replaces all of it.",
    sectionTitle: 'Digital Timesheets Built for Temp Recruitment',
    sectionSubtitle: 'Submitted from their phone. Approved in one click.',
    sectionIntro: "Workers submit their timesheets digitally through the Logezy candidate app, complete with e-signature functionality. Every timesheet is timestamped and locked on approval — creating a verified, tamper-proof record of hours worked that is immediately available for your team to review. Admins can approve individually or in bulk with a single tap.",
    ctaLine: 'Say goodbye to paper timesheets for good.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: DeviceMobile, title: 'Mobile timesheet submission', desc: 'Workers submit timesheets directly from their phone through the Logezy app, anytime and from any location. No forms, no paper, no manual handover.' },
        { icon: PenNib, title: 'E-signature verification', desc: 'Every timesheet is signed digitally by the worker, creating a verified, timestamped record that removes ambiguity and eliminates disputes.' },
        { icon: CheckCircle, title: 'Bulk approval', desc: 'Admins review and approve timesheets individually or in bulk, cutting approval time from hours to minutes, every single week.' },
        { icon: LockSimple, title: 'Tamper-proof records', desc: 'Once approved, timesheets are locked and stored securely. Your agency has a clean, accurate record of every hour worked, accessible at any time.' },
        { icon: ArrowsClockwise, title: 'Automatic payroll and invoicing sync', desc: 'Approved timesheets feed directly into payroll reporting and invoice generation, removing manual data entry and keeping your billing cycle fast and accurate.' },
        { icon: Shield, title: 'Dispute elimination', desc: 'Digital submission with e-signature means every timesheet is verified and agreed at the point of submission. Disputes become rare. Corrections become unnecessary.' },
      ],
    }],
    Mockup: TimesheetsMockup,
  },
  {
    slug: 'invoicing',
    category: 'Compliance & Payroll',
    accent: '#F59E0B',
    accentBg: '#FEF3C7',
    heroBg: 'linear-gradient(135deg,#FFFBEB 0%,#ECFEFF 60%,#FFFFFF 100%)',
    title: 'Invoicing',
    tagline: 'Accurate invoices. One click. Every time.',
    heroDesc: "For most temp agencies, invoicing is a process that happens at the end of a long week: manually pulling timesheet data, calculating rates, building invoices, and hoping nothing was missed. It's slow, it's error-prone, and it delays the one thing that keeps your agency running: getting paid. Logezy removes the manual effort entirely.",
    sectionTitle: 'Invoicing Built Around Your Timesheet Process',
    sectionSubtitle: 'Approved timesheets. Instant invoices.',
    sectionIntro: "Once timesheets are approved in Logezy, client and candidate invoices are generated with a single click, accurately calculated based on the agreed client rates and staff rates for each role and shift. No manual data entry. No spreadsheet calculations. No risk of billing the wrong rate to the wrong client.",
    ctaLine: 'Get paid faster. Bill with confidence.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: Receipt, title: 'Single-click invoice generation', desc: 'Once timesheets are approved, invoices are generated with one click. Itemised, accurate, and ready to send to your client immediately.' },
        { icon: ChartBar, title: 'Automatic payroll reporting', desc: 'Every invoice is accompanied by a payroll report calculated from the same approved timesheet data, so worker payments are always accurate and ready to process.' },
        { icon: Percent, title: 'Variable rate support', desc: 'Different job roles, different clients, different rates. Logezy handles it all automatically. Every invoice reflects the correct figures without manual calculation.' },
        { icon: List, title: 'Itemised billing', desc: 'Every invoice is clearly itemised by shift, worker, and rate, giving clients full transparency over what they\'re being charged and why.' },
        { icon: Lightning, title: 'Faster payment cycles', desc: 'Invoices go out faster, with fewer errors and zero manual preparation. The result is a cleaner billing process, fewer payment delays, and better cash flow.' },
        { icon: ClockCounterClockwise, title: 'Complete billing history', desc: 'Every invoice ever generated is stored and accessible in Logezy, giving your team and your clients a full, accurate billing history at any point.' },
      ],
    }],
    Mockup: InvoicingMockup,
  },
  {
    slug: 'mobile-app',
    category: 'Portals & Communication',
    accent: '#0891B2',
    accentBg: '#ECFEFF',
    heroBg: 'linear-gradient(135deg,#ECFEFF 0%,#E8F5FB 60%,#FFFFFF 100%)',
    title: 'Candidate Mobile App',
    tagline: 'Keep your workers connected. Always.',
    heroDesc: "Most temp workers are managing their work life from their phone. Shifts, availability, documents, pay — they expect it all to be simple, instant, and mobile. Logezy gives your agency a fully branded candidate app that delivers exactly that, while significantly reducing the admin burden on your team.",
    sectionTitle: 'Your Brand. Their Phone.',
    sectionSubtitle: 'A professional mobile experience that\'s entirely yours.',
    sectionIntro: "The Logezy candidate app is fully branded to your agency with your logo and your name. When your workers download it, it feels like something your agency built for them. That level of professionalism builds loyalty, improves engagement, and keeps your workers active on your books rather than drifting to competitors. Available on iOS and Android.",
    ctaLine: 'Give your workers the app they deserve.',
    groups: [
      {
        heading: 'What Workers Can Do In The App',
        items: [
          { icon: Briefcase, title: 'Vacancies', desc: "Workers browse available shifts posted by your agency and apply directly from the app, giving them the flexibility to pick up work that suits their schedule without waiting for a call." },
          { icon: CalendarBlank, title: 'Bookings', desc: "Every confirmed shift appears in the worker's bookings in real time, with shift details, date, time, and location all in one place. No more contacting the agency to find out where they're working." },
          { icon: Clock, title: 'Availability', desc: "Workers update their availability directly from the app whenever it changes, giving your team an accurate, live view of who's free when scheduling shifts." },
          { icon: FileText, title: 'Digital Timesheets', desc: "Workers submit timesheets digitally through the app with e-signature functionality, creating a verified, timestamped record that feeds straight into your approval and payroll process." },
          { icon: Shield, title: 'Compliance', desc: "Workers upload compliance documents including right-to-work checks, DBS certificates, training qualifications, and more, directly from their phone. Records stay current in real time." },
          { icon: Bell, title: 'Three-Way Notifications', desc: "Workers receive shift updates, booking confirmations, and compliance reminders across push notifications, SMS, and email simultaneously, so important messages are never missed." },
          { icon: ChatCircle, title: 'In-App Chat', desc: "Workers message your team directly through the app and receive responses in real time. Every conversation is tracked in one place. No personal phone numbers, no lost WhatsApp messages." },
          { icon: Users, title: 'Refer a Friend', desc: "Workers refer friends and contacts to your agency directly from the app, helping you grow your candidate pool organically through your existing workforce." },
        ],
      },
      {
        heading: 'What Your Agency Gets',
        items: [
          { icon: Phone, title: 'Fewer calls and messages to handle', desc: "When workers can manage their own shifts, availability, timesheets, and documents through the app, the volume of inbound queries your team handles drops significantly." },
          { icon: Star, title: 'Better worker engagement', desc: "A professional, branded app experience keeps workers connected to your agency. Workers who feel well-managed are more likely to accept shifts, stay on your books, and refer others." },
          { icon: Buildings, title: 'A stronger agency brand', desc: "A fully branded app signals to workers and clients that your agency is modern, organised, and serious about the experience it delivers." },
          { icon: CheckCircle, title: 'Reduced no-shows', desc: "Three-way notifications across push, SMS, and email mean workers never miss a shift update, keeping no-show rates low and your clients covered." },
        ],
      },
    ],
    Mockup: MobileAppMockup,
  },
  {
    slug: 'recruitment',
    category: 'Portals & Communication',
    accent: '#0891B2',
    accentBg: '#ECFEFF',
    heroBg: 'linear-gradient(135deg,#ECFEFF 0%,#F0FDF4 60%,#FFFFFF 100%)',
    title: 'Recruitment Portal',
    tagline: 'From registration to ready to work. Faster than ever.',
    heroDesc: "In temp recruitment, speed-to-placement directly drives revenue. Every day a candidate spends waiting to be onboarded is a day they could be filling a shift and a day your agency isn't billing. Manual onboarding slows everything down, creates inconsistency, and puts unnecessary pressure on your team.",
    sectionTitle: 'Digital Onboarding Built for Temp Recruitment',
    sectionSubtitle: 'Everything candidates need to complete. In one place.',
    sectionIntro: "The Logezy recruitment portal gives every candidate a dedicated online onboarding flow where they complete the entire process digitally, before their first shift. Identity documents, compliance paperwork, required forms, and any pre-start materials are all handled through the portal. Every candidate goes through the same structured process, consistently, professionally, and at a pace that gets them placement-ready fast.",
    ctaLine: 'Get candidates placement-ready faster.',
    groups: [{
      heading: 'What You Get',
      items: [
        { icon: ClipboardText, title: 'Full digital onboarding', desc: "Candidates complete their entire onboarding journey online, uploading documents, filling out forms, and submitting pre-start materials, without setting foot in your office." },
        { icon: Timer, title: 'Reduce time to placement', desc: "With a faster, more organised onboarding process, candidates are cleared and ready to work sooner, so your agency starts filling shifts and billing faster." },
        { icon: Shield, title: 'Compliance built in from day one', desc: "Document collection is built into the onboarding flow, so candidates arrive fully compliant before their first shift, and your agency is protected from day one." },
        { icon: Users, title: 'Free up your team', desc: "A structured digital portal means your admins spend less time manually collecting information and more time doing what actually grows the business: placing workers." },
      ],
    }],
    Mockup: RecruitmentMockup,
  },
  {
    slug: 'client-portal',
    category: 'Portals & Communication',
    accent: '#0891B2',
    accentBg: '#ECFEFF',
    heroBg: 'linear-gradient(135deg,#ECFEFF 0%,#EFF6FF 60%,#FFFFFF 100%)',
    title: 'Client Portal',
    tagline: 'Give your clients visibility. Build relationships that last.',
    heroDesc: "One of the biggest frustrations clients have with temp recruitment agencies is lack of visibility. Chasing updates on shift coverage and requesting invoices manually creates unnecessary friction and makes your agency look harder to work with than it should be. Logezy's client portal changes that entirely.",
    sectionTitle: 'A Dedicated Portal for Every Client',
    sectionSubtitle: 'Real-time visibility. Zero back-and-forth.',
    sectionIntro: "Every client gets their own dedicated portal, a live dashboard where they can track their shift coverage, view candidate profiles, submit shift requests, and access invoices, without having to contact your agency for updates. The client portal reduces unnecessary back-and-forth, gives clients confidence in your operation, and positions your agency as a modern, transparent business that clients genuinely want to retain.",
    ctaLine: 'Give your clients the experience they deserve.',
    groups: [
      {
        heading: 'What Your Clients Get',
        items: [
          { icon: Eye, title: 'Live shift visibility', desc: "Clients can see confirmed bookings, shift coverage, and worker assignments in real time, without calling your agency to find out who's turning up tomorrow." },
          { icon: CalendarBlank, title: 'Direct shift requests', desc: "Clients submit shift requests directly through the portal. Your team receives them instantly and can assign available workers in real time, reducing the time between request and confirmation." },
          { icon: CheckCircle, title: 'Timesheet approvals', desc: "Clients can review and approve worker timesheets directly through the portal, giving them control over what gets signed off before invoices are generated." },
          { icon: Receipt, title: 'Invoice access', desc: "Every invoice generated by your agency is available to the client through the portal at any time. No more chasing, no more email attachments, no more delays." },
        ],
      },
      {
        heading: 'What Your Agency Gets',
        items: [
          { icon: Phone, title: 'Fewer inbound queries', desc: "When clients can see everything they need in their own portal, the volume of calls and messages your team handles drops significantly, freeing up time for higher-value work." },
          { icon: Handshake, title: 'Stronger client relationships', desc: "Proactive transparency builds trust. Clients who feel informed and in control are far more likely to renew contracts, increase bookings, and recommend your agency to others." },
          { icon: Trophy, title: 'A competitive advantage', desc: "Most temp agencies still manage client communication through email and phone calls. A dedicated client portal immediately sets your agency apart as a professional, modern operation." },
        ],
      },
    ],
    Mockup: ClientPortalMockup,
  },
];

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════ */
function FeatureCardItem({ icon: Icon, title, desc, accent, accentBg, index }: {
  icon: React.ElementType; title: string; desc: string; accent: string; accentBg: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{
        background: 'white',
        borderRadius: 14,
        padding: '24px 22px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)', y: -3 }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: accentBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        <Icon weight="regular" style={{ width: 20, height: 20, color: accent }} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65 }}>{desc}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const cfg = pages.find(p => p.slug === slug);
  const vw = useWindowWidth();
  const isMobile = vw < 768;

  if (!cfg) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#E5E7EB' }}>404</div>
        <div style={{ fontSize: 18, color: '#6B7280' }}>Page not found</div>
        <Link to="/features" style={{ color: INDIGO, fontWeight: 600, textDecoration: 'none' }}>← Back to Features</Link>
      </div>
    );
  }

  const { Mockup } = cfg;

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <SEO
        title={`${cfg.title} — Logezy`}
        description={cfg.heroDesc}
        keywords={`${cfg.title.toLowerCase()}, ${cfg.category.toLowerCase()}, staffing software UK, Logezy ${cfg.slug}`}
        canonical={`/product/${cfg.slug}`}
      />

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ background: cfg.heroBg, paddingTop: isMobile ? 90 : 80, paddingBottom: isMobile ? 48 : 80, overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'center' }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 13, color: '#9CA3AF' }}>
              <Link to="/features" style={{ color: '#9CA3AF', textDecoration: 'none', ':hover': { color: INDIGO } }}>Product</Link>
              <span>/</span>
              <span style={{ color: cfg.accent, fontWeight: 600 }}>{cfg.category}</span>
            </div>

            {/* Category badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: cfg.accentBg, border: `1px solid ${cfg.accent}30`, borderRadius: 30, padding: '5px 14px', marginBottom: 28 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{cfg.category}</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: NAVY, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.02em' }}>
              {cfg.title}
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 700, lineHeight: 1.4, marginBottom: 24, color: cfg.accent }}>
              {cfg.tagline}
            </p>

            {/* Description */}
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
              {cfg.heroDesc}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <motion.a
                href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 26px', borderRadius: 10,
                  background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}cc)`,
                  color: 'white', fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  boxShadow: `0 8px 24px ${cfg.accent}40`,
                }}
              >
                Book a Free Demo <ArrowRight weight="regular" style={{ width: 16, height: 16 }} />
              </motion.a>
              <motion.a
                href="https://logezy.co/get-started" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 26px', borderRadius: 10,
                  background: 'white', color: NAVY, fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  border: '1.5px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                Book a Free Trial Now
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ position: 'relative' }}
          >
            <Mockup />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION INTRO ────────────────────────── */}
      <section style={{ background: 'white', padding: isMobile ? '48px 20px 32px' : '72px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, marginBottom: 12 }}>
              {cfg.sectionTitle}
            </h2>
            <p style={{ fontSize: 18, fontWeight: 600, color: cfg.accent, marginBottom: 20 }}>{cfg.sectionSubtitle}</p>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8 }}>{cfg.sectionIntro}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE GROUPS ───────────────────────── */}
      {cfg.groups.map((group, gi) => (
        <section key={gi} style={{ background: gi % 2 === 0 ? '#F8FAFC' : 'white', padding: isMobile ? '40px 20px' : '56px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 40, textAlign: 'center' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: cfg.accentBg, borderRadius: 30, padding: '5px 16px', marginBottom: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.accent }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{group.heading}</span>
              </div>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: 20,
            }}>
              {group.items.map((item, idx) => (
                <FeatureCardItem
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  accent={cfg.accent}
                  accentBg={cfg.accentBg}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ──────────────────────────────────── */}
      <section id="cta" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #183963 100%)`, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${cfg.accent}22`, border: `1px solid ${cfg.accent}40`, borderRadius: 30, padding: '5px 16px', marginBottom: 24 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.accent }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: cfg.accent, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Get Started</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>
              {cfg.ctaLine}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 36 }}>
              Book a free demo and see how Logezy helps temp recruitment agencies work smarter, without the manual effort.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <motion.a
                href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 30px', borderRadius: 10,
                  background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}bb)`,
                  color: 'white', fontWeight: 700, fontSize: 16, textDecoration: 'none',
                  boxShadow: `0 8px 28px ${cfg.accent}50`,
                }}
              >
                Book a Free Demo <ArrowRight weight="regular" style={{ width: 17, height: 17 }} />
              </motion.a>
              <motion.a
                href="https://logezy.co/get-started" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 30px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white', fontWeight: 700, fontSize: 16, textDecoration: 'none',
                }}
              >
                Book a Free Trial Now
              </motion.a>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.40)' }}>
              No lengthy setup. No commitment. Full support from day one.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
