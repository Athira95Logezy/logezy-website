import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import AppShowcase from '../components/AppShowcase';
import DashboardShowcase from '../components/DashboardShowcase';
import IndustrySolutions from '../components/IndustrySolutions';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Features />
      <AppShowcase />
      <DashboardShowcase />
      <IndustrySolutions />
      <Testimonials />
      <FAQ />
      <CTASection />
    </main>
  );
}
