import React from 'react';
import {
  Target, Lightning, Heart, ArrowRight, CheckCircle,
  Users, Shield, TrendUp, Pulse, CalendarBlank, Heartbeat, Briefcase,
  GraduationCap, Quotes,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const pillars = [
  {
    icon: Target,
    title: 'Built for temp, not adapted for it',
    description:
      'Most staffing software was built for permanent recruitment and patched to handle temp. Logezy is purpose-built for temporary staffing from day one — every feature, every workflow, every screen designed around how temp agencies actually operate.',
    gradient: 'linear-gradient(135deg,#5B6CF9,#1795C7)',
    glow: 'rgba(91,108,249,0.15)',
  },
  {
    icon: Lightning,
    title: 'Simple enough for your whole team',
    description:
      "You shouldn't need a training course to use your own recruitment software. Logezy is intuitive enough for a new resourcer on their first day and powerful enough for a director managing hundreds of temporary workers.",
    gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: Heart,
    title: 'We grow when you grow',
    description:
      "We don't just sell you software and disappear. Your success is our success. That's why Logezy customers get dedicated onboarding, real human support, and a product team that listens and keeps building.",
    gradient: 'linear-gradient(135deg,#059669,#10B981)',
    glow: 'rgba(5,150,105,0.15)',
  },
];

const handleRows = [
  { task: 'Building weekly shift schedules',  result: 'Done in minutes'       },
  { task: 'Chasing timesheet approvals',       result: 'Automated'             },
  { task: 'Tracking compliance documents',     result: 'Always up to date'     },
  { task: 'Generating client invoices',        result: 'One click'             },
  { task: 'Reporting on agency performance',   result: 'Real-time dashboard'   },
];

const storyParagraphs = [
  'Temp recruitment is fast, complex, and unforgiving. Shifts change by the hour, compliance can\'t slip, and clients expect results yesterday.',
  'We saw agencies held back — not by lack of talent, but by outdated workforce management software that was never built for the pace of temporary staffing. Spreadsheets were breaking under the pressure. Agencies were drowning in admin. Good recruiters were spending more time on paperwork than on people.',
  'So we built Logezy. A platform designed from the ground up for the specific demands of temp recruitment — where shift scheduling, compliance management, and operational simplicity aren\'t optional extras. They\'re the whole point.',
];

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─────────────────────────────────────────────
   MINI DASHBOARD (hero visual)
───────────────────────────────────────────── */
function MiniDashboard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
        {['bg-red-400','bg-amber-400','bg-emerald-400'].map(c => (
          <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
        ))}
        <div className="flex-1 mx-3 bg-white rounded-md px-3 py-0.5" />
      </div>
      <div className="bg-white flex" style={{ minHeight: 240 }}>
        <div className="w-12 bg-slate-950 flex flex-col items-center py-3 gap-3">
          {[true,false,false,false].map((active, i) => (
            <div key={i} className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: active ? 'rgba(23,149,199,0.2)' : 'transparent' }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: active ? '#1795C7' : '#475569' }} />
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label:'Staff Scheduled', value:'1,284', color:'from-blue-500 to-blue-700' },
              { label:'Compliance',      value:'98.7%', color:'from-emerald-500 to-teal-600' },
              { label:'Open Shifts',     value:'12',    color:'from-amber-500 to-orange-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                <p className={`text-sm font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</p>
                <p className="text-[8px] text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
            {[
              { name:'Sarah Mitchell', role:'NHS Ward B',     status:'live'     },
              { name:'James Okafor',   role:'Royal Hospital', status:'upcoming' },
              { name:'Priya Sharma',   role:'Sunrise Care',   status:'live'     },
            ].map(({ name, role, status }) => (
              <div key={name} className="flex items-center justify-between px-3 py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-[9px] font-semibold text-slate-700">{name}</p>
                  <p className="text-[8px] text-slate-400">{role}</p>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${status === 'live' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {status === 'live' ? '● Live' : 'Soon'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function About() {
  return (
    <div className="bg-white overflow-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#EFF8F3]">
        {/* Decorative rings */}
        {[700, 920, 1140].map((sz, i) => (
          <div key={sz} style={{
            position:'absolute', right:`${-6 - i*7}%`, top:'50%',
            transform:'translateY(-50%)',
            width:sz, height:sz, borderRadius:'50%',
            border:`${i===0?1.5:1}px ${i===2?'dashed':'solid'} rgba(23,149,199,${0.16-i*0.04})`,
            pointerEvents:'none', zIndex:0,
          }}/>
        ))}
        <div style={{
          position:'absolute', right:'-5%', top:'10%',
          width:700, height:600,
          background:'radial-gradient(ellipse at 70% 40%, rgba(23,149,199,0.09) 0%, transparent 65%)',
          filter:'blur(60px)', pointerEvents:'none', zIndex:0,
        }}/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* Left */}
            <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-bold"
                style={{ background:'rgba(23,149,199,0.10)', border:'1px solid rgba(23,149,199,0.22)', color:'#1795C7' }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'#1795C7',display:'inline-block' }}/>
                About Logezy
              </div>

              <h1 className="font-black leading-[1.06] mb-6"
                style={{ fontSize:'clamp(2.4rem,4vw,3.6rem)', letterSpacing:'-0.03em', color:'#0C2138' }}>
                We built what temp agencies{' '}
                <span style={{
                  background:'linear-gradient(125deg,#1795C7 0%,#5B6CF9 55%,#8B5CF6 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>
                  actually needed.
                </span>
              </h1>

              <p className="text-lg leading-relaxed mb-8" style={{ color:'rgba(12,33,56,0.55)', maxWidth:480 }}>
                Behind every temp recruitment agency is a team working incredibly hard to get the right people into the right roles every single day. We built Logezy because that team deserves staffing software that works just as hard as they do.
              </p>

              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}} transition={{type:'spring',stiffness:400}}>
                  <Link to="/contact" style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    padding:'14px 28px', borderRadius:100, fontSize:14, fontWeight:700,
                    color:'#fff', background:'linear-gradient(135deg,#5B6CF9,#1795C7)',
                    boxShadow:'0 4px 24px rgba(91,108,249,0.38)', textDecoration:'none',
                  }}>
                    Book a Demo <ArrowRight weight="regular" style={{width:15,height:15}}/>
                  </Link>
                </motion.div>
                <motion.div whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}} transition={{type:'spring',stiffness:400}}>
                  <Link to="/contact" style={{
                    display:'inline-flex', alignItems:'center', gap:8,
                    padding:'14px 28px', borderRadius:100, fontSize:14, fontWeight:600,
                    color:'#0C2138', background:'transparent',
                    border:'2px solid rgba(12,33,56,0.20)', textDecoration:'none',
                  }}>
                    Start Free Trial
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right — dashboard + floating chips */}
            <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.7,delay:0.12,ease:[0.22,1,0.36,1]}}
              className="relative hidden lg:block" style={{height:420}}>
              <div className="absolute inset-0 pointer-events-none"
                style={{background:'radial-gradient(ellipse at 55% 50%, rgba(23,149,199,0.18) 0%, rgba(24,55,101,0.1) 45%, transparent 70%)', filter:'blur(16px)', transform:'scale(1.15)'}}/>
              <div className="absolute" style={{left:'2%',top:'6%',width:'70%',transform:'rotate(-2deg)',zIndex:2}}>
                <MiniDashboard />
              </div>
              {/* Stat chips */}
              <motion.div animate={{y:[0,-6,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}
                className="absolute z-10" style={{left:'2%',bottom:'6%'}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:14,background:'rgba(255,255,255,0.90)',border:'1px solid rgba(91,108,249,0.20)',backdropFilter:'blur(16px)',boxShadow:'0 8px 24px rgba(91,108,249,0.12)'}}>
                  <div style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,#5B6CF9,#1795C7)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <Users weight="regular" style={{width:15,height:15,color:'#fff'}}/>
                  </div>
                  <div>
                    <p style={{fontSize:14,fontWeight:800,color:'#0C2138',margin:0,lineHeight:1.1}}>600+</p>
                    <p style={{fontSize:10,color:'rgba(12,33,56,0.45)',margin:'2px 0 0',lineHeight:1}}>Active Agencies</p>
                  </div>
                </div>
              </motion.div>
              <motion.div animate={{y:[0,-5,0]}} transition={{duration:4.5,repeat:Infinity,ease:'easeInOut',delay:0.8}}
                className="absolute z-10" style={{right:'0%',top:'8%'}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:14,background:'rgba(255,255,255,0.90)',border:'1px solid rgba(5,150,105,0.20)',backdropFilter:'blur(16px)',boxShadow:'0 8px 24px rgba(5,150,105,0.12)'}}>
                  <div style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,#059669,#10B981)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <Shield weight="regular" style={{width:15,height:15,color:'#fff'}}/>
                  </div>
                  <div>
                    <p style={{fontSize:14,fontWeight:800,color:'#0C2138',margin:0,lineHeight:1.1}}>100%</p>
                    <p style={{fontSize:10,color:'rgba(12,33,56,0.45)',margin:'2px 0 0',lineHeight:1}}>CQC Compliance</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div style={{position:'absolute',right:'-5%',top:'20%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(23,149,199,0.06) 0%,transparent 65%)',pointerEvents:'none'}}/>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16 items-start">

            {/* Left — sticky label + accent */}
            <motion.div {...fadeUp(0)} className="lg:sticky lg:top-28">
              <div className="section-tag mb-6 inline-flex">Our Story</div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.08] mb-8" style={{letterSpacing:'-0.03em'}}>
                Built by people who understand recruitment.
              </h2>
              {/* Decorative number */}
              <div style={{fontSize:'clamp(4rem,12vw,7.5rem)',fontWeight:900,color:'rgba(23,149,199,0.07)',lineHeight:1,userSelect:'none',letterSpacing:'-0.05em'}}>
                01
              </div>
            </motion.div>

            {/* Right — paragraphs */}
            <div className="space-y-7 pt-2">
              {storyParagraphs.map((text, i) => (
                <motion.p key={i} {...fadeUp(i * 0.1 + 0.1)}
                  className={`leading-relaxed ${i === 0 ? 'text-xl font-medium text-slate-700' : 'text-lg text-slate-500'}`}>
                  {text}
                </motion.p>
              ))}

              {/* Quote callout */}
              <motion.blockquote {...fadeUp(0.4)}
                className="relative rounded-2xl p-7 mt-2"
                style={{background:'linear-gradient(135deg,rgba(91,108,249,0.06),rgba(23,149,199,0.06))',border:'1px solid rgba(91,108,249,0.15)'}}>
                <Quotes weight="regular" style={{width:28,height:28,color:'rgba(91,108,249,0.35)',marginBottom:8}}/>
                <p className="text-lg font-semibold text-slate-700 leading-relaxed italic">
                  "Good recruiters were spending more time on paperwork than on people. That had to change."
                </p>
                <p className="text-sm text-slate-400 mt-3 font-medium">— Logezy Founders</p>
              </motion.blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR MISSION — dark full-bleed
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden"
        style={{background:'linear-gradient(160deg,#0C1835 0%,#0E2050 100%)'}}>
        {/* Glow */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:800,height:600,background:'radial-gradient(ellipse,rgba(23,149,199,0.18) 0%,transparent 65%)',filter:'blur(60px)',pointerEvents:'none'}}/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-bold"
              style={{background:'rgba(23,149,199,0.15)',border:'1px solid rgba(23,149,199,0.30)',color:'#A8D8EE'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#1795C7',display:'inline-block'}}/>
              Our Mission
            </div>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)}
            className="font-black leading-[1.08] mb-8 text-white"
            style={{fontSize:'clamp(2.4rem,5vw,4rem)',letterSpacing:'-0.03em'}}>
            Our mission is{' '}
            <span style={{background:'linear-gradient(125deg,#1795C7 0%,#5B6CF9 55%,#8B5CF6 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              simple.
            </span>
          </motion.h2>
          <motion.p {...fadeUp(0.16)}
            className="text-xl leading-relaxed max-w-2xl mx-auto"
            style={{color:'rgba(165,210,255,0.75)'}}>
            To give every temp recruitment agency — regardless of size — the tools that were once only available to the biggest players. Powerful enough to handle complex staffing operations. Simple enough that your whole team can use it from day one.
          </motion.p>

          {/* 3 stats */}
          <motion.div {...fadeUp(0.24)} className="grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6 mt-14 max-w-xl mx-auto">
            {[
              {val:'600+', lbl:'UK Agencies'},
              {val:'80%',  lbl:'Less Admin'},
              {val:'3×',   lbl:'Faster Fills'},
            ].map(({val,lbl},i) => (
              <div key={lbl} style={{borderRight: i<2 ? '1px solid rgba(255,255,255,0.10)' : 'none', paddingRight: i<2 ? 24 : 0}}>
                <p style={{fontSize:32,fontWeight:900,color:'#fff',margin:0,letterSpacing:'-0.03em'}}>{val}</p>
                <p style={{fontSize:12,color:'rgba(165,210,255,0.55)',marginTop:4,fontWeight:500}}>{lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY LOGEZY — 3 PILLARS
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div {...fadeUp(0)}>
              <div className="section-tag inline-flex mb-4">Why Logezy</div>
            </motion.div>
            <motion.h2 {...fadeUp(0.08)}
              className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
              style={{letterSpacing:'-0.025em'}}>
              Why agencies choose Logezy{' '}
              <span className="gradient-text">over everything else.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} {...fadeUp(i * 0.1 + 0.05)}
                  whileHover={{y:-8,boxShadow:'0 24px 64px rgba(0,0,0,0.10)'}}
                  transition={{type:'spring',stiffness:280,damping:22}}
                  className="bg-white rounded-3xl p-8 cursor-default"
                  style={{border:'1px solid #E2E8F0',boxShadow:'0 4px 16px rgba(0,0,0,0.04)'}}>
                  {/* Icon */}
                  <motion.div whileHover={{scale:1.12,rotate:6}} transition={{type:'spring',stiffness:300}}
                    style={{width:54,height:54,borderRadius:16,background:p.gradient,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20,boxShadow:`0 8px 24px ${p.glow}`}}>
                    <Icon weight="regular" style={{width:24,height:24,color:'#fff'}}/>
                  </motion.div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT WE HANDLE — comparison table
      ══════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div {...fadeUp(0)}>
              <div className="section-tag inline-flex mb-4">What We Handle</div>
            </motion.div>
            <motion.h2 {...fadeUp(0.08)}
              className="text-4xl sm:text-5xl font-black text-slate-900"
              style={{letterSpacing:'-0.025em'}}>
              The hard stuff.{' '}
              <span className="gradient-text">Sorted.</span>
            </motion.h2>
          </div>

          <motion.div {...fadeUp(0.12)}
            className="rounded-2xl overflow-hidden"
            style={{border:'1px solid #E2E8F0',boxShadow:'0 8px 40px rgba(0,0,0,0.07)'}}>
            {/* Header */}
            <div className="grid grid-cols-2" style={{background:'linear-gradient(135deg,#0C1835,#0E2050)'}}>
              <div className="px-4 sm:px-7 py-4 sm:py-5 text-xs sm:text-sm font-bold text-white/70 border-r border-white/10">What used to take hours</div>
              <div className="px-4 sm:px-7 py-4 sm:py-5 text-xs sm:text-sm font-bold text-white">With Logezy</div>
            </div>
            {/* Rows */}
            {handleRows.map(({ task, result }, i) => (
              <motion.div key={task}
                initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
                viewport={{once:true}} transition={{duration:0.4,delay:i*0.07}}
                className={`grid grid-cols-2 group transition-colors ${i%2===0?'bg-white':'bg-slate-50/50'} hover:bg-blue-50/40`}>
                <div className="px-4 sm:px-7 py-4 sm:py-5 text-xs sm:text-sm text-slate-600 border-r border-slate-100 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0"/>
                  {task}
                </div>
                <div className="px-4 sm:px-7 py-4 sm:py-5 flex items-center gap-2.5">
                  <div style={{width:22,height:22,borderRadius:'50%',background:'linear-gradient(135deg,#059669,#10B981)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <CheckCircle weight="regular" style={{width:13,height:13,color:'#fff'}}/>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{result}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHO WE SERVE
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#F8FAFC] relative overflow-hidden">
        <div style={{position:'absolute',left:'-5%',top:'20%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(23,149,199,0.06) 0%,transparent 65%)',pointerEvents:'none'}}/>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div {...fadeUp(0)}>
                <div className="section-tag mb-6 inline-flex">Who We Serve</div>
              </motion.div>
              <motion.h2 {...fadeUp(0.08)}
                className="text-4xl sm:text-5xl font-black text-slate-900 mb-7 leading-[1.08]"
                style={{letterSpacing:'-0.03em'}}>
                Made for agencies of every size.
              </motion.h2>
              {[
                "Whether you're a two-person agency placing your first 20 workers, or an established operation managing thousands of shifts a week — Logezy scales with you.",
                "We work with temp recruitment agencies across healthcare, hospitality, and education — industries where getting the right person in the right place at the right time isn't just important. It's everything.",
              ].map((text,i) => (
                <motion.p key={i} {...fadeUp(0.1 + i*0.1)}
                  className={`leading-relaxed ${i===0?'text-xl font-medium text-slate-700 mb-5':'text-lg text-slate-500'}`}>
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Right — industry tiles */}
            <motion.div {...fadeUp(0.16)} className="grid gap-4">
              {[
                { icon:Heartbeat, label:'Healthcare & Nursing', desc:'NMC / HCPC compliance, DBS tracking, CQC-ready audits.', color:'linear-gradient(135deg,#EF4444,#EC4899)', bg:'rgba(239,68,68,0.06)', border:'rgba(239,68,68,0.14)' },
                { icon:GraduationCap, label:'Education', desc:'Supply teachers, TAs, same-day placements, AWR-compliant payroll.', color:'linear-gradient(135deg,#8B5CF6,#6366F1)', bg:'rgba(139,92,246,0.06)', border:'rgba(139,92,246,0.14)' },
                { icon:Briefcase, label:'Hospitality', desc:'Multi-venue scheduling, last-minute fill, seasonal demand.', color:'linear-gradient(135deg,#D97706,#F59E0B)', bg:'rgba(217,119,6,0.06)', border:'rgba(217,119,6,0.14)' },
              ].map(({icon:Icon,label,desc,color,bg,border}) => (
                <motion.div key={label}
                  whileHover={{x:6,boxShadow:'0 8px 32px rgba(0,0,0,0.08)'}}
                  transition={{type:'spring',stiffness:300,damping:22}}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white"
                  style={{border:`1px solid ${border}`,background:'white'}}>
                  <div style={{width:44,height:44,borderRadius:14,background:color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:`0 6px 16px ${bg}`}}>
                    <Icon weight="regular" style={{width:20,height:20,color:'#fff'}}/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-0.5">{label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{background:'linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,rgba(23,149,199,0.16) 0%,transparent 60%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:0,right:0,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 65%)',transform:'translate(30%,30%)',pointerEvents:'none'}}/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.65,ease:[0.22,1,0.36,1]}}>
              <h2 className="font-black text-white leading-[1.08] mb-5"
                style={{fontSize:'clamp(2rem,4vw,3.2rem)',letterSpacing:'-0.03em'}}>
                Ready to see what Logezy<br/>
                <span style={{background:'linear-gradient(125deg,#1795C7 0%,#5B6CF9 55%,#8B5CF6 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  can do for your agency?
                </span>
              </h2>
              <p style={{color:'rgba(165,210,255,0.65)',fontSize:18,lineHeight:1.65,marginBottom:32}}>
                Join hundreds of temp recruitment agencies already running smoother, faster, and smarter.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}} transition={{type:'spring',stiffness:400}}>
                  <Link to="/contact" style={{
                    display:'inline-flex',alignItems:'center',gap:8,
                    padding:'14px 28px',borderRadius:100,fontSize:15,fontWeight:700,
                    color:'#fff',background:'linear-gradient(135deg,#5B6CF9,#1795C7)',
                    boxShadow:'0 4px 24px rgba(91,108,249,0.38)',textDecoration:'none',
                  }}>
                    Start Free Trial <ArrowRight weight="regular" style={{width:15,height:15}}/>
                  </Link>
                </motion.div>
                <motion.div whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}} transition={{type:'spring',stiffness:400}}>
                  <Link to="/contact" style={{
                    display:'inline-flex',alignItems:'center',gap:8,
                    padding:'14px 28px',borderRadius:100,fontSize:15,fontWeight:600,
                    color:'rgba(255,255,255,0.80)',background:'rgba(255,255,255,0.08)',
                    border:'1.5px solid rgba(255,255,255,0.16)',textDecoration:'none',
                  }}>
                    Book a Demo
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.65,delay:0.1,ease:[0.22,1,0.36,1]}}
              className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon:Users,   label:'UK Agencies',    value:'600+', g:'linear-gradient(135deg,#5B6CF9,#1795C7)' },
                { icon:TrendUp, label:'Admin Saved',    value:'80%',  g:'linear-gradient(135deg,#8B5CF6,#A855F7)' },
                { icon:Shield,  label:'CQC Compliance', value:'100%', g:'linear-gradient(135deg,#059669,#10B981)' },
                { icon:Pulse,   label:'App Uptime',     value:'99.9%',g:'linear-gradient(135deg,#D97706,#F59E0B)' },
              ].map(({icon:Icon,label,value,g}) => (
                <motion.div key={label}
                  whileHover={{scale:1.05,y:-4}}
                  transition={{type:'spring',stiffness:300,damping:20}}
                  style={{padding:'24px 20px',borderRadius:20,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.10)',textAlign:'center'}}>
                  <div style={{width:44,height:44,borderRadius:13,background:g,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
                    <Icon weight="regular" style={{width:20,height:20,color:'#fff'}}/>
                  </div>
                  <p style={{fontSize:30,fontWeight:900,background:g,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',margin:0,letterSpacing:'-0.03em'}}>{value}</p>
                  <p style={{fontSize:11,color:'rgba(165,210,255,0.50)',marginTop:4,fontWeight:500}}>{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
