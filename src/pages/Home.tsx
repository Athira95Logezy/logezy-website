import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MobileAppShowcase from '../components/MobileAppShowcase';
import MobileAppFeatures from '../components/MobileAppFeatures';
import DashboardShowcase from '../components/DashboardShowcase';
import IndustrySolutions from '../components/IndustrySolutions';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <MobileAppShowcase />
      <MobileAppFeatures />
      <DashboardShowcase />
      <IndustrySolutions />
      <Testimonials />
      <FAQ />
    </main>
  );
}
