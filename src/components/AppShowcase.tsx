import React from 'react';
import { DeviceMobile, Bell, Clock, ArrowRight, Shield, CalendarBlank, FileText, ChatCircle, CheckCircle, MapPin } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import PhoneMockupUI from './PhoneMockupUI';
import { motion } from 'framer-motion';

/* ── Apple Logo SVG ── */
function AppleLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.91 11.94 4.24 17.35 6 20.11c.89 1.35 1.95 2.88 3.35 2.82s1.87-.89 3.51-.89 2.1.89 3.52.86 2.35-1.35 3.24-2.7a11 11 0 0 0 1.44-3.15 4.37 4.37 0 0 1-2.6-3.42z"/>
    </svg>
  );
}

/* ── Google Play Logo SVG ── */
function PlayStoreLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M3.18 23.76a2 2 0 0 0 2.17-.22l12.3-7.1-2.92-2.92-11.55 10.24z" fill="#EA4335"/>
      <path d="M22.16 10.42l-3.5-2.02-3.27 3.27 3.27 3.27 3.54-2.04a1.42 1.42 0 0 0 0-2.48z" fill="#FBBC04"/>
      <path d="M3.18.24A2 2 0 0 0 2 2.06v19.88l11.55-11.55L3.18.24z" fill="#4285F4"/>
      <path d="M15.39 12L3.18 23.76l.0.0 12.21-7.07-2.92-2.92 2.92-2.92-12.21-7.08L15.39 12z" fill="#34A853"/>
    </svg>
  );
}

const appFeatures = [
  { icon: CalendarBlank, label: 'Shift Management', desc: 'No more missed messages or last-minute confusion. Workers see their shifts, confirm in seconds, and get reminders, all from their phone.', color: 'text-blue-400 bg-blue-400/15' },
  { icon: Clock, label: 'Availability', desc: "Workers let you know when they're free, so you're always filling shifts with people who actually want to work. No more guessing, no more awkward calls.", color: 'text-emerald-400 bg-emerald-400/15' },
  { icon: Shield, label: 'Compliance', desc: "Keeping on top of worker documents doesn't have to feel like a full-time job. Workers upload what's needed at their own pace, and your team always knows exactly where things stand.", color: 'text-violet-400 bg-violet-400/15' },
  { icon: FileText, label: 'Digital Timesheets', desc: 'Clocking in and getting paid should be the easy part. With digital timesheets, it is: no paperwork, no back-and-forth, just a smooth process for your agency and your workforce.', color: 'text-amber-400 bg-amber-400/15' },
  { icon: Bell, label: 'Three-Way Notifications', desc: 'Everyone stays in the loop: your agency, your workers, and your clients. The right people get the right updates at the right time, without anyone having to chase.', color: 'text-rose-400 bg-rose-400/15' },
  { icon: ChatCircle, label: 'Chat', desc: 'Sometimes a quick message makes all the difference. Workers can reach your team and your team can reach them, all in one place, right inside the app.', color: 'text-cyan-400 bg-cyan-400/15' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function AppShowcase() {
  return (
    <section className="py-14 lg:py-28 overflow-hidden relative"
      style={{ background: 'linear-gradient(160deg, #080E2A 0%, #0C1640 50%, #080E2A 100%)' }}>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full -top-48 left-1/2 -translate-x-1/2 opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(23,149,199,0.6) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-0 translate-x-1/4 opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(24,55,101,0.7) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center order-2 lg:order-1"
          >

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-96 h-96 rounded-full opacity-25"
                style={{ background: 'radial-gradient(circle, rgba(23,149,199,0.5) 0%, transparent 65%)', filter: 'blur(40px)' }} />
            </div>

            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-blue-400/20 animate-spin-slow" />
              <div className="absolute w-56 h-56 rounded-full border border-violet-400/15" style={{ animation: 'spin-slow 30s linear infinite reverse' }} />
            </div>

            <div className="relative z-10">
              <PhoneMockupUI />

              {/* Floating badges around phone */}
              <div className="absolute -top-6 -right-6 glass shadow-elevated rounded-2xl px-3.5 py-2.5 animate-float whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <CheckCircle weight="regular" className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">Shift confirmed</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">NHS Ward B</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 glass shadow-elevated rounded-2xl px-3.5 py-2.5 animate-float-delayed whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-[#2396C6] to-[#183963] flex items-center justify-center">
                    <MapPin weight="regular" className="h-3.5 w-3.5 text-white" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">GPS verified</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">London, W1A 1AA</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/3 -left-12 glass shadow-elevated rounded-xl px-3 py-2 animate-float-slow whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <div className="relative w-2.5 h-2.5">
                    <div className="pulse-ring w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-700">Live tracking on</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Copy */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Section badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(23,149,199,0.14)', border: '1px solid rgba(23,149,199,0.28)', color: '#A8D8EE' }}>
                  <DeviceMobile weight="regular" className="h-3 w-3" />
                  Mobile App
                </div>
                {/* Platform pills */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <AppleLogo size={12} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>iOS</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <PlayStoreLogo size={12} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Android</span>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-[1.06]"
                style={{ letterSpacing: '-0.025em' }}>
                Keep your workers<br />
                <span className="gradient-text">connected. Always.</span>
              </h2>

              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(165,210,255,0.85)' }}>
                Give your temps a mobile experience that carries your brand and keeps them engaged from first shift to last.
              </p>
            </motion.div>

            {/* App features grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
            >
              {appFeatures.map(({ icon: Icon, label, desc, color }) => (
                <motion.div key={label}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex items-start gap-3 p-4 rounded-2xl cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}
                  >
                    <Icon weight="regular" className="h-4 w-4" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-white/85 mb-0.5">{label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(200,225,255,0.80)' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* CTA button */}
              <div className="flex flex-wrap gap-3 mb-5">
                <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link to="/contact" className="btn-primary rounded-2xl inline-flex items-center gap-2">
                    Get the app
                    <ArrowRight weight="regular" className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Store badges */}
              <div className="flex flex-wrap gap-3">
                {/* App Store badge */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="inline-flex items-center gap-3 no-underline"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 14,
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <AppleLogo size={24} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>
                      Download on the
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                      App Store
                    </span>
                  </div>
                </motion.a>

                {/* Google Play badge */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="inline-flex items-center gap-3 no-underline"
                  style={{
                    padding: '10px 18px',
                    borderRadius: 14,
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <PlayStoreLogo size={24} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 500, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>
                      Get it on
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                      Google Play
                    </span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
