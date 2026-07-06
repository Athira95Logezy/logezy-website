import { Link } from 'react-router-dom';
import { ArrowRight, House } from '@phosphor-icons/react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '80px 24px' }}>
      <SEO
        title="Page Not Found | Logezy"
        description="The page you are looking for does not exist. Explore Logezy's workforce management software for UK staffing agencies."
        robots="noindex, follow"
      />
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <p style={{ fontSize: 72, fontWeight: 900, color: '#2396C6', margin: '0 0 8px', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>404</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#183963', margin: '0 0 12px', fontFamily: 'var(--font-heading)' }}>Page not found</h1>
        <p style={{ fontSize: 15.5, color: '#475569', lineHeight: 1.7, margin: '0 0 28px', fontFamily: 'var(--font-body)' }}>
          The page you're looking for doesn't exist or has moved. Try the homepage, or explore our workforce management features.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg,#183963,#2396C6)', color: '#fff', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
            <House weight="fill" style={{ width: 15, height: 15 }} /> Go Home
          </Link>
          <Link to="/features" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none', border: '1.5px solid rgba(35,150,198,0.35)' }}>
            View Features <ArrowRight weight="bold" style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
