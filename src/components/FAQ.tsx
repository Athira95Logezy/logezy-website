import React, { useState } from 'react';
import { CaretDown, Question, ArrowRight, ChatCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'What is Logezy and who is it built for?',
    a: 'Logezy is a cloud-based staffing agency software built for temp recruitment agencies. It brings shift scheduling, compliance, timesheets, invoicing, and workforce communication into one clean platform.',
  },
  {
    q: 'Can Logezy handle compliance tracking for temporary workers?',
    a: 'Yes. Logezy automatically tracks right-to-work documents, DBS certificates, and expiring certifications across your workforce — so your agency stays audit-ready without the manual chasing.',
  },
  {
    q: 'How does the digital timesheet process work?',
    a: 'Workers submit timesheets from their phone, your team approves in one click, and the data flows straight to invoicing and payroll. No paper, no errors.',
  },
  {
    q: 'Is there a mobile app for temporary workers?',
    a: 'Yes — a fully branded candidate app for your agency. Workers manage availability, view shifts, submit timesheets, and chat with your team all in one place.',
  },
  {
    q: 'How quickly can we get set up?',
    a: 'Most agencies are up and running within hours. No lengthy onboarding, no technical headaches.',
  },
  {
    q: 'Can we try Logezy before committing?',
    a: 'Yes. Start a free 10-day trial — no credit card required — or book a demo and we\'ll walk you through everything.',
  },
];

const answerVariants = {
  hidden: { height: 0, opacity: 0 },
  show: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const listItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Left column — sticky heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="section-tag mb-5 inline-flex">
              <Question weight="regular" className="h-3 w-3" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-5 leading-[1.08]"
              style={{ letterSpacing: '-0.025em' }}>
              Frequently asked<br />questions
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Everything you need to know about Logezy. Can't find your answer?
            </p>

            {/* CTA card */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <ChatCircle weight="regular" className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Still have questions?</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                Our team is happy to walk you through the platform and answer any questions.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group">
                Chat with us
                <ArrowRight weight="regular" className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right column — accordion */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-3"
          >
            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <motion.div key={i} variants={listItemVariants}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    open === i
                      ? 'border-blue-200 bg-blue-50/50 shadow-[0_2px_16px_rgba(23,149,199,0.08)]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors ${
                      open === i ? 'text-blue-700' : 'text-slate-800'
                    }`}>
                      {q}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      open === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <motion.span
                        animate={{ rotate: open === i ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex"
                      >
                        <CaretDown weight="regular" className="h-4 w-4" />
                      </motion.span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        key="answer"
                        variants={answerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-5">
                          <div className="h-px bg-blue-200/60 mb-4" />
                          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
