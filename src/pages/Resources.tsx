import React from 'react';
import { BookOpen } from '@phosphor-icons/react';

export default function Resources() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <BookOpen weight="regular" style={{ width: 28, height: 28, color: '#5B6CF9' }} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0C1835', marginBottom: 10 }}>Resources</h1>
        <p style={{ fontSize: 16, color: '#6B7280' }}>Coming soon.</p>
      </div>
    </div>
  );
}
