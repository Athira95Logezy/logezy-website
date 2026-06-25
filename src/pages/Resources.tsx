import React from 'react';
import { BookOpen } from '@phosphor-icons/react';
import SEO from '../components/SEO';

export default function Resources() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <SEO
        title="Resources — Logezy Guides, Blog & Case Studies"
        description="Explore Logezy's resources hub: staffing agency guides, blog articles, case studies, compliance tips, and workforce management best practices for UK agencies."
        keywords="staffing agency resources, workforce management guides, Logezy blog, staffing case studies, compliance guides UK"
        canonical="/resources"
      />
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: '#E8F5FB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <BookOpen weight="regular" style={{ width: 28, height: 28, color: '#2396C6' }} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#183963', marginBottom: 10 }}>Resources</h1>
        <p style={{ fontSize: 16, color: '#6B7280' }}>Coming soon.</p>
      </div>
    </div>
  );
}
