import React, { useRef, useEffect, useState } from 'react';
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
  const trackRef      = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    function measure() {
      if (trackRef.current && containerRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const contW  = containerRef.current.offsetWidth;
        setDist(Math.max(0, trackW - contW + 40)); // +40 so last logo fully visible
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section style={{
      background: '#0C1835',
      padding: '52px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          fontSize: 11, fontWeight: 700,
          color: 'rgba(255,255,255,0.30)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          marginBottom: 36,
        }}
      >
        Trusted by leading UK staffing &amp; healthcare agencies
      </motion.p>

      {/* Scrolling strip — 8 logos only, no duplication */}
      <div ref={containerRef} style={{ overflow: 'hidden', padding: '0 40px' }}>
        <motion.div
          ref={trackRef}
          style={{ display: 'flex', alignItems: 'center', gap: 56, width: 'max-content' }}
          animate={dist > 0 ? { x: [0, -dist] } : {}}
          transition={{
            duration: 18,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        >
          {logos.map((logo, i) => (
            <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 38,
                  width: 'auto',
                  maxWidth: 130,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.75,
                  userSelect: 'none',
                  draggable: false,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
