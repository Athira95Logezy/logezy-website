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
    { label: 'Book a Demo',             to: 'https://booking.logezy.co/#/67044000000025008', external: true },
    { label: 'Contact Us',              to: '/contact'                  },
  ],
};

const socials = [
  { Icon: LinkedinLogo,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/logezy-resourcing/?viewAsMember=true', bg: 'bg-[#E8F5FB]  hover:bg-[#E8F5FB]',  text: 'text-[#2396C6]',  border: 'border-[#A8D9EF]'  },
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

      {/* -- TOP RAINBOW STRIP -- */}
      <div className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #2396C6 0%, #183765 35%, #2396C6 65%, #2396C6 100%)' }} />

      {/* -- MAIN FOOTER -- */}
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
                <img src="/logezy_Logo.png" alt="Logezy" className="h-10 w-auto" />
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
                    <Icon weight="regular" className="h-3.5 w-3.5" />
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
                      {(item as any).external ? (
                        <a
                          href={item.to}
                          target="_blank" rel="noopener noreferrer"
                          className="text-sm text-slate-500 hover:text-[#2396C6] transition-colors duration-150 flex items-center gap-1 group"
                        >
                          <ArrowRight weight="regular" className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2396C6] transition-all duration-200" />
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.to}
                          className="text-sm text-slate-500 hover:text-[#2396C6] transition-colors duration-150 flex items-center gap-1 group"
                        >
                          <ArrowRight weight="regular" className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2396C6] transition-all duration-200" />
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* -- CONTACT STRIP -- */}
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
                style={{ background: 'linear-gradient(135deg, #2396C6, #183765)' }}>
                <Envelope weight="regular" className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-[#2396C6] transition-colors font-medium">
                info@logezy.co.uk
              </span>
            </a>

            <span className="hidden sm:block w-px h-4 bg-slate-200" />

            <a href="tel:03330062179"
              className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2396C6, #183765)' }}>
                <Phone weight="regular" className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-[#2396C6] transition-colors font-medium">
                (0333) 006-2179
              </span>
            </a>

            <span className="hidden sm:block w-px h-4 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2396C6, #183765)' }}>
                <MapPin weight="regular" className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-slate-600">
                Office 108, The Old Courthouse, 18-22 St Peter's Churchyard, Derby DE1 1NN
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* -- BOTTOM BAR -- */}
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
