import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {
  CalendarBlank, Shield, DeviceMobile, FileText, Buildings, ClipboardText,
  Bell, ArrowRight, CheckCircle, XCircle, Heartbeat, BookOpen, ForkKnife,
  ChartBar, MapPin, ArrowUpRight,
} from '@phosphor-icons/react';

const NAVY = '#183963';
const fade = { initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0} as const, viewport:{once:true}, transition:{duration:0.55} };

/* ── Flat decorative pattern per feature title ── */
const FEATURE_PATTERNS: Record<string, { dots: string[]; lines: boolean }> = {
  'Compliance Tracking':    { dots:['#34D399','#6EE7B7','#A7F3D0'], lines:true  },
  'Shift Scheduling':       { dots:['#60A5FA','#93C5FD','#BFDBFE'], lines:true  },
  'Candidate App':          { dots:['#5AB4D5','#7ECAE3','#A8D9EF'], lines:false },
  'Digital Timesheets':     { dots:['#FBBF24','#FCD34D','#FDE68A'], lines:true  },
  'Client Portal':          { dots:['#38BDF8','#7DD3FC','#BAE6FD'], lines:false },
  'Fast Onboarding':        { dots:['#F472B6','#F9A8D4','#FBCFE8'], lines:true  },
  'Three-Way Notifications':{ dots:['#FB923C','#FDBA74','#FED7AA'], lines:false },
  'Reports & Analytics':    { dots:['#A78BFA','#C4B5FD','#DDD6FE'], lines:true  },
};

/* ── Pain point → solution pairs per industry ── */
const PAIN_SOLUTIONS: Record<string,{pain:string;fix:string}[]> = {
  healthcare: [
    { pain:'Lapsed DBS or NMC pin puts a placement at risk',     fix:'Auto-expiry alerts before any document lapses' },
    { pain:'Shifts go unfilled because of slow candidate matching', fix:'Live availability + role matching fills shifts instantly' },
    { pain:'Paper timesheets delay payroll by days',              fix:'GPS-verified digital timesheets feed straight to payroll' },
    { pain:'Compliance audits require hours of manual work',      fix:'One-click audit-ready compliance dashboard' },
  ],
  education: [
    { pain:'Safeguarding gap leaves school exposed',              fix:'Every check verified before the first placement' },
    { pain:'Cover needed same day — candidates unreachable',      fix:'Push / SMS / email hits workers simultaneously' },
    { pain:'Paper timesheets sent home get lost',                 fix:'Digital submission + e-signature, same day payroll' },
    { pain:'Schools book direct with workers, cutting you out',   fix:'Client portal keeps every relationship through your agency' },
  ],
  hospitality: [
    { pain:'Last-minute no-shows leave shifts empty',             fix:'Automated replacements found in under 2 minutes' },
    { pain:'Workers ignore calls — shifts stay open',             fix:'Push + SMS + email alerts sent simultaneously' },
    { pain:'Event end-of-night chaos with paper timesheets',      fix:'Workers submit digitally from their phone on the spot' },
    { pain:'Clients complain about communication gaps',           fix:'Live client portal with full shift visibility' },
  ],
};

/* ── Hero screenshots per industry ── */
const HERO_IMAGES: Record<string,string> = {
  healthcare: '/DASHBAORD_NEW.png',
  education:  '/schedule.png',
  hospitality:'/dashboard_v2.png',
};

interface FeatureItem { icon: React.ElementType; title: string; desc: string; linkTo?: string }
interface IndustryConfig {
  slug: string; label: string; HeroIcon: React.ElementType;
  accent: string; accentBg: string; accentMid: string; heroBg: string;
  title: string; tagline: string; heroDesc: string;
  heroStats: { value: string; label: string; icon: React.ElementType }[];
  challengeHeading: string; challengeText: string;
  featuresHeading: string; features: FeatureItem[];
  quote: string; quoteAuthor: string;
}

const pages: IndustryConfig[] = [
  {
    slug: 'healthcare', label: 'Healthcare & Nursing', HeroIcon: Heartbeat,
    accent:'#E11D48', accentBg:'#FFF1F2', accentMid:'#FB7185',
    heroBg:'linear-gradient(135deg,#FFF1F2 0%,#FDF2F8 60%,#FFFFFF 100%)',
    title:'Healthcare & Nursing',
    tagline:'Compliant workers. Shifts filled faster. Zero admin chaos.',
    heroDesc:'Right-to-work checks, DBS certificates, NMC pins, shift cover at midnight — nursing agencies carry more compliance weight than almost any other sector. Logezy takes that weight off your team with a single platform built for healthcare staffing.',
    heroStats:[
      { value:'98.7%', label:'Avg compliance score', icon: Shield },
      { value:'312',   label:'DBS records tracked',  icon: ClipboardText },
      { value:'94%',   label:'Shift fill rate',       icon: CalendarBlank },
    ],
    challengeHeading:"One lapsed document. One missed check. Your agency is exposed.",
    challengeText:'Nursing recruitment carries more compliance risk than almost any other sector. Right-to-work checks, DBS certificates, NMC pins, mandatory training — all tracked manually, across spreadsheets that were never designed for this. Logezy gives nursing and healthcare agencies a single, centralised platform to manage compliance, scheduling, timesheets, and client communication — without the risk, the chaos, or the manual effort.',
    featuresHeading:'Everything your nursing agency needs to stay compliant and keep every shift filled.',
    features:[
      { icon:Shield,       title:'Compliance Tracking',     desc:'Every document, every expiry — automatically monitored. Right-to-work, DBS, NMC pins, training qualifications. Stored, tracked, and flagged before they lapse.', linkTo:'/product/compliance' },
      { icon:CalendarBlank,title:'Shift Scheduling',        desc:'Fill nursing shifts faster with live availability and role matching. See who\'s qualified, available, and near the location before you pick up the phone.', linkTo:'/product/scheduling' },
      { icon:DeviceMobile, title:'Candidate App',           desc:'A fully branded app your nurses actually use. Workers manage availability, confirm shifts, submit timesheets, and upload compliance documents, all from their phone.', linkTo:'/product/mobile-app' },
      { icon:FileText,     title:'Digital Timesheets',      desc:'Submitted from their phone. Approved in one click. GPS-verified, e-signed, tamper-proof records that feed straight into payroll and invoicing.', linkTo:'/product/timesheets' },
      { icon:Buildings,    title:'Client Portal',           desc:'Give care homes and NHS trusts live shift visibility. Clients can see who\'s booked, approve timesheets, and access invoices — without calling your team.', linkTo:'/product/client-portal' },
      { icon:ClipboardText,title:'Fast Onboarding',         desc:'Get nurses placement-ready in hours, not days. A fully digital recruitment portal collects documents, forms, and compliance paperwork before their first shift.', linkTo:'/product/recruitment' },
    ],
    quote:'"Compliance used to be our biggest risk. Now it runs itself."',
    quoteAuthor:'Healthcare Staffing Agency Director, UK',
  },
  {
    slug: 'education', label: 'Education', HeroIcon: BookOpen,
    accent:'#7C3AED', accentBg:'#F5F3FF', accentMid:'#A78BFA',
    heroBg:'linear-gradient(135deg,#F5F3FF 0%,#EFF6FF 60%,#FFFFFF 100%)',
    title:'Education',
    tagline:'The right teachers. The right checks. Ready when schools need them.',
    heroDesc:'Schools can\'t wait. Supplying teaching staff requires fast turnaround, airtight safeguarding compliance, and reliable workers who show up, every time. Logezy gives education agencies the tools to move faster, stay fully compliant, and build the reputation that keeps schools coming back.',
    heroStats:[
      { value:'100%', label:'Safeguarding audit-ready', icon: Shield },
      { value:'3×',   label:'Faster placements',        icon: ArrowUpRight },
      { value:'0',    label:'Compliance gaps',          icon: CheckCircle },
    ],
    challengeHeading:"One safeguarding gap. One no-show. Schools call your competitor.",
    challengeText:'Supplying teaching staff requires fast turnaround, airtight safeguarding compliance, and reliable workers who show up. Managing all of that manually — across multiple schools and a constantly changing candidate pool — puts enormous pressure on your team. One unverified qualification, one teacher who doesn\'t show and the school is calling someone else. Logezy keeps you ahead.',
    featuresHeading:'Everything your education agency needs to place faster and protect every school.',
    features:[
      { icon:Shield,       title:'Compliance Tracking',     desc:'DBS certificates, safeguarding checks, and teaching qualifications — all monitored automatically. Every candidate arrives at school with the right checks in place.', linkTo:'/product/compliance' },
      { icon:CalendarBlank,title:'Shift Scheduling',        desc:'Place teachers and support staff faster with smart scheduling tools. Live availability, role matching, and instant notifications mean cover is confirmed — fast.', linkTo:'/product/scheduling' },
      { icon:DeviceMobile, title:'Candidate App',           desc:'Teachers manage their own availability, shifts, and documents from their phone. Less chasing for your team. More control for your candidates.', linkTo:'/product/mobile-app' },
      { icon:FileText,     title:'Digital Timesheets',      desc:'No more paper timesheets sent home at the end of the week. Workers submit digitally with e-signature — ready for payroll the same day.', linkTo:'/product/timesheets' },
      { icon:Buildings,    title:'Client Portal',           desc:'Give schools direct visibility over bookings, staff profiles, and invoices. Fewer calls. Better relationships. Contracts that renew themselves.', linkTo:'/product/client-portal' },
      { icon:ClipboardText,title:'Fast Onboarding',         desc:'Get new candidates through compliance and placement-ready before term starts. A structured digital onboarding flow means no candidate falls through the cracks.', linkTo:'/product/recruitment' },
    ],
    quote:'"We used to spend the whole morning finding cover. Now it takes minutes."',
    quoteAuthor:'Education Recruitment Agency Director, UK',
  },
  {
    slug: 'hospitality', label: 'Hospitality', HeroIcon: ForkKnife,
    accent:'#D97706', accentBg:'#FFFBEB', accentMid:'#FCD34D',
    heroBg:'linear-gradient(135deg,#FFFBEB 0%,#FFF7ED 60%,#FFFFFF 100%)',
    title:'Hospitality',
    tagline:'Last-minute shifts covered. Workers always ready. Clients always happy.',
    heroDesc:'Events overrun, bookings spike, and clients need cover with hours to spare. Managing a flexible hospitality workforce manually means your team is always reacting. Logezy gives hospitality staffing agencies the tools to move faster, fill shifts with confidence, and keep every client covered.',
    heroStats:[
      { value:'< 2m', label:'Avg shift confirmation', icon: Bell },
      { value:'85%',  label:'Reduction in no-shows',  icon: CheckCircle },
      { value:'100%', label:'Shift fill rate',         icon: CalendarBlank },
    ],
    challengeHeading:"Hospitality never slows down. Your staffing operation can't either.",
    challengeText:'Events overrun, bookings spike, and clients need cover with hours to spare. Workers cancel last minute, shifts go unfilled, and clients lose confidence. Logezy gives you the speed, visibility, and communication tools to stay ahead of every situation and keep every client covered, every time.',
    featuresHeading:'Everything your hospitality agency needs to fill every shift — fast.',
    features:[
      { icon:CalendarBlank,title:'Shift Scheduling',        desc:'Build and fill hospitality shifts in minutes with live availability and role matching. See who\'s free, qualified, and nearby — before you start calling.', linkTo:'/product/scheduling' },
      { icon:Bell,         title:'Three-Way Notifications', desc:'Workers get shift updates across push, SMS, and email simultaneously, so no-shows become rare and last-minute cancellations get covered before your client notices.', linkTo:'/product/mobile-app' },
      { icon:DeviceMobile, title:'Candidate App',           desc:'Workers manage availability, confirm shifts, and submit timesheets from their phone. Your team spends less time on calls and more time filling shifts that matter.', linkTo:'/product/mobile-app' },
      { icon:FileText,     title:'Digital Timesheets',      desc:'End the paper timesheet chaos at the end of every event. Workers submit digitally, managers approve in one click, and payroll is ready the same day.', linkTo:'/product/timesheets' },
      { icon:ClipboardText,title:'Fast Onboarding',         desc:'Get new hospitality workers registered, compliant, and placement-ready fast. A structured digital flow means your candidate pool grows without the admin overhead.', linkTo:'/product/recruitment' },
      { icon:Buildings,    title:'Client Portal',           desc:'Give hotels, venues, and catering clients their own live dashboard — shift coverage, worker profiles, timesheets, and invoices, all in one place.', linkTo:'/product/client-portal' },
    ],
    quote:'"We\'re placing more workers in less time and the team isn\'t drowning in calls anymore."',
    quoteAuthor:'Hospitality Staffing Agency Director, UK',
  },
];

/* ─── App screenshot mockup wrapper ─── */
function AppScreenshot({ src, alt, accent }: { src:string; alt:string; accent:string }) {
  return (
    <div style={{ position:'relative', borderRadius:20, overflow:'hidden',
      boxShadow:`0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06), 0 0 60px ${accent}18`,
    }}>
      <img src={src} alt={alt} style={{ width:'100%',height:'auto',display:'block' }} />
    </div>
  );
}

/* ─── Floating stat badge ─── */
function StatBadge({ value, label, icon: Icon, accent, accentBg, delay=0 }:
  { value:string; label:string; icon:React.ElementType; accent:string; accentBg:string; delay?:number }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.85, y:16 }}
      animate={{ opacity:1, scale:1, y:0 }}
      transition={{ duration:0.55, delay, type:'spring', stiffness:200, damping:20 }}
      style={{
        background:'#fff', borderRadius:16, padding:'14px 18px',
        boxShadow:'0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
        display:'flex', alignItems:'center', gap:12, minWidth:180,
      }}
    >
      <div style={{ width:40,height:40,borderRadius:11,background:accentBg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
        <Icon weight="fill" style={{ width:18,height:18,color:accent }} />
      </div>
      <div>
        <div style={{ fontSize:22,fontWeight:900,color:accent,lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:11,color:'#6B7280',marginTop:2,fontWeight:500 }}>{label}</div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════ MAIN ═══════════════════════════════════ */
export default function IndustryPage() {
  const { slug } = useParams<{ slug:string }>();
  const cfg = pages.find(p => p.slug === slug);
  const vw = useWindowWidth();
  const isMobile = vw < 768;
  const isTablet = vw < 1100;

  if (!cfg) return (
    <div style={{ minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16 }}>
      <div style={{ fontSize:48,fontWeight:900,color:'#E5E7EB' }}>404</div>
      <Link to="/" style={{ color:'#2396C6',fontWeight:600,textDecoration:'none' }}>← Back to home</Link>
    </div>
  );

  const { HeroIcon } = cfg;
  const pains = PAIN_SOLUTIONS[cfg.slug] || [];
  const heroImg = HERO_IMAGES[cfg.slug];

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:'var(--font-body)' }}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{ background:cfg.heroBg, paddingTop:88, paddingBottom:0, overflow:'hidden', position:'relative' }}>
        {/* Subtle dot grid */}
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',opacity:0.4,
          backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.08) 1px,transparent 1px)',
          backgroundSize:'28px 28px' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 28px',
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 64, alignItems:'center' }}>

          {/* Left — text */}
          <motion.div initial={{ opacity:0, x:-28 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65 }}>
            {/* Breadcrumb */}
            <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:20,fontSize:13,color:'#9CA3AF' }}>
              <Link to="/" style={{ color:'#9CA3AF',textDecoration:'none' }}>Home</Link>
              <span>/</span>
              <Link to="/industries" style={{ color:'#9CA3AF',textDecoration:'none' }}>Industries</Link>
              <span>/</span>
              <span style={{ color:cfg.accent,fontWeight:600 }}>{cfg.label}</span>
            </div>

            {/* Badge */}
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:cfg.accentBg,border:`1.5px solid ${cfg.accent}40`,borderRadius:40,padding:'7px 16px',marginBottom:24 }}>
              <HeroIcon weight="fill" style={{ width:15,height:15,color:cfg.accent }} />
              <span style={{ fontSize:12,fontWeight:800,color:cfg.accent,letterSpacing:'0.08em',textTransform:'uppercase' as const }}>{cfg.label}</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize:'clamp(28px,3.8vw,54px)',fontWeight:900,color:NAVY,lineHeight:1.08,marginBottom:16,letterSpacing:'-0.03em' }}>
              Staffing software{' '}
              <span style={{ position:'relative',display:'inline-block' }}>
                <span style={{ color:cfg.accent }}>built for</span>
              </span>{' '}
              <span style={{ color:NAVY }}>{cfg.label}.</span>
            </h1>

            {/* Tagline */}
            <p style={{ fontSize:18,fontWeight:700,color:'#374151',lineHeight:1.5,marginBottom:14 }}>
              {cfg.tagline}
            </p>

            {/* Description */}
            <p style={{ fontSize:15.5,color:'#6B7280',lineHeight:1.85,marginBottom:36,maxWidth:520 }}>
              {cfg.heroDesc}
            </p>

            {/* CTAs */}
            <div style={{ display:'flex',gap:12,flexWrap:'wrap' as const,marginBottom:48 }}>
              <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'14px 28px',borderRadius:12,
                  background:`linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`,color:'#fff',fontWeight:700,
                  fontSize:15,textDecoration:'none',boxShadow:`0 10px 28px ${cfg.accent}45` }}>
                Book a Free Demo <ArrowRight weight="bold" style={{ width:16,height:16 }} />
              </motion.a>
              <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'14px 28px',borderRadius:12,
                  background:'#fff',color:NAVY,fontWeight:700,fontSize:15,textDecoration:'none',
                  border:'1.5px solid #E5E7EB',boxShadow:'0 4px 14px rgba(0,0,0,0.07)' }}>
                Start Free Trial
              </motion.a>
            </div>

            {/* Stats row */}
            <div style={{ display:'flex',gap:12,flexWrap:'wrap' as const }}>
              {cfg.heroStats.map((s,i) => (
                <StatBadge key={i} value={s.value} label={s.label} icon={s.icon}
                  accent={cfg.accent} accentBg={cfg.accentBg} delay={0.3+i*0.1} />
              ))}
            </div>
          </motion.div>

          {/* Right — screenshot */}
          {!isMobile && (
            <motion.div initial={{ opacity:0, x:32, y:20 }} animate={{ opacity:1, x:0, y:0 }}
              transition={{ duration:0.75, delay:0.2 }}
              style={{ position:'relative', paddingBottom:48 }}>
              <AppScreenshot src={heroImg} alt={`${cfg.label} dashboard`} accent={cfg.accent} />
              {/* Floating phone pill */}
              <motion.div
                animate={{ y:[-4,4,-4] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
                style={{ position:'absolute', bottom:0, left:-24, zIndex:10,
                  background:'#fff', borderRadius:18, padding:'12px 16px',
                  boxShadow:'0 12px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)',
                  display:'flex',alignItems:'center',gap:10 }}>
                <div style={{ width:36,height:36,borderRadius:10,background:cfg.accentBg,display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <HeroIcon weight="fill" style={{ width:18,height:18,color:cfg.accent }} />
                </div>
                <div>
                  <div style={{ fontSize:11,fontWeight:800,color:NAVY }}>Logezy for {cfg.label}</div>
                  <div style={{ fontSize:10,color:'#6B7280' }}>Live platform demo available</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Wave bottom */}
        <div style={{ lineHeight:0, marginTop: isMobile ? 40 : 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width:'100%',height:80,display:'block' }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          CHALLENGE — redesigned
      ══════════════════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', background:`linear-gradient(160deg,#183963 0%,#183963 50%,#183963 100%)` }}>
        {/* Animated dot grid */}
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',
          backgroundImage:'radial-gradient(rgba(255,255,255,0.045) 1px,transparent 1px)',
          backgroundSize:'32px 32px' }} />

        {/* Large accent glow blobs */}
        <div style={{ position:'absolute',top:'-10%',right:'-5%',width:600,height:600,borderRadius:'50%',
          background:`radial-gradient(circle,${cfg.accent}18 0%,transparent 65%)`,filter:'blur(80px)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'-10%',left:'-5%',width:500,height:500,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(91,108,249,0.12) 0%,transparent 65%)',filter:'blur(80px)',pointerEvents:'none' }} />

        {/* Top section — heading */}
        <div style={{ maxWidth:1200,margin:'0 auto',padding:'88px 28px 0',position:'relative',zIndex:1 }}>
          <motion.div initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}
            style={{ display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',marginBottom:72 }}>

            {/* Animated badge */}
            <motion.div
              initial={{ scale:0.8, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.5, type:'spring', stiffness:200 }}
              style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'7px 20px',borderRadius:40,
                background:`rgba(255,255,255,0.08)`,border:'1px solid rgba(255,255,255,0.16)',marginBottom:24 }}>
              <motion.div style={{ width:7,height:7,borderRadius:'50%',background:cfg.accentMid }}
                animate={{ scale:[1,1.6,1], opacity:[0.6,1,0.6] }}
                transition={{ duration:1.6,repeat:Infinity }} />
              <span style={{ fontSize:11,fontWeight:800,color:'rgba(255,255,255,0.85)',letterSpacing:'0.10em',textTransform:'uppercase' as const }}>The Challenge</span>
            </motion.div>

            <h2 style={{ fontSize:'clamp(24px,3.5vw,46px)',fontWeight:900,color:'#fff',lineHeight:1.15,
              letterSpacing:'-0.025em',marginBottom:18,maxWidth:760 }}>
              {cfg.challengeHeading}
            </h2>
            <p style={{ fontSize:17,color:'rgba(186,210,255,0.62)',lineHeight:1.85,maxWidth:680,margin:0 }}>
              {cfg.challengeText}
            </p>
          </motion.div>

          {/* Before → After rows */}
          <div style={{ display:'flex',flexDirection:'column',gap:0,marginBottom:0 }}>
            {pains.map((item,i) => (
              <motion.div key={i}
                initial={{ opacity:0, x: i%2===0 ? -40 : 40 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.6, delay:i*0.10, ease:[0.22,1,0.36,1] }}
                style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 48px 1fr',
                  gap:0, alignItems:'stretch',
                  borderBottom: i < pains.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  padding:'28px 0' }}>

                {/* ❌ Pain side */}
                <motion.div
                  whileHover={{ x:4 }} transition={{ type:'spring', stiffness:300 }}
                  style={{ display:'flex',alignItems:'flex-start',gap:14,paddingRight: isMobile ? 0 : 24 }}>
                  <div style={{ width:36,height:36,borderRadius:10,background:'rgba(239,68,68,0.15)',
                    border:'1px solid rgba(239,68,68,0.30)',
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2 }}>
                    <XCircle weight="fill" style={{ width:18,height:18,color:'#FCA5A5' }} />
                  </div>
                  <div>
                    <div style={{ fontSize:9.5,fontWeight:800,color:'rgba(252,165,165,0.70)',
                      letterSpacing:'0.09em',textTransform:'uppercase' as const,marginBottom:5 }}>Before</div>
                    <p style={{ fontSize:15,color:'rgba(255,255,255,0.55)',lineHeight:1.65,margin:0 }}>{item.pain}</p>
                  </div>
                </motion.div>

                {/* Arrow — hidden on mobile */}
                {!isMobile && (
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'center',padding:'0 4px' }}>
                    <motion.div
                      animate={{ x:[-3,3,-3] }} transition={{ duration:1.8,repeat:Infinity,ease:'easeInOut',delay:i*0.2 }}
                      style={{ width:32,height:32,borderRadius:'50%',
                        background:`linear-gradient(135deg,${cfg.accent}50,${cfg.accentMid}50)`,
                        border:`1px solid ${cfg.accent}60`,
                        display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      <ArrowRight weight="bold" style={{ width:14,height:14,color:cfg.accentMid }} />
                    </motion.div>
                  </div>
                )}

                {/* ✅ Fix side */}
                <motion.div
                  whileHover={{ x: isMobile ? 0 : -4 }} transition={{ type:'spring', stiffness:300 }}
                  style={{ display:'flex',alignItems:'flex-start',gap:14,paddingLeft: isMobile ? 0 : 24,
                    borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
                    marginTop: isMobile ? 16 : 0 }}>
                  <div style={{ width:36,height:36,borderRadius:10,
                    background:`${cfg.accent}25`,border:`1px solid ${cfg.accent}50`,
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2,
                    boxShadow:`0 0 16px ${cfg.accent}30` }}>
                    <CheckCircle weight="fill" style={{ width:18,height:18,color:cfg.accentMid }} />
                  </div>
                  <div>
                    <div style={{ fontSize:9.5,fontWeight:800,color:cfg.accentMid,
                      letterSpacing:'0.09em',textTransform:'uppercase' as const,marginBottom:5,opacity:0.85 }}>With Logezy</div>
                    <p style={{ fontSize:15,color:'rgba(255,255,255,0.90)',lineHeight:1.65,margin:0,fontWeight:500 }}>{item.fix}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
          style={{ borderTop:'1px solid rgba(255,255,255,0.07)',
            padding:'40px 28px 56px',
            display:'flex',flexDirection: isMobile ? 'column' : 'row',
            alignItems:'center',justifyContent:'space-between',gap:20,
            maxWidth:1200,margin:'0 auto',position:'relative',zIndex:1 }}>
          <div>
            <p style={{ fontSize:18,fontWeight:800,color:'#fff',margin:'0 0 4px' }}>
              Ready to solve these challenges?
            </p>
            <p style={{ fontSize:14,color:'rgba(186,210,255,0.55)',margin:0 }}>
              See how Logezy fixes every one of these for your agency.
            </p>
          </div>
          <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.04,y:-2 }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex',alignItems:'center',gap:9,padding:'13px 28px',borderRadius:12,
              background:`linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`,color:'#fff',fontWeight:700,
              fontSize:14,textDecoration:'none',flexShrink:0,
              boxShadow:`0 10px 32px ${cfg.accent}45` }}>
            Book a Free Demo <ArrowRight weight="bold" style={{ width:15,height:15 }} />
          </motion.a>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          FEATURES — with screenshots
      ══════════════════════════════ */}
      <section style={{ background:'#F8FAFC', padding:'88px 28px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <motion.div {...fade} style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:cfg.accentBg,
              border:`1.5px solid ${cfg.accent}35`,borderRadius:40,padding:'6px 18px',marginBottom:18 }}>
              <div style={{ width:7,height:7,borderRadius:'50%',background:cfg.accent }} />
              <span style={{ fontSize:11,fontWeight:800,color:cfg.accent,letterSpacing:'0.09em',textTransform:'uppercase' as const }}>Platform Features</span>
            </div>
            <h2 style={{ fontSize:'clamp(22px,3vw,40px)',fontWeight:900,color:NAVY,lineHeight:1.2,maxWidth:700,margin:'0 auto',letterSpacing:'-0.02em' }}>
              {cfg.featuresHeading}
            </h2>
          </motion.div>

          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
            {cfg.features.map((f,i) => {
              const pat = FEATURE_PATTERNS[f.title] || { dots:[cfg.accent,'#ccc','#eee'], lines:false };
              return (
                <motion.div key={i}
                  initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.07 }}
                  whileHover={{ y:-5, boxShadow:'0 20px 52px rgba(0,0,0,0.11)' }}
                  style={{ background:'#fff', borderRadius:20, overflow:'hidden',
                    border:'1px solid #E5E7EB', boxShadow:'0 4px 20px rgba(0,0,0,0.05)',
                    transition:'box-shadow 0.28s,transform 0.28s', display:'flex', flexDirection:'column' }}>

                  {/* ── Flat illustration header ── */}
                  <div style={{ position:'relative', height:130, overflow:'hidden',
                    background:`linear-gradient(135deg,${pat.dots[2]}55 0%,${pat.dots[1]}33 60%,${pat.dots[0]}22 100%)` }}>

                    {/* Decorative circles */}
                    <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%',
                      background:`${pat.dots[0]}22`, border:`2px solid ${pat.dots[0]}33` }} />
                    <div style={{ position:'absolute', bottom:-30, right:40, width:70, height:70, borderRadius:'50%',
                      background:`${pat.dots[1]}28`, border:`2px solid ${pat.dots[1]}40` }} />
                    <div style={{ position:'absolute', top:10, right:60, width:36, height:36, borderRadius:'50%',
                      background:`${pat.dots[2]}50` }} />

                    {/* Decorative dashes / lines */}
                    {pat.lines && (
                      <>
                        <div style={{ position:'absolute', bottom:22, left:80, width:50, height:3, borderRadius:3,
                          background:`${pat.dots[0]}55` }} />
                        <div style={{ position:'absolute', bottom:32, left:90, width:30, height:3, borderRadius:3,
                          background:`${pat.dots[1]}55` }} />
                        <div style={{ position:'absolute', bottom:12, left:70, width:70, height:3, borderRadius:3,
                          background:`${pat.dots[0]}33` }} />
                      </>
                    )}

                    {/* Small floating dots */}
                    {[{t:18,l:110,s:6},{t:55,l:140,s:4},{t:80,l:120,s:5},{t:30,l:160,s:3}].map((d,di)=>(
                      <div key={di} style={{ position:'absolute', top:d.t, left:d.l, width:d.s, height:d.s,
                        borderRadius:'50%', background:`${pat.dots[di%3]}88` }} />
                    ))}

                    {/* Large centred icon */}
                    <div style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)',
                      width:60, height:60, borderRadius:18,
                      background:'#fff',
                      boxShadow:`0 8px 28px ${pat.dots[0]}44, 0 2px 8px rgba(0,0,0,0.08)`,
                      display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <f.icon weight="fill" style={{ width:28, height:28, color:pat.dots[0] }} />
                    </div>

                    {/* Number badge */}
                    <div style={{ position:'absolute', top:12, left:12, width:22, height:22, borderRadius:7,
                      background:pat.dots[0], display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, fontWeight:900, color:'#fff', boxShadow:`0 3px 10px ${pat.dots[0]}66` }}>
                      {i+1}
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div style={{ padding:'20px 22px 22px', flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ fontSize:16, fontWeight:800, color:NAVY, marginBottom:8 }}>{f.title}</div>
                    <div style={{ fontSize:14, color:'#6B7280', lineHeight:1.72, flex:1 }}>{f.desc}</div>
                    {f.linkTo && (
                      <Link to={f.linkTo} style={{ marginTop:16, fontSize:13, fontWeight:700, color:cfg.accent,
                        textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5 }}>
                        Learn more <ArrowRight weight="bold" style={{ width:13, height:13 }} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          APP SHOWCASE STRIP
      ══════════════════════════════ */}
      <section style={{ background:`linear-gradient(135deg,${cfg.accentBg} 0%,#fff 100%)`, padding:'80px 28px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto',
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:56, alignItems:'center' }}>
          <motion.div {...fade}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:cfg.accentBg,
              border:`1.5px solid ${cfg.accent}35`,borderRadius:40,padding:'6px 18px',marginBottom:20 }}>
              <DeviceMobile weight="fill" style={{ width:14,height:14,color:cfg.accent }} />
              <span style={{ fontSize:11,fontWeight:800,color:cfg.accent,letterSpacing:'0.09em',textTransform:'uppercase' as const }}>Mobile First</span>
            </div>
            <h2 style={{ fontSize:'clamp(24px,3vw,38px)',fontWeight:900,color:NAVY,lineHeight:1.15,marginBottom:18,letterSpacing:'-0.02em' }}>
              Your workers stay connected — from their pocket.
            </h2>
            <p style={{ fontSize:15.5,color:'#6B7280',lineHeight:1.85,marginBottom:32,maxWidth:460 }}>
              A fully branded mobile app your workers actually want to use. Accept shifts, submit timesheets, upload documents, and stay compliant, all from their phone on iOS or Android.
            </p>
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {['Accept & manage shifts in real time','GPS-verified clock in/out','Upload compliance documents','Receive push, SMS, and email notifications','Submit digital timesheets with e-signature'].map((item,i) => (
                <div key={i} style={{ display:'flex',alignItems:'center',gap:10 }}>
                  <div style={{ width:20,height:20,borderRadius:'50%',background:cfg.accentBg,
                    border:`1.5px solid ${cfg.accent}50`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                    <CheckCircle weight="fill" style={{ width:11,height:11,color:cfg.accent }} />
                  </div>
                  <span style={{ fontSize:14,color:'#374151',fontWeight:500 }}>{item}</span>
                </div>
              ))}
            </div>
            <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{ marginTop:36,display:'inline-flex',alignItems:'center',gap:8,padding:'13px 26px',borderRadius:12,
                background:`linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`,color:'#fff',fontWeight:700,
                fontSize:14,textDecoration:'none',boxShadow:`0 8px 24px ${cfg.accent}40` }}>
              See the app in action <ArrowRight weight="bold" style={{ width:15,height:15 }} />
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}
            style={{ display:'flex',justifyContent:'center' }}>
            {/* Phone frame */}
            <div style={{ position:'relative',width:260,flexShrink:0 }}>
              <div style={{
                width:260,height:560,borderRadius:48,
                background:'linear-gradient(160deg,#F0F0F2 0%,#D8D8DA 50%,#CFCFD2 100%)',
                padding:3,
                boxShadow:'0 48px 120px rgba(0,0,0,0.28),0 16px 40px rgba(0,0,0,0.14),inset 0 1px 0 rgba(255,255,255,0.60)',
              }}>
                <div style={{ width:'100%',height:'100%',borderRadius:46,background:'#000',overflow:'hidden',position:'relative' }}>
                  <img src="/mobile_app_main_screen.jpeg" alt="Logezy mobile app"
                    style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block' }} />
                  <div style={{ position:'absolute',top:12,left:'50%',transform:'translateX(-50%)',
                    width:110,height:28,background:'#000',borderRadius:16,zIndex:10 }} />
                  <div style={{ position:'absolute',inset:0,
                    background:'linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 45%)',
                    pointerEvents:'none',zIndex:20,borderRadius:46 }} />
                </div>
              </div>
              {/* Floating notification */}
              <motion.div
                animate={{ y:[-6,6,-6] }} transition={{ duration:3.5,repeat:Infinity,ease:'easeInOut' }}
                style={{ position:'absolute',top:60,right:-36,background:'#fff',borderRadius:14,padding:'10px 14px',
                  boxShadow:'0 8px 32px rgba(0,0,0,0.14)',border:'1px solid #E5E7EB',
                  display:'flex',alignItems:'center',gap:9,minWidth:160 }}>
                <div style={{ width:28,height:28,borderRadius:8,background:cfg.accentBg,
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <CheckCircle weight="fill" style={{ width:14,height:14,color:cfg.accent }} />
                </div>
                <div>
                  <div style={{ fontSize:10,fontWeight:800,color:NAVY }}>Shift confirmed</div>
                  <div style={{ fontSize:9,color:'#6B7280' }}>Just now</div>
                </div>
              </motion.div>
              {/* Floating compliance badge */}
              <motion.div
                animate={{ y:[6,-6,6] }} transition={{ duration:4,repeat:Infinity,ease:'easeInOut',delay:1 }}
                style={{ position:'absolute',bottom:80,left:-32,background:'#fff',borderRadius:14,padding:'10px 14px',
                  boxShadow:'0 8px 32px rgba(0,0,0,0.14)',border:'1px solid #E5E7EB',
                  display:'flex',alignItems:'center',gap:9 }}>
                <div style={{ width:28,height:28,borderRadius:8,background:'#ECFDF5',
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                  <Shield weight="fill" style={{ width:14,height:14,color:'#10B981' }} />
                </div>
                <div>
                  <div style={{ fontSize:10,fontWeight:800,color:NAVY }}>Compliance ✓</div>
                  <div style={{ fontSize:9,color:'#6B7280' }}>All docs valid</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          TESTIMONIAL
      ══════════════════════════════ */}
      <section style={{ background:NAVY, padding:'88px 28px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,
          backgroundImage:'radial-gradient(rgba(255,255,255,1) 1px,transparent 1px)',backgroundSize:'24px 24px' }} />
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:600,height:300,borderRadius:'50%',
          background:`radial-gradient(ellipse,${cfg.accent}25 0%,transparent 65%)`,
          filter:'blur(60px)',pointerEvents:'none' }} />

        <div style={{ maxWidth:860,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1 }}>
          <motion.div {...fade}>
            {/* Quote mark */}
            <div style={{ fontSize:80,color:cfg.accent,lineHeight:0.8,fontFamily:'Georgia,serif',marginBottom:32,opacity:0.5 }}>"</div>
            <p style={{ fontSize:'clamp(20px,2.5vw,30px)',fontWeight:700,color:'#fff',lineHeight:1.5,marginBottom:36,fontStyle:'italic' }}>
              {cfg.quote}
            </p>
            {/* Author */}
            <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:14 }}>
              <div style={{ width:48,height:48,borderRadius:'50%',
                background:`linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`,
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:`0 0 0 4px ${cfg.accent}40` }}>
                <HeroIcon weight="fill" style={{ width:22,height:22,color:'#fff' }} />
              </div>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontSize:14,fontWeight:700,color:'#fff' }}>Agency Director</div>
                <div style={{ fontSize:12,color:'rgba(255,255,255,0.50)' }}>{cfg.quoteAuthor}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA
      ══════════════════════════════ */}
      <section style={{ background:cfg.heroBg, padding:'80px 28px' }}>
        <div style={{ maxWidth:720,margin:'0 auto',textAlign:'center' }}>
          <motion.div {...fade}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:cfg.accentBg,
              border:`1.5px solid ${cfg.accent}35`,borderRadius:40,padding:'6px 18px',marginBottom:20 }}>
              <HeroIcon weight="fill" style={{ width:14,height:14,color:cfg.accent }} />
              <span style={{ fontSize:11,fontWeight:800,color:cfg.accent,letterSpacing:'0.09em',textTransform:'uppercase' as const }}>Get Started</span>
            </div>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,44px)',fontWeight:900,color:NAVY,lineHeight:1.15,marginBottom:16,letterSpacing:'-0.02em' }}>
              Ready to transform your {cfg.label.toLowerCase()} agency?
            </h2>
            <p style={{ fontSize:16,color:'#6B7280',lineHeight:1.8,marginBottom:36,maxWidth:540,margin:'0 auto 36px' }}>
              Join hundreds of UK staffing agencies already running smarter with Logezy. Book your free demo and see the platform built for your sector.
            </p>
            <div style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' as const }}>
              <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                style={{ display:'inline-flex',alignItems:'center',gap:9,padding:'15px 32px',borderRadius:14,
                  background:`linear-gradient(135deg,${cfg.accent},${cfg.accentMid})`,color:'#fff',fontWeight:800,
                  fontSize:16,textDecoration:'none',boxShadow:`0 12px 32px ${cfg.accent}45` }}>
                Book a Free Demo <ArrowRight weight="bold" style={{ width:17,height:17 }} />
              </motion.a>
              <motion.a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                style={{ display:'inline-flex',alignItems:'center',gap:9,padding:'15px 32px',borderRadius:14,
                  background:'#fff',color:NAVY,fontWeight:800,fontSize:16,textDecoration:'none',
                  border:'2px solid #E5E7EB',boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
                Start Free Trial
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
