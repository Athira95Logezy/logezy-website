import React from 'react';
import { ArrowRight, CheckCircle, Lightning } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #183765 0%, #1795C7 55%, #0d2a4d 100%)' }}>

          {/* Noise texture overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
              backgroundSize: '200px',
              opacity: 0.35,
            }} />

          {/* Mesh gradient orbs */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)', filter: 'blur(20px)' }} />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(24,55,101,0.4) 0%, transparent 65%)', filter: 'blur(25px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)' }} />

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Top highlight line */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.5), rgba(255,255,255,0.3), transparent)' }} />

          <div className="relative text-center px-8 py-20 md:px-16 md:py-24">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Free 10-day trial · No commitment
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] mb-6"
              style={{ letterSpacing: '-0.025em', textShadow: '0 2px 40px rgba(0,0,0,0.2)' }}
            >
              Ready to run a more<br />
              efficient temp agency?
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-xl text-blue-100/80 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Join the growing number of recruitment agencies using Logezy to automate their staffing operations, reduce admin, and place more workers — faster.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 text-white font-bold text-base px-8 py-4 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #1795C7 0%, #183765 100%)',
                    boxShadow: '0 8px 32px rgba(23,149,199,0.45), 0 2px 8px rgba(0,0,0,0.2)',
                  }}>
                  Start 10-day free trial
                  <ArrowRight weight="fill" className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-white font-semibold text-base px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                  style={{ color: '#183765', border: '2px solid rgba(255,255,255,0.9)' }}>
                  Book a demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust checklist */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-x-8 gap-y-3"
            >
              {[
                'No lengthy setup',
                'No commitment',
                'Full support from day one',
              ].map(item => (
                <motion.div key={item} variants={itemVariants} className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
