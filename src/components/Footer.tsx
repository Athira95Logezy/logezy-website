import React from 'react';
import { Link } from 'react-router-dom';
import {
  Envelope, MapPin, Phone,
  FacebookLogo, LinkedinLogo, InstagramLogo, YoutubeLogo,
  ArrowRight, Shield, Star, Lightning, CheckCircle,
  ArrowUpRight,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const links = {
  Product: [
    { label: 'Scheduling',               to: '/product/scheduling'       },
    { label: 'Digital Timesheets',        to: '/product/timesheets'       },
    { label: 'Compliance',               to: '/product/compliance'       },
    { label: 'Invoicing',                to: '/product/invoicing'        },
    { label: 'Candidate Mobile App',     to: '/product/mobile-app'       },
    { label: 'Client Portal',            to: '/product/client-portal'    },
  ],
  Industries: [
    { label: 'Healthcare & Nursing',     to: '/industries/healthcare'    },
    { label: 'Education',               to: '/industries/education'     },
    { label: 'Hospitality',             to: '/industries/hospitality'   },
  ],
  Company: [
    { label: 'About Us',                to: '/about'                    },
    { label: 'Resources',               to: '/resources'                },
    { label: 'Contact Us',              to: '/contact'                  },
  ],
  Support: [
    { label: 'Book a Demo',             to: '/contact'                  },
    { label: 'Contact Us',              to: '/contact'                  },
  ],
};

const socials = [
  { Icon: LinkedinLogo,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/logezy-resourcing/?viewAsMember=true', bg: 'bg-blue-50  hover:bg-blue-100',  text: 'text-blue-600',  border: 'border-blue-200'  },
  { Icon: InstagramLogo, label: 'Instagram', href: 'https://www.instagram.com/logezy_software/',                             bg: 'bg-pink-50  hover:bg-pink-100',  text: 'text-pink-500',  border: 'border-pink-200'  },
  { Icon: FacebookLogo,  label: 'Facebook',  href: 'https://www.facebook.com/logezy2018/',                                   bg: 'bg-sky-50   hover:bg-sky-100',   text: 'text-sky-600',   border: 'border-sky-200'   },
  { Icon: YoutubeLogo,   label: 'YouTube',   href: 'https://www.youtube.com/channel/UCm_aZWC64g-q1I0nfdYD_nw',              bg: 'bg-red-50   hover:bg-red-100',   text: 'text-red-500',   border: 'border-red-200'   },
];


const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <footer className="relative bg-white overflow-hidden">

      {/* ── TOP RAINBOW STRIP ── */}
      <div className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #1795C7 0%, #183765 35%, #6366F1 65%, #1795C7 100%)' }} />

      {/* ── CTA BANNER ── */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0C1640 0%, #183765 40%, #1795C7 100%)' }}>

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Glow orbs */}
        <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(23,149,199,0.35) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)', filter: 'blur(35px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Free 10-day trial · No commitment
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.08] mb-4"
                style={{ letterSpacing: '-0.025em' }}>
                Ready to run a more<br />
                <span style={{ background: 'linear-gradient(135deg, #5EEAD4 0%, #38BDF8 50%, #818CF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  efficient temp agency?
                </span>
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-white/75">
                Join the growing number of recruitment agencies using Logezy to automate their staffing operations, reduce admin, and place more workers — faster.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-slate-900 transition-all duration-200"
                    style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
                    Start your 10-day free trial
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.20)' }}>
                    Book a demo
                    <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </div>
              <p className="mt-5 text-sm text-white/60">
                No lengthy setup. No commitment. Full support from day one.
              </p>
            </motion.div>

            {/* Right — stat cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { icon: Shield,       value: 'GDPR',  label: 'Compliant',  gradient: 'from-cyan-400 to-blue-500'    },
                { icon: CheckCircle,  value: 'CQC',   label: 'Ready',      gradient: 'from-emerald-400 to-teal-500' },
                { icon: Star,         value: '4.9★',  label: 'App rating', gradient: 'from-amber-400 to-orange-500' },
                { icon: Lightning,    value: '99.9%', label: 'Uptime SLA', gradient: 'from-violet-400 to-purple-500' },
              ].map(({ icon: Icon, value, label, gradient }) => (
                <motion.div key={label} variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="rounded-2xl p-5 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon weight="fill" className="h-4 w-4 text-white" />
                  </div>
                  <p className={`text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{value}</p>
                  <p className="text-xs mt-0.5 text-white/70">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

          {/* Nav grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-8"
          >
            {/* Brand col */}
            <motion.div variants={itemVariants} className="col-span-2 md:col-span-4">
              <Link to="/" className="inline-flex mb-4">
                <img src="/logezy_Logo.jpg" alt="Logezy" className="h-10 w-auto" />
              </Link>
              <p className="text-sm leading-relaxed text-slate-500 mb-5 max-w-[260px]">
                The UK's leading workforce management platform for staffing &amp; healthcare agencies.
              </p>
              <div className="flex gap-1.5">
                {socials.map(({ Icon, label, href, bg, text, border }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 ${bg} ${text} ${border}`}>
                    <Icon weight="fill" className="h-3.5 w-3.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {Object.entries(links).map(([heading, items]) => (
              <motion.div key={heading} variants={itemVariants} className="col-span-1 md:col-span-2">
                <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest mb-3">
                  {heading}
                </p>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-150 flex items-center gap-1 group"
                      >
                        <ArrowRight
                          weight="bold"
                          className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-blue-500 transition-all duration-200"
                        />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CONTACT STRIP ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-blue-100 pt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a href="mailto:info@logezy.co.uk"
              className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1795C7, #183765)' }}>
                <Envelope weight="fill" className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors font-medium">
                info@logezy.co.uk
              </span>
            </a>

            <span className="hidden sm:block w-px h-4 bg-slate-200" />

            <a href="tel:03330062179"
              className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1795C7, #183765)' }}>
                <Phone weight="fill" className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors font-medium">
                (0333) 006-2179
              </span>
            </a>

            <span className="hidden sm:block w-px h-4 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1795C7, #183765)' }}>
                <MapPin weight="fill" className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600">
                Office 108, The Old Courthouse, 18-22 St Peter's Churchyard, Derby DE1 1NN
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ background: 'linear-gradient(90deg, #0C1640 0%, #183765 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              © {new Date().getFullYear()} Logezy Ltd. All rights reserved.
            </p>
            <div className="flex items-center">
              {['Privacy', 'Terms', 'Cookies', 'GDPR'].map((l, i, arr) => (
                <React.Fragment key={l}>
                  <a href="#"
                    className="text-xs px-2.5 py-1 rounded transition-colors"
                    style={{ color: 'rgba(255,255,255,0.40)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.40)')}>
                    {l}
                  </a>
                  {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.18)' }} className="text-xs">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
