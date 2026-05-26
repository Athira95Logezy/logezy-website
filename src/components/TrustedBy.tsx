import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { src: '/medsolve.png',                 alt: 'Medsolve'            },
  { src: '/ansacare_logo.webp',           alt: 'Ansacare'            },
  { src: '/jayco_logo.png',              alt: 'Jayco'               },
  { src: '/primcura_healthcare_logo.png', alt: 'Primcura Healthcare' },
  { src: '/Leadcare_logo.png',           alt: 'Leadcare'            },
  { src: '/annicare_uk.png',             alt: 'Annicare UK'         },
  { src: '/ocean_logo.png',              alt: 'Ocean'               },
  { src: '/Staffnursing_logo.png',       alt: 'Staff Nursing'       },
];

export default function TrustedBy() {
  const doubled = [...logos, ...logos];

  return (
    <section style={{ background: '#0C1835', padding: '56px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 40 }}>
          Trusted by leading UK staffing &amp; healthcare agencies
        </p>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 140, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #0C1835, transparent)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #0C1835, transparent)' }} />

        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 32, whiteSpace: 'nowrap' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((logo, i) => (
            <div key={i} style={{
              flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 28px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(8px)',
              minWidth: 140,
              transition: 'all 0.2s',
            }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 34,
                  width: 'auto',
                  maxWidth: 130,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.60,
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
