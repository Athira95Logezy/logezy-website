import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, Info, Scales } from '@phosphor-icons/react';
import { comparisons, CellValue } from '../data/comparisons';
import SEO from '../components/SEO';

const NAVY = '#183963';
const CYAN = '#2396C6';
const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } } as const;

function Cell({ value }: { value: CellValue }) {
  if (value === true) return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#15803D', fontWeight: 700, fontSize: 13.5 }}>
      <CheckCircle weight="fill" style={{ width: 17, height: 17, flexShrink: 0 }} /> Yes
    </span>
  );
  if (value === false) return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#BE123C', fontWeight: 700, fontSize: 13.5 }}>
      <XCircle weight="fill" style={{ width: 17, height: 17, flexShrink: 0 }} /> No
    </span>
  );
  return <span style={{ fontSize: 13.5, color: '#475569' }}>{value}</span>;
}

export default function ComparePage() {
  const { slug } = useParams<{ slug: string }>();
  const cmp = comparisons.find(c => c.slug === slug);

  if (!cmp) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>Comparison not found</h1>
        <Link to="/" style={{ color: CYAN, fontWeight: 700, textDecoration: 'none' }}>Back to home</Link>
      </div>
    );
  }

  const title = `Logezy vs ${cmp.competitor}: Which Is Right for Your Agency?`;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <SEO
        title={`Logezy vs ${cmp.competitor} — Compare Staffing Software`}
        description={cmp.metaDescription}
        keywords={`Logezy vs ${cmp.competitor}, ${cmp.competitor} alternative, staffing software comparison, workforce management comparison`}
        canonical={`/compare/${cmp.slug}`}
        robots={cmp.draft ? 'noindex, follow' : 'index, follow'}
        breadcrumbs={[{ name: 'Compare', path: `/compare/${cmp.slug}` }, { name: `Logezy vs ${cmp.competitor}`, path: `/compare/${cmp.slug}` }]}
      />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(140deg,#0B1E3D 0%,#173462 60%,#1A5EA0 100%)', padding: '110px 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
              <Scales weight="fill" style={{ width: 13, height: 13 }} /> Product Comparison
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px', fontFamily: 'var(--font-heading)' }}>
              {title}
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              A factual, feature-by-feature comparison to help you choose. Last reviewed {cmp.lastReviewed}.
            </p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ── Intro ── */}
        <motion.div {...fade}>
          {cmp.intro.split('\n\n').map((p, i) => (
            <p key={i} style={{ fontSize: 15.5, color: '#334155', lineHeight: 1.8, margin: '0 0 18px' }}>{p}</p>
          ))}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#EFF6FF', borderRadius: 12, padding: '14px 18px', margin: '8px 0 40px', border: '1px solid rgba(35,150,198,0.2)' }}>
            <Info weight="fill" style={{ width: 18, height: 18, color: CYAN, flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.65, margin: 0 }}>
              {cmp.competitorStrength} Product capabilities change — verify current features and pricing with each vendor before making a decision.
            </p>
          </div>
        </motion.div>

        {/* ── Comparison table ── */}
        <motion.div {...fade}>
          <h2 style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontWeight: 800, color: NAVY, margin: '0 0 18px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            Feature-by-Feature Comparison
          </h2>
          <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid #E2E8F0', background: '#fff', boxShadow: '0 2px 16px rgba(24,57,99,0.06)', marginBottom: 48 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: 'left', padding: '14px 20px', fontSize: 13, fontWeight: 800, color: '#64748B', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '2px solid #E2E8F0' }}>Feature</th>
                  <th scope="col" style={{ textAlign: 'left', padding: '14px 20px', fontSize: 13, fontWeight: 800, color: CYAN, letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '2px solid #E2E8F0', background: '#F0F9FF' }}>Logezy</th>
                  <th scope="col" style={{ textAlign: 'left', padding: '14px 20px', fontSize: 13, fontWeight: 800, color: '#64748B', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '2px solid #E2E8F0' }}>{cmp.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {cmp.rows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                    <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 600, color: NAVY, borderTop: '1px solid #EDF2F7', lineHeight: 1.5 }}>{row.feature}</td>
                    <td style={{ padding: '13px 20px', borderTop: '1px solid #EDF2F7', background: i % 2 === 0 ? '#F8FCFF' : '#F0F9FF' }}><Cell value={row.logezy} /></td>
                    <td style={{ padding: '13px 20px', borderTop: '1px solid #EDF2F7' }}><Cell value={row.competitor} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Differentiators ── */}
        <motion.div {...fade}>
          <h2 style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontWeight: 800, color: NAVY, margin: '0 0 18px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            What Makes Logezy Different
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 48 }}>
            {cmp.differentiators.map((d, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '24px 26px', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(24,57,99,0.05)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>{d.title}</h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.75, margin: 0 }}>{d.body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15.5, color: '#334155', lineHeight: 1.8, margin: '0 0 12px' }}>{cmp.verdict}</p>
          <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.7, margin: '0 0 40px' }}>
            Explore Logezy's <Link to="/features" style={{ color: CYAN, fontWeight: 600 }}>full feature list</Link> and{' '}
            <Link to="/pricing" style={{ color: CYAN, fontWeight: 600 }}>pricing</Link>, or{' '}
            <Link to="/contact" style={{ color: CYAN, fontWeight: 600 }}>contact our team</Link> with any question.
          </p>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...fade}>
          <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,#0B1E3D 0%,#173462 50%,#2396C6 100%)', padding: '44px 40px', textAlign: 'center', boxShadow: '0 8px 40px rgba(11,30,61,0.25)' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem,2.4vw,1.8rem)', fontWeight: 900, color: '#fff', margin: '0 0 10px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              See the difference for yourself
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 0 24px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              The best comparison is a live one. Book a free Logezy demo — no credit card, no commitment — and judge it against anything else you're evaluating.
            </p>
            <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 30px', borderRadius: 50, background: '#fff', color: '#0B1E3D', fontSize: 15, fontWeight: 800, textDecoration: 'none' }}>
              Book a Free Demo <ArrowRight weight="bold" style={{ width: 15, height: 15 }} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
