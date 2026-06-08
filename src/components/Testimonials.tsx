/**
 * Testimonials.tsx — Customer Stories · Trustpilot integration
 *
 * Layout
 * ──────
 * Left  : cards scrolling UP   (seamless vertical marquee, fade mask)
 * Center: Trustpilot score badge · H2 · featured quote · CTA
 * Right : cards scrolling DOWN (opposite direction)
 *
 * Reviews sourced from trustpilot.com/review/logezy.co.uk
 * TrustScore 4.5 / 5 · Excellent · 43 reviews
 *
 * Light theme, clean white cards, amber stars, green Trustpilot badge.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Quotes } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   REVIEW DATA  (real Trustpilot reviews)
───────────────────────────────────────────── */
interface Review {
  name: string; initial: string; color: string;
  stars: number; company: string; date: string;
  title: string; text: string;
}

const leftReviews: Review[] = [
  {
    name: 'Angela', initial: 'A', color: '#F43F5E', stars: 5,
    company: 'Care Agency, UK', date: 'Jan 2024',
    title: 'Changed our operations completely',
    text: 'Using Logezy has changed our operations process. The stress in this department has reduced by 98% — it has been truly transformative for our whole team.',
  },
  {
    name: 'presley Bunting', initial: 'P', color: '#10B981', stars: 5,
    company: 'Staffing Agency', date: 'Jan 2024',
    title: 'Exceptional system, four years strong',
    text: 'I\'ve relied on Logezy for the past four years, and it\'s truly an exceptional system with an outstanding support team behind it.',
  },
  {
    name: 'Angeline', initial: 'A', color: '#F97316', stars: 5,
    company: 'Care Provider', date: 'Mar 2025',
    title: 'Thank you Athira',
    text: 'Thank you Athira from Logezy — you have been very helpful and I love the attention to detail in everything you do for us.',
  },
  {
    name: 'Jason Carter', initial: 'J', color: '#8B5CF6', stars: 5,
    company: 'Recruitment Agency', date: 'Sep 2023',
    title: 'Great software',
    text: 'Great software. It really helps me to streamline my business and create efficiency. It has everything a staffing agency needs to run well.',
  },
  {
    name: 'Nargis Nawaz', initial: 'N', color: '#3B82F6', stars: 5,
    company: 'Healthcare Agency', date: 'Aug 2023',
    title: 'Simplified our recruitment',
    text: 'Very good software and easy to use app that has simplified the way we run our healthcare recruitment business completely.',
  },
  {
    name: 'Tresheka Walker', initial: 'T', color: '#F59E0B', stars: 5,
    company: 'Recruitment Agency', date: 'Feb 2022',
    title: 'Great for agencies of all sizes',
    text: 'An all round great software for recruitment companies of any size, with an exceptional team at hand to support you throughout.',
  },
];

const rightReviews: Review[] = [
  {
    name: 'Frontline Care Solutions', initial: 'F', color: '#F43F5E', stars: 5,
    company: 'Crawley, West Sussex', date: 'Jun 2021',
    title: 'The best staff management software',
    text: 'Amazing software to build your business. Excellent backup from the team for any issues. Our staff love the mobile app — they say they haven\'t experienced anything like it before.',
  },
  {
    name: 'Sophie Tamale', initial: 'S', color: '#F59E0B', stars: 5,
    company: 'Healthcare Recruiter', date: 'Jan 2024',
    title: '3 years and still the best',
    text: 'We have worked with Logezy for 3 years now. Manoj and the team are very supportive and responsive — always there when we need them.',
  },
  {
    name: 'Bit Healthcare', initial: 'B', color: '#14B8A6', stars: 5,
    company: 'Healthcare Recruitment', date: 'May 2023',
    title: 'Using Logezy since 2018',
    text: 'We started using Logezy back in 2018. Since then, no other recruitment software has matched its features and the team\'s dedication to their clients.',
  },
  {
    name: 'IGM Premium Care', initial: 'I', color: '#2396C6', stars: 5,
    company: 'Care Provider', date: 'Jun 2021',
    title: 'I definitely recommend Logezy',
    text: 'I definitely recommend Logezy. Khushali and her team helped us tremendously. Our workflow has improved significantly and everything runs more smoothly now.',
  },
  {
    name: 'JordanH', initial: 'J', color: '#10B981', stars: 5,
    company: 'Healthcare Agency, Torbay', date: 'Jun 2021',
    title: 'Exceptional team throughout',
    text: 'The team at Logezy have been exceptional throughout our time working with them. Their responsiveness and ongoing support has been outstanding.',
  },
  {
    name: 'Richard', initial: 'R', color: '#2396C6', stars: 5,
    company: 'UK Business', date: 'Aug 2025',
    title: 'Brilliant service from start to finish',
    text: 'Brilliant service from start to finish. Professional, responsive and delivered exactly what we needed. Could not be happier with the results.',
  },
];


/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */
function StarRow({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} weight="fill" size={13}
          style={{ color: i < count ? '#F59E0B' : '#E2E8F0' }} />
      ))}
    </div>
  );
}


/* ─────────────────────────────────────────────
   TRUSTPILOT STAR (green box, white star)
───────────────────────────────────────────── */
function TpStar({ filled = true }: { filled?: boolean }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 4,
      background: filled ? '#00B67A' : '#DCDCE6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Star weight="fill" size={20} style={{ color: '#fff' }} />
    </div>
  );
}


/* ─────────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────────── */
function ReviewCard({ r }: { r: Review }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 18,
      padding: '20px 22px 18px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.055), 0 1px 4px rgba(0,0,0,0.04)',
      border: '1px solid rgba(226,232,240,0.65)',
      marginBottom: 14,
      flexShrink: 0,
    }}>
      {/* stars */}
      <StarRow count={r.stars} />

      {/* title */}
      <h4 style={{
        fontSize: 13.5, fontWeight: 700, color: '#183963',
        margin: '10px 0 7px', letterSpacing: '-0.01em', lineHeight: 1.3,
      }}>
        {r.title}
      </h4>

      {/* text */}
      <p style={{
        fontSize: 13, color: '#64748B',
        lineHeight: 1.65, margin: '0 0 14px',
      }}>
        {r.text}
      </p>

      {/* reviewer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: r.color + '18',
          border: `1.5px solid ${r.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: r.color,
        }}>
          {r.initial}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, color: '#183963', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
          <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{r.company}</p>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#CBD5E1', whiteSpace: 'nowrap' }}>{r.date}</span>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   SCROLL COLUMN
───────────────────────────────────────────── */
function ScrollColumn({ items, direction, duration }: {
  items: Review[]; direction: 'up' | 'down'; duration: number;
}) {
  const combined = [...items, ...items]; // duplicate for seamless loop

  return (
    <div style={{
      flex: 1,
      position: 'relative',
      height: 620,
      overflow: 'hidden',
      /* fade mask top + bottom */
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
    }}>
      <motion.div
        animate={{ y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {combined.map((r, i) => <ReviewCard key={i} r={r} />)}
      </motion.div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function Testimonials() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  return (
    <section style={{
      background: '#F7F8FA',
      padding: isMobile ? '64px 0 72px' : '108px 0 120px',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* subtle top/bottom border lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(203,213,225,0.5), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(203,213,225,0.5), transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* ── section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.60, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 16px 5px 11px', borderRadius: 100,
            background: 'rgba(0,182,122,0.08)', border: '1px solid rgba(0,182,122,0.22)',
            marginBottom: 18,
          }}>
            <Star weight="fill" size={12} style={{ color: '#00B67A' }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: '#00B67A', letterSpacing: '0.11em', textTransform: 'uppercase' as const }}>Customer Stories</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 900, color: '#183963',
            letterSpacing: '-0.045em', lineHeight: 1.1,
            margin: 0,
          }}>
            Loved by agencies{' '}
            <span style={{
              color: '#00B67A', display: 'inline'}}>across the UK</span>
          </h2>
        </motion.div>

        {/* ── 3-column layout ── */}
        <div style={{ display: 'flex', gap: isMobile ? 0 : 36, alignItems: 'center' }}>

          {/* LEFT: scroll up — hidden on mobile */}
          {!isMobile && <ScrollColumn items={leftReviews} direction="up" duration={32} />}

          {/* CENTER: Trustpilot panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.70, delay: 0.15, ease: EASE }}
            style={{
              flexShrink: 0, width: isMobile ? '100%' : 320,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 0,
            }}
          >

            {/* Trustpilot badge card */}
            <div style={{
              width: '100%',
              background: '#FFFFFF',
              borderRadius: 22,
              padding: '28px 26px 24px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(226,232,240,0.8)',
              marginBottom: 20,
              textAlign: 'center',
            }}>
              {/* Trustpilot wordmark */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[true, true, true, true, true].map((f, i) => <TpStar key={i} filled={f} />)}
                </div>
              </div>

              <div style={{
                fontSize: 11, fontWeight: 800, color: '#191919',
                letterSpacing: '0.01em', marginBottom: 6,
                fontFamily: 'var(--font-body)',
              }}>
                ★ Trustpilot
              </div>

              {/* Score */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: '#00B67A', lineHeight: 1, letterSpacing: '-0.04em' }}>4.5</span>
                <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 500 }}>/5</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#00B67A', margin: '0 0 4px' }}>Excellent</p>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Based on 43 reviews</p>

              <a
                href="https://www.trustpilot.com/review/logezy.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  marginTop: 18,
                  fontSize: 12, fontWeight: 600, color: '#00B67A',
                  textDecoration: 'none',
                  padding: '7px 18px', borderRadius: 100,
                  background: 'rgba(0,182,122,0.08)',
                  border: '1px solid rgba(0,182,122,0.20)',
                  transition: 'background 0.2s',
                }}
              >
                See all reviews on Trustpilot
                <ArrowRight weight="bold" size={11} />
              </a>
            </div>

            {/* featured quote card */}
            <div style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2396C6 0%, #2396C6 100%)',
              borderRadius: 22,
              padding: '26px 26px 22px',
              boxShadow: '0 8px 40px rgba(99,102,241,0.32)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* accent glow */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 140, height: 140, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* quote mark */}
              <div style={{
                fontSize: 60, lineHeight: 1,
                fontFamily: 'Georgia, serif',
                color: '#00B67A', opacity: 0.35,
                marginBottom: 4,
                userSelect: 'none',
              }}>"</div>

              <p style={{
                fontSize: 14.5, color: '#F1F5F9',
                lineHeight: 1.70, margin: '0 0 18px',
                fontStyle: 'italic',
                position: 'relative', zIndex: 1,
              }}>
                Using Logezy has changed our operations process. The stress in this department has reduced by 98%.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(244,63,94,0.2)',
                  border: '1.5px solid rgba(244,63,94,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: '#FB7185',
                }}>A</div>
                <div>
                  <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: '#F1F5F9' }}>Angela</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'rgba(165,210,255,0.50)' }}>Care Agency, UK</p>
                </div>
                <StarRow count={5} />
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://booking.logezy.co/#/67044000000025008"
              target="_blank" rel="noopener noreferrer"
              style={{
                marginTop: 20,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 100, textDecoration: 'none',
                background: 'linear-gradient(135deg, #2396C6 0%, #2396C6 100%)',
                color: '#fff', fontSize: 13.5, fontWeight: 700,
                boxShadow: '0 4px 20px rgba(99,102,241,0.30)',
              }}
            >
              Join them — Book a Demo
              <ArrowRight weight="bold" size={14} />
            </a>

          </motion.div>

          {/* RIGHT: scroll down — hidden on mobile */}
          {!isMobile && <ScrollColumn items={rightReviews} direction="down" duration={28} />}

        </div>
      </div>
    </section>
  );
}
