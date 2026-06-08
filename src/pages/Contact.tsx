import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope, Phone, MapPin, Clock, Chat, Users, ArrowRight, CaretDown } from '@phosphor-icons/react';

const contactMethods = [
  { icon: Envelope, title: 'Email us', value: 'info@logezy.co.uk', description: "We'll respond within 24 hours.", gradient: 'from-sky-400 to-blue-500' },
  { icon: Phone, title: 'Call us', value: '(0333) 006-2179', description: 'Mon–Fri, 9am–6pm GMT.', gradient: 'from-emerald-400 to-green-500' },
  { icon: Chat, title: 'Live chat', value: 'Available in-app', description: '24/7 support for active customers.', gradient: 'from-indigo-400 to-violet-500' },
  { icon: MapPin, title: 'Visit us', value: 'Derby, DE1 1NN', description: 'Office 108, The Old Courthouse, 18-22 St Peter\'s Churchyard', gradient: 'from-violet-400 to-purple-500' },
];

const faqs = [
  { q: 'How long does onboarding take?', a: 'Most agencies are fully set up and live within 2–3 business days. Our onboarding team guides you every step of the way.' },
  { q: 'Is there a free trial available?', a: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required.' },
  { q: 'Can I migrate data from my current system?', a: 'Absolutely. We support data imports from most major homecare platforms and provide migration assistance at no extra cost.' },
  { q: 'Is Logezy CQC compliant?', a: "Yes. Logezy is built with CQC standards at its core, including geo-locked shift verification, full audit trails, and automated compliance reports." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const faqListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const answerVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  return (
    <div className="bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', transform: 'translate(20%,-30%)', animation: 'aurora-1 14s ease-in-out infinite' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              className="pill-badge mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              Get In Touch
            </motion.div>
            <motion.h1
              className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
              We'd love to{' '}
              <span className="gradient-text">hear from you</span>
            </motion.h1>
            <motion.p
              className="text-xl text-slate-500 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}>
              Ready to start a trial, want a demo, or just have a question? Our team is here to help.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="py-10 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}>
            {contactMethods.map((m) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  className="bento-card p-5 group"
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <motion.div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-3 shadow-sm`}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    <Icon weight="regular" className="h-5 w-5 text-white" />
                  </motion.div>
                  <p className="font-semibold text-slate-900 text-sm mb-0.5">{m.title}</p>
                  <p className="text-sky-600 font-medium text-sm mb-1">{m.value}</p>
                  <p className="text-xs text-slate-500">{m.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Form + demo */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Form */}
            <motion.div
              className="lg:col-span-3 bento-card p-8 shadow-elevated"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Send us a message</h2>
              <p className="text-slate-500 text-sm mb-7">We'll get back to you within one business day.</p>
              <form name="contact" method="POST" data-netlify="true" className="flex flex-col gap-5">
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" name="name" placeholder="Sarah Mitchell" className="input-field"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
                    <input type="email" name="email" placeholder="sarah@agency.com" className="input-field"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Agency Name</label>
                  <input type="text" name="company" placeholder="Sunshine Home Care" className="input-field"
                    value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us how we can help..." className="input-field resize-none"
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary justify-center"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                  Send Message
                  <ArrowRight weight="regular" className="h-4 w-4" />
                </motion.button>
              </form>
            </motion.div>

            {/* Demo + hours */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="bento-card p-7 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #183963, #183963)' }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(14,165,233,0.15) 0%, transparent 60%)' }} />
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center mb-5 shadow-sm"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    <Users weight="regular" className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Book a Live Demo</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Get a personalised 30-minute walkthrough tailored to your agency's needs.
                  </p>
                  <motion.a
                    href="mailto:info@logezy.co.uk?subject=Demo Request"
                    className="btn-primary text-sm justify-center w-full"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                    Schedule a Demo
                    <ArrowRight weight="regular" className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
              <div className="bento-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                    <Clock weight="regular" className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-500">
                  {[['Mon – Fri', '9am – 6pm GMT'], ['Live Chat', '24/7']].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span>{k}</span>
                      <span className={`font-medium ${k === 'Live Chat' ? 'text-emerald-600' : 'text-slate-700'}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact details card */}
              <div className="bento-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                    <MapPin weight="regular" className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Contact Details</h3>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Envelope weight="regular" className="h-4 w-4 text-sky-500 flex-shrink-0" />
                    <a href="mailto:info@logezy.co.uk" className="hover:text-sky-600 transition-colors">info@logezy.co.uk</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone weight="regular" className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <a href="tel:03330062179" className="hover:text-emerald-600 transition-colors">(0333) 006-2179</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin weight="regular" className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Office 108, The Old Courthouse,<br />
                      18-22 St Peter's Churchyard,<br />
                      Derby, DE1 1NN
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              className="section-tag inline-flex mb-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              FAQ
            </motion.div>
            <motion.h2
              className="text-3xl font-extrabold text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
              Frequently asked <span className="gradient-text">questions</span>
            </motion.h2>
          </div>
          <motion.div
            className="flex flex-col gap-3"
            variants={faqListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bento-card overflow-hidden"
                variants={faqItemVariants}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0">
                    <CaretDown
                      weight="regular"
                      className={`h-4 w-4 transition-colors ${openFaq === idx ? 'text-sky-500' : 'text-slate-400'}`}
                    />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      key="answer"
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ overflow: 'hidden' }}>
                      <div className="px-5 pb-5">
                        <div className="h-px bg-slate-100 mb-4" />
                        <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #183963, #183963)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 60%)' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            Start your free trial today
          </motion.h2>
          <motion.p
            className="text-slate-400 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            Join 600+ UK agencies already running smarter with Logezy.
          </motion.p>
          <motion.a
            href="mailto:info@logezy.co.uk"
            className="btn-primary inline-flex"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}>
            Get Started Free
            <ArrowRight weight="regular" className="h-4 w-4" />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
