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
    <section style={{ background: '#F8FAFF', padding: '52px 0', borderBottom: '1px solid #EEF2FF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center', fontSize: 11, fontWeight: 700,
            color: '#9CA3AF', letterSpacing: '0.12em',
            textTransform: 'uppercase' as const, marginBottom: 36,
          }}
        >
          Trusted by leading UK staffing &amp; healthcare agencies
        </motion.p>
      </div>

      {/* Scrolling strip */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #F8FAFF, transparent)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #F8FAFF, transparent)' }} />

        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '14px 28px',
                borderRadius: 14,
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                minWidth: 140,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 36,
                  width: 'auto',
                  maxWidth: 130,
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
