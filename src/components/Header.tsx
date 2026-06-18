import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  List, X, ArrowRight, CaretDown,
  CalendarBlank, Clock, Users, Shield, FileText, Receipt,
  Briefcase, Buildings, DeviceMobile,
  Heartbeat, BookOpen, ForkKnife, Newspaper, ChartBar,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────── */
const productLinks = [
  { icon: CalendarBlank, label: 'Scheduling',               desc: 'Drag-and-drop rota builder',     color: 'text-violet-600 bg-violet-50', to: '/product/scheduling'       },
  { icon: Clock,         label: 'Availability',             desc: 'Live workforce availability',     color: 'text-teal-600 bg-teal-50',     to: '/product/availability'      },
  { icon: Users,         label: 'Candidate & Client Mgmt',  desc: 'All your people in one place',    color: 'text-pink-600 bg-pink-50',     to: '/product/candidate-client'  },
  { icon: Shield,        label: 'Compliance',               desc: 'CQC & GDPR ready',                color: 'text-amber-600 bg-amber-50',   to: '/product/compliance'        },
  { icon: FileText,      label: 'Digital Timesheets',       desc: 'GPS-verified attendance',         color: 'text-emerald-600 bg-emerald-50',to: '/product/timesheets'       },
  { icon: Receipt,       label: 'Invoicing',                desc: 'Auto-generate on approval',       color: 'text-[#2396C6] bg-[#E8F5FB]',     to: '/product/invoicing'         },
  { icon: Briefcase,     label: 'Recruitment Portal',       desc: 'Hire faster, smarter',            color: 'text-orange-600 bg-orange-50', to: '/product/recruitment'       },
  { icon: Buildings,     label: 'Client Portal',            desc: 'Self-serve for your clients',     color: 'text-cyan-600 bg-cyan-50',     to: '/product/client-portal'     },
  { icon: DeviceMobile,  label: 'Candidate Mobile App',     desc: 'iOS & Android',                   color: 'text-[#2396C6] bg-[#E8F5FB]', to: '/product/mobile-app'        },
];

const resourceLinks = [
  { icon: Newspaper, label: 'Blog',         desc: 'Insights for UK staffing agencies', color: 'text-[#2396C6] bg-[#E8F5FB]', to: '/resources/blog'          },
  { icon: ChartBar,  label: 'Case Studies', desc: 'Real agencies, real results',        color: 'text-emerald-600 bg-emerald-50', to: '/resources/case-studies' },
];

const industryLinks = [
  { icon: Heartbeat,  label: 'Healthcare & Nursing', desc: 'NMC / HCPC compliance tools',    color: 'text-rose-600 bg-rose-50',     to: '/industries/healthcare'  },
  { icon: BookOpen,   label: 'Education',            desc: 'Supply teachers & TAs',           color: 'text-violet-600 bg-violet-50', to: '/industries/education'   },
  { icon: ForkKnife,  label: 'Hospitality',          desc: 'Hotels, events & catering',       color: 'text-amber-600 bg-amber-50',   to: '/industries/hospitality' },
];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -6 },
  show:   { opacity: 1, scale: 1,    y:  0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, scale: 0.96, y: -6, transition: { duration: 0.12 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.16 } },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -12 },
  show:   (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.04, duration: 0.22 } }),
};

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
export default function Header() {
  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#e2e8f0,0_4px_24px_rgba(0,0,0,0.06)]'
          : 'bg-white border-b border-slate-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[66px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center flex-shrink-0 group">
            <img
              src="/logezy_Logo.png"
              alt="Logezy — Temporary Recruitment Software"
              className="h-11 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setActiveDropdown(null)}>

            {/* ── Product dropdown ── */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('product')}>
              <button className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeDropdown === 'product' || isActive('/product')
                  ? 'text-[#2396C6] bg-[#E8F5FB]/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}>
                Product
                <motion.span
                  animate={{ rotate: activeDropdown === 'product' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex ${activeDropdown === 'product' ? 'text-[#2396C6]' : 'text-slate-400'}`}
                >
                  <CaretDown weight="regular" className="h-3.5 w-3.5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeDropdown === 'product' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl border border-slate-200/70 p-4"
                    style={{
                      width: 'min(580px, 95vw)',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* 3-column grid for 9 items */}
                    <div className="grid grid-cols-3 gap-1">
                      {productLinks.map(({ icon: Icon, label, desc, color, to }) => (
                        <Link key={label} to={to} onClick={() => window.scrollTo(0, 0)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color} group-hover:scale-110 transition-transform duration-200`}>
                            <Icon weight="regular" className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-[#2396C6] transition-colors leading-tight truncate">{label}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
                      <p className="text-xs text-slate-400">All features included in every plan</p>
                      <Link to="/features" className="text-xs font-semibold text-[#2396C6] hover:text-[#183963] flex items-center gap-1">
                        View all features <ArrowRight weight="regular" className="h-3 w-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Industries dropdown ── */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('industries')}>
              <button className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeDropdown === 'industries' || isActive('/industries')
                  ? 'text-[#2396C6] bg-[#E8F5FB]/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}>
                Industries
                <motion.span
                  animate={{ rotate: activeDropdown === 'industries' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex ${activeDropdown === 'industries' ? 'text-[#2396C6]' : 'text-slate-400'}`}
                >
                  <CaretDown weight="regular" className="h-3.5 w-3.5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl border border-slate-200/70 p-2"
                    style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05)' }}
                  >
                    {industryLinks.map(({ icon: Icon, label, desc, color, to }) => (
                      <Link key={label} to={to}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color} group-hover:scale-110 transition-transform duration-200`}>
                          <Icon weight="regular" className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-[#2396C6] transition-colors leading-tight">{label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── About ── */}
            <Link to="/about" onMouseEnter={() => setActiveDropdown(null)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive('/about') ? 'text-[#2396C6] bg-[#E8F5FB]/80' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}>
              About
            </Link>

            {/* ── Resources dropdown ── */}
            <div className="relative" onMouseEnter={() => setActiveDropdown('resources')}>
              <button className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeDropdown === 'resources' || isActive('/resources')
                  ? 'text-[#2396C6] bg-[#E8F5FB]/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}>
                Resources
                <motion.span
                  animate={{ rotate: activeDropdown === 'resources' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex ${activeDropdown === 'resources' ? 'text-[#2396C6]' : 'text-slate-400'}`}
                >
                  <CaretDown weight="regular" className="h-3.5 w-3.5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden" animate="show" exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl border border-slate-200/70 p-2"
                    style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05)' }}
                  >
                    {resourceLinks.map(({ icon: Icon, label, desc, color, to }) => (
                      <Link key={label} to={to}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color} group-hover:scale-110 transition-transform duration-200`}>
                          <Icon weight="regular" className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-[#2396C6] transition-colors leading-tight">{label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Pricing / Contact ── */}
            {[
              { to: '/pricing', label: 'Pricing' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.to} to={link.to} onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(link.to) ? 'text-[#2396C6] bg-[#E8F5FB]/80' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://accounts.logezy.co/login"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Sign in
            </a>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
              <a
                href="https://logezy.co/get-started"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2396C6] to-[#183963] hover:from-[#2396C6] hover:to-[#2396C6] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-[0_2px_8px_rgba(23,149,199,0.35)] hover:shadow-[0_4px_16px_rgba(23,149,199,0.45)] transition-all duration-200"
              >
                Book a Demo
                <ArrowRight weight="regular" className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          {/* ── Mobile toggle ── */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen
              ? <X    weight="regular" className="h-5 w-5" />
              : <List weight="regular" className="h-5 w-5" />
            }
          </motion.button>
        </div>

      </div>
    </motion.header>

    {/* ── Mobile Menu (portal — outside motion.header to avoid transform stacking context) ── */}
    {createPortal(
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              position: 'fixed',
              top: 66,
              left: 0,
              right: 0,
              bottom: 0,
              overflowY: 'auto',
              background: '#fff',
              borderTop: '1px solid #f1f5f9',
              zIndex: 49,
            }}
          >
            <nav className="flex flex-col px-3 py-3 pb-6">

              {/* Product group — 2-column grid */}
              <p className="px-1 pt-1 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</p>
              <div className="grid grid-cols-2 gap-0.5">
                {productLinks.map(({ icon: Icon, label, color, to }, i) => (
                  <motion.div key={to} custom={i} variants={mobileLinkVariants} initial="hidden" animate="show">
                    <Link to={to} onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${color}`}>
                        <Icon weight="regular" className="h-3 w-3" />
                      </div>
                      <span className="truncate">{label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Industries + Resources side by side */}
              <div className="grid grid-cols-2 gap-x-2 mt-2 pt-2 border-t border-slate-100">
                <div>
                  <p className="px-1 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industries</p>
                  {industryLinks.map(({ icon: Icon, label, color, to }, i) => (
                    <motion.div key={to} custom={productLinks.length + i} variants={mobileLinkVariants} initial="hidden" animate="show">
                      <Link to={to} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${color}`}>
                          <Icon weight="regular" className="h-3 w-3" />
                        </div>
                        <span className="truncate">{label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <p className="px-1 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Company</p>
                  {[
                    { to: '/about',   label: 'About'   },
                    { to: '/pricing', label: 'Pricing' },
                    { to: '/contact', label: 'Contact' },
                    ...resourceLinks.map(r => ({ to: r.to, label: r.label })),
                  ].map((link, i) => (
                    <motion.div key={link.to} custom={productLinks.length + industryLinks.length + i} variants={mobileLinkVariants} initial="hidden" animate="show">
                      <Link to={link.to} onClick={() => setIsMenuOpen(false)}
                        className={`block px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive(link.to) ? 'text-[#2396C6] bg-[#E8F5FB]' : 'text-slate-700 hover:bg-slate-50'
                        }`}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="https://accounts.logezy.co/login"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full text-center py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Sign in
                </a>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="https://logezy.co/get-started"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2396C6] to-[#183963] text-white text-sm font-semibold py-3 px-5 rounded-xl shadow-[0_2px_8px_rgba(23,149,199,0.35)]"
                  >
                    Book a Demo
                    <ArrowRight weight="regular" className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
  );
}
