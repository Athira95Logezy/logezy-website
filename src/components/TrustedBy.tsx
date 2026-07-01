import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   LOGO DATA
───────────────────────────────────────────── */
const logos = [
  { src: '/medsolve.webp',                 alt: 'Medsolve'       },
  { src: '/ansacare_logo.webp',           alt: 'Ansacare'       },
  { src: '/jayco_logo.webp',               alt: 'Jayco',          bg: '#114450' },
  { src: '/primcura_healthcare_logo.webp', alt: 'Primcura'       },
  { src: '/Leadcare_logo.webp',            alt: 'Leadcare'       },
  { src: '/annicare_uk.webp',              alt: 'Annicare UK'    },
  { src: '/ocean_logo.webp',               alt: 'Ocean'          },
  { src: '/Staffnursing_logo.webp',        alt: 'Staff Nursing'  },
];

const LOGO_SLOT = 180;
const GAP       = 48;
const TRACK_W   = (LOGO_SLOT + GAP) * logos.length;
const tripled   = [...logos, ...logos, ...logos];

/* ─────────────────────────────────────────────
   SECTION — light theme
───────────────────────────────────────────── */
export default function TrustedBy() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #F8FAFF 0%, #FFFFFF 50%, #F0F4FF 100%)',
      overflow: 'hidden',
      position: 'relative',
      padding: '72px 0 60px',
      borderTop: '1px solid rgba(99,102,241,0.10)',
      borderBottom: '1px solid rgba(99,102,241,0.10)',
    }}>

      {/* Subtle ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 120, background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 28 }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#2396C6',
          userSelect: 'none',
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1.5, background: 'rgba(99,102,241,0.35)', borderRadius: 2 }} />
          Trusted by UK staffing agencies
          <span style={{ display: 'inline-block', width: 24, height: 1.5, background: 'rgba(99,102,241,0.35)', borderRadius: 2 }} />
        </span>
      </motion.div>

      {/* Scrolling track wrapper */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 140,
          background: 'linear-gradient(90deg, #F8FAFF 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 140,
          background: 'linear-gradient(-90deg, #F8FAFF 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        {/* Marquee track */}
        <motion.div
          animate={{ x: [0, -TRACK_W] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: GAP,
            width: 'max-content',
            padding: '6px 0',
          }}
        >
          {tripled.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: LOGO_SLOT,
              }}
            >
              <div style={logo.alt === 'Jayco' ? {
                background: '#114450',
                borderRadius: 12,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              } : {}}>
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                style={{
                  maxHeight: 64,
                  width: 'auto',
                  maxWidth: LOGO_SLOT,
                  objectFit: 'contain',
                  opacity: 1,
                  filter: logo.alt === 'Ocean' ? 'invert(76%) sepia(51%) saturate(416%) hue-rotate(148deg) brightness(98%) contrast(89%)' : 'none',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s, transform 0.2s',
                  display: 'block',
                } as React.CSSProperties}
                draggable={false}
              />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
